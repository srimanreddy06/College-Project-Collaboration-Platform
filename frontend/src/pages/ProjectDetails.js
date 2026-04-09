import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    // Mock Database
    const mockProjects = [
        {
            id: 1,
            title: 'AI Study Assistant',
            description: 'A React and Python based web app that helps students organize study schedules using AI. It predicts the best study times and optimizes learning material based on user retention over time. It utilizes machine learning models to identify knowledge gaps.',
            author: 'Sarah Chen',
            category: 'AI / ML',
            teamMembers: ['Sarah Chen', 'Alex Rivera', 'John Doe'],
            features: ['Smart Scheduling Algorithm', 'Flashcard Generation', 'Performance Analytics Dashboard'],
            githubUrl: 'https://github.com',
            status: 'Active'
        },
        {
            id: 2,
            title: 'Campus Marketplace',
            description: 'Mobile-first platform for students to buy and sell textbooks and furniture safely. The application provides an integrated payment gateway, university email verification, and safe exchange drop-off zones on campus.',
            author: 'Mike Ross',
            category: 'Mobile',
            teamMembers: ['Mike Ross', 'Rachel Zane'],
            features: ['Secure Messaging', 'University Email Verification', 'Item Categorization and Search'],
            githubUrl: 'https://github.com',
            status: 'Completed'
        },
        {
            id: 3,
            title: 'EcoTrack IoT',
            description: 'IoT project using Arduino to monitor classroom energy usage and optimize lighting. The system integrates multiple sensors to collect data and a web application dashboard to monitor real-time consumption levels.',
            author: 'David Kim',
            category: 'Hardware',
            teamMembers: ['David Kim', 'Emma Watson'],
            features: ['Real-time Sensor Data Pipeline', 'Energy Saving Suggestions AI', 'Supervisor Dashboard Analytics'],
            githubUrl: 'https://github.com',
            status: 'Active'
        },
        {
            id: 4,
            title: 'Event Management System',
            description: 'Centralized portal for all college clubs to host events and track registrations. It acts as the backbone for extracurricular affairs, letting users subscribe to clubs, RSVP to events, and auto-sync to their calendars.',
            author: 'Emily White',
            category: 'Web App',
            teamMembers: ['Emily White'],
            features: ['Role-based Club Access', 'RSVP Tracking & QR Generation', 'Google/Apple Calendar Integration'],
            githubUrl: 'https://github.com',
            status: 'Planning'
        }
    ];

    useEffect(() => {
        // Fetch project from mock data
        const foundProject = mockProjects.find(p => p.id === parseInt(id));
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
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
                        <span>Created by <strong style={{color: 'var(--text-main)', fontWeight: 600}}>{project.author}</strong></span>
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
                                    <div className="member-avatar">{member.substring(0,2).toUpperCase()}</div>
                                    <span>{member}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card links-card">
                        <h3 className="sidebar-title">Resources</h3>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline full-width" style={{marginBottom: '1rem'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
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
