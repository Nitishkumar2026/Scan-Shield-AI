import { useState, useEffect } from 'react';
import {
  Shield,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Phone,
  MessageSquare,
  CreditCard,
  Network,
  Map,
  BarChart3,
  Users,
  FileText,
  Settings,
  User,
  LogOut,
  Bell,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { Page } from '../App';

interface NavigationProps {
  isScrolled: boolean;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { label: string; page: Page; icon: React.ElementType }[] = [
  { label: 'Home', page: 'home', icon: Home },
  { label: 'Dashboard', page: 'dashboard', icon: LayoutDashboard },
  { label: 'Call Analysis', page: 'call-analysis', icon: Phone },
  { label: 'SMS Scanner', page: 'sms-scanner', icon: MessageSquare },
  { label: 'UPI Analyzer', page: 'upi-analyzer', icon: CreditCard },
  { label: 'Fraud Network', page: 'fraud-network', icon: Network },
  { label: 'Threat Map', page: 'threat-heatmap', icon: Map },
  { label: 'Analytics', page: 'analytics', icon: BarChart3 },
  { label: 'Family Guardian', page: 'family-guardian', icon: Users },
  { label: 'Community', page: 'community-reports', icon: FileText },
];

export default function Navigation({ isScrolled, currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const isLandingPage = currentPage === 'home';

  const handleNavigate = (page: Page, sectionId?: string) => {
    if (page === 'home' && sectionId) {
      if (currentPage === 'home') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onNavigate('home');
        // Wait for render then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLandingPage) {
    return (
      <>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'py-2'
            : 'py-4'
            }`}
        >
          <div className={`mx-auto transition-all duration-500 ${isScrolled
            ? 'max-w-4xl px-6'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8'
            }`}>
            <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled
              ? 'bg-cyber-dark/90 backdrop-blur-xl border border-cyber-blue/30 rounded-full px-6 py-2 shadow-glow'
              : ''
              }`}>
              {/* Logo */}
              <button
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-2 group"
              >
                <div className="relative">
                  <Shield className="w-8 h-8 text-cyber-blue transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-cyber-blue/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-exo font-bold text-lg hidden sm:block">
                  <span className="text-white">AI Scam</span>
                  <span className="text-cyber-blue">Shield</span>
                  <span className="text-cyber-cyan text-xs align-top">X</span>
                </span>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {['Home', 'Features', 'Pricing', 'FAQ', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavigate('home', item.toLowerCase())}
                    className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute inset-0 bg-cyber-blue/10 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyber-blue group-hover:w-1/2 transition-all" />
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <Button
                  onClick={() => handleNavigate('dashboard')}
                  className="cyber-button text-sm"
                >
                  Get Started
                </Button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-white/70 hover:text-white"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
          <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
          <div className={`absolute top-20 left-4 right-4 bg-cyber-dark border border-cyber-blue/30 rounded-2xl p-6 transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
            <div className="flex flex-col gap-2">
              {['Home', 'Features', 'Pricing', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigate('home', item.toLowerCase())}
                  className="px-4 py-3 text-left text-white/70 hover:text-white hover:bg-cyber-blue/10 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
              <hr className="border-white/10 my-2" />
              <Button
                onClick={() => handleNavigate('dashboard')}
                className="cyber-button w-full"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Dashboard/App Navigation
  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/90 backdrop-blur-xl border-b border-cyber-blue/20">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2"
            >
              <Shield className="w-6 h-6 text-cyber-blue" />
              <span className="font-exo font-bold hidden sm:block">
                <span className="text-white">AI Scam</span>
                <span className="text-cyber-blue">Shield</span>
              </span>
            </button>
          </div>

          {/* Center: Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-white/50">Platform</span>
            <span className="text-white/30">/</span>
            <span className="text-white">{navItems.find(item => item.page === currentPage)?.label || 'Dashboard'}</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-cyber-red text-[10px]">
                      {notifications}
                    </Badge>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-cyber-dark border-cyber-blue/30">
                <div className="p-3 border-b border-white/10">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[
                    { title: 'High Risk Call Detected', time: '2 min ago', type: 'alert' },
                    { title: 'Family Member Protected', time: '15 min ago', type: 'success' },
                    { title: 'New Threat Pattern Found', time: '1 hour ago', type: 'info' },
                  ].map((notif, i) => (
                    <DropdownMenuItem key={i} className="p-3 hover:bg-white/5 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${notif.type === 'alert' ? 'bg-cyber-red' :
                          notif.type === 'success' ? 'bg-cyber-green' : 'bg-cyber-blue'
                          }`} />
                        <div>
                          <p className="text-sm text-white">{notif.title}</p>
                          <p className="text-xs text-white/50">{notif.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-lg transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-cyan flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/50 hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-cyber-dark border-cyber-blue/30">
                <div className="p-3 border-b border-white/10">
                  <p className="font-semibold text-sm">John Doe</p>
                  <p className="text-xs text-white/50">john@example.com</p>
                </div>
                <DropdownMenuItem className="gap-2">
                  <User className="w-4 h-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="w-4 h-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="gap-2 text-cyber-red"
                  onClick={() => handleNavigate('home')}
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 z-40 bg-cyber-dark/95 backdrop-blur-xl border-r border-cyber-blue/20 transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64`}>
        <div className="p-4 space-y-1 overflow-y-auto h-full scrollbar-thin">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
              Main
            </p>
            {navItems.slice(0, 2).map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === item.page
                  ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
                {currentPage === item.page && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Analysis Tools */}
          <div className="space-y-1 mt-4">
            <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
              Analysis Tools
            </p>
            {navItems.slice(2, 5).map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === item.page
                  ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Intelligence */}
          <div className="space-y-1 mt-4">
            <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
              Intelligence
            </p>
            {navItems.slice(5, 8).map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === item.page
                  ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Community */}
          <div className="space-y-1 mt-4">
            <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
              Community
            </p>
            {navItems.slice(8).map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === item.page
                  ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Admin Section */}
          <div className="space-y-1 mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => handleNavigate('admin-portal')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === 'admin-portal'
                ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30'
                : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm">Admin Portal</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
