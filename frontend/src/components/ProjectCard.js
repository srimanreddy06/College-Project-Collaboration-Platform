import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    // Generate initials for avatar
    const authorInitials = (project.author || 'S').substring(0, 2).toUpperCase();
    
    // Icon mapping based on category
    const getCategoryIcon = (cat) => {
        switch(cat) {
            case 'Web App': return '🌐';
            case 'Mobile': return '📱';
            case 'Hardware': return '⚙️';
            case 'AI / ML': return '🤖';
            default: return '💡';
        }
    };

    // class modifier for category colors
    const categoryClass = project.category ? project.category.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : 'general';

    return (
        <div className={`project-card cat-${categoryClass} ${project.featured ? 'featured-card' : ''}`}>
            {project.featured && <div className="featured-badge">Featured</div>}
            <div className="project-header">
                <div className="project-icon-box">
                    {getCategoryIcon(project.category)}
                </div>
                <span className={`project-category badge-${categoryClass}`}>{project.category || 'General'}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-footer">
                <div className="project-author">
                    <div className="author-avatar">{authorInitials}</div>
                    <span className="author-name">{project.author || 'Student'}</span>
                </div>
                <Link to={`/projects/${project.id || 1}`} className="btn btn-pill btn-indigo btn-sm">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
