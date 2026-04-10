import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { mockProjectsList } from '../utils/mockData';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);

    // eslint-disable-next-line
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            navigate('/login');
        } else {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.skills && storedUser.name) {
                setUser(storedUser);
            } else {
                setUser({
                    name: 'Sarah Chen',
                    email: 'sarah@college.edu',
                    bio: 'Final year CS student passionate\nabout AI & full-stack development.',
                    skills: ['React', 'Python', 'Machine Learning', 'Tailwind CSS', 'Node.js']
                });
            }
            let savedProjects = JSON.parse(localStorage.getItem('collegeCollabProjects')) || [];
            // To ensure dashboard looks rich natively, combine user tasks with default gallery
            setProjects([...savedProjects, ...mockProjectsList]);
        }
    }, [navigate]);

    if (!user) return null;

    const initials = "SC";

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">

                {/* Hero Section */}
                <div className="hero-section">
                    <h1 className="hero-title">
                        Hello, {user.name}! <span role="img" aria-label="wave">👋</span>
                    </h1>
                    <p className="hero-subtitle">Welcome to your dashboard. Here is an overview of your activity.</p>
                </div>

                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-left">
                        <div className="profile-avatar">{initials}</div>
                        <div className="profile-info">
                            <div className="profile-name-row">
                                <span className="profile-name">{user.name}</span>
                                <span className="badge-student">Student</span>
                            </div>
                            <span className="profile-email">{user.email}</span>
                            <p className="profile-bio">{user.bio}</p>
                        </div>
                    </div>
                    <div className="profile-right">
                        <div className="skills-row">
                            {user.skills.map((skill, i) => (
                                <span key={i} className="pill-outline" style={i > 2 ? { marginTop: '4px' } : {}}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="stats-row">
                    <div className="stat-box">
                        <span className="stat-label">My Projects</span>
                        <span className="stat-value">{projects.length > 0 ? projects.length : 1}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Collaborations</span>
                        <span className="stat-value">3</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Total Skills</span>
                        <span className="stat-value">5</span>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="projects-header">
                    <h2 className="projects-title">Your Projects</h2>
                    <Link to="/create-project" className="btn-new-project" style={{ textDecoration: 'none' }}>
                        + New Project
                    </Link>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {projects.map(p => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
