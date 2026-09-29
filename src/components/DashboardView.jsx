import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowUpRight,
  ExternalLink,
  MapPin,
  Calendar,
  Layers
} from './Icons';
import { PROJECTS_DATA, SYSTEM_METRICS } from '../data/mockData';

export const DashboardView = ({ selectedProject, setSelectedProject, setActiveView, userState, onChangeLocation }) => {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCat = filterCategory === 'ALL' || proj.riskLevel.toUpperCase().includes(filterCategory);
    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.contractor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getRiskBadgeClass = (riskLevel) => {
    switch (riskLevel) {
      case 'Healthy': return 'status-badge healthy';
      case 'High Risk': return 'status-badge high-risk';
      case 'Investigation Required': return 'status-badge investigation-required';
      default: return 'status-badge attention-required';
    }
  };

  return (
    <div className="view-container">
      {/* Government Official Jurisdiction Banner (Section 9) */}
      <div className="summary-area-card" style={{ padding: '14px 20px', background: 'rgba(10, 22, 38, 0.75)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              GOVERNMENT JURISDICTION:
            </span>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.92rem' }}>
              {userState?.location?.district || 'Coimbatore'} District, {userState?.location?.state || 'Tamil Nadu'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
              ({userState?.location?.city || 'Coimbatore'} Municipal Area)
            </span>
          </div>

          <button 
            className="secondary-ghost-btn" 
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={onChangeLocation}
          >
            Change Jurisdiction
          </button>
        </div>
      </div>

      {/* Top Header Section */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">Project Intelligence</h2>
          <p className="view-subheading">
            Monitor public projects, understand risk, and prioritize investigation within your jurisdiction.
          </p>
        </div>

        <div className="view-header-actions">
          <button 
            className="action-btn-primary"
            onClick={() => setActiveView('risk')}
          >
            <AlertTriangle size={15} />
            <span>Open Risk Console</span>
          </button>
        </div>
      </div>

      {/* 6 Summary Cards (Strictly following Section 5 specs) */}
      <div className="summary-cards-grid">
        <div className="summary-card cyan">
          <span className="summary-card-title">TOTAL PROJECTS</span>
          <span className="summary-card-value">{SYSTEM_METRICS.totalProjects}</span>
          <span className="summary-card-sub">Active Municipal Works</span>
        </div>

        <div className="summary-card blue">
          <span className="summary-card-title">TOTAL EXPENDITURE</span>
          <span className="summary-card-value">{SYSTEM_METRICS.totalExpenditure}</span>
          <span className="summary-card-sub">Sanctioned Capital Base</span>
        </div>

        <div className="summary-card emerald">
          <span className="summary-card-title">HEALTHY</span>
          <span className="summary-card-value" style={{ color: '#34d399' }}>{SYSTEM_METRICS.healthyProjects}</span>
          <span className="summary-card-sub">Verified Normal Trajectory</span>
        </div>

        <div className="summary-card amber">
          <span className="summary-card-title">ATTENTION REQUIRED</span>
          <span className="summary-card-value" style={{ color: '#fbbf24' }}>{SYSTEM_METRICS.attentionRequired}</span>
          <span className="summary-card-sub">Minor Variance / Lag</span>
        </div>

        <div className="summary-card rose">
          <span className="summary-card-title">HIGH RISK</span>
          <span className="summary-card-value" style={{ color: '#fb7185' }}>{SYSTEM_METRICS.highRisk}</span>
          <span className="summary-card-sub">Cost / Schedule Anomaly</span>
        </div>

        <div className="summary-card purple">
          <span className="summary-card-title">PRIORITY INVESTIGATIONS</span>
          <span className="summary-card-value" style={{ color: '#c084fc' }}>{SYSTEM_METRICS.priorityInvestigations}</span>
          <span className="summary-card-sub">Field Audit Dispatched</span>
        </div>
      </div>

      {/* Main Project Dossier Portfolio Table */}
      <div className="glass-panel">
        <div className="glass-panel-header">
          <div className="panel-title">
            <Layers size={18} color="var(--accent-cyan)" />
            <span>Active Public Infrastructure Portfolio</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(6, 12, 22, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '6px 12px',
              gap: '8px'
            }}>
              <Search size={14} color="var(--text-tertiary)" />
              <input
                type="text"
                placeholder="Filter by ID, contractor, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  width: '210px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              {['ALL', 'HEALTHY', 'ATTENTION', 'HIGH RISK'].map((cat) => (
                <button
                  key={cat}
                  className={`switcher-pill-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="project-table-container">
          <table className="intelligence-table">
            <thead>
              <tr>
                <th>Project Identifier</th>
                <th>Location / Sector</th>
                <th>Contractor & Entity</th>
                <th>Budget / Spend</th>
                <th>Physical Progress</th>
                <th>Health / Risk</th>
                <th>Status State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj) => {
                const isSelected = selectedProject.shortId === proj.shortId;
                return (
                  <tr 
                    key={proj.id}
                    style={{ background: isSelected ? 'rgba(0, 242, 254, 0.06)' : 'transparent' }}
                  >
                    <td>
                      <div className="project-name-cell">
                        <span className="project-id-sub">{proj.id}</span>
                        <span className="project-name-title">{proj.name}</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                        <MapPin size={13} color="var(--text-tertiary)" />
                        <span>{proj.location}</span>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {proj.contractor}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>{proj.expenditure}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>of {proj.budget}</span>
                      </div>
                    </td>

                    <td style={{ minWidth: '140px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                          <span>{proj.progress}%</span>
                          <span style={{ color: 'var(--text-tertiary)' }}>Plan: {proj.plannedProgress}%</span>
                        </div>
                        <div className="progress-bar-track">
                          <div 
                            className={`progress-bar-fill ${proj.riskLevel === 'Healthy' ? 'emerald' : proj.riskLevel === 'High Risk' ? 'rose' : 'amber'}`}
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                          {proj.healthScore} <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>/100</span>
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className={getRiskBadgeClass(proj.riskLevel)}>
                        <AlertCircle size={12} />
                        <span>{proj.riskLevel}</span>
                      </div>
                    </td>

                    <td>
                      <button
                        className="secondary-ghost-btn"
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => {
                          setSelectedProject(proj);
                          setActiveView('intelligence');
                        }}
                      >
                        <span>Inspect</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
