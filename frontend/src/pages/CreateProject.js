import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css';

const CreateProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web App',
        description: '',
        requirements: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Project Created:', formData);
        alert('Project Created Successfully!');
        navigate('/projects');
    };

    return (
        <div className="create-project-container container">
            <div className="form-card card">
                <h1 className="form-title">Create New Project</h1>
                <p className="form-subtitle">Share your idea and find collaborators</p>

                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label htmlFor="title">Project Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., AI Study Buddy"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Web App">Web App</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="IoT">IoT / Hardware</option>
                            <option value="Research">Research</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your project idea..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="requirements">Requirements / Skills Needed</label>
                        <textarea
                            id="requirements"
                            name="requirements"
                            rows="3"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="e.g., React, Python, UI Design..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
