import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Camera, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Layers, 
  Check, 
  Eye, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCheck
} from './Icons';
import { PROJECTS_DATA, INVESTIGATION_WORKFLOW_STEPS } from '../data/mockData';

export const EvidenceWorkflowView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [adjudicationVerdict, setAdjudicationVerdict] = useState(selectedProject.verificationStatus || 'Needs Verification');
  const [selectedEvidenceTab, setSelectedEvidenceTab] = useState('ALL');

  const evidenceList = selectedProject.evidenceItems && selectedProject.evidenceItems.length > 0 ? selectedProject.evidenceItems : [
    {
      id: "EV-01",
      title: "Drone Photogrammetry Orthomosaic Scan",
      type: "Photogrammetry",
      date: "2026-09-18",
      status: "Discrepancy Detected",
      description: "Aerial scan confirms 54% concrete slab coverage vs 68% claim. Section 0+800 unpaved.",
      badge: "Visual Evidence"
    },
    {
      id: "EV-02",
      title: "Milestone Billing Ledger Stage 3",
      type: "Financial Record",
      date: "2026-09-12",
      status: "Variance +₹9.3L",
      description: "Invoice #INV-9923 submitted citing complete stormwater drainage laying.",
      badge: "Financial Audit"
    },
    {
      id: "EV-03",
      title: "Geospatial Boundary Cadastral Overlay",
      type: "Spatial Map",
      date: "2026-09-04",
      status: "Overlap 78m",
      description: "GIS coordinate boundary overlaps with 2024 resurfacing tender corridor.",
      badge: "GeoTemporal AI"
    }
  ];

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">Evidence & Inspection Governance Workflow</h2>
          <p className="view-subheading">
            End-to-end evidence verification pipeline from multimodal anomaly trigger to field auditor resolution.
          </p>
        </div>

        <div className="view-header-actions">
          <button 
            className="action-btn-secondary"
            onClick={() => setActiveView('explainaudit')}
          >
            <FileText size={15} />
            <span>View Sealed Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Inspection Target:
        </span>
        {PROJECTS_DATA.map((proj) => (
          <button
            key={proj.shortId}
            className={`switcher-pill-btn ${selectedProject.shortId === proj.shortId ? 'active' : ''}`}
            onClick={() => {
              setSelectedProject(proj);
              setAdjudicationVerdict(proj.verificationStatus || 'Needs Verification');
            }}
          >
            {proj.shortId}
          </button>
        ))}
      </div>

      {/* 5-Step Workflow Pipeline Tracker */}
      <div className="workflow-stepper-track">
        {INVESTIGATION_WORKFLOW_STEPS.map((step) => {
          const isActive = step.stepNumber === currentStep;
          const isDone = step.stepNumber < currentStep;

          return (
            <div 
              key={step.stepNumber} 
              className={`stepper-step-card ${isActive ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setCurrentStep(step.stepNumber)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="stepper-step-num">
                  {isDone ? <Check size={13} color="#ffffff" /> : step.stepNumber}
                </div>
                <span style={{ fontSize: '0.68rem', color: isActive ? 'var(--accent-cyan)' : 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {step.badge}
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isActive ? '#ffffff' : 'var(--text-secondary)', marginTop: '4px' }}>
                {step.title}
              </div>

              <p style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Selected Project Dossier Summary & Multi-modal Evidence Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Multimodal Photo & Document Evidence Vault */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel-header">
            <div className="panel-title">
              <Camera size={18} color="var(--accent-cyan)" />
              <span>Multi-Modal Evidence Area</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
              {evidenceList.length} VERIFICATION ASSETS
            </span>
          </div>

          {/* Evidence Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {evidenceList.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(8, 17, 30, 0.75)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', background: 'rgba(0, 242, 254, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.id}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                      {item.title}
                    </span>
                  </div>

                  <span className="status-badge high-risk" style={{ padding: '2px 8px', fontSize: '0.68rem' }}>
                    {item.status}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Source: <strong>{item.type}</strong> • Logged: {item.date}</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{item.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Synthetic Aerial Drone Imagery Mock Visual Box */}
          <div style={{
            position: 'relative',
            height: '180px',
            borderRadius: '12px',
            border: '1px solid var(--border-medium)',
            background: 'linear-gradient(135deg, #091a2e, #050c18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px'
          }}>
            {/* Top Drone Telemetry Tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00f2fe', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '4px' }}>
                UAV SURVEY • ALTITUDE: 120M • GSD: 2.1CM/PX
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#fb7185', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '4px' }}>
                AI DISCREPANCY: -14%
              </span>
            </div>

            {/* Drone Crosshair Graphic */}
            <div style={{ alignSelf: 'center', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', border: '1px solid rgba(0, 242, 254, 0.4)', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: '6px', height: '6px', background: '#00f2fe', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px', display: 'block' }}>
                Chainage 0+600: Sub-Base Incomplete (Photogrammetry Ground Truth)
              </span>
            </div>

            <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              GEO-HASH: 8f28308291a • VERIFIED BY MORHTH MISSION DRONE
            </div>
          </div>
        </div>

        {/* Right Column: Project Integrated Dossier & Adjudication Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div className="glass-panel">
            <div className="glass-panel-header">
              <div className="panel-title">
                <FileCheck size={18} color="var(--accent-emerald)" />
                <span>Selected Project Telemetry</span>
              </div>
              <span className="project-id-badge">{selectedProject.id}</span>
            </div>

            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {selectedProject.name}
            </h3>

            {/* Financial Information */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="metric-label">Financial Information</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ffffff', marginTop: '4px' }}>
                <span>Contract Budget: {selectedProject.budget}</span>
                <span>Current Spend: {selectedProject.expenditure}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                FairCost Variance: <strong style={{ color: '#fb7185' }}>+23.7% above benchmark</strong>
              </div>
            </div>

            {/* Location Information */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="metric-label">Location Information</span>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', marginTop: '4px' }}>
                {selectedProject.location}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                Spatial Duplicate Risk: <strong style={{ color: '#fbbf24' }}>78m proximity to P-1088</strong>
              </div>
            </div>

            {/* Schedule & Progress Information */}
            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="metric-label">Schedule & Progress Information</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ffffff', marginTop: '4px' }}>
                <span>Physical: {selectedProject.progress}%</span>
                <span>Planned: {selectedProject.plannedProgress}%</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                ProjectPulse Delay Forecast: <strong style={{ color: '#fb7185' }}>+42 Days Delay</strong>
              </div>
            </div>

            {/* Formal Final Adjudication State */}
            <div style={{ marginTop: '16px' }}>
              <span className="metric-label" style={{ marginBottom: '8px', display: 'block' }}>
                FINAL INVESTIGATION VERDICT ACTION
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Verified', 'Investigation Required', 'False Positive'].map((status) => (
                  <button
                    key={status}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: adjudicationVerdict === status ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      background: adjudicationVerdict === status ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      color: adjudicationVerdict === status ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setAdjudicationVerdict(status)}
                  >
                    <span>{status}</span>
                    {adjudicationVerdict === status && <CheckCircle2 size={16} color="var(--accent-cyan)" />}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button 
                className="action-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  alert(`Adjudication decision "${adjudicationVerdict}" committed to official government audit ledger for ${selectedProject.id}.`);
                }}
              >
                <ShieldCheck size={16} />
                <span>Commit Resolution to Audit Ledger</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
