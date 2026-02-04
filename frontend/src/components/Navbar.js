import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    // Mock auth state for UI demo
    const user = localStorage.getItem('user');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    CollegeCollab
                </Link>
                <div className="navbar-links">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/projects" className="nav-link">Projects</Link>
                            <Link to="/create-project" className="nav-link">Create Project</Link>
                            <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/projects" className="nav-link">Browse Projects</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
