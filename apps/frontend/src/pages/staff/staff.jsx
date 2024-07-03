import { Container, TextField } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { useState } from 'react';
import { Search } from '../../components/search';
import { Shell } from '../../components/shell';
import { Loading } from '../../components/loading';
import { useAxios } from '../../hooks/axios';
import { StaffList } from './components/staff-list';
import { ViewStaffMembers } from './components/view-staff-members';
import { initialStaffState, StaffReducer } from './reducer';

export const Staff = () => {
  const [state, dispatch] = useReducer(StaffReducer, initialStaffState);
  const [open, setOpen] = useState(false);
  const { response, execute, error, loading } = useAxios({
    url: '/admin/all',
    method: 'get',
  });

  useEffect(() => {
    execute({});
  }, []);
  useEffect(() => {
    if (!response || error) return;
    console.log(response);
    dispatch({
      type: 'get-staff-members',
      payload: response.admins,
    });
  }, [response]);
  return (
    <Shell heading="Staff Members">
      {loading ? (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{
            width: '250px !important',
            height: '250px !important',
          }}
          containerSx={{ margin: '10% 25%' }}
        />
      ) : (
        <Container
          sx={{
            display: 'flex',
            gap: '10px',
            padding: '0 !important',
          }}
        >
          <Container
            sx={{
              padding: '0 !important',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              width: '100%',
              margin: '0 !important',
            }}
          >
            <Search data={state.staffMembers} />
            <StaffList setOpen={setOpen} state={state} dispatch={dispatch} />
          </Container>
          <ViewStaffMembers
            open={open}
            setOpen={setOpen}
            state={state}
            dispatch={dispatch}
          />
        </Container>
      )}
    </Shell>
  );
};
