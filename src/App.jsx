import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { DashboardView } from './components/DashboardView';
import { ProjectIntelligenceView } from './components/ProjectIntelligenceView';
import { RiskInvestigationView } from './components/RiskInvestigationView';
import { GeoTemporalView } from './components/GeoTemporalView';
import { FairCostView } from './components/FairCostView';
import { ProjectPulseView } from './components/ProjectPulseView';
import { ExplainAuditView } from './components/ExplainAuditView';
import { ProjectMapView } from './components/ProjectMapView';
import { EvidenceWorkflowView } from './components/EvidenceWorkflowView';
import { PublicPortalView } from './components/PublicPortalView';
import { AdminPanelView } from './components/AdminPanelView';
import { OnboardingModal } from './components/OnboardingModal';
import { PROJECTS_DATA, DEFAULT_USER_STATE } from './data/mockData';

export function App() {
  const [activeView, setActiveView] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(PROJECTS_DATA[0]); // Default to Project P-1024
  
  // User & Audience State (Admin | Official | Public)
  const [userState, setUserState] = useState(DEFAULT_USER_STATE);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingInitialStep, setOnboardingInitialStep] = useState(1);

  // Dynamic projects list with admin creations
  const [projectsList, setProjectsList] = useState(PROJECTS_DATA);

  // Cinematic infrastructure background image URLs
  const bgImageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85";

  const handleOpenOnboarding = (initialStep = 1) => {
    setOnboardingInitialStep(initialStep);
    setIsOnboardingOpen(true);
  };

  const handleSelectAudienceDirect = (audience) => {
    setUserState(prev => ({
      ...prev,
      audience: audience
    }));

    if (audience === 'public') {
      setActiveView('public_portal');
    } else if (audience === 'admin') {
      setActiveView('admin_panel');
    } else {
      setActiveView('dashboard');
    }
  };

  const handleAddProject = (newProj) => {
    setProjectsList([newProj, ...projectsList]);
    setSelectedProject(newProj);
  };

  const renderView = () => {
    switch (activeView) {
      case 'hero':
        return (
          <LandingHero
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
            userState={userState}
            onOpenOnboarding={() => handleOpenOnboarding(1)}
            onSelectAudienceDirect={handleSelectAudienceDirect}
          />
        );

      case 'public_portal':
        return (
          <PublicPortalView
            userState={userState}
            onChangeLocation={() => handleOpenOnboarding(3)}
            onSelectAudienceSwitch={() => handleOpenOnboarding(1)}
          />
        );

      case 'admin_panel':
        return (
          <AdminPanelView
            userState={userState}
            onAddProject={handleAddProject}
            onInspectProject={(proj) => setSelectedProject(proj)}
            setActiveView={setActiveView}
          />
        );

      case 'dashboard':
        return (
          <DashboardView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
            userState={userState}
            onChangeLocation={() => handleOpenOnboarding(3)}
          />
        );

      case 'intelligence':
        return (
          <ProjectIntelligenceView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'risk':
        return (
          <RiskInvestigationView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'geotemporal':
        return (
          <GeoTemporalView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'faircost':
        return (
          <FairCostView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'projectpulse':
        return (
          <ProjectPulseView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'explainaudit':
        return (
          <ExplainAuditView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'map':
        return (
          <ProjectMapView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      case 'workflow':
        return (
          <EvidenceWorkflowView
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
          />
        );

      default:
        return (
          <LandingHero
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setActiveView={setActiveView}
            userState={userState}
            onOpenOnboarding={() => handleOpenOnboarding(1)}
            onSelectAudienceDirect={handleSelectAudienceDirect}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Outer Cinematic Frame (Matches Reference UI composition) */}
      <div className="outer-cinematic-frame">
        
        {/* Corner Accents */}
        <div className="frame-corner top-left" />
        <div className="frame-corner top-right" />
        <div className="frame-corner bottom-left" />
        <div className="frame-corner bottom-right" />

        {/* Atmospheric Infrastructure Background */}
        <div className="cinematic-bg-layer">
          <div 
            className="cinematic-bg-image" 
            style={{ 
              backgroundImage: `url(${bgImageUrl})`
            }} 
          />
          <div className="cinematic-bg-overlay" />
          <div className="cinematic-grid-overlay" />
        </div>

        {/* Global Top Navigation */}
        <Navbar 
          activeView={activeView} 
          setActiveView={setActiveView}
          userState={userState}
          onOpenOnboarding={() => handleOpenOnboarding(1)}
          onChangeLocation={() => handleOpenOnboarding(3)}
        />

        {/* Active View Container */}
        {renderView()}

        {/* 5-Step Cinematic Onboarding & Audience Access Wizard */}
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          userState={userState}
          setUserState={setUserState}
          initialStep={onboardingInitialStep}
          onComplete={(selectedAudience) => {
            if (selectedAudience === 'public') setActiveView('public_portal');
            else if (selectedAudience === 'admin') setActiveView('admin_panel');
            else setActiveView('dashboard');
          }}
        />

      </div>
    </div>
  );
}

export default App;
