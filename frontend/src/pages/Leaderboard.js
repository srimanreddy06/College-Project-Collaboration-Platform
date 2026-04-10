import React, { useState, useMemo } from 'react';
import './Leaderboard.css';

const DEFAULT_USERS = [
  { id: 1, name: 'Alex Rivera', subtitle: 'CS • Graduate', points: 3450, projects: 12, skills: 24, collabs: 8, badges: ['Top Coder', 'Skill Master'] },
  { id: 2, name: 'Sarah Chen', subtitle: 'AI/ML • 4th Year', points: 3120, projects: 8, skills: 18, collabs: 12, badges: ['Team Player'] },
  { id: 3, name: 'Mike Ross', subtitle: 'Law/Tech • 3rd Year', points: 2890, projects: 6, skills: 14, collabs: 5, badges: ['Rising Star'] },
  { id: 4, name: 'David Kim', subtitle: 'Hardware • 2nd Year', points: 2100, projects: 5, skills: 12, collabs: 4, badges: [] },
  { id: 5, name: 'Emily White', subtitle: 'Design • 3rd Year', points: 1950, projects: 3, skills: 20, collabs: 7, badges: ['Rising Star'] },
  { id: 6, name: 'John Peterson', subtitle: 'Business • 4th Year', points: 1800, projects: 4, skills: 10, collabs: 6, badges: [] },
  { id: 7, name: 'Lisa Ray', subtitle: 'Math • 1st Year', points: 1100, projects: 2, skills: 8, collabs: 1, badges: [] }
];

const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('points');
    const [timeframe, setTimeframe] = useState('all-time');

    // Retrieve local user
    const localUserStr = localStorage.getItem('user');
    const localUser = localUserStr ? JSON.parse(localUserStr) : null;
    
    const combinedUsers = useMemo(() => {
        let users = [...DEFAULT_USERS];
        if (localUser) {
            users.push({
                id: 999,
                name: localUser.name || 'You',
                subtitle: `${localUser.department || 'Student'} • ${localUser.year || 'N/A'}`,
                points: localUser.points || 1250, 
                projects: localUser.projects || 2,
                skills: localUser.skills?.length || 5,
                collabs: 2,
                badges: ['New Joiner'],
                isCurrentUser: true
            });
        }

        // Apply slight randomizer for "Monthly" metrics scaling to simulate toggling
        if (timeframe === 'monthly') {
            users = users.map(u => ({
                ...u,
                points: Math.floor(u.points * 0.4),
                projects: Math.floor(u.projects * 0.3) + 1,
                skills: Math.floor(u.skills * 0.5) + 1,
                collabs: Math.floor(u.collabs * 0.6)
            }));
        }

        // Sort based on active tab parameter mapping ascending vs descending properties!
        users.sort((a, b) => b[activeTab] - a[activeTab]);
        
        return users;
    }, [localUser, activeTab, timeframe]);

    const top3 = combinedUsers.slice(0, 3);

    const getMaxValue = () => {
        if (combinedUsers.length === 0) return 1;
        return combinedUsers[0][activeTab];
    };
    
    const maxVal = getMaxValue();

    const getTrophy = (rank) => {
        if (rank === 1) return '🏆';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    const getStatLabel = () => {
        switch(activeTab) {
            case 'points': return 'Points';
            case 'projects': return 'Projects';
            case 'skills': return 'Skills';
            case 'collabs': return 'Collabs';
            default: return 'Score';
        }
    };

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h1 className="leaderboard-title">Leaderboard</h1>
                <p className="leaderboard-subtitle">Compete, collaborate, and climb the ranks.</p>
            </div>

            <div className="time-toggle">
                <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
                    <option value="all-time">All Time</option>
                    <option value="monthly">This Month</option>
                </select>
            </div>

            <div className="leaderboard-tabs">
                <button 
                    className={`filter-tab ${activeTab === 'points' ? 'active' : ''}`}
                    onClick={() => setActiveTab('points')}
                >
                    Top Students
                </button>
                <button 
                    className={`filter-tab ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    Most Projects
                </button>
                <button 
                    className={`filter-tab ${activeTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skills')}
                >
                    Most Skills
                </button>
                <button 
                    className={`filter-tab ${activeTab === 'collabs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('collabs')}
                >
                    Collaborations
                </button>
            </div>

            {/* Podium for Top 3 */}
            {top3.length >= 3 && (
                <div className="podium-container">
                    {/* Rank 2 */}
                    <div className="podium-step step-2">
                        <div className="podium-name">{top3[1].name}</div>
                        <div className="podium-avatar">{getInitials(top3[1].name)}</div>
                        <div className="podium-place">
                            <div className="podium-score">{top3[1][activeTab]} {getStatLabel()}</div>
                            <div className="podium-rank">2</div>
                        </div>
                    </div>
                    {/* Rank 1 */}
                    <div className="podium-step step-1">
                        <div className="podium-name">{top3[0].name}</div>
                        <div className="podium-avatar">{getInitials(top3[0].name)}</div>
                        <div className="podium-place">
                            <div className="podium-score">{top3[0][activeTab]} {getStatLabel()}</div>
                            <div className="podium-rank">1</div>
                        </div>
                    </div>
                    {/* Rank 3 */}
                    <div className="podium-step step-3">
                        <div className="podium-name">{top3[2].name}</div>
                        <div className="podium-avatar">{getInitials(top3[2].name)}</div>
                        <div className="podium-place">
                            <div className="podium-score">{top3[2][activeTab]} {getStatLabel()}</div>
                            <div className="podium-rank">3</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ranked List */}
            <div className="rank-list">
                {combinedUsers.map((user, idx) => {
                    const rank = idx + 1;
                    const fillPercentage = (user[activeTab] / maxVal) * 100;
                    
                    return (
                        <div key={user.id} className={`rank-row ${user.isCurrentUser ? 'current-user' : ''}`}>
                            <div className="rank-number">{getTrophy(rank)}</div>
                            <div className="row-avatar">{getInitials(user.name)}</div>
                            
                            <div className="row-info">
                                <div className="row-name">
                                    {user.name} {user.isCurrentUser && <span style={{color: '#a78bfa'}}>(You)</span>}
                                    {user.badges && user.badges.map(badge => (
                                        <span key={badge} className="row-badge">{badge}</span>
                                    ))}
                                </div>
                                <div className="row-subtitle">{user.subtitle}</div>
                            </div>
                            
                            <div className="row-stats">
                                <div className="stat-bar-container">
                                    <div className="stat-header">
                                        <span>Progress</span>
                                        <span>{user[activeTab]}</span>
                                    </div>
                                    <div className="stat-bar-bg">
                                        <div className="stat-bar-fill" style={{ width: `${fillPercentage}%` }}></div>
                                    </div>
                                </div>
                                <div className="row-score">
                                    {user[activeTab]}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Leaderboard;
