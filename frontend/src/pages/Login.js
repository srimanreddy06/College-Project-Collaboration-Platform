import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        const existingUser = JSON.parse(localStorage.getItem('user'));
        
        if (!existingUser) {
             localStorage.setItem('user', JSON.stringify({ 
                 name: 'Test Administrator', 
                 email: formData.email,
                 bio: 'Software enthusiast.',
                 skills: ['React', 'JavaScript']
             }));
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to collaborate on projects</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="student@college.edu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Login
                    </button>
                </form>

                <div className="divider">or continue with</div>

                <div className="social-login">
                    <button className="btn-social" type="button" onClick={() => { handleSubmit({ preventDefault: () => {} }) }}>
                        <FcGoogle size={20} />
                        Google
                    </button>
                    <button className="btn-social" type="button" onClick={() => { handleSubmit({ preventDefault: () => {} }) }}>
                        <FaGithub size={20} />
                        GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
