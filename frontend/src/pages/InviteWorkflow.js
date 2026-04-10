import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import './InviteWorkflow.css';

const InviteWorkflow = () => {
    const [step, setStep] = useState(1);
    const [emailOpen, setEmailOpen] = useState(false);
    const [status, setStatus] = useState(null); // 'accepted' or 'declined'
    
    // Form state definition mapping exact flow logic requirements
    const [formData, setFormData] = useState({
        projectName: 'AI Study Assistant',
        inviteeEmail: 'student@college.edu',
        message: 'Hey! I saw your profile and think your React skills would be a huge help for my AI project. Let me know if you want to collaborate!'
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleEmailClick = () => {
        setEmailOpen(true);
    };

    const handleEmailAction = (action) => {
        if (action === 'accept') {
            setStep(3); // Progress routing strictly into Dashboard step explicitly for Accept verification layer
        } else {
            setStatus('declined');
            setStep(4); // Route directly tracking termination decline
        }
    };

    const handleDashboardAction = (action) => {
        setStatus(action);
        setStep(4);
    };

    const resetFlow = () => {
        setStep(1);
        setEmailOpen(false);
        setStatus(null);
    };

    const getProgressWidth = () => {
        if (step === 1) return '0%';
        if (step === 2) return '33%';
        if (step === 3) return '66%';
        return '100%';
    };

    return (
        <div className="invite-container">
            {/* Native Progress Indicators tracking scale animation per user constraints */}
            <div className="step-indicator">
                <div className="step-line-bg"></div>
                <div className="step-line-fill" style={{ width: getProgressWidth() }}></div>
                
                {[1, 2, 3, 4].map((num) => (
                    <div 
                        key={num} 
                        className={`step-dot ${step === num ? 'active' : step > num ? 'done' : ''}`}
                    >
                        {step > num ? '✓' : num}
                    </div>
                ))}
            </div>

            {/* Stage 1: Payload Trigger block strictly wrapping explicit styling hooks */}
            {step === 1 && (
                <div className="workflow-card invite-form">
                    <h2 style={{marginBottom: '0.5rem', fontWeight: 800}}>Invite a Collaborator</h2>
                    <p style={{color: '#a1a1aa', marginBottom: '2rem'}}>Send an invitation workflow directly to their network.</p>
                    
                    <form onSubmit={handleFormSubmit}>
                        <label className="form-label">Project Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={formData.projectName} 
                            readOnly 
                        />
                        
                        <label className="form-label">Invitee Gmail Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={formData.inviteeEmail} 
                            onChange={(e) => setFormData({...formData, inviteeEmail: e.target.value})}
                            required 
                        />
                        
                        <label className="form-label">Invitation Message</label>
                        <textarea 
                            className="form-control" 
                            rows="4"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            required
                        ></textarea>

                        <button type="submit" className="btn-gmail">
                            Send Invite via Gmail ✉
                        </button>
                    </form>
                </div>
            )}

            {/* Stage 2: Gmail verification UI layer */}
            {step === 2 && (
                <div className="workflow-card" style={{padding: 0}}>
                    {!emailOpen ? (
                        <div className="gmail-mockup">
                            <div className="gmail-header">
                                <div className="gmail-logo">M</div>
                                <div className="gmail-search">Search mail</div>
                            </div>
                            <div className="gmail-list">
                                <div className="gmail-row" onClick={handleEmailClick}>
                                    <div className="gmail-dot"></div>
                                    <div className="gmail-sender">CollegeCollab</div>
                                    <div className="gmail-subject">Support: Invitation to join "{formData.projectName}" - {formData.message.substring(0, 30)}...</div>
                                    <div className="gmail-time">10:42 AM</div>
                                </div>
                                <div className="gmail-row" style={{fontWeight: 'normal', background: '#18191a'}}>
                                    <div className="gmail-dot" style={{opacity: 0}}></div>
                                    <div className="gmail-sender">GitHub</div>
                                    <div className="gmail-subject">Your recent commit to main - build successful</div>
                                    <div className="gmail-time">Yesterday</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="gmail-mockup">
                            <div className="gmail-header">
                                <div className="gmail-logo">M</div>
                                <div className="gmail-search" style={{cursor: 'pointer'}} onClick={() => setEmailOpen(false)}>
                                    ← Back to Inbox
                                </div>
                            </div>
                            <div className="email-view">
                                <div className="email-subject">Invitation to join "{formData.projectName}"</div>
                                <div className="email-sender-info">
                                    <div className="email-avatar">C</div>
                                    <div className="email-details">
                                        <span className="email-name">CollegeCollab System</span>
                                        <span className="email-address">noreply@collegecollab.com</span>
                                    </div>
                                </div>
                                
                                <div className="email-body">
                                    <p style={{marginBottom: '1rem'}}>You've been invited to collaborate on a project!</p>
                                    <div style={{background: '#13131f', borderLeft: '4px solid #6d28d9', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px'}}>
                                        <strong>Message from sender:</strong><br/><br/>
                                        "{formData.message}"
                                    </div>
                                    
                                    <div className="email-actions">
                                        <button className="btn-accept" onClick={() => handleEmailAction('accept')}>Review Request</button>
                                        <button className="btn-decline" onClick={() => handleEmailAction('decline')}>Decline via Email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Stage 3: Dashboard Mock Layer evaluating dashboard interception mapping exactly directly */}
            {step === 3 && (
                <div className="workflow-card" style={{padding: 0, border: 'none', background: 'transparent', boxShadow: 'none'}}>
                    <div className="mock-dashboard">
                        <div className="mock-nav">
                            <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Dashboard</div>
                            <div className="bell-icon">
                                <FiBell />
                                <div className="bell-badge">1</div>
                            </div>
                        </div>
                        <div className="mock-content">
                            <div className="stats-row-mock">
                                <div className="stat-card-mock"><div className="stat-val">4</div><div style={{fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: 'bold'}}>Active</div></div>
                                <div className="stat-card-mock pending"><div className="stat-val">1</div><div style={{fontSize: '0.8rem', color: '#ef4444', textTransform: 'uppercase', fontWeight: 'bold'}}>Pending</div></div>
                                <div className="stat-card-mock"><div className="stat-val">12</div><div style={{fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: 'bold'}}>Skills</div></div>
                            </div>

                            <h3 style={{marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a1a1aa'}}>Recent Action Required</h3>
                            <div className="notification-banner">
                                <div className="email-avatar" style={{width: 50, height: 50}}>C</div>
                                <div className="banner-text">
                                    <div className="banner-title">Project Invitation: {formData.projectName}</div>
                                    <div className="banner-desc">"Hey! I saw your profile and think your React skills..."</div>
                                </div>
                                <div style={{display: 'flex', gap: '0.5rem', flexDirection: 'column'}}>
                                    <button className="btn-accept" style={{padding: '0.4rem 1.25rem', fontSize: '0.8rem'}} onClick={() => handleDashboardAction('accepted')}>Accept</button>
                                    <button className="btn-decline" style={{padding: '0.4rem 1.25rem', fontSize: '0.8rem'}} onClick={() => handleDashboardAction('declined')}>Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Stage 4: Result summary conditionally processing string mapping cleanly safely */}
            {step === 4 && (
                <div className="workflow-card result-card">
                    {status === 'accepted' ? (
                        <>
                            <div className="result-icon accepted">✓</div>
                            <h2 className="result-title">Collaboration Accepted!</h2>
                            <p className="result-desc">You are now successfully added to the "{formData.projectName}" team.</p>
                        </>
                    ) : (
                        <>
                            <div className="result-icon declined">✕</div>
                            <h2 className="result-title">Invite Declined</h2>
                            <p className="result-desc">The sender has been notified that you are unavailable.</p>
                        </>
                    )}
                    
                    <button className="btn-gmail" style={{width: 'auto', margin: '0 auto', background: '#2a2838', color: '#f8fafc', padding: '0.8rem 2rem'}} onClick={resetFlow}>
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
};

export default InviteWorkflow;
