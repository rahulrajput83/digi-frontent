/* Imports */
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Admin from "./components/Admin/Admin";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz/Quiz";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";

/* Private route for 'Admin'. */
const AdminRoute = ({ user, children }) => {
  if (user && user.role === 'Admin') {
    return children;
  }
  return <Navigate to='/signin' replace />
}

/* Private route for 'User'. */
const UserRoute = ({ user, children }) => {
  if (user && user.role === 'User') {
    return children;
  }
  return <Navigate to='/signin' replace />
}

/* App Functional Component */
function App() {
  const user = useSelector((state) => state.user);

  return (
    /* Browser Router */
    <BrowserRouter>
    {/* Navbar for all Routes */}
      <Navbar />
      {/* All Routes */}
      <Routes>
        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />
        {/* Signin Route */}
        <Route path="/signin" element={<Signin />} />
        {/* Home Route for 'Admin' */}
        <Route path="/" element={<AdminRoute user={user}><Admin /></AdminRoute>} />
        {/* Quiz Route for 'User' */}
        <Route path="/quiz/:id" element={<UserRoute user={user}><Quiz /></UserRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
