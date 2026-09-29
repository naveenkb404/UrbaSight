import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  FileText, 
  ArrowRight,
  TrendingDown,
  Layers,
  MapPin,
  Users,
  Compass,
  Check
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const RiskInvestigationView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const [activeVerificationState, setActiveVerificationState] = useState(
    selectedProject.verificationStatus || 'Needs Verification'
  );

  const verificationStatuses = [
    'Attention Required',
    'Needs Verification',
    'Investigation Required',
    'Verified',
    'False Positive'
  ];

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Critical': return <span style={{ color: '#fb7185', background: 'rgba(244, 63, 94, 0.15)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>CRITICAL</span>;
      case 'High': return <span style={{ color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>HIGH</span>;
      default: return <span style={{ color: 'var(--accent-cyan)', background: 'rgba(0, 242, 254, 0.15)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>MEDIUM</span>;
    }
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">Risk Investigation Console</h2>
          <p className="view-subheading">
            Evidence-based anomaly detection & risk signals for objective human audit review.
          </p>
        </div>

        <div className="view-header-actions">
          <button 
            className="action-btn-primary"
            onClick={() => setActiveView('explainaudit')}
          >
            <FileText size={15} />
            <span>Generate ExplainAudit Certificate</span>
          </button>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Investigate Dossier:
        </span>
        {PROJECTS_DATA.map((proj) => (
          <button
            key={proj.shortId}
            className={`switcher-pill-btn ${selectedProject.shortId === proj.shortId ? 'active' : ''}`}
            onClick={() => {
              setSelectedProject(proj);
              setActiveVerificationState(proj.verificationStatus || 'Needs Verification');
            }}
          >
            {proj.shortId} ({proj.riskScore})
          </button>
        ))}
      </div>

      {/* Disclaimer / Objective Governance Notice */}
      <div style={{
        background: 'rgba(13, 27, 48, 0.6)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '12px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)'
      }}>
        <Info size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Audit Governance Standard:</strong> Risk flags indicate mathematical variance against peer benchmarks and spatial overlap patterns for human verification. They do not constitute a conclusive finding of irregularities prior to field adjudication.
        </span>
      </div>

      {/* Main Layout: Risk Score & Verification State / Primary Risk Factors */}
      <div className="risk-investigation-layout">
        
        {/* Left Column: Project Risk Profile & Verification Adjudication */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel">
            <div className="glass-panel-header">
              <div className="panel-title">
                <ShieldAlert size={18} color="var(--accent-rose)" />
                <span>Risk Profile Dossier</span>
              </div>
              <span className="project-id-badge">{selectedProject.id}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '8px' }}>
              {selectedProject.name}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Location: {selectedProject.location} • Contractor: {selectedProject.contractor}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              padding: '16px',
              background: 'rgba(6, 13, 24, 0.6)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px'
            }}>
              <div>
                <span className="metric-label">Composite Risk Score</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: selectedProject.riskScore > 70 ? '#fb7185' : '#34d399' }}>
                  {selectedProject.riskScore} <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>/ 100</span>
                </div>
              </div>

              <div>
                <span className="metric-label">Risk Tier</span>
                <div style={{ marginTop: '4px' }}>
                  <div className={`status-badge ${selectedProject.riskLevel === 'Healthy' ? 'healthy' : selectedProject.riskLevel === 'High Risk' ? 'high-risk' : 'attention-required'}`}>
                    <span>{selectedProject.riskLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status Adjudication State */}
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Officer Verification Status Adjudication
              </label>

              <div className="verification-pills-row">
                {verificationStatuses.map((st) => (
                  <button
                    key={st}
                    className={`verification-pill ${activeVerificationState === st ? 'active' : ''}`}
                    onClick={() => setActiveVerificationState(st)}
                  >
                    {activeVerificationState === st && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {st}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                Current state: <strong style={{ color: 'var(--accent-cyan)' }}>{activeVerificationState}</strong>. Recorded to Gov Audit Ledger.
              </p>
            </div>
          </div>

          {/* Quick Deep Dives */}
          <div className="glass-panel">
            <h4 style={{ fontSize: '0.9rem', color: '#ffffff', marginBottom: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Multi-Engine Cross Check
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setActiveView('faircost')}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>FairCost Cost Deviation</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#fb7185', fontWeight: 700 }}>+23.7% Variance →</span>
              </div>

              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setActiveView('geotemporal')}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>GeoTemporal Spatial Proximity</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#fbbf24', fontWeight: 700 }}>78m Overlap →</span>
              </div>

              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setActiveView('projectpulse')}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ProjectPulse Schedule Lag</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#fb7185', fontWeight: 700 }}>+42 Days Delay →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Primary Risk Factors & Evidence */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel-header">
            <div className="panel-title">
              <AlertTriangle size={18} color="var(--accent-amber)" />
              <span>Primary Risk Factors & Evidence Signals</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              {selectedProject.primaryRiskFactors ? selectedProject.primaryRiskFactors.length : 0} TRIGGERS FLAGGED
            </span>
          </div>

          {selectedProject.primaryRiskFactors && selectedProject.primaryRiskFactors.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedProject.primaryRiskFactors.map((factor, idx) => (
                <div 
                  key={idx}
                  className={`risk-factor-card ${factor.severity === 'Critical' ? 'critical' : ''}`}
                >
                  <div className="factor-header">
                    <span className="factor-title">{factor.title}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="factor-evidence-badge">{factor.category}</span>
                      {getSeverityBadge(factor.severity)}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {factor.summary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>Audit Metric: <strong style={{ color: '#ffffff' }}>{factor.metric}</strong></span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{factor.flaggedAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ color: '#ffffff', marginBottom: '4px' }}>No Elevated Risk Triggers Flagged</h4>
              <p style={{ fontSize: '0.82rem' }}>All multi-factor financial, spatial, and progress indicators are within normal tolerances.</p>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="action-btn-primary"
              onClick={() => setActiveView('workflow')}
            >
              <span>Launch Evidence Inspection Workflow</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
