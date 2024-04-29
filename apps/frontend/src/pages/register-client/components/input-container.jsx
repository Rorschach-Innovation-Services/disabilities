import { Container, Popover, Typography } from "@mui/material"
import { InputItem } from "./input"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/axios";

export const InputContainer = ({ state, executeDispatch, dispatch }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState(false);
    const adminsReq = useAxios({
        url: "/admin/all",
        method: "get"
    });
    useEffect(() => {
        adminsReq.execute({});
    }, []);
    useEffect(() => {
        if(adminsReq.error || !adminsReq.response) return;
        setAdmins(adminsReq.response.admins);
    }, [adminsReq.response, adminsReq.error]);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined;
    return (
        <Container
          sx={{
            display: "flex",
            backgroundColor: "white",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            borderRadius: "20px",
            padding: "20px"
          }}
        >
            <Container>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "5%",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                Company
              </Typography>
              <InputItem
                label="Company Name"
                executeDispatch={executeDispatch("company name")}
                value={state.company.name}
              />
              <InputItem
                label="Company Sector"
                executeDispatch={executeDispatch("company sector")}
                value={state.company.sector}
              />
              <InputItem
                label="Number of Employees to be Assessed"
                textFieldProps={{ type: "number", inputProps: { min: "0" }, error: state.company.employeeCount < 0 }}
                executeDispatch={executeDispatch("company employee count")}
                value={state.company.employeeCount}
              />
              <InputItem
                label="Department:"
                executeDispatch={executeDispatch("company department")}
                value={state.company.department}
              />
            </Container>
            <Container>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "5%",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                HR Consultant
              </Typography>
              <InputItem
                label="Name"
                value={state.consultant.name}
                executeDispatch={executeDispatch("consultant name")}
              />
              <InputItem
                label="Phone"
                value={state.consultant.phone}
                executeDispatch={executeDispatch("consultant phone")}
              />
              <InputItem
                label="Email"
                value={state.consultant.email}
                executeDispatch={executeDispatch("consultant email")}
              />
              <InputItem
                label="Sleep Science consultant:"
                value={state.consultant.sleepScienceConsultant.name}
                executeDispatch={executeDispatch("sleep-science-consultant")}
                textFieldProps={{
                    onClick: handleOpen, 
                    disabled: true,
                    InputProps: {
                        endAdornment: <ArrowDropDownIcon/>
                    },
                }}
                textStyles={{
                    cursor: "pointer"
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
                        overflowY: "auto",
                        
                    }}
                >
                    {
                        admins.map((admin, index) =>(
                            <Typography
                                key={index} 
                                sx={{ 
                                    p: 2,
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                }}
                                onClick={(event) => {
                                    dispatch({ type: "sleep-science-consultant", payload: {name: admin.name, _id: admin._id} });
                                    setAnchorEl(null)
                                }}
                            >
                                {admin.name}
                            </Typography>
                        ))
                    }
                </Popover>   
            </Container>
        </Container>
    )
}