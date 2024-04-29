import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

export const Search = ({ data }) => {
    return(
        <TextField
            placeholder="Search for clients"
            InputProps={{
                endAdornment: <SearchIcon/>
            }}
            sx={{
                width: "100%",
                backgroundColor: "#fff",
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "none"
                },
                height: "50px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px"
            }}
        />
    )
}