export type Tab = 'today' | 'schedule' | 'updates' | 'venue' | 'more' | 'showcase';

export interface Session {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  duration?: string;
  room: string;
  venue: string;
  category: string[];
  description: string;
  speakers: Speaker[];
  isSaved?: boolean;
  status?: 'now' | 'next' | 'upcoming';
}

export interface Speaker {
  name: string;
  role: string;
  image: string;
}

export interface Update {
  id: string;
  type: 'urgent' | 'info' | 'news' | 'venue';
  title: string;
  content: string;
  time: string;
  image?: string;
  actionLabel?: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  floor: string;
  hall: string;
  description: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Venue' | 'Logistics' | 'Dress Code';
}
