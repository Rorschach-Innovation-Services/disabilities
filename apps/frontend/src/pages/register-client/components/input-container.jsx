import { Container, Popover, Typography } from '@mui/material';
import { InputItem, RadioInputItem } from './input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import { useAxios } from '../../../hooks/axios';

export const InputContainer = ({
  state,
  executeDispatch,
  dispatch,
  companies,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anotherAnchorEl, setAnotherAnchorEl] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(false);
  const adminsReq = useAxios({
    url: '/admin/all',
    method: 'get',
  });

  useEffect(() => {
    adminsReq.execute({});
  }, []);

  useEffect(() => {
    if (adminsReq.error || !adminsReq.response) return;
    setAdmins(adminsReq.response.admins);
  }, [adminsReq.response, adminsReq.error]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnotherOpen = (event) => {
    setAnotherAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const anotherOpen = Boolean(anotherAnchorEl);
  const id = open ? 'simple-popover' : undefined;
  const anotherId = anotherOpen ? 'another-popover' : undefined;

  return (
    <Container
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      <Container>
        <Typography
          variant="h5"
          sx={{
            marginBottom: '5%',
            fontWeight: 'bold',
            fontSize: '22px',
          }}
        >
          Company
        </Typography>
        <RadioInputItem
          label="Create new company"
          dispatch={dispatch}
          value={state.company.new}
        />
        {state.company.new && (
          <InputItem
            label="Company Name"
            executeDispatch={executeDispatch('company name')}
            value={state.company.name}
          />
        )}
        {!state.company.new && (
          <>
            <InputItem
              label="Select Company"
              value={state.company.name}
              executeDispatch={executeDispatch('company id')}
              textFieldProps={{
               // onMouseEnter: handleAnotherOpen,
                onClick: handleAnotherOpen,  // Change from onMouseEnter to onClick
                disabled: true,
                InputProps: {
                  endAdornment: <ArrowDropDownIcon />,
                },
              }}
              textStyles={{
                cursor: 'pointer',
              }}
              id="another-popover"
            />
            <Popover
              id={anotherId}
              open={anotherOpen}
              anchorEl={anotherAnchorEl}
              onClose={() => setAnotherAnchorEl(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                // height:"200px",
                overflowY: 'auto',
              }}
            >
              {companies.map((company, index) => (
                <Typography
                  key={company.id + index}
                  sx={{
                    p: 2,
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                  onClick={(event) => {
                    dispatch({
                      type: 'company name',
                      payload: company.name,
                    });
                    dispatch({
                      type: 'company sector',
                      payload: company.sector,
                    });
                    dispatch({
                      type: 'company id',
                      payload: company.id,
                    });
                    setAnotherAnchorEl(null);
                  }}
                >
                  {company.name}
                </Typography>
              ))}
            </Popover>
          </>
        )}
        <InputItem
          label="Company Sector"
          executeDispatch={executeDispatch('company sector')}
          value={state.company.sector}
        />
        <InputItem
          label="Number of Employees to be Assessed"
          textFieldProps={{
            type: 'number',
            inputProps: { min: '0' },
            error: state.company.employeeCount < 0,
          }}
          executeDispatch={executeDispatch('company employee count')}
          value={state.company.employeeCount}
        />
          {state.company.new && (
        <InputItem
          label="Department:"
          executeDispatch={executeDispatch('company department')}
          value={state.company.department}
        />
        )}
       {!state.company.new && (
        <>
        <InputItem
          label="Select Department"
          executeDispatch={executeDispatch('company sector')}
          value={state.company.department}
        />
        
        </>
        )}
      </Container>
      <Container>
        <Typography
          variant="h5"
          sx={{
            marginBottom: '5%',
            fontWeight: 'bold',
            fontSize: '22px',
          }}
        >
          HR Consultant
        </Typography>
        <InputItem
          label="Name"
          value={state.consultant.name}
          executeDispatch={executeDispatch('consultant name')}
        />
        <InputItem
          label="Phone"
          value={state.consultant.phone}
          executeDispatch={executeDispatch('consultant phone')}
        />
        <InputItem
          label="Email"
          value={state.consultant.email}
          executeDispatch={executeDispatch('consultant email')}
        />
        <InputItem
          label="Sleep Science consultant:"
          value={state.consultant.sleepScienceConsultant.name}
          executeDispatch={executeDispatch('sleep-science-consultant')}
          textFieldProps={{
            onClick: handleOpen, 
           // onMouseEnter: handleOpen,
            disabled: true,
            InputProps: {
              endAdornment: <ArrowDropDownIcon />,
            },
          }}
          textStyles={{
            cursor: 'pointer',
          }}
          id="simple-popover"
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            // height:"200px",
            overflowY: 'auto',
          }}
        >
          {admins.map((admin, index) => (
            <Typography
              key={index}
              sx={{
                p: 2,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
              onClick={(event) => {
                dispatch({
                  type: 'sleep-science-consultant',
                  payload: { name: admin.name, id: admin.id },
                });
                setAnchorEl(null);
              }}
            >
              {admin.name}
            </Typography>
          ))}
        </Popover>
      </Container>
    </Container>
  );
};