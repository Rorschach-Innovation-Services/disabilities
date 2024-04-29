import { Add } from "@mui/icons-material"
import { Avatar, Badge, Container, IconButton, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useAxios } from "../../../hooks/axios";
import { BUCKET, useMediaStorage } from "../../../hooks/media";
import AddIcon from '@mui/icons-material/Add';
import { Colours } from "../../../colours";

export const ProfileAvatar = ({ dispatch, data }) => {
    const uploadInputRef = useRef(null);
    const { store } = useMediaStorage();
    const [fileStatus, onFileUpload] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const { executeWithData , error, response } = useAxios({
        url: `/admin/${data.admin._id}/upload-photo`,
        method: "post"
    });
    useEffect(() => {
        if(error || !response) return;
        dispatch({
            type: "set-photo",
            payload: response.photo
        });
        localStorage.setItem("adminPhoto", response.photo)
    }, [response, error]);
    const onInputChange = () => {
        const file = uploadInputRef.current.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            // update state
            store(file && file.name ? file.name : "", event.target.result);
            executeWithData({ photo: `https://${BUCKET}.s3.af-south-1.amazonaws.com/${file && file.name ? file.name : ""}`})
            enqueueSnackbar(`${file.name} saved`, {
                variant: "success",
            });
        };
        reader.readAsArrayBuffer(file);
        //displays the file name and format
        onFileUpload(`File Uploaded: ${file.name}`);
        setTimeout(() => { onFileUpload("") }, [1000]);
    };
    return(
        <Container
            sx={{
                padding: "10px !important",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                width: "220px",
                flex: 1,
                height: "230px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                margin: "0 !important",
                gap: "5px"
            }}
        >
            <IconButton
                onClick={() => {
                    uploadInputRef.current && uploadInputRef.current.click();
                }}
            >
                <Avatar
                    src={data.photo}
                    sx={{
                        border: "4px solid #fff",
                        width:"90px",
                        height: "90px",
                        padding: "0 !important"
                    }}
                />
                <AddIcon
                    sx={{
                        position: "relative",
                        top: "25px",
                        right: "25px",
                        borderRadius: "50%",
                        color: Colours.blue,
                        backgroundColor: Colours.main
                    }}/>
                <input
                    ref={uploadInputRef}
                    type="file"
                    hidden
                    accept=".png, .jpg, .jpeg"
                    onChange={onInputChange}
                />
            </IconButton>
            <Typography
                sx={{
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#000"
                }}
            >
                Your Avatar
            </Typography>
            <Typography
                sx={{
                    color: "#000",
                    fontSize: "18px",
                    fontWeight: "500"
                }}
            >
                {data.name}
            </Typography>
            <Typography
                sx={{
                    color: "green",
                    fontSize: "14px",
                    fontWeight: "500"
                }}
            >
                {fileStatus}
            </Typography>
        </Container>
    )
}