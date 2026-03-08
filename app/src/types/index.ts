// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'superadmin';
  createdAt: Date;
  lastLogin: Date;
  isVerified: boolean;
  phoneNumber?: string;
}

export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  riskScore: number;
  status: 'safe' | 'warning' | 'danger';
  lastActivity: Date;
}

// Risk & Threat Types
export interface RiskScore {
  score: number;
  category: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  timestamp: Date;
}

export interface RiskFactor {
  name: string;
  weight: number;
  description: string;
}

export interface ThreatAlert {
  id: string;
  type: 'call' | 'sms' | 'upi' | 'email' | 'app';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'false_positive';
  location?: GeoLocation;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
}

// Analysis Types
export interface CallAnalysis {
  id: string;
  phoneNumber: string;
  duration: number;
  transcript: TranscriptSegment[];
  riskScore: number;
  sentiment: 'positive' | 'neutral' | 'negative' | 'suspicious';
  keywords: string[];
  isScam: boolean;
  confidence: number;
  timestamp: Date;
}

export interface TranscriptSegment {
  time: number;
  speaker: 'user' | 'caller';
  text: string;
  riskIndicator?: boolean;
}

export interface SMSAnalysis {
  id: string;
  sender: string;
  message: string;
  riskScore: number;
  isScam: boolean;
  confidence: number;
  detectedPatterns: string[];
  timestamp: Date;
}

export interface UPIAnalysis {
  id: string;
  upiId: string;
  amount: number;
  riskScore: number;
  isFraudulent: boolean;
  confidence: number;
  anomalyFactors: string[];
  timestamp: Date;
}

// Graph & Network Types
export interface GraphNode {
  id: string;
  type: 'phone' | 'upi' | 'user' | 'city' | 'cluster';
  label: string;
  riskScore: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: 'connected' | 'reported' | 'linked' | 'belongs';
  weight: number;
}

export interface FraudNetwork {
  nodes: GraphNode[];
  edges: GraphEdge[];
  clusters: FraudCluster[];
}

export interface FraudCluster {
  id: string;
  name: string;
  nodeCount: number;
  riskScore: number;
  centerNode: string;
}

// Dashboard & Analytics Types
export interface DashboardStats {
  totalScamsBlocked: number;
  activeThreats: number;
  protectionStatus: 'active' | 'warning' | 'inactive';
  riskScore: number;
  weeklyReports: number;
  familyMembersProtected: number;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface ThreatHeatmapData {
  location: GeoLocation;
  intensity: number;
  threatCount: number;
}

// Admin & System Types
export interface SystemHealth {
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  activeUsers: number;
  lastUpdated: Date;
}

export interface AdminLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  details: Record<string, unknown>;
  timestamp: Date;
  ipAddress: string;
}

export interface Report {
  id: string;
  type: 'scam' | 'fraud' | 'phishing';
  description: string;
  reporterId: string;
  status: 'pending' | 'investigating' | 'resolved';
  evidence: string[];
  timestamp: Date;
  location?: GeoLocation;
}

// Pricing Types
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular: boolean;
  limits: {
    familyMembers: number;
    callAnalysis: number;
    smsAnalysis: number;
    upiAnalysis: number;
  };
}

// Notification Types
export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Component Props Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
    backgroundColor?: string;
  }[];
}
