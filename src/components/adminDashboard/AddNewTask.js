import React,{useContext} from "react";
import {Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";
import "./adminDashboard.css";
import { ColorButton } from "components/login/Login";
import { AppContext } from "../../contexts/AppState";


// const token = localStorage.getItem('token')



export function AddNewTask() {
const {token} = useContext(AppContext);

  const addTask =(newTask) => {
  
    fetch(`${API}/admin/newTask`, {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`, // notice the Bearer before your token
  },
  }).then((res) => {
    if(res.status===401){  
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userType");
      navigate("/");
      }
    return navigate("/AdminOpenTasks")})
  };
  
  
  const navigate=useNavigate();
  const taskValidationSchema=yup.object({
    taskName:yup.string().required("Kindly fill the Task Name input field"),
    assigneeEmail:yup.string().email().required("Kindly fill assignee E-mail field field"),
    taskDetail:yup.string().required("Kindly provide link for task detail"),
    taskEndDate:yup.date().required("Kindly provide Task end Date"),
  })
  
  
  
  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
      taskName:"",
      assigneeEmail:"",
      taskDetail:"",
      taskEndDate:"",
    },
    validationSchema:taskValidationSchema ,
    onSubmit:(newTask)=>{
      addTask(newTask);
    },
  });
  
  return <div
      className="add-user-container">
      <div
        className="wrapper"
        style={{
          position: "relative",
          textAlign: "center",
          borderStyle: "solid",
          borderWidth: "2px",
          display: "inline-block",
        }}
      >
      <form onSubmit={handleSubmit}
      className="add-user-form" >
        <Typography
            variant="h4"
            pb={2}
            sx={{
              textAlign: "center",
            }}
          >
            Task Details
          </Typography>
        
        <TextField
        className="add-user-name"
        label="Task Name"
        type="text" 
        value={values.taskName} 
        name="taskName"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.taskName&&errors.taskName?true:false}
        helperText={touched.taskName&&errors.taskName?errors.taskName:""}
        />
        <TextField
        className="add-user-name"
        label="Assignee Email"
        type="email"
        value={values.assigneeEmail} 
        name="assigneeEmail"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.assigneeEmail&&errors.assigneeEmail?true:false}
        helperText={touched.assigneeEmail&&errors.assigneeEmail?errors.assigneeEmail:""}
        />
       <TextField
       className="add-user-name"
       label="Task Detail"
       type="text"
       value={values.taskDetail} 
       name="taskDetail"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.taskDetail&&errors.taskDetail?true:false}
       helperText={touched.taskDetail&&errors.taskDetail?errors.taskDetail:""}
       />
        
       <TextField
          className="add-user-name"
          label="Task End Date"
          type="date"
          value={values.taskEndDate} 
          name="taskEndDate"
          onChange={handleChange}
           onBlur={handleBlur}
           error={touched.taskEndDate&&errors.taskEndDate?true:false}
           helperText= {touched.taskEndDate&&errors.taskEndDate?errors.taskEndDate:""}
           focused
        />
        <ColorButton className="add-user-btn" 
        type="submit"
        variant="contained">ADD EVENT</ColorButton>
      </form> 
      </div>
    </div>;
}