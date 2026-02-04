import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-category">{project.category || 'General'}</span>
            </div>
            <p className="project-description">{project.description}</p>

            <div className="project-footer">
                <div className="project-author">
                    <span className="author-name">By {project.author || 'Student'}</span>
                </div>
                <Link to={`/projects/${project.id || 1}`} className="btn btn-outline btn-sm">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
