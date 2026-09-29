import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Radar,
  Building2,
  UserCheck,
  Users,
  Navigation
} from './Icons';
import { PROJECTS_DATA, SYSTEM_METRICS } from '../data/mockData';

export const LandingHero = ({ 
  selectedProject, 
  setSelectedProject, 
  setActiveView,
  userState,
  onOpenOnboarding,
  onSelectAudienceDirect
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Smooth number count-up animation when project changes
    const targetProgress = selectedProject.progress;
    setAnimatedProgress(0);

    const duration = 650;
    const steps = 25;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const factor = step / steps;
      setAnimatedProgress(Math.round(targetProgress * factor));

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedProgress(targetProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [selectedProject]);

  const getRiskBadgeClass = (riskLevel) => {
    switch (riskLevel) {
      case 'Healthy': return 'status-badge healthy';
      case 'High Risk': return 'status-badge high-risk';
      case 'Investigation Required': return 'status-badge investigation-required';
      default: return 'status-badge attention-required';
    }
  };

  return (
    <div className="hero-landing-container">
      
      {/* Returning User Quick Welcome Banner (Section 11) */}
      {userState.isOnboarded && (
        <div className="returning-user-pill-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="live-dot" />
            <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem' }}>
              Welcome back, <strong>{userState.fullName || 'Officer'}</strong>
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} />
              <span>{userState.location?.city || 'Coimbatore'}, {userState.location?.state || 'Tamil Nadu'}</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Continue as:</span>
            <button 
              className={`switcher-pill-btn ${userState.audience === 'public' ? 'active' : ''}`}
              onClick={() => {
                onSelectAudienceDirect('public');
              }}
            >
              Public
            </button>
            <button 
              className={`switcher-pill-btn ${userState.audience === 'official' ? 'active' : ''}`}
              onClick={() => {
                onSelectAudienceDirect('official');
              }}
            >
              Official
            </button>
            <button 
              className={`switcher-pill-btn ${userState.audience === 'admin' ? 'active' : ''}`}
              onClick={() => {
                onSelectAudienceDirect('admin');
              }}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      {/* Upper Main Grid: Stacked Hero Statement & Floating Intelligence Card */}
      <div className="hero-main-layout">
        
        {/* Left Column: Stacked Cinematic Typography & Direct Audience Selection (Section 1) */}
        <div className="hero-statement-section">
          <div className="hero-tag-badge">
            <Sparkles size={13} />
            <span>AI Evidence & Public Governance Core</span>
          </div>

          <h1 className="hero-stacked-title">
            <span className="title-line-1">See the</span>
            <span className="title-line-2">Reality Behind</span>
            <span className="title-line-3">Public Projects</span>
          </h1>

          <p className="hero-supporting-text">
            Monitor, understand and track public infrastructure projects around you.
          </p>

          <div className="hero-actions-row">
            <button 
              className="primary-cta-btn"
              onClick={onOpenOnboarding}
            >
              <span>GET STARTED</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="secondary-ghost-btn"
              onClick={() => {
                if (userState.audience === 'public') setActiveView('public_portal');
                else if (userState.audience === 'admin') setActiveView('admin_panel');
                else setActiveView('dashboard');
              }}
            >
              <span>Explore Direct Portal</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Three Premium Glass Cards: SELECT YOUR ACCESS (Section 1) */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, marginBottom: '10px' }}>
              SELECT YOUR ACCESS
            </div>

            <div className="hero-audience-quick-grid">
              {/* ADMIN */}
              <div 
                className="hero-audience-mini-card"
                onClick={() => onSelectAudienceDirect('admin')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="audience-card-icon-box cyan" style={{ width: '28px', height: '28px' }}>
                    <Building2 size={15} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#ffffff' }}>ADMIN</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  “Manage public project information”
                </div>
              </div>

              {/* GOVERNMENT OFFICIAL */}
              <div 
                className="hero-audience-mini-card"
                onClick={() => onSelectAudienceDirect('official')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="audience-card-icon-box blue" style={{ width: '28px', height: '28px' }}>
                    <UserCheck size={15} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#ffffff' }}>GOVERNMENT OFFICIAL</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  “Track, analyse and inspect projects”
                </div>
              </div>

              {/* PUBLIC */}
              <div 
                className="hero-audience-mini-card"
                onClick={() => onSelectAudienceDirect('public')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="audience-card-icon-box emerald" style={{ width: '28px', height: '28px' }}>
                    <Users size={15} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#ffffff' }}>PUBLIC</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  “Explore public project status”
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Floating Project Intelligence Card */}
        <div className="floating-card-column">
          <div className="floating-project-card">
            
            <div className="card-top-header">
              <span className="project-id-badge">{selectedProject.id}</span>
              <span className="project-category-tag">{selectedProject.category}</span>
            </div>

            <h3 className="card-project-name">{selectedProject.name}</h3>

            <div className="card-location-row">
              <MapPin size={14} color="var(--accent-cyan)" />
              <span>Location: {selectedProject.location}</span>
            </div>

            <div className="card-metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Progress</span>
                <span className="metric-val" style={{ color: 'var(--accent-teal)' }}>
                  {selectedProject.progress}%
                </span>
              </div>

              <div className="metric-item">
                <span className="metric-label">Health Score</span>
                <span className="metric-val" style={{ color: 'var(--accent-cyan)' }}>
                  {selectedProject.healthScore} <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>/ 100</span>
                </span>
              </div>

              <div className="metric-item">
                <span className="metric-label">Budget</span>
                <span className="metric-val">{selectedProject.budget}</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">Expenditure</span>
                <span className="metric-val">{selectedProject.expenditure}</span>
              </div>
            </div>

            <div className="card-status-footer">
              <div className={getRiskBadgeClass(selectedProject.riskLevel)}>
                <AlertCircle size={13} />
                <span>{selectedProject.riskLevel}</span>
              </div>

              <button 
                className="secondary-ghost-btn" 
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                onClick={() => {
                  if (userState.audience === 'public') setActiveView('public_portal');
                  else setActiveView('intelligence');
                }}
              >
                <span>{userState.audience === 'public' ? "Public Status" : "View Dossier"}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Quick Project Switcher Carousel */}
          <div className="project-switcher-bar">
            {PROJECTS_DATA.map((proj) => (
              <button
                key={proj.shortId}
                className={`switcher-pill-btn ${selectedProject.shortId === proj.shortId ? 'active' : ''}`}
                onClick={() => setSelectedProject(proj)}
              >
                {proj.shortId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status Visual: Large Integrated Number & Global Pulse Strip */}
      <div className="hero-bottom-status-strip">
        <div className="large-status-visual-block">
          <div className="large-status-number">
            {animatedProgress}%
          </div>
          <div className="large-status-meta">
            <span className="large-status-label">PROJECT PROGRESS</span>
            <span className="large-status-sub">{selectedProject.name}</span>
          </div>
        </div>

        <div className="hero-quick-stats-row">
          <div className="stat-micro-item">
            <span className="stat-micro-val">{SYSTEM_METRICS.totalProjects}</span>
            <span className="stat-micro-lbl">Active Works</span>
          </div>

          <div className="stat-micro-item">
            <span className="stat-micro-val">{SYSTEM_METRICS.totalExpenditure}</span>
            <span className="stat-micro-lbl">Total Expenditure</span>
          </div>

          <div className="stat-micro-item">
            <span className="stat-micro-val" style={{ color: '#fb7185' }}>{SYSTEM_METRICS.highRisk}</span>
            <span className="stat-micro-lbl">High Risk Flagged</span>
          </div>

          <div className="stat-micro-item">
            <span className="stat-micro-val" style={{ color: '#34d399' }}>{SYSTEM_METRICS.healthyProjects}</span>
            <span className="stat-micro-lbl">Verified Healthy</span>
          </div>
        </div>
      </div>

    </div>
  );
};
