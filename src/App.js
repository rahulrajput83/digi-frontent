import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Admin from "./components/Admin/Admin";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz/Quiz";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";

const AdminRoute = ({ user, children }) => {
  if (user.hasOwnProperty('email') && user.role === 'Admin') {
    return children;
  }
  return <Navigate to='/signin' replace />
}

const UserRoute = ({ localData, children }) => {
  if (localData.hasOwnProperty('role') && localData.role === 'User') {
    return children;
  }
  return <Navigate to='/signin' replace />
}

function App() {
  const user = useSelector((state) => state.user);
  const [localData, setLocalData] = useState(() => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : {};
  })

  useEffect(() => {
    console.log(localData)

  }, [localData])


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<AdminRoute user={user}><Admin /></AdminRoute>} />
        <Route path="/quiz/:id" element={<UserRoute localData={localData}><Quiz /></UserRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
