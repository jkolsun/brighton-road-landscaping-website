'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  businessInfo,
  services,
  serviceAreas,
  paymentMethods,
  faqs,
  keySellingPoints,
  teamInfo,
  quickReplies,
  responseVariations,
  synonyms
} from './chatbotData';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  links?: { text: string; url: string }[];
}

interface QuoteFormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  notes: string;
}

// Utility: Get random item from array
const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Utility: Calculate similarity between two strings (for fuzzy matching)
const similarity = (s1: string, s2: string): number => {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;

  const editDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  return (longer.length - editDistance(longer, shorter)) / longer.length;
};

// Advanced text matching with synonyms and fuzzy matching
const textMatches = (text: string, keywords: string[]): { matched: boolean; score: number } => {
  const lowerText = text.toLowerCase();
  let maxScore = 0;

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();

    // Exact match
    if (lowerText.includes(lowerKeyword)) {
      maxScore = Math.max(maxScore, 1.0);
      continue;
    }

    // Check synonyms
    for (const [base, syns] of Object.entries(synonyms)) {
      if (lowerKeyword.includes(base) || syns.some(s => lowerKeyword.includes(s))) {
        if (syns.some(s => lowerText.includes(s)) || lowerText.includes(base)) {
          maxScore = Math.max(maxScore, 0.9);
        }
      }
    }

    // Fuzzy match for words (handles typos)
    const words = lowerText.split(/\s+/);
    for (const word of words) {
      if (word.length > 3) {
        const sim = similarity(word, lowerKeyword);
        if (sim > 0.7) {
          maxScore = Math.max(maxScore, sim * 0.8);
        }
      }
    }
  }

  return { matched: maxScore > 0.5, score: maxScore };
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [lastUnknownQuestion, setLastUnknownQuestion] = useState('');
  const [quoteFormData, setQuoteFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    address: '',
    service: '',
    notes: ''
  });
  const [questionFormData, setQuestionFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showQuoteForm, showQuestionForm]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        content: `Hi! I'm Brighton, your landscaping assistant. I know everything about our services and can help you:\n\n• Get a free quote instantly\n• Learn about our 6 landscaping services\n• Check if we service your area\n• Answer any questions you have\n\nHow can I help you today?`,
        timestamp: new Date(),
        quickReplies: quickReplies.greeting
      };
      setMessages([welcomeMessage]);
    }
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, messages.length]);

  // Find the best matching service based on user input
  const findMatchingService = (text: string) => {
    let bestMatch = null;
    let bestScore = 0;

    for (const service of services) {
      const nameMatch = textMatches(text, [service.name, service.id]);
      const keywordMatch = textMatches(text, service.keywords);
      const score = Math.max(nameMatch.score, keywordMatch.score);

      if (score > bestScore && score > 0.5) {
        bestScore = score;
        bestMatch = service;
      }
    }

    return bestMatch;
  };

  // Find best matching FAQ
  const findMatchingFaq = (text: string) => {
    let bestMatch = null;
    let bestScore = 0;

    for (const faq of faqs) {
      const match = textMatches(text, faq.keywords);
      if (match.score > bestScore && match.score > 0.5) {
        bestScore = match.score;
        bestMatch = faq;
      }
    }

    return bestMatch;
  };

  // Check if user is asking about a specific area
  const findMatchingArea = (text: string) => {
    const lowerText = text.toLowerCase();
    return serviceAreas.find(area => lowerText.includes(area.toLowerCase()));
  };

  // Main response generation logic
  const generateResponse = (userMessage: string): { content: string; quickReplies?: string[]; links?: { text: string; url: string }[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // === GREETINGS ===
    if (/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|what'?s\s*up|sup)[\s!.?]*$/i.test(userMessage.trim())) {
      return {
        content: randomChoice(responseVariations.greeting),
        quickReplies: quickReplies.greeting
      };
    }

    // === THANKS ===
    if (/thank|thanks|appreciate|helpful/i.test(lowerMessage)) {
      return {
        content: randomChoice(responseVariations.thanks),
        quickReplies: ['Get a Quote', 'View Services', 'Contact Info']
      };
    }

    // === GOODBYE ===
    if (/^(bye|goodbye|see\s*you|later|talk\s*soon|take\s*care)[\s!.?]*$/i.test(userMessage.trim())) {
      return {
        content: randomChoice(responseVariations.bye),
        quickReplies: ['Get a Quote', 'Contact Info']
      };
    }

    // === QUOTE REQUEST ===
    if (/quote|estimate|price|pricing|cost|how\s*much|book|schedule|appointment|get\s*started|sign\s*up/i.test(lowerMessage)) {
      // Check if asking about a specific service
      const service = findMatchingService(lowerMessage);
      if (service) {
        return {
          content: `Great! I'd love to help you get a quote for **${service.name}**.\n\n${service.shortDesc}\n\nWould you like to request a free quote now? We typically respond within 24 hours!`,
          quickReplies: ['Yes, get a quote', `Call ${businessInfo.phone}`, 'Learn more first'],
          links: [{ text: 'View Service Details', url: service.link }]
        };
      }
      return {
        content: `Awesome! I can help you get a free quote. We offer:\n\n${services.map(s => `• ${s.name}`).join('\n')}\n\nWould you like to fill out a quick quote form, or call us at ${businessInfo.phone}?`,
        quickReplies: ['Fill out quote form', `Call ${businessInfo.phone}`, 'Learn about services'],
      };
    }

    // === SPECIFIC SERVICE INQUIRY ===
    const matchedService = findMatchingService(lowerMessage);
    if (matchedService) {
      return {
        content: `**${matchedService.name}**\n\n${matchedService.fullDesc}\n\n**What's included:**\n${matchedService.features.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\nWant a free quote for this service?`,
        quickReplies: ['Get a Quote', 'Other Services', 'Contact Us'],
        links: [{ text: 'Learn More', url: matchedService.link }]
      };
    }

    // === SERVICE AREA CHECK ===
    const matchedArea = findMatchingArea(lowerMessage);
    if (matchedArea) {
      return {
        content: `Yes! We proudly serve **${matchedArea}** and the surrounding area. We'd be happy to provide a free estimate for your property!\n\nWould you like to request a quote?`,
        quickReplies: ['Get a Quote', 'View All Areas', 'Contact Us']
      };
    }

    // === GENERAL AREA QUESTION ===
    if (/area|location|where|service\s*area|do\s*you\s*(come|go|serve)|cover|zip|neighborhood/i.test(lowerMessage)) {
      return {
        content: `We service the greater Montgomery County, PA area including:\n\n${serviceAreas.map(a => `• ${a}`).join('\n')}\n\nDon't see your area? Give us a call at ${businessInfo.phone} - we may still be able to help!`,
        quickReplies: ['Get a Quote', 'Contact Us', 'View Services']
      };
    }

    // === ALL SERVICES ===
    if (/service|services|what\s*(do\s*you|can\s*you)\s*(do|offer)|offerings|help\s*with/i.test(lowerMessage)) {
      return {
        content: `We offer comprehensive landscaping services:\n\n${services.map(s => `**${s.name}** - ${s.shortDesc}`).join('\n\n')}\n\nWhich service interests you?`,
        quickReplies: quickReplies.services,
        links: [{ text: 'View All Services', url: '/services' }]
      };
    }

    // === CONTACT INFO ===
    if (/contact|phone|call|email|reach|talk\s*to|speak|human|person|someone/i.test(lowerMessage)) {
      return {
        content: `Here's how to reach us:\n\n📞 **Phone:** ${businessInfo.phone}\n📧 **Email:** ${businessInfo.email}\n🕐 **Hours:** ${businessInfo.hours}\n📍 **Location:** ${businessInfo.location}\n\nWe respond to all inquiries within 24 hours!`,
        quickReplies: [`Call ${businessInfo.phone}`, 'Get a Quote', 'View Services'],
        links: [
          { text: 'Facebook', url: businessInfo.social.facebook },
          { text: 'Instagram', url: businessInfo.social.instagram }
        ]
      };
    }

    // === HOURS ===
    if (/hour|open|available|when|time|schedule/i.test(lowerMessage) && !/appointment|book/i.test(lowerMessage)) {
      return {
        content: `We're available **${businessInfo.hours}**!\n\nCall us anytime at ${businessInfo.phone} or leave a message and we'll respond within 24 hours.`,
        quickReplies: ['Get a Quote', 'Contact Info', 'View Services']
      };
    }

    // === PAYMENT ===
    if (/pay|payment|accept|venmo|zelle|cash|check|credit|card|apple\s*pay|cashapp|invoice|bill/i.test(lowerMessage)) {
      const paymentList = paymentMethods.map(p => `• **${p.name}** - ${p.description}`).join('\n');
      return {
        content: `We accept multiple payment options:\n\n${paymentList}\n\n**No contracts required!** Pay-as-you-go with no cancellation fees.`,
        quickReplies: ['Get a Quote', 'View Services', 'Contact Us']
      };
    }

    // === ABOUT / COMPANY ===
    if (/about|who\s*(are|is)|company|team|owner|founded|history|background/i.test(lowerMessage)) {
      return {
        content: `**About Brighton Road Landscaping**\n\n${teamInfo.description}\n\n**Our Team:**\n${teamInfo.members.map(m => `• ${m.name} - ${m.role}`).join('\n')}\n\n**Why customers choose us:**\n${keySellingPoints.slice(0, 5).map(p => `• ${p}`).join('\n')}`,
        quickReplies: ['Get a Quote', 'View Services', 'See Reviews'],
        links: [{ text: 'About Us', url: '/about' }]
      };
    }

    // === REVIEWS / TESTIMONIALS ===
    if (/review|reviews|testimonial|rating|reputation|trust|reliable/i.test(lowerMessage)) {
      return {
        content: `We're proud of our reputation!\n\n⭐ **${businessInfo.rating}** average rating\n👥 **${businessInfo.customerCount}** happy customers\n📅 **${businessInfo.yearsExperience}** in business\n\nCheck out what our customers are saying on our testimonials page!`,
        quickReplies: ['Get a Quote', 'View Services', 'Contact Us'],
        links: [
          { text: 'Read Testimonials', url: '/testimonials' },
          { text: 'Google Reviews', url: businessInfo.social.google }
        ]
      };
    }

    // === EMPLOYMENT ===
    if (/hiring|job|jobs|work\s*(for|with)|employment|position|career|apply|join\s*(team|us)/i.test(lowerMessage)) {
      return {
        content: `We're always looking for hardworking team members!\n\n**What we offer:**\n• Flexible scheduling\n• Competitive pay\n• Great team environment\n• No experience necessary - we'll train you!\n\nApply now on our Join page!`,
        quickReplies: ['Apply Now', 'Contact Us'],
        links: [{ text: 'Join Our Team', url: '/join' }]
      };
    }

    // === FAQ MATCHING ===
    const matchedFaq = findMatchingFaq(lowerMessage);
    if (matchedFaq) {
      return {
        content: `**${matchedFaq.question}**\n\n${matchedFaq.answer}`,
        quickReplies: ['More Questions', 'Get a Quote', 'View Services'],
        links: [{ text: 'View All FAQs', url: '/#faq' }]
      };
    }

    // === EMERGENCY / URGENT ===
    if (/emergency|urgent|asap|fallen\s*tree|storm\s*damage|dangerous/i.test(lowerMessage)) {
      return {
        content: `For urgent situations like storm damage or fallen trees, please call us directly at **${businessInfo.phone}**.\n\nWe offer emergency response and will prioritize getting your property safe!`,
        quickReplies: [`Call ${businessInfo.phone}`, 'Get a Quote']
      };
    }

    // === COMPARISON / WHY CHOOSE ===
    if (/why|better|best|compare|different|special|unique/i.test(lowerMessage)) {
      return {
        content: `**Why Choose Brighton Road Landscaping?**\n\n${keySellingPoints.map(p => `✓ ${p}`).join('\n')}\n\nWe're a local, family-owned business that treats every property like our own!`,
        quickReplies: ['Get a Quote', 'View Services', 'See Reviews']
      };
    }

    // === FALLBACK - SMART UNKNOWN HANDLER ===
    // If we can't match anything, offer to send the question to the team
    setLastUnknownQuestion(userMessage);
    return {
      content: `That's a great question! While I don't have that specific information, I can:\n\n1. **Send your question to our team** - they'll respond within 24 hours\n2. **Connect you with us directly** - call ${businessInfo.phone}\n3. **Help with something else** - try asking about our services, pricing, or scheduling\n\nWhat would you like to do?`,
      quickReplies: ['Send my question', `Call ${businessInfo.phone}`, 'View Services', 'Get a Quote']
    };
  };

  const addMessage = (content: string, type: 'bot' | 'user', extras?: Partial<Message>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      ...extras
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    addMessage(messageText, 'user');
    setInputValue('');

    // Check for special triggers
    const lowerText = messageText.toLowerCase();

    // Quote form trigger
    if (lowerText.includes('fill out') ||
        lowerText === 'yes, get a quote' ||
        lowerText === 'get a quote' ||
        lowerText === 'get a free quote' ||
        lowerText === 'fill out quote form') {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsTyping(false);
      setShowQuoteForm(true);
      addMessage(
        `Perfect! Fill out this quick form and we'll get back to you within 24 hours with your free estimate.`,
        'bot'
      );
      return;
    }

    // Question form trigger
    if (lowerText === 'send my question' || lowerText.includes('send question')) {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsTyping(false);
      setQuestionFormData(prev => ({ ...prev, question: lastUnknownQuestion }));
      setShowQuestionForm(true);
      addMessage(
        `Great! Just add your contact info and we'll get back to you within 24 hours.`,
        'bot'
      );
      return;
    }

    // Simulate typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
    setIsTyping(false);

    // Generate response
    const response = generateResponse(messageText);
    addMessage(response.content, 'bot', {
      quickReplies: response.quickReplies,
      links: response.links
    });
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(businessInfo.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteFormData.name,
          phone: quoteFormData.phone,
          address: quoteFormData.address,
          service: quoteFormData.service,
          notes: quoteFormData.notes,
          source: 'Website Chatbot'
        }),
      });

      if (response.ok) {
        setShowQuoteForm(false);
        addMessage(
          `Thank you, ${quoteFormData.name}! 🎉\n\nYour quote request for **${quoteFormData.service}** has been submitted!\n\nWe'll contact you at ${quoteFormData.phone} within 24 hours.\n\nAnything else I can help with?`,
          'bot',
          { quickReplies: ['View Services', 'Service Areas', 'Contact Info'] }
        );
        setQuoteFormData({ name: '', phone: '', address: '', service: '', notes: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      addMessage(
        `Sorry, there was an issue. Please call us directly at ${businessInfo.phone} or try again.`,
        'bot',
        { quickReplies: [`Call ${businessInfo.phone}`, 'Try Again'] }
      );
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(businessInfo.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: questionFormData.name,
          email: questionFormData.email,
          question: questionFormData.question,
          source: 'Chatbot Question'
        }),
      });

      if (response.ok) {
        setShowQuestionForm(false);
        addMessage(
          `Thanks, ${questionFormData.name}! Your question has been sent to our team.\n\nWe'll email you at ${questionFormData.email} within 24 hours.\n\nAnything else I can help with in the meantime?`,
          'bot',
          { quickReplies: ['View Services', 'Get a Quote', 'Contact Info'] }
        );
        setQuestionFormData({ name: '', email: '', question: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      addMessage(
        `Sorry, there was an issue. Please call us at ${businessInfo.phone}.`,
        'bot',
        { quickReplies: [`Call ${businessInfo.phone}`] }
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'bg-gray-700 hover:bg-gray-800 rotate-0' : 'bg-green-700 hover:bg-green-600 animate-pulse'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Notification Badge */}
      {!isOpen && messages.length === 0 && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-lg p-3 max-w-[200px] border border-green-200">
          <p className="text-sm text-gray-700 font-medium">Need help? Chat with us!</p>
          <p className="text-xs text-gray-500 mt-1">Get instant answers</p>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
              <img
                src="/images/Official Logo 2027.JPG"
                alt="Brighton Road Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Brighton Road</h3>
              <p className="text-green-100 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                Online • Instant replies
              </p>
            </div>
            <a
              href={businessInfo.phoneLink}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
              title="Call us"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-green-700 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }} />

                  {message.links && message.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 hover:text-green-800 underline"
                        >
                          {link.text} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length > 0 && messages[messages.length - 1].quickReplies && !showQuoteForm && !showQuestionForm && (
              <div className="flex flex-wrap gap-2 mt-2">
                {messages[messages.length - 1].quickReplies?.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-2 text-sm bg-white border border-green-600 text-green-700 rounded-full hover:bg-green-50 hover:border-green-700 transition shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Quote Form */}
            {showQuoteForm && (
              <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-green-600">📋</span> Request a Free Quote
                </h4>
                <form onSubmit={handleQuoteSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={quoteFormData.phone}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Property Address *"
                    required
                    value={quoteFormData.address}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, address: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select
                    required
                    value={quoteFormData.service}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, service: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a Service *</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Additional notes (optional)"
                    value={quoteFormData.notes}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-700 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition text-sm"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuoteForm(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Question Form */}
            {showQuestionForm && (
              <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">❓</span> Send Your Question
                </h4>
                <form onSubmit={handleQuestionSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={questionFormData.name}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, name: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={questionFormData.email}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, email: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your question..."
                    required
                    value={questionFormData.question}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, question: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-500 transition text-sm"
                    >
                      Send Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-11 h-11 bg-green-700 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Brighton Road Landscaping • {businessInfo.phone}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
