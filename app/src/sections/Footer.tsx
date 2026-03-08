import { Shield, Twitter, Linkedin, Github, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}



const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-cyber-dark" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-4"
            >
              <Shield className="w-8 h-8 text-cyber-blue" />
              <span className="font-exo font-bold text-lg">
                <span className="text-white">AI Scam</span>
                <span className="text-cyber-blue">Shield</span>
                <span className="text-cyber-cyan text-xs align-top">X</span>
              </span>
            </button>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              National-level cyber intelligence platform protecting millions
              from scams, phishing, and fraud.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="w-4 h-4" />
                contact@aiscamshield.in
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="w-4 h-4" />
                1800-SHIELD-1
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4" />
                New Delhi, India
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {[
                { label: 'Features', id: 'features' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'FAQ', id: 'faq' },
                { label: 'API', id: 'home' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.id === 'home') onNavigate('home');
                      else {
                        const element = document.getElementById(link.id);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                        else onNavigate('home');
                      }
                    }}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Press'].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Help Center', 'Community', 'Status'].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-panel rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-white mb-1">Stay updated</h4>
              <p className="text-sm text-white/50">Get the latest security alerts and updates</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="cyber-input flex-1 md:w-64"
              />
              <button className="cyber-button whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-sm text-white/40">
            © 2025 AI Scam Shield X. All rights reserved. A National Cyber Security Initiative.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-cyber-blue/20 transition-all group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
                {/* Shockwave effect on hover */}
                <span className="absolute w-10 h-10 rounded-lg bg-cyber-blue/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/30">
          <span>ISO 27001 Certified</span>
          <span>•</span>
          <span>RBI Compliant</span>
          <span>•</span>
          <span>GDPR Ready</span>
          <span>•</span>
          <span>MeitY Approved</span>
        </div>
      </div>
    </footer>
  );
}
