import {
    Typography,
    Paper,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColorButton } from "../login/Login";
import IconButton from '@mui/material/IconButton';
import InfoIcon from "@mui/icons-material/Info";
import { API } from "../../global";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { AppContext } from "../../contexts/AppState";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

export const ViewUserTask = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [openNextStage, setOpenNextStage] = useState(false);
    const [comment, setComment] = useState("");
    const [openStart, setOpenStart] = useState(false);
    const [blockingPoint, setBlockingPoint] = useState("");
    const [solution, setSolution] = useState("");
    const [openSolution,setOpenSolution]=useState(false);
   
    const handleClickOpenStart = () => {
        setOpenStart(true);
    };

    const handleCloseStart = () => {
        setOpenStart(false);
    };

    const handleClickOpenNextStage = () => {
        setOpenNextStage(true);
    };

    const handleCloseNextStage = () => {
        setOpenNextStage(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSolution = () => {
        setOpenSolution(true);
    };

    const handleCloseSolution = () => {
        setOpenSolution(false);
    };

    
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const changeStage = () => {
        handleCloseNextStage();
        const changeTaskstatus = () => {
            fetch(`${API}/user/changeStatus/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({task:task,comment:comment}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return getTask();
            })
            // .then((mv) => setTask(mv))
        }
        changeTaskstatus();

    }
    const startTask = () => {
        handleCloseStart();

        const startNewTask = () => {
            fetch(`${API}/user/startTask/${taskId}`, {
                method: "PUT",
                body: JSON.stringify(task),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return getTask();
            })
            // .then((mv) => setTask(mv))
        }
        startNewTask();


    }

    const saveBlockingPoint = () => {
        handleClose();
        const saveBp = () => {
            fetch(`${API}/user/saveBp/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({task:task,blockingPoint:blockingPoint}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return getTask();
            })
            // .then((mv) => setTask(mv))
        }
        saveBp();

    }

    const saveSolution = () => {
        handleCloseSolution();
        const saveSoln = () => {
            fetch(`${API}/user/saveSoln/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({task:task,solution:solution}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return getTask();
            })
            // .then((mv) => setTask(mv))
        }
        saveSoln();

    }

    const getTask = () => {
        fetch(`${API}/admin/task/${taskId}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        }
        )
            .then((data) => {
                if (data.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return data.json()
            })
            .then((mv) => setTask(mv))
    }

    useEffect(() => getTask(), []);


    return (task ?
        <div className="add-user-container">
            <div
                className="wrapper"
                style={{
                    position: "relative",
                    textAlign: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    display: "inline-block"
                }}
            >
                <div className="add-user-form">
                    <Typography
                        variant="h4"
                        pb={2}
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        Task Details
                    </Typography>
                   {task.taskStatus==="Closed"?<></> :<>
                    {task.blockingPoint ?
                        <Typography
                            variant="body2"
                            pb={2}
                            sx={{
                                textAlign: "center",
                                color: "red"
                            }}
                        >
                            Blocking point: {task.blockingPoint}
                        </Typography> : <></>
                    }
                    {task.solution ?
                        <Typography
                            variant="body2"
                            pb={2}
                            sx={{
                                textAlign: "center",
                                color: "green"
                            }}
                        >
                            solution: {task.solution}
                        </Typography> : <></>
                    }</>}


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        <Card sx={{ minWidth: 275, backgroundColor: "gray" }}>
                                            <CardContent>
                                                <Typography sx={{ mb: 1.5 }} variant="body2" component="div">
                                                    Task ID: {task._id}
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    Task : {task.taskName}
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    Task info: <IconButton
                                                        aria-label="Event Details"
                                                        color="secondary"
                                                        onClick={() => { window.open(`${task.taskDetail}`, "_blank") }}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    Deadline : {task.taskEndDate}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 900, color: "blue" }} variant="body2" component="div">
                                                    Status: {task.taskStatus}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </TableCell>
                                </TableRow>

                                {task.taskStatus === "yet to start" ? <></> : task.progress.map((state) => (
                                    <TableRow key={state.status}>
                                        <TableCell align="center" >
                                            <Card sx={{ minWidth: 275, backgroundColor: `${state.bg}` }}>
                                                <CardContent>
                                                    <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
                                                        {state.status}
                                                    </Typography>
                                                   {state.comments? <Typography variant="body2" component="div">
                                                        Comments: {state.comments}
                                                    </Typography>:<></>}

                                                    {state.changedAt?<Typography variant="body2" component="div">
                                                        Changed on : {state.changedAt}
                                                    </Typography>:<></>}
                                                </CardContent>
                                            </Card>
                                        </TableCell>
                                    </TableRow>
                                ))}



                            </TableBody>
                        </Table>
                    </TableContainer>
                    { task.taskStatus === "Closed" ? <></> :
                    <Typography>
                        {task.taskStatus === "yet to start" ? <><Button
                            className="user-btn"
                            type="submit"
                            variant="contained"
                            color="success"
                            style={{ marginRight: "7px" }}
                            onClick={handleClickOpenStart}
                        >
                            Start
                        </Button>
                            <Dialog
                                open={openStart}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleCloseStart}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent>
                                    Would you like to start the task?
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseStart}>No</Button>
                                    <Button onClick={startTask}>Yes</Button>
                                </DialogActions>
                            </Dialog>

                        </>
                            :
                            <Button
                                className="user-btn"
                                type="submit"
                                variant="contained"
                                color="success"
                                style={{ marginRight: "7px" }}
                                onClick={handleClickOpenNextStage}
                            >
                                Next Stage
                            </Button>}
                        <Dialog open={openNextStage} onClose={handleCloseNextStage} fullWidth>
                            <DialogTitle>Comment to move to next stage</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="comment"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseNextStage}>Cancel</Button>
                                <Button onClick={changeStage}>Next State</Button>
                            </DialogActions>
                        </Dialog>
                        {task.blockingPoint? <>
                            <Button
                            className="user-btn"
                            type="submit"
                            variant="contained"
                            color="error"
                            onClick={handleClickOpenSolution}
                        >
                           Update Solution
                        </Button>
                        <Dialog open={openSolution} onClose={handleCloseSolution} fullWidth>
                            <DialogTitle>solution for Blocking point</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    multiline
                                    rows={3}
                                    margin="dense"
                                    id="name"
                                    label="solution"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    onChange={(e) => setSolution(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseSolution}>Cancel</Button>
                                <Button onClick={saveSolution}>save</Button>
                            </DialogActions>
                        </Dialog>
                        
                        </> : <>
                        <Button
                            className="user-btn"
                            type="submit"
                            variant="contained"
                            color="error"
                            onClick={handleClickOpen}
                        >
                            Obstacles
                        </Button>
                        <Dialog open={open} onClose={handleClose} fullWidth>
                            <DialogTitle>Blocking point</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    multiline
                                    rows={3}
                                    margin="dense"
                                    id="name"
                                    label="Blocking point"
                                    type="text"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    onChange={(e) => setBlockingPoint(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={saveBlockingPoint}>save</Button>
                            </DialogActions>
                        </Dialog></>}



                    </Typography>}

                    <ColorButton
                        className="add-user-btn"
                        type="submit"
                        variant="contained"
                        onClick={() => navigate(`/UserOpenTasks`)}
                    >
                        Back
                    </ColorButton>
                </div>
            </div>
        </div>
        : <h3> Loading.....</h3>
    );
};


