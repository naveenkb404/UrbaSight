import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const AdminPanelView = ({ userState, onAddProject, onInspectProject, setActiveView }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // New project form state
  const [newProject, setNewProject] = useState({
    id: `PROJECT P-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    category: 'Roadways & Urban Mobility',
    location: `${userState.location?.localArea || 'Sector 4'}, ${userState.location?.city || 'Coimbatore'}`,
    contractor: '',
    budget: '₹55.0 Lakhs',
    budgetValue: 55.0,
    plannedCompletion: 'Dec 2026',
    scope: '',
    publicDescription: ''
  });

  const [localProjectsList, setLocalProjectsList] = useState(PROJECTS_DATA);
  const [creationSuccessMsg, setCreationSuccessMsg] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.contractor) {
      alert('Please provide project name and contractor details.');
      return;
    }

    const created = {
      id: newProject.id,
      shortId: newProject.id.replace('PROJECT ', ''),
      name: newProject.name,
      category: newProject.category,
      location: newProject.location,
      state: userState.location?.state || 'Tamil Nadu',
      district: userState.location?.district || 'Coimbatore',
      city: userState.location?.city || 'Coimbatore',
      localArea: userState.location?.localArea || 'Sector 4',
      coordinates: { lat: 11.0168, lng: 76.9558, x: 50, y: 50 },
      contractor: newProject.contractor,
      contractorNetworkRisk: "Low",
      budget: newProject.budget,
      budgetValue: newProject.budgetValue,
      expenditure: "₹0.0 Lakhs",
      expenditureValue: 0,
      progress: 0,
      plannedProgress: 10,
      healthScore: 90,
      riskScore: 20,
      riskLevel: "Healthy",
      verificationStatus: "Verified",
      plannedCompletion: newProject.plannedCompletion,
      startDate: "Oct 2026",
      financialHealth: 95,
      scheduleHealth: 95,
      physicalProgress: 0,
      compliance: 98,
      publicDescription: newProject.publicDescription || newProject.scope || 'New municipal infrastructure project.',
      publicStatus: 'Sanctioned & Pre-Construction Phase',
      publicAuthority: `${userState.location?.city || 'Coimbatore'} Municipal Corporation`
    };

    setLocalProjectsList([created, ...localProjectsList]);
    if (onAddProject) onAddProject(created);

    setCreationSuccessMsg(`Project ${created.shortId} successfully registered and added to the official audit inventory.`);
    setShowCreateModal(false);

    // Reset form
    setNewProject({
      id: `PROJECT P-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      category: 'Roadways & Urban Mobility',
      location: `${userState.location?.localArea || 'Sector 4'}, ${userState.location?.city || 'Coimbatore'}`,
      contractor: '',
      budget: '₹55.0 Lakhs',
      budgetValue: 55.0,
      plannedCompletion: 'Dec 2026',
      scope: '',
      publicDescription: ''
    });

    setTimeout(() => setCreationSuccessMsg(''), 5000);
  };

  return (
    <div className="view-container">
      
      {/* Header */}
      <div className="view-header-section">
        <div className="view-title-group">
          <h2 className="view-heading">Admin Project Control Panel</h2>
          <p className="view-subheading">
            Register, configure, and manage municipal project records for your designated administrative jurisdiction.
          </p>
        </div>

        <div className="view-header-actions">
          <button 
            className="action-btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            <span>Create New Public Project</span>
          </button>
        </div>
      </div>

      {creationSuccessMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '10px',
          padding: '12px 18px',
          color: '#34d399',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} />
          <span>{creationSuccessMsg}</span>
        </div>
      )}

      {/* Administrative Area Summary Card (Section 3) */}
      <div className="summary-area-card" style={{ background: 'linear-gradient(135deg, rgba(13, 27, 48, 0.9), rgba(7, 15, 26, 0.95))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="var(--accent-cyan)" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
              ADMINISTRATIVE JURISDICTION SUMMARY
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>ADMIN ID:</span>
            <span className="project-id-badge">{userState.adminId || 'ADM-TN-772'}</span>
          </div>
        </div>

        <div className="summary-area-grid">
          <div className="summary-field">
            <span className="summary-field-label">STATE</span>
            <span className="summary-field-value">{userState.location?.state || 'Tamil Nadu'}</span>
          </div>

          <div className="summary-field">
            <span className="summary-field-label">DISTRICT</span>
            <span className="summary-field-value">{userState.location?.district || 'Coimbatore'}</span>
          </div>

          <div className="summary-field">
            <span className="summary-field-label">CITY / LOCAL BODY</span>
            <span className="summary-field-value">{userState.location?.city || 'Coimbatore'} Municipal Corporation</span>
          </div>

          <div className="summary-field">
            <span className="summary-field-label">OFFICER / DESIGNATION</span>
            <span className="summary-field-value">{userState.fullName || 'Admin Officer'} ({userState.designation || 'Project Admin'})</span>
          </div>
        </div>
      </div>

      {/* Managed Projects Inventory Table */}
      <div className="glass-panel">
        <div className="glass-panel-header">
          <div className="panel-title">
            <Layers size={18} color="var(--accent-cyan)" />
            <span>Active Project Records Under Your Administration</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
            {localProjectsList.length} MANAGED PROJECTS
          </span>
        </div>

        <div className="project-table-container">
          <table className="intelligence-table">
            <thead>
              <tr>
                <th>Project ID & Name</th>
                <th>Category</th>
                <th>Sanctioned Budget</th>
                <th>Contractor Entity</th>
                <th>Physical Progress</th>
                <th>Health / Risk Status</th>
                <th>Administrative Action</th>
              </tr>
            </thead>
            <tbody>
              {localProjectsList.map((proj) => (
                <tr key={proj.id}>
                  <td>
                    <div className="project-name-cell">
                      <span className="project-id-sub">{proj.id}</span>
                      <span className="project-name-title">{proj.name}</span>
                    </div>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {proj.category}
                    </span>
                  </td>

                  <td>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ffffff' }}>
                      {proj.budget}
                    </div>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {proj.contractor}
                    </span>
                  </td>

                  <td style={{ minWidth: '130px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill emerald" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={`status-badge ${proj.riskLevel === 'Healthy' ? 'healthy' : proj.riskLevel === 'High Risk' ? 'high-risk' : 'attention-required'}`}>
                      <span>{proj.riskLevel}</span>
                    </div>
                  </td>

                  <td>
                    <button
                      className="secondary-ghost-btn"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => {
                        if (onInspectProject) onInspectProject(proj);
                        if (setActiveView) setActiveView('intelligence');
                      }}
                    >
                      <span>Inspect Dossier</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="onboarding-modal-overlay">
          <div className="onboarding-modal-card" style={{ maxWidth: '640px' }}>
            
            <div className="onboarding-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} color="var(--accent-cyan)" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                  Register New Public Infrastructure Project
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="onboarding-modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Project Identifier *</label>
                    <input type="text" className="form-input" value={newProject.id} readOnly />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category / Sector *</label>
                    <select
                      className="form-input form-select"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    >
                      <option value="Roadways & Urban Mobility">Roadways & Urban Mobility</option>
                      <option value="Bridges & Flyovers">Bridges & Flyovers</option>
                      <option value="Water & Sanitation">Water & Sanitation</option>
                      <option value="Public Buildings & Health">Public Buildings & Health</option>
                      <option value="Environmental & Utilities">Environmental & Utilities</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Name / Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Construction of Concrete Road Sector 4"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Location / Sector *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contractor Entity *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Apex InfraTech & Roadways Corp"
                      value={newProject.contractor}
                      onChange={(e) => setNewProject({ ...newProject, contractor: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sanctioned Budget *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Completion Date *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProject.plannedCompletion}
                      onChange={(e) => setNewProject({ ...newProject, plannedCompletion: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Technical Scope & Citizen Description</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Provide technical scope and public citizen summary..."
                    value={newProject.publicDescription}
                    onChange={(e) => setNewProject({ ...newProject, publicDescription: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

              </div>

              <div className="onboarding-modal-footer">
                <button type="button" className="action-btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="action-btn-primary">
                  <CheckCircle2 size={16} />
                  <span>Register & Save Record</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
