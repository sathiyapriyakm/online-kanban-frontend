
import {Typography} from "@mui/material";
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
import { API } from "../../global";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {IconButton} from "@mui/material";

export const AdminClosedTasks = () => {
  const navigate=useNavigate();

  const { token } = useContext(AppContext);
  const [taskList, setTaskList] = useState(null);
  const [asignee, setAsignee] = useState("");
  const getClosedTasks = () => {
    fetch(`${API}/admin/closedTasks`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`, // notice the Bearer before your token
    },
    })
      .then((data) => {
        if(data.status===401){  
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userType");
          navigate("/");
          }
        return data.json()})
      .then((events) => {
        setTaskList(events)
  })
  }


  const handleChange = (e) => {
    setAsignee(e.target.value);
    getClosedTasks();

  };
  const handleKeyUp=(e)=>{
      if (e.key === 'Enter' || e.keyCode === 13) {
        handleSearch();
      }
  }

  const handleSearch = () => {
    if (asignee) {
    let newTask=[];
    newTask= taskList.filter((task)=>task.assigneeEmail===asignee);
    return setTaskList(newTask);
    }
  }

  useEffect(() => getClosedTasks(), []);
  return (taskList?
    <>
    <Typography
            variant="h4"
            pb={2}
            sx={{
              textAlign: "center"
            }}
          >
           Closed Tasks
          </Typography>
          <div className="searchAssignee">
        <input
        className="assigneeInput"
          type="text"
          placeholder="Search by Assignee email "
          onChange={handleChange} 
          onKeyUp={handleKeyUp}
          />

        <IconButton
          aria-label="Event Details"
          onClick={handleSearch}
        >
          <SearchOutlinedIcon />
        </IconButton>
        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead >
          <TableRow >
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Task Id</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Task Name</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Assignee</TableCell>
            <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Expected Completion Date</TableCell>
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

