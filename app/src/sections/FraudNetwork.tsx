import { useRef, useState } from 'react';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw,
  Info,
  AlertTriangle,
  Users,
  Phone,
  CreditCard,
  MapPin,
  Share2,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Node {
  id: string;
  type: 'phone' | 'upi' | 'user' | 'city' | 'cluster';
  label: string;
  riskScore: number;
  x: number;
  y: number;
  connections: number;
}

interface Edge {
  source: string;
  target: string;
  type: 'connected' | 'reported' | 'linked' | 'belongs';
}

// Mock network data
const mockNodes: Node[] = [
  { id: '1', type: 'cluster', label: 'Scam Cluster A', riskScore: 95, x: 400, y: 300, connections: 8 },
  { id: '2', type: 'phone', label: '+91-99999-00001', riskScore: 90, x: 300, y: 200, connections: 3 },
  { id: '3', type: 'phone', label: '+91-99999-00002', riskScore: 85, x: 500, y: 200, connections: 2 },
  { id: '4', type: 'upi', label: 'scam1@paytm', riskScore: 95, x: 250, y: 350, connections: 2 },
  { id: '5', type: 'upi', label: 'scam2@upi', riskScore: 88, x: 550, y: 350, connections: 3 },
  { id: '6', type: 'user', label: 'Victim 1', riskScore: 20, x: 200, y: 250, connections: 1 },
  { id: '7', type: 'user', label: 'Victim 2', riskScore: 25, x: 600, y: 250, connections: 1 },
  { id: '8', type: 'city', label: 'Mumbai', riskScore: 60, x: 400, y: 400, connections: 5 },
  { id: '9', type: 'phone', label: '+91-99999-00003', riskScore: 75, x: 350, y: 150, connections: 2 },
  { id: '10', type: 'upi', label: 'fraud@ybl', riskScore: 92, x: 450, y: 450, connections: 2 },
];

const mockEdges: Edge[] = [
  { source: '1', target: '2', type: 'belongs' },
  { source: '1', target: '3', type: 'belongs' },
  { source: '1', target: '4', type: 'linked' },
  { source: '1', target: '5', type: 'linked' },
  { source: '2', target: '6', type: 'connected' },
  { source: '3', target: '7', type: 'connected' },
  { source: '4', target: '6', type: 'reported' },
  { source: '5', target: '7', type: 'reported' },
  { source: '8', target: '1', type: 'linked' },
  { source: '9', target: '1', type: 'belongs' },
  { source: '10', target: '8', type: 'linked' },
  { source: '2', target: '9', type: 'connected' },
];

const nodeColors = {
  phone: '#2467ec',
  upi: '#00d4ff',
  user: '#16cc79',
  city: '#f7d785',
  cluster: '#ea384c',
};

const nodeIcons = {
  phone: Phone,
  upi: CreditCard,
  user: Users,
  city: MapPin,
  cluster: AlertTriangle,
};

export default function FraudNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState<string>('all');
  const [isSimulating, setIsSimulating] = useState(false);

  const filteredNodes = filter === 'all' 
    ? mockNodes 
    : mockNodes.filter(n => n.type === filter);

  const filteredEdges = mockEdges.filter(e => 
    filteredNodes.some(n => n.id === e.source) && 
    filteredNodes.some(n => n.id === e.target)
  );

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  const simulatePropagation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <div className="min-h-screen pt-14 lg:pl-64">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-exo font-bold text-2xl lg:text-3xl text-white mb-1">
              Fraud Network Graph
            </h1>
            <p className="text-white/50">
              Visualize connections between scam entities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30">
              <Network className="w-3 h-3 mr-1" />
              Graph Intelligence
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Graph Canvas */}
          <div className="lg:col-span-3 cyber-card p-4 relative overflow-hidden">
            {/* Toolbar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="cyber-input py-2 px-3 text-sm"
                >
                  <option value="all">All Nodes</option>
                  <option value="phone">Phone Numbers</option>
                  <option value="upi">UPI IDs</option>
                  <option value="user">Users</option>
                  <option value="city">Cities</option>
                  <option value="cluster">Clusters</option>
                </select>
                <Button 
                  onClick={simulatePropagation}
                  disabled={isSimulating}
                  className="cyber-button text-sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isSimulating ? 'animate-spin' : ''}`} />
                  {isSimulating ? 'Simulating...' : 'Simulate'}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleZoomOut} className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm text-white/50">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 bg-white/5 rounded-lg hover:bg-white/10">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* SVG Graph */}
            <svg 
              ref={svgRef}
              viewBox="0 0 800 600"
              className="w-full h-[500px] cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            >
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(36, 103, 236, 0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Edges */}
              {filteredEdges.map((edge, i) => {
                const source = mockNodes.find(n => n.id === edge.source);
                const target = mockNodes.find(n => n.id === edge.target);
                if (!source || !target) return null;

                return (
                  <g key={i}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isSimulating ? '#00d4ff' : 'rgba(36, 103, 236, 0.3)'}
                      strokeWidth={isSimulating ? 3 : 2}
                      className={isSimulating ? 'animate-pulse' : ''}
                    />
                    {/* Animated particle on edge */}
                    {isSimulating && (
                      <circle r="4" fill="#00d4ff">
                        <animateMotion
                          dur="1s"
                          repeatCount="indefinite"
                          path={`M${source.x},${source.y} L${target.x},${target.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map((node) => {
                const Icon = nodeIcons[node.type];
                const radius = node.type === 'cluster' ? 30 : node.type === 'city' ? 25 : 20;

                return (
                  <g 
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(node)}
                  >
                    {/* Node Glow */}
                    <circle
                      r={radius + 5}
                      fill={nodeColors[node.type]}
                      opacity={0.2}
                      className="animate-pulse"
                    />
                    {/* Node Circle */}
                    <circle
                      r={radius}
                      fill={`${nodeColors[node.type]}20`}
                      stroke={nodeColors[node.type]}
                      strokeWidth={selectedNode?.id === node.id ? 3 : 2}
                    />
                    {/* Icon */}
                    <foreignObject x={-8} y={-8} width={16} height={16}>
                      <div className="flex items-center justify-center h-full">
                        <Icon className="w-4 h-4" style={{ color: nodeColors[node.type] }} />
                      </div>
                    </foreignObject>
                    {/* Label */}
                    <text
                      y={radius + 15}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Exo"
                    >
                      {node.label.length > 15 ? node.label.slice(0, 15) + '...' : node.label}
                    </text>
                    {/* Risk Indicator */}
                    {node.riskScore > 70 && (
                      <circle
                        r={radius + 8}
                        fill="none"
                        stroke="#ea384c"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        className="animate-spin"
                        style={{ animationDuration: '10s' }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 glass-panel p-3 rounded-lg">
              <p className="text-xs text-white/50 mb-2">Node Types</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(nodeColors).map(([type, color]) => {
                  return (
                    <div key={type} className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-white/70 capitalize">{type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Selected Node Info */}
            {selectedNode ? (
              <div className="cyber-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Node Details</h3>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="text-white/50 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${nodeColors[selectedNode.type]}20` }}
                    >
                      {(() => {
                        const Icon = nodeIcons[selectedNode.type];
                        return <Icon className="w-6 h-6" style={{ color: nodeColors[selectedNode.type] }} />;
                      })()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedNode.label}</p>
                      <p className="text-xs text-white/50 capitalize">{selectedNode.type}</p>
                    </div>
                  </div>

                  <div className="glass-panel p-3 rounded-lg">
                    <p className="text-xs text-white/50 mb-1">Risk Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            selectedNode.riskScore > 70 ? 'bg-cyber-red' :
                            selectedNode.riskScore > 40 ? 'bg-cyber-yellow' :
                            'bg-cyber-green'
                          }`}
                          style={{ width: `${selectedNode.riskScore}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${
                        selectedNode.riskScore > 70 ? 'text-cyber-red' :
                        selectedNode.riskScore > 40 ? 'text-cyber-yellow' :
                        'text-cyber-green'
                      }`}>
                        {selectedNode.riskScore}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-panel p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-white">{selectedNode.connections}</p>
                      <p className="text-xs text-white/50">Connections</p>
                    </div>
                    <div className="glass-panel p-3 rounded-lg text-center">
                      <p className="text-lg font-bold text-cyber-blue">
                        {mockEdges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length}
                      </p>
                      <p className="text-xs text-white/50">Links</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 cyber-button text-sm">
                      <Info className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cyber-card p-5 text-center">
                <Info className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/50">Click on a node to view details</p>
              </div>
            )}

            {/* Network Stats */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-4">Network Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Total Nodes</span>
                  <span className="text-white font-medium">{mockNodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Connections</span>
                  <span className="text-white font-medium">{mockEdges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">High Risk</span>
                  <span className="text-cyber-red font-medium">
                    {mockNodes.filter(n => n.riskScore > 70).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/50">Clusters</span>
                  <span className="text-cyber-purple font-medium">
                    {mockNodes.filter(n => n.type === 'cluster').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="cyber-card p-5">
              <h3 className="font-semibold text-white mb-3">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full cyber-button text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Graph
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
