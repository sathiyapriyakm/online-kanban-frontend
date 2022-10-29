import {
    Typography,
    // Container,
    // Grid,
    Paper,
    // Box,
    // Stack,
    // IconButton,
  } from "@mui/material";
  import React, { useState,useContext, useEffect } from "react";
  import { useNavigate ,useParams} from "react-router-dom";
//   import Card from "@mui/material/Card";
//   import CardMedia from "@mui/material/CardMedia";
  import { ColorButton } from "../login/Login";
//   import InfoIcon from "@mui/icons-material/Info";
//   import QuizIcon from '@mui/icons-material/Quiz';
  import { API } from "../../global";
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableRow from '@mui/material/TableRow';
  import { AppContext } from "../../contexts/AppState";
  
  export const ViewTask = () => {

  const { token } = useContext(AppContext);
    const [task,setTask]=useState(null);
  
    const navigate = useNavigate();
    const {taskId} = useParams();
    const getTask=()=>{
        fetch(`${API}/admin/task/${taskId}`,{
          method:"GET",
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        },
        }
        )
        .then((data)=>{
          if(data.status===401){  
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userType");
            navigate("/");
            } 
          return data.json()})
        .then((mv)=>setTask(mv))
        } 
      function  handleDelete(deletionId){

      }

      useEffect(()=>getTask(),[]);
    return (task?
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
                    <TableCell align="center">Task ID</TableCell>
                    <TableCell align="center">{task._id}</TableCell>
                  </TableRow>
  
                  <TableRow>
                    <TableCell align="center"> Task Name</TableCell>
                    <TableCell align="center">{task.taskName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Assignee</TableCell>
                    <TableCell align="center">{task.assigneeEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Task Info</TableCell>
                    <TableCell align="center">{task.taskDetail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Expected completion date</TableCell>
                    <TableCell align="center">{task.taskEndDate}</TableCell>
                  </TableRow> 
                  <TableRow>
                    <TableCell align="center">Task Status</TableCell>
                    <TableCell align="center">{task.taskStatus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Hi</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
  
  
            <ColorButton
              className="add-user-btn"
              type="submit"
              variant="contained"
            //   startIcon={<ArrowBackIosIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </ColorButton>
          </div>
        </div>
      </div>
      : <h3> Loading.....</h3>
    );
  };
  