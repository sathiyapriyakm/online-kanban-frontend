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
  import { API } from "../../global";
  
  export const UserOpenTasks = () => {
    const navigate=useNavigate(); 
    const { token } = useContext(AppContext);
    const email = localStorage.getItem('userEmail');
    const [userOpenTaskList, setUserOpenTaskList] = useState(null);
  
    const getUserOpenTasks = () => {
        fetch(`${API}/user/tasks/open/${email}`, {
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
          .then((tasks) => {
            setUserOpenTaskList(tasks)
      })
      }
  
    useEffect(() => getUserOpenTasks(), []);
    return (userOpenTaskList?
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
              <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Completion Date</TableCell>
              <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Status</TableCell>
              <TableCell align="center" style={{fontSize:"20px",fontWeight:"500",fontStyle:"bold"}}>Detailed View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOpenTaskList.map((task)=>(
              <TableRow key={task._id}>
                <TableCell align="center">{task._id}</TableCell>
                <TableCell align="center">{task.taskName}</TableCell>
                <TableCell align="center">{task.taskEndDate}</TableCell>
                <TableCell align="center">{task.taskStatus}</TableCell>
                <TableCell align="center">
                <ColorButton
                    variant="contained"
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    onClick={() => navigate(`/viewUserTask/${task._id}`)}
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
  
  