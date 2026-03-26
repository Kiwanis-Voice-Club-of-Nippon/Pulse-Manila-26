import { ConventionDay, FAQ, Session, Update, VenueLocation } from './types';

export const CONVENTION_DAYS: ConventionDay[] = [
  {
    id: '2026-03-26',
    shortLabel: 'Thu',
    dayNumber: '26',
    fullLabel: 'Thursday, March 26, 2026',
    homeLabel: 'Arrival Day',
  },
  {
    id: '2026-03-27',
    shortLabel: 'Fri',
    dayNumber: '27',
    fullLabel: 'Friday, March 27, 2026',
    homeLabel: 'Convention Day 1',
  },
  {
    id: '2026-03-28',
    shortLabel: 'Sat',
    dayNumber: '28',
    fullLabel: 'Saturday, March 28, 2026',
    homeLabel: 'Convention Day 2',
  },
  {
    id: '2026-03-29',
    shortLabel: 'Sun',
    dayNumber: '29',
    fullLabel: 'Sunday, March 29, 2026',
    homeLabel: 'Closing Day',
  },
];

export const SESSIONS: Session[] = [
  {
    id: 'registration',
    day: '2026-03-26',
    title: 'Registration and Delegate Badge Pickup',
    time: '08:00',
    endTime: '17:00',
    room: 'Hall 1 Lobby',
    venue: 'SMX Convention Center Manila',
    category: ['General'],
    description:
      'Pick up your delegate badge, printed program, and welcome kit. Please prepare your confirmation message or ID for faster service.',
    speakers: [],
    status: 'now',
  },
  {
    id: 'welcome-briefing',
    day: '2026-03-26',
    title: 'Welcome Briefing for District Delegations',
    time: '09:30',
    endTime: '10:15',
    room: 'Meeting Room 2',
    venue: 'SMX Convention Center Manila',
    category: ['General', 'Highlights'],
    description:
      'A short orientation on venue flow, help desks, translation support, and the most important schedule items for the first day.',
    speakers: [
      {
        name: 'Gov. Maria Lourdes Santos',
        role: 'Host District Chair, Kiwanis ASPAC Manila 2026',
        image:
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
    status: 'next',
  },
  {
    id: 'opening-ceremony',
    day: '2026-03-27',
    title: 'Opening Ceremony and Parade of Nations',
    time: '09:00',
    endTime: '10:30',
    room: 'Grand Ballroom',
    venue: 'SMX Convention Center Manila',
    category: ['General', 'Highlights'],
    description:
      'The official opening of ASPAC Manila 2026 with district introductions, welcome messages, and the Parade of Nations.',
    speakers: [
      {
        name: 'Kiwanis ASPAC Leadership Team',
        role: 'Convention Opening Program',
        image:
          'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
  },
  {
    id: 'club-growth',
    day: '2026-03-27',
    title: 'Club Growth and Member Retention Workshop',
    time: '11:00',
    endTime: '12:00',
    room: 'Function Room 4',
    venue: 'SMX Convention Center Manila',
    category: ['Leadership'],
    description:
      'Practical ideas from district leaders on how to welcome new members, keep clubs active, and simplify follow-through after convention.',
    speakers: [
      {
        name: 'Atty. Kenji Dela Cruz',
        role: 'District Membership Chair',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
    isSaved: true,
  },
  {
    id: 'service-showcase',
    day: '2026-03-27',
    title: 'Service Project Showcase Across ASPAC',
    time: '14:00',
    endTime: '15:15',
    room: 'Ballroom B',
    venue: 'SMX Convention Center Manila',
    category: ['ASPAC', 'Service'],
    description:
      'Delegates from across the region share projects that improved child health, education, and community resilience.',
    speakers: [],
  },
  {
    id: 'slp-spotlight',
    day: '2026-03-28',
    title: 'Service Leadership Programs Spotlight',
    time: '09:00',
    endTime: '10:00',
    room: 'Function Room 2',
    venue: 'SMX Convention Center Manila',
    category: ['Service', 'Highlights'],
    description:
      'A focused session on Key Club, Circle K, and other Service Leadership Programs with examples delegates can bring home.',
    speakers: [],
  },
  {
    id: 'house-of-delegates',
    day: '2026-03-28',
    title: 'ASPAC House of Delegates Session',
    time: '10:30',
    endTime: '12:30',
    room: 'Grand Ballroom',
    venue: 'SMX Convention Center Manila',
    category: ['ASPAC'],
    description:
      'Business session for official delegates including reports, motions, and announcements relevant to district leadership.',
    speakers: [],
    isSaved: true,
  },
  {
    id: 'manila-night',
    day: '2026-03-28',
    title: 'Manila Fellowship Night and Cultural Program',
    time: '19:00',
    endTime: '21:00',
    room: 'SMX Grand Ballroom',
    venue: 'SMX Convention Center Manila',
    category: ['Highlights'],
    description:
      'An evening of fellowship, cultural performances, and district friendship activities. Formal or national dress is welcome.',
    speakers: [],
  },
  {
    id: 'closing',
    day: '2026-03-29',
    title: 'Closing Ceremony and Host Handover',
    time: '10:00',
    endTime: '11:30',
    room: 'Grand Ballroom',
    venue: 'SMX Convention Center Manila',
    category: ['General', 'Highlights'],
    description:
      'Closing remarks, district acknowledgements, and the handover to the next ASPAC host city.',
    speakers: [],
  },
];

export const UPDATES: Update[] = [
  {
    id: 'u1',
    type: 'urgent',
    title: 'Opening Ceremony overflow seating now available',
    content:
      'Delegates may also use Meeting Rooms 1 and 2 for live screen viewing. Ushers are guiding attendees from the main ballroom entrance.',
    time: '7:30 AM • Thu, Mar 26',
    action: {
      label: 'Open venue guide',
      tab: 'venue',
      venueLocationId: 'grand-ballroom',
    },
  },
  {
    id: 'u2',
    type: 'info',
    title: 'Language help desk is open at registration',
    content:
      'English, Filipino, Japanese, and Korean support is available beside the delegate badge counters during peak arrival hours.',
    time: '8:10 AM • Thu, Mar 26',
    action: {
      label: 'See attendee help',
      tab: 'help',
    },
  },
  {
    id: 'u3',
    type: 'venue',
    title: 'Wi-Fi and charging stations ready in the south lobby',
    content:
      'Use network SMX-ASPAC-2026 with password KIWANIS2026. Charging tables are beside the Help Desk near Hall 1 Lobby.',
    time: '8:20 AM • Thu, Mar 26',
    action: {
      label: 'Open help details',
      tab: 'help',
    },
  },
  {
    id: 'u4',
    type: 'news',
    title: 'Tonight’s ASPAC highlights include welcome music and district photos',
    content:
      'The evening welcome block begins after registration day with a short Manila cultural welcome and district group photos in the lobby.',
    time: '9:00 AM • Thu, Mar 26',
    action: {
      label: 'View today’s schedule',
      tab: 'schedule',
    },
  },
];

export const VENUE_LOCATIONS: VenueLocation[] = [
  {
    id: 'registration-desk',
    name: 'Registration and Badge Pickup',
    floor: 'Level 1',
    hall: 'Hall 1 Lobby',
    description:
      'Badge release, printed programs, welcome kits, and the main information point for arriving delegates.',
    note: 'Best first stop for arrivals and anyone needing printed guidance.',
    icon: 'registration',
  },
  {
    id: 'grand-ballroom',
    name: 'Grand Ballroom',
    floor: 'Level 2',
    hall: 'Main Plenary Area',
    description:
      'Opening and closing ceremonies, large plenaries, and the House of Delegates session.',
    note: 'Follow blue overhead signs from the escalators.',
    icon: 'plenary',
  },
  {
    id: 'help-desk',
    name: 'Pulse and Help Desk',
    floor: 'Level 1',
    hall: 'Near Registration',
    description:
      'General questions, language support, lost-and-found guidance, and directions to session rooms.',
    note: 'Look for volunteers in blue ASPAC helper sashes.',
    icon: 'help',
  },
  {
    id: 'first-aid',
    name: 'First Aid and Wellness Room',
    floor: 'Level 1',
    hall: 'South Corridor',
    description:
      'Medical support, wheelchairs, and a quiet seat for delegates who need a short rest.',
    note: 'Ask any usher if you need an escort.',
    icon: 'first-aid',
  },
  {
    id: 'meal-hall',
    name: 'Meal Hall',
    floor: 'Level 2',
    hall: 'Function Hall A',
    description:
      'Lunch service, coffee stations, and afternoon snacks during official break windows.',
    note: 'Bring your badge to help volunteers move lines faster.',
    icon: 'dining',
  },
  {
    id: 'quiet-room',
    name: 'Prayer and Quiet Room',
    floor: 'Level 1',
    hall: 'West Hallway',
    description:
      'A calm room for prayer, quiet reflection, or a few minutes away from the busy main halls.',
    note: 'Please keep phones on silent inside the room.',
    icon: 'quiet',
  },
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Where should I go first when I arrive?',
    answer:
      'Go to Registration and Badge Pickup at Hall 1 Lobby. Staff there can also point you to the Help Desk and the nearest escalator.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Does Pulse replace official convention notices?',
    answer:
      'No. Pulse is a public companion for quick access. Official announcements, on-site signage, and stage notices remain the final source of truth.',
  },
  {
    id: 'faq-3',
    category: 'Venue',
    question: 'Where is the Help Desk?',
    answer:
      'The Help Desk is on Level 1 near Registration. It handles venue directions, simple app help, and language support.',
  },
  {
    id: 'faq-4',
    category: 'Venue',
    question: 'Is there a quiet place to rest or pray?',
    answer:
      'Yes. A Prayer and Quiet Room is open on Level 1 along the west hallway. Volunteers can escort you if needed.',
  },
  {
    id: 'faq-5',
    category: 'Logistics',
    question: 'What Wi-Fi should I use?',
    answer:
      'Use network SMX-ASPAC-2026. The password is KIWANIS2026. Charging tables are beside the Help Desk.',
  },
  {
    id: 'faq-6',
    category: 'Logistics',
    question: 'What should I bring with me each day?',
    answer:
      'Bring your delegate badge, a light jacket for air-conditioned rooms, a portable charger, and any medicine you may need during the day.',
  },
  {
    id: 'faq-7',
    category: 'Dress Code',
    question: 'What is the recommended dress code?',
    answer:
      'Smart business attire is recommended for daytime sessions. For fellowship night, formal wear or national dress is welcome.',
  },
  {
    id: 'faq-8',
    category: 'Language',
    question: 'Is language help available?',
    answer:
      'Yes. English, Filipino, Japanese, and Korean support is available at the Help Desk near Registration during busy delegate hours.',
  },
];
