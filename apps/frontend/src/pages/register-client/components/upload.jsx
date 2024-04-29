import React, { useRef, useState, useEffect } from "react";
import {
  Typography,
  Button,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useSnackbar } from "notistack";
import uploadIcon from "../../../assets/icons/download.svg"

export const Upload = ({
  title,
  support,
  accept,
  name,
  executeDispatch,
}) => {
  const uploadInputRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [fileStatus, onFileUpload] = useState("");

  const onInputChange = () => {
    const file = uploadInputRef.current.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      // update state
      executeDispatch({
        data: event.target.result,
        filename: file && file.name ? file.name : "",
      });
      setUploaded(true);
      enqueueSnackbar(`${file.name} saved a ${name} file.`, {
        variant: "success",
      });
    };
    if (name === "logo") reader.readAsArrayBuffer(file);
    else {
      executeDispatch({ data: file, filename: file.name });
      setUploaded(true);
    }
    //displays the file name and format
    onFileUpload(`File Uploaded: ${file.name}`);
  };

  return (
    <Container
      sx={{
        backgroundColor: "#FFEE82",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "200px",
        border: "2px dotted #000",
        borderRadius: "20px",
        marginTop: "30px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.3)"
      }}
    >
      <img
        src={uploadIcon}
        width="40px"
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography variant="subtitle2" sx={{ width: "185px" }}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            uploadInputRef.current && uploadInputRef.current.click();
          }}
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "transparent",
              border: "2px dotted #000",
            },
            color: "#000",
            fontSize: "12px",
            border: "2px dotted #000",
            borderRadius: "15px",
            margin: "5px 0",
            width: "120px"
          }}
        >
          Browse files
          <input
            ref={uploadInputRef}
            type="file"
            name={name}
            hidden
            accept={accept}
            onChange={onInputChange}
          />
        </Button>
        <Typography variant="subtitle2">Supports: {support}</Typography>
        <Typography variant="subtitle2">{fileStatus}</Typography>
      </Container>
    </Container>
  );
};
