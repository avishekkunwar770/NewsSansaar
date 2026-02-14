import { useState } from 'react';
import './App.css';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Sports } from "./pages/Sports";
import Technology from "./pages/Technology";
import Politics from "./pages/Politics";
import Entertainment from './pages/Entertainment';

// import { Entertainment } from "./pages/Entertainment";
import { Business } from "./pages/Business";
import Paragraph from "./components/Paragraph/Paragraph";
import Health from "./components/Health/Health";  
import Sported from "./components/Sported/Sported";
import Businesses from "./components/Business/Businesses";
import Foreign from "./components/Politicalimg1/Foreign";
import Local from "./components/Localelection/Local"; 
import Budget from "./components/Budget/Budget"; 
import Constitutional from "./components/Constitutional/Constitutional"; 
import Supreme from "./components/Supreme/Supreme"; 
import Quantum from "./components/Quantum/Quantum"; 
import Phone from "./components/Phone/phone";
import Major from "./components/Major/Major";
import Virtual from "./components/Virtual/virtual";
import Ai from "./components/Ai/Ai";
import Staff from "./components/Staff/Staff";  // Staff login component
import Admin from "./components/Admin/Admin";  // Admin login component
import Editor from "./components/Editor/Editor";  // Editor login component

// Dashboard components
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import WriterDashboard from "./pages/WriterDashboard";
import CreateNews from "./pages/CreateNews";
import ManageUsers from "./pages/ManageUsers";
import ManageCategories from "./pages/ManageCategories";
import ManageAds from "./pages/ManageAds";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/business" element={<Business />} />
        <Route path="/paragraph" element={<Paragraph />} />
        <Route path="/health" element={<Health />} /> 
        <Route path="/sported" element={<Sported />} /> 
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/foreign" element={<Foreign />} />
        <Route path="/local" element={<Local />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/constitutional" element={<Constitutional />} />
        <Route path="/supreme" element={<Supreme />} />
        <Route path="/quantum" element={<Quantum />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/major" element={<Major />} />
        <Route path="/virtual" element={<Virtual />} />
        <Route path="/ai" element={<Ai />} />
        
        {/* Login Routes */}
        <Route path="/staff" element={<Staff />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/Admin" element={<Admin />} />
        
        {/* Dashboard Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/editor/dashboard" element={<EditorDashboard />} />
        <Route path="/writer/dashboard" element={<WriterDashboard />} />
        
        {/* Admin Management Routes */}
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-categories" element={<ManageCategories />} />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        
        {/* Article Management Routes */}
        <Route path="/writer/create-news" element={<CreateNews />} />
        <Route path="/writer/edit-news/:id" element={<CreateNews />} />
        <Route path="/editor/edit-news/:id" element={<CreateNews />} />
      </Routes>
    </Router>
  );
}

export default App;
