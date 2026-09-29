import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Maximize2,
  RefreshCw,
  GitCompare,
  ArrowRight
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const GeoTemporalView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const geo = selectedProject.geoTemporal || {
    projectA: { id: selectedProject.shortId, name: selectedProject.name, sanctionDate: "2025", cost: selectedProject.budget, scope: "Standard Scope" },
    projectB: { id: "P-1088", name: "Adjacent Municipal Work", sanctionDate: "2024", cost: "₹34.8L", scope: "Resurfacing" },
    distance: "78 m",
    timeDifference: "7 months",
    descriptionSimilarity: 78,
    duplicateWorkRisk: "High",
    statusMessage: "Potentially Similar Project — Needs Verification"
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">GeoTemporal AI Engine</h2>
          <p className="view-subheading">
            Detect spatial proximity clusters, duplicate tender scopes, and overlapping multi-year works.
          </p>
        </div>

        <div className="view-header-actions">
          <div className="status-badge high-risk">
            <AlertTriangle size={14} />
            <span>Duplicate Work Risk: {geo.duplicateWorkRisk}</span>
          </div>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Select Pair Analysis:
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

      {/* Main Grid: Radar Map Canvas & Proximity Comparison */}
      <div className="geotemporal-grid">
        
        {/* Left Column: Dark Military/Satellite HUD Canvas */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={16} color="var(--accent-cyan)" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                Spatial Coordinate Intersect & Cadastral Overlay
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
              ZONE 4 • LAT 28.6139° N, LNG 77.2090° E
            </span>
          </div>

          {/* Interactive Visual Map Canvas Container */}
          <div className="hud-map-canvas-container">
            {/* Grid Coordinates Lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />

            {/* Radar Sweep Effect */}
            <div className="map-radar-sweep" />

            {/* Bounding Proximity Radius Circle */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(244, 63, 94, 0.5)',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(244, 63, 94, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                position: 'absolute',
                top: '-18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#fb7185',
                background: 'rgba(6, 12, 22, 0.8)',
                padding: '1px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(244, 63, 94, 0.3)'
              }}>
                78m Proximity Boundary
              </span>
            </div>

            {/* Connecting Geometric Vector Line between Markers */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <line 
                x1="45%" 
                y1="48%" 
                x2="56%" 
                y2="52%" 
                stroke="#00f2fe" 
                strokeWidth="2.5" 
                strokeDasharray="4 4"
              />
            </svg>

            {/* Marker A: Selected Project */}
            <div style={{
              position: 'absolute',
              top: '48%',
              left: '45%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '18px',
                height: '180px',
                position: 'absolute'
              }} />
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#00f2fe',
                boxShadow: '0 0 16px #00f2fe',
                border: '2px solid #ffffff'
              }} />
              <div style={{
                marginTop: '6px',
                background: 'rgba(6, 14, 26, 0.9)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                <strong>{geo.projectA.id}</strong> (Active Site)
              </div>
            </div>

            {/* Marker B: Overlapping Nearby Project */}
            <div style={{
              position: 'absolute',
              top: '52%',
              left: '56%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#fbbf24',
                boxShadow: '0 0 16px #fbbf24',
                border: '2px solid #ffffff'
              }} />
              <div style={{
                marginTop: '6px',
                background: 'rgba(6, 14, 26, 0.9)',
                border: '1px solid #fbbf24',
                borderRadius: '6px',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                <strong>{geo.projectB.id}</strong> (7 Mo Prior)
              </div>
            </div>

            {/* Bottom Map Info Tag */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '14px',
              background: 'rgba(6, 14, 26, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)'
            }}>
              GIS Resolution: 0.15m/px • Multi-Temporal Satellite Fusion
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Metrics & Duplicate Work Flag */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Main Verdict Card */}
          <div className="glass-panel" style={{ borderLeft: '3px solid var(--accent-amber)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <AlertTriangle size={18} color="#fbbf24" />
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 700 }}>
                {geo.statusMessage}
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The GeoTemporal AI engine flagged a high spatial-temporal overlap between two distinct municipal tenders in Sector 4.
            </p>
          </div>

          {/* Core Metrics Comparison Card */}
          <div className="proximity-metric-card">
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Spatial-Temporal Key Indicators
            </h4>

            <div className="proximity-stat-row">
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Physical Distance</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: '#fb7185' }}>
                {geo.distance}
              </span>
            </div>

            <div className="proximity-stat-row">
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Time Difference</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>
                {geo.timeDifference}
              </span>
            </div>

            <div className="proximity-stat-row">
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Scope Description Similarity</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {geo.descriptionSimilarity}%
              </span>
            </div>

            <div className="proximity-stat-row">
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Duplicate Work Risk</span>
              <div className="status-badge high-risk" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                <span>{geo.duplicateWorkRisk}</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Scope Breakdown */}
          <div className="glass-panel">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(0, 242, 254, 0.06)', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {geo.projectA.id} (CURRENT)
                </span>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>
                  {geo.projectA.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  Cost: {geo.projectA.cost} • {geo.projectA.sanctionDate}
                </div>
              </div>

              <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.06)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {geo.projectB.id} (COMPARATOR)
                </span>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>
                  {geo.projectB.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  Cost: {geo.projectB.cost} • {geo.projectB.sanctionDate}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="action-btn-primary"
                onClick={() => setActiveView('workflow')}
              >
                <span>Verify Cadastral Evidence</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
