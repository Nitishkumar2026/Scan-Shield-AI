import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    question: 'How does AI Scam Shield X detect scams in real-time?',
    answer: 'Our platform uses advanced machine learning models trained on millions of scam patterns. When you receive a call, SMS, or UPI request, our AI analyzes it in milliseconds using natural language processing, voice analysis, and behavioral pattern matching. The system cross-references against our national threat database and provides instant risk scores with explainable reasoning.',
  },
  {
    question: 'What types of threats can the platform detect?',
    answer: 'We detect a wide range of threats including phone scams, phishing SMS, UPI fraud attempts, voice cloning/deepfakes, identity theft attempts, banking fraud, investment scams, lottery/sweepstakes scams, tech support scams, and romance scams. Our threat intelligence is continuously updated with new patterns.',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Absolutely. We use end-to-end encryption for all communications. Your data is stored in secure, ISO 27001 certified data centers. We follow GDPR compliance guidelines and never share your personal information with third parties. You can also enable Zero-Data mode for maximum privacy where analysis happens locally on your device.',
  },
  {
    question: 'How does the Family Guardian mode work?',
    answer: 'Family Guardian allows you to monitor and protect up to 6 family members from a single dashboard. You\'ll receive alerts when family members encounter potential threats, can view their risk scores, and set up emergency contacts. Each family member gets their own protected account with age-appropriate settings.',
  },
  {
    question: 'Can I use this for my business or organization?',
    answer: 'Yes! We offer enterprise plans with additional features like admin dashboards, bulk user management, custom threat intelligence feeds, API access, SSO integration, and dedicated support. Contact our sales team for a customized solution tailored to your organization\'s needs.',
  },
  {
    question: 'What happens when a threat is detected?',
    answer: 'When a threat is detected, you\'ll receive an instant alert with the risk score and explanation. High-risk interactions are automatically blocked. You can view detailed reports in your dashboard, report false positives, and contribute to community protection by reporting new scam patterns. Emergency alerts can be sent to designated contacts.',
  },
];

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyber-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge className="bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="font-exo font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to know about AI Scam Shield X
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div 
                  className={`
                    cyber-card overflow-hidden transition-all duration-300
                    ${isOpen ? 'border-cyber-blue/50 bg-cyber-blue/5' : ''}
                  `}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-white pr-4">{faq.question}</span>
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                      transition-all duration-300
                      ${isOpen ? 'bg-cyber-blue/20 rotate-180' : 'bg-white/5'}
                    `}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-cyber-blue' : 'text-white/50'}`} />
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? 'max-h-96' : 'max-h-0'}
                  `}>
                    <div className="px-5 pb-5">
                      <div className="h-px bg-white/10 mb-4" />
                      <p className="text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/60 mb-4">
            Still have questions?
          </p>
          <button className="text-cyber-blue hover:text-cyber-cyan transition-colors">
            Contact our support team
          </button>
        </div>
      </div>
    </section>
  );
}
