import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Filter, 
  Maximize2,
  ZoomIn,
  ZoomOut,
  Crosshair,
  ArrowRight
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const ProjectMapView = ({ selectedProject, setSelectedProject, setActiveView }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeLayer, setActiveLayer] = useState('RISK_OVERLAY');

  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'HEALTHY') return p.riskLevel === 'Healthy';
    if (activeFilter === 'ATTENTION') return p.riskLevel === 'Attention Required';
    if (activeFilter === 'HIGH_RISK') return p.riskLevel === 'High Risk';
    return true;
  });

  const getMarkerColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Healthy': return '#10b981';
      case 'Attention Required': return '#f59e0b';
      case 'High Risk': return '#f43f5e';
      default: return '#ec4899';
    }
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">Geospatial Project Command Map</h2>
          <p className="view-subheading">
            Dark-mode spatial intelligence grid with live project risk telemetry & boundary overlays.
          </p>
        </div>

        <div className="view-header-actions">
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'HIGH_RISK', 'ATTENTION', 'HEALTHY'].map((f) => (
              <button
                key={f}
                className={`switcher-pill-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Command Layout: Large Interactive Map Viewport & Project Detail Popup Card */}
      <div className="map-command-layout">
        
        {/* Interactive Map Viewport */}
        <div className="interactive-project-map-viewport">
          
          {/* Map Grid and HUD Elements */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #0d1e33 0%, #040812 100%),
              linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 50px 50px, 50px 50px'
          }} />

          {/* Map Vector Roads / Corridor Topography Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {/* Arterial Corridors */}
            <path d="M 50 120 Q 280 200, 520 220 T 900 380" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="4" />
            <path d="M 200 40 Q 320 260, 680 360 T 950 480" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="3" />
            <path d="M 700 80 Q 550 240, 340 400" fill="none" stroke="rgba(244, 63, 94, 0.25)" strokeWidth="2.5" strokeDasharray="6 4" />
            
            {/* Zone Boundaries */}
            <polygon points="120,80 380,60 420,240 180,280" fill="rgba(0, 242, 254, 0.02)" stroke="rgba(0, 242, 254, 0.12)" strokeDasharray="4 4" />
            <polygon points="460,180 780,140 840,420 520,400" fill="rgba(244, 63, 94, 0.02)" stroke="rgba(244, 63, 94, 0.15)" strokeDasharray="4 4" />
          </svg>

          {/* Project Markers */}
          {filteredProjects.map((proj) => {
            const isSelected = selectedProject.shortId === proj.shortId;
            const color = getMarkerColor(proj.riskLevel);
            const x = proj.coordinates.x;
            const y = proj.coordinates.y;

            return (
              <div
                key={proj.shortId}
                className="map-marker-pin"
                style={{ top: `${y}%`, left: `${x}%`, color: color }}
                onClick={() => setSelectedProject(proj)}
              >
                {/* Pulsing ring for active or high risk */}
                <div className="map-pin-pulse-ring" />
                
                {/* Core Pin */}
                <div 
                  className="map-pin-core"
                  style={{
                    transform: isSelected ? 'scale(1.4)' : 'scale(1)',
                    background: isSelected ? color : '#071220',
                    color: isSelected ? '#040914' : color
                  }}
                >
                  {proj.riskScore}
                </div>

                {/* Pin Label Tag */}
                <div style={{
                  position: 'absolute',
                  top: '26px',
                  background: 'rgba(6, 13, 24, 0.9)',
                  border: `1px solid ${isSelected ? color : 'var(--border-subtle)'}`,
                  borderRadius: '6px',
                  padding: '3px 8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
                }}>
                  {proj.shortId}
                </div>
              </div>
            );
          })}

          {/* Map Layer Controls (Top-Left) */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'rgba(6, 12, 22, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '8px 12px',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              MAP INTELLIGENCE LAYERS
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className={`switcher-pill-btn ${activeLayer === 'RISK_OVERLAY' ? 'active' : ''}`}
                onClick={() => setActiveLayer('RISK_OVERLAY')}
              >
                Risk Heatmap
              </button>
              <button
                className={`switcher-pill-btn ${activeLayer === 'CADASTRE' ? 'active' : ''}`}
                onClick={() => setActiveLayer('CADASTRE')}
              >
                Cadastral Corridors
              </button>
            </div>
          </div>

          {/* Map Legend (Bottom-Left) */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(6, 12, 22, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '8px 14px',
            backdropFilter: 'blur(10px)',
            fontSize: '0.72rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Healthy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Attention Required</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} />
              <span style={{ color: 'var(--text-secondary)' }}>High Risk</span>
            </div>
          </div>

        </div>

        {/* Selected Project Telemetry Dossier Card */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel-header">
            <div className="panel-title">
              <Compass size={18} color="var(--accent-cyan)" />
              <span>Selected Project GIS Card</span>
            </div>
            <span className="project-id-badge">{selectedProject.id}</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', lineHeight: 1.3 }}>
            {selectedProject.name}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div>Location: <strong style={{ color: '#ffffff' }}>{selectedProject.location}</strong></div>
            <div>Contractor: <strong style={{ color: '#ffffff' }}>{selectedProject.contractor}</strong></div>
            <div>Coordinates: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{selectedProject.coordinates.lat}° N, {selectedProject.coordinates.lng}° E</span></div>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '14px',
            background: 'rgba(6, 12, 22, 0.6)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <span className="metric-label">Physical Progress</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-teal)' }}>
                {selectedProject.progress}%
              </div>
            </div>

            <div>
              <span className="metric-label">Health Score</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                {selectedProject.healthScore} / 100
              </div>
            </div>

            <div>
              <span className="metric-label">Budget</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                {selectedProject.budget}
              </div>
            </div>

            <div>
              <span className="metric-label">Expenditure</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                {selectedProject.expenditure}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              className="action-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setActiveView('intelligence')}
            >
              <span>Open Project Dossier</span>
              <ArrowRight size={15} />
            </button>

            <button 
              className="action-btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setActiveView('geotemporal')}
            >
              <Compass size={15} />
              <span>Analyze Nearby Overlaps</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
