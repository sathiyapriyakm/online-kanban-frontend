import {
  IconButton,
} from "@mui/material";
import {Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React,{useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect ,useContext} from 'react'
import { ColorButton } from '../login/Login';
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../../contexts/AppState";

export const AdminOpenTasks = () => {
  const navigate=useNavigate();
  const { getOpenTasks, taskList } = useContext(AppContext);

const token = localStorage.getItem("token");



  useEffect(() => getOpenTasks(), []);
  return (taskList?
    <>
    <Typography
            variant="h4"
            pb={2}
            sx={{
              textAlign: "center"
            }}
          >
           Tasks Inprogress
          </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead >
          <TableRow >
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Task Id</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Task Name</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Assignee</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Completion Date</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Status</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Detailed View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList.map((task)=>(
            <TableRow key={task._id}>
              <TableCell align="center">{task._id}</TableCell>
              <TableCell align="center">{task.taskName}</TableCell>
              <TableCell align="center">{task.assigneeEmail}</TableCell>
              <TableCell align="center">{task.taskEndDate}</TableCell>
              <TableCell align="center">{task.taskStatus}</TableCell>
              <TableCell align="center">
              <ColorButton
                  variant="contained"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                  onClick={() => navigate(`/viewTask/${task._id}`)}
                > view in Detail
                </ColorButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </> : <h3>Loading.......</h3>
  )
}

