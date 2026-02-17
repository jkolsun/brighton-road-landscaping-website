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
  synonyms,
  commonMisspellings,
  vaguePatterns
} from './chatbotData';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  links?: { text: string; url: string }[];
  context?: string; // Track what this message was about
}

interface ConversationContext {
  lastTopic: string | null;
  lastService: string | null;
  mentionedServices: string[];
  askedForQuote: boolean;
  messageCount: number;
  // Enhanced tracking
  recentTopics: string[]; // Track last 5 topics for reference
  lastQuestion: string | null; // What did user last ask about
  lastBotResponse: string | null; // What did bot say (for follow-ups)
  pendingClarification: boolean; // Did we ask for clarification?
  userIntent: string | null; // Inferred user goal (quote, info, help)
  conversationPhase: 'greeting' | 'exploring' | 'interested' | 'ready-to-convert';
}

// Utility: Get random item from array
const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Utility: Correct common misspellings
const correctSpelling = (text: string): string => {
  let corrected = text.toLowerCase();
  for (const [wrong, right] of Object.entries(commonMisspellings)) {
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    corrected = corrected.replace(regex, right);
  }
  return corrected;
};

// Check if question is too vague and needs clarification
const isVagueQuestion = (text: string): boolean => {
  const lowerText = text.toLowerCase().trim();

  // Very short messages are often vague
  if (lowerText.split(/\s+/).length <= 2 && !/quote|price|cost|service|area|contact|phone/i.test(lowerText)) {
    for (const { pattern, needsClarification } of vaguePatterns) {
      if (pattern.test(lowerText) && needsClarification) {
        return true;
      }
    }
  }
  return false;
};

// Try to infer what the user might want from vague input
const inferIntent = (text: string): string | null => {
  const lowerText = text.toLowerCase();

  // Problem-related keywords
  if (/brown|dead|dying|yellow|patchy|bare|ugly|terrible|bad|wrong|issue|problem/i.test(lowerText)) {
    return 'lawn-problem';
  }
  if (/overgrown|tall|long|jungle|mess|neglected/i.test(lowerText)) {
    return 'overgrown';
  }
  if (/busy|no time|don't have time|hassle/i.test(lowerText)) {
    return 'no-time';
  }
  if (/new home|just bought|moving|sell/i.test(lowerText)) {
    return 'new-home';
  }
  if (/recommend|referred|neighbor|friend told/i.test(lowerText)) {
    return 'referral';
  }
  if (/improve|better|nice|beautiful|curb appeal/i.test(lowerText)) {
    return 'improve';
  }

  return null;
};

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
  // Apply spell correction before matching
  const lowerText = correctSpelling(text.toLowerCase());
  let maxScore = 0;

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();

    // Exact match (whole word preferred)
    const wordBoundaryRegex = new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (wordBoundaryRegex.test(lowerText)) {
      maxScore = Math.max(maxScore, 1.0);
      continue;
    }

    // Partial match (lower score)
    if (lowerText.includes(lowerKeyword) && lowerKeyword.length > 3) {
      maxScore = Math.max(maxScore, 0.85);
      continue;
    }

    // Check synonyms
    for (const [base, syns] of Object.entries(synonyms)) {
      if (lowerKeyword.includes(base) || syns.some(s => lowerKeyword.includes(s))) {
        if (syns.some(s => lowerText.includes(s)) || lowerText.includes(base)) {
          maxScore = Math.max(maxScore, 0.8);
        }
      }
    }

    // Fuzzy match for words (handles typos)
    const words = lowerText.split(/\s+/);
    for (const word of words) {
      if (word.length > 3 && lowerKeyword.length > 3) {
        const sim = similarity(word, lowerKeyword);
        if (sim > 0.75) {
          maxScore = Math.max(maxScore, sim * 0.7);
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
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [lastUnknownQuestion, setLastUnknownQuestion] = useState('');
  const [context, setContext] = useState<ConversationContext>({
    lastTopic: null,
    lastService: null,
    mentionedServices: [],
    askedForQuote: false,
    messageCount: 0,
    recentTopics: [],
    lastQuestion: null,
    lastBotResponse: null,
    pendingClarification: false,
    userIntent: null,
    conversationPhase: 'greeting'
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
  }, [messages, showQuestionForm]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        content: `Hi! I'm Brighton, your landscaping assistant. I know everything about our services and can help you:\n\n• Get a free quote instantly\n• Learn about our landscaping services\n• Check if we service your area\n• Answer any questions you have\n\nHow can I help you today?`,
        timestamp: new Date(),
        quickReplies: quickReplies.greeting,
        context: 'greeting'
      };
      setMessages([welcomeMessage]);
    }
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, messages.length]);

  // Check if user is asking for alternatives/other options
  const isAskingForOthers = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const otherPatterns = [
      /\bother\s*(service|option|choice|one)s?\b/i,
      /\bwhat\s*else\b/i,
      /\bdifferent\s*(service|option|one)s?\b/i,
      /\bmore\s*(service|option)s?\b/i,
      /\bshow\s*(me\s*)?(all|more|other)/i,
      /\banything\s*else\b/i,
      /\bsomething\s*(else|different)\b/i,
      /\ball\s*(service|option)s?\b/i,
      /\blist\s*(service|option|all)s?\b/i,
      /^other\s*services?$/i,
      /^others?$/i,
      /^what\s*else\??$/i,
      /^more$/i
    ];
    return otherPatterns.some(pattern => pattern.test(lowerText));
  };

  // Check if this is a follow-up question
  const isFollowUp = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const followUpPatterns = [
      /^(and|also|what about|how about|tell me more|more info|details)/i,
      /^(yes|yeah|yep|sure|ok|okay|please|go ahead)/i,
      /\bmore\s*(about|info|details|information)\b/i,
      /\btell\s*me\s*more\b/i,
      /\blearn\s*more\b/i
    ];
    return followUpPatterns.some(pattern => pattern.test(lowerText));
  };

  // Check if user is using pronouns that refer to previous context
  const usesPronounReference = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const pronounPatterns = [
      /\b(it|that|this|them|those|these)\b/i,
      /\bhow much (is|does|for) (it|that)\b/i,
      /\bwhat (is|about|does) (it|that)\b/i,
      /\bcan (you|I) (get|have|do) (it|that)\b/i,
      /\bwhen can (you|I|we)\b/i,
      /\bhow (long|often|quick)\b/i
    ];
    return pronounPatterns.some(pattern => pattern.test(lowerText));
  };

  // Detect the type of question being asked
  const detectQuestionType = (text: string): string => {
    const lowerText = text.toLowerCase();

    if (/how much|price|cost|quote|estimate|pricing/i.test(lowerText)) return 'pricing';
    if (/how (long|often|frequently|quick)/i.test(lowerText)) return 'timing';
    if (/when|what time|schedule|available/i.test(lowerText)) return 'scheduling';
    if (/where|area|location|service.*area/i.test(lowerText)) return 'location';
    if (/what (is|are|do)|tell me about|explain/i.test(lowerText)) return 'information';
    if (/why|should|recommend|better|best/i.test(lowerText)) return 'recommendation';
    if (/can you|do you|are you able/i.test(lowerText)) return 'capability';
    if (/who|owner|team|company/i.test(lowerText)) return 'about';

    return 'general';
  };

  // Get contextual response based on previous conversation
  const getContextualFollowUp = (text: string): { content: string; quickReplies?: string[]; links?: { text: string; url: string }[]; newContext?: Partial<ConversationContext> } | null => {
    const lowerText = text.toLowerCase();
    const questionType = detectQuestionType(lowerText);

    // If they're asking about pricing/cost with pronouns, refer to last service
    if (questionType === 'pricing' && context.lastService) {
      const service = services.find(s => s.id === context.lastService);
      if (service) {
        return {
          content: `For **${service.name}**, pricing varies based on your property size and specific needs.\n\n**To get an accurate quote:**\n• Fill out our quick form\n• We'll assess your property\n• You'll receive a detailed estimate within 24 hours\n\nNo obligation - just straightforward pricing!`,
          quickReplies: ['Get a Quote', 'What\'s included?', 'Other Services'],
          links: [{ text: 'View Service Details', url: service.link }],
          newContext: { lastTopic: 'pricing', lastQuestion: 'price' }
        };
      }
    }

    // If asking about timing/frequency with context
    if (questionType === 'timing' && context.lastService) {
      const service = services.find(s => s.id === context.lastService);
      if (service) {
        if (service.id === 'lawn-mowing') {
          return {
            content: `For lawn mowing, we recommend:\n\n• **Weekly** during peak growing season (spring/summer)\n• **Bi-weekly** for slower growth periods or budget-conscious customers\n• **One-time** cuts are also available\n\nWe can start within a few days of receiving your request!`,
            quickReplies: ['Get a Quote', 'What\'s included?', 'Service Areas'],
            newContext: { lastTopic: 'timing' }
          };
        }
        return {
          content: `For ${service.name}, timing depends on the scope of work. After assessing your property, we'll provide a detailed timeline.\n\n**General turnaround:**\n• Quote: Within 24 hours\n• Scheduling: Usually within a few days\n• Project completion: Varies by scope\n\nWant to get the process started?`,
          quickReplies: ['Get a Quote', 'Contact Us', 'Learn More'],
          newContext: { lastTopic: 'timing' }
        };
      }
    }

    // If asking what's included with context
    if (/what('s| is)? included|what do (you|I) get|comes with/i.test(lowerText) && context.lastService) {
      const service = services.find(s => s.id === context.lastService);
      if (service) {
        return {
          content: `**What's included with ${service.name}:**\n\n${service.features.map(f => `✓ ${f}`).join('\n')}\n\nWould you like a quote for this service?`,
          quickReplies: ['Get a Quote', 'Other Services', 'Contact Us'],
          links: [{ text: 'Full Details', url: service.link }],
          newContext: { lastTopic: 'service-details' }
        };
      }
    }

    // If asking "can you" questions about capabilities
    if (questionType === 'capability') {
      // Check if asking about a specific task
      if (/can you (come|do|help|handle|take care)/i.test(lowerText)) {
        // Try to find what they're asking about
        const matchedService = findMatchingService(lowerText);
        if (matchedService) {
          return {
            content: `Yes, we can definitely help with **${matchedService.name}**!\n\n${matchedService.shortDesc}\n\nWould you like more details or a free quote?`,
            quickReplies: ['Get a Quote', 'Tell me more', 'Other Services'],
            links: [{ text: 'Learn More', url: matchedService.link }],
            newContext: { lastService: matchedService.id, lastTopic: 'service' }
          };
        }
        // Generic capability response
        return {
          content: `We offer a wide range of landscaping services! Tell me what you need help with and I'll let you know if it's something we can do.\n\n**Our main services:**\n${services.map(s => `• ${s.name}`).join('\n')}\n\nWhat specifically are you looking for?`,
          quickReplies: services.slice(0, 4).map(s => s.name),
          newContext: { lastTopic: 'services' }
        };
      }
    }

    return null;
  };

  // Check if user wants to go back or see menu
  const wantsMenu = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const menuPatterns = [
      /\b(menu|start over|go back|main|home|beginning)\b/i,
      /\bback to (start|beginning|menu)\b/i,
      /\bstart\s*over\b/i
    ];
    return menuPatterns.some(pattern => pattern.test(lowerText));
  };

  // Find the best matching service based on user input (excluding already mentioned ones if asking for others)
  const findMatchingService = (text: string, excludeServices: string[] = []) => {
    const lowerText = correctSpelling(text.toLowerCase());

    // Don't match if the query is too vague (just "service" or "services" without specifics)
    if (/^(what|your|the|all|list)?\s*(service|services|offerings?)\s*\??$/i.test(lowerText)) {
      return null;
    }

    // Don't match generic questions about services
    if (/what.*(service|offer|do|provide)/i.test(lowerText) && !/tree|lawn|mow|hardscap|cleanup|design|care|patio|mulch|trim|prune/i.test(lowerText)) {
      return null;
    }

    let bestMatch = null;
    let bestScore = 0;

    for (const service of services) {
      // Skip excluded services
      if (excludeServices.includes(service.id)) continue;

      const nameMatch = textMatches(text, [service.name]);
      const keywordMatch = textMatches(text, service.keywords);
      const score = Math.max(nameMatch.score, keywordMatch.score);

      // Require a higher score (0.7) for better accuracy
      if (score > bestScore && score > 0.7) {
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
      if (match.score > bestScore && match.score > 0.6) {
        bestScore = match.score;
        bestMatch = faq;
      }
    }

    return bestMatch;
  };

  // Check if user is asking about a specific area
  const findMatchingArea = (text: string) => {
    const lowerText = text.toLowerCase();
    return serviceAreas.find(area => {
      const areaLower = area.toLowerCase();
      // Use word boundary matching to avoid partial matches
      const regex = new RegExp(`\\b${areaLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(lowerText);
    });
  };

  // Get services the user hasn't asked about yet
  const getOtherServices = (excludeIds: string[]) => {
    return services.filter(s => !excludeIds.includes(s.id));
  };

  // Main response generation logic with context awareness
  const generateResponse = (userMessage: string): {
    content: string;
    quickReplies?: string[];
    links?: { text: string; url: string }[];
    newContext?: Partial<ConversationContext>;
  } => {
    // Apply spell correction
    const correctedMessage = correctSpelling(userMessage);
    const lowerMessage = correctedMessage.toLowerCase().trim();

    // === CHECK FOR CONTEXTUAL FOLLOW-UP (pronouns, "it", "that", etc.) ===
    if (usesPronounReference(lowerMessage) && (context.lastService || context.lastTopic)) {
      const contextualResponse = getContextualFollowUp(lowerMessage);
      if (contextualResponse) {
        return contextualResponse;
      }
    }

    // === CHECK FOR INFERRED INTENT (problem descriptions) ===
    const inferredIntent = inferIntent(lowerMessage);
    if (inferredIntent) {
      switch (inferredIntent) {
        case 'lawn-problem':
          return {
            content: `I hear you - lawn issues can be frustrating! Based on what you're describing, it could be a few things:\n\n• **Brown/dead patches** → May need fertilization, aeration, or overseeding\n• **Thin/patchy grass** → Overseeding and proper lawn care program\n• **Weeds taking over** → Weed control treatments\n• **General decline** → Soil testing and customized treatment plan\n\nWould you like a free consultation? We can assess your lawn and recommend the right solution!`,
            quickReplies: ['Get a Free Consultation', 'Lawn Care Services', 'Contact Us'],
            links: [{ text: 'View Lawn Care', url: '/services/lawn-care' }],
            newContext: { lastTopic: 'lawn-problem' }
          };
        case 'overgrown':
          return {
            content: `No worries - we can get that under control! For overgrown lawns, we typically:\n\n1. Do an initial cut at a higher setting to avoid shocking the grass\n2. Follow up with a regular-height cut\n3. Edge and trim everything professionally\n4. Blow all debris clean\n\nWant me to set up a quote? We can usually get there within a few days!`,
            quickReplies: ['Get a Quote', 'View Lawn Mowing', 'Call Us'],
            links: [{ text: 'Lawn Mowing Service', url: '/services/lawn-mowing' }],
            newContext: { lastTopic: 'overgrown', lastService: 'lawn-mowing' }
          };
        case 'no-time':
          return {
            content: `Totally understand - life gets busy! That's exactly why we're here.\n\n**Our hassle-free service includes:**\n• Weekly or bi-weekly mowing (your choice)\n• No contracts - cancel anytime\n• You don't need to be home\n• We handle everything: mowing, edging, trimming, blowing\n\nMany of our customers are busy professionals who just want a great lawn without the work. Ready to get started?`,
            quickReplies: ['Get a Quote', 'View Services', 'Call Us'],
            newContext: { lastTopic: 'convenience' }
          };
        case 'new-home':
          return {
            content: `Congratulations on the new home! 🏠 We'd love to help you get settled.\n\n**We can help with:**\n• One-time cleanup to get things in shape\n• Regular mowing to maintain the lawn\n• Landscape design if you want to make changes\n• Tree trimming or removal if needed\n\nWhat does the yard currently look like? That'll help me point you in the right direction!`,
            quickReplies: ['Get a Quote', 'View Services', 'Seasonal Cleanup'],
            newContext: { lastTopic: 'new-home' }
          };
        case 'referral':
          return {
            content: `That's great to hear - we love referrals from happy customers! Thank you for giving us a try.\n\nI'd be happy to help you with any of our services:\n• Lawn mowing\n• Lawn care (fertilization, aeration)\n• Tree service\n• Landscape design\n• Hardscaping\n• Seasonal cleanups\n\nWhat are you looking for, or would you like a free quote?`,
            quickReplies: ['Get a Quote', 'View Services', 'Contact Us'],
            newContext: { lastTopic: 'referral' }
          };
        case 'improve':
          return {
            content: `Great goal! There are several ways to boost your property's appearance:\n\n**Quick wins:**\n• Fresh mulch in the beds\n• Clean lawn edges\n• Trimmed hedges and shrubs\n\n**Bigger projects:**\n• New plantings or flower beds\n• Landscape redesign\n• Hardscaping (patio, walkway)\n\nWould you like a free consultation to discuss ideas?`,
            quickReplies: ['Get a Consultation', 'Landscape Design', 'View All Services'],
            links: [{ text: 'Landscape Design', url: '/services/landscape-design' }],
            newContext: { lastTopic: 'improve' }
          };
      }
    }

    // === HANDLE VAGUE QUESTIONS ===
    if (isVagueQuestion(lowerMessage) && !context.lastTopic) {
      return {
        content: randomChoice(responseVariations.clarify) + `\n\n**I can help with:**\n• Getting a free quote\n• Learning about our services\n• Checking if we service your area\n• Answering specific questions\n\nWhat would you like to know?`,
        quickReplies: quickReplies.greeting,
        newContext: { lastTopic: 'clarify' }
      };
    }

    // === HANDLE "OTHER SERVICES" / "WHAT ELSE" REQUESTS ===
    if (isAskingForOthers(lowerMessage)) {
      const otherServices = getOtherServices(context.mentionedServices);

      if (otherServices.length === 0) {
        return {
          content: `You've already heard about all our services! Would you like a quote for any of them, or do you have specific questions?`,
          quickReplies: ['Get a Quote', 'FAQs', 'Contact Us'],
          newContext: { lastTopic: 'services' }
        };
      }

      if (otherServices.length === services.length) {
        // Haven't mentioned any specific services yet
        return {
          content: `We offer a full range of landscaping services:\n\n${services.map(s => `**${s.name}** - ${s.shortDesc}`).join('\n\n')}\n\nWhich one would you like to learn more about?`,
          quickReplies: services.slice(0, 4).map(s => s.name),
          links: [{ text: 'View All Services', url: '/services' }],
          newContext: { lastTopic: 'services' }
        };
      }

      // Show services they haven't asked about
      return {
        content: `Here are our other services:\n\n${otherServices.map(s => `**${s.name}** - ${s.shortDesc}`).join('\n\n')}\n\nWant details on any of these?`,
        quickReplies: otherServices.slice(0, 4).map(s => s.name),
        links: [{ text: 'View All Services', url: '/services' }],
        newContext: { lastTopic: 'services' }
      };
    }

    // === HANDLE MENU / START OVER ===
    if (wantsMenu(lowerMessage)) {
      return {
        content: `No problem! Here's what I can help you with:\n\n• **Get a Quote** - Free estimates within 24 hours\n• **Our Services** - Mowing, hardscaping, trees, and more\n• **Service Areas** - Montgomery County, PA\n• **Contact Us** - Phone, email, and hours\n\nWhat would you like to know about?`,
        quickReplies: quickReplies.greeting,
        newContext: { lastTopic: 'menu', lastService: null }
      };
    }

    // === GREETINGS ===
    if (/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|what'?s\s*up|sup)[\s!.?]*$/i.test(lowerMessage)) {
      return {
        content: randomChoice(responseVariations.greeting),
        quickReplies: quickReplies.greeting,
        newContext: { lastTopic: 'greeting' }
      };
    }

    // === THANKS ===
    if (/^(thank|thanks|thx|ty|appreciate|helpful)[\s!.?]*$/i.test(lowerMessage) ||
        /thank\s*(you|u)|appreciate\s*(it|that)/i.test(lowerMessage)) {
      return {
        content: randomChoice(responseVariations.thanks),
        quickReplies: ['Get a Quote', 'View Services', 'Contact Info'],
        newContext: { lastTopic: 'thanks' }
      };
    }

    // === GOODBYE ===
    if (/^(bye|goodbye|see\s*you|later|talk\s*soon|take\s*care|cya)[\s!.?]*$/i.test(lowerMessage)) {
      return {
        content: randomChoice(responseVariations.bye),
        quickReplies: ['Get a Quote', 'Contact Info'],
        newContext: { lastTopic: 'bye' }
      };
    }

    // === YES/AFFIRMATIVE RESPONSES (context-dependent) ===
    if (/^(yes|yeah|yep|yup|sure|ok|okay|please|definitely|absolutely)[\s!.?]*$/i.test(lowerMessage)) {
      // If we just talked about a service, offer a quote for it
      if (context.lastService) {
        const service = services.find(s => s.id === context.lastService);
        if (service) {
          return {
            content: `Great! I'll help you get a quote for ${service.name}. Fill out the form and we'll get back to you within 24 hours!`,
            quickReplies: ['Fill out quote form', `Call ${businessInfo.phone}`],
            newContext: { askedForQuote: true }
          };
        }
      }
      // Generic affirmative
      return {
        content: `What would you like to do?\n\n• Get a free quote\n• Learn about our services\n• Check service areas\n• Contact us directly`,
        quickReplies: quickReplies.greeting
      };
    }

    // === NO/NEGATIVE RESPONSES ===
    if (/^(no|nope|nah|not really|i'm good|no thanks|no thank you)[\s!.?]*$/i.test(lowerMessage)) {
      return {
        content: `No problem! Is there anything else I can help you with? Feel free to ask about our services, pricing, or service areas.`,
        quickReplies: ['View Services', 'Service Areas', 'Contact Info'],
        newContext: { lastTopic: 'declined' }
      };
    }

    // === ALL SERVICES / WHAT DO YOU OFFER (must come before specific service check) ===
    if (/\b(what|your|all|list|show)\b.*(service|offer|do|provide)/i.test(lowerMessage) ||
        /^services?\??$/i.test(lowerMessage) ||
        /\b(services?|offerings?)\b/i.test(lowerMessage) && !/tree|lawn|mow|hardscap|cleanup|design|care/i.test(lowerMessage)) {
      return {
        content: `We offer a full range of landscaping services:\n\n${services.map(s => `**${s.name}** - ${s.shortDesc}`).join('\n\n')}\n\nWhich service would you like to learn more about?`,
        quickReplies: quickReplies.services.slice(0, 4),
        links: [{ text: 'View All Services', url: '/services' }],
        newContext: { lastTopic: 'services' }
      };
    }

    // === QUOTE REQUEST ===
    if (/\b(quote|estimate|price|pricing|cost|how\s*much|book|schedule|appointment|get\s*started|sign\s*up)\b/i.test(lowerMessage)) {
      // Check if asking about a specific service
      const service = findMatchingService(lowerMessage);
      if (service) {
        return {
          content: `Great choice! I'd love to help you get a quote for **${service.name}**.\n\n${service.shortDesc}\n\nWould you like to fill out a quick quote form? We typically respond within 24 hours!`,
          quickReplies: ['Yes, get a quote', `Call ${businessInfo.phone}`, 'Learn more first'],
          links: [{ text: 'View Service Details', url: service.link }],
          newContext: { lastTopic: 'quote', lastService: service.id, mentionedServices: [...context.mentionedServices, service.id] }
        };
      }
      return {
        content: `Awesome! I can help you get a free quote. Which service are you interested in?\n\n${services.map(s => `• **${s.name}**`).join('\n')}\n\nOr fill out a general quote form and tell us what you need!`,
        quickReplies: ['Fill out quote form', ...services.slice(0, 3).map(s => s.name)],
        newContext: { lastTopic: 'quote', askedForQuote: true }
      };
    }

    // === SPECIFIC SERVICE INQUIRY (only if they mention a specific service keyword) ===
    const matchedService = findMatchingService(lowerMessage);
    if (matchedService) {
      const newMentioned = context.mentionedServices.includes(matchedService.id)
        ? context.mentionedServices
        : [...context.mentionedServices, matchedService.id];

      return {
        content: `**${matchedService.name}**\n\n${matchedService.fullDesc}\n\n**What's included:**\n${matchedService.features.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\nWould you like a free quote for this service?`,
        quickReplies: ['Get a Quote', 'Other Services', 'Contact Us'],
        links: [{ text: 'Learn More', url: matchedService.link }],
        newContext: {
          lastTopic: 'service',
          lastService: matchedService.id,
          mentionedServices: newMentioned
        }
      };
    }

    // === SERVICE AREA CHECK ===
    const matchedArea = findMatchingArea(lowerMessage);
    if (matchedArea) {
      return {
        content: `Yes! We proudly serve **${matchedArea}** and the surrounding area. We'd be happy to provide a free estimate for your property!\n\nWould you like to request a quote?`,
        quickReplies: ['Get a Quote', 'View All Areas', 'View Services'],
        newContext: { lastTopic: 'area' }
      };
    }

    // === GENERAL AREA QUESTION ===
    if (/\b(area|location|where|service\s*area|do\s*you\s*(come|go|serve)|cover|zip|neighborhood|near|nearby)\b/i.test(lowerMessage) &&
        !/other|else|different/i.test(lowerMessage)) {
      return {
        content: `We service the greater Montgomery County, PA area including:\n\n${serviceAreas.map(a => `• ${a}`).join('\n')}\n\nDon't see your area? Give us a call at ${businessInfo.phone} - we may still be able to help!`,
        quickReplies: ['Get a Quote', 'Contact Us', 'View Services'],
        newContext: { lastTopic: 'area' }
      };
    }

    // === CONTACT INFO ===
    if (/\b(contact|phone|call|email|reach|talk\s*to|speak|human|person|someone|representative)\b/i.test(lowerMessage)) {
      return {
        content: `Here's how to reach us:\n\n📞 **Phone:** ${businessInfo.phone}\n📧 **Email:** ${businessInfo.email}\n🕐 **Hours:** ${businessInfo.hours}\n📍 **Location:** ${businessInfo.location}\n\nWe respond to all inquiries within 24 hours!`,
        quickReplies: [`Call ${businessInfo.phone}`, 'Get a Quote', 'View Services'],
        links: [
          { text: 'Facebook', url: businessInfo.social.facebook },
          { text: 'Instagram', url: businessInfo.social.instagram }
        ],
        newContext: { lastTopic: 'contact' }
      };
    }

    // === HOURS ===
    if (/\b(hour|hours|open|available|when)\b/i.test(lowerMessage) &&
        !/appointment|book|schedule/i.test(lowerMessage)) {
      return {
        content: `We're available **${businessInfo.hours}**!\n\nCall us anytime at ${businessInfo.phone} or leave a message and we'll respond within 24 hours.`,
        quickReplies: ['Get a Quote', 'Contact Info', 'View Services'],
        newContext: { lastTopic: 'hours' }
      };
    }

    // === PAYMENT ===
    if (/\b(pay|payment|accept|venmo|zelle|cash|check|credit|card|apple\s*pay|cashapp|invoice|bill|billing)\b/i.test(lowerMessage)) {
      const paymentList = paymentMethods.map(p => `• **${p.name}** - ${p.description}`).join('\n');
      return {
        content: `We accept multiple payment options:\n\n${paymentList}\n\n**No contracts required!** Pay-as-you-go with no cancellation fees.`,
        quickReplies: ['Get a Quote', 'View Services', 'Contact Us'],
        newContext: { lastTopic: 'payment' }
      };
    }

    // === ABOUT / COMPANY ===
    if (/\b(about|who\s*(are|is)|company|team|owner|founded|history|background|story)\b/i.test(lowerMessage)) {
      return {
        content: `**About Brighton Road Landscaping**\n\n${teamInfo.description}\n\n**Our Team:**\n${teamInfo.members.map(m => `• ${m.name} - ${m.role}`).join('\n')}\n\n**Why customers choose us:**\n${keySellingPoints.slice(0, 5).map(p => `• ${p}`).join('\n')}`,
        quickReplies: ['Get a Quote', 'View Services', 'See Reviews'],
        links: [{ text: 'About Us', url: '/about' }],
        newContext: { lastTopic: 'about' }
      };
    }

    // === REVIEWS / TESTIMONIALS ===
    if (/\b(review|reviews|testimonial|rating|reputation|trust|reliable|good)\b/i.test(lowerMessage) &&
        /\b(review|testimonial|rating|reputation|customer|client)\b/i.test(lowerMessage)) {
      return {
        content: `We're proud of our reputation!\n\n⭐ **${businessInfo.rating}** average rating\n👥 **${businessInfo.customerCount}** happy customers\n📅 **${businessInfo.yearsExperience}** in business\n\nCheck out what our customers are saying!`,
        quickReplies: ['Get a Quote', 'View Services', 'Contact Us'],
        links: [
          { text: 'Read Testimonials', url: '/testimonials' },
          { text: 'Google Reviews', url: businessInfo.social.google }
        ],
        newContext: { lastTopic: 'reviews' }
      };
    }

    // === EMPLOYMENT ===
    if (/\b(hiring|job|jobs|work\s*(for|with)|employment|position|career|apply|join\s*(team|us|you))\b/i.test(lowerMessage)) {
      return {
        content: `We're always looking for hardworking team members!\n\n**What we offer:**\n• Flexible scheduling\n• Competitive pay\n• Great team environment\n• No experience necessary - we'll train you!\n\nApply now on our Join page!`,
        quickReplies: ['Apply Now', 'Contact Us'],
        links: [{ text: 'Join Our Team', url: '/join' }],
        newContext: { lastTopic: 'jobs' }
      };
    }

    // === FAQ MATCHING ===
    const matchedFaq = findMatchingFaq(lowerMessage);
    if (matchedFaq) {
      return {
        content: `**${matchedFaq.question}**\n\n${matchedFaq.answer}`,
        quickReplies: ['More Questions', 'Get a Quote', 'View Services'],
        links: [{ text: 'View All FAQs', url: '/#faq' }],
        newContext: { lastTopic: 'faq' }
      };
    }

    // === EMERGENCY / URGENT ===
    if (/\b(emergency|urgent|asap|fallen\s*tree|storm\s*damage|dangerous|help)\b/i.test(lowerMessage) &&
        /\b(tree|storm|damage|fallen|down|emergency|urgent)\b/i.test(lowerMessage)) {
      return {
        content: `For urgent situations like storm damage or fallen trees, please call us directly at **${businessInfo.phone}**.\n\nWe offer emergency response and will prioritize getting your property safe!`,
        quickReplies: [`Call ${businessInfo.phone}`, 'Get a Quote'],
        newContext: { lastTopic: 'emergency' }
      };
    }

    // === COMPARISON / WHY CHOOSE ===
    if (/\b(why|better|best|compare|different|special|unique|choose|pick)\b/i.test(lowerMessage) &&
        /\b(you|brighton|company|landscap)/i.test(lowerMessage)) {
      return {
        content: `**Why Choose Brighton Road Landscaping?**\n\n${keySellingPoints.map(p => `✓ ${p}`).join('\n')}\n\nWe're a local, family-owned business that treats every property like our own!`,
        quickReplies: ['Get a Quote', 'View Services', 'See Reviews'],
        newContext: { lastTopic: 'why-us' }
      };
    }

    // === HANDLE FOLLOW-UP QUESTIONS ===
    if (isFollowUp(lowerMessage) && context.lastService) {
      const service = services.find(s => s.id === context.lastService);
      if (service) {
        return {
          content: `Here's more about **${service.name}**:\n\n${service.fullDesc}\n\n**Full list of features:**\n${service.features.map(f => `• ${f}`).join('\n')}\n\nReady for a free quote?`,
          quickReplies: ['Get a Quote', 'Other Services', 'Contact Us'],
          links: [{ text: 'View Full Details', url: service.link }],
          newContext: { lastTopic: 'service-details' }
        };
      }
    }

    // === HANDLE SIMPLE PRICING QUESTIONS ("how much", "price?", "cost?") ===
    if (/^(how much|price|cost|pricing)\??$/i.test(lowerMessage)) {
      if (context.lastService) {
        const service = services.find(s => s.id === context.lastService);
        if (service) {
          return {
            content: `For **${service.name}**, pricing depends on your property size and specific requirements.\n\nThe best way to get an accurate price is a free quote - we'll assess your needs and provide a detailed estimate within 24 hours. No obligation!`,
            quickReplies: ['Get a Quote', 'What\'s included?', 'Other Services'],
            newContext: { lastTopic: 'pricing' }
          };
        }
      }
      return {
        content: `Our pricing varies by service and property size. To give you an accurate quote, I'll need to know:\n\n• What service you're interested in\n• Your property address\n\nWhich service would you like a quote for?`,
        quickReplies: services.slice(0, 4).map(s => s.name),
        newContext: { lastTopic: 'pricing' }
      };
    }

    // === HANDLE "WHEN" / SCHEDULING QUESTIONS ===
    if (/^when\??$/i.test(lowerMessage) || /^(when can|how soon)\b/i.test(lowerMessage)) {
      return {
        content: `Great question! Here's our typical timeline:\n\n• **Quote:** Within 24 hours\n• **Scheduling:** Usually within a few days\n• **Service completion:** Depends on the project\n\nFor recurring services like lawn mowing, we offer flexible weekly or bi-weekly schedules.\n\nWould you like to get started with a quote?`,
        quickReplies: ['Get a Quote', 'View Services', 'Contact Us'],
        newContext: { lastTopic: 'scheduling' }
      };
    }

    // === HANDLE "WHERE" / LOCATION QUESTIONS ===
    if (/^where\??$/i.test(lowerMessage)) {
      return {
        content: `We're based in **${businessInfo.location}** and service the greater Montgomery County, PA area!\n\n**Areas we serve:**\n${serviceAreas.slice(0, 8).map(a => `• ${a}`).join('\n')}\n\n...and more! Tell me your location and I'll confirm if we can help.`,
        quickReplies: ['Get a Quote', 'View All Areas', 'Contact Us'],
        newContext: { lastTopic: 'location' }
      };
    }

    // === HANDLE "WHY" / RECOMMENDATION QUESTIONS ===
    if (/^why\??$/i.test(lowerMessage) || /^why should/i.test(lowerMessage)) {
      return {
        content: `**Why choose Brighton Road Landscaping?**\n\n${keySellingPoints.slice(0, 6).map(p => `✓ ${p}`).join('\n')}\n\nWe're a local, family-owned business that genuinely cares about making your property look great!`,
        quickReplies: ['Get a Quote', 'View Services', 'See Reviews'],
        newContext: { lastTopic: 'why-us' }
      };
    }

    // === SIMPLE QUESTIONS ===
    if (/^(how|what|when|where|why|can|do|does|is|are)\s/i.test(lowerMessage)) {
      // Try to match a FAQ
      const faqMatch = findMatchingFaq(lowerMessage);
      if (faqMatch) {
        return {
          content: `${faqMatch.answer}`,
          quickReplies: ['More Questions', 'Get a Quote', 'View Services'],
          newContext: { lastTopic: 'faq' }
        };
      }
    }

    // === HANDLE CONFUSION/CLARIFICATION REQUESTS ===
    if (/^\?+$|^what\??$|^huh\??$|^come again\??$|^sorry\??$|^i don'?t understand/i.test(lowerMessage)) {
      if (context.lastBotResponse) {
        return {
          content: `No problem! Let me try to explain differently.\n\n**I was talking about:** ${context.lastTopic || 'our services'}\n\n**What would help you most?**\n• Learn about our services\n• Get a free quote\n• Talk to our team directly\n\nJust let me know what you're looking for!`,
          quickReplies: ['View Services', 'Get a Quote', `Call ${businessInfo.phone}`],
          newContext: { lastTopic: 'clarify' }
        };
      }
      return {
        content: `No problem! Let me help you get started.\n\n**What can I help you with today?**\n• Information about our landscaping services\n• Getting a free quote\n• Checking if we service your area\n• Speaking with our team directly\n\nJust tell me what you need!`,
        quickReplies: quickReplies.greeting,
        newContext: { lastTopic: 'greeting' }
      };
    }

    // === HANDLE COMPARISON QUESTIONS ("vs", "or", "difference") ===
    if (/\b(vs\.?|versus|or|difference between|compared to)\b/i.test(lowerMessage)) {
      // Check if comparing services
      const matchedServices: typeof services = [];
      for (const service of services) {
        if (textMatches(lowerMessage, [service.name]).matched ||
            textMatches(lowerMessage, service.keywords.slice(0, 5)).matched) {
          matchedServices.push(service);
        }
      }

      if (matchedServices.length >= 2) {
        const [s1, s2] = matchedServices;
        return {
          content: `Great question! Here's a quick comparison:\n\n**${s1.name}:**\n${s1.shortDesc}\n\n**${s2.name}:**\n${s2.shortDesc}\n\nBoth are popular services! Would you like more details on either, or a quote for one?`,
          quickReplies: [s1.name, s2.name, 'Get a Quote'],
          newContext: { lastTopic: 'comparison' }
        };
      }
    }

    // === HANDLE NEGATION ("not", "don't want", "without") ===
    if (/\b(not|don'?t|no|without|never|can'?t)\s+(want|need|like|interested)/i.test(lowerMessage)) {
      return {
        content: `No problem at all! Let me know what you ARE looking for and I'll point you in the right direction.\n\n**Popular requests:**\n• Regular lawn mowing\n• One-time cleanup\n• Tree trimming\n• Landscape redesign\n\nWhat sounds closer to what you need?`,
        quickReplies: ['Lawn Mowing', 'Seasonal Cleanup', 'Tree Service', 'Something else'],
        newContext: { lastTopic: 'alternative' }
      };
    }

    // === FALLBACK - SMART CONTEXTUAL HANDLER ===
    // Try to understand what they might be asking based on key words
    const words = lowerMessage.split(/\s+/);

    // Check if they mentioned any partial service keywords
    for (const service of services) {
      for (const keyword of service.keywords) {
        if (words.some(w => w.length > 3 && keyword.includes(w))) {
          return {
            content: `Are you asking about **${service.name}**?\n\n${service.shortDesc}\n\nI can tell you more about this service or help you get a quote!`,
            quickReplies: ['Yes, tell me more', 'No, something else', 'Get a Quote'],
            links: [{ text: 'View Service', url: service.link }],
            newContext: { lastTopic: 'clarify-service', lastService: service.id, pendingClarification: true }
          };
        }
      }
    }

    // If we have recent context, offer to continue that conversation
    if (context.lastService) {
      const service = services.find(s => s.id === context.lastService);
      if (service) {
        setLastUnknownQuestion(userMessage);
        return {
          content: `I'm not quite sure what you mean. Are you still asking about **${service.name}**, or is this something different?\n\n**I can help you with:**\n• More info about ${service.name}\n• Getting a quote\n• Looking at other services\n• Answering specific questions`,
          quickReplies: [`More about ${service.name}`, 'Something else', 'Get a Quote', 'View All Services'],
          newContext: { lastTopic: 'clarify', pendingClarification: true }
        };
      }
    }

    // General fallback
    setLastUnknownQuestion(userMessage);
    return {
      content: `I want to make sure I understand correctly. Could you rephrase that or tell me more about what you need?\n\n**I'm great at helping with:**\n• Getting quotes for our services\n• Explaining what we offer\n• Checking if we service your area\n• Answering questions about pricing, scheduling, etc.\n\nOr I can send your question directly to our team!`,
      quickReplies: ['View Services', 'Get a Quote', 'Send my question', `Call ${businessInfo.phone}`],
      newContext: { lastTopic: 'unknown', pendingClarification: true }
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

    // Update message count
    setContext(prev => ({ ...prev, messageCount: prev.messageCount + 1 }));

    // Check for special triggers
    const lowerText = messageText.toLowerCase();

    // Quote form trigger - direct to Jobber quote page
    if (lowerText.includes('fill out') ||
        lowerText === 'yes, get a quote' ||
        lowerText === 'get a quote' ||
        lowerText === 'get a free quote' ||
        lowerText === 'get a free consultation' ||
        lowerText === 'fill out quote form') {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsTyping(false);

      const serviceNote = context.lastService
        ? ` for **${services.find(s => s.id === context.lastService)?.name || 'your service'}**`
        : '';

      addMessage(
        `Perfect! I'll take you to our quote form${serviceNote}. Fill it out and we'll get back to you within 24 hours with your free estimate!`,
        'bot',
        {
          quickReplies: ['View Services', 'Contact Info'],
          links: [{ text: 'Open Quote Form', url: '/quote' }]
        }
      );

      // Open quote page
      window.open('/quote', '_blank');
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

    // Update context with enhanced tracking
    setContext(prev => {
      const newTopic = response.newContext?.lastTopic || prev.lastTopic;
      const recentTopics = newTopic && newTopic !== prev.lastTopic
        ? [newTopic, ...prev.recentTopics.slice(0, 4)]
        : prev.recentTopics;

      return {
        ...prev,
        ...response.newContext,
        recentTopics,
        lastQuestion: messageText,
        lastBotResponse: response.content,
        pendingClarification: response.newContext?.pendingClarification || false,
        conversationPhase: prev.messageCount > 5 ? 'interested' : prev.conversationPhase
      };
    });

    addMessage(response.content, 'bot', {
      quickReplies: response.quickReplies,
      links: response.links,
      context: response.newContext?.lastTopic || undefined
    });
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
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
          source: 'Chatbot Question (Brighton)'
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
          <p className="text-sm text-gray-700 font-medium">Need help? Chat with Brighton!</p>
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
              <h3 className="font-bold text-lg">Brighton</h3>
              <p className="text-green-100 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                Online • Ask me anything
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
            {messages.length > 0 && messages[messages.length - 1].quickReplies && !showQuestionForm && (
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
