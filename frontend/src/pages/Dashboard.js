import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './Dashboard.css';

const Dashboard = () => {
    // Mock User Data
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Student' };

    // Mock My Projects
    const myProjects = [
        {
            id: 1,
            title: 'AI Study Assistant',
            description: 'A React and Python based web app that helps students organize study schedules using AI.',
            author: 'Me',
            category: 'Web App'
        }
    ];

    return (
        <div className="dashboard container">
            <div className="dashboard-header">
                <h1>Hello, {user.name}!</h1>
                <p>Welcome to your dashboard. Here is an overview of your activity.</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>My Projects</h3>
                    <p className="stat-number">{myProjects.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Collaborations</h3>
                    <p className="stat-number">2</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Requests</h3>
                    <p className="stat-number">1</p>
                </div>
            </div>

            <div className="section-title">
                <h2>Your Projects</h2>
            </div>

            <div className="projects-grid">
                {myProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
