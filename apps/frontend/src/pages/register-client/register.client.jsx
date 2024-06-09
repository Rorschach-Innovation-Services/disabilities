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
import { getEmployees } from './utils';
import { useAxios } from '../../hooks/axios';
import { useMediaStorage, BUCKET } from '../../hooks/media';
import { useSnackbar } from 'notistack';
import { useHistory, useLocation } from 'react-router-dom';
import { assessmentInitialState, assessmentReducer } from './reducer';
import { Shell } from '../../components/shell';
import { Loading } from '../../components/loading';
import { InputContainer } from './components/input-container';

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
  const separateUploads = useMediaQuery('(max-width:850px)');
  const { store } = useMediaStorage();
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
    dispatch({
      type: 'consultant name',
      payload: clientReq.response.company.hrConsultantName,
    });
    dispatch({
      type: 'consultant phone',
      payload: clientReq.response.company.phone,
    });
    dispatch({
      type: 'consultant email',
      payload: clientReq.response.company.hrConsultantEmail,
    });
    dispatch({
      type: 'sleep-science-consultant',
      payload: {
        name: clientReq.response.admin ? clientReq.response.admin : '',
        _id: clientReq.response.company.admin
          ? clientReq.response.company.admin
          : '',
      },
    });
  }, [clientReq.response, clientReq.error]);

  useEffect(() => {
    if (error || !response) {
      console.log(error);
      return;
    }
    enqueueSnackbar('Success! Company added.', { variant: 'success' });
    setTimeout(() => {
      if (!state.csv || !state.csv.filename) {
        push(`/generate-link`, [
          {
            companyID: response.company,
            departmentID: response.department,
            questionnaireId: response.questionnaireId,
          },
        ]);
      } else {
        push('/dashboard');
      }
    }, 2000);
  }, [response, error]);

  const handleSubmit = async () => {
    if (state.logo) store(state.logo.filename, state.logo.data);
    const employees = await getEmployees(state);
    setTimeout(() => {
      executeWithData({
        name: state.company.name,
        logo:
          state.logo && state.logo.filename
            ? `https://${BUCKET}.s3.af-south-1.amazonaws.com/${state.logo.filename}`
            : state.company.logo,
        employeeSize: state.company.employeeCount,
        sector: state.company.sector,
        department: state.company.department,
        employees,
        hrConsultantName: state.consultant.name,
        hrConsultantEmail: state.consultant.email,
        phone: state.consultant.phone,
        id: companyID || state.company.id,
        admin: state.consultant.sleepScienceConsultant.id,
        questionnaireId: state.questionnaire.id,
      });
    }, 1000);
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
          <Upload
            support="csv, xlsx,xls"
            title="Upload Employee CSV File"
            name="csv"
            paperSx={{
              marginLeft: separateUploads ? '' : '3%',
              marginTop: separateUploads ? '20px' : '',
            }}
            accept=".csv, .xlsx, .xls"
            executeDispatch={executeDispatch('csv')}
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
            {state.csv.filename ? 'Submit' : 'Generate Link'}
          </Button>
        </Container>
      </Container>
    </Shell>
  );
};
