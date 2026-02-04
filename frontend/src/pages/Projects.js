import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
    // Mock data
    const [projects] = useState([
        {
            id: 1,
            title: 'AI Study Assistant',
            description: 'A React and Python based web app that helps students organize study schedules using AI.',
            author: 'Sarah Chen',
            category: 'Web App'
        },
        {
            id: 2,
            title: 'Campus Marketplace',
            description: 'Mobile-first platform for students to buy and sell textbooks and furniture safely.',
            author: 'Mike Ross',
            category: 'Mobile'
        },
        {
            id: 3,
            title: 'EcoTrack IoT',
            description: 'IoT project using Arduino to monitor classroom energy usage and optimize lighting.',
            author: 'David Kim',
            category: 'Hardware'
        },
        {
            id: 4,
            title: 'Event Management System',
            description: 'Centralized portal for all college clubs to host events and track registrations.',
            author: 'Emily White',
            category: 'Web App'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="projects-page container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Explore Projects</h1>
                    <p className="page-subtitle">Discover what other students are building.</p>
                </div>
                <Link to="/create-project" className="btn btn-primary">
                    + Start New Project
                </Link>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="projects-grid">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}

                {filteredProjects.length === 0 && (
                    <div className="no-results">
                        <p>No projects found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
