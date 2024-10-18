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
  const [anotherAnchorE2, setAnotherAnchorE2] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null); 
  const [selectedDepartment, setSelectedDepartment] = useState('');


  const adminsReq = useAxios({
    url: '/admin/all',
    method: 'get',
  });

  const companiesReq = useAxios({
    url: '/companies',
    method: 'get',
  });


  useEffect(() => {
    adminsReq.execute({});
  }, []);

  useEffect(() => {
    companiesReq.execute({});
  }, []);

  useEffect(() => {
    if (companiesReq.error || !companiesReq.response) return;

    // Extract companies from the response
    const companies = companiesReq.response.companies;

    // Create an array of departments by iterating over each company
    const allDepartments = companies
      .map(company => company.departments) // Extract departments array from each company
      .flat(); // Flatten the array of arrays into a single array

    // Set the departments in the state
    setDepartments(allDepartments);
  }, [companiesReq.response, companiesReq.error]);

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

  const handleAnotherOpen2 = (event) => {
    setAnotherAnchorE2(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const anotherOpen = Boolean(anotherAnchorEl);
  const anotherOpen2 = Boolean(anotherAnchorE2);
  const id = open ? 'simple-popover' : undefined;
  const anotherId = anotherOpen ? 'another-popover' : undefined;
  const anotherId2 = anotherOpen2 ? 'another-popover2' : undefined;

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
    setSelectedCompany(company); 
    setAnotherAnchorEl(null);
    setError(''); 
  };

  const handleDepartmentSelect = (department) => {
    if (!selectedCompany) {
      setSelectedDepartment(department);
      // must add error handling if the user has not selected a department
      return;
    }
    dispatch({
      type: 'Company departments',
      payload: { name: department.name, id: department.id },
    });
    setSelectedDepartment(department.name); 
    setAnotherAnchorE2(null);
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
              onChange={(event) => setSelectedClient(event.target.value)}
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
              label="Select Department"
              value={selectedDepartment} // Display the selected department's name
              executeDispatch={executeDispatch('company department')}
              textFieldProps={{
                onClick: handleAnotherOpen2,
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
              id={anotherId2}
              open={anotherOpen2}
              anchorEl={anotherAnchorE2}
              onClose={() => setAnotherAnchorE2(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                overflowY: 'auto',
              }}
            >
              {departments
                .filter(department => department.companyId === selectedCompany?.id) // Filter departments based on selected company
                .map((department, index) => (
                  <Typography
                    key={index}
                    sx={{
                      p: 2,
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDepartmentSelect(department)}
                  >
                    {department.name}
                  </Typography>
                ))}
            </Popover>
            {!selectedDepartment && (
            <InputItem
              label="New Department"
              executeDispatch={executeDispatch('company department')}
              value={state.company.department}
              id="simple-popover"
            />
          )}
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
            disabled: true,
            InputProps: {
              endAdornment: <ArrowDropDownIcon />,
            },
          }}
          textStyles={{
            cursor: 'pointer',
          }}
          id={id}
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
            overflowY: 'auto',
          }}
        >
          {admins.map((admin, index) => (
            <Typography
              key={admin.id + index}
              sx={{
                p: 2,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
              onClick={() => {
                dispatch({
                  type: 'sleep-science-consultant',
                  payload: admin,
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
