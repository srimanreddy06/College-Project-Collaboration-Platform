import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/projects" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-project" element={<CreateProject />} />
                        {/* Fallback route */}
                        <Route path="*" element={<Navigate to="/projects" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
