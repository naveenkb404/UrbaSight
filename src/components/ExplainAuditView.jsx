import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Calendar, 
  Download, 
  Share2, 
  Printer, 
  Info,
  Check,
  Building2,
  Lock
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const ExplainAuditView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const [signedOff, setSignedOff] = useState(false);

  const cert = selectedProject.explainAudit || {
    certificateId: `AUDIT-CERT-2026-${selectedProject.shortId}-X9`,
    timestamp: "2026-09-29T14:30:00Z",
    riskScore: selectedProject.riskScore,
    riskLevel: selectedProject.riskLevel,
    confidenceScore: "94.2%",
    featureContributions: [
      { name: "Financial Risk", value: 32, positive: true, note: "Reported cost exceeds FairCost AI baseline" },
      { name: "GeoTemporal Risk", value: 25, positive: true, note: "Spatial proximity to adjacent prior tender" },
      { name: "Progress Mismatch", value: 18, positive: true, note: "Delta between drone scan and billed milestone" },
      { name: "Network Pattern", value: 14, positive: true, note: "Shared entity cross-bidding cluster" }
    ],
    evidenceSummary: "Algorithmic audit indicates elevated risk concentrated in financial disbursement variance and spatial overlap.",
    recommendedAction: "Dispatch Technical Auditor to verify physical milestone completion and cross-verify boundary logs.",
    humanReviewStatus: "Pending Field Engineering Officer Sign-Off"
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">ExplainAudit AI Digital Ledger</h2>
          <p className="view-subheading">
            Cryptographically sealed explainable AI decision certificate supporting institutional accountability.
          </p>
        </div>

        <div className="view-header-actions">
          <button className="action-btn-secondary" onClick={() => window.print()}>
            <Printer size={15} />
            <span>Print Ledger</span>
          </button>
          <button 
            className="action-btn-primary"
            onClick={() => setActiveView('workflow')}
          >
            <ShieldCheck size={15} />
            <span>Open Field Inspection Dossier</span>
          </button>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Select Certificate:
        </span>
        {PROJECTS_DATA.map((proj) => (
          <button
            key={proj.shortId}
            className={`switcher-pill-btn ${selectedProject.shortId === proj.shortId ? 'active' : ''}`}
            onClick={() => {
              setSelectedProject(proj);
              setSignedOff(false);
            }}
          >
            {proj.shortId}
          </button>
        ))}
      </div>

      {/* Premium Digital Audit Certificate (Certificate Layout with Glass Surface & Thin Borders) */}
      <div className="audit-certificate-card">
        
        {/* Certificate Top Header */}
        <div className="certificate-header-row">
          <div className="cert-seal">
            <div className="cert-stamp">
              <Lock size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                DIGITAL AUDIT & EXPLAINABILITY CERTIFICATE
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                SERIAL: {cert.certificateId} • HASH: 0x9f4a...e82c
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              borderRadius: '8px',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)'
            }}>
              AI MODEL CONFIDENCE: {cert.confidenceScore}
            </div>
          </div>
        </div>

        {/* Certificate Subject & Core Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '20px',
          background: 'rgba(6, 12, 22, 0.6)',
          borderRadius: '14px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <span className="metric-label">PROJECT ID & TITLE</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '2px' }}>
              {selectedProject.id}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
              {selectedProject.name}
            </div>
          </div>

          <div>
            <span className="metric-label">RISK SCORE</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900, color: cert.riskScore > 70 ? '#fb7185' : '#34d399' }}>
              {cert.riskScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>/ 100</span>
            </div>
          </div>

          <div>
            <span className="metric-label">RISK LEVEL</span>
            <div style={{ marginTop: '4px' }}>
              <div className={`status-badge ${cert.riskLevel === 'Healthy' ? 'healthy' : cert.riskLevel === 'High Risk' ? 'high-risk' : 'attention-required'}`}>
                <span>{cert.riskLevel}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="metric-label">CONTRACTOR ENTITY</span>
            <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>
              {selectedProject.contractor}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
              Location: {selectedProject.location}
            </div>
          </div>
        </div>

        {/* Primary Risk Triggers: Feature Contributions (SHAP Values) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>
              PRIMARY RISK TRIGGERS & SHAP FEATURE CONTRIBUTIONS
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              EXPLAINABLE RISK DECOMPOSITION
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cert.featureContributions.map((feat, idx) => (
              <div key={idx} className="shap-feature-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    0{idx + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                      {feat.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {feat.note}
                    </div>
                  </div>
                </div>

                <div className="shap-feature-val">
                  +{feat.value} pts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Summary & Recommended Action */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          padding: '20px',
          background: 'rgba(9, 18, 33, 0.5)',
          borderRadius: '14px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              EVIDENCE SUMMARY
            </span>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {cert.evidenceSummary}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              RECOMMENDED GOVERNANCE ACTION
            </span>
            <p style={{ fontSize: '0.84rem', color: '#ffffff', lineHeight: 1.6, fontWeight: 500 }}>
              {cert.recommendedAction}
            </p>
          </div>
        </div>

        {/* Human Review Status & Officer Sign-Off Interface */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-medium)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              HUMAN AUDIT REVIEW STATUS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <UserCheck size={16} color={signedOff ? '#34d399' : '#fbbf24'} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: signedOff ? '#34d399' : '#fbbf24' }}>
                {signedOff ? "Audit Officer Sign-Off Completed (GOV-8942)" : cert.humanReviewStatus}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!signedOff ? (
              <button 
                className="action-btn-primary"
                onClick={() => setSignedOff(true)}
              >
                <Check size={15} />
                <span>Sign Off & Endorse Review</span>
              </button>
            ) : (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                color: '#34d399',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={16} />
                <span>Legally Endorsed by MoRTH Audit Wing</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
