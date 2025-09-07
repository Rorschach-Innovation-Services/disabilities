import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import { Shell } from '../../components/shell';
import { useAxios } from '../../hooks/axios';
import { Loading } from '../../components/loading';
import { Colours } from '../../colours';

// Admin-only user edit page. Pre-populates limited fields and updates via API.
export const StaffEdit = () => {
  const { id } = useParams();
  const { push, goBack } = useHistory();

  const getUserReq = useAxios({ url: id ? `/admin/${id}` : '', method: 'get' });
  const getCompaniesReq = useAxios({ url: '/assessments/client-files', method: 'get' });
  const updateProfileReq = useAxios({ url: id ? `/admin/update-profile/${id}` : '', method: 'post' });
  const updateEmailsReq = useAxios({ url: id ? `/admin/${id}/update-emails` : '', method: 'post' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    secondaryEmail: '',
    companyId: '',
    role: '',
  });

  const companies = useMemo(() => getCompaniesReq.response?.companies || [], [getCompaniesReq.response]);
  const loading = getUserReq.loading || getCompaniesReq.loading;

  useEffect(() => {
    if (!id) return;
    getUserReq.execute();
    getCompaniesReq.execute();
  }, [id]);

  useEffect(() => {
    const u = getUserReq.response?.admin || getUserReq.response?.user || getUserReq.response;
    if (!u) return;
    setForm({
      name: u.name || '',
      email: u.email || '',
      secondaryEmail: u.secondaryEmail || '',
      companyId: u.companyId || u.company || '',
      role: u.role || '',
    });
  }, [getUserReq.response]);

  const getCompanyId = (c) => c?.id || c?._id || c?.companyId || '';

  const onChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const onSave = async () => {
    // Fire profile and email updates; keep concerns separated by endpoint.
    const profilePayload = {
      name: form.name,
      companyId: form.companyId,
      role: form.role,
    };
    const emailsPayload = {
      email: form.email,
      secondaryEmail: form.secondaryEmail,
    };

    // Execute updates sequentially to surface errors clearly
    await updateProfileReq.executeWithData(profilePayload);
    if (!updateProfileReq.error) {
      await updateEmailsReq.executeWithData(emailsPayload);
    }

    // If both succeeded, go back to staff list
    if (!updateProfileReq.error && !updateEmailsReq.error) {
      push('/staff');
    }
  };

  return (
    <Shell heading="Edit User">
      {loading ? (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{ width: '250px !important', height: '250px !important' }}
          containerSx={{ margin: '10% 25%' }}
        />
      ) : (
        <Container sx={{ p: '0 !important' }}>
          {(getUserReq.error || updateProfileReq.error || updateEmailsReq.error) && (
            <Typography color="error" sx={{ mb: 2 }}>
              {getUserReq.error?.data?.message ||
                updateProfileReq.error?.data?.message ||
                updateEmailsReq.error?.data?.message ||
                'Something went wrong'}
            </Typography>
          )}

          <TableContainer sx={{ background: '#fff', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '200px' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>Full Name</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={form.name}
                      onChange={onChange('name')}
                      fullWidth
                      size="small"
                      sx={{ '.MuiInputBase-input': { fontSize: '12px' } }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>Email</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="email"
                      value={form.email}
                      onChange={onChange('email')}
                      fullWidth
                      size="small"
                      sx={{ '.MuiInputBase-input': { fontSize: '12px' } }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>Secondary Email</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="email"
                      value={form.secondaryEmail}
                      onChange={onChange('secondaryEmail')}
                      fullWidth
                      size="small"
                      sx={{ '.MuiInputBase-input': { fontSize: '12px' } }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>Company</Typography>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={form.companyId || ''}
                      onChange={onChange('companyId')}
                      fullWidth
                      size="small"
                      displayEmpty
                      sx={{ '.MuiSelect-select': { fontSize: '12px' } }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {companies.map((c) => (
                        <MenuItem key={getCompanyId(c)} value={getCompanyId(c)}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>Role</Typography>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={form.role || ''}
                      onChange={onChange('role')}
                      fullWidth
                      size="small"
                      displayEmpty
                      sx={{ '.MuiSelect-select': { fontSize: '12px' } }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="administrator">Administrator</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="pivot">Pivot</MenuItem>
                      <MenuItem value="client_super">Client Super</MenuItem>
                      <MenuItem value="client_user">Client User</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => goBack()}
              sx={{ textTransform: 'none', borderColor: Colours.blue, color: Colours.blue }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onSave}
              disabled={updateProfileReq.loading || updateEmailsReq.loading}
              sx={{ textTransform: 'none', backgroundColor: Colours.blue, ':hover': { backgroundColor: Colours.blue } }}
            >
              {updateProfileReq.loading || updateEmailsReq.loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Container>
      )}
    </Shell>
  );
};
