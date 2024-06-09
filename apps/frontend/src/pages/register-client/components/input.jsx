import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

export const InputItem = ({
  label,
  children,
  textFieldProps,
  executeDispatch,
  value,
  marginLeftProp,
  textStyles,
}) => {
  const handleChange = (event) => {
    executeDispatch(event.target.value);
  };
  return (
    <Box component="div" sx={{ display: 'flex', marginTop: '2%' }}>
      <Grid container>
        <Grid item xs={7} sx={{ display: 'flex' }}>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: '1%' }}
            fontSize={14}
          >
            {label}
          </Typography>
          {children}
        </Grid>
        <Grid item xs={5} marginLeft={marginLeftProp}>
          <TextField
            {...textFieldProps}
            value={value}
            onChange={handleChange}
            sx={{
              '.MuiOutlinedInput-root.MuiInputBase-root': {
                maxHeight: '35px',
                borderRadius: '15px',
              },
              marginBottom: '6%',
              ...textStyles,
            }}
          ></TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export const RadioInputItem = ({
  label,
  children,
  dispatch,
  value,
  marginLeftProp,
}) => {
  return (
    <Box component="div" sx={{ display: 'flex', marginTop: '2%' }}>
      <Grid container>
        <Grid item xs={7} sx={{ display: 'flex' }}>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: '1%' }}
            fontSize={14}
          >
            {label}
          </Typography>
          {children}
        </Grid>
        <Grid item xs={5} marginLeft={marginLeftProp}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="yes"
              name="radio-buttons-group"
              value={value ? 'yes' : 'no'}
              onChange={(event) => {
                dispatch({
                  type: 'company name',
                  payload: '',
                });
                dispatch({
                  type: 'company new',
                  payload: event.target.value === 'yes',
                });
              }}
            >
              <Stack direction="row">
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
