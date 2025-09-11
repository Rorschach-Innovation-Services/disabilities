import React, { Fragment, useEffect, useMemo } from "react";
import { Typography, TextField, Button, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/storage";

const styles = {
  inputs: {
    ".MuiOutlinedInput-root.MuiInputBase-root": {
      width: "300px",
      height: "30px",
      fontSize: "12px",
      fontWeight: "500",
    },
  },
};

export const RegisterContent = ({ formik, loading, companies = [] }) => {
  const { push } = useHistory();
  const { role: myRole, companyId: myCompanyId, departmentId: myDepartmentId } = useLocalStorage();
  const role = (formik.values.role || '').toLowerCase();
  const isClientRole = ['client_super', 'client_user'].includes(role);

  // Compute selected company's departments
  const selectedCompany = useMemo(
    () => companies.find((c) => (c._id || c.id) === formik.values.company),
    [companies, formik.values.company],
  );
  const companyDepartments = selectedCompany?.departments || [];
  // Limit selectable roles based on actor role
  const actorRole = (myRole || '').toLowerCase();
  const roleOptions = (() => {
    if (actorRole === 'pivot') return ['client_super', 'client_user'];
    if (actorRole === 'client_super') return ['client_user'];
    if (actorRole === 'administrator' || actorRole === 'admin') return ['administrator', 'pivot', 'client_super', 'client_user'];
    return ['client_user'];
  })();

  useEffect(() => {
    // Ensure form role stays within allowed options
    const current = (formik.values.role || '').toLowerCase();
    if (!roleOptions.includes(current)) {
      formik.setFieldValue('role', roleOptions[0]);
    }
  }, [actorRole]);

  useEffect(() => {
    // Client Super: lock company to own company
    if ((actorRole === 'client_super') && myCompanyId) {
      formik.setFieldValue('company', myCompanyId);
      // And lock department to own department if available
      if (myDepartmentId) {
        formik.setFieldValue('department', myDepartmentId);
      }
    }
  }, [actorRole, myCompanyId, myDepartmentId]);
  const setDisabled = () => {
    const currentRole = String(formik.values.role || '').toLowerCase();
    const roleAllowed = roleOptions.includes(currentRole);
    const baseFilled = Boolean(
      (formik.values.name || '').trim() &&
      (formik.values.email || '').trim() &&
      (formik.values.password || '').trim()
    );
    const baseValid = !formik.errors.name && !formik.errors.email && !formik.errors.password;
    const clientFieldsOk = !isClientRole || Boolean(formik.values.company && formik.values.department);
    return !(roleAllowed && baseFilled && baseValid && clientFieldsOk);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      <AccountCircleIcon 
        sx={{
          fontSize: "60px",
          marginBottom: "10px"
        }} 
        fontSize="large"/>
      <Typography
        variant="body1"
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          lineHeight: "20px",
          width: "129px",
          height: "20px",
          whiteSpace: "nowrap",
        }}
      >
        Register User
      </Typography>
      {/* Role selector */}
      <FormControl sx={{ width: '300px', mt: '15px' }}>
        <InputLabel id="role-label" sx={{ fontSize: '12px' }}>User Type</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          label="User Type"
          value={formik.values.role}
          onChange={(e) => {
            const newRole = e.target.value;
            formik.setFieldValue('role', newRole);
            // Clear company and department when switching roles
            const client = ['client_super', 'client_user'].includes(String(newRole).toLowerCase());
            if (!client) {
              formik.setFieldValue('company', '');
              formik.setFieldValue('department', '');
            }
          }}
          size="small"
        >
          {roleOptions.includes('administrator') && (
            <MenuItem value={'administrator'}>Administrator</MenuItem>
          )}
          {roleOptions.includes('pivot') && (
            <MenuItem value={'pivot'}>Pivot</MenuItem>
          )}
          {roleOptions.includes('client_super') && (
            <MenuItem value={'client_super'}>Client Super</MenuItem>
          )}
          {roleOptions.includes('client_user') && (
            <MenuItem value={'client_user'}>Client Normal</MenuItem>
          )}
        </Select>
      </FormControl>
      {/* Company selector for client roles */}
      {isClientRole && (
        <FormControl sx={{ width: '300px', mt: '10px' }}>
          <InputLabel id="company-label" sx={{ fontSize: '12px' }}>Company</InputLabel>
          <Select
            labelId="company-label"
            id="company"
            label="Company"
            value={formik.values.company}
            onChange={(e) => {
              // Set company and reset department selection
              formik.setFieldValue('company', e.target.value);
              formik.setFieldValue('department', '');
            }}
            size="small"
            disabled={actorRole === 'client_super'}
            displayEmpty
            renderValue={(val) => {
              const c = companies.find((x) => (x._id || x.id) === val);
              return c ? c.name : '';
            }}
          >
            {companies.map((c) => (
              <MenuItem value={c._id || c.id} key={c._id || c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {/* Department selector for selected company (client roles) */}
      {isClientRole && formik.values.company && (
        <FormControl sx={{ width: '300px', mt: '10px' }}>
          <InputLabel id="department-label" sx={{ fontSize: '12px' }}>Department</InputLabel>
          <Select
            labelId="department-label"
            id="department"
            label="Department"
            value={formik.values.department || ''}
            onChange={(e) => formik.setFieldValue('department', e.target.value)}
            size="small"
            disabled={actorRole === 'client_super'}
            displayEmpty
            renderValue={(val) => {
              const d = companyDepartments.find((x) => (x._id || x.id) === val);
              return d ? d.name : '';
            }}
          >
            {companyDepartments.length === 0 ? (
              <MenuItem value="" disabled>
                No departments found
              </MenuItem>
            ) : (
              companyDepartments.map((d) => (
                <MenuItem value={d._id || d.id} key={d._id || d.id}>
                  {d.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      )}
      <TextField
        variant="outlined"
        placeholder="Name"
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        {...formik.getFieldProps("name")}
        sx={{ ...styles.inputs, mt: "20px", mb: "10px" }}
      />
      <TextField
        variant="outlined"
        placeholder="Email"
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        {...formik.getFieldProps("email")}
        sx={{ ...styles.inputs }}
      />
      <TextField
        type="password"
        variant="outlined"
        placeholder="Password"
        error={Boolean(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        {...formik.getFieldProps("password")}
        sx={{ ...styles.inputs, mt: '10px' }}
      />
      {loading ? (
        <LoadingButton
          loading={loading}
          variant="outlined"
          loadingPosition="start"
          startIcon={<Save sx={{ color: "transparent" }} />}
          sx={{
            textTransform: "none",
            backgroundColor: "black",
            color: "white !important",
            padding: "1% 2%",
            width: "140px",
            borderRadius: "40px",
            mt: "33px",
          }}
        >
          Registering...
        </LoadingButton>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0 !important",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={setDisabled()}
            sx={{
              mt: "33px",
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              width: "300px",
              height: "35px",
              borderRadius: "7px",
              ":hover": {
                background: "#000",
              }
            }}
          >
              Register
          </Button>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              width: "300px",
              height: "35px",
              borderRadius: "7px",
              ":hover": {
                background: "#000",
              }
            }}
            onClick={() => push("/staff")}
          >
            Cancel
          </Button>
        </Container>
      )}
    </Container>
  );
};
