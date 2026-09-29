import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  UserCheck, 
  MapPin, 
  Navigation, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  AlertCircle, 
  Lock, 
  Sparkles,
  Layers,
  Compass,
  FileText
} from './Icons';
import { INDIAN_LOCATIONS_DATABASE } from '../data/mockData';

export const OnboardingModal = ({ 
  isOpen, 
  onClose, 
  userState, 
  setUserState, 
  initialStep = 1,
  onComplete 
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(initialStep);
  const [selectedAudience, setSelectedAudience] = useState(userState.audience || 'official');
  
  // Form fields state
  const [formData, setFormData] = useState({
    fullName: userState.fullName || '',
    email: userState.email || '',
    mobile: userState.mobile || '',
    adminId: userState.adminId || 'ADM-TN-772',
    officialId: userState.officialId || 'GOV-8942',
    department: userState.department || 'Ministry of Road Transport & Highways (MoRTH)',
    organization: userState.organization || 'State Infrastructure Audit Directorate',
    designation: userState.designation || 'Senior Technical Audit Officer',
    country: userState.location?.country || 'India',
    state: userState.location?.state || 'Tamil Nadu',
    district: userState.location?.district || 'Coimbatore',
    city: userState.location?.city || 'Coimbatore',
    localArea: userState.location?.localArea || 'Sector 4',
    pincode: userState.location?.pincode || '641012'
  });

  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState('');

  // Geographic helpers based on selected state
  const currentStateData = INDIAN_LOCATIONS_DATABASE.find(s => s.state === formData.state) || INDIAN_LOCATIONS_DATABASE[0];
  const currentDistrictData = currentStateData.districts.find(d => d.district === formData.district) || currentStateData.districts[0];

  const handleStateChange = (newState) => {
    const sData = INDIAN_LOCATIONS_DATABASE.find(s => s.state === newState) || INDIAN_LOCATIONS_DATABASE[0];
    const firstDist = sData.districts[0];
    setFormData(prev => ({
      ...prev,
      state: newState,
      district: firstDist.district,
      city: firstDist.cities[0] || 'City',
      localArea: firstDist.localAreas[0] || 'Locality',
      pincode: firstDist.pincodes[0] || '600001'
    }));
  };

  const handleDistrictChange = (newDist) => {
    const dData = currentStateData.districts.find(d => d.district === newDist) || currentStateData.districts[0];
    setFormData(prev => ({
      ...prev,
      district: newDist,
      city: dData.cities[0] || 'City',
      localArea: dData.localAreas[0] || 'Locality',
      pincode: dData.pincodes[0] || '600001'
    }));
  };

  // Simulated device GPS location permission trigger
  const triggerGpsLocation = () => {
    setShowLocationPermissionModal(true);
  };

  const handleAllowGps = () => {
    setShowLocationPermissionModal(false);
    setIsLocating(true);
    setLocationSuccessMsg('');

    setTimeout(() => {
      setIsLocating(false);
      setFormData(prev => ({
        ...prev,
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        city: 'Coimbatore',
        localArea: 'Sector 4 / Gandhipuram',
        pincode: '641012'
      }));
      setLocationSuccessMsg('📍 Location automatically acquired: Sector 4, Coimbatore, Tamil Nadu (Accuracy: ±8m)');
    }, 900);
  };

  const handleCompleteOnboarding = () => {
    const updated = {
      ...userState,
      audience: selectedAudience,
      fullName: formData.fullName || (selectedAudience === 'admin' ? 'Admin Officer' : selectedAudience === 'official' ? 'Rajesh Sundaram' : 'Citizen User'),
      email: formData.email,
      mobile: formData.mobile,
      adminId: formData.adminId,
      officialId: formData.officialId,
      department: formData.department,
      organization: formData.organization,
      designation: formData.designation,
      location: {
        country: formData.country,
        state: formData.state,
        district: formData.district,
        city: formData.city,
        localArea: formData.localArea,
        pincode: formData.pincode
      },
      isOnboarded: true
    };

    setUserState(updated);
    if (onComplete) {
      onComplete(selectedAudience);
    }
    onClose();
  };

  const stepTitles = [
    "Select Audience",
    "Your Details",
    "Your Location",
    "Project Jurisdiction",
    "Enter UrbaSight"
  ];

  return (
    <div className="onboarding-modal-overlay">
      <div className="onboarding-modal-card">
        
        {/* Modal Top Header */}
        <div className="onboarding-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-symbol" style={{ width: '32px', height: '32px' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em' }}>
                URBASIGHT ACCESS PORTAL
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                STEP 0{step} OF 05 • {stepTitles[step - 1].toUpperCase()}
              </div>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="onboarding-step-indicator-bar">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`onboarding-step-bubble ${s === step ? 'current' : s < step ? 'completed' : ''}`}
              onClick={() => s <= step && setStep(s)}
            >
              <div className="step-bubble-dot">
                {s < step ? <Check size={10} /> : s}
              </div>
              <span className="step-bubble-label">{stepTitles[s - 1]}</span>
            </div>
          ))}
        </div>

        {/* Modal Body: Dynamic Step Content */}
        <div className="onboarding-modal-body">
          
          {/* ==================================================
              STEP 01: SELECT AUDIENCE
             ================================================== */}
          {step === 1 && (
            <div className="onboarding-step-pane">
              <div className="step-heading-group">
                <h3 className="step-title">Select Your Access Experience</h3>
                <p className="step-subtitle">
                  UrbaSight provides tailored intelligence, governance, and public discovery tools depending on your institutional role.
                </p>
              </div>

              <div className="audience-cards-grid">
                
                {/* 1. ADMIN CARD */}
                <div 
                  className={`audience-choice-card ${selectedAudience === 'admin' ? 'active' : ''}`}
                  onClick={() => setSelectedAudience('admin')}
                >
                  <div className="audience-card-icon-box cyan">
                    <Building2 size={24} />
                  </div>
                  <div className="audience-card-title">ADMIN</div>
                  <div className="audience-card-highlight">“Manage public project information”</div>
                  <p className="audience-card-desc">
                    Register new infrastructure works, configure baseline budgets, assign contractors, and manage administrative jurisdictions.
                  </p>
                  <div className="audience-card-badge">Project Control & Inventory</div>
                </div>

                {/* 2. GOVERNMENT OFFICIAL CARD */}
                <div 
                  className={`audience-choice-card ${selectedAudience === 'official' ? 'active' : ''}`}
                  onClick={() => setSelectedAudience('official')}
                >
                  <div className="audience-card-icon-box blue">
                    <UserCheck size={24} />
                  </div>
                  <div className="audience-card-title">GOVERNMENT OFFICIAL</div>
                  <div className="audience-card-highlight">“Track, analyse and inspect projects”</div>
                  <p className="audience-card-desc">
                    Access multimodal AI intelligence: GeoTemporal duplicate detection, FairCost benchmarking, ProjectPulse delay forecasting, and digital audit certificates.
                  </p>
                  <div className="audience-card-badge">Full Intelligence Suite</div>
                </div>

                {/* 3. PUBLIC CARD */}
                <div 
                  className={`audience-choice-card ${selectedAudience === 'public' ? 'active' : ''}`}
                  onClick={() => setSelectedAudience('public')}
                >
                  <div className="audience-card-icon-box emerald">
                    <Users size={24} />
                  </div>
                  <div className="audience-card-title">PUBLIC / CITIZEN</div>
                  <div className="audience-card-highlight">“Explore public project status”</div>
                  <p className="audience-card-desc">
                    Discover civic infrastructure projects near your locality, city, district, and state with simplified, citizen-friendly timelines.
                  </p>
                  <div className="audience-card-badge">Geographic Discovery</div>
                </div>

              </div>
            </div>
          )}

          {/* ==================================================
              STEP 02: YOUR DETAILS
             ================================================== */}
          {step === 2 && (
            <div className="onboarding-step-pane">
              <div className="step-heading-group">
                <h3 className="step-title">
                  {selectedAudience === 'admin' && "Admin Profile Information"}
                  {selectedAudience === 'official' && "Government Official Credentials"}
                  {selectedAudience === 'public' && "Citizen Profile Information"}
                </h3>
                <p className="step-subtitle">
                  {selectedAudience === 'public' 
                    ? "Enter your details for personalized public project tracking and localized alerts."
                    : "Provide your official institutional details for audit verification and audit ledger logging."}
                </p>
              </div>

              <div className="form-fields-layout">
                {/* Personal Details Section */}
                <div className="form-section-title">PERSONAL DETAILS</div>
                
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Rajesh Sundaram"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {selectedAudience === 'official' ? "Official Email Address *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder={selectedAudience === 'official' ? "r.sundaram@morth.gov.in" : "name@example.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98421 77320"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>
                </div>

                {/* Role Specific Details for Admin & Official */}
                {selectedAudience === 'admin' && (
                  <>
                    <div className="form-section-title" style={{ marginTop: '16px' }}>ADMIN DETAILS</div>
                    <div className="form-grid-2col">
                      <div className="form-group">
                        <label className="form-label">Admin ID / Token *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.adminId}
                          onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Department / Organization *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Municipal Project Directorate"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Designation *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Superintending Project Admin"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedAudience === 'official' && (
                  <>
                    <div className="form-section-title" style={{ marginTop: '16px' }}>OFFICIAL CREDENTIALS</div>
                    <div className="form-grid-2col">
                      <div className="form-group">
                        <label className="form-label">Official Officer ID *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.officialId}
                          onChange={(e) => setFormData({ ...formData, officialId: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Ministry / Department *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Audit Directorate / Organization *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Designation *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>
          )}

          {/* ==================================================
              STEP 03: YOUR LOCATION / JURISDICTION
             ================================================== */}
          {step === 3 && (
            <div className="onboarding-step-pane">
              <div className="step-heading-group">
                <h3 className="step-title">
                  {selectedAudience === 'admin' && "Administrative Location Assignment"}
                  {selectedAudience === 'official' && "Official Jurisdiction & Coverage"}
                  {selectedAudience === 'public' && "Select Your Location"}
                </h3>
                <p className="step-subtitle">
                  {selectedAudience === 'admin'
                    ? "The selected administrative location determines which geographical project records you manage."
                    : selectedAudience === 'official'
                    ? "Determines the primary geographic jurisdiction and initial project audit telemetry prioritization."
                    : "UrbaSight will discover and rank public projects closest to your street, ward, city, and district."}
                </p>
              </div>

              {/* Location Acquisition Options (Device GPS vs Manual) */}
              <div className="location-options-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="audience-card-icon-box emerald" style={{ width: '40px', height: '40px' }}>
                    <Navigation size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>
                      Option A: Use Current Device Location
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Automatically detect local municipality & PIN code for instant spatial discovery.
                    </div>
                  </div>
                </div>

                <button 
                  className="action-btn-primary" 
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  onClick={triggerGpsLocation}
                  disabled={isLocating}
                >
                  <Navigation size={14} />
                  <span>{isLocating ? "Acquiring GPS..." : "Use Current Location"}</span>
                </button>
              </div>

              {locationSuccessMsg && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#34d399',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Check size={16} />
                  <span>{locationSuccessMsg}</span>
                </div>
              )}

              {/* Option B: Manual Hierarchical Selector */}
              <div className="form-fields-layout" style={{ marginTop: '16px' }}>
                <div className="form-section-title">
                  OPTION B: SELECT LOCATION MANUALLY
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-input" value="India" readOnly />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <select 
                      className="form-input form-select"
                      value={formData.state}
                      onChange={(e) => handleStateChange(e.target.value)}
                    >
                      {INDIAN_LOCATIONS_DATABASE.map(s => (
                        <option key={s.state} value={s.state}>{s.state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">District *</label>
                    <select 
                      className="form-input form-select"
                      value={formData.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                    >
                      {currentStateData.districts.map(d => (
                        <option key={d.district} value={d.district}>{d.district}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">City / Town / Local Body *</label>
                    <select 
                      className="form-input form-select"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      {currentDistrictData.cities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Local Area / Municipality / Ward *</label>
                    <select 
                      className="form-input form-select"
                      value={formData.localArea}
                      onChange={(e) => setFormData({ ...formData, localArea: e.target.value })}
                    >
                      {currentDistrictData.localAreas.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              STEP 04: PROJECT AREA / JURISDICTION SUMMARY
             ================================================== */}
          {step === 4 && (
            <div className="onboarding-step-pane">
              <div className="step-heading-group">
                <h3 className="step-title">
                  {selectedAudience === 'admin' && "Administrative Area Verification"}
                  {selectedAudience === 'official' && "Jurisdiction & Project Coverage"}
                  {selectedAudience === 'public' && "Local Project Discovery Radius"}
                </h3>
                <p className="step-subtitle">
                  Confirm your configured geographical zone before entering the UrbaSight portal.
                </p>
              </div>

              {/* Summary Card Layout */}
              <div className="summary-area-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="var(--accent-cyan)" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
                      {selectedAudience === 'admin' ? "ADMINISTRATIVE AREA" : selectedAudience === 'official' ? "YOUR JURISDICTION" : "YOUR DISCOVERY LOCATION"}
                    </span>
                  </div>
                  <span className="project-id-badge">
                    {formData.district}, {formData.state}
                  </span>
                </div>

                <div className="summary-area-grid">
                  <div className="summary-field">
                    <span className="summary-field-label">STATE</span>
                    <span className="summary-field-value">{formData.state}</span>
                  </div>

                  <div className="summary-field">
                    <span className="summary-field-label">DISTRICT</span>
                    <span className="summary-field-value">{formData.district}</span>
                  </div>

                  <div className="summary-field">
                    <span className="summary-field-label">CITY / LOCAL BODY</span>
                    <span className="summary-field-value">{formData.city}</span>
                  </div>

                  <div className="summary-field">
                    <span className="summary-field-label">LOCAL AREA / WARD</span>
                    <span className="summary-field-value">{formData.localArea}</span>
                  </div>
                </div>

                {/* Project Coverage Preview */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    {selectedAudience === 'admin' 
                      ? "MANAGED PROJECT INVENTORY SCOPE" 
                      : selectedAudience === 'official'
                      ? "JURISDICTIONAL AUDIT TELEMETRY"
                      : "PERSONALIZED GEOGRAPHIC TIERS"}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#ffffff', marginTop: '4px' }}>
                    {selectedAudience === 'public' 
                      ? "Projects automatically categorized across: Near You → Your City → Your District → Your State."
                      : `Priority access to all public works located within ${formData.city}, ${formData.district} District, ${formData.state}.`}
                  </div>
                </div>
              </div>

              {/* Key Features Preview Based on Role */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginTop: '16px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>ROLE</span>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, marginTop: '2px' }}>
                    {selectedAudience.toUpperCase()}
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>ACTIVE CITY</span>
                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '2px' }}>
                    {formData.city}
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>ACTIVE DISTRICT</span>
                  <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 700, marginTop: '2px' }}>
                    {formData.district}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================
              STEP 05: ENTER URBASIGHT
             ================================================== */}
          {step === 5 && (
            <div className="onboarding-step-pane" style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(59, 130, 246, 0.3))',
                border: '2px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--accent-cyan)',
                boxShadow: '0 0 30px rgba(0, 242, 254, 0.3)'
              }}>
                <Sparkles size={30} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Welcome to UrbaSight, {formData.fullName || 'Officer'}
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 24px' }}>
                Your account is configured for <strong>{selectedAudience.toUpperCase()}</strong> access in <strong>{formData.city}, {formData.state}</strong>.
              </p>

              <div style={{
                background: 'rgba(9, 18, 33, 0.7)',
                border: '1px solid var(--border-medium)',
                borderRadius: '14px',
                padding: '16px 20px',
                maxWidth: '480px',
                margin: '0 auto 28px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Assigned Experience:</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>
                    {selectedAudience === 'admin' ? "Admin Control Panel" : selectedAudience === 'official' ? "Government Official Portal" : "Public Project Portal"}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Geographic Scope:</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{formData.city}, {formData.district}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 0' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Institutional Clearance:</span>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Verified & Active</span>
                </div>
              </div>

              <button 
                className="primary-cta-btn"
                style={{ padding: '14px 36px', fontSize: '1rem', margin: '0 auto' }}
                onClick={handleCompleteOnboarding}
              >
                <span>
                  {selectedAudience === 'admin' && "CONTINUE TO ADMIN PANEL"}
                  {selectedAudience === 'official' && "ENTER OFFICIAL PORTAL"}
                  {selectedAudience === 'public' && "EXPLORE PUBLIC PROJECTS"}
                </span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="onboarding-modal-footer">
            {step > 1 ? (
              <button 
                className="action-btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={15} />
                <span>Back</span>
              </button>
            ) : <div />}

            <button 
              className="action-btn-primary"
              onClick={() => setStep(step + 1)}
            >
              <span>{step === 4 ? "Proceed to Enter" : "Continue"}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}

      </div>

      {/* Privacy / Location Permission Modal (Strictly following Section 10 specs) */}
      {showLocationPermissionModal && (
        <div className="permission-modal-backdrop">
          <div className="permission-modal-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
                <Navigation size={20} />
              </div>
              <h4 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 800 }}>
                Use your current location?
              </h4>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              UrbaSight can use your location to show relevant public projects in your area.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                className="action-btn-secondary"
                onClick={() => setShowLocationPermissionModal(false)}
              >
                SELECT MANUALLY
              </button>
              <button 
                className="action-btn-primary"
                onClick={handleAllowGps}
              >
                ALLOW LOCATION
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
