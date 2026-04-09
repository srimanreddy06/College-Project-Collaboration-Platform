import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
    // Mock data with "featured" property and "category" standardization
    const [projects] = useState([
        {
            id: 1,
            title: 'AI Study Assistant',
            description: 'A React and Python based web app that helps students organize study schedules using AI.',
            author: 'Sarah Chen',
            category: 'AI / ML',
            featured: true
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
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Web App', 'Mobile', 'Hardware', 'AI / ML'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="projects-page container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Explore Projects</h1>
                    <p className="hero-subtitle">Discover what other students are building, join active groups, or start your own initiative.</p>
                </div>
                <Link to="/create-project" className="btn btn-outline btn-hero">
                    + Start New Project
                </Link>
            </div>

            <div className="stats-bar">
                <div className="stat-card">
                    <div className="stat-dot dot-purple"></div>
                    <div className="stat-info">
                        <span className="stat-value">142</span>
                        <span className="stat-label">Total Projects</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-dot dot-green"></div>
                    <div className="stat-info">
                        <span className="stat-value">28</span>
                        <span className="stat-label">Active This Week</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-dot dot-orange"></div>
                    <div className="stat-info">
                        <span className="stat-value">850+</span>
                        <span className="stat-label">Contributors</span>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="search-bar">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search projects, tech stacks, authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filters-bar">
                    {filters.map(filter => (
                        <button 
                            key={filter} 
                            className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
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
