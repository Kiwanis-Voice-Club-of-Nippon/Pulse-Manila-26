export type SourceType = "official_program" | "aspac_highlight" | "manual";

export interface EventRecord {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  timezone: string;
  published: boolean;
}

export interface VenueRecord {
  id: string;
  slug: string;
  name: string;
  address: string;
  notes: string;
  mapUrl?: string;
  published: boolean;
}

export interface RoomRecord {
  id: string;
  slug: string;
  venueId: string;
  name: string;
  floor: string;
  notes: string;
  mapLabel: string;
  published: boolean;
}

export interface SegmentRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
}

export interface TrackRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
}

export interface SessionRecord {
  id: string;
  eventId: string;
  slug: string;
  title: string;
  description: string;
  speakerNames: string[];
  startAt: string;
  endAt: string;
  roomId: string;
  venueId: string;
  trackId: string;
  segmentIds: string[];
  published: boolean;
  featured: boolean;
  sourceType: SourceType;
  externalUrl?: string;
  notes?: string;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  body: string;
  startsAt: string;
  endsAt: string;
  priority: "critical" | "high" | "standard";
  pinned: boolean;
  segmentId?: string;
  published: boolean;
  createdBy: string;
}

export interface ResourceRecord {
  id: string;
  title: string;
  description: string;
  type: "link" | "pdf" | "map";
  url: string;
  segmentId?: string;
  published: boolean;
}

export interface HydratedSession extends SessionRecord {
  dayKey: string;
  dateLabel: string;
  timeLabel: string;
  room: RoomRecord;
  venue: VenueRecord;
  track: TrackRecord;
  segments: SegmentRecord[];
}

export interface HydratedAnnouncement extends AnnouncementRecord {
  segment?: SegmentRecord;
  activeWindow: string;
}

export interface VenueWithRooms extends VenueRecord {
  rooms: Array<
    RoomRecord & {
      sessions: HydratedSession[];
    }
  >;
  sessions: HydratedSession[];
}

export interface ScheduleFilters {
  day?: string;
  q?: string;
  segment?: string;
  track?: string;
  room?: string;
}

export const pulseEvent: EventRecord = {
  id: "event-kiwanis-manila-2026",
  slug: "kiwanis-international-convention-manila-2026",
  name: "Kiwanis International Convention",
  city: "Manila",
  country: "Philippines",
  startDate: "2026-06-25",
  endDate: "2026-06-27",
  timezone: "Asia/Manila",
  published: true,
};

export const segments: SegmentRecord[] = [
  {
    id: "segment-aspac",
    slug: "aspac",
    name: "ASPAC",
    description: "Asia-Pacific delegates and region-specific convention highlights.",
    color: "#0c7a60",
  },
  {
    id: "segment-general",
    slug: "general",
    name: "General",
    description: "Core convention programming for all attendees.",
    color: "#2f3f63",
  },
  {
    id: "segment-slp",
    slug: "slp",
    name: "SLP / Youth",
    description: "Student Leadership Programs and youth-facing sessions.",
    color: "#a34f12",
  },
  {
    id: "segment-governance",
    slug: "governance",
    name: "Governance",
    description: "Board, voting, and formal governance sessions.",
    color: "#7440a8",
  },
  {
    id: "segment-leadership",
    slug: "leadership",
    name: "Leadership",
    description: "Club, district, and service leadership development.",
    color: "#1e6aa6",
  },
];

export const tracks: TrackRecord[] = [
  {
    id: "track-plenary",
    slug: "plenary",
    name: "Plenary",
    description: "Main-stage sessions and convention-wide moments.",
    color: "#2f3f63",
  },
  {
    id: "track-service-impact",
    slug: "service-impact",
    name: "Service Impact",
    description: "Programs, projects, and community outcomes.",
    color: "#0c7a60",
  },
  {
    id: "track-leadership-labs",
    slug: "leadership-labs",
    name: "Leadership Labs",
    description: "Practical workshops for club and district leaders.",
    color: "#1e6aa6",
  },
  {
    id: "track-governance",
    slug: "governance",
    name: "Governance",
    description: "Formal governance and business sessions.",
    color: "#7440a8",
  },
  {
    id: "track-fellowship",
    slug: "fellowship",
    name: "Fellowship",
    description: "Reception and networking-style convention moments.",
    color: "#a34f12",
  },
];

export const venues: VenueRecord[] = [
  {
    id: "venue-picc",
    slug: "picc",
    name: "Philippine International Convention Center",
    address: "Vicente Sotto St., Pasay, Metro Manila",
    notes:
      "Main convention venue. Expect security screening at the front entrance and longer walks between the plenary hall and breakout rooms.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Philippine+International+Convention+Center",
    published: true,
  },
  {
    id: "venue-manila-hotel",
    slug: "manila-hotel",
    name: "The Manila Hotel",
    address: "One Rizal Park, Ermita, Manila",
    notes:
      "Overflow meetings and smaller delegation gatherings. Allow 20 to 25 minutes travel time from PICC during peak traffic.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Manila+Hotel+Manila",
    published: true,
  },
];

export const rooms: RoomRecord[] = [
  {
    id: "room-plenary-hall",
    slug: "plenary-hall",
    venueId: "venue-picc",
    name: "Plenary Hall",
    floor: "Ground Level",
    notes: "Main-stage seating. Use the west lobby entry for the fastest access.",
    mapLabel: "PICC West Lobby",
    published: true,
  },
  {
    id: "room-reception",
    slug: "reception-hall",
    venueId: "venue-picc",
    name: "Reception Hall",
    floor: "Ground Level",
    notes: "Large forum room next to registration and information counters.",
    mapLabel: "PICC South Wing",
    published: true,
  },
  {
    id: "room-forum-b",
    slug: "forum-b",
    venueId: "venue-picc",
    name: "Forum B",
    floor: "Upper Level",
    notes: "Smaller workshop room. Seating is classroom style.",
    mapLabel: "PICC Forum Level",
    published: true,
  },
  {
    id: "room-ballroom",
    slug: "rizal-ballroom",
    venueId: "venue-manila-hotel",
    name: "Rizal Ballroom",
    floor: "Lobby Level",
    notes: "Hotel ballroom for delegation and hospitality sessions.",
    mapLabel: "Manila Hotel Lobby",
    published: true,
  },
];

export const sessions: SessionRecord[] = [
  {
    id: "session-opening-ceremony",
    eventId: pulseEvent.id,
    slug: "opening-ceremony-and-flag-procession",
    title: "Opening Ceremony and Flag Procession",
    description:
      "Convention welcome, opening procession, and official launch of the Manila program.",
    speakerNames: ["Kiwanis International Leadership"],
    startAt: "2026-06-25T09:00:00+08:00",
    endAt: "2026-06-25T10:30:00+08:00",
    roomId: "room-plenary-hall",
    venueId: "venue-picc",
    trackId: "track-plenary",
    segmentIds: ["segment-general"],
    published: true,
    featured: true,
    sourceType: "official_program",
    externalUrl: "https://www.kiwanis.org/",
  },
  {
    id: "session-aspac-briefing",
    eventId: pulseEvent.id,
    slug: "aspac-delegation-briefing",
    title: "ASPAC Delegation Briefing",
    description:
      "Region-specific logistics, delegation reminders, and priority moments for ASPAC attendees.",
    speakerNames: ["ASPAC Convention Leads"],
    startAt: "2026-06-25T11:00:00+08:00",
    endAt: "2026-06-25T11:45:00+08:00",
    roomId: "room-reception",
    venueId: "venue-picc",
    trackId: "track-leadership-labs",
    segmentIds: ["segment-aspac", "segment-leadership"],
    published: true,
    featured: true,
    sourceType: "aspac_highlight",
    notes: "Recommended first stop for delegation leaders and ASPAC volunteers.",
  },
  {
    id: "session-service-showcase",
    eventId: pulseEvent.id,
    slug: "service-project-showcase",
    title: "Service Project Showcase",
    description:
      "Rapid presentations highlighting scalable club and district service models from around the world.",
    speakerNames: ["Club Leaders from Asia-Pacific", "Global Service Panelists"],
    startAt: "2026-06-25T13:30:00+08:00",
    endAt: "2026-06-25T14:45:00+08:00",
    roomId: "room-reception",
    venueId: "venue-picc",
    trackId: "track-service-impact",
    segmentIds: ["segment-general", "segment-aspac"],
    published: true,
    featured: false,
    sourceType: "official_program",
  },
  {
    id: "session-slp-huddle",
    eventId: pulseEvent.id,
    slug: "slp-youth-leadership-huddle",
    title: "SLP Youth Leadership Huddle",
    description:
      "Fast-moving peer session for student leaders with orientation and connection points for the week.",
    speakerNames: ["SLP Coordinators"],
    startAt: "2026-06-25T15:15:00+08:00",
    endAt: "2026-06-25T16:00:00+08:00",
    roomId: "room-forum-b",
    venueId: "venue-picc",
    trackId: "track-leadership-labs",
    segmentIds: ["segment-slp", "segment-leadership"],
    published: true,
    featured: true,
    sourceType: "manual",
  },
  {
    id: "session-governor-elect",
    eventId: pulseEvent.id,
    slug: "governor-elect-governance-briefing",
    title: "Governor-Elect Governance Briefing",
    description:
      "Key governance calendar items, voting sequence, and operational checkpoints for district leaders.",
    speakerNames: ["International Governance Team"],
    startAt: "2026-06-26T08:30:00+08:00",
    endAt: "2026-06-26T09:30:00+08:00",
    roomId: "room-forum-b",
    venueId: "venue-picc",
    trackId: "track-governance",
    segmentIds: ["segment-governance", "segment-leadership"],
    published: true,
    featured: false,
    sourceType: "official_program",
  },
  {
    id: "session-membership-panel",
    eventId: pulseEvent.id,
    slug: "membership-innovation-panel",
    title: "Membership Innovation Panel",
    description:
      "Practical tactics for club growth, retention, and member activation in challenging local contexts.",
    speakerNames: ["District Membership Chairs", "Club Growth Moderators"],
    startAt: "2026-06-26T10:15:00+08:00",
    endAt: "2026-06-26T11:15:00+08:00",
    roomId: "room-reception",
    venueId: "venue-picc",
    trackId: "track-service-impact",
    segmentIds: ["segment-general", "segment-leadership"],
    published: true,
    featured: false,
    sourceType: "official_program",
  },
  {
    id: "session-aspac-lunch",
    eventId: pulseEvent.id,
    slug: "aspac-priority-lunch-and-photo-call",
    title: "ASPAC Priority Lunch and Photo Call",
    description:
      "Delegation lunch window with a photo call, key reminders, and anchor times for the afternoon program.",
    speakerNames: ["ASPAC District Governors"],
    startAt: "2026-06-26T12:15:00+08:00",
    endAt: "2026-06-26T13:15:00+08:00",
    roomId: "room-ballroom",
    venueId: "venue-manila-hotel",
    trackId: "track-fellowship",
    segmentIds: ["segment-aspac"],
    published: true,
    featured: true,
    sourceType: "aspac_highlight",
    notes: "Business attire recommended for the delegation photo call.",
  },
  {
    id: "session-leadership-lab",
    eventId: pulseEvent.id,
    slug: "club-leadership-lab",
    title: "Club Leadership Lab",
    description:
      "Hands-on working session for presidents and incoming officers on communication cadence, handover, and follow-through.",
    speakerNames: ["Facilitated by Kiwanis Leadership Educators"],
    startAt: "2026-06-26T14:00:00+08:00",
    endAt: "2026-06-26T15:15:00+08:00",
    roomId: "room-forum-b",
    venueId: "venue-picc",
    trackId: "track-leadership-labs",
    segmentIds: ["segment-leadership", "segment-general"],
    published: true,
    featured: false,
    sourceType: "manual",
  },
  {
    id: "session-impact-awards",
    eventId: pulseEvent.id,
    slug: "community-impact-awards",
    title: "Community Impact Awards",
    description:
      "Convention recognition for standout projects and measurable community outcomes across districts.",
    speakerNames: ["Awards Committee"],
    startAt: "2026-06-27T09:30:00+08:00",
    endAt: "2026-06-27T10:30:00+08:00",
    roomId: "room-plenary-hall",
    venueId: "venue-picc",
    trackId: "track-plenary",
    segmentIds: ["segment-general"],
    published: true,
    featured: true,
    sourceType: "official_program",
  },
  {
    id: "session-youth-showcase",
    eventId: pulseEvent.id,
    slug: "youth-service-showcase",
    title: "Youth Service Showcase",
    description:
      "Short presentations from SLP and youth-led projects with tactics other districts can adapt quickly.",
    speakerNames: ["SLP Student Delegates"],
    startAt: "2026-06-27T11:00:00+08:00",
    endAt: "2026-06-27T11:45:00+08:00",
    roomId: "room-reception",
    venueId: "venue-picc",
    trackId: "track-service-impact",
    segmentIds: ["segment-slp", "segment-general"],
    published: true,
    featured: false,
    sourceType: "manual",
  },
  {
    id: "session-closing-plenary",
    eventId: pulseEvent.id,
    slug: "closing-plenary-and-next-steps",
    title: "Closing Plenary and Next Steps",
    description:
      "Closing remarks, final recognitions, and forward-looking action points after Manila.",
    speakerNames: ["Kiwanis International Officers"],
    startAt: "2026-06-27T15:00:00+08:00",
    endAt: "2026-06-27T16:30:00+08:00",
    roomId: "room-plenary-hall",
    venueId: "venue-picc",
    trackId: "track-plenary",
    segmentIds: ["segment-general", "segment-leadership"],
    published: true,
    featured: true,
    sourceType: "official_program",
  },
];

export const announcements: AnnouncementRecord[] = [
  {
    id: "announcement-hotline",
    title: "Pulse complements official KI communication",
    body:
      "Use Pulse for fast mobile access to schedules, rooms, and updates. Always defer to official Kiwanis announcements for authoritative program changes.",
    startsAt: "2026-06-20T08:00:00+08:00",
    endsAt: "2026-06-28T22:00:00+08:00",
    priority: "high",
    pinned: true,
    published: true,
    createdBy: "admin-demo",
  },
  {
    id: "announcement-registration",
    title: "Registration opens at 07:30 on Day 1",
    body:
      "Arrive early at the PICC south lobby if you still need badge pickup. Allow extra time for security screening.",
    startsAt: "2026-06-24T18:00:00+08:00",
    endsAt: "2026-06-25T12:00:00+08:00",
    priority: "critical",
    pinned: true,
    published: true,
    createdBy: "admin-demo",
  },
  {
    id: "announcement-aspac-photos",
    title: "ASPAC delegation photo call moves to 12:30",
    body:
      "Meet inside Rizal Ballroom by 12:20. Pulse will keep the ASPAC highlights list updated if the timing shifts again.",
    startsAt: "2026-06-26T09:00:00+08:00",
    endsAt: "2026-06-26T14:00:00+08:00",
    priority: "high",
    pinned: false,
    segmentId: "segment-aspac",
    published: true,
    createdBy: "admin-demo",
  },
];

export const resources: ResourceRecord[] = [
  {
    id: "resource-disclaimer",
    title: "Official Convention Site",
    description: "Reference source for official convention updates and authoritative program information.",
    type: "link",
    url: "https://www.kiwanis.org/",
    published: true,
  },
  {
    id: "resource-venue-map",
    title: "PICC Venue Map",
    description: "Map lookup shortcut for the main convention venue.",
    type: "map",
    url: "https://www.google.com/maps/search/?api=1&query=Philippine+International+Convention+Center",
    published: true,
  },
];

const segmentMap = new Map(segments.map((segment) => [segment.id, segment]));
const trackMap = new Map(tracks.map((track) => [track.id, track]));
const venueMap = new Map(venues.map((venue) => [venue.id, venue]));
const roomMap = new Map(rooms.map((room) => [room.id, room]));

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: pulseEvent.timezone,
  weekday: "long",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: pulseEvent.timezone,
  hour: "numeric",
  minute: "2-digit",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: pulseEvent.timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formatDayKey(input: string | Date) {
  return shortDateFormatter.format(typeof input === "string" ? new Date(input) : input);
}

function formatDayLabel(dayKey: string) {
  return dayFormatter.format(new Date(`${dayKey}T12:00:00+08:00`));
}

function formatTimeLabel(startAt: string, endAt: string) {
  return `${timeFormatter.format(new Date(startAt))} - ${timeFormatter.format(new Date(endAt))}`;
}

const hydratedSessions: HydratedSession[] = sessions
  .filter((session) => session.published)
  .map((session) => {
    const room = roomMap.get(session.roomId);
    const venue = venueMap.get(session.venueId);
    const track = trackMap.get(session.trackId);
    const relatedSegments = session.segmentIds
      .map((segmentId) => segmentMap.get(segmentId))
      .filter((segment): segment is SegmentRecord => Boolean(segment));

    if (!room || !venue || !track) {
      throw new Error(`Missing relational data for session ${session.id}`);
    }

    const dayKey = formatDayKey(session.startAt);

    return {
      ...session,
      room,
      venue,
      track,
      segments: relatedSegments,
      dayKey,
      dateLabel: formatDayLabel(dayKey),
      timeLabel: formatTimeLabel(session.startAt, session.endAt),
    };
  })
  .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

const hydratedAnnouncements: HydratedAnnouncement[] = announcements
  .filter((announcement) => announcement.published)
  .map((announcement) => ({
    ...announcement,
    segment: announcement.segmentId ? segmentMap.get(announcement.segmentId) : undefined,
    activeWindow: `${timeFormatter.format(new Date(announcement.startsAt))} to ${timeFormatter.format(
      new Date(announcement.endsAt),
    )}`,
  }))
  .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

const scheduleDays = Array.from(new Set(hydratedSessions.map((session) => session.dayKey))).sort();

export function listScheduleDays() {
  return scheduleDays.map((dayKey) => ({
    value: dayKey,
    label: formatDayLabel(dayKey),
  }));
}

export function getConventionActiveDay(now = new Date()) {
  const currentDay = formatDayKey(now);
  if (currentDay < pulseEvent.startDate) {
    return pulseEvent.startDate;
  }

  if (currentDay > pulseEvent.endDate) {
    return pulseEvent.endDate;
  }

  return currentDay;
}

export function getPublishedSessions() {
  return hydratedSessions;
}

export function getSessionBySlug(slug: string) {
  return hydratedSessions.find((session) => session.slug === slug);
}

export function getSessionsByDay(day: string) {
  return hydratedSessions.filter((session) => session.dayKey === day);
}

export function filterSessions(filters: ScheduleFilters) {
  const query = filters.q?.trim().toLowerCase();

  return hydratedSessions.filter((session) => {
    if (filters.day && session.dayKey !== filters.day) {
      return false;
    }

    if (filters.segment && !session.segments.some((segment) => segment.slug === filters.segment)) {
      return false;
    }

    if (filters.track && session.track.slug !== filters.track) {
      return false;
    }

    if (filters.room && session.room.slug !== filters.room) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      session.title,
      session.description,
      session.speakerNames.join(" "),
      session.room.name,
      session.venue.name,
      session.track.name,
      session.segments.map((segment) => segment.name).join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getAspacHighlights() {
  return hydratedSessions.filter(
    (session) =>
      session.sourceType === "aspac_highlight" ||
      session.segments.some((segment) => segment.slug === "aspac"),
  );
}

export function getPublishedAnnouncements() {
  return hydratedAnnouncements;
}

export function getVenueDetails(): VenueWithRooms[] {
  return venues
    .filter((venue) => venue.published)
    .map((venue) => {
      const venueSessions = hydratedSessions.filter((session) => session.venue.id === venue.id);
      return {
        ...venue,
        rooms: rooms
          .filter((room) => room.venueId === venue.id && room.published)
          .map((room) => ({
            ...room,
            sessions: venueSessions.filter((session) => session.room.id === room.id),
          })),
        sessions: venueSessions,
      };
    });
}

export function getVenueBySlug(slug: string) {
  return getVenueDetails().find((venue) => venue.slug === slug);
}

export function getRelatedSessions(session: HydratedSession) {
  return hydratedSessions.filter(
    (candidate) =>
      candidate.id !== session.id &&
      (candidate.dayKey === session.dayKey || candidate.track.id === session.track.id),
  );
}

export function getHomeSummary(now = new Date()) {
  const activeDay = getConventionActiveDay(now);
  const todaySessions = getSessionsByDay(activeDay);
  const announcementsFeed = getPublishedAnnouncements();
  const highlights = getAspacHighlights().slice(0, 3);

  return {
    activeDay,
    activeDayLabel: formatDayLabel(activeDay),
    todaySessions,
    highlights,
    pinnedAnnouncements: announcementsFeed.filter((announcement) => announcement.pinned),
    latestAnnouncements: announcementsFeed.slice(0, 4),
    venueCount: venues.length,
    roomCount: rooms.length,
    sessionCount: hydratedSessions.length,
  };
}
