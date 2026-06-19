import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Groups from './pages/Groups';
import Messages from './pages/Messages';
import Market from './pages/Market'; 
import ChatScreen from './pages/ChatScreen';
import Profile from './pages/Profile';
import MenuScreen from './pages/MenuScreen.jsx';
// 1. IMPORT THE NEW SEPARATE COMPONENT HERE:
import Notifications from './pages/Notifications.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/market" element={<Market />} />
        <Route path="/messages" element={<Messages />} />
        
        {/* 2. POINT THIS DIRECTLY TO ITS OWN COMPONENT NOW: */}
        <Route path="/notifications" element={<Notifications />} />
        
        <Route path="/chat/:id" element={<ChatScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<MenuScreen />} /> 
      </Routes>
    </Router>
  );
}

export default App;