import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Layers, 
  AlertTriangle, 
  Compass, 
  TrendingUp, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  UserCheck, 
  Building2,
  Users,
  Navigation,
  RefreshCw
} from './Icons';

export const Navbar = ({ 
  activeView, 
  setActiveView, 
  userState, 
  onOpenOnboarding,
  onChangeLocation
}) => {
  // Navigation tabs for GOVERNMENT OFFICIAL (Full suite)
  const officialNavItems = [
    { id: 'hero', label: 'Overview', icon: ShieldCheck, isHome: true },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'intelligence', label: 'Projects', icon: Layers },
    { id: 'risk', label: 'Risk Intelligence', icon: AlertTriangle },
    { id: 'geotemporal', label: 'GeoTemporal', icon: Compass },
    { id: 'faircost', label: 'FairCost', icon: TrendingUp },
    { id: 'projectpulse', label: 'ProjectPulse', icon: Activity },
    { id: 'explainaudit', label: 'ExplainAudit', icon: FileText },
    { id: 'map', label: 'Project Map', icon: MapPin },
    { id: 'workflow', label: 'Inspection Workflow', icon: CheckCircle2 },
  ];

  // Navigation tabs for ADMIN
  const adminNavItems = [
    { id: 'hero', label: 'Overview', icon: ShieldCheck, isHome: true },
    { id: 'admin_panel', label: 'Admin Control', icon: Building2 },
    { id: 'intelligence', label: 'Project Dossiers', icon: Layers },
    { id: 'map', label: 'Project Map', icon: MapPin },
    { id: 'dashboard', label: 'Executive Intel', icon: Activity }
  ];

  // Navigation tabs for PUBLIC / CITIZEN
  const publicNavItems = [
    { id: 'hero', label: 'Overview', icon: ShieldCheck, isHome: true },
    { id: 'public_portal', label: 'Projects Near You', icon: Compass },
    { id: 'map', label: 'Public Map View', icon: MapPin }
  ];

  const currentNavItems = userState.audience === 'admin' 
    ? adminNavItems 
    : userState.audience === 'public' 
    ? publicNavItems 
    : officialNavItems;

  const getRoleLabel = () => {
    switch (userState.audience) {
      case 'admin': return 'Administrator';
      case 'public': return 'Public Citizen';
      default: return 'Gov Official';
    }
  };

  const getRoleIcon = () => {
    switch (userState.audience) {
      case 'admin': return <Building2 size={16} />;
      case 'public': return <Users size={16} />;
      default: return <UserCheck size={16} />;
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Left: URBASIGHT Brand */}
      <div className="brand-section" onClick={() => setActiveView('hero')}>
        <div className="brand-symbol">
          <ShieldCheck size={22} strokeWidth={2.4} />
        </div>
        <div className="brand-text-block">
          <div className="brand-title">URBASIGHT</div>
          <div className="brand-subtitle">PUBLIC PROJECT INTELLIGENCE</div>
        </div>
      </div>

      {/* Top Navigation Links */}
      <nav className="nav-links-container">
        {currentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''} ${item.isHome ? 'hero-home-btn' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Top Right: Location & User Role Status Area */}
      <div className="user-status-area">
        
        {/* Active Location Pill */}
        <button 
          className="navbar-location-pill"
          onClick={onChangeLocation}
          title="Click to Change Location"
        >
          <MapPin size={13} color="var(--accent-cyan)" />
          <span>{userState.location?.city || 'Coimbatore'}, {userState.location?.state?.substring(0, 2) || 'TN'}</span>
        </button>

        {/* User Role Badge & Access Switcher */}
        <div 
          className="user-badge-card" 
          onClick={onOpenOnboarding}
          title="Click to Switch Access Role / Edit Details"
          style={{ cursor: 'pointer' }}
        >
          <div className={`user-avatar ${userState.audience}`}>
            {getRoleIcon()}
          </div>
          <div className="user-info">
            <div className="user-role">{getRoleLabel()}</div>
            <div className="user-department">{userState.fullName?.split(' ')[0] || 'User'} • Switch Access ▾</div>
          </div>
        </div>
      </div>
    </header>
  );
};
