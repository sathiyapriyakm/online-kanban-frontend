import React from "react";
import { useState,useContext } from "react";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import {Typography} from '@mui/material';
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";
import { ColorButton } from "components/login/Login";
import { AppContext } from "../../contexts/AppState";

// const token = localStorage.getItem('token');

export function EditTask() {
  const { token } = useContext(AppContext);
  const { taskId } = useParams();
  const [task,setTask]=useState(null);
  const navigate=useNavigate();
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
  useEffect(()=>getTask(),[]);

  return (task?<EditForm task={task}/>:<h3>Loading...</h3>);
  }
  const taskValidationSchema=yup.object({
    taskName:yup.string().required("Kindly fill the Task Name input field"),
    assigneeEmail:yup.string().email().required("Kindly fill assignee E-mail field field"),
    taskDetail:yup.string().required("Kindly provide link for task detail"),
    taskEndDate:yup.date().required("Kindly provide Task end Date"),
    taskStatus:yup.string(),
    comments:yup.string(),
    blockingPoint:yup.string(),
  })

  function EditForm({task}){
    const { token } = useContext(AppContext);

  const navigate = useNavigate();

    const editEvent =(updatedTask) => {
      try{
      fetch(`${API}/admin/task/${task._id}`,
      {
        method:"PUT",
        body: JSON.stringify(updatedTask),headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`, // notice the Bearer before your token
      },
    }).then((res)=>{
      if(res.status===401){  
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        navigate("/");
        } 
      return navigate(`/AdminOpenTasks`)})
    .catch((e)=>console.log("ERROR"))  
  }catch(err){
    console.log(err);
     navigate("/")
    };
    };

    const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
      initialValues:{
        taskName:task.taskName,
        assigneeEmail:task.assigneeEmail,
        taskDetail:task.taskDetail,
        taskEndDate:task.taskEndDate,
        taskStatus:task.taskStatus,
        comments:task.comments,
        blockingPoint:task.blockingPoint
      },
      validationSchema:taskValidationSchema ,
      onSubmit:(updatedTask)=>{
        console.log("onSubmit",updatedTask);
        editEvent(updatedTask);
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
          Edit Task Details
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
       <TextField
        className="add-user-name"
        label="Task Status"
        type="text"
        value={values.taskStatus} 
        name="taskStatus"
        onChange={handleChange}
         onBlur={handleBlur}
         error={touched.taskStatus&&errors.taskStatus?true:false}
         helperText= {touched.taskStatus&&errors.taskStatus?errors.taskStatus:""}
      />
      <TextField
      className="add-user-name"
      label="Comments to change status"
      type="text"
      value={values.comments} 
      name="comments"
      onChange={handleChange}
       onBlur={handleBlur}
       error={touched.comments&&errors.comments?true:false}
       helperText= {touched.comments&&errors.comments?errors.comments:""}
    /> 
    <TextField
    className="add-user-name"
    label="Blocking Points"
    type="text"
    value={values.blockingPoint} 
    name="blockingPoint"
    onChange={handleChange}
     onBlur={handleBlur}
     error={touched.blockingPoint&&errors.blockingPoint?true:false}
     helperText= {touched.blockingPoint&&errors.blockingPoint?errors.blockingPoint:""}
  />
      <ColorButton className="add-user-btn" 
      type="submit"
      variant="contained">ADD EVENT</ColorButton>
    </form> 
    </div>
  </div>;
}