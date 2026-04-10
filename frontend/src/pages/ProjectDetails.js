import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockProjectsList } from '../utils/mockData';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('collegeCollabProjects')) || [];
        const fullLibrary = [...savedProjects, ...mockProjectsList];

        const foundProject = fullLibrary.find(p => p.id === parseInt(id));

        if (foundProject && !foundProject.features) foundProject.features = ['Core Development in Progress'];
        if (foundProject && !foundProject.teamMembers) foundProject.teamMembers = [foundProject.author];
        if (foundProject && !foundProject.githubUrl) foundProject.githubUrl = 'https://github.com/project';
        if (foundProject && !foundProject.status) foundProject.status = 'Planning';

        setProject(foundProject);
    }, [id]);

    if (!project) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h2 className="display-font">Project Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We couldn't locate the project you were looking for.</p>
                    <Link to="/projects" className="btn btn-outline">Back to Projects</Link>
                </div>
            </div>
        );
    }

    const initials = project.author.substring(0, 2).toUpperCase();

    return (
        <div className="project-details-page container">
            <div className="details-header">
                <div className="header-breadcrumbs">
                    <Link to="/projects" className="back-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Explore
                    </Link>
                    <span className="category-badge">{project.category}</span>
                </div>
                <h1 className="details-title">{project.title}</h1>
                <div className="details-meta">
                    <span className="status-indicator">
                        <span className={`status-dot ${project.status === 'Active' ? 'green' : project.status === 'Completed' ? 'purple' : 'orange'}`}></span>
                        {project.status}
                    </span>
                    <div className="meta-author">
                        <div className="author-avatar">{initials}</div>
                        <span>Created by <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>{project.author}</strong></span>
                    </div>
                </div>
            </div>

            <div className="details-content">
                <div className="main-info card">
                    <h2 className="section-title">About the Project</h2>
                    <p className="description-text">{project.description}</p>

                    <h3 className="subsection-title">Key Features</h3>
                    <ul className="features-list">
                        {project.features.map((feature, index) => (
                            <li key={index}>
                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sidebar-info">
                    <div className="card team-card" style={{ marginBottom: '1.5rem' }}>
                        <h3 className="sidebar-title">Team Members</h3>
                        <div className="team-list">
                            {project.teamMembers.map((member, index) => (
                                <div key={index} className="team-member">
                                    <div className="member-avatar">{member.substring(0, 2).toUpperCase()}</div>
                                    <span>{member}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card links-card">
                        <h3 className="sidebar-title">Resources</h3>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline full-width" style={{ marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            View Repository
                        </a>
                        <button className="btn btn-primary full-width">
                            Request to Join Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
