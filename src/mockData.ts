import { Session, Update, VenueLocation, FAQ } from './types';

export const SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Registration & Delegate Badge Pickup',
    time: '08:00',
    endTime: '17:00',
    room: 'Hall 1 Lobby',
    venue: 'SMX Convention Center',
    category: ['General'],
    description: 'Pick up your official convention badges and welcome kits. Please bring your registration confirmation email.',
    speakers: [],
    status: 'now'
  },
  {
    id: '2',
    title: "Kiwanis Children's Fund: Impact Seminar",
    time: '09:30',
    endTime: '11:00',
    room: 'Function Room 3',
    venue: 'SMX Convention Center',
    category: ['ASPAC'],
    description: 'Exploring the global impact of the Kiwanis Children\'s Fund and how local clubs can participate.',
    speakers: [
      {
        name: 'Dr. Elena Rodriguez',
        role: 'Chief Sustainability Officer, MetroLink',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ],
    status: 'next',
    isSaved: true
  },
  {
    id: '3',
    title: 'Leadership Strategies for ASPAC Districts',
    time: '11:00',
    endTime: '12:30',
    room: 'Ballroom B',
    venue: 'SMX Convention Center',
    category: ['Leadership'],
    description: 'Strategic planning and leadership development for district governors and officers.',
    speakers: [],
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Opening Ceremony: Future Frontiers',
    time: '08:00',
    endTime: '09:30',
    room: 'Grand Ballroom A',
    venue: 'SMX Convention Center',
    category: ['General', 'Growth'],
    description: 'The official kick-off of the ASPAC 2026 Convention. Welcome to Manila!',
    speakers: [],
  },
  {
    id: '5',
    title: 'Civic Engagement in the Digital Age',
    time: '09:30',
    endTime: '11:00',
    room: 'Meeting Room 402',
    venue: 'SMX Convention Center',
    category: ['ASPAC'],
    description: 'How digital tools are transforming civic participation in the Asia-Pacific region.',
    speakers: [],
    isSaved: true
  },
  {
    id: '6',
    title: 'Masterclass: Sustainable Governance',
    time: '09:30',
    endTime: '11:00',
    room: 'The Lab - Level 2',
    venue: 'SMX Convention Center',
    category: ['Leadership'],
    description: 'Advanced governance models for long-term organizational sustainability.',
    speakers: [],
  },
  {
    id: '7',
    title: 'Impact Workshop: Global Networking',
    time: '11:00',
    endTime: '12:00',
    room: 'Atrium Hall',
    venue: 'SMX Convention Center',
    category: ['SLP', 'Service'],
    description: 'Building meaningful connections across international borders.',
    speakers: [],
  },
  {
    id: '8',
    title: 'The Future of Urban Mobility: Circular Logistics in Megacities',
    time: '09:00',
    endTime: '10:30',
    room: 'Hall 4B',
    venue: 'Sky Pavilion',
    category: ['Sustainable Innovation'],
    description: "As urban populations swell, the traditional linear model of logistics is reaching a breaking point. This session explores how circular economy principles can be integrated into metropolitan delivery networks to reduce carbon footprints by up to 40%. Join our panel of urban planners and technology pioneers as they reveal first-hand data from the Singapore 'Green Pulse' pilot program, demonstrating the ROI of autonomous EV fleets and localized micro-fulfillment hubs.",
    speakers: [
      {
        name: 'Dr. Elena Rodriguez',
        role: 'Chief Sustainability Officer, MetroLink',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        name: 'Marcus Thorne',
        role: 'Head of Urban Logistics, ASPAC Group',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ],
  }
];

export const UPDATES: Update[] = [
  {
    id: 'u1',
    type: 'urgent',
    title: 'Keynote Room Change: Hall C to Grand Ballroom',
    content: 'The afternoon keynote session \"Future of Civic Tech\" has been moved to accommodate higher registration numbers. Please proceed to the 3rd floor Grand Ballroom.',
    time: '14:30 • Today',
    actionLabel: 'View Ballroom Map'
  },
  {
    id: 'u2',
    type: 'info',
    title: 'Shuttle Service Extended',
    content: 'Due to the networking gala, shuttle buses back to partner hotels will run until 11:30 PM tonight. Pickup is at Gate 4.',
    time: '11:15 • Today',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'u3',
    type: 'news',
    title: '2025 Host City Announcement',
    content: 'The ASPAC committee has officially selected Tokyo as the host city for Pulse 2025. Pre-registration for early-bird discounts is now open in the attendee portal.',
    time: '09:00 • Today',
    actionLabel: 'Read the Full Press Release'
  },
  {
    id: 'u4',
    type: 'venue',
    title: 'Wi-Fi Optimization in South Wing',
    content: 'Additional access points have been installed in the South Wing breakout rooms to improve connectivity during workshop sessions.',
    time: 'Yesterday'
  }
];

export const VENUE_LOCATIONS: VenueLocation[] = [
  {
    id: 'v1',
    name: 'Main Plenary',
    floor: 'Floor 2',
    hall: 'Hall A',
    description: 'Keynote speeches, opening ceremonies, and large-scale panels.',
    icon: 'meeting_room'
  },
  {
    id: 'v2',
    name: 'Workshop Room A',
    floor: 'Floor 2',
    hall: 'West',
    description: 'Interactive sessions and specialized training modules.',
    icon: 'architecture'
  },
  {
    id: 'v3',
    name: 'ASPAC Lounge',
    floor: 'Floor 3',
    hall: 'Rooftop',
    description: 'Networking space with refreshments and quiet work zones.',
    icon: 'coffee'
  },
  {
    id: 'v4',
    name: 'Dining Hall',
    floor: 'Floor 1',
    hall: 'Main Hall',
    description: 'Buffet service and casual seating area for conference attendees.',
    icon: 'restaurant'
  },
  {
    id: 'v5',
    name: 'Registration',
    floor: 'Floor 1',
    hall: 'Entrance',
    description: 'Badge collection, event information, and luggage storage.',
    icon: 'how_to_reg'
  },
  {
    id: 'v6',
    name: 'The Studio',
    floor: 'Floor 2',
    hall: 'Hall B',
    description: 'Live demo stage and small-format presentations.',
    icon: 'theater_comedy'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    category: 'General',
    question: 'What is the official Wi-Fi?',
    answer: 'Network: SMX_Convention_Free. No password required.'
  },
  {
    id: 'f2',
    category: 'Dress Code',
    question: 'What is the dress code for the Gala?',
    answer: 'Formal or Traditional National Dress is highly encouraged for the Gala Dinner.'
  },
  {
    id: 'f3',
    category: 'Logistics',
    question: 'How do I get to the venue?',
    answer: 'The SMX Convention Center is located at Mall of Asia Complex. Shuttle buses are available from partner hotels every 30 minutes.'
  },
  {
    id: 'f4',
    category: 'Logistics',
    question: 'What should I bring?',
    answer: 'Please bring your delegate badge (collected at registration), a light jacket (rooms can be cold), and a portable charger.'
  }
];
