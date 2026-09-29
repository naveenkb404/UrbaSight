import React from 'react';
import { 
  Activity, 
  Clock, 
  Calendar, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  TrendingUp,
  Percent
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const ProjectPulseView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const pulse = selectedProject.projectPulse || {
    plannedProgress: selectedProject.plannedProgress || 82,
    currentProgress: selectedProject.progress || 68,
    expectedProgress: 65,
    scheduleDeviation: "-14%",
    delayProbability: 76,
    estimatedDelay: "+42 Days",
    budgetUtilization: 84.9,
    milestones: []
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">ProjectPulse AI Progress & Trajectory</h2>
          <p className="view-subheading">
            S-curve trajectory modeling, milestone velocity forecasting, and completion date predictions.
          </p>
        </div>

        <div className="view-header-actions">
          <div className="status-badge attention-required">
            <Clock size={14} />
            <span>Delay Probability: {pulse.delayProbability}%</span>
          </div>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Project Trajectory:
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

      {/* Main Large Progress / S-Curve Timeline Visualization (Central Visual Element) */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div className="glass-panel-header">
          <div className="panel-title">
            <Activity size={20} color="var(--accent-teal)" />
            <span>Progress Velocity & Milestone Trajectory Curve</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#38bdf8', borderRadius: '50%' }} /> Planned Baseline
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }} /> Current Progress ({pulse.currentProgress}%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', background: '#fb7185', borderRadius: '50%' }} /> AI Predicted Trajectory ({pulse.expectedProgress}%)
            </span>
          </div>
        </div>

        {/* Large Visual S-Curve / Trajectory Canvas SVG */}
        <div style={{ position: 'relative', width: '100%', height: '260px', marginTop: '10px' }}>
          <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 800 240">
            {/* Grid Lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="160" x2="800" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="220" x2="800" y2="220" stroke="rgba(255,255,255,0.12)" />

            {/* Baseline Planned S-Curve (Cyan) */}
            <path
              d="M 20 220 Q 250 180, 480 80 T 780 30"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeOpacity="0.8"
            />

            {/* Current Actual Curve (Emerald) */}
            <path
              d="M 20 220 Q 240 195, 480 115"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
            />

            {/* AI Forecast Dotted Trajectory (Rose / Amber) */}
            <path
              d="M 480 115 Q 640 90, 780 70"
              fill="none"
              stroke="#fb7185"
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            {/* Current Milestone Point Glow */}
            <circle cx="480" cy="115" r="7" fill="#10b981" />
            <circle cx="480" cy="115" r="14" fill="none" stroke="#10b981" strokeOpacity="0.4" />

            {/* Planned Target Milestone Point */}
            <circle cx="480" cy="80" r="5" fill="#38bdf8" />

            {/* Labels inside SVG */}
            <text x="495" y="112" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">
              Current: {pulse.currentProgress}% (Actual)
            </text>
            <text x="495" y="78" fill="#38bdf8" fontFamily="var(--font-mono)" fontSize="12">
              Target: {pulse.plannedProgress}% (Planned)
            </text>
            <text x="640" y="65" fill="#fb7185" fontFamily="var(--font-mono)" fontSize="11">
              Projected Delay: {pulse.estimatedDelay}
            </text>
          </svg>
        </div>

        {/* Milestone Bar Progression */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Milestone Progress Timeline</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
              Overall Completion: <strong>{pulse.currentProgress}%</strong> of 100%
            </span>
          </div>

          <div className="progress-bar-track" style={{ height: '10px' }}>
            <div 
              className="progress-bar-fill cyan" 
              style={{ width: `${pulse.currentProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 7 Required Metrics Grid (Planned, Current, Expected, Schedule Deviation, Delay Probability, Estimated Delay, Budget Utilization) */}
      <div className="pulse-stat-grid">
        
        {/* Metric 1 */}
        <div className="summary-card cyan">
          <span className="summary-card-title">PLANNED PROGRESS</span>
          <span className="summary-card-value">{pulse.plannedProgress}%</span>
          <span className="summary-card-sub">Baseline Contract Target</span>
        </div>

        {/* Metric 2 */}
        <div className="summary-card emerald">
          <span className="summary-card-title">CURRENT PROGRESS</span>
          <span className="summary-card-value" style={{ color: '#34d399' }}>{pulse.currentProgress}%</span>
          <span className="summary-card-sub">Verified Physical Stage</span>
        </div>

        {/* Metric 3 */}
        <div className="summary-card blue">
          <span className="summary-card-title">EXPECTED PROGRESS</span>
          <span className="summary-card-value">{pulse.expectedProgress}%</span>
          <span className="summary-card-sub">AI Multimodal Forecast</span>
        </div>

        {/* Metric 4 */}
        <div className="summary-card rose">
          <span className="summary-card-title">SCHEDULE DEVIATION</span>
          <span className="summary-card-value" style={{ color: '#fb7185' }}>{pulse.scheduleDeviation}</span>
          <span className="summary-card-sub">Critical Path Variance</span>
        </div>

        {/* Metric 5 */}
        <div className="summary-card amber">
          <span className="summary-card-title">DELAY PROBABILITY</span>
          <span className="summary-card-value" style={{ color: '#fbbf24' }}>{pulse.delayProbability}%</span>
          <span className="summary-card-sub">Monte Carlo Simulation</span>
        </div>

        {/* Metric 6 */}
        <div className="summary-card purple">
          <span className="summary-card-title">ESTIMATED DELAY</span>
          <span className="summary-card-value" style={{ color: '#c084fc' }}>{pulse.estimatedDelay}</span>
          <span className="summary-card-sub">Revised Baseline Target</span>
        </div>

        {/* Metric 7 */}
        <div className="summary-card cyan">
          <span className="summary-card-title">BUDGET UTILIZATION</span>
          <span className="summary-card-value">{pulse.budgetUtilization}%</span>
          <span className="summary-card-sub">{selectedProject.expenditure} Disbursed</span>
        </div>

      </div>

      {/* Interactive Milestone Log */}
      {pulse.milestones && pulse.milestones.length > 0 && (
        <div className="glass-panel">
          <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            Itemized Milestone Execution Schedule
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pulse.milestones.map((m, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(6, 12, 22, 0.5)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {m.status === 'Completed' ? (
                    <CheckCircle2 size={16} color="#34d399" />
                  ) : (
                    <Clock size={16} color="#fbbf24" />
                  )}
                  <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>{m.name}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Target: {m.date}</span>
                  <span style={{ color: m.status === 'Completed' ? '#34d399' : '#fbbf24' }}>
                    {m.actual}% / {m.planned}%
                  </span>
                  <span className={`status-badge ${m.status === 'Completed' ? 'healthy' : 'attention-required'}`} style={{ padding: '2px 8px', fontSize: '0.68rem' }}>
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
