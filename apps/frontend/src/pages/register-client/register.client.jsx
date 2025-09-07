import React, { useEffect, useReducer, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  useMediaQuery,
  Container,
  Button,
  Divider,
} from '@mui/material';
import { InputItem } from './components/input';
import { Upload } from './components/upload';
import { useAxios } from '../../hooks/axios';
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import { assessmentInitialState, assessmentReducer } from './reducer';
import { Shell } from '../../components/shell';
import { Loading } from '../../components/loading';
import { InputContainer } from './components/input-container';
import { config } from '../../config';
import { useLocalStorage } from '../../hooks/storage';

export const RegisterCompanyDepartment = () => {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    assessmentInitialState
  );
  const location = useLocation();
  const [companies, setCompanies] = useState([]);
  const [companyID, setCompanyID] = useState(
    location.state ? location.state.companyID : null
  );
  // CSV functionality removed; only logo upload remains
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useHistory();
  const companiesReq = useAxios({
    url: `/companies`,
    method: 'get',
  });
  const clientReq = useAxios({
    url: `/companies/${companyID}`,
    method: 'get',
  });
  const { executeWithData, error, resetState, response, loading } = useAxios({
    url: '/companies/register',
    method: 'post',
  });
  const updateCompanyReq = useAxios({ url: '', method: 'post' });
  const { token } = useLocalStorage();
  const executeDispatch = (type) => (payload) => {
    dispatch({ type, payload });
  };
  useEffect(() => {
    if (!location.state || !location.state.companyID) return;
    clientReq.execute({});
    companiesReq.execute({});
  }, []);

  useEffect(() => {
    if (!location.state || !location.state.questionnaire) return;
    dispatch({
      type: 'set questionnaire',
      payload: location.state.questionnaire,
    });
  }, [location.state]);

  useEffect(() => {
    companiesReq.execute({});
  }, []);

  useEffect(() => {
    if (!companiesReq.response || companiesReq.error) return;
    setCompanies(companiesReq.response.companies);
  }, [companiesReq.response, companiesReq.error]);

  useEffect(() => {
    if (!location.state || !clientReq.response || clientReq.error) return;
    dispatch({
      type: 'set-logo',
      payload: clientReq.response.company.logo,
    });
    dispatch({
      type: 'company name',
      payload: clientReq.response.company.name,
    });
    dispatch({
      type: 'company sector',
      payload: clientReq.response.company.sector,
    });
    
  }, [clientReq.response, clientReq.error]);

  useEffect(() => {
    const runPostCreate = async () => {
      try {
        const newCompanyId = response?.company;
        if (!newCompanyId) return;

        // If a new logo was selected, upload under a company-scoped key and update the company
        if (state.logo && state.logo.filename && state.logo.data) {
          try {
            const contentType = state.logo.contentType || 'application/octet-stream';
            // Request presigned PUT URL from backend
            const presignRes = await fetch(`${config.apiUrl}/media/company-logo-upload-url`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                companyId: newCompanyId,
                filename: state.logo.filename,
                contentType,
              }),
            });
            if (!presignRes.ok) throw new Error('Failed to get presigned URL');
            const { uploadUrl, publicUrl } = await presignRes.json();
            if (!uploadUrl) throw new Error('Failed to get upload URL');
            // Upload file bytes directly to S3 via presigned URL
            await fetch(uploadUrl, {
              method: 'PUT',
              headers: { 'Content-Type': contentType },
              body: state.logo.data,
            });
            // Persist the URL on the company record
            const doUpdate = updateCompanyReq.createRequest({
              url: `/companies/${newCompanyId}/update`,
              method: 'post',
              data: { logo: publicUrl },
            });
            await doUpdate();
          } catch (uploadErr) {
            console.error('Logo upload failed', uploadErr);
            enqueueSnackbar('Logo upload failed; company saved without logo', {
              variant: 'warning',
            });
          }
        }

        enqueueSnackbar('Success! Company added.', { variant: 'success' });
        push('/dashboard');
      } catch (e) {
        console.error(e);
      }
    };

    if (!error && response) runPostCreate();
  }, [response, error]);

  const handleSubmit = async () => {
    const employees = [];
    // Create the company/department first to get a stable companyId
    executeWithData({
      name: state.company.name,
      // Logo will be uploaded post-create under the company path
      logo: state.company.logo,
      employeeSize: state.company.employeeCount,
      sector: state.company.sector,
      department: state.company.department,
      employees,
      id: companyID || state.company.id,
      questionnaireId: state.questionnaire.id,
    });
  };

  if (loading)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          textAlign: 'center',
          transform: 'translateY(50%)',
        }}
      >
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{
            width: '250px !important',
            height: '250px !important',
          }}
          containerSx={{
            margin: 'auto',
            marginTop: '-100px',
            textAlign: 'center',
          }}
        />
      </Box>
    );

  return (
    <Shell heading="Register Company Department">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          margin: '0 !important',
          padding: '0 !important',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            gap: '20px',
            margin: '0 !important',
            padding: '0 !important',
          }}
        >
          <Upload
            support="png, jpg, jpeg"
            title="Upload Company Logo"
            name="logo"
            accept=".png, .jpg, .jpeg"
            executeDispatch={executeDispatch('logo')}
          />
        </Container>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography
            sx={{
              // width: "10%",
              fontSize: '14px',
            }}
          >
            Onboard a department
          </Typography>
          <Divider
            sx={{
              width: '90%',
              borderWidth: '1px',
              borderColor: 'rgba(0,0,0,0.5)',
            }}
          />
        </Container>
        <InputContainer
          executeDispatch={executeDispatch}
          companies={companies}
          state={state}
          dispatch={dispatch}
        />
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: '15px',
            marginTop: '20px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              ':hover': {
                backgroundColor: '#000',
                color: '#fff',
              },
              textTransform: 'none',
              borderRadius: '10px',
              width: '130px',
            }}
            onClick={() => {
              push('/assessment/questions');
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              ':hover': {
                backgroundColor: '#000',
                color: '#fff',
              },
              borderRadius: '10px',
              textTransform: 'none',
              width: '130px',
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Container>
      </Container>
    </Shell>
  );
};
