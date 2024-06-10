import {
  Box,
  Slider,
  Divider,
  Paper,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Fragment, useState } from 'react';
import { isDate, set, getHours, getMinutes, format } from 'date-fns';
import { useCallback } from 'react';

/**
 * Text box input
 * @param placeholder for the input box
 * @param value of input
 * @param type of the input
 * @param updateState function taking in new input value on change
 * @param errorMessage message on erroneous value
 * @param errorMessage whether  should be displayed
 * @param setError resetting the question error
 * @param sx styling for text field
 * */
export const TextBoxInput = ({
  placeholder,
  value,
  updateState,
  errorMessage,
  displayErrorMessage,
  type,
  setError,
  sx,
}) => {
  const decreaseWidth = useMediaQuery('(max-width:500px)');

  return (
    <Box>
      <MessageDialogue
        message={errorMessage}
        display={displayErrorMessage}
        setError={setError}
        sx={{ marginBottom: '50px' }}
      />
      <TextField
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          updateState(event.target.value);
        }}
        type={type || 'text'}
        sx={{
          width: decreaseWidth ? '300px' : '390px',
          marginTop: displayErrorMessage ? '0' : '220px',
          ...sx,
        }}
      />
    </Box>
  );
};

/**
 * Displays a message
 * @param message to display
 * @param display whether message is displayed or not
 * @param setError resetting the question error
 * @param sx styling
 * @param rootSx styling for top most element
 * @param messageSx styling for message
 * @param dividerSx styling for the divider
 * @param buttonGroupSx styling for bottom button section
 * */
export const MessageDialogue = ({
  message,
  display,
  setError,
  sx,
  rootSx,
  buttonGroupSx,
  dividerSx,
  messageSx,
  children,
}) => {
  return display ? (
    <Box sx={{ marginBottom: '50px', ...rootSx }}>
      <Paper
        elevation={6}
        sx={{
          backgroundColor: 'white !important',
          width: '300px',
          height: '190px',
          borderRadius: '20px',
          paddingTop: '40px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 100,
          ...sx,
        }}
      >
        <Box sx={{ margin: '0 auto', width: '220px' }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center',
              marginBottom: '32px',
              color: '#657173',
              ...messageSx,
            }}
          >
            {message}
          </Typography>
        </Box>
        <Divider sx={{ margin: '0 20px 15px 20px', ...dividerSx }} />
        <Box sx={{ textAlign: 'center', ...buttonGroupSx }}>
          {typeof children === 'undefined' ? (
            <Button
              variant="text"
              sx={{ textTransform: 'none' }}
              onClick={() => setError('')}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#8CB8E2',
                }}
              >
                Ok
              </Typography>
            </Button>
          ) : (
            children
          )}
        </Box>
      </Paper>
    </Box>
  ) : null;
};

/**
 * Showcases a vertical list of options that are selectable. Only a single one can be selected at any point in time
 * @param selected which option is currently selected
 * @param onChange when selection changes
 * @param options to showcase
 * @param errorMessage message on erroneous value
 * @param errorMessage whether  should be displayed
 * @param setError resetting the question error
 * @param sx styling
 * @param dialogueSx styling for error message dialogue
 * */
export const SelectableOptions = ({
  selected,
  onChange,
  options,
  errorMessage,
  displayErrorMessage,
  setError,
  sx,
  dialogueSx,
}) => {
  return (
    <Box>
      <MessageDialogue
        message={errorMessage}
        display={displayErrorMessage}
        setError={setError}
        sx={{ marginBottom: '-233px', ...dialogueSx }}
      />
      <ToggleButtonGroup
        orientation="vertical"
        value={selected}
        variant="outlined"
        exclusive
        onChange={(_, value) => {
          onChange(value);
        }}
        sx={{
          marginTop: '2%',
          marginBottom: displayErrorMessage ? '30px' : '0',
          positiove: 'relative',
          zIndex: 0,
          'button.Mui-selected ': {
            backgroundColor: 'black',
            color: 'white',
          },
          'button.Mui-selected:hover': {
            backgroundColor: 'black',
          },
          ...sx,
        }}
      >
        {options.map((option) => (
          <ToggleButton
            key={option}
            value={option}
            sx={{
              marginBottom: '15%',
              border: '1px solid grey',
              borderTop: '1px solid grey !important',
              borderRadius: '15px !important',
              textTransform: 'none',
              width: '150%',
            }}
          >
            <Typography variant="subtitle2">{option}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

/**
 * Helper text displayed above slider option
 * */
const SliderHelperText = ({ text }) => {
  return (
    <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#657173' }}>
      {text}
    </Typography>
  );
};

/**
 * Slider from 1 to 10
 * @param value of the slider currently selected
 * @param onChange when selection changes
 * @param low text for low end of slider
 * @param medium text for middle end of slider
 * @param high text for higher end of slider
 * @param errorMessage message on erroneous value
 * @param errorMessage whether  should be displayed
 * @param setError resetting the question error
 * */
export const SliderOption = ({
  value,
  onChange,
  low,
  medium,
  high,
  errorMessage,
  displayErrorMessage,
  setError,
}) => {
  return (
    <Box>
      <MessageDialogue
        message={errorMessage}
        display={displayErrorMessage}
        setError={setError}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          margin: '0 auto',
          marginBottom: '-60px',
          marginTop: '100px',
        }}
      >
        {/* <SliderHelperText text={low} />
        <SliderHelperText text={medium} />
        <SliderHelperText text={high} /> */}
      </Stack>
      <Slider
        aria-label="rating-score"
        step={1}
        min={0}
        max={5}
        marks={[
          { value: 0, label: '0' },
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
          { value: 5, label: '5' },
        ]}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        value={value}
        sx={{ width: '93%', mt: '7vh' }}
      />
    </Box>
  );
};

/**
 * Time picker
 * @param value
 * @param onChange
 * @param errorMessage message on erroneous value
 * @param displayErrorMessage whether  should be displayed
 * @param setError resetting the question error
 * */
export const TimeSelector = ({
  value,
  onChange,
  errorMessage,
  displayErrorMessage,
  setError,
}) => {
  return (
    <Box>
      <MessageDialogue
        message={errorMessage}
        display={displayErrorMessage}
        setError={setError}
        sx={{ marginBottom: '-145px' }}
      />
      <CustomTimePicker
        value={value}
        displayErrorMessage={displayErrorMessage}
        onChange={onChange}
      />
    </Box>
  );
};

/**
 * Custom time picker for questionnaire
 * @param value
 * @param onChange
 * @param displayErrorMessage whether  should be displayed
 * */
export const CustomTimePicker = ({ value, onChange, displayErrorMessage }) => {
  const setDate = useCallback(() => {
    if (value !== null && (value.length > 0 || value.toString().length > 0)) {
      const date = new Date(value);
      const hours = getHours(date);
      const minutes = getMinutes(date);
      let hourString = hours.toString();
      let minuteString = minutes.toString();
      if (hours < 10) hourString = `0${hours}`;
      else if (hours > 12 && hours - 12 > 10) hourString = `${hours - 12}`;
      else if (hours > 12 && hours - 12 < 10) hourString = `0${hours - 12}`;
      if (minutes < 10) minuteString = `0${minutes}`;
      return `${hourString}:${minuteString}`;
    }
    return '';
  }, [value]);
  const setValuePeriod = useCallback(() => {
    if (value !== null && (value.length > 0 || value.toString().length > 0)) {
      return format(new Date(value), 'aaa');
    }
    return 'am';
  }, [value]);

  const [period, setPeriod] = useState(setValuePeriod());
  const [tempValue, setTempValue] = useState(setDate());

  const formatTime = (input) => {
    const len = input.length;
    if (isNaN(input[len - 1])) {
      return input.substring(0, len - 1);
    }
    if (input.length === 1 && parseInt(input) > 2) return '0' + input;
    if (input.length === 2 && parseInt(input[2]) > 3) return input[0] + '3';
    if (input.length === 3 && parseInt(input[2]) > 5) {
      return input.substring(0, 2) + ':0' + input[2];
    }
    if (input.length === 4 && parseInt(input[3]) > 5) {
      const test = input.substring(0, 2) + ':0' + input[3];
      return test;
    }
    if (input.length === 3 && !input.includes(':'))
      return input.substring(0, 2) + ':' + input[2];
    if (input.length > 5) return input.substring(0, 5);
    return input;
  };

  const renderTextField = useCallback(() => {
    return (
      <TextField
        placeholder="hh:mm"
        value={formatTime(tempValue)}
        onChange={(event) => {
          const targetValue = event.target.value;
          const newValue = formatTime(targetValue);
          setTempValue(() => newValue);
          if (newValue.length === 5) {
            let hours = parseInt(newValue.substring(0, 2));
            let minutes = parseInt(newValue.substring(3));
            if (minutes === 0) minutes = '00';
            const seconds = 0;
            if (hours >= 12) {
              setPeriod('pm');
              onChange(
                set(new Date(), {
                  hours: hours,
                  minutes,
                  seconds,
                })
              );
              if (hours === 0) hours = '00';
              if (hours !== 12) hours -= 12;
              if (hours < 10) hours = '0' + hours;
              setTempValue(() => {
                return `${hours}:${minutes}`;
              });
            } else if (hours < 12) {
              onChange(
                set(new Date(), {
                  hours: period === 'pm' ? hours + 12 : hours,
                  minutes,
                  seconds,
                })
              );
              if (hours === 0) hours = '00';
              else if (hours < 10) hours = '0' + hours;
              setTempValue(`${hours}:${minutes}`);
            } else if (period === 'pm')
              onChange(
                set(new Date(), {
                  hours: hours + 12,
                  minutes,
                  seconds,
                })
              );
            else if (period === 'am')
              onChange(
                set(new Date(), {
                  hours,
                  minutes,
                  seconds,
                })
              );
          }
          if (newValue.length < 5) {
            onChange(null);
          }
        }}
        sx={{
          position: 'relative',
          zIndex: 0,
          width: '100px',
          marginBottom: displayErrorMessage ? '30px' : '0',
          input: { height: '34px' },
          fieldset: {
            borderRight: 'none',
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderColor: '#707070 !important',
            borderWidth: '1px !important',
          },
        }}
      />
    );
  }, [tempValue]);

  return (
    <Fragment>
      <Stack sx={{ marginTop: displayErrorMessage ? '0' : '80px' }}>
        <Typography
          sx={{
            fontSize: '10px',
            fontWeight: 500,
            marginLeft: '-100px',
            marginBottom: '5px',
          }}
        >
          Select time
        </Typography>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {renderTextField()}
          </LocalizationProvider>
          <Select
            value={period}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={(event) => {
              const hours = getHours(value);
              const minutes = getMinutes(value);
              const targetPeriodValue = event.target.value;
              const seconds = 0;
              if (tempValue.length !== 5) {
                console.log('inside if', value);
                setPeriod(event.target.value);
                return;
              }
              console.log('past if');
              if (hours >= 12) {
                console.log('greater than 12', hours, period);
                onChange(
                  set(new Date(), {
                    hours: targetPeriodValue === 'am' ? hours - 12 : hours,
                    minutes,
                    seconds,
                  })
                );
              } else {
                console.log('less than 12', hours, period);
                onChange(
                  set(new Date(), {
                    hours: targetPeriodValue === 'pm' ? hours + 12 : hours,
                    minutes,
                    seconds,
                  })
                );
              }
              const periodValue = event.target.value;
              setPeriod(periodValue);
            }}
            sx={{
              width: '70px',
              fieldset: {
                borderLeft: 'none',
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                borderColor: '#707070 !important',
                borderWidth: '1px !important',
              },
            }}
          >
            <MenuItem value="am">am</MenuItem>
            <MenuItem value="pm">pm</MenuItem>
          </Select>
        </Box>
      </Stack>
    </Fragment>
  );
};
