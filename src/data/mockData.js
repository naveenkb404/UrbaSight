// UrbaSight Master Mock Dataset
// Structured with Geographic Hierarchies & Multi-Audience Data Access

export const DEFAULT_USER_STATE = {
  audience: 'official', // 'admin' | 'official' | 'public'
  fullName: 'Rajesh Sundaram',
  email: 'r.sundaram@morth.gov.in',
  mobile: '+91 98421 77320',
  adminId: 'ADM-TN-772',
  officialId: 'GOV-8942',
  department: 'Ministry of Road Transport & Highways (MoRTH)',
  organization: 'State Infrastructure Audit Directorate',
  designation: 'Senior Technical Audit Officer',
  location: {
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    city: 'Coimbatore',
    localArea: 'Sector 4 / Gandhipuram',
    pincode: '641012'
  },
  isOnboarded: true
};

export const INDIAN_LOCATIONS_DATABASE = [
  {
    state: "Tamil Nadu",
    districts: [
      {
        district: "Coimbatore",
        cities: ["Coimbatore", "Pollachi", "Mettupalayam", "Sulur"],
        localAreas: ["Sector 4", "Gandhipuram", "RS Puram", "Singanallur", "Avinashi Road", "Kurichi", "Peelamedu", "Saibaba Colony"],
        pincodes: ["641012", "641002", "641005", "641004", "641018"]
      },
      {
        district: "Chennai",
        cities: ["Chennai", "Tambaram", "Avadi"],
        localAreas: ["Anna Nagar", "T. Nagar", "Guindy", "OMR Corridor", "Velachery"],
        pincodes: ["600001", "600017", "600032", "600096"]
      },
      {
        district: "Madurai",
        cities: ["Madurai", "Melur", "Thirumangalam"],
        localAreas: ["KK Nagar", "Goripalayam", "Anna Bus Stand", "Tallakulam"],
        pincodes: ["625001", "625020", "625002"]
      }
    ]
  },
  {
    state: "Karnataka",
    districts: [
      {
        district: "Bengaluru Urban",
        cities: ["Bengaluru", "Electronic City", "Whitefield"],
        localAreas: ["Indiranagar", "Koramangala", "HSR Layout", "Hebbal Outer Ring Road"],
        pincodes: ["560001", "560034", "560038", "560066"]
      },
      {
        district: "Mysuru",
        cities: ["Mysuru", "Hunsur", "Nanjangud"],
        localAreas: ["Vijayanagar", "Gokulam", "Jayalakshmipuram", "Hebbal Industrial"],
        pincodes: ["570001", "570017", "570006"]
      }
    ]
  },
  {
    state: "Maharashtra",
    districts: [
      {
        district: "Pune",
        cities: ["Pune", "Pimpri-Chinchwad", "Hinjawadi"],
        localAreas: ["Baner", "Kothrud", "Wakad", "Viman Nagar"],
        pincodes: ["411001", "411045", "411057"]
      }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: "PROJECT P-1024",
    shortId: "P-1024",
    name: "Construction of Concrete Road Sector 4",
    category: "Roadways & Urban Mobility",
    location: "Sector 4, Gandhipuram, Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "Sector 4",
    pincode: "641012",
    geoTier: "near", // 'near' | 'city' | 'district' | 'state'
    coordinates: { lat: 11.0168, lng: 76.9558, x: 52, y: 44 },
    contractor: "Apex InfraTech & Roadways Corp",
    contractorNetworkRisk: "High",
    contractorCluster: "Cluster-09 (Shared Director Network with 2 Sub-Vendors)",
    budget: "₹48.5 Lakhs",
    budgetValue: 48.5,
    expenditure: "₹41.2 Lakhs",
    expenditureValue: 41.2,
    progress: 68,
    plannedProgress: 82,
    expectedProgress: 65,
    healthScore: 72,
    riskScore: 74,
    riskLevel: "Attention Required",
    verificationStatus: "Needs Verification",
    plannedCompletion: "Nov 2026 (Original: Aug 2026)",
    startDate: "Jan 2025",
    financialHealth: 68,
    scheduleHealth: 62,
    physicalProgress: 54,
    compliance: 88,
    
    // Public View Information (Clean, Non-Sensitive)
    publicDescription: "Widening and rigid cement concrete pavement laying for 1.4 km corridor in Sector 4 Gandhipuram to alleviate arterial congestion and improve stormwater runoff drainage.",
    publicStatus: "Active Construction Phase",
    publicCitizenBenefits: "Provides all-weather concrete road with integrated pedestrian walkways and LED street lighting.",
    publicAuthority: "Coimbatore City Municipal Corporation",

    // Risk Details (For Official / Admin Portal)
    primaryRiskFactors: [
      {
        title: "COST ABOVE ADJUSTED BENCHMARK",
        category: "Financial Evidence",
        severity: "High",
        summary: "Current billing of ₹48.5L exceeds the FairCost AI benchmark of ₹39.2L by +23.7% after terrain & inflation adjustments.",
        metric: "+23.7% Variance",
        flaggedAmount: "₹9.3 Lakhs"
      },
      {
        title: "PHYSICAL PROGRESS MISMATCH",
        category: "Progress Evidence",
        severity: "Critical",
        summary: "Independent drone photogrammetry detects 54% sub-base completion vs contractor self-reported 68% milestone claim.",
        metric: "-14% Discrepancy",
        flaggedAmount: "Milestone Stage 3"
      },
      {
        title: "SIMILAR PROJECT NEARBY",
        category: "Location Evidence",
        severity: "High",
        summary: "Potentially overlapping resurfacing project P-1088 registered 78 meters away within 7 months time window.",
        metric: "78m Proximity",
        flaggedAmount: "P-1088 Duplicate Risk"
      },
      {
        title: "UNUSUAL CONTRACTOR RELATIONSHIP PATTERN",
        category: "Network Evidence",
        severity: "Medium",
        summary: "Cross-bidding cluster detected across 3 municipal zones with shared corporate register address.",
        metric: "Entity Linkage 89%",
        flaggedAmount: "3 Bidders Linked"
      }
    ],

    // GeoTemporal AI Data
    geoTemporal: {
      projectA: {
        id: "P-1024",
        name: "Concrete Road Sector 4",
        sanctionDate: "Jan 2025",
        cost: "₹48.5 Lakhs",
        scope: "Rigid Pavement 1.4km with Storm Drain"
      },
      projectB: {
        id: "P-1088",
        name: "Arterial Road Resurfacing Sector 4B",
        sanctionDate: "Aug 2024",
        cost: "₹34.8 Lakhs",
        scope: "Bituminous Overlay 1.2km"
      },
      distance: "78 m",
      distanceValue: 78,
      timeDifference: "7 months",
      descriptionSimilarity: 78,
      duplicateWorkRisk: "High",
      statusMessage: "Potentially Similar Project — Needs Verification",
      overlapCoordinates: [
        { lat: 11.0172, lng: 76.9565, label: "P-1024 (Active Site)" },
        { lat: 11.0165, lng: 76.9552, label: "P-1088 (Previous Tender)" }
      ]
    },

    // FairCost AI Data
    fairCost: {
      reportedCost: 48.5,
      adjustedExpectedCost: 39.2,
      rawStandardEstimate: 36.8,
      anomalyVariance: "+23.7%",
      adjustments: [
        { factor: "Terrain Adjustment", value: "+4.2%", costImpact: "+₹1.54 Lakhs", reason: "Sub-surface rocky layer & water table stabilization" },
        { factor: "Inflation & Material Index", value: "+6.8%", costImpact: "+₹2.50 Lakhs", reason: "Cement & steel index price revision Q3 2025" },
        { factor: "Transport & Accessibility", value: "-2.1%", costImpact: "-₹0.77 Lakhs", reason: "Proximity to primary quarry arterial corridor" }
      ],
      anomalyIndicator: "Elevated Cost Variance Detected",
      verdictNote: "Cost anomaly of ₹9.3L flagged above multi-factor expected baseline."
    },

    // ProjectPulse AI Data
    projectPulse: {
      plannedProgress: 82,
      currentProgress: 68,
      expectedProgress: 65,
      scheduleDeviation: "-14%",
      delayProbability: 76,
      estimatedDelay: "+42 Days",
      budgetUtilization: 84.9,
      milestones: [
        { name: "Site Clearance & Utility Shift", planned: 100, actual: 100, status: "Completed", date: "Feb 2025" },
        { name: "Sub-grade Soil Compaction", planned: 100, actual: 100, status: "Completed", date: "May 2025" },
        { name: "Rigid Concrete Pavement Layer 1", planned: 100, actual: 72, status: "Delayed", date: "Aug 2025" },
        { name: "Storm Water Side-Channels", planned: 80, actual: 40, status: "Critical Lag", date: "Oct 2025" },
        { name: "Signage & Final Curing", planned: 30, actual: 0, status: "Pending", date: "Dec 2025" }
      ]
    },

    // ExplainAudit AI Data
    explainAudit: {
      certificateId: "AUDIT-CERT-2026-P1024-X9",
      timestamp: "2026-09-29T14:30:00Z",
      riskScore: 74,
      riskLevel: "Attention Required",
      confidenceScore: "94.2%",
      featureContributions: [
        { name: "Financial Risk (Cost Deviation)", value: 32, positive: true, note: "Reported cost exceeds FairCost AI baseline by 23.7%" },
        { name: "GeoTemporal Risk (Proximity Overlap)", value: 25, positive: true, note: "78m spatial proximity to 7-month prior tender P-1088" },
        { name: "Progress Mismatch (Physical vs Claim)", value: 18, positive: true, note: "14% delta between drone photogrammetry and billed milestone" },
        { name: "Network Pattern (Contractor Cluster)", value: 14, positive: true, note: "Co-bidding entity linkage detected across regional tenders" }
      ],
      evidenceSummary: "Algorithmic audit indicates elevated risk concentrated in financial disbursement variance and spatial overlap with recent adjacent tender. Human physical audit required before Stage 4 disbursement.",
      recommendedAction: "Dispatch Technical Auditor to verify concrete core depth at chainage 0+600 and cross-verify P-1088 physical boundary logs.",
      humanReviewStatus: "Pending Field Engineering Officer Sign-Off"
    },

    // Evidence & Inspection Workflow
    evidenceItems: [
      {
        id: "EV-01",
        title: "Drone Photogrammetry Orthomosaic",
        type: "Photogrammetry",
        date: "2026-09-18",
        status: "Mismatch Flagged",
        description: "Aerial scan confirms 54% concrete slab coverage vs 68% claim. Section 0+800 unpaved.",
        badge: "Visual Evidence"
      },
      {
        id: "EV-02",
        title: "Milestone Billing Ledger Stage 3",
        type: "Financial Record",
        date: "2026-09-12",
        status: "Variance +₹9.3L",
        description: "Invoice #INV-9923 submitted for ₹18.4L citing complete stormwater drainage laying.",
        badge: "Financial Audit"
      },
      {
        id: "EV-03",
        title: "Geospatial Boundary Cadastral Overlay",
        type: "Spatial Map",
        date: "2026-09-04",
        status: "Overlap 78m",
        description: "GIS coordinate boundary overlaps with 2024 resurfacing tender P-1088 corridor.",
        badge: "GeoTemporal AI"
      },
      {
        id: "EV-04",
        title: "Material Testing Quality Certificate",
        type: "Laboratory Report",
        date: "2026-08-28",
        status: "Passed 28-Day Curing",
        description: "Compressive strength test meets M40 grade specification (43.2 MPa achieved).",
        badge: "Quality Verified"
      }
    ]
  },

  {
    id: "PROJECT P-1087",
    shortId: "P-1087",
    name: "Community Infrastructure Development",
    category: "Civic & Community Facilities",
    location: "RS Puram West, Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "RS Puram",
    pincode: "641002",
    geoTier: "near",
    coordinates: { lat: 11.0100, lng: 76.9450, x: 44, y: 52 },
    contractor: "Coimbatore Civic Builders LLP",
    contractorNetworkRisk: "Low",
    contractorCluster: "Cluster-03",
    budget: "₹62.0 Lakhs",
    budgetValue: 62.0,
    expenditure: "₹26.0 Lakhs",
    expenditureValue: 26.0,
    progress: 42,
    plannedProgress: 45,
    expectedProgress: 44,
    healthScore: 86,
    riskScore: 28,
    riskLevel: "Healthy",
    verificationStatus: "Verified",
    plannedCompletion: "Jan 2027",
    startDate: "May 2025",
    financialHealth: 90,
    scheduleHealth: 88,
    physicalProgress: 84,
    compliance: 92,
    publicDescription: "Multi-utility community center construction with senior citizen library, public health kiosk, and rooftop solar rainwater harvesting.",
    publicStatus: "On Schedule (Superstructure Stage)",
    publicCitizenBenefits: "Open public recreation center with 200-capacity hall and neighborhood grievance center.",
    publicAuthority: "Coimbatore Municipal Corporation",
    primaryRiskFactors: [],
    geoTemporal: {
      projectA: { id: "P-1087", name: "Community Center RS Puram", sanctionDate: "May 2025", cost: "₹62.0L", scope: "2-Floor Community Facility" },
      projectB: { id: "P-0220", name: "Public Park Renovation RS Puram", sanctionDate: "Oct 2022", cost: "₹18.0L", scope: "Landscape & Playground" },
      distance: "320 m",
      timeDifference: "2.6 years",
      descriptionSimilarity: 20,
      duplicateWorkRisk: "Low",
      statusMessage: "Independent Civic Asset"
    },
    fairCost: {
      reportedCost: 62.0,
      adjustedExpectedCost: 60.5,
      anomalyVariance: "+2.4%",
      adjustments: [
        { factor: "Civic Norms Benchmark", value: "+2.4%", costImpact: "+₹1.5 Lakhs", reason: "Standard public building rate" }
      ],
      anomalyIndicator: "Nominal Cost Alignment",
      verdictNote: "Expenditure aligned with CPWD schedules."
    },
    projectPulse: {
      plannedProgress: 45,
      currentProgress: 42,
      expectedProgress: 44,
      scheduleDeviation: "-3%",
      delayProbability: 14,
      estimatedDelay: "+4 Days",
      budgetUtilization: 41.9,
      milestones: []
    },
    explainAudit: {
      certificateId: "AUDIT-CERT-2026-P1087-C1",
      riskScore: 28,
      riskLevel: "Healthy",
      confidenceScore: "97.0%",
      featureContributions: [
        { name: "Cost Compliance", value: 5, positive: false, note: "Within normal limits" }
      ],
      evidenceSummary: "Execution proceeding according to sanctioned architectural layout.",
      recommendedAction: "Routine quarterly inspection.",
      humanReviewStatus: "Verified"
    },
    evidenceItems: []
  },

  {
    id: "PROJECT P-1088",
    shortId: "P-1088",
    name: "Arterial Road Resurfacing Sector 4B",
    category: "Roadways & Urban Mobility",
    location: "Sector 4B, Gandhipuram, Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "Sector 4",
    pincode: "641012",
    geoTier: "city",
    coordinates: { lat: 11.0175, lng: 76.9570, x: 55, y: 46 },
    contractor: "Vanguard Infrastructure Ltd",
    contractorNetworkRisk: "Medium",
    contractorCluster: "Cluster-09",
    budget: "₹34.8 Lakhs",
    budgetValue: 34.8,
    expenditure: "₹33.9 Lakhs",
    expenditureValue: 33.9,
    progress: 95,
    plannedProgress: 100,
    expectedProgress: 98,
    healthScore: 84,
    riskScore: 38,
    riskLevel: "Healthy",
    verificationStatus: "Verified",
    plannedCompletion: "Completed Aug 2024",
    startDate: "Jan 2024",
    financialHealth: 88,
    scheduleHealth: 90,
    physicalProgress: 94,
    compliance: 96,
    publicDescription: "Dense bituminous macadam resurfacing and thermoplastic lane marking along 1.2km Sector 4B corridor.",
    publicStatus: "Completed & Under Maintenance Period",
    publicCitizenBenefits: "Smooth vehicular movement with improved skid resistance.",
    publicAuthority: "Highways & Minor Ports Dept, TN",
    primaryRiskFactors: [
      {
        title: "ADJACENT TENDER LINKAGE",
        category: "Location Evidence",
        severity: "Medium",
        summary: "Project completed within 78 meters of new tender P-1024.",
        metric: "78m Proximity",
        flaggedAmount: "Adjacent Scope"
      }
    ],
    geoTemporal: {
      projectA: { id: "P-1088", name: "Road Resurfacing 4B", sanctionDate: "Jan 2024", cost: "₹34.8L", scope: "Bituminous Overlay" },
      projectB: { id: "P-1024", name: "Concrete Road Sector 4", sanctionDate: "Jan 2025", cost: "₹48.5L", scope: "Rigid Pavement" },
      distance: "78 m",
      timeDifference: "7 months",
      descriptionSimilarity: 78,
      duplicateWorkRisk: "High",
      statusMessage: "Previous Baseline Tender Completed"
    },
    fairCost: {
      reportedCost: 34.8,
      adjustedExpectedCost: 33.5,
      anomalyVariance: "+3.8%",
      adjustments: [
        { factor: "Terrain Adjustment", value: "+1.2%", costImpact: "+₹0.4 Lakhs", reason: "Standard urban grade" },
        { factor: "Inflation Index", value: "+2.6%", costImpact: "+₹0.9 Lakhs", reason: "Bitumen rate parity" }
      ],
      anomalyIndicator: "Nominal Cost Trajectory",
      verdictNote: "Cost aligned with historical regional rates."
    },
    projectPulse: {
      plannedProgress: 100,
      currentProgress: 95,
      expectedProgress: 98,
      scheduleDeviation: "-2%",
      delayProbability: 12,
      estimatedDelay: "0 Days",
      budgetUtilization: 97.4,
      milestones: []
    },
    explainAudit: {
      certificateId: "AUDIT-CERT-2024-P1088-C4",
      riskScore: 38,
      riskLevel: "Healthy",
      confidenceScore: "96.5%",
      featureContributions: [
        { name: "Financial Risk", value: 12, positive: false, note: "Budget variance within 4% normal limit" },
        { name: "Progress Alignment", value: 8, positive: false, note: "On-site audit confirmed completion" }
      ],
      evidenceSummary: "Project completed satisfactorily with minor punch-list clearance remaining.",
      recommendedAction: "Close routine warranty milestone.",
      humanReviewStatus: "Verified & Archived"
    },
    evidenceItems: []
  },

  {
    id: "PROJECT P-2041",
    shortId: "P-2041",
    name: "Multi-Tier Elevated Corridor Flyover",
    category: "Bridges & Flyovers",
    location: "Avinashi Road Junction, Peelamedu, Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "Avinashi Road",
    pincode: "641004",
    geoTier: "city",
    coordinates: { lat: 11.0280, lng: 76.9950, x: 68, y: 72 },
    contractor: "National Highways & Infra Concessionaires",
    contractorNetworkRisk: "Critical",
    contractorCluster: "Cluster-02 (Joint Venture Consortium)",
    budget: "₹380.0 Lakhs",
    budgetValue: 380.0,
    expenditure: "₹342.5 Lakhs",
    expenditureValue: 342.5,
    progress: 42,
    plannedProgress: 75,
    expectedProgress: 45,
    healthScore: 48,
    riskScore: 89,
    riskLevel: "High Risk",
    verificationStatus: "Investigation Required",
    plannedCompletion: "Mar 2027 (Original: Dec 2025)",
    startDate: "Jun 2023",
    financialHealth: 42,
    scheduleHealth: 35,
    physicalProgress: 40,
    compliance: 75,
    publicDescription: "Construction of 4-lane elevated corridor across Avinashi Road intersection to bypass 4 major traffic choke points.",
    publicStatus: "Under Construction (Pier Casting & Girders)",
    publicCitizenBenefits: "Reduces airport corridor transit time by 25 minutes during peak rush hours.",
    publicAuthority: "National Highways Authority of India (NHAI)",
    primaryRiskFactors: [
      {
        title: "SEVERE SCHEDULE DIVERGENCE",
        category: "Progress Evidence",
        severity: "Critical",
        summary: "Project lag of 33% between planned timeline (75%) and on-site physical pier erection (42%).",
        metric: "-33% Lag",
        flaggedAmount: "18 Months Delay"
      },
      {
        title: "EXPENDITURE VELOCITY ANOMALY",
        category: "Financial Evidence",
        severity: "Critical",
        summary: "90.1% budget drawn down with only 42% physical infrastructure certified by engineering audit.",
        metric: "₹342.5L Drawn",
        flaggedAmount: "₹120L Advance Discrepancy"
      },
      {
        title: "UNAUTHORIZED SUB-CONTRACTING",
        category: "Network Evidence",
        severity: "High",
        summary: "Primary bidder transferred 70% structural piling to unvetted shell entity.",
        metric: "Clause 14 Violation",
        flaggedAmount: "Tier-2 Entity"
      }
    ],
    geoTemporal: {
      projectA: { id: "P-2041", name: "Elevated Corridor Flyover", sanctionDate: "Jun 2023", cost: "₹380.0L", scope: "2.8km 6-Lane Flyover" },
      projectB: { id: "P-0914", name: "Underpass & Grade Separator ORR", sanctionDate: "Nov 2022", cost: "₹190.0L", scope: "Grade Separator" },
      distance: "210 m",
      timeDifference: "8 months",
      descriptionSimilarity: 64,
      duplicateWorkRisk: "Medium",
      statusMessage: "Multi-tier Junction Intersection Risk"
    },
    fairCost: {
      reportedCost: 380.0,
      adjustedExpectedCost: 295.0,
      anomalyVariance: "+28.8%",
      adjustments: [
        { factor: "Soil Stratum Adjustment", value: "+8.5%", costImpact: "+₹25.0 Lakhs", reason: "Deep piling through fractured shale" },
        { factor: "Traffic Management Surcharge", value: "+3.2%", costImpact: "+₹9.4 Lakhs", reason: "Night-shift construction in high-density corridor" }
      ],
      anomalyIndicator: "Critical Expenditure Discrepancy Flagged",
      verdictNote: "Financial disbursement rate severely uncoupled from structural milestone delivery."
    },
    projectPulse: {
      plannedProgress: 75,
      currentProgress: 42,
      expectedProgress: 45,
      scheduleDeviation: "-33%",
      delayProbability: 92,
      estimatedDelay: "+280 Days",
      budgetUtilization: 90.1,
      milestones: []
    },
    explainAudit: {
      certificateId: "AUDIT-CERT-2026-P2041-CR",
      riskScore: 89,
      riskLevel: "High Risk",
      confidenceScore: "98.1%",
      featureContributions: [
        { name: "Progress-Disbursement Decoupling", value: 44, positive: true, note: "90% funds claimed for 42% physical output" },
        { name: "Critical Path Delay", value: 31, positive: true, note: "Pier cap casting 18 months behind contract schedule" },
        { name: "Vendor Network Risk", value: 14, positive: true, note: "Subcontracting chain non-compliant with MoRTH norms" }
      ],
      evidenceSummary: "High-priority forensic engineering audit mandatory. Immediate hold recommended on Stage 5 milestone release.",
      recommendedAction: "Freeze upcoming disbursement tranche. Issue Show Cause Notice regarding unauthorized piling subcontracting.",
      humanReviewStatus: "Sent to State Vigilance Officer"
    },
    evidenceItems: [
      {
        id: "EV-21",
        title: "Structural LiDAR & Pier Stress Inspection",
        type: "Photogrammetry",
        date: "2026-09-24",
        status: "Defect Identified",
        description: "Pier 18 alignment deflection exceeds 12mm tolerance limit.",
        badge: "Structural Alert"
      },
      {
        id: "EV-22",
        title: "Bank Guarantee Escrow Audit",
        type: "Financial Record",
        date: "2026-09-15",
        status: "Non-Compliance",
        description: "Mobilization advance not amortized according to contractual milestone schedule.",
        badge: "Fiscal Breach"
      }
    ]
  },

  {
    id: "PROJECT P-3092",
    shortId: "P-3092",
    name: "Urban Stormwater Drainage & Canal Rehabilitation",
    category: "Water & Sanitation",
    location: "Singanallur Lake Canal Zone, Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "Singanallur",
    pincode: "641005",
    geoTier: "city",
    coordinates: { lat: 10.9980, lng: 77.0200, x: 34, y: 38 },
    contractor: "HydroTech Civil Engineering",
    contractorNetworkRisk: "Low",
    contractorCluster: "Cluster-01 (Direct Municipal Roster)",
    budget: "₹82.0 Lakhs",
    budgetValue: 82.0,
    expenditure: "₹68.4 Lakhs",
    expenditureValue: 68.4,
    progress: 81,
    plannedProgress: 85,
    expectedProgress: 83,
    healthScore: 88,
    riskScore: 24,
    riskLevel: "Healthy",
    verificationStatus: "Verified",
    plannedCompletion: "Dec 2026",
    startDate: "Sep 2024",
    financialHealth: 92,
    scheduleHealth: 86,
    physicalProgress: 84,
    compliance: 94,
    publicDescription: "3.2km reinforced cement concrete channel reconstruction to eliminate urban waterlogging in Singanallur basin.",
    publicStatus: "Active Construction (Near Completion)",
    publicCitizenBenefits: "Protects over 14,000 households from monsoon flooding and restores natural recharge.",
    publicAuthority: "Water Resources Department (WRD), TN",
    primaryRiskFactors: [
      {
        title: "MINOR MONSOON SILTATION DELAY",
        category: "Progress Evidence",
        severity: "Low",
        summary: "Seasonal rainfall paused concrete canal lining for 11 days. Absorbed into buffer.",
        metric: "-4% Variance",
        flaggedAmount: "On Track"
      }
    ],
    geoTemporal: {
      projectA: { id: "P-3092", name: "Stormwater Drainage Zone 3", sanctionDate: "Sep 2024", cost: "₹82.0L", scope: "3.2km Reinforced Canal" },
      projectB: { id: "P-0412", name: "Retention Pond Dredging", sanctionDate: "Feb 2021", cost: "₹24.0L", scope: "Dredging" },
      distance: "840 m",
      timeDifference: "3.5 years",
      descriptionSimilarity: 22,
      duplicateWorkRisk: "Low",
      statusMessage: "Independent Urban Catchment Infrastructure"
    },
    fairCost: {
      reportedCost: 82.0,
      adjustedExpectedCost: 80.5,
      anomalyVariance: "+1.8%",
      adjustments: [
        { factor: "Hydrological Index", value: "+3.0%", costImpact: "+₹2.4 Lakhs", reason: "High-grade waterproofing additives" }
      ],
      anomalyIndicator: "Optimal Cost Parity",
      verdictNote: "Expenditure strictly matches geo-tagged inspection milestones."
    },
    projectPulse: {
      plannedProgress: 85,
      currentProgress: 81,
      expectedProgress: 83,
      scheduleDeviation: "-4%",
      delayProbability: 15,
      estimatedDelay: "+6 Days",
      budgetUtilization: 83.4,
      milestones: []
    },
    explainAudit: {
      certificateId: "AUDIT-CERT-2026-P3092-H1",
      riskScore: 24,
      riskLevel: "Healthy",
      confidenceScore: "97.4%",
      featureContributions: [
        { name: "Cost Compliance", value: 6, positive: false, note: "Within 2% of FairCost AI benchmark" },
        { name: "Milestone Integrity", value: 8, positive: false, note: "Physical progress verified by satellite SAR" }
      ],
      evidenceSummary: "Exemplary progress with high data fidelity across digital muster rolls and material supply chains.",
      recommendedAction: "Approve regular Stage 4 reimbursement.",
      humanReviewStatus: "Verified"
    },
    evidenceItems: []
  },

  {
    id: "PROJECT P-4105",
    shortId: "P-4105",
    name: "Primary Healthcare Community Complex",
    category: "Public Buildings & Health",
    location: "Pollachi Town Center, Coimbatore District",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Pollachi",
    localArea: "Town Center",
    pincode: "642001",
    geoTier: "district",
    coordinates: { lat: 10.6580, lng: 77.0080, x: 48, y: 78 },
    contractor: "Shree Ganesh Building Concessions",
    contractorNetworkRisk: "High",
    contractorCluster: "Cluster-07 (Unusual Price Bidding Velocity)",
    budget: "₹125.0 Lakhs",
    budgetValue: 125.0,
    expenditure: "₹118.0 Lakhs",
    expenditureValue: 118.0,
    progress: 58,
    plannedProgress: 90,
    expectedProgress: 60,
    healthScore: 56,
    riskScore: 78,
    riskLevel: "Attention Required",
    verificationStatus: "Needs Verification",
    plannedCompletion: "Feb 2027 (Original: Oct 2025)",
    startDate: "Oct 2023",
    financialHealth: 52,
    scheduleHealth: 48,
    physicalProgress: 56,
    compliance: 70,
    publicDescription: "Upgradation to 50-bed Primary Health Center with dedicated maternal-child ward, diagnostic laboratory, and 24/7 emergency stabilization.",
    publicStatus: "Finishing & Electrical Phase",
    publicCitizenBenefits: "Affordable tertiary healthcare access for 45 rural panchayats around Pollachi.",
    publicAuthority: "Health & Family Welfare Dept, TN",
    primaryRiskFactors: [
      {
        title: "EXCESSIVE MATERIAL PRICE BILLING",
        category: "Financial Evidence",
        severity: "High",
        summary: "HVAC and medical gas piping invoiced at 45% above regional government schedule of rates (DSR).",
        metric: "+32.4% Overrun",
        flaggedAmount: "₹24.5 Lakhs"
      },
      {
        title: "UNEXPLAINED WORK STOPPAGE",
        category: "Progress Evidence",
        severity: "High",
        summary: "Zero activity detected via IoT electricity and optical sensor loggers over past 47 days.",
        metric: "47 Days Inactive",
        flaggedAmount: "Standstill"
      }
    ],
    geoTemporal: {
      projectA: { id: "P-4105", name: "Primary Healthcare Complex", sanctionDate: "Oct 2023", cost: "₹125.0L", scope: "3-Storey Clinic" },
      projectB: { id: "P-2210", name: "Maternity Sub-Center Ward 18", sanctionDate: "Jan 2023", cost: "₹62.0L", scope: "Clinic Renovation" },
      distance: "140 m",
      timeDifference: "9 months",
      descriptionSimilarity: 68,
      duplicateWorkRisk: "High",
      statusMessage: "Functional Redundancy & Facility Overlap Detected"
    },
    fairCost: {
      reportedCost: 125.0,
      adjustedExpectedCost: 98.4,
      anomalyVariance: "+27.0%",
      adjustments: [
        { factor: "Medical Infrastructure Spec", value: "+12.0%", costImpact: "+₹11.8 Lakhs", reason: "Specialized cleanroom HVAC" }
      ],
      anomalyIndicator: "High Equipment Cost Anomaly Flagged",
      verdictNote: "Bill of quantities includes double-billed items previously sanctioned under P-2210."
    },
    projectPulse: {
      plannedProgress: 90,
      currentProgress: 58,
      expectedProgress: 60,
      scheduleDeviation: "-32%",
      delayProbability: 84,
      estimatedDelay: "+160 Days",
      budgetUtilization: 94.4,
      milestones: []
    },
    explainAudit: {
      certificateId: "AUDIT-CERT-2026-P4105-B7",
      riskScore: 78,
      riskLevel: "Attention Required",
      confidenceScore: "95.8%",
      featureContributions: [
        { name: "Equipment Unit Rate Anomaly", value: 36, positive: true, note: "Medical gas pipeline billing 45% over standard DSR rate" },
        { name: "Site Inactivity Duration", value: 26, positive: true, note: "Sensor confirmed site abandonment for 47 consecutive days" },
        { name: "Tender Redundancy", value: 16, positive: true, note: "Shared scope with adjacent maternity clinic project" }
      ],
      evidenceSummary: "High probability of equipment inflation and duplicate facility provisioning in Southern District.",
      recommendedAction: "Perform forensic itemized review of HVAC invoices and verify contractor site attendance ledger.",
      humanReviewStatus: "Audit Verification Ticket Raised"
    },
    evidenceItems: []
  },

  {
    id: "PROJECT P-5012",
    shortId: "P-5012",
    name: "Automated Wastewater Treatment Plant Phase 2",
    category: "Environmental & Utilities",
    location: "Kurichi Industrial Area, Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "Kurichi",
    pincode: "641021",
    geoTier: "city",
    coordinates: { lat: 10.9500, lng: 76.9700, x: 82, y: 28 },
    contractor: "EnviroClean Infrastructure Solutions",
    contractorNetworkRisk: "Low",
    contractorCluster: "Cluster-04",
    budget: "₹520.0 Lakhs",
    budgetValue: 520.0,
    expenditure: "₹468.0 Lakhs",
    expenditureValue: 468.0,
    progress: 91,
    plannedProgress: 92,
    expectedProgress: 90,
    healthScore: 94,
    riskScore: 18,
    riskLevel: "Healthy",
    verificationStatus: "Verified",
    plannedCompletion: "Jan 2027",
    startDate: "Jan 2024",
    financialHealth: 96,
    scheduleHealth: 94,
    physicalProgress: 92,
    compliance: 98,
    publicDescription: "50 MLD advanced sewage treatment plant with SCADA-based automated bioreactors and secondary effluent recycling.",
    publicStatus: "Trial Commissioning Phase",
    publicCitizenBenefits: "Eliminates untreated discharge into Noyyal river basin and provides treated water for industrial estate.",
    publicAuthority: "Tamil Nadu Water Supply & Drainage (TWAD) Board",
    primaryRiskFactors: [],
    geoTemporal: {
      projectA: { id: "P-5012", name: "Wastewater Treatment Phase 2", sanctionDate: "Jan 2024", cost: "₹520.0L", scope: "50 MLD Plant" },
      projectB: { id: "P-0118", name: "Primary Clarifier Overhaul", sanctionDate: "May 2019", cost: "₹110.0L", scope: "Phase 1 Clarifiers" },
      distance: "1200 m",
      timeDifference: "4.8 years",
      descriptionSimilarity: 14,
      duplicateWorkRisk: "Low",
      statusMessage: "Independent Phase 2 Expansion Project"
    },
    fairCost: {
      reportedCost: 520.0,
      adjustedExpectedCost: 512.0,
      anomalyVariance: "+1.5%",
      adjustments: [
        { factor: "Membrane Tech Import Index", value: "+5.4%", costImpact: "+₹27.0 Lakhs", reason: "Foreign currency adjustment" }
      ],
      anomalyIndicator: "High Efficiency Cost Baseline",
      verdictNote: "Procurement records match international tender price indices."
    },
    projectPulse: {
      plannedProgress: 92,
      currentProgress: 91,
      expectedProgress: 90,
      scheduleDeviation: "-1%",
      delayProbability: 8,
      estimatedDelay: "0 Days",
      budgetUtilization: 90.0,
      milestones: []
    },
    explainAudit: {
      certificateId: "AUDIT-CERT-2026-P5012-G9",
      riskScore: 18,
      riskLevel: "Healthy",
      confidenceScore: "99.0%",
      featureContributions: [
        { name: "Fiscal Discipline", value: 4, positive: false, note: "Disbursements strictly bound to SCADA commissioning" },
        { name: "Environmental Compliance", value: 2, positive: false, note: "All CPCB discharge standards satisfied" }
      ],
      evidenceSummary: "Project operating with high institutional standards, full IoT sensor transparency, and clean contractor records.",
      recommendedAction: "Routine quarterly audit clearance.",
      humanReviewStatus: "Approved by National Mission Directorate"
    },
    evidenceItems: []
  },

  {
    id: "PROJECT P-6020",
    shortId: "P-6020",
    name: "Inter-State Freight Expressway Link (TN-KL Corridor)",
    category: "Highways & Logistics",
    location: "Western Ghats Gateway Corridor, Tamil Nadu State Highway 17",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    localArea: "Walayar Gateway",
    pincode: "641105",
    geoTier: "state",
    contractor: "Southern Corridors Infra Consortium",
    contractorNetworkRisk: "Medium",
    budget: "₹890.0 Lakhs",
    budgetValue: 890.0,
    expenditure: "₹620.0 Lakhs",
    expenditureValue: 620.0,
    progress: 70,
    plannedProgress: 72,
    healthScore: 82,
    riskScore: 32,
    riskLevel: "Healthy",
    verificationStatus: "Verified",
    plannedCompletion: "Aug 2027",
    publicDescription: "6-lane high-speed logistics corridor connecting industrial clusters in Western Tamil Nadu to port gateways.",
    publicStatus: "Earthworks & Paving",
    publicCitizenBenefits: "Reduces heavy commercial vehicle transit congestion by 40%.",
    publicAuthority: "State Highways Directorate, Tamil Nadu"
  }
];

export const SYSTEM_METRICS = {
  totalProjects: 142,
  totalExpenditure: "₹842.6 Cr",
  healthyProjects: 98,
  attentionRequired: 26,
  highRisk: 14,
  priorityInvestigations: 4,
  systemConfidence: "98.4%",
  activeSensors: 1840,
  satellitePassesToday: 12,
  flaggedAnomalyValue: "₹38.4 Cr"
};

export const INVESTIGATION_WORKFLOW_STEPS = [
  {
    stepNumber: 1,
    title: "High-Risk Project Identified",
    badge: "AI Anomaly Trigger",
    description: "Multimodal AI engines detect anomalous cost variance, satellite progress lag, or spatial duplicate proximity.",
    status: "Completed"
  },
  {
    stepNumber: 2,
    title: "Evidence Reviewed",
    badge: "Multimodal Dossier",
    description: "System compiles drone photogrammetry, high-res satellite SAR imagery, billing vouchers, and contractor link graph.",
    status: "Completed"
  },
  {
    stepNumber: 3,
    title: "Verification Required",
    badge: "Field Task Assigned",
    description: "Geo-tagged digital inspection order dispatched to designated Government Technical Auditor on site.",
    status: "Active"
  },
  {
    stepNumber: 4,
    title: "Investigation Status",
    badge: "Auditor Adjudication",
    description: "Independent core drill tests, invoice line audits, and cadastral boundary verification logged to ledger.",
    status: "In Review"
  },
  {
    stepNumber: 5,
    title: "Resolution Verdict",
    badge: "Governance Action",
    description: "Formal classification as Verified, Investigation Required, or False Positive with permanent audit trail.",
    status: "Pending Action"
  }
];
