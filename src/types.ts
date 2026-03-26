export type Tab = 'today' | 'schedule' | 'updates' | 'venue' | 'help';

export type ConventionDayId =
  | '2026-03-26'
  | '2026-03-27'
  | '2026-03-28'
  | '2026-03-29';

export interface ConventionDay {
  id: ConventionDayId;
  shortLabel: string;
  dayNumber: string;
  fullLabel: string;
  homeLabel: string;
}

export interface Speaker {
  name: string;
  role: string;
  image: string;
}

export interface Session {
  id: string;
  day: ConventionDayId;
  title: string;
  time: string;
  endTime: string;
  room: string;
  venue: string;
  category: string[];
  description: string;
  speakers: Speaker[];
  status?: 'now' | 'next';
  isSaved?: boolean;
}

export interface UpdateAction {
  label: string;
  tab: Tab;
  venueLocationId?: string;
}

export interface Update {
  id: string;
  type: 'urgent' | 'info' | 'news' | 'venue';
  title: string;
  content: string;
  time: string;
  action?: UpdateAction;
}

export interface VenueLocation {
  id: string;
  name: string;
  floor: string;
  hall: string;
  description: string;
  note: string;
  icon: 'registration' | 'plenary' | 'help' | 'first-aid' | 'dining' | 'quiet';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Venue' | 'Logistics' | 'Dress Code' | 'Language';
}
