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

export const ViewUserClosedTask = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const { taskId } = useParams();
    const [task, setTask] = useState(null);

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

                               {task.progress.map((state) => (
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

                    <ColorButton
                        className="add-user-btn"
                        type="submit"
                        variant="contained"
                        onClick={() => navigate(`/UserCompletedTasks`)}
                    >
                        Back
                    </ColorButton>
                </div>
            </div>
        </div>
        : <h3> Loading.....</h3>
    );
};


