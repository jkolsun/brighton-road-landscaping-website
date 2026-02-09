// Brighton Road Landscaping - Comprehensive Knowledge Base
// This file contains ALL information about the company for the AI chatbot

export const businessInfo = {
  name: "Brighton Road Landscaping LLC",
  tagline: "A Mowed Lawn for a Reasonable Price",
  phone: "(484) 535-1936",
  phoneLink: "tel:+14845351936",
  email: "brightonroadlandscaping@gmail.com",
  hours: "24/7, 7 days a week",
  location: "Plymouth Meeting, PA",
  founded: "2022",
  founderStory: "Brighton Road Landscaping was founded in 2022 by Declan O'Brien when he was just a rising freshman in high school. What started as a small neighborhood lawn mowing service has grown into a full-service landscaping company serving the greater Montgomery County area.",
  responseTime: "Within 24 hours",
  formspreeEndpoint: "https://formspree.io/f/myzpnepd",
  formspreeQuestionEndpoint: "https://formspree.io/f/myzpnepd",
  customerCount: "100+",
  rating: "5.0 stars",
  yearsExperience: "3+ years",
  social: {
    facebook: "https://www.facebook.com/BrightonRoadLandscaping",
    instagram: "https://www.instagram.com/brightonroadlandscaping/",
    linkedin: "https://www.linkedin.com/in/brighton-road-landscaping-0b6b45378/",
    google: "https://www.google.com/search?q=brighton+road+landscaping"
  }
};

export const serviceAreas = [
  "Plymouth Meeting",
  "Conshohocken",
  "Blue Bell",
  "King of Prussia",
  "Audubon",
  "Lafayette Hill",
  "Fort Washington",
  "Whitemarsh",
  "Norristown",
  "Ambler",
  "Flourtown",
  "Oreland",
  "Wyndmoor",
  "Chestnut Hill",
  "Greater Montgomery County, PA"
];

export const paymentMethods = [
  { name: "Cash", description: "Pay in person after service" },
  { name: "Check", description: "Make payable to Brighton Road Landscaping LLC" },
  { name: "Venmo", description: "Quick and easy mobile payment" },
  { name: "Zelle", description: "Direct bank transfer" },
  { name: "Cash App", description: "Mobile payment option" },
  { name: "Apple Pay", description: "Contactless payment" },
  { name: "Monthly billing", description: "Available for recurring services" }
];

export const services = [
  {
    id: "lawn-mowing",
    name: "Lawn Mowing",
    shortDesc: "Weekly and bi-weekly cutting services",
    fullDesc: "Professional lawn mowing including edging, trimming, and blowing. No contracts, pay-as-you-go. Commercial and residential properties.",
    features: [
      "Weekly or bi-weekly mowing schedules",
      "Professional edging along walkways and driveways",
      "String trimming around obstacles, trees, and fences",
      "Blowing debris off all hard surfaces",
      "Bagging or mulching options available",
      "Commercial and residential properties"
    ],
    keywords: ["mow", "mowing", "cut", "cutting", "grass", "lawn cutting", "yard", "weekly", "biweekly", "overgrown", "tall grass", "long grass"],
    priceRange: "Varies by lawn size - contact for free quote",
    frequency: "Weekly recommended during growing season, bi-weekly available",
    link: "/services/lawn-mowing"
  },
  {
    id: "hardscaping",
    name: "Hardscaping",
    shortDesc: "Custom patios, walkways, and retaining walls",
    fullDesc: "Expert design and installation of patios, walkways, retaining walls, stairs, and fireplaces. Using quality pavers, bricks, and stones with lifetime warranty on workmanship.",
    features: [
      "Custom patio design and installation",
      "Walkways and pathways",
      "Retaining walls for erosion control and aesthetics",
      "Outdoor stairs and steps",
      "Fire pits and fireplaces",
      "Drainage solutions",
      "Premium pavers, bricks, and natural stone"
    ],
    keywords: ["hardscape", "hardscaping", "patio", "patios", "walkway", "walkways", "retaining wall", "pavers", "stone", "brick", "fireplace", "fire pit", "stairs", "steps", "outdoor living", "backyard", "entertaining", "outdoor space"],
    priceRange: "Custom quotes based on project scope",
    warranty: "Lifetime warranty on workmanship",
    link: "/services/hardscaping"
  },
  {
    id: "tree-service",
    name: "Tree Service",
    shortDesc: "Professional trimming, pruning, and removal",
    fullDesc: "Complete tree care including trimming, pruning, safe removal, storm damage response, and disease treatment. We handle trees of all sizes safely and efficiently.",
    features: [
      "Professional tree trimming and shaping",
      "Crown reduction and thinning",
      "Deadwood removal",
      "Complete tree removal (all sizes)",
      "Stump grinding available",
      "Storm damage cleanup and emergency response",
      "Tree health assessment and disease treatment",
      "Hazardous tree evaluation"
    ],
    keywords: ["tree", "trees", "trimming", "trim", "pruning", "prune", "removal", "remove", "stump", "branch", "branches", "dead", "storm", "fallen", "hazard", "disease", "dying", "limb", "limbs", "overgrown tree", "big tree"],
    priceRange: "Varies by tree size and service - free estimates",
    emergency: "Storm damage response available",
    link: "/services/tree-service"
  },
  {
    id: "landscape-design",
    name: "Landscape Design & Installation",
    shortDesc: "3D design with custom plant selection",
    fullDesc: "Full landscape design using 3D visualization software, custom plant selection native to the Montgomery County environment, and complete installation including excavation, planting, and mulching.",
    features: [
      "3D design visualization before installation",
      "Custom plant selection for your property",
      "Native and drought-resistant options",
      "Complete bed preparation and excavation",
      "Professional planting",
      "Premium mulch installation",
      "Landscape lighting design",
      "Seasonal color planning"
    ],
    keywords: ["landscape", "landscaping", "design", "plants", "planting", "flowers", "shrubs", "bushes", "garden", "bed", "beds", "mulch", "installation", "renovate", "renovation", "beautify", "curb appeal", "front yard", "makeover", "redo", "new plants"],
    priceRange: "Custom design packages available",
    process: "Consultation → 3D Design → Approval → Installation",
    link: "/services/landscape-design"
  },
  {
    id: "lawn-care",
    name: "Lawn Care",
    shortDesc: "Irrigation, fertilization, and seasonal treatments",
    fullDesc: "Comprehensive lawn care programs including irrigation system installation and maintenance, fertilization, aeration, overseeding, and seasonal treatments to keep your lawn healthy and green.",
    features: [
      "Irrigation system installation",
      "Sprinkler repair and maintenance",
      "Spring start-up services",
      "Winter shut-down and winterization",
      "Custom fertilization programs",
      "Core aeration for root health",
      "Overseeding for thick, lush lawns",
      "Weed control treatments",
      "Grub and pest control",
      "Soil testing and amendments"
    ],
    keywords: ["lawn care", "lawncare", "fertilizer", "fertilization", "fertilize", "aeration", "aerate", "overseed", "overseeding", "irrigation", "sprinkler", "sprinklers", "water", "watering", "weed", "weeds", "grub", "pest", "green", "healthy", "thick", "brown spots", "dead spots", "patchy", "thin grass"],
    priceRange: "Seasonal programs and one-time services available",
    seasons: "Spring through Fall treatments",
    link: "/services/lawn-care"
  },
  {
    id: "seasonal-cleanups",
    name: "Seasonal Cleanups",
    shortDesc: "Spring and fall cleanup services",
    fullDesc: "Complete seasonal cleanups to prepare your property for each season. Spring cleanup gets your yard ready for growth, while fall cleanup prepares it for winter.",
    features: [
      "Spring debris removal",
      "Fall leaf removal (multiple visits available)",
      "Stick and branch cleanup",
      "Bed cleanup and edging",
      "Shrub and ornamental grass cutback",
      "Gutter cleaning",
      "Mulch refresh",
      "Hauling services included"
    ],
    keywords: ["cleanup", "clean up", "cleanups", "leaves", "leaf", "fall", "autumn", "spring", "seasonal", "debris", "sticks", "branches", "gutter", "gutters", "messy yard", "yard waste", "mess"],
    priceRange: "One-time or recurring cleanup packages",
    timing: "Spring (March-May) and Fall (October-December)",
    link: "/services/seasonal-cleanups"
  }
];

// Comprehensive FAQ database - covers every likely customer question
export const faqs = [
  // Service Area Questions
  {
    category: "service-area",
    question: "What areas do you service?",
    answer: `We proudly serve Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, Lafayette Hill, Fort Washington, Whitemarsh, and the greater Montgomery County, PA area. If you're unsure if we service your area, just ask!`,
    keywords: ["area", "areas", "service", "location", "where", "come to", "cover", "serve"]
  },
  {
    category: "service-area",
    question: "Do you service my neighborhood?",
    answer: `We service most of Montgomery County, PA including Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, and surrounding areas. Tell me your location and I'll confirm!`,
    keywords: ["neighborhood", "town", "city", "zip", "zipcode"]
  },

  // Pricing Questions
  {
    category: "pricing",
    question: "How much does lawn mowing cost?",
    answer: `Lawn mowing prices vary based on your lawn size, terrain, and frequency. We offer competitive rates with no contracts. The best way to get an accurate price is to request a free quote - we'll come out and give you an exact price within 24 hours!`,
    keywords: ["price", "pricing", "cost", "much", "rate", "rates", "charge", "fee", "expensive", "cheap", "affordable"]
  },
  {
    category: "pricing",
    question: "Do you offer free estimates?",
    answer: `Yes! All our estimates are completely free with no obligation. We typically respond within 24 hours and can often provide same-day quotes. Just share your address and the service you need!`,
    keywords: ["free", "estimate", "estimates", "quote", "quotes", "obligation"]
  },
  {
    category: "pricing",
    question: "Do you have package deals or discounts?",
    answer: `We offer competitive pricing and can create custom packages for multiple services. Recurring customers often receive preferred rates. Contact us to discuss your needs and we'll put together the best value package for you.`,
    keywords: ["package", "packages", "deal", "deals", "discount", "discounts", "bundle", "save", "savings"]
  },

  // Scheduling Questions
  {
    category: "scheduling",
    question: "How often should I mow my lawn?",
    answer: `During the growing season (spring through fall), we recommend weekly mowing for the healthiest lawn. Bi-weekly is also an option for slower-growing lawns or budget-conscious customers. We'll help you determine the best schedule for your property.`,
    keywords: ["often", "frequency", "weekly", "biweekly", "schedule", "how often"]
  },
  {
    category: "scheduling",
    question: "Can I schedule a specific day?",
    answer: `We try to accommodate day preferences when possible. While we can't always guarantee exact times, we work with you to find a schedule that works. Regular customers get consistent weekly slots.`,
    keywords: ["specific", "day", "time", "when", "schedule", "appointment", "book", "available", "availability"]
  },
  {
    category: "scheduling",
    question: "Do I need to be home during service?",
    answer: `No, you don't need to be home! As long as we have access to the property, we'll take care of everything. Many of our customers are at work when we service their lawns. We'll text or call when we're finished.`,
    keywords: ["home", "present", "there", "access", "gate", "key", "let in"]
  },
  {
    category: "scheduling",
    question: "What if it rains on my scheduled day?",
    answer: `If rain prevents us from completing your service, we'll reschedule as soon as conditions allow - typically the next dry day. We'll communicate any changes via text or phone call.`,
    keywords: ["rain", "rains", "weather", "storm", "wet", "reschedule", "cancel"]
  },
  {
    category: "scheduling",
    question: "How quickly can you start?",
    answer: `We can often start within a few days of receiving your request! For urgent needs, give us a call and we'll do our best to accommodate you as soon as possible.`,
    keywords: ["quickly", "soon", "fast", "start", "begin", "asap", "urgent", "right away", "immediately"]
  },

  // Payment Questions
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer: `We accept Cash, Check, Venmo, Zelle, Cash App, and Apple Pay. Monthly billing is also available for recurring services. We're flexible and want to make payment easy for you!`,
    keywords: ["payment", "pay", "accept", "venmo", "zelle", "cash", "check", "credit", "card", "apple pay", "cashapp"]
  },
  {
    category: "payment",
    question: "When is payment due?",
    answer: `For one-time services, payment is due upon completion. For recurring services, we offer weekly, bi-weekly, or monthly billing options. We'll work with you to find the most convenient arrangement.`,
    keywords: ["due", "when pay", "invoice", "bill", "billing"]
  },

  // Contract Questions
  {
    category: "contracts",
    question: "Do I need to sign a contract?",
    answer: `No contracts required! We offer flexible, pay-as-you-go services with no cancellation fees. You can adjust or cancel anytime - we believe in earning your business with great service, not locking you in.`,
    keywords: ["contract", "contracts", "sign", "agreement", "commitment", "lock", "cancel", "cancellation"]
  },
  {
    category: "contracts",
    question: "What if I need to cancel?",
    answer: `No problem at all! We have no cancellation fees. Just let us know and we'll remove you from the schedule. If you ever want to come back, we'd be happy to have you!`,
    keywords: ["cancel", "stop", "pause", "hold", "skip", "end", "quit"]
  },

  // Service Details
  {
    category: "service-details",
    question: "What's included in lawn mowing?",
    answer: `Every lawn mowing service includes: mowing at the proper height, professional edging along walkways and driveways, string trimming around obstacles and trees, and blowing all debris off hard surfaces. Your lawn will look professionally maintained!`,
    keywords: ["included", "include", "comes with", "what do you do", "edging", "trimming", "blowing"]
  },
  {
    category: "service-details",
    question: "Do you bag or mulch grass clippings?",
    answer: `We typically mulch clippings, which is actually healthier for your lawn as it returns nutrients to the soil. However, we can bag clippings upon request if you prefer. Just let us know your preference!`,
    keywords: ["bag", "bagging", "mulch", "mulching", "clippings", "grass clippings", "leave"]
  },
  {
    category: "service-details",
    question: "What equipment do you use?",
    answer: `We use professional-grade equipment including Scag zero-turn mowers for efficiency, Dewalt push mowers for detailed areas, and Echo outdoor power equipment for trimming and blowing. Quality equipment means quality results!`,
    keywords: ["equipment", "mower", "mowers", "tools", "machine", "brand", "scag", "echo", "dewalt"]
  },

  // Business Questions
  {
    category: "business",
    question: "Are you licensed and insured?",
    answer: `Yes! Brighton Road Landscaping LLC is fully licensed and insured. You can trust that your property is protected and you're working with a legitimate, professional business.`,
    keywords: ["license", "licensed", "insured", "insurance", "legitimate", "legal", "registered", "llc"]
  },
  {
    category: "business",
    question: "How long have you been in business?",
    answer: `Brighton Road Landscaping was founded in 2022 by Declan O'Brien. We've grown from a small neighborhood service to serving 100+ happy customers across Montgomery County with a perfect 5.0 star rating!`,
    keywords: ["long", "years", "experience", "established", "founded", "history", "background", "started", "new"]
  },
  {
    category: "business",
    question: "Who owns Brighton Road Landscaping?",
    answer: `Brighton Road Landscaping is a family-owned business founded by Declan O'Brien in 2022 when he was a rising freshman. The team includes Declan, his brothers Aiden and Tristan, and Jared Kolsun. We're young, hardworking, and passionate about what we do!`,
    keywords: ["owner", "owners", "who", "founded", "family", "run", "operates"]
  },

  // Reviews & Trust
  {
    category: "trust",
    question: "Do you have reviews?",
    answer: `Absolutely! We have 100+ happy customers and maintain a 5.0 star rating. Check out our testimonials page to see what our customers say, or find us on Google and Facebook!`,
    keywords: ["review", "reviews", "testimonial", "testimonials", "rating", "ratings", "feedback", "reputation"]
  },
  {
    category: "trust",
    question: "Can I see examples of your work?",
    answer: `Yes! Check out our Instagram (@brightonroadlandscaping) and Facebook page for photos of our recent projects. We're proud of our work and love showing it off!`,
    keywords: ["example", "examples", "photos", "pictures", "portfolio", "work", "projects", "before", "after"]
  },
  {
    category: "trust",
    question: "Are you any good?",
    answer: `We take great pride in our work! With 100+ happy customers, a 5.0 star rating, and years of experience, we consistently deliver quality results. Check our testimonials to see what customers say about us!`,
    keywords: ["good", "quality", "reliable", "trust", "recommend", "worth"]
  },

  // Specific Services
  {
    category: "specific",
    question: "Do you remove leaves?",
    answer: `Yes! Leaf removal is part of our fall cleanup services. We offer single cleanups or multiple visits throughout the fall season to keep your property looking great. We haul away all debris.`,
    keywords: ["leaf", "leaves", "fall cleanup", "autumn"]
  },
  {
    category: "specific",
    question: "Do you install mulch?",
    answer: `Absolutely! We offer mulch installation as part of our landscape services and spring cleanups. We use premium mulch and can handle beds of any size. Request a quote and let us know how many beds you have!`,
    keywords: ["mulch", "mulching", "beds", "flower beds"]
  },
  {
    category: "specific",
    question: "Can you fix my sprinklers?",
    answer: `Yes! We offer irrigation system installation, repair, and maintenance. This includes spring start-ups, winterization, head replacements, and troubleshooting. Let us know what issues you're experiencing.`,
    keywords: ["sprinkler", "sprinklers", "irrigation", "water", "watering", "fix", "repair", "broken"]
  },
  {
    category: "specific",
    question: "Do you trim hedges and shrubs?",
    answer: `Yes! Hedge and shrub trimming is available as a standalone service or as part of our cleanup packages. We'll shape them professionally and clean up all the trimmings.`,
    keywords: ["hedge", "hedges", "shrub", "shrubs", "bush", "bushes", "trim", "trimming", "shape", "shaping"]
  },
  {
    category: "specific",
    question: "Can you remove a tree?",
    answer: `Yes, we handle tree removal for trees of all sizes. We also offer stump grinding. Safety is our priority - we have the equipment and expertise to remove trees safely. Get a free quote!`,
    keywords: ["remove tree", "tree removal", "cut down", "take down", "stump", "grind"]
  },
  {
    category: "specific",
    question: "Do you do snow removal?",
    answer: `Our primary focus is landscaping services. For snow removal, we recommend contacting a dedicated snow removal service. However, feel free to reach out and we can discuss options!`,
    keywords: ["snow", "ice", "winter", "plow", "plowing", "shovel", "shoveling", "salt", "salting"]
  },
  {
    category: "specific",
    question: "Can you aerate my lawn?",
    answer: `Yes! Core aeration is one of our lawn care services. It's best done in fall and helps improve root growth, water absorption, and overall lawn health. We recommend combining it with overseeding for best results.`,
    keywords: ["aerate", "aeration", "core", "aerating", "plugs"]
  },
  {
    category: "specific",
    question: "Do you offer fertilization?",
    answer: `Yes! We offer custom fertilization programs tailored to your lawn's needs. This includes seasonal applications from spring through fall to keep your lawn green and healthy.`,
    keywords: ["fertilize", "fertilization", "fertilizer", "feed", "feeding", "nutrients", "green up"]
  },
  {
    category: "specific",
    question: "Can you edge my lawn?",
    answer: `Yes! Edging is included with all our lawn mowing services. We edge along walkways, driveways, and bed lines to give your lawn that crisp, professional look.`,
    keywords: ["edge", "edging", "edges", "border", "clean lines"]
  },
  {
    category: "specific",
    question: "Do you handle weeds?",
    answer: `Yes! We offer weed control as part of our lawn care services. This includes pre-emergent treatments in spring and targeted weed control throughout the season to keep your lawn weed-free.`,
    keywords: ["weed", "weeds", "dandelion", "crabgrass", "clover"]
  },

  // Employment
  {
    category: "employment",
    question: "Are you hiring?",
    answer: `We're always looking for hardworking team members! We offer flexible scheduling, competitive pay, and a great team environment. Visit our Join page to apply - no experience necessary, we'll train you!`,
    keywords: ["hiring", "job", "jobs", "work", "employment", "position", "career", "apply", "application"]
  },

  // Emergency
  {
    category: "emergency",
    question: "Do you handle storm damage?",
    answer: `Yes! We provide storm damage response for fallen trees and branches. Contact us as soon as possible after a storm and we'll prioritize getting your property safe and cleaned up.`,
    keywords: ["storm", "emergency", "fallen", "damage", "urgent", "asap", "down", "dangerous"]
  },

  // Common Problem Scenarios (Vague Questions)
  {
    category: "problems",
    question: "My lawn looks bad",
    answer: `I'm sorry to hear that! There are several things that could help: regular mowing, fertilization, aeration, or overseeding depending on the issue. Would you like to describe what's wrong, or should I get you a free consultation to assess what your lawn needs?`,
    keywords: ["looks bad", "ugly", "terrible", "awful", "dying", "dead", "brown", "yellow", "patchy", "thin", "bare", "sparse"]
  },
  {
    category: "problems",
    question: "I need help with my yard",
    answer: `I'd be happy to help! We offer a full range of services including lawn mowing, lawn care (fertilization, aeration), landscape design, tree service, hardscaping, and seasonal cleanups. What's going on with your yard that you'd like to address?`,
    keywords: ["help", "yard", "need", "want", "looking"]
  },
  {
    category: "problems",
    question: "My grass is overgrown",
    answer: `We can definitely help with that! We offer lawn mowing services to get your grass back under control. For very overgrown lawns, we may need to do an initial cut at a higher setting, then follow up. Want me to set up a quote for you?`,
    keywords: ["overgrown", "too long", "tall", "jungle", "out of control", "neglected"]
  },
  {
    category: "problems",
    question: "Something is wrong with my tree",
    answer: `We can help assess your tree! Our tree service includes health evaluations, disease treatment, trimming, and removal if necessary. Can you describe what you're seeing? Is it dropping leaves, has dead branches, or looks unhealthy?`,
    keywords: ["wrong", "sick", "unhealthy", "problem", "issue", "dying tree", "dead tree"]
  },
  {
    category: "problems",
    question: "I want to improve my curb appeal",
    answer: `Great goal! There are several ways to boost curb appeal: fresh mulch, new plantings, a clean lawn, trimmed hedges, or even hardscaping like a new walkway. Our landscape design service can help create a plan. Would you like a free consultation?`,
    keywords: ["curb appeal", "front yard", "looks better", "improve", "upgrade", "nice", "beautiful", "attractive"]
  },
  {
    category: "problems",
    question: "I'm moving and need the yard cleaned up",
    answer: `We can definitely help get your property ready for sale or move-in! We offer one-time cleanups, lawn mowing, mulching, and more to make your yard look its best. How soon do you need it done?`,
    keywords: ["moving", "selling", "sale", "real estate", "move in", "new house", "new home"]
  },
  {
    category: "problems",
    question: "I don't have time to maintain my lawn",
    answer: `That's exactly why we're here! We offer weekly or bi-weekly lawn mowing with no contracts - we take care of everything so you don't have to. Many of our customers are busy professionals who just want a great-looking lawn without the hassle.`,
    keywords: ["no time", "busy", "don't have time", "can't", "too busy", "hassle", "convenient"]
  },
  {
    category: "problems",
    question: "My old landscaper stopped showing up",
    answer: `That's frustrating! We pride ourselves on reliability - we show up when we say we will and communicate if anything changes. We'd be happy to take over your lawn care. Would you like a quote?`,
    keywords: ["old landscaper", "previous", "stopped", "unreliable", "didn't show", "ghosted", "new landscaper", "switch"]
  },
  {
    category: "problems",
    question: "I just bought a house",
    answer: `Congratulations on the new home! We'd love to help you get your new property in shape. Whether you need regular mowing, a cleanup, new landscaping, or just want to maintain what's there, we can help. What does the yard currently look like?`,
    keywords: ["bought", "new house", "new home", "just moved", "homeowner", "first time"]
  },
  {
    category: "problems",
    question: "My neighbor recommended you",
    answer: `That's great to hear! We love referrals from happy customers. We'd be honored to help you too! What services are you interested in, or would you like to know what we offer?`,
    keywords: ["neighbor", "friend", "recommended", "referred", "heard about", "told me"]
  }
];

// Team member profiles
export const teamInfo = {
  description: "Brighton Road Landscaping is a family-owned business founded in 2022 by Declan O'Brien. Our young, hardworking team is dedicated to providing quality service at reasonable prices. We take pride in our work and treat every property like it's our own.",
  members: [
    {
      name: "Declan O'Brien",
      role: "Co-Owner & Founder",
      bio: "Founded Brighton Road as a rising freshman in high school. Passionate about landscaping and building a business."
    },
    {
      name: "Aiden O'Brien",
      role: "Team Member",
      bio: "Studies at Muhlenberg College. Brings energy and dedication to every job."
    },
    {
      name: "Tristan O'Brien",
      role: "Team Member",
      bio: "High school sophomore contributing to the family business."
    },
    {
      name: "Jared Kolsun",
      role: "Team Member",
      bio: "Penn State student studying Computer Science and Cybersecurity."
    }
  ]
};

// Key selling points for emphasis
export const keySellingPoints = [
  "No contracts, no cancellation fees",
  "24/7 customer support",
  "Free estimates within 24 hours",
  "Flexible scheduling",
  "Competitive, transparent pricing",
  "Young, hardworking team",
  "Licensed and insured",
  "100+ happy customers",
  "5.0 star average rating",
  "Family-owned and operated",
  "Professional equipment",
  "Reliable and dependable"
];

// Quick reply options for different scenarios
export const quickReplies = {
  greeting: ["Get a Free Quote", "View Services", "Service Areas", "Contact Info"],
  services: ["Lawn Mowing", "Hardscaping", "Tree Service", "Landscape Design", "Lawn Care", "Seasonal Cleanups"],
  afterQuote: ["View Services", "Service Areas", "FAQs"],
  afterService: ["Get a Quote", "Other Services", "Contact Info"],
  fallback: ["Get a Quote", "Call Us", "View Services", "FAQs"],
  problem: ["Get a Quote", "Describe the Issue", "Call Us"]
};

// Response variations for more natural conversation
export const responseVariations = {
  greeting: [
    "Hi there! I'm Brighton, your landscaping assistant. How can I help you today?",
    "Hello! I'm Brighton. Thanks for reaching out! What can I do for you?",
    "Hey! I'm Brighton. Great to hear from you - I'm here to help with any landscaping questions!"
  ],
  thanks: [
    "You're welcome! Is there anything else I can help you with?",
    "Happy to help! Let me know if you have any other questions.",
    "Glad I could help! Feel free to ask anything else."
  ],
  bye: [
    "Thanks for chatting! Feel free to reach out anytime. Have a great day!",
    "Take care! We're here whenever you need us.",
    "Goodbye! Don't hesitate to contact us if you have more questions."
  ],
  clarify: [
    "I want to make sure I help you with the right thing. Could you tell me a bit more about what you need?",
    "I'd be happy to help! Can you give me a few more details about what you're looking for?",
    "Let me help you find the right solution. What's going on with your property?"
  ]
};

// Synonyms for better intent matching
export const synonyms: Record<string, string[]> = {
  "price": ["cost", "pricing", "rate", "charge", "fee", "expensive", "cheap", "afford", "budget", "money", "dollar", "pay", "spend"],
  "quote": ["estimate", "bid", "proposal", "pricing", "price out"],
  "mow": ["cut", "mowing", "cutting", "trim lawn", "grass cutting"],
  "schedule": ["book", "appointment", "available", "availability", "when", "time", "day", "set up"],
  "contact": ["call", "phone", "reach", "talk", "speak", "email", "message", "get in touch"],
  "area": ["location", "serve", "service", "come to", "cover", "town", "city", "neighborhood", "zip"],
  "fast": ["quick", "soon", "asap", "urgent", "rush", "emergency", "today", "tomorrow", "right away"],
  "good": ["great", "best", "quality", "professional", "reliable", "trusted", "nice", "excellent"],
  "help": ["assist", "support", "need", "want", "looking for", "question", "fix", "solve"],
  "bad": ["terrible", "awful", "ugly", "poor", "wrong", "issue", "problem", "dead", "dying"],
  "lawn": ["yard", "grass", "turf", "property", "front yard", "back yard", "backyard"]
};

// Vague question patterns that need clarification
export const vaguePatterns = [
  { pattern: /^(help|hey|hi|hello)$/i, needsClarification: true },
  { pattern: /^i need/i, needsClarification: true },
  { pattern: /^can you/i, needsClarification: false },
  { pattern: /^do you/i, needsClarification: false },
  { pattern: /^what about/i, needsClarification: true },
  { pattern: /^how about/i, needsClarification: true },
  { pattern: /^i want/i, needsClarification: true },
  { pattern: /^i have a/i, needsClarification: true },
  { pattern: /^my (lawn|yard|property|grass)/i, needsClarification: true },
  { pattern: /^something/i, needsClarification: true },
  { pattern: /^anything/i, needsClarification: true }
];

// Common misspellings and corrections
export const commonMisspellings: Record<string, string> = {
  "lown": "lawn",
  "gras": "grass",
  "mowwing": "mowing",
  "moweing": "mowing",
  "landscapeing": "landscaping",
  "treee": "tree",
  "triming": "trimming",
  "prunning": "pruning",
  "fertlizer": "fertilizer",
  "fertlize": "fertilize",
  "areation": "aeration",
  "sprinker": "sprinkler",
  "sprinkelers": "sprinklers",
  "hardscape": "hardscaping",
  "pateio": "patio",
  "pateo": "patio",
  "walkeway": "walkway",
  "esitmate": "estimate",
  "qoute": "quote"
};
