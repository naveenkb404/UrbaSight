import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Info, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Compass,
  X
} from './Icons';
import { PROJECTS_DATA } from '../data/mockData';

export const PublicPortalView = ({ 
  userState, 
  onChangeLocation, 
  onSelectAudienceSwitch 
}) => {
  const [activeGeoTier, setActiveGeoTier] = useState('near'); // 'near' | 'city' | 'district' | 'state'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublicProject, setSelectedPublicProject] = useState(null);

  // Filter projects by geographic tier and search query
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    // Geographic matching
    let matchesTier = true;
    if (activeGeoTier === 'near') {
      matchesTier = proj.geoTier === 'near' || proj.localArea?.toLowerCase().includes('sector 4') || proj.localArea?.toLowerCase().includes('rs puram');
    } else if (activeGeoTier === 'city') {
      matchesTier = proj.city?.toLowerCase() === userState.location.city?.toLowerCase() || proj.geoTier === 'near' || proj.geoTier === 'city';
    } else if (activeGeoTier === 'district') {
      matchesTier = proj.district?.toLowerCase() === userState.location.district?.toLowerCase() || proj.district?.toLowerCase().includes('coimbatore');
    } else if (activeGeoTier === 'state') {
      matchesTier = proj.state?.toLowerCase() === userState.location.state?.toLowerCase() || proj.state?.toLowerCase().includes('tamil nadu');
    }

    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTier && matchesSearch;
  });

  return (
    <div className="view-container">
      
      {/* Location Banner (Section 8: Clearly display selected location with "Change Location") */}
      <div className="public-location-hero-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
            <MapPin size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
              YOUR CURRENT SELECTED LOCATION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              📍 {userState.location?.city || 'Coimbatore'}, {userState.location?.state || 'Tamil Nadu'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Ward / Local Area: <strong>{userState.location?.localArea || 'Sector 4 / Gandhipuram'}</strong> • PIN: {userState.location?.pincode || '641012'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="action-btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            onClick={onChangeLocation}
          >
            <Navigation size={14} />
            <span>Change Location</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="view-header-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div className="view-title-group">
          <h2 className="view-heading">Public Infrastructure Project Discovery</h2>
          <p className="view-subheading">
            Track sanctioned public works, civic upgrades, and road progress in your neighborhood.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(6, 12, 22, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '6px 12px', gap: '8px' }}>
          <Search size={14} color="var(--text-tertiary)" />
          <input
            type="text"
            placeholder="Search projects by name, category, or road..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '0.82rem', width: '240px' }}
          />
        </div>
      </div>

      {/* Geographic Discovery Level Tabs (Section 6: NEAR YOU -> YOUR CITY -> YOUR DISTRICT -> YOUR STATE) */}
      <div className="geo-tier-tabs-bar">
        <button
          className={`geo-tier-tab ${activeGeoTier === 'near' ? 'active' : ''}`}
          onClick={() => setActiveGeoTier('near')}
        >
          <span className="geo-tier-title">1. NEAR YOU</span>
          <span className="geo-tier-sub">Sector 4 / Local Ward</span>
        </button>

        <button
          className={`geo-tier-tab ${activeGeoTier === 'city' ? 'active' : ''}`}
          onClick={() => setActiveGeoTier('city')}
        >
          <span className="geo-tier-title">2. YOUR CITY</span>
          <span className="geo-tier-sub">{userState.location?.city || 'Coimbatore'} Municipal Area</span>
        </button>

        <button
          className={`geo-tier-tab ${activeGeoTier === 'district' ? 'active' : ''}`}
          onClick={() => setActiveGeoTier('district')}
        >
          <span className="geo-tier-title">3. YOUR DISTRICT</span>
          <span className="geo-tier-sub">{userState.location?.district || 'Coimbatore'} District</span>
        </button>

        <button
          className={`geo-tier-tab ${activeGeoTier === 'state' ? 'active' : ''}`}
          onClick={() => setActiveGeoTier('state')}
        >
          <span className="geo-tier-title">4. YOUR STATE</span>
          <span className="geo-tier-sub">{userState.location?.state || 'Tamil Nadu'} Infrastructure</span>
        </button>
      </div>

      {/* Simplified Public Project Cards Grid (Section 7) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id} 
            className="public-project-card"
            onClick={() => setSelectedPublicProject(proj)}
          >
            <div className="public-card-top">
              <span className="project-id-badge">{proj.shortId}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                {proj.category}
              </span>
            </div>

            <h3 className="public-card-title">{proj.name}</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <MapPin size={13} color="var(--accent-cyan)" />
              <span>{proj.location}</span>
            </div>

            <p className="public-card-desc">
              {proj.publicDescription || `Infrastructure development project under execution in ${proj.location}.`}
            </p>

            {/* Public Progress Section */}
            <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Status: <strong>{proj.publicStatus || 'Active Construction'}</strong></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399' }}>{proj.progress}%</span>
              </div>

              <div className="progress-bar-track" style={{ height: '7px' }}>
                <div 
                  className="progress-bar-fill emerald" 
                  style={{ width: `${proj.progress}%` }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} />
                  <span>Target: {proj.plannedCompletion}</span>
                </span>

                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(9, 18, 33, 0.5)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <Info size={32} color="var(--accent-cyan)" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ color: '#ffffff', marginBottom: '6px' }}>No Projects Found in This Geographic Tier</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Try selecting a broader tier like "Your City" or "Your State", or change your location.</p>
        </div>
      )}

      {/* Public Project Details Modal (Simplified, No Sensitive Data) */}
      {selectedPublicProject && (
        <div className="onboarding-modal-overlay">
          <div className="onboarding-modal-card" style={{ maxWidth: '640px' }}>
            
            <div className="onboarding-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="project-id-badge">{selectedPublicProject.id}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{selectedPublicProject.category}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedPublicProject(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="onboarding-modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                {selectedPublicProject.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                <MapPin size={15} />
                <span>{selectedPublicProject.location}</span>
              </div>

              <div style={{
                background: 'rgba(6, 12, 22, 0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                <div>
                  <span className="metric-label">CURRENT PROGRESS</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
                    {selectedPublicProject.progress}%
                  </div>
                </div>

                <div>
                  <span className="metric-label">PLANNED COMPLETION</span>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, marginTop: '4px' }}>
                    {selectedPublicProject.plannedCompletion}
                  </div>
                </div>

                <div>
                  <span className="metric-label">PROJECT STATUS</span>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '2px' }}>
                    {selectedPublicProject.publicStatus || 'Active Construction'}
                  </div>
                </div>

                <div>
                  <span className="metric-label">IMPLEMENTING BODY</span>
                  <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>
                    {selectedPublicProject.publicAuthority || 'Coimbatore Municipal Corporation'}
                  </div>
                </div>
              </div>

              <div>
                <span className="metric-label" style={{ marginBottom: '6px', display: 'block' }}>PUBLIC PROJECT SCOPE</span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {selectedPublicProject.publicDescription || `Comprehensive public infrastructure initiative for ${selectedPublicProject.name} sanctioned under urban infrastructure mission.`}
                </p>
              </div>

              {selectedPublicProject.publicCitizenBenefits && (
                <div style={{ background: 'rgba(0, 242, 254, 0.06)', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '10px', padding: '14px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    CITIZEN & NEIGHBORHOOD BENEFITS
                  </span>
                  <p style={{ fontSize: '0.84rem', color: '#ffffff', lineHeight: 1.5 }}>
                    {selectedPublicProject.publicCitizenBenefits}
                  </p>
                </div>
              )}
            </div>

            <div className="onboarding-modal-footer">
              <button className="action-btn-secondary" onClick={() => setSelectedPublicProject(null)}>
                Close
              </button>
              <button 
                className="action-btn-primary"
                onClick={() => {
                  alert(`Subscribed to civic progress updates for ${selectedPublicProject.shortId}. You will receive milestone notifications.`);
                  setSelectedPublicProject(null);
                }}
              >
                <CheckCircle2 size={15} />
                <span>Subscribe for Civic Updates</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
