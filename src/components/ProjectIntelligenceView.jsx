import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  User, 
  Activity, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  TrendingDown,
  Layers,
  ArrowRight
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const ProjectIntelligenceView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  return (
    <div className="view-container">
      {/* Top Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Select Dossier:
          </span>
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

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="action-btn-secondary"
            onClick={() => setActiveView('risk')}
          >
            <AlertTriangle size={14} color="var(--accent-amber)" />
            <span>Risk Investigation</span>
          </button>
          <button 
            className="action-btn-secondary"
            onClick={() => setActiveView('explainaudit')}
          >
            <ShieldCheck size={14} color="var(--accent-cyan)" />
            <span>Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Large Project Dossier Hero Section */}
      <div className="project-dossier-hero">
        <div className="dossier-title-area">
          <div className="dossier-project-id">{selectedProject.id} • {selectedProject.category.toUpperCase()}</div>
          <h1 className="dossier-project-name">{selectedProject.name}</h1>
          
          <div className="dossier-meta-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="var(--accent-cyan)" />
              <span>{selectedProject.location}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={15} color="var(--text-tertiary)" />
              <span>Contractor: <strong>{selectedProject.contractor}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="var(--text-tertiary)" />
              <span>Completion: <strong>{selectedProject.plannedCompletion}</strong></span>
            </div>
          </div>
        </div>

        {/* Strong Visual Emphasis on Overall Health Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="health-score-hud-circle">
            <span className="health-circle-value">{selectedProject.healthScore}</span>
            <span className="health-circle-label">HEALTH SCORE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Risk Assessment
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: selectedProject.riskScore > 70 ? '#fb7185' : '#34d399' }}>
              {selectedProject.riskScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>/ 100</span>
            </div>
            <div className={`status-badge ${selectedProject.riskLevel === 'Healthy' ? 'healthy' : selectedProject.riskLevel === 'High Risk' ? 'high-risk' : 'attention-required'}`}>
              <span>{selectedProject.riskLevel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Health Quadrants (Visual sections rather than dense forms) */}
      <div className="health-quad-grid">
        {/* Financial Health */}
        <div className="health-quad-card">
          <div className="quad-card-header">
            <div className="quad-title">
              <IndianRupee size={16} color="var(--accent-cyan)" />
              <span>Financial Health</span>
            </div>
            <span className="quad-score" style={{ color: 'var(--accent-cyan)' }}>
              {selectedProject.financialHealth}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill cyan" style={{ width: `${selectedProject.financialHealth}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <span>Budget: {selectedProject.budget}</span>
            <span>Spend: {selectedProject.expenditure}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Disbursement velocity compared against verified physical milestone certificates.
          </p>
        </div>

        {/* Schedule Health */}
        <div className="health-quad-card">
          <div className="quad-card-header">
            <div className="quad-title">
              <Clock size={16} color="var(--accent-amber)" />
              <span>Schedule Health</span>
            </div>
            <span className="quad-score" style={{ color: '#fbbf24' }}>
              {selectedProject.scheduleHealth}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill amber" style={{ width: `${selectedProject.scheduleHealth}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <span>Planned: {selectedProject.plannedProgress}%</span>
            <span>Actual: {selectedProject.progress}%</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Critical path milestone lag tracked through ProjectPulse AI predictive engine.
          </p>
        </div>

        {/* Physical Progress */}
        <div className="health-quad-card">
          <div className="quad-card-header">
            <div className="quad-title">
              <Layers size={16} color="var(--accent-teal)" />
              <span>Physical Progress</span>
            </div>
            <span className="quad-score" style={{ color: 'var(--accent-teal)' }}>
              {selectedProject.physicalProgress}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill cyan" style={{ width: `${selectedProject.physicalProgress}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <span>Drone Audit: {selectedProject.physicalProgress}%</span>
            <span>Reported: {selectedProject.progress}%</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Ground-truth photogrammetry & satellite earthwork verification delta.
          </p>
        </div>

        {/* Compliance */}
        <div className="health-quad-card">
          <div className="quad-card-header">
            <div className="quad-title">
              <FileCheck size={16} color="var(--accent-emerald)" />
              <span>Compliance</span>
            </div>
            <span className="quad-score" style={{ color: '#34d399' }}>
              {selectedProject.compliance}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill emerald" style={{ width: `${selectedProject.compliance}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <span>Statutory Clearances</span>
            <span style={{ color: '#34d399' }}>Verified</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Material quality test certificates, environmental NOCs, and labor ledger logs.
          </p>
        </div>
      </div>

      {/* Deep-Dive Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        <div 
          className="glass-panel" 
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => setActiveView('faircost')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.1em' }}>FAIRCOST AI ENGINE</span>
            <ArrowRight size={15} color="var(--accent-cyan)" />
          </div>
          <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px' }}>Cost Benchmark Variance</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Compare reported costs against terrain, inflation, and accessibility adjusted benchmarks.
          </p>
        </div>

        <div 
          className="glass-panel" 
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => setActiveView('geotemporal')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-teal)', fontWeight: 700, letterSpacing: '0.1em' }}>GEOTEMPORAL AI</span>
            <ArrowRight size={15} color="var(--accent-teal)" />
          </div>
          <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px' }}>Spatial Duplicate Overlap</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Detect duplicate tenders and spatial proximity clusters within 78m radius.
          </p>
        </div>

        <div 
          className="glass-panel" 
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => setActiveView('projectpulse')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', fontWeight: 700, letterSpacing: '0.1em' }}>PROJECTPULSE AI</span>
            <ArrowRight size={15} color="var(--accent-amber)" />
          </div>
          <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px' }}>Schedule & Delay Forecast</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Predictive delay probability and S-curve progression analytics.
          </p>
        </div>
      </div>
    </div>
  );
};
