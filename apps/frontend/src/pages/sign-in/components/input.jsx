import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Visibility } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import { useAxios } from '../../../hooks/axios';
import { useLocalStorage } from '../../../hooks/storage';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

// Need server url from backend team

export const Input = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { executeWithData, error, response, loading } = useAxios({
    url: '/admin/signin',
    method: 'post',
  });
  console.log('env', import.meta.env);
  const { writeID, writeToken, writeName, writeEmail, writeRole, writeCompanyId } = useLocalStorage();
  const { push } = useHistory();

  useEffect(() => {
    if (error || !response) return;
    console.log('response', response);
    writeName(response.admin.name);
    writeID(response.admin.id);
    localStorage.setItem('adminID', response.admin.id);
    localStorage.setItem('adminName', response.admin.name);
    localStorage.setItem('adminPhoto', response.admin.photo);
    writeToken(response.token);
    if (response.admin?.role) writeRole(String(response.admin.role).toLowerCase());
    if (response.admin?.companyId) writeCompanyId(response.admin.companyId);
    writeEmail(response.admin.email);
    push('/dashboard');
  }, [response]);

  const onSubmit = (event) => {
    event.preventDefault();
    executeWithData({ email, password, role: 'admin' });
  };

  return (
    <form noValidate autoComplete="off">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '70px 100px',
          marginBottom: 0,
        }}
      >
        <Typography fontSize={10}>Pivot PLATFORM</Typography>
        <Typography
          fontSize={26}
          sx={{
            fontWeight: 600,
            fontSize: '26px',
            marginBottom: '30px',
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          sx={{
            color: 'red',
            fontSize: '12px',
          }}
        >
          {error ? error.data.message : ''}
        </Typography>
        <TextField
          id="user_email"
          placeholder="Enter your email"
          sx={{
            width: '300px',
            margin: '10px 0',
            '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
              height: '10px',
            },
          }}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password.password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          sx={{
            width: '300px',
            margin: '10px 0',
            '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
              height: '10px',
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{
                  color: 'grey',
                  ':hover': {
                    color: 'black',
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Link style={{ textDecoration: 'none' }} to="/forgot-password">
          <Typography
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              textTransform: 'none',
            }}
          >
            Forgot Password
          </Typography>
        </Link>
        {loading ? (
          <LoadingButton
            loading={loading}
            variant="outlined"
            size="large"
            loadingPosition="start"
            startIcon={<Save sx={{ color: 'transparent' }} />}
            sx={{
              textTransform: 'none',
              backgroundColor: 'black',
              color: 'white !important',
              width: '300px',
              margin: '50px 0',
            }}
          >
            Signing in...
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            size="large"
            type="submit"
            onClick={onSubmit}
            sx={{
              backgroundColor: 'black',
              textTransform: 'none',
              color: 'white',
              width: '300px',
              marginTop: '70px',
              ':hover': {
                backgroundColor: 'black',
              },
            }}
          >
            Sign In
          </Button>
        )}
      </Container>
    </form>
  );
};
