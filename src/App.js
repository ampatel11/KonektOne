import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Zap, 
  Users, 
  BarChart3, 
  Smartphone, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Bot,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Lock,
  Star,
  Check,
  FileSpreadsheet,
  MousePointerClick,
  Headphones,
  CalendarClock,
  UserCheck,
  BadgeCheck,
  Link,
  ArrowUpRight,
  HelpCircle,
  Phone,
  FileText
} from 'lucide-react';

// --- Assets & Styles ---
const customStyles = `
  html {
    scroll-behavior: smooth;
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 6s ease-in-out 3s infinite;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  .mesh-gradient {
    background-color: #ffffff;
    background-image: radial-gradient(at 0% 0%, hsla(149,100%,75%,0.2) 0px, transparent 50%),
    radial-gradient(at 100% 0%, hsla(210,100%,86%,0.2) 0px, transparent 50%),
    radial-gradient(at 100% 100%, hsla(149,100%,85%,0.2) 0px, transparent 50%);
  }
`;

// --- UI Components ---

const Button = ({ children, variant = 'primary', size = 'default', className = '', icon: Icon, onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg active:scale-95";
  
  const sizes = {
    default: "px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base",
    lg: "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg",
    sm: "px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm"
  };

  const variants = {
    primary: "bg-[#00a884] text-white hover:bg-[#008f6f] shadow-lg shadow-green-500/30 hover:shadow-green-500/40 ring-2 ring-transparent hover:ring-[#00a884]/20 ring-offset-2",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/10",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-[#00a884] hover:text-[#00a884] bg-white",
    ghost: "text-gray-600 hover:text-[#00a884] hover:bg-green-50"
  };

  return (
    <button className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4 md:w-5 md:h-5" />}
    </button>
  );
};

const Logo = () => (
  <div className="flex items-center gap-2 select-none cursor-pointer">
    <span className="text-2xl md:text-3xl font-[900] tracking-tighter text-gray-900 leading-none font-sans">
      KonektOne
    </span>
  </div>
);

const Badge = ({ children, color = "green" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
    color === 'green' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
  }`}>
    {children}
  </span>
);

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button 
      className="w-full flex items-center justify-between py-4 md:py-6 text-left focus:outline-none group"
      onClick={onClick}
    >
      <span className={`text-base md:text-lg font-semibold transition-colors pr-4 ${isOpen ? 'text-[#00a884]' : 'text-gray-900 group-hover:text-[#00a884]'}`}>
        {question}
      </span>
      {isOpen ? <ChevronUp className="w-5 h-5 text-[#00a884] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4 md:mb-6' : 'max-h-0 opacity-0'}`}
    >
      <p className="text-sm md:text-base text-gray-600 leading-relaxed pr-8">{answer}</p>
    </div>
  </div>
);

const PricingCard = ({ title, price, duration, subPrice, features, popular = false, buttonText = "Get Started", onBoardingStatus, onClick }) => (
  <div className={`relative p-6 md:p-8 rounded-3xl transition-all duration-300 flex flex-col h-full border ${
    popular 
      ? 'bg-white border-[#00a884] shadow-2xl scale-100 md:scale-105 z-10' 
      : 'bg-white border-gray-200 hover:border-green-200 hover:shadow-xl'
  }`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00a884] text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide shadow-md whitespace-nowrap">
        Best Value
      </div>
    )}
    
    <div className="mb-4 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{duration}</p>
    </div>

    <div className="mb-6 md:mb-8 text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{price}</div>
      {subPrice && <div className="text-[#00a884] font-medium text-sm md:text-base">{subPrice}</div>}
    </div>

    <div className="space-y-3 md:space-y-4 flex-grow mb-8 px-1">
      {features.map((feature, i) => (
        <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
          <Check className="w-5 h-5 flex-shrink-0 text-[#00a884]" />
          <span className="font-medium">{feature}</span>
        </div>
      ))}
      <div className="flex items-center gap-3 text-sm">
        {onBoardingStatus === 'Free' ? (
           <Check className="w-5 h-5 flex-shrink-0 text-[#00a884]" />
        ) : (
           <HelpCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
        )}
        <span className={`font-medium ${onBoardingStatus === 'Free' ? 'text-gray-600' : 'text-red-500'}`}>
          {onBoardingStatus} Onboarding
        </span>
      </div>
    </div>

    <Button 
      variant={popular ? 'primary' : 'outline'} 
      className="w-full"
      size="lg"
      onClick={onClick}
    >
      {buttonText}
    </Button>
  </div>
);

// --- Modal Components ---

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 bg-gray-50 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center pt-4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white ring-1 ring-green-50">
            <Smartphone className="w-7 h-7 md:w-8 md:h-8 text-[#00a884]" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Let's Get Started!</h3>
          <p className="text-sm md:text-base text-gray-500 mb-8 max-w-xs mx-auto">Connect with our dedicated sales team instantly via Call or WhatsApp.</p>
          
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 mb-8 border border-gray-100 shadow-inner">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-3">Contact Person</p>
            <p className="text-lg md:text-xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
              <UserCheck className="w-5 h-5 text-[#00a884]" />
              Abhay Patel
            </p>
            <p className="text-base md:text-lg text-gray-600 font-medium font-mono tracking-tight">+91 89808 93893</p>
          </div>

          <div className="grid gap-3">
            <a 
              href="https://wa.me/918980893893" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-3 md:py-3.5 px-6 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              WhatsApp Me
            </a>
            <a 
              href="tel:+918980893893"
              className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 md:py-3.5 px-6 rounded-xl font-bold hover:border-[#00a884] hover:text-[#00a884] hover:bg-green-50 transition-all text-sm md:text-base"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Using an official WhatsApp Business API intro video
  const videoId = "36YnV9STBqc";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-white hover:text-[#00a884] bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="w-full h-full flex items-center justify-center">
            <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`} 
            title="WhatsApp Business API Demo" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

const LegalModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-full flex items-center justify-center text-[#00a884]">
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 md:p-6 overflow-y-auto leading-relaxed text-sm md:text-base text-gray-600 space-y-4 whitespace-pre-wrap">
          {content}
        </div>
        
        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
          <Button onClick={onClose} size="sm" variant="outline">Close</Button>
        </div>
      </div>
    </div>
  );
};

// --- Section Components ---

const UseCaseTabs = () => {
  const [activeTab, setActiveTab] = useState('broadcasting');

  const content = {
    broadcasting: {
      title: "Bulk Excel Upload & Broadcasting",
      description: "Upload your customer database via Excel/CSV. Schedule personalized campaigns for festivals or offers. Our system handles millions of messages without banning.",
      stats: ["Excel Upload", "Schedule Messaging"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-green-500"
    },
    interactive: {
      title: "CTA Buttons & High Conversion",
      description: "Don't just send text. Send messages with clickable Call-to-Action (CTA) buttons, Quick Replies, and Catalogs to drive instant sales.",
      stats: ["3x Higher Click Rate", "Rich Media Support"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-blue-500"
    },
    automation: {
      title: "Chatbots & Automation",
      description: "Build visual automation flows. Automatically qualify leads, answer FAQs, and route complex queries to humans.",
      stats: ["24/7 Availability", "Drag & Drop Builder"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      color: "bg-purple-500"
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
        {Object.keys(content).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 md:py-6 px-4 min-w-[120px] md:min-w-[140px] text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-white text-[#00a884] border-b-2 border-[#00a884]' 
                : 'bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="p-6 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{content[activeTab].title}</h3>
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            {content[activeTab].description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
            {content[activeTab].stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <div className={`w-2 h-2 rounded-full ${content[activeTab].color} flex-shrink-0`}></div>
                <span className="font-semibold text-gray-900 text-sm md:text-base">{stat}</span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full sm:w-auto">
            Try {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Features
          </Button>
        </div>

        <div className="relative group mt-6 lg:mt-0">
          <div className={`absolute inset-0 ${content[activeTab].color} opacity-10 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-0`}></div>
          <img 
            src={content[activeTab].image} 
            alt={content[activeTab].title} 
            className="relative rounded-2xl shadow-lg border border-gray-100 w-full object-cover h-48 sm:h-64 md:h-80 transform transition-transform group-hover:scale-[1.02]" 
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState("Platform & Safety");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState(null);

  const openContactModal = () => setContactModalOpen(true);
  const openVideoModal = () => setVideoModalOpen(true);

  // --- Header Nav Links Configuration ---
  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const legalDocs = {
    privacy: {
      title: "Privacy Policy",
      content: `At KonektOne, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our services.\n\nWe collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.\n\nWe use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.\n\nWe do not share, sell, rent or trade any of your information with third parties for their promotional purposes.`
    },
    refund: {
      title: "Refund Policy",
      content: `We want you to be satisfied with your purchase. However, if you are not completely satisfied, we offer refunds under certain conditions.\n\nSubscription fees are non-refundable after the service period has commenced. However, if you experience technical issues that prevent you from using the service, please contact our support team within 7 days of purchase.\n\nRefunds are processed within 5-10 business days after approval. The refund will be credited back to the original payment method used for the purchase.\n\nWe reserve the right to refuse refunds for accounts that have violated our Terms of Service or have been used for spamming purposes.`
    },
    terms: {
      title: "Terms and Conditions",
      content: `By accessing this website we assume you accept these terms and conditions. Do not continue to use KonektOne if you do not agree to take all of the terms and conditions stated on this page.\n\nThe following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions.\n\nYou must not: Republish material from KonektOne; Sell, rent or sub-license material from KonektOne; Reproduce, duplicate or copy material from KonektOne; Redistribute content from KonektOne.\n\nWe reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.`
    }
  };

  const faqCategories = {
    "Platform & Safety": [
      {
        q: "What is KonektOne?",
        a: "KonektOne is a WhatsApp marketing platform that allows you to send messages to your customers using the official WhatsApp Cloud API."
      },
      {
        q: "Is KonektOne safe?",
        a: "Yes, our platform is built in accordance with WhatsApp requirements, and all API requests are handled directly by Meta."
      },
      {
        q: "Is WhatsApp Business API legal?",
        a: "Yes, the WhatsApp Business API is legal and is used by many large companies to send messages. It is an entirely transactional route for communication, allowing you to share invoices, alerts, appointment confirmations, and much more."
      },
      {
        q: "Is there any possibility of my number getting blocked using your platform?",
        a: "Your number won't be blocked by WhatsApp for using the API itself. However, you can be downgraded to a lower tier if your messages are frequently reported or blocked by users. We advise you to send only approved templates and avoid spamming."
      },
      {
        q: "Are there any limits to the number of messages sent using your platform?",
        a: "WhatsApp limits the number of messages you can send based on a tier system. Every new account starts at Tier 1 after passing the business verification process. You are automatically upgraded to the next tier based on the volume and quality of the messages you send."
      }
    ],
    "Cloud API Basics": [
      {
        q: "What is WhatsApp Cloud API?",
        a: "WhatsApp Cloud API allows businesses to send and receive messages using the cloud-hosted version of its WhatsApp Business API. With the new Cloud API hosted on Meta's services, WhatsApp Business users can implement WhatsApp Business API without the cost of hosting on their 'own servers'."
      },
      {
        q: "How to get WhatsApp Cloud API?",
        a: "To get WhatsApp Cloud API, you need: 1) Meta Developer Account, 2) Verified Meta Business Manager, and 3) A phone number not registered in the WhatsApp personal or business app."
      },
      {
        q: "What are the benefits of getting WhatsApp Cloud API?",
        a: "Businesses can eliminate the middleman (BSPs) by getting WhatsApp Cloud API. Instead of the lengthy application process and additional charges like server maintenance fees imposed by BSPs, businesses can now access Cloud API directly from Meta with no setup fees involved."
      },
      {
        q: "Can I use my existing WhatsApp number for API?",
        a: "Yes, you can use an existing WhatsApp number for Cloud API. However, you will need to first delete the account linked to that number prior to onboarding with the Meta developer account. Virtual numbers can also be used, but voice and video calls are not supported via WhatsApp Business API."
      },
      {
        q: "I have created a WhatsApp Cloud API account, how do I use it?",
        a: "Once you have created your WhatsApp Cloud API account, login to our marketing platform and provide your WhatsApp API Credentials details in the API section. After successful integration, you can use your Cloud API number."
      }
    ],
    "Messaging Features": [
      {
        q: "Can I send any kind of message through Cloud API?",
        a: "You can send the following message types: Text messages, Reaction messages, Media messages, Location messages, Contact messages, and Interactive messages. Note that using Cloud API you cannot participate in group chats."
      },
      {
        q: "What are template messages?",
        a: "A message template is required to start a business-initiated conversation. These conversations can be customer care messages, appointment reminders, payment or shipping updates, alerts, and more."
      },
      {
        q: "What are the requirements of a template message?",
        a: "A Message template must be approved before it can be used to start a conversation. To start a business-initiated conversation, a customer must have opted-in to receive messages from your business. When sending a message template, you need to specify the language using the language field. Your business is responsible for all translations you wish to use."
      },
      {
        q: "What are Supported Template Categories?",
        a: "Marketing (Send promotional offers, product announcements), One-time passwords (Send codes for secure access), and Transactional (Send account updates, order updates, alerts)."
      }
    ],
    "Pricing & Billing": [
      {
        q: "Is your platform free to use?",
        a: "The tool is chargeable with a yearly subscription fee. Additionally, you pay for each message directly to WhatsApp."
      },
      {
        q: "WhatsApp is free, why are API messages chargeable?",
        a: "WhatsApp Business API is a different service from the WhatsApp Business or personal app. The WhatsApp Business API gives access to the full range of WhatsApp marketing tools and mass campaigns, so it is chargeable."
      },
      {
        q: "Is WhatsApp Cloud API chargeable?",
        a: "The WhatsApp Cloud API account is free. You only need to pay WhatsApp API's conversation-based fees (directly to Facebook Meta) without paying additional per-message fees, which are set by some BSPs."
      },
      {
        q: "What is WhatsApp Cloud API Pricing?",
        a: "The first 1,000 User-initiated conversations each month are free. There are two categories of conversation-based pricing: 1) User-initiated conversation (Service), and 2) Business-initiated conversations (Marketing & Utility)."
      },
      {
        q: "What are User-initiated conversations?",
        a: "User-initiated conversations are conversations initiated by customers. Businesses will be charged user-initiated conversation fees when they reply to messages within the 24-hour messaging window."
      },
      {
        q: "What are Business-initiated conversations?",
        a: "Business-initiated conversations are conversations initiated by businesses outside the 24-hour messaging window. Businesses have to use a Message Template to start a business-initiated conversation."
      }
    ],
    "Account Verification": [
      {
        q: "How can I get the WhatsApp Business Verified green tick?",
        a: "To request green tick verification, you can simply connect with our support team and send in a request. It normally takes about 3 business days to get approval. Once approved, your number will automatically be displayed as your business name to your users along with the green tick."
      }
    ]
  };

  const commonFeatures = [
    "30,000 Contacts",
    "Unlimited Campaigns",
    "Inbox Feature",
    "Automation",
    "Chatbot",
    "E-Mail Support",
    "WhatsApp Support"
  ];

  return (
    <div className="min-h-screen font-sans text-gray-900 mesh-gradient selection:bg-[#00a884] selection:text-white overflow-x-hidden">
      <style>{customStyles}</style>

      {/* --- Navigation --- */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-2 md:py-3' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Logo />
          
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <a key={item.name} href={`#${item.id}`} className="text-sm font-semibold text-gray-600 hover:text-[#00a884] transition-colors">
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="https://app.konektone.com" className="text-sm font-semibold text-gray-900 hover:text-[#00a884]">Login</a>
            <Button size="sm" onClick={openContactModal}>Get Started</Button>
          </div>

          <button className="lg:hidden p-2 text-gray-900 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 z-50">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                className="text-lg font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="h-px bg-gray-100"></div>
            <a href="https://app.konektone.com" className="text-lg font-semibold text-gray-900 text-center">Login</a>
            <Button className="w-full justify-center" onClick={() => {
              setMobileMenuOpen(false);
              openContactModal();
            }}>Get Started</Button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="relative z-10 order-1 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs md:text-sm font-semibold text-gray-700 mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="w-2 h-2 rounded-full bg-[#00a884] animate-pulse"></span>
                Official Meta Business Partner
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-900">
                Supercharge your business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a884] to-emerald-600">WhatsApp API</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The official <strong>Cloud-Based WhatsApp Messaging Panel</strong>. Avoid number bans, send bulk campaigns via Excel upload, and automate support—all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8 md:mb-10">
                <Button size="lg" icon={ArrowRight} onClick={openContactModal} className="w-full sm:w-auto">Get Started</Button>
                <Button size="lg" variant="outline" icon={PlayCircle} onClick={openVideoModal} className="w-full sm:w-auto">View Demo</Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-gray-500">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00a884]" /> Official API (No Bans)
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00a884]" /> Direct Meta Billing
                </span>
              </div>
            </div>

            <div className="relative perspective-1000 order-2 lg:order-2 mt-8 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-green-200/40 via-blue-100/40 to-purple-100/40 rounded-full blur-3xl -z-10 animate-pulse" />
              
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200/60 p-2 md:p-4 animate-float max-w-md mx-auto lg:max-w-none">
                <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                  <div className="h-10 md:h-12 border-b border-gray-200 flex items-center px-4 justify-between bg-white">
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-green-100 flex items-center justify-center text-[#00a884]">
                           <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="font-bold text-xs md:text-sm text-gray-700">Cloud Panel</span>
                     </div>
                     <div className="flex gap-2">
                        <div className="w-16 md:w-20 h-2 bg-gray-100 rounded-full"></div>
                     </div>
                  </div>
                  
                  <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white min-h-[250px] md:min-h-[300px]">
                     <div className="flex gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center font-bold text-blue-600 text-xs md:text-sm">JD</div>
                        <div className="space-y-1">
                           <div className="bg-gray-100 p-3 md:p-4 rounded-2xl rounded-tl-none text-xs md:text-sm text-gray-700 max-w-[240px] md:max-w-[280px]">
                              Can I upload my customer list from Excel?
                           </div>
                           <span className="text-[10px] md:text-xs text-gray-400 ml-1">10:42 AM</span>
                        </div>
                     </div>

                     <div className="flex gap-3 md:gap-4 flex-row-reverse">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00a884] flex-shrink-0 flex items-center justify-center text-white font-bold text-xs md:text-sm">KO</div>
                        <div className="space-y-1">
                           <div className="bg-[#00a884] p-3 md:p-4 rounded-2xl rounded-tr-none text-xs md:text-sm text-white max-w-[240px] md:max-w-[280px] shadow-lg shadow-green-500/20">
                              Yes! Just drag & drop your Excel file. You can also schedule the campaign for later.
                           </div>
                           <span className="text-[10px] md:text-xs text-gray-400 mr-1 text-right block">10:43 AM • Read</span>
                        </div>
                     </div>
                     
                     {/* CTA Button Demo */}
                     <div className="flex gap-3 md:gap-4 flex-row-reverse">
                         <div className="w-full pl-10 md:pl-14">
                           <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                             <div className="bg-[#00a884]/10 p-2 md:p-3 rounded-lg mb-2">
                               <p className="text-[10px] md:text-xs text-gray-600 font-medium">✨ Check out our new holiday collection!</p>
                             </div>
                             <div className="grid grid-cols-2 gap-2">
                               <button className="bg-white border border-gray-200 text-[#00a884] text-[10px] md:text-xs font-bold py-1.5 md:py-2 rounded-lg shadow-sm">View Catalog</button>
                               <button className="bg-white border border-gray-200 text-[#00a884] text-[10px] md:text-xs font-bold py-1.5 md:py-2 rounded-lg shadow-sm">Talk to Sales</button>
                             </div>
                           </div>
                         </div>
                     </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white p-4 md:p-5 rounded-xl shadow-xl border border-gray-100 animate-float-delayed z-20 w-48 md:w-56 hidden sm:block">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm font-semibold text-gray-500">Scheduled Msgs</span>
                      <CalendarClock className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                   </div>
                   <div className="text-xl md:text-2xl font-bold text-gray-900">4,500</div>
                   <div className="text-[10px] md:text-xs text-green-600 font-medium mt-1">Ready for 9:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24 border-t border-gray-200 pt-8 md:pt-10">
            <p className="text-center text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 md:mb-8">Official Meta Partner Technology</p>
            <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {['Shopify', 'Magento', 'Salesforce', 'HubSpot', 'Zoho', 'WooCommerce'].map(brand => (
                 <span key={brand} className="text-lg md:text-xl font-bold font-serif text-gray-800">{brand}</span>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Value Proposition (Grid) --- */}
      <section id="features" className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <Badge>All-In-One Panel</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 md:mb-6 text-gray-900">Everything you need to scale</h2>
            <p className="text-lg md:text-xl text-gray-600">From official API access to anti-ban technology, we provide the complete cloud infrastructure for WhatsApp.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {/* Reshuffled Order: Trust -> Action -> Growth */}
             {[
               { icon: CheckCircle2, title: "WhatsApp Official API", desc: "Access the secure, scalable, and official Cloud API directly from Meta. Say goodbye to gray-area tools." },
               { icon: BadgeCheck, title: "Green Tick Verification", desc: "Build instant trust. We assist you through the entire verification process to get that coveted Green Tick." },
               { icon: ShieldCheck, title: "No Number Bans", desc: "Sleep easy. Our Official Cloud API technology ensures your number stays safe and verified, unlike unauthorized tools." },
               { icon: FileSpreadsheet, title: "Bulk Excel Upload", desc: "Drag-and-drop your Excel/CSV files. Map columns to variables for personalized bulk messaging instantly." },
               { icon: MessageSquare, title: "Bulk WhatsApp Messaging", desc: "Send unlimited broadcast campaigns to thousands of customers in one click with high delivery rates." },
               { icon: Bot, title: "WhatsApp Chatbot", desc: "Automate responses 24/7. Use visual flow builders to qualify leads and answer FAQs without humans." },
               { icon: MousePointerClick, title: "CTA Buttons", desc: "Don't just send text. Add 'Buy Now' or 'Visit Website' buttons to your messages to boost click-through rates." },
               { icon: CalendarClock, title: "Schedule Messaging", desc: "Plan campaigns ahead of time. Schedule messages for holidays, product launches, or specific time zones." },
               { icon: Link, title: "CRM Integrations", desc: "Connect WhatsApp with HubSpot, Salesforce, Zoho, or any CRM via webhooks and APIs to sync customer data." },
               { icon: Users, title: "Personalized Messaging", desc: "Use dynamic variables (like Name, Order ID) to make every broadcast message feel personal and relevant." },
               { icon: CreditCard, title: "Billing in Meta", desc: "Total transparency. Pay platform fees to us, and pay conversation charges directly to Meta with no markups." },
               { icon: Headphones, title: "Training and Support", desc: "We don't leave you hanging. Get dedicated onboarding sessions and 24/7 technical assistance for your team." }
             ].map((feature, i) => (
               <div key={i} className="p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-300 group hover:bg-white hover:shadow-2xl hover:border-green-400 relative overflow-hidden">
                 {/* Hover Highlight Gradient */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00a884] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                 
                 <div className="flex items-start justify-between mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-[#00a884] transition-colors duration-300">
                        <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#00a884] group-hover:text-white transition-colors duration-300 transform group-hover:scale-110 group-hover:rotate-3" />
                    </div>
                 </div>
                 
                 <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#00a884] transition-colors">{feature.title}</h3>
                 <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- Interactive Use Cases --- */}
      <section id="solutions" className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
           <div className="mb-10 md:mb-12 md:text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful tools for every need</h2>
              <p className="text-gray-600 text-lg">See how you can utilize KonektOne to achieve your business goals.</p>
           </div>
           <UseCaseTabs />
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Choose the plan that best suits your business</h2>
            <p className="text-lg text-gray-600">Generate income by reselling our WhatsApp marketing platform to your customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Quarterly Plan */}
            <PricingCard 
              title="Professional"
              price="₹10,000"
              duration="Quarterly"
              features={commonFeatures}
              onBoardingStatus="Paid"
              onClick={openContactModal}
            />

            {/* Half Yearly Plan */}
            <PricingCard 
              title="Professional"
              price="₹15,000"
              duration="Half Yearly"
              features={commonFeatures}
              onBoardingStatus="Paid"
              onClick={openContactModal}
            />

            {/* Yearly Plan */}
            <PricingCard 
              title="Professional"
              price="₹20,000"
              duration="Yearly"
              popular={true}
              features={commonFeatures}
              onBoardingStatus="Free"
              onClick={openContactModal}
            />
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Trusted by Leading Businesses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                quote: "I was worried about my number getting banned. With KonektOne's official API, I've sent 100k+ messages with zero issues.", 
                author: "Anjali Gupta", 
                role: "Marketing Director",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
              },
              { 
                quote: "The Excel upload feature is a lifesaver. I just upload my sheet, map the 'Name' column, and hit send. It's so fast.", 
                author: "Vikram Malhotra", 
                role: "E-commerce Founder",
                img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200"
              },
              { 
                quote: "Direct Meta billing saves us a fortune. Other tools were charging a markup on every message. This is honest pricing.", 
                author: "Sneha Reddy", 
                role: "CFO at TechFlow",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
              }
            ].map((t, i) => (
              <div key={i} className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-base md:text-lg font-medium text-gray-900 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.author} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                  <div>
                    <div className="font-bold text-sm text-gray-900">{t.author}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about the product and billing.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10">
            {Object.keys(faqCategories).map((category) => (
              <button 
                key={category}
                onClick={() => {
                  setActiveFaqCategory(category);
                  setOpenFAQ(-1); // Close accordion when switching tabs
                }}
                className={`px-4 py-2 md:px-5 rounded-full text-xs md:text-sm font-bold transition-all ${
                  activeFaqCategory === category 
                    ? 'bg-[#00a884] text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-2 animate-in fade-in duration-500">
            {faqCategories[activeFaqCategory].map((faq, index) => (
              <AccordionItem 
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(index === openFAQ ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Box --- */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#002e25] rounded-3xl md:rounded-[2.5rem] p-8 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#00a884] opacity-20 blur-[80px] md:blur-[120px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-600 opacity-20 blur-[80px] md:blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">Ready to grow your business?</h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10">Join thousands of businesses engaging their customers on WhatsApp today.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary" size="lg" className="bg-[#00a884] hover:bg-[#00c29a] text-white border-0" onClick={openContactModal}>
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="!bg-transparent !border-white/30 !text-white hover:!bg-white/10 hover:!border-white hover:!text-white"
                  icon={PlayCircle}
                  onClick={openVideoModal}
                >
                  View Demo
                </Button>
              </div>
              <p className="mt-6 md:mt-8 text-xs md:text-sm text-gray-400 flex justify-center items-center gap-2">
                 <CreditCard className="w-3 h-3 md:w-4 md:h-4" /> No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white pt-16 md:pt-20 pb-8 md:pb-10 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 md:mb-16 text-center md:text-left">
            <div className="col-span-1 md:col-span-2">
              <div className="flex justify-center md:justify-start">
                <Logo />
              </div>
              <p className="mt-6 text-gray-500 max-w-sm mx-auto md:mx-0 leading-relaxed text-sm md:text-base">
                KonektOne is the official WhatsApp Business Solution Provider for modern brands.
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 md:mb-6">Quick Links</h4>
                <ul className="space-y-3 md:space-y-4 text-sm text-gray-600">
                  <li>
                    <button 
                      onClick={() => setActiveLegalDoc(legalDocs.privacy)}
                      className="hover:text-[#00a884] transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveLegalDoc(legalDocs.refund)}
                      className="hover:text-[#00a884] transition-colors"
                    >
                      Refund Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveLegalDoc(legalDocs.terms)}
                      className="hover:text-[#00a884] transition-colors"
                    >
                      Terms and Condition
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-500 gap-4">
            <p>&copy; 2024 KonektOne Inc. All rights reserved.</p>
            <p>Made with ❤️ for Business</p>
          </div>
        </div>
      </footer>

      {/* --- Modal Containers --- */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
      <LegalModal 
        isOpen={!!activeLegalDoc} 
        onClose={() => setActiveLegalDoc(null)} 
        title={activeLegalDoc?.title} 
        content={activeLegalDoc?.content || ''} 
      />
    </div>
  );
}