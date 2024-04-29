import { useState, Fragment } from "react";
import {
  IconButton,
  Paper,
  Box,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { add, sub, format } from "date-fns";
import { Colours } from "../../../colours";

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const separate = useMediaQuery("(max-width:1170px)");

  return (
    <Fragment>
      <Paper
        component="div"
        sx={{
          // ".css-7kykdr-MuiButtonBase-root-MuiIconButton-root": {
          //   color: "white !important"
          // },
          // ".css-169iwlq-MuiCalendarPicker-root": {
          //   height: "330px",
          //   backgroundColor: `${Colours.blue} !important`
          // },
          // ".css-1wvgxus-MuiCalendarPicker-viewTransitionContainer": {
          //   overflow: "hidden !important"
          // },
          // ".css-187ku84-MuiButtonBase-root-MuiPickersDay-root": {
          //   backgroundColor: "unset",
          //   color: `white !important`
          // },
          // ".css-187ku84-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover": {
          //   backgroundColor: Colours.yellow,
          //   color: `black !important`
          // },
          // ".css-187ku84-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
          //   backgroundColor: `${Colours.yellow} !important`,
          //   color: `black !important`
          // },
          // ".css-1vmppb0-MuiButtonBase-root-MuiPickersDay-root": {
          //   backgroundColor: "unset",
          //   color: `white !important`
          // },
          // ".css-1tmc306-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
          //   backgroundColor: `${Colours.yellow} !important`,
          //   color: `black !important`
          // },
          // ".css-1tmc306-MuiButtonBase-root-MuiPickersDay-root": {
          //   backgroundColor: "unset",
          //   color: `white !important`
          // },
          // ".css-rcvsew-MuiTypography-root": {
          //   color: "rgba(255, 255, 255, 0.6)"
          // },
          // ".css-1p7hay7": {
          //   color: "white"
          // },
          boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
          borderRadius: "10px",
          "& .MuiPickerStaticWrapper-content": {
            borderRadius: "10px",
            backgroundColor: Colours.blue,
            color: "#fff"
          },
          "& .MuiPickersDay-root": {
            color: "white",
            backgroundColor: Colours.blue
          },
          "& .MuiPickersDay-today": {
            color: "#000",
            backgroundColor: `${Colours.yellow} !important`
          },
          "& .MuiPickersDay-dayOutsideMonth": {
            color: Colours.darkGrey
          },
          "& .MuiTypography-caption": {
            color: "white"
          }
        }}
      >
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          showToolbar={false}
          showDaysOutsideCurrentMonth={true}
          onChange={(newValue) => setDate(newValue)}
          value={date}
          renderInput={(params) => <TextField {...params} />}
        />
      </Paper>
    </Fragment>
  );
};
