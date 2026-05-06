import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Groups from './pages/Groups';
import Messages from './pages/Messages';
import Market from './pages/Market'; // Make sure to import Market too!
import ChatScreen from './pages/ChatScreen';
import Profile from './pages/Profile';
import ChatDetail from './pages/Chatscreen';
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Main Application Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/market" element={<Market />} />
        <Route path="/notifications" element={<Messages />} />
        <Route path="/chat/:id" element={<ChatScreen />} />
        <Route path="/profile" element={<Profile />} />
      
        {/* Optional: A route for individual chat details if needed */}
        <Route path="/chat/:id" element={<ChatDetail />} />
      </Routes>
<Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/messages" element={<Messages />} /> {/* 2. Place this route here */}
  {/* ... other routes */}
</Routes>

    </Router>
  );
}

export default App;