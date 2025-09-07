import { Container, Popover, Typography } from '@mui/material';
import { InputItem, RadioInputItem } from './input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

export const InputContainer = ({
  state,
  executeDispatch,
  dispatch,
  companies,
}) => {
  const [anotherAnchorEl, setAnotherAnchorEl] = useState(null);
  const handleAnotherOpen = (event) => {
    setAnotherAnchorEl(event.currentTarget);
  };

  const anotherOpen = Boolean(anotherAnchorEl);
  const anotherId = anotherOpen ? 'another-popover' : undefined;

  const handleCompanySelect = (company) => {
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
  };

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
                onClick: handleAnotherOpen,
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
                  onClick={() => handleCompanySelect(company)}
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
            id="simple-popover"
          />
        )}
        {!state.company.new && (
          <>
            <InputItem
             label="New Department"
             executeDispatch={executeDispatch('company department')}
             value={state.company.department}
             id="simple-popover"
           />
          </>
        )}
      </Container>
    </Container>
  );
};
