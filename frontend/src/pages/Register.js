import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    
    // Step Tracker
    const [step, setStep] = useState(1);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        college: '',
        year: '2nd Year',
        department: '',
        github: '',
        experience: 'Advanced'
    });
    
    const [skills, setSkills] = useState([]);
    const [customSkill, setCustomSkill] = useState('');
    const [errors, setErrors] = useState({});

    const popularSkills = ['React', 'Python', 'Node.js', 'Figma', 'UI/UX'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (step === 1) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword || !formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext1 = () => {
        if (validateStep1()) setStep(2);
    };

    const handleNext2 = () => setStep(3);

    const toggleSkill = (skill) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(s => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const addCustomSkill = (e) => {
        e.preventDefault();
        const val = customSkill.trim();
        if (val && !skills.includes(val)) {
            setSkills([...skills, val]);
            setCustomSkill('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newUser = {
            name: formData.name,
            email: formData.email,
            bio: formData.bio || 'New member of CollegeCollab.',
            college: formData.college,
            year: formData.year,
            department: formData.department,
            github: formData.github,
            experience: formData.experience,
            skills: skills.length > 0 ? skills : ['Beginner']
        };

        // Complete user registration
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Final route to dashboard directly per exact mockup intent
        navigate('/dashboard'); 
    };

    const getStepTitle = () => {
        switch(step) {
            case 1: return <><div className="auth-title">Create Account</div><div className="auth-subtitle">Step 1 of 3 — Basic info</div></>;
            case 2: return <><div className="auth-title">Your Profile</div><div className="auth-subtitle">Step 2 of 3 — Tell us about yourself</div></>;
            case 3: return <><div className="auth-title">Your Skills</div><div className="auth-subtitle">Step 3 of 3 — Add your tech skills</div></>;
            default: return null;
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                
                <div className="auth-brand">CollegeCollab</div>

                {/* Shared Step Indicator UI */}
                <div className="step-indicator">
                    <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
                    <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
                    <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
                </div>

                <div className="auth-header">
                    {getStepTitle()}
                </div>

                {/* Step 1: Credentials */}
                {step === 1 && (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                            {errors.name && <div className="error-msg">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="student@college.edu" />
                            {errors.email && <div className="error-msg">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                            {errors.password && <div className="error-msg">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                            {errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
                        </div>
                        
                        <div className="btn-group">
                            <button className="btn-dark" onClick={handleNext1}>Continue &rarr;</button>
                        </div>
                        
                        <p className="auth-footer login-link">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                )}

                {/* Step 2: Information */}
                {step === 2 && (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Bio</label>
                            <textarea id="bio" name="bio" className="form-control" value={formData.bio} onChange={handleChange} placeholder="I'm a final year CS student interested in AI and web development..."></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">College / University</label>
                                <input type="text" id="college" name="college" className="form-control" value={formData.college} onChange={handleChange} placeholder="MIT, IIT, etc." />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Year of Study</label>
                                <select id="year" name="year" className="form-control" value={formData.year} onChange={handleChange}>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Department / Major</label>
                                <input type="text" id="department" name="department" className="form-control" value={formData.department} onChange={handleChange} placeholder="Computer Science" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">GitHub URL</label>
                                <input type="url" id="github" name="github" className="form-control" value={formData.github} onChange={handleChange} placeholder="github.com/you" />
                            </div>
                        </div>

                        <div className="btn-split">
                            <button className="btn-back" onClick={() => setStep(1)}>
                                <span>&larr;</span>
                                <span>Back</span>
                            </button>
                            <button className="btn-dark" onClick={handleNext2}>Continue &rarr;</button>
                        </div>
                    </div>
                )}

                {/* Step 3: Skills */}
                {step === 3 && (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="section-label">QUICK ADD</label>
                            <div className="quick-skills">
                                {popularSkills.map(skill => (
                                    <button 
                                        key={skill} 
                                        type="button"
                                        className={`quick-skill-btn ${skills.includes(skill) ? 'selected' : ''}`}
                                        onClick={() => toggleSkill(skill)}
                                    >
                                        {skill} {skills.includes(skill) ? '×' : '+'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Add Custom Skill</label>
                            <div className="custom-skill-wrap">
                                <input 
                                    type="text" 
                                    id="customSkill" 
                                    className="form-control" 
                                    placeholder="Type a skill & press Add" 
                                    value={customSkill}
                                    onChange={(e) => setCustomSkill(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') addCustomSkill(e); }}
                                />
                                <button type="button" className="btn-purple" onClick={addCustomSkill}>Add</button>
                            </div>
                        </div>

                        <div className="form-group" style={{marginTop: '1.5rem'}}>
                            <label className="section-label" style={ {color: '#8b5cf6'} }>SELECTED SKILLS ({skills.length})</label>
                            {skills.length === 0 ? (
                                <div className="dashed-box">No skills added yet</div>
                            ) : (
                                <div className="skills-container">
                                    {skills.map(skill => (
                                        <div key={skill} className="skill-pill">
                                            {skill} <button type="button" onClick={() => toggleSkill(skill)}>&times;</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group" style={{marginTop: '1.5rem'}}>
                            <label className="form-label">Experience Level</label>
                            <select id="experience" name="experience" className="form-control" value={formData.experience} onChange={handleChange}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>

                        <div className="btn-split">
                            <button className="btn-back" onClick={() => setStep(2)}>
                                <span>&larr;</span>
                                <span>Back</span>
                            </button>
                            <button className="btn-dark" onClick={handleSubmit}>Create Account 🚀</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
