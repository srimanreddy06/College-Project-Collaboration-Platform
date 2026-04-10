import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar } from 'react-icons/fi';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            navigate(`/projects/${project.id || 1}`);
        } else {
            navigate('/login');
        }
    };

    const authorInitials = (project.author || 'S').substring(0, 2).toUpperCase();

    // Default mock data fallbacks for existing projects without the new detailed data format
    const progress = project.progress !== undefined ? project.progress : 72;
    const date = project.date || 'Aug 30, 2025';
    const skills = project.skills || ['React', 'Python', 'Machine Learning', 'Tailwind CSS'];

    return (
        <div className="project-card-detail">
            <div className="pc-top">
                <div className="pc-icon-box">
                    <FiUser size={18} />
                </div>
                <span className="badge-filled">{project.category || 'WEB APP'}</span>
            </div>
            
            <h3 className="pc-title">{project.title}</h3>
            <p className="pc-desc">{project.description}</p>
            
            <div className="pc-progress-area">
                <div className="prog-labels">
                    <span>Completion Progress</span>
                    <span className="prog-value">{progress}%</span>
                </div>
                <div className="prog-bar-bg">
                    <div className="prog-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="pc-date-box">
                <div className="date-label">
                    <FiCalendar size={14} style={{ opacity: 0.7 }}/> Completion Date
                </div>
                <span className="date-val">{date}</span>
            </div>

            <div className="pc-skills">
                {skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="pill-outline">{skill}</span>
                ))}
                {skills.length > 3 && (
                    <span className="pill-outline">+{skills.length - 3} more</span>
                )}
            </div>

            <div className="pc-footer">
                <div className="pc-author">
                    <div className="pc-author-avatar">{authorInitials}</div>
                    <span className="pc-author-name">{project.author || 'Student'}</span>
                </div>
                <button onClick={handleViewDetails} className="btn-details">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
