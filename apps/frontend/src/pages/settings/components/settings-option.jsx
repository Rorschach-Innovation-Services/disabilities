import {
  Button,
  Container,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Colours } from '../../../colours';
import { useAxios } from '../../../hooks/axios';
import { useLocalStorage } from '../../../hooks/storage';
import { CustomMessage } from '../../../components/message';

export const SettingsOptions = ({ state, dispatch }) => {
  const { clearAll } = useLocalStorage();
  const [openMessage, setOpenMessage] = useState(false);
  const { push } = useHistory();
  const [text, setText] = useState({});
  const emailReq = useAxios({
    url: `/admin/${state.admin._id}/update-emails`,
    method: 'post',
  });
  const deleteReq = useAxios({
    url: `/admin/delete-account/${state.admin._id}`,
    method: 'delete',
  });
  useEffect(() => {
    if (!emailReq.response || emailReq.error) {
      setText({
        text: emailReq.error.message,
        color: 'red',
      });
      return;
    }
    setText({
      text: 'Successfully updated your emails!',
      color: 'green',
    });
    setTimeout(() => {
      dispatch({
        type: 'get-admin-data',
        payload: emailReq.response.admin,
      });
      setText({});
    }, 2000);
  }, [emailReq.response, emailReq.error]);
  const updateEmails = () => {
    emailReq.executeWithData({
      email: state.email,
      secondaryEmail: state.secondaryEmail,
    });
  };
  useEffect(() => {
    if (!deleteReq.response || deleteReq.error) return;
    clearAll();
    push('/');
  }, [deleteReq.response, deleteReq.error]);
  const deleteAccount = () => {
    deleteReq.execute({});
    clearAll();
    push('/');
  };
  return (
    <Container
      sx={{
        padding: '0px !important',
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CustomMessage
        message="You are about a delete your account. Are you sure you want to continue?"
        open={openMessage}
        buttons
        onCancelClick={() => {
          setOpenMessage(false);
        }}
        onContinueClick={() => {
          deleteAccount();
          setOpenMessage(false);
        }}
      />
      <Container
        sx={{
          padding: '0px !important',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container
          sx={{
            padding: '0px !important',
            width: '50%',
            margin: '0 !important',
          }}
        >
          <InputLabel sx={{ fontSize: '12px' }}>Email</InputLabel>
          <TextField
            onChange={(event) =>
              dispatch({
                type: 'set-email',
                payload: event.target.value,
              })
            }
            sx={{
              '.MuiOutlinedInput-root.MuiInputBase-root': {
                height: '30px',
                fontSize: '12px',
                fontWeight: '500',
              },
            }}
            type="email"
            fullWidth
            value={state.admin.email}
          />
        </Container>
        <Container
          sx={{
            padding: '0px !important',
            width: '50%',
            margin: '0 !important',
          }}
        >
          <InputLabel sx={{ fontSize: '12px' }}>
            Secondary Recovery E-mail
          </InputLabel>
          <TextField
            onChange={(event) =>
              dispatch({
                type: 'set-sec-email',
                payload: event.target.value,
              })
            }
            sx={{
              '.MuiOutlinedInput-root.MuiInputBase-root': {
                height: '30px',
                fontSize: '12px',
                fontWeight: '500',
              },
            }}
            value={state.admin.secondaryEmail}
            fullWidth
            type="email"
          />
        </Container>
      </Container>
      <Container
        sx={{
          padding: '0px !important',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Divider />
        <Container
          sx={{
            padding: '0px !important',
            width: '50%',
            margin: '0 !important',
          }}
        >
          <Button
            sx={{
              textTransform: 'none',
              color: Colours.blue,
              placeSelf: 'start',
              fontSize: '14px',
              fontWeight: '600',
              padding: '0px !important',
            }}
            variant="text"
            onClick={() => setOpenMessage(true)}
          >
            Delete your account
          </Button>
          <Typography
            sx={{
              fontSize: '12px',
            }}
          >
            If you delete you account you will no longer have accesss to this
            platform. Please be sure that you would like to proceed.
          </Typography>
        </Container>
        <Typography
          sx={{
            fontSize: '12px',
            color: text.color,
          }}
        >
          {text.text}
        </Typography>
        <Button
          sx={{
            backgroundColor: Colours.blue,
            ':hover': {
              backgroundColor: Colours.blue,
            },
            textTransform: 'none',
            color: '#fff',
            width: '120px',
            fontSize: '12px',
          }}
          onClick={updateEmails}
        >
          Update emails
        </Button>
      </Container>
    </Container>
  );
};

