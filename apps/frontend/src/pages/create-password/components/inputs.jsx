import React, { useState, Fragment } from "react";
import {
  IconButton,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import { Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export const Inputs = ({ styles, formik, loading, setDisabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit()}}>
      <FormControl sx={{ ...styles.input }} variant="outlined">
        <OutlinedInput
          id="password"
          sx={{
            borderRadius: "10px !important",
            marginTop: "10px"
          }}
          placeholder="Create password"
          error={Boolean(formik.touched.password && formik.errors.password)}
          {...formik.getFieldProps("password")}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                id="showPassword"
                name="showPassword"
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ ...styles.passwordIcon }} />
                ) : (
                  <Visibility sx={{ ...styles.passwordIcon }} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText sx={{ ...styles.errorHelpers }}>
          {formik.touched.password && formik.errors.password}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ ...styles.input }} variant="outlined">
        <OutlinedInput
          id="confirmPassword"
          sx={{
            borderRadius: "10px !important"
          }}
          placeholder="Confirm password"
          {...formik.getFieldProps("confirmPassword")}
          error={Boolean(
            formik.touched.confirmPassword && formik.errors.confirmPassword
          )}
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityOff sx={{ ...styles.passwordIcon }} />
                ) : (
                  <Visibility sx={{ ...styles.passwordIcon }} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText sx={{ ...styles.errorHelpers }}>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </FormHelperText>
      </FormControl>
      <Typography
        sx={{
          fontSize: "10px",          
        }}
      >
        Both passwords must match.                                              
      </Typography>
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
            borderRadius: "40px",
            mt: "32px",
            width: "200px",
          }}
        >
          Creating password...
        </LoadingButton>
      ) : (
        <Button
          variant="contained"
          disabled={setDisabled()}
          sx={{
            height: "30px",
            width: "120px",
            color: "white",
            placeSelf: "center",
            marginTop: "15px",
            textTransform: "none",
            backgroundColor: "black",
          }}
          type="submit"
        >
          Next
        </Button>
      )}
    </form>
  );
};
