import { Avatar, Button, Container, Modal, TextField, Typography } from "@mui/material"
import { useEffect } from "react";
import { Colours } from "../../../colours"
import { useAxios } from "../../../hooks/axios";
import completeIcon from "../../../assets/icons/tick.svg"
import { useState } from "react";
import closeIcon from "../../../assets/icons/Close.svg";
import deleteIcon from "../../../assets/icons/delete-icon.svg";

const Task = ({ task, dispatch, openTasks }) => {
    const {executeWithData, response, error } = useAxios({
        url: `/tasks/${task._id}/complete-task`,
        method: "post"
    });
    const deleteTask = useAxios({
        url: `/tasks/${task._id}/delete-task`,
        method: "post"
    });
    useEffect(() => {
        console.log(response, task._id)
        if(localStorage.getItem("adminID") === task.adminId){
            if(!response || error) return;
            dispatch({
                type: "complete-task",
                payload: {
                    id: task._id,
                    complete: task.complete ? false : true
                }
            });
        }
        return;
    }, [response]);
    useEffect(() => {
        if(localStorage.getItem("adminID") === task.adminId){
            if(deleteTask.error || !deleteTask.response) return;
            dispatch({
                type: "delete-task",
                payload: task._id
            });
            console.log("Deleted")
        }
    }, [deleteTask.response]);
    return(
        <Container
            sx={{
                boxShadow: openTasks ? "unset" : "2px 2px 8px rgba(0,0,0,0.3)",
                borderBottom: `1px solid ${Colours.lightGrey}`,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                margin: "0 !important",
                borderRadius: openTasks ? "unset" : "15px",
                paddingBottom: openTasks ? "5px" : "inherit",
                minHeight: "55px",
                height: openTasks ? "auto" : "70px"
            }}
        >
            {
                openTasks && localStorage.getItem("adminID") === task.adminId ?
                <img
                    src={deleteIcon}
                    onClick={() => {
                        deleteTask.execute({});
                    }}
                    width="25px"
                    style={{
                        cursor: "pointer",
                        margin: "0 10px"
                    }}
                /> :
                <Avatar
                    src={task.photo}
                    sx={{
                        width: "40px",
                        height: "40px"
                    }}
                />
            }
            <Container>
                <Typography
                    sx={{
                        fontSize: "14px"
                    }}
                >
                    { task.admin }
                </Typography>
                <Typography
                    sx={{
                        fontSize: "12px",
                        color: Colours.darkGrey
                    }}
                >
                    { !openTasks ? `${task.content.substring(0,15)}...` : task.content }
                </Typography>
            </Container>
            <img
                width={20}
                height={20}
                style={{
                    borderRadius: "30%",
                    backgroundColor: Colours.main,
                    cursor: "pointer"
                }}
                src={task.complete ? completeIcon : undefined}
                onClick={() => {
                    if(localStorage.getItem("adminID") === task.adminId){
                        executeWithData({ complete: task.complete ? false : true });
                    }
                }}
            />
        </Container>
    )
}

export const Tasks = ({ tasks, dispatch }) => {
    const [openTasks, setOpenTasks] = useState(false);
    const [openNewTask, setOpenNewTask] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { executeWithData, response, error } = useAxios({
        url: "/tasks/create-task",
        method: "post"
    });
    const createNewTask = () => {
        if(title !== "" && title !== ""){
            executeWithData({
                admin: localStorage.getItem("adminID"),
                title,
                content,
            });
            setOpenNewTask(false);
            setTitle("")
            setContent("")
        }
    }
    useEffect(() => {
        if(!response || error) return;
        dispatch({
            type: "create-task",
            payload: response.task
        });
    }, [response]);
    return (
        <Container
            sx={{
                margin:"0px 0 0 0 !important",
                padding: openTasks ? "0 7px !important" : "0 !important",
                position: openTasks && "absolute",
                top: openTasks && 0,
                bottom: openTasks && 0,
                height: openTasks && "1000px",
                backgroundColor: openTasks && "#fff",
                width: openTasks ? "25%": "100%"
            }}
        >
            <Modal
                open={openNewTask}
                onClose={() => setOpenNewTask(false)}
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "50%",
                        width: "50%",
                        gap:"20px",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        borderRadius: "30px",
                        padding: "50px !important"
                    }}
                    component={"form"}
                    onSubmit={createNewTask}
                >
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: "500",
                            textAlign: "center"
                        }}
                    >
                        Create a new task
                    </Typography>
                    <TextField
                        placeholder="Task title"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                    <TextField
                        placeholder="What is your task?"
                        onChange={(event) => setContent(event.target.value)}
                        value={content}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: "10px",
                            color: "#fff",
                            backgroundColor: "#000",
                            "&:hover": {
                                backgroundColor: "#000"
                            },
                            transformStyle: "none"
                        }}
                        type="submit"
                    >
                        Create
                    </Button>
                </Container>
            </Modal>
            {
                openTasks && 
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "10px",
                        padding: "10px 0",
                        cursor: "pointer",
                        margin: "20px 0 !important",
                    }}
                    onClick={() => setOpenTasks(false)}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: Colours.darkGrey
                        }}
                    >
                        close
                    </Typography>
                    <img
                        src={closeIcon}
                        width="20px"
                        style={{
                            cursor: "pointer"
                        }}
                    />
                </Container>
            }
            <Container
                sx={{
                    margin: openTasks ? "20px 0 !important" : "0 !important",
                    padding: "0 15px 10px 15px !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: Colours.darkGrey,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                    }}
                >
                    Tasks
                    <Typography
                        sx={{
                            backgroundColor: 'white',
                            padding: "5px",
                            fontSize: "14px",
                            borderRadius: "40%"
                        }}
                    >
                        { tasks.length }
                    </Typography>
                </Typography>
                {
                    openTasks ?
                    <Button
                        variant="contained"
                        onClick={() => setOpenNewTask(true)}
                        sx={{
                            borderRadius: "10px",
                            color: "#fff",
                            backgroundColor: "#000",
                            "&:hover": {
                                backgroundColor: "#000"
                            },
                            transformStyle: "none"
                        }}
                    >
                        New task
                    </Button>:
                    <Typography
                        sx={{
                            fontSize: "14px",
                            cursor: "pointer",
                            fontWeight: "500",
                        }}
                        onClick={() => {
                            setOpenTasks(true);
                            window.scroll({
                                top: 0, 
                                right: 0, 
                                behavior: 'smooth' 
                            });
                        }}
                    >
                        See all
                    </Typography>
                }
            </Container>
            <Container
                sx={{
                    margin: "0 !important",
                    padding: "0 !important",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            >
                {
                    openTasks ?
                    tasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            dispatch={dispatch}
                            openTasks={openTasks}
                        />
                    )) :
                    tasks.slice(0, 2).map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            dispatch={dispatch}
                            openTasks={openTasks}
                        />
                    ))
                }
            </Container>
        </Container>
    )
}
