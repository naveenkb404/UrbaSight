import React from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Truck, 
  Mountain, 
  Calendar,
  ArrowRight,
  TrendingDown
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const FairCostView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const fc = selectedProject.fairCost || {
    reportedCost: selectedProject.budgetValue || 48.5,
    adjustedExpectedCost: 39.2,
    rawStandardEstimate: 36.8,
    anomalyVariance: "+23.7%",
    adjustments: [
      { factor: "Terrain Adjustment", value: "+4.2%", costImpact: "+₹1.54 Lakhs", reason: "Sub-surface rocky layer & water table stabilization" },
      { factor: "Inflation & Material Index", value: "+6.8%", costImpact: "+₹2.50 Lakhs", reason: "Cement & steel index price revision Q3 2025" },
      { factor: "Transport & Accessibility", value: "-2.1%", costImpact: "-₹0.77 Lakhs", reason: "Proximity to primary quarry arterial corridor" }
    ],
    anomalyIndicator: "Elevated Cost Variance Detected",
    verdictNote: "Cost anomaly flagged above multi-factor expected baseline."
  };

  const isAnomalous = parseFloat(fc.anomalyVariance.replace('%', '').replace('+', '')) > 10;

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">FairCost AI Intelligence</h2>
          <p className="view-subheading">
            Predictive parametric cost benchmarking with multi-factor geo-terrain & inflation adjustments.
          </p>
        </div>

        <div className="view-header-actions">
          <div className={`status-badge ${isAnomalous ? 'high-risk' : 'healthy'}`}>
            <Scale size={14} />
            <span>Variance: {fc.anomalyVariance}</span>
          </div>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Benchmark Project:
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

      {/* Strong Visual Comparison: Reported Cost vs Adjusted Expected Cost */}
      <div className="faircost-comparison-container">
        
        {/* Reported Cost Box */}
        <div className="cost-hero-box reported">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
            CONTRACTOR REPORTED COST
          </span>
          <div className="cost-huge-figure" style={{ color: '#fb7185' }}>
            ₹{fc.reportedCost.toFixed(1)} Lakhs
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Sanctioned contract value billed by <strong>{selectedProject.contractor}</strong>
          </div>
        </div>

        {/* Adjusted Expected Cost Box */}
        <div className="cost-hero-box expected">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
            ADJUSTED EXPECTED COST (AI BENCHMARK)
          </span>
          <div className="cost-huge-figure" style={{ color: '#34d399' }}>
            ₹{fc.adjustedExpectedCost.toFixed(1)} Lakhs
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Regional parametric estimate normalized across 340+ comparable municipal works
          </div>
        </div>

      </div>

      {/* Cost Anomaly Indicator Banner */}
      <div className="cost-anomaly-indicator-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: isAnomalous ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isAnomalous ? '#fb7185' : '#34d399'
          }}>
            {isAnomalous ? <AlertTriangle size={22} /> : <CheckCircle2 size={22} />}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              COST ANOMALY INDICATOR: {fc.anomalyIndicator.toUpperCase()}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Net cost variance of <strong style={{ color: '#fb7185' }}>{fc.anomalyVariance}</strong> (₹{(fc.reportedCost - fc.adjustedExpectedCost).toFixed(1)} Lakhs) flagged for itemized ledger verification.
            </div>
          </div>
        </div>

        <button 
          className="action-btn-primary"
          onClick={() => setActiveView('explainaudit')}
        >
          <span>View Audit Evidence</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Multi-Factor Parametric Adjustment Breakdown */}
      <div className="glass-panel">
        <div className="glass-panel-header">
          <div className="panel-title">
            <TrendingUp size={18} color="var(--accent-cyan)" />
            <span>FairCost Multi-Factor Parametric Adjustments</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            BASELINE STANDARDIZED ESTIMATE: ₹{fc.rawStandardEstimate || '36.8'}L
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          {/* Factor 1: Terrain */}
          <div style={{
            background: 'rgba(7, 16, 28, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 600 }}>
                <Mountain size={16} color="var(--accent-cyan)" />
                <span>Terrain Adjustment</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)', background: 'rgba(0, 242, 254, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                {fc.adjustments[0]?.value || '+4.2%'}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {fc.adjustments[0]?.reason}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              Impact: {fc.adjustments[0]?.costImpact}
            </div>
          </div>

          {/* Factor 2: Inflation & Material Index */}
          <div style={{
            background: 'rgba(7, 16, 28, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 600 }}>
                <TrendingUp size={16} color="var(--accent-amber)" />
                <span>Inflation & Material Index</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                {fc.adjustments[1]?.value || '+6.8%'}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {fc.adjustments[1]?.reason}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              Impact: {fc.adjustments[1]?.costImpact}
            </div>
          </div>

          {/* Factor 3: Transport & Accessibility */}
          <div style={{
            background: 'rgba(7, 16, 28, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 600 }}>
                <Truck size={16} color="var(--accent-emerald)" />
                <span>Transport / Accessibility</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                {fc.adjustments[2]?.value || '-2.1%'}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {fc.adjustments[2]?.reason || 'Proximity to primary logistics hub'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              Impact: {fc.adjustments[2]?.costImpact || '-₹0.77 Lakhs'}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
