import { createContext } from 'react';
import { API } from '../global';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const token = localStorage.getItem('token');
export const AppContext = createContext();
 

export const Appstate = (props) => {
const navigate =useNavigate();
  const [taskList, setTaskList] = useState(null);
  const [token,setToken]=useState(localStorage.getItem("token"));

  const getOpenTasks = () => {
    fetch(`${API}/admin/tasks`, {
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

  const handleDelete = (deletionId) => {
    fetch(`${API}/admin/event/${deletionId}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`, // notice the Bearer before your token
    },
    }).then((res) =>{
      if(res.status===401){  
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        navigate("/");
        }
      return getOpenTasks()})
  };
  
  

  return (
    <AppContext.Provider
      value={{
        taskList,
        getOpenTasks,
        handleDelete,
        token,
        setToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default Appstate