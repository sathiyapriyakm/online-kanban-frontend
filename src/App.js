import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login.js";
import { NotFound } from "./components/pageNotFound/NotFound";
import { ForgetPassword } from "./components/forgetPassword/ForgetPassword";
import { ChangePassword } from "./components/forgetPassword/ChangePassword";
import React from "react";
import { AdminLogin } from "components/adminLogin/AdminLogin";
import {MiniDrawer} from "./MiniDrawer";
import { Appstate } from "./contexts/AppState";

function App() {


  return (
    <div className="App">
<Appstate>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />=
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route
          path="/AdminOpenTasks"
          element={<MiniDrawer flow="AdminOpenTasks" user="admin" />}
        />
        <Route
          path="/AdminCriticalTasks"
          element={<MiniDrawer flow="AdminCriticalTasks" user="admin" />}
        />
        <Route
        path="/AdminClosedTasks"
        element={<MiniDrawer flow="AdminClosedTasks" user="admin" />}
      />
        <Route
        path="/AdminDashboard"
        element={<MiniDrawer flow="AdminDashboard" user="admin" />}
      />
        <Route
          path="/AddNewTask"
          element={<MiniDrawer flow="AddNewTask" user="admin" />}
        />
        <Route
        path="/task/edit/:taskId"
        element={<MiniDrawer flow="EditTask" user="admin" />}
        /> 
        <Route
        path="/viewTask/:taskId"
        element={<MiniDrawer flow="ViewTask" user="admin" />}
        /><Route
        path="/viewUserTask/:taskId"
        element={<MiniDrawer flow="ViewUserTask" user="student" />}
        />
        <Route
        path="/viewUserClosedTask/:taskId"
        element={<MiniDrawer flow="ViewUserClosedTask" user="student" />}
        />
        <Route
        path="/UserDashboard"
        element={<MiniDrawer flow="UserDashboard" user="student" />}
        />
        <Route
        path="/UserOpenTasks"
        element={<MiniDrawer flow="UserOpenTasks" user="student" />}
        />
        <Route
        path="/UserCompletedTasks"
        element={<MiniDrawer flow="UserCompletedTasks" user="student" />}
        />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/404-Page" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404-Page" />} />
        <Route path="/reset-password/:id/:token" element={<ChangePassword />} />
      </Routes>
      </Appstate>
    </div>
  );
}

export default App;


