/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark as BookmarkIcon,
  CheckCircle2,
  ChevronRight as ChevronRightIcon,
  Clock,
  Coffee as CoffeeIcon,
  Compass,
  DoorOpen,
  ExternalLink,
  Globe,
  Info as InfoIcon,
  Map as MapIcon,
  MapPin,
  Share2,
  UserCheck,
  Users,
  Utensils,
} from 'lucide-react';
import { cn } from './lib/utils';
import {
  ConventionDayId,
  Session,
  Tab,
  Update,
  UpdateAction,
  VenueLocation,
} from './types';
import {
  CONVENTION_DAYS,
  FAQS,
  SESSIONS,
  UPDATES,
  VENUE_LOCATIONS,
} from './mockData';
import { I18nContext, Language, DICTIONARIES, LANGUAGE_LABELS, useI18n } from './i18n';

const LANGUAGE_STORAGE_KEY = 'pulse-manila-2026-lang';
const WIFI_NETWORK_NAME = 'SMX-ASPAC-2026';

function readLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
  return saved && DICTIONARIES[saved] ? saved : 'en';
}

const SAVED_SESSION_STORAGE_KEY = 'pulse-manila-2026-saved-sessions';
const SENIOR_MODE_STORAGE_KEY = 'pulse-manila-2026-senior-mode';
const VENUE_ADDRESS =
  'SMX Convention Center Manila, Seashell Lane, Mall of Asia Complex, Pasay City';
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=SMX+Convention+Center+Manila';

type NavigateOptions = {
  dayId?: ConventionDayId;
  savedOnly?: boolean;
  venueLocationId?: string;
};

const TAB_ITEMS: Array<{ id: Tab; icon: React.ReactNode }> = [
  { id: 'today', icon: <Clock className="w-5 h-5" /> },
  { id: 'schedule', icon: <BookmarkIcon className="w-5 h-5" /> },
  { id: 'updates', icon: <Bell className="w-5 h-5" /> },
  { id: 'venue', icon: <MapIcon className="w-5 h-5" /> },
  { id: 'help', icon: <InfoIcon className="w-5 h-5" /> },
];

export default function App() {
  const [language, setLanguage] = useState<Language>(() => readLanguage());
  
  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const t = DICTIONARIES[language];

  const initialRoute = useMemo(readRouteState, []);
  const [activeTab, setActiveTab] = useState<Tab>(initialRoute.tab);
  const [activeDayId, setActiveDayId] = useState<ConventionDayId>(
    initialRoute.dayId ?? getInitialConventionDayId(language),
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    initialRoute.sessionId ?? null,
  );
  const [highlightedVenueId, setHighlightedVenueId] = useState<string>(
    initialRoute.venueLocationId ?? 'help-desk',
  );
  const [savedOnly, setSavedOnly] = useState<boolean>(initialRoute.savedOnly);
  const [seniorMode, setSeniorMode] = useState<boolean>(() =>
    readBooleanStorage(SENIOR_MODE_STORAGE_KEY),
  );
  const [savedSessionIds, setSavedSessionIds] = useState<string[]>(() =>
    readSavedSessionIds(),
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const sessions = useMemo(
    () =>
      SESSIONS[language].map((session) => ({
        ...session,
        isSaved: savedSessionIds.includes(session.id),
      })),
    [savedSessionIds, language],
  );

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) ?? null,
    [selectedSessionId, sessions],
  );

  const currentDay = useMemo(
    () =>
      CONVENTION_DAYS[language].find((day) => day.id === activeDayId) ?? CONVENTION_DAYS[language][0],
    [activeDayId, language],
  );

  const liveSessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          session.day === activeDayId &&
          (session.status === 'now' || session.status === 'next'),
      ),
    [activeDayId, sessions],
  );

  const savedSessions = useMemo(
    () => sessions.filter((session) => session.isSaved),
    [sessions],
  );

  const urgentUpdate = useMemo(
    () => UPDATES[language].find((update) => update.type === 'urgent') ?? null,
    [language],
  );

  useEffect(() => {
    window.localStorage.setItem(
      SAVED_SESSION_STORAGE_KEY,
      JSON.stringify(savedSessionIds),
    );
  }, [savedSessionIds]);

  useEffect(() => {
    window.localStorage.setItem(
      SENIOR_MODE_STORAGE_KEY,
      seniorMode ? 'true' : 'false',
    );
  }, [seniorMode]);

  useEffect(() => {
    const nextUrl = buildAppUrl({
      tab: activeTab,
      dayId: activeDayId,
      sessionId: selectedSessionId,
      venueLocationId: highlightedVenueId,
      savedOnly,
    });

    window.history.replaceState(null, '', nextUrl);
  }, [activeDayId, activeTab, highlightedVenueId, savedOnly, selectedSessionId]);

  useEffect(() => {
    const handlePopState = () => {
      const route = readRouteState();
      setActiveTab(route.tab);
      setActiveDayId(route.dayId ?? getInitialConventionDayId(language));
      setSelectedSessionId(route.sessionId ?? null);
      setHighlightedVenueId(route.venueLocationId ?? 'help-desk');
      setSavedOnly(route.savedOnly);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const navigate = (tab: Tab, options?: NavigateOptions) => {
    setActiveTab(tab);
    setSelectedSessionId(null);

    if (options?.dayId) {
      setActiveDayId(options.dayId);
    }

    if (typeof options?.savedOnly === 'boolean') {
      setSavedOnly(options.savedOnly);
    } else if (tab !== 'schedule') {
      setSavedOnly(false);
    }

    if (options?.venueLocationId) {
      setHighlightedVenueId(options.venueLocationId);
    }
  };

  const toggleSavedSession = (sessionId: string) => {
    const isSaved = savedSessionIds.includes(sessionId);

    setSavedSessionIds((currentIds) =>
      isSaved
        ? currentIds.filter((currentId) => currentId !== sessionId)
        : [...currentIds, sessionId],
    );
    setToastMessage(
      isSaved ? t.toastRemoved : t.toastSaved,
    );
  };

  const openSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  const handleUpdateAction = (action: UpdateAction) => {
    navigate(action.tab, {
      savedOnly: false,
      venueLocationId: action.venueLocationId,
    });
  };

  const copyText = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage(successMessage);
    } catch {
      setToastMessage(t.toastCopyFailed);
    }
  };

  const shareSession = async (session: Session) => {
    const shareUrl = buildAbsoluteUrl({
      tab: 'schedule',
      dayId: session.day,
      sessionId: session.id,
      venueLocationId: highlightedVenueId,
      savedOnly: false,
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: session.title,
          text: `${session.title} • ${session.time} • ${session.room}`,
          url: shareUrl,
        });
        setToastMessage(t.toastSessionShared);
        return;
      } catch {
        // Fall back to clipboard if share is cancelled or unsupported.
      }
    }

    await copyText(shareUrl, t.toastSessionCopied);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'today':
        return (
          <HomeView
            activeDayId={activeDayId}
            currentDayLabel={currentDay.fullLabel}
            liveSessions={liveSessions}
            savedSessions={savedSessions}
            urgentUpdate={urgentUpdate}
            onCopyWifi={() =>
              copyText(WIFI_NETWORK_NAME, t.toastWifiCopied)
            }
            highlightedVenueId={highlightedVenueId}
            onNavigate={navigate}
            onOpenSession={openSession}
            onSelectDay={setActiveDayId}
          />
        );
      case 'schedule':
        return (
          <ScheduleView
            activeDayId={activeDayId}
            onOpenSession={openSession}
            onSelectDay={setActiveDayId}
            onToggleSavedSession={toggleSavedSession}
            savedOnly={savedOnly}
            sessions={sessions}
            setSavedOnly={setSavedOnly}
          />
        );
      case 'updates':
        return <UpdatesView onAction={handleUpdateAction} />;
      case 'venue':
        return (
          <VenueView
            highlightedVenueId={highlightedVenueId}
            onCopyAddress={() => copyText(VENUE_ADDRESS, t.toastVenueCopied)}
            onHighlightVenue={setHighlightedVenueId}
          />
        );
      case 'help':
        return (
          <HelpView
            onCopyWifi={() =>
              copyText(WIFI_NETWORK_NAME, t.toastWifiCopied)
            }
            onNavigate={navigate}
          />
        );
      default:
        return null;
    }
  };

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <I18nContext.Provider value={{ language, t }}>
      <div
        className={cn(
          'min-h-screen flex flex-col max-w-md mx-auto bg-surface shadow-2xl relative overflow-hidden',
          seniorMode && 'senior-mode',
        )}
      >
        <header className="fixed top-0 w-full max-w-md z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant/20">
          <div className="px-5 py-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-label font-black uppercase tracking-[0.24em] text-secondary">
                {t.appSubtitle}
              </p>
              <h1 className="text-2xl font-black text-primary font-headline tracking-tight">
                {t.appTitle}
              </h1>
              <p className="text-sm text-on-surface-variant leading-tight">
                {currentDay.fullLabel}
              </p>
            </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Open updates"
              className={cn(
                'p-2 rounded-full transition-colors',
                activeTab === 'updates'
                  ? 'bg-secondary-container text-primary'
                  : 'text-primary hover:bg-surface-container-high',
              )}
              onClick={() => navigate('updates')}
              type="button"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              aria-label="Open attendee help"
              className={cn(
                'p-2 rounded-full transition-colors',
                activeTab === 'help'
                  ? 'bg-secondary-container text-primary'
                  : 'text-primary hover:bg-surface-container-high',
              )}
              onClick={() => navigate('help')}
              type="button"
            >
              <InfoIcon className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                aria-label="Switch language"
                className="p-2 rounded-full transition-colors text-primary hover:bg-surface-container-high"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                type="button"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-surface text-on-surface border border-outline-variant/20 shadow-xl rounded-2xl py-2 z-50 w-40 max-h-60 overflow-y-auto">
                  {(Object.keys(LANGUAGE_LABELS) as Language[]).map((langId) => (
                    <button
                      key={langId}
                      type="button"
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-sm font-semibold active:scale-[0.98] transition-transform',
                        language === langId ? 'bg-primary/10 text-primary' : 'hover:bg-surface-container-highest'
                      )}
                      onClick={() => {
                        setLanguage(langId);
                        setLangMenuOpen(false);
                      }}
                    >
                      {LANGUAGE_LABELS[langId]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              aria-label={seniorMode ? 'Turn off large text' : 'Turn on large text'}
              className={cn(
                'px-2.5 py-2 rounded-full transition-colors text-xs font-black',
                seniorMode
                  ? 'bg-primary text-on-primary'
                  : 'text-primary hover:bg-surface-container-high',
              )}
              onClick={() => setSeniorMode((current) => !current)}
              type="button"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[88px] pb-24 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            initial={false}
            key={`${activeTab}-${activeDayId}-${savedOnly ? 'saved' : 'all'}`}
            transition={{ duration: 0.18 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 w-full max-w-md z-50 bg-white/95 backdrop-blur-md border-t border-outline-variant/20 pb-safe pt-2">
        <div className="flex justify-around items-center px-3 h-16">
          {TAB_ITEMS.map((item) => {
            const labelMap = {
              today: t.tabToday,
              schedule: t.tabSchedule,
              updates: t.tabUpdates,
              venue: t.tabVenue,
              help: t.tabHelp,
            };
            return (
              <React.Fragment key={item.id}>
                <NavButton
                  active={activeTab === item.id}
                  icon={item.icon}
                  label={labelMap[item.id]}
                  onClick={() => navigate(item.id)}
                />
              </React.Fragment>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {selectedSession && (
          <SessionDetail
            dayLabel={
              CONVENTION_DAYS[language].find((day) => day.id === selectedSession.day)?.fullLabel ??
              currentDay.fullLabel
            }
            onClose={() => setSelectedSessionId(null)}
            onOpenVenue={() =>
              navigate('venue', { venueLocationId: 'grand-ballroom' })
            }
            onShare={() => shareSession(selectedSession)}
            onToggleSave={() => toggleSavedSession(selectedSession.id)}
            session={selectedSession}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] bg-primary text-on-primary px-4 py-3 rounded-full shadow-xl text-sm font-semibold max-w-[90%] text-center"
            exit={{ opacity: 0, y: 12 }}
            initial={{ opacity: 0, y: 12 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </I18nContext.Provider>
  );
}

function NavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        'flex flex-col items-center justify-center min-w-[58px] px-3 py-1.5 transition-all duration-200 rounded-2xl',
        active ? 'bg-secondary-container text-primary' : 'text-secondary hover:text-primary',
      )}
      onClick={onClick}
      type="button"
    >
      <div className={cn('transition-transform', active && 'scale-110')}>{icon}</div>
      <span className="text-[10px] font-bold font-label uppercase tracking-widest mt-1">
        {label}
      </span>
    </button>
  );
}

function HomeView({
  activeDayId,
  currentDayLabel,
  liveSessions,
  savedSessions,
  urgentUpdate,
  highlightedVenueId,
  onCopyWifi,
  onNavigate,
  onOpenSession,
  onSelectDay,
}: {
  activeDayId: ConventionDayId;
  currentDayLabel: string;
  liveSessions: Session[];
  savedSessions: Session[];
  urgentUpdate: Update | null;
  highlightedVenueId?: string;
  onCopyWifi: () => void;
  onNavigate: (tab: Tab, options?: NavigateOptions) => void;
  onOpenSession: (sessionId: string) => void;
  onSelectDay: (dayId: ConventionDayId) => void;
}) {
  const { t, language } = useI18n();
  const venueContent = highlightedVenueId
    ? VENUE_LOCATIONS[language].find((v) => v.id === highlightedVenueId)
    : null;

  return (
    <div className="px-5 py-5 space-y-6">
      <section className="relative overflow-hidden rounded-[28px] primary-gradient text-on-primary p-6 shadow-xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex px-3 py-1 bg-white/15 rounded-full">
            <span className="font-label text-[10px] font-extrabold uppercase tracking-[0.22em]">
              {t.mabuhay}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary-fixed/95">
              {currentDayLabel}
            </p>
            <h2 className="text-3xl font-black leading-tight">
              {t.welcomeHeading}
            </h2>
          </div>
          <p className="text-primary-fixed/90 text-base leading-relaxed">
            {t.welcomeDesc}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <QuickActionButton
              label={t.btnTodaySchedule}
              onClick={() => onNavigate('schedule', { dayId: activeDayId })}
            />
            <QuickActionButton
              label={t.btnSavedSessions}
              onClick={() => onNavigate('schedule', { dayId: activeDayId, savedOnly: true })}
            />
            <QuickActionButton label={t.btnUpdates} onClick={() => onNavigate('updates')} />
            <QuickActionButton label={t.btnVenueGuide} onClick={() => onNavigate('venue')} />
          </div>
        </div>
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-tertiary/20 rounded-full blur-3xl" />
      </section>

      {venueContent && (
        <button
          className="w-full bg-secondary-container text-on-secondary-container p-4 rounded-3xl flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform text-left border border-outline-variant/10"
          onClick={() => onNavigate('venue', { venueLocationId: venueContent.id })}
          type="button"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white/60 rounded-full text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-label font-black uppercase tracking-[0.15em] text-primary/70 mb-0.5">
                Directions
              </p>
              <p className="font-bold text-primary leading-tight">
                Open {venueContent.name} map
              </p>
            </div>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-primary/50 flex-none" />
        </button>
      )}

      <section className="space-y-3">
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {CONVENTION_DAYS[language].map((day) => (
            <button
              className={cn(
                'flex-none px-5 py-3 rounded-full font-label text-sm font-bold shadow-sm transition-all active:scale-95',
                activeDayId === day.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-secondary hover:bg-surface-container-highest',
              )}
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              type="button"
            >
              {day.homeLabel}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <InfoCard
          actionLabel="Copy SSID"
          icon={<Globe className="w-5 h-5" />}
          onAction={onCopyWifi}
          subtitle={WIFI_NETWORK_NAME}
          title="Wi-Fi"
        />
        <InfoCard
          actionLabel="Open help"
          icon={<Users className="w-5 h-5" />}
          onAction={() => onNavigate('help')}
          subtitle="English, Filipino, Japanese, Korean"
          title="Language support"
        />
        <InfoCard
          actionLabel="Open venue"
          icon={<MapPin className="w-5 h-5" />}
          onAction={() => onNavigate('venue', { venueLocationId: 'help-desk' })}
          subtitle="Level 1 near Registration"
          title="Help Desk"
        />
        <InfoCard
          actionLabel="Read FAQ"
          icon={<CoffeeIcon className="w-5 h-5" />}
          onAction={() => onNavigate('help')}
          subtitle="Badge, jacket, charger, medicine"
          title="What to bring"
        />
      </section>

      {urgentUpdate && (
        <section className="bg-error-container/30 border border-error/15 rounded-3xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-error-container text-on-error-container rounded-2xl">
              <Bell className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-label font-black uppercase tracking-[0.2em] text-on-error-container">
                Important update
              </p>
              <h3 className="text-lg font-bold text-on-error-container leading-tight">
                {urgentUpdate.title}
              </h3>
              <p className="text-sm text-on-error-container/85 leading-relaxed">
                {urgentUpdate.content}
              </p>
            </div>
          </div>
          {urgentUpdate.action && (
            <button
              className="w-full py-3 bg-white text-primary rounded-2xl font-bold active:scale-[0.98] transition-transform"
              onClick={() =>
                onNavigate(urgentUpdate.action.tab, {
                  venueLocationId: urgentUpdate.action.venueLocationId,
                })
              }
              type="button"
            >
              {urgentUpdate.action.label}
            </button>
          )}
        </section>
      )}

      <section className="space-y-4">
        <SectionHeader actionLabel="Full schedule" onAction={() => onNavigate('schedule')}>
          Happening now
        </SectionHeader>
        <div className="grid gap-3">
          {liveSessions.length > 0 ? (
            liveSessions.map((session) => (
              <button
                className={cn(
                  'text-left bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-outline-variant/10 active:scale-[0.98] transition-all',
                  session.status === 'now' && 'ring-2 ring-primary ring-offset-2',
                )}
                key={session.id}
                onClick={() => onOpenSession(session.id)}
                type="button"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-2">
                    <span
                      className={cn(
                        'font-label text-[10px] font-black uppercase tracking-[0.18em]',
                        session.status === 'now' ? 'text-primary' : 'text-secondary',
                      )}
                    >
                      {session.status === 'now' ? 'Live now' : 'Up next'}
                    </span>
                    <h3 className="text-xl font-bold text-primary leading-tight">
                      {session.title}
                    </h3>
                  </div>
                  <span className="text-lg font-black text-primary whitespace-nowrap">
                    {session.time}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{session.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{session.venue}</span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-surface-container-low rounded-3xl p-6 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
              <p className="font-bold text-primary">No live sessions at this hour.</p>
              <p className="text-sm text-on-surface-variant">
                Use the full schedule to check the next block for {currentDayLabel}.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          actionLabel={savedSessions.length > 0 ? 'Open saved' : 'Save sessions'}
          onAction={() =>
            onNavigate('schedule', {
              dayId: activeDayId,
              savedOnly: savedSessions.length > 0,
            })
          }
        >
          My Schedule
        </SectionHeader>
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-5 shadow-sm space-y-4">
          {savedSessions.length > 0 ? (
            savedSessions.slice(0, 2).map((session) => (
              <button
                className="w-full flex items-center justify-between gap-3 text-left active:scale-[0.98] transition-transform"
                key={session.id}
                onClick={() => onOpenSession(session.id)}
                type="button"
              >
                <div>
                  <p className="text-sm font-black text-primary">
                    {session.time} • {session.room}
                  </p>
                  <p className="text-base font-semibold text-on-surface leading-tight">
                    {session.title}
                  </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-secondary flex-none" />
              </button>
            ))
          ) : (
            <div className="space-y-2">
              <p className="font-bold text-primary">No saved sessions yet.</p>
              <p className="text-sm text-on-surface-variant">
                Tap the bookmark in the schedule to keep important sessions easy to find.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/10 rounded-3xl p-5">
        <p className="text-[11px] font-label font-black uppercase tracking-[0.2em] text-primary mb-2">
          Official note
        </p>
        <p className="text-sm text-on-surface leading-relaxed">
          Pulse complements official convention information. Please still follow stage
          announcements, printed notices, and on-site signage from organizers.
        </p>
      </section>
    </div>
  );
}

function ScheduleView({
  activeDayId,
  onOpenSession,
  onSelectDay,
  onToggleSavedSession,
  savedOnly,
  sessions,
  setSavedOnly,
}: {
  activeDayId: ConventionDayId;
  onOpenSession: (sessionId: string) => void;
  onSelectDay: (dayId: ConventionDayId) => void;
  onToggleSavedSession: (sessionId: string) => void;
  savedOnly: boolean;
  sessions: Session[];
  setSavedOnly: (value: boolean) => void;
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useI18n();

  const daySessions = useMemo(
    () => sessions.filter((session) => session.day === activeDayId),
    [activeDayId, sessions],
  );

  const categories = useMemo(
    () => ['All', ...new Set(daySessions.flatMap((session) => session.category))],
    [daySessions],
  );

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [activeCategory, categories]);

  const visibleSessions = useMemo(
    () =>
      daySessions.filter((session) => {
        const matchesCategory =
          activeCategory === 'All' || session.category.includes(activeCategory);
        const matchesSaved = !savedOnly || session.isSaved;
        return matchesCategory && matchesSaved;
      }),
    [activeCategory, daySessions, savedOnly],
  );

  const groupedSessions = useMemo(() => {
    const groups = new Map<string, Session[]>();

    visibleSessions.forEach((session) => {
      const group = groups.get(session.time);
      if (group) {
        group.push(session);
        return;
      }

      groups.set(session.time, [session]);
    });

    return Array.from(groups.entries());
  }, [visibleSessions]);

  return (
    <div className="pb-10">
      <div className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm px-5 py-4 space-y-4 border-b border-outline-variant/15">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Schedule</h2>
          <p className="text-sm text-on-surface-variant">
            Tap a session to see details or save it for later.
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {CONVENTION_DAYS[language].map((day) => (
            <button
              className={cn(
                'flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all active:scale-95',
                activeDayId === day.id
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high',
              )}
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              type="button"
            >
              <span className="font-label text-xs opacity-80 uppercase tracking-[0.16em]">
                {day.shortLabel}
              </span>
              <span className="text-xl font-black">{day.dayNumber}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors active:scale-95',
                activeCategory === category
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest',
              )}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <button
          className={cn(
            'w-full py-3 rounded-2xl font-bold text-sm transition-colors',
            savedOnly
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-primary',
          )}
          onClick={() => setSavedOnly(!savedOnly)}
          type="button"
        >
          {savedOnly ? 'Showing saved sessions only' : 'Show saved sessions only'}
        </button>
      </div>

      <div className="px-5 mt-5 space-y-8">
        {groupedSessions.length > 0 ? (
          groupedSessions.map(([time, timeSessions]) => (
            <section className="space-y-3" key={time}>
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-black text-primary font-headline tracking-tight w-20">
                  {time}
                </h3>
                <div className="h-[2px] flex-grow bg-outline-variant/20 rounded-full" />
              </div>
              <div className="space-y-3">
                {timeSessions.map((session) => (
                  <div
                    className="bg-surface-container-lowest p-5 rounded-3xl transition-all shadow-sm border border-outline-variant/10"
                    key={session.id}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <button
                        className="flex-1 text-left active:scale-[0.99] transition-transform"
                        onClick={() => onOpenSession(session.id)}
                        type="button"
                      >
                        <div className="flex flex-wrap gap-2 mb-3">
                          {session.category.map((category) => (
                            <span
                              className="font-label text-[10px] font-extrabold uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-secondary-fixed text-primary"
                              key={category}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-lg font-bold text-on-surface leading-tight">
                          {session.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant mt-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{session.room}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>
                              {session.time} - {session.endTime}
                            </span>
                          </div>
                        </div>
                      </button>
                      <button
                        aria-label={session.isSaved ? 'Remove saved session' : 'Save session'}
                        className={cn(
                          'transition-colors p-2 rounded-full hover:bg-surface-container-high',
                          session.isSaved ? 'text-primary' : 'text-secondary hover:text-primary',
                        )}
                        onClick={() => onToggleSavedSession(session.id)}
                        type="button"
                      >
                        <BookmarkIcon
                          className={cn('w-6 h-6', session.isSaved && 'fill-current')}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="bg-surface-container-low rounded-3xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
            <p className="font-bold text-primary">No sessions match this filter.</p>
            <p className="text-sm text-on-surface-variant">
              Try another category or turn off the saved-only filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function UpdatesView({ onAction }: { onAction: (action: UpdateAction) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useI18n();

  const visibleUpdates = UPDATES[language].filter((update) => {
    if (activeCategory === 'All') {
      return true;
    }

    if (activeCategory === 'Program') {
      return update.type === 'urgent';
    }

    if (activeCategory === 'Venue') {
      return update.type === 'venue';
    }

    return update.type === 'news' || update.type === 'info';
  });

  return (
    <div className="px-5 py-5 space-y-6">
      <section className="space-y-2">
        <h2 className="text-4xl font-black text-primary tracking-tight">Updates</h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Quick convention notices for schedule changes, venue reminders, and ASPAC
          highlights.
        </p>
      </section>

      <nav className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {['All', 'Program', 'Venue', 'Highlights'].map((category) => (
          <button
            className={cn(
              'flex-none px-5 py-2.5 rounded-full font-label text-sm font-bold transition-all active:scale-95',
              activeCategory === category
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-fixed',
            )}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="space-y-4">
        {visibleUpdates.map((update) => (
          <article
            className={cn(
              'bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/10 p-5',
              update.type === 'urgent' && 'border-l-4 border-error',
            )}
            key={update.id}
          >
            <div className="flex justify-between items-start gap-3 mb-3">
              <span
                className={cn(
                  'text-[10px] font-bold font-label px-2 py-1 rounded-full uppercase tracking-[0.18em]',
                  update.type === 'urgent'
                    ? 'bg-error-container text-on-error-container'
                    : update.type === 'info'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : update.type === 'news'
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                    : 'bg-primary-fixed text-on-primary-fixed-variant',
                )}
              >
                {update.type === 'urgent'
                  ? 'Urgent'
                  : update.type === 'info'
                  ? 'General'
                  : update.type === 'news'
                  ? 'Highlights'
                  : 'Venue'}
              </span>
              <time className="text-outline text-xs font-label">{update.time}</time>
            </div>

            <h3 className="text-xl font-bold text-on-surface leading-tight mb-2">
              {update.title}
            </h3>
            <p className="text-on-surface-variant text-base leading-relaxed mb-4">
              {update.content}
            </p>

            {update.action && (
              <button
                className="w-full py-3 font-bold text-sm rounded-2xl transition-all active:scale-[0.98] bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary"
                onClick={() => onAction(update.action)}
                type="button"
              >
                {update.action.label}
              </button>
            )}
          </article>
        ))}

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="w-10 h-10 mb-2 text-primary/60" />
          <p className="font-label text-sm font-semibold tracking-wider uppercase text-secondary">
            You&apos;re caught up
          </p>
        </div>
      </div>
    </div>
  );
}

function VenueView({
  highlightedVenueId,
  onCopyAddress,
  onHighlightVenue,
}: {
  highlightedVenueId: string;
  onCopyAddress: () => void;
  onHighlightVenue: (venueLocationId: string) => void;
}) {
  const [activeView, setActiveView] = useState<'guide' | 'getting-there'>('guide');
  const { language } = useI18n();

  return (
    <div className="px-5 py-5 space-y-6">
      <section>
        <p className="font-label text-secondary text-sm font-semibold tracking-[0.18em] uppercase">
          SMX Convention Center Manila
        </p>
        <h2 className="text-4xl font-black text-primary tracking-tight mt-1">
          Venue Guide
        </h2>
      </section>

      <div className="flex bg-surface-container-high p-1 rounded-2xl">
        <button
          className={cn(
            'flex-1 py-3 rounded-xl font-bold text-sm transition-all',
            activeView === 'guide'
              ? 'bg-white text-primary shadow-sm'
              : 'text-secondary hover:text-primary',
          )}
          onClick={() => setActiveView('guide')}
          type="button"
        >
          Inside venue
        </button>
        <button
          className={cn(
            'flex-1 py-3 rounded-xl font-bold text-sm transition-all',
            activeView === 'getting-there'
              ? 'bg-white text-primary shadow-sm'
              : 'text-secondary hover:text-primary',
          )}
          onClick={() => setActiveView('getting-there')}
          type="button"
        >
          Getting there
        </button>
      </div>

      {activeView === 'guide' ? (
        <div className="space-y-5">
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/10 shadow-sm space-y-4">
            <div>
              <h3 className="text-xl font-bold text-primary">Need a room fast?</h3>
              <p className="text-sm text-on-surface-variant">
                Tap a stop below to highlight it in the venue list.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {VENUE_LOCATIONS[language].map((location) => (
                <button
                  className={cn(
                    'rounded-2xl p-4 text-left border transition-colors active:scale-[0.98]',
                    highlightedVenueId === location.id
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-outline-variant/10 bg-surface-container-low text-primary',
                  )}
                  key={location.id}
                  onClick={() => onHighlightVenue(location.id)}
                  type="button"
                >
                  <p className="font-bold text-sm leading-tight">{location.name}</p>
                  <p
                    className={cn(
                      'text-xs mt-1',
                      highlightedVenueId === location.id
                        ? 'text-primary-fixed'
                        : 'text-on-surface-variant',
                    )}
                  >
                    {location.floor}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionHeader>Key locations</SectionHeader>
            <div className="grid gap-3">
              {VENUE_LOCATIONS[language].map((location) => (
                <React.Fragment key={location.id}>
                  <VenueCard
                    highlighted={highlightedVenueId === location.id}
                    location={location}
                    onClick={() => onHighlightVenue(location.id)}
                  />
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-5">
          <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <MapPin className="w-6 h-6" />
              <h3 className="text-xl font-bold">SMX Convention Center Manila</h3>
            </div>
            <p className="text-on-surface-variant text-base leading-relaxed">
              {VENUE_ADDRESS}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                className="w-full py-3 bg-primary text-on-primary rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                href={GOOGLE_MAPS_URL}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4" />
                Open map
              </a>
              <button
                className="w-full py-3 bg-surface-container-high text-primary rounded-2xl font-bold text-sm active:scale-95 transition-transform"
                onClick={onCopyAddress}
                type="button"
              >
                Copy address
              </button>
            </div>
          </section>

          <section className="grid gap-3">
            <TransportCard
              description="Official hotel shuttle loops run before the morning sessions and after evening activities."
              icon={<Users className="w-5 h-5" />}
              title="Official shuttle"
            />
            <TransportCard
              description="For taxi or Grab, ask for SMX Convention Center Manila at the Mall of Asia Complex."
              icon={<ArrowRight className="w-5 h-5 -rotate-45" />}
              title="Grab or taxi"
            />
            <TransportCard
              description="If you need step-free access or wheelchair help, go directly to the Help Desk on Level 1."
              icon={<CheckCircle2 className="w-5 h-5" />}
              title="Accessibility support"
            />
          </section>
        </div>
      )}
    </div>
  );
}

function HelpView({
  onCopyWifi,
  onNavigate,
}: {
  onCopyWifi: () => void;
  onNavigate: (tab: Tab, options?: NavigateOptions) => void;
}) {
  const { language } = useI18n();
  const [activeCategory, setActiveCategory] = useState('General');
  const categories = Array.from(new Set(FAQS[language].map((faq) => faq.category)));

  return (
    <div className="px-5 py-5 space-y-6">
      <section className="space-y-2">
        <h2 className="text-4xl font-black text-primary tracking-tight">Help</h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Practical answers for Wi-Fi, what to bring, language support, venue access,
          and official reminders.
        </p>
      </section>

      <section className="grid gap-3">
        <SupportCard
          actionLabel="Copy SSID"
          description={WIFI_NETWORK_NAME}
          icon={<Globe className="w-5 h-5" />}
          onAction={onCopyWifi}
          title="Wi-Fi"
        />
        <SupportCard
          actionLabel="Open venue guide"
          description="Help Desk on Level 1 near Registration"
          icon={<MapPin className="w-5 h-5" />}
          onAction={() => onNavigate('venue', { venueLocationId: 'help-desk' })}
          title="Need directions?"
        />
        <SupportCard
          actionLabel="Read dress code"
          description="Business attire by day, formal or national dress for fellowship night"
          icon={<UserCheck className="w-5 h-5" />}
          onAction={() => setActiveCategory('Dress Code')}
          title="Dress code"
        />
        <SupportCard
          actionLabel="Read language help"
          description="English, Filipino, Japanese, and Korean support during busy hours"
          icon={<Users className="w-5 h-5" />}
          onAction={() => setActiveCategory('Language')}
          title="Language support"
        />
      </section>

      <nav className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            className={cn(
              'flex-none px-5 py-2.5 rounded-full font-label text-sm font-bold transition-all active:scale-95',
              activeCategory === category
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-fixed',
            )}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="space-y-3">
        {FAQS[language].filter((faq) => faq.category === activeCategory).map((faq) => (
          <details
            className="group bg-surface-container-lowest rounded-3xl border border-outline-variant/10 overflow-hidden"
            key={faq.id}
          >
            <summary className="flex justify-between items-center gap-3 p-5 cursor-pointer list-none font-bold text-primary group-open:bg-primary/5">
              <span className="text-left">{faq.question}</span>
              <ChevronRightIcon className="w-5 h-5 transition-transform group-open:rotate-90 flex-none" />
            </summary>
            <div className="p-5 pt-0 text-on-surface-variant text-base leading-relaxed border-t border-outline-variant/5">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <section className="bg-primary/5 p-5 rounded-3xl border border-primary/10 space-y-3">
        <h3 className="font-bold text-primary text-lg">Official reminder</h3>
        <p className="text-sm text-on-surface leading-relaxed">
          Pulse is a public companion for easy access to convention details. Official
          notices, printed programs, and stage announcements still take priority.
        </p>
      </section>
    </div>
  );
}

function QuickActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-white/12 backdrop-blur-sm text-left rounded-2xl p-4 font-bold active:scale-[0.98] transition-transform border border-white/10"
      onClick={onClick}
      type="button"
    >
      <span className="block text-sm leading-tight">{label}</span>
    </button>
  );
}

function SectionHeader({
  children,
  actionLabel,
  onAction,
}: {
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-xl font-black text-primary tracking-tight">{children}</h3>
      {actionLabel && onAction ? (
        <button
          className="text-primary text-xs font-bold font-label uppercase tracking-[0.16em] hover:underline"
          onClick={onAction}
          type="button"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

function InfoCard({
  actionLabel,
  icon,
  onAction,
  subtitle,
  title,
}: {
  actionLabel: string;
  icon: React.ReactNode;
  onAction: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-4 shadow-sm space-y-3">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-primary">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">{subtitle}</p>
      </div>
      <button
        className="text-sm font-bold text-primary hover:underline"
        onClick={onAction}
        type="button"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function SupportCard({
  actionLabel,
  description,
  icon,
  onAction,
  title,
}: {
  actionLabel: string;
  description: string;
  icon: React.ReactNode;
  onAction: () => void;
  title: string;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 p-5 shadow-sm space-y-3">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-primary text-lg">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
      <button
        className="text-sm font-bold text-primary hover:underline"
        onClick={onAction}
        type="button"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function VenueCard({
  highlighted,
  location,
  onClick,
}: {
  highlighted: boolean;
  location: VenueLocation;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        'w-full text-left p-5 rounded-3xl border transition-all shadow-sm active:scale-[0.98]',
        highlighted
          ? 'bg-primary text-on-primary border-primary'
          : 'bg-surface-container-lowest border-outline-variant/10 hover:translate-y-[-1px]',
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-3 rounded-2xl',
            highlighted
              ? 'bg-white/15 text-on-primary'
              : 'bg-primary-container text-on-primary-container',
          )}
        >
          {location.icon === 'registration' ? (
            <UserCheck className="w-5 h-5" />
          ) : location.icon === 'plenary' ? (
            <DoorOpen className="w-5 h-5" />
          ) : location.icon === 'help' ? (
            <InfoIcon className="w-5 h-5" />
          ) : location.icon === 'first-aid' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : location.icon === 'dining' ? (
            <Utensils className="w-5 h-5" />
          ) : (
            <Compass className="w-5 h-5" />
          )}
        </div>
        <div className="space-y-2">
          <span
            className={cn(
              'font-label text-[10px] font-extrabold uppercase tracking-[0.18em]',
              highlighted ? 'text-primary-fixed' : 'text-secondary',
            )}
          >
            {location.floor} • {location.hall}
          </span>
          <h4 className="text-lg font-bold leading-tight">{location.name}</h4>
          <p
            className={cn(
              'text-sm leading-relaxed',
              highlighted ? 'text-primary-fixed' : 'text-on-surface-variant',
            )}
          >
            {location.description}
          </p>
          <p
            className={cn(
              'text-sm font-semibold',
              highlighted ? 'text-on-primary' : 'text-primary',
            )}
          >
            {location.note}
          </p>
        </div>
      </div>
    </button>
  );
}

function TransportCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-surface-container-low p-5 rounded-3xl flex items-start gap-4 border border-outline-variant/5">
      <div className="p-3 bg-primary/10 text-primary rounded-2xl">{icon}</div>
      <div>
        <h4 className="font-bold text-on-surface">{title}</h4>
        <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function SessionDetail({
  dayLabel,
  onClose,
  onOpenVenue,
  onShare,
  onToggleSave,
  session,
}: {
  dayLabel: string;
  onClose: () => void;
  onOpenVenue: () => void;
  onShare: () => void;
  onToggleSave: () => void;
  session: Session;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      animate={{ y: 0 }}
      aria-modal="true"
      className="fixed inset-0 z-[60] bg-surface flex flex-col max-w-md mx-auto"
      exit={{ y: '100%' }}
      initial={{ y: '100%' }}
      role="dialog"
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
    >
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant/15">
        <div className="flex justify-between items-center px-5 h-16">
          <button
            className="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors"
            onClick={onClose}
            type="button"
          >
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <span className="font-headline font-bold tracking-tight text-primary">
            Session details
          </span>
          <button
            className="p-2 -mr-2 hover:bg-surface-container-high rounded-full transition-colors"
            onClick={onShare}
            type="button"
          >
            <Share2 className="w-6 h-6 text-primary" />
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-label font-bold tracking-[0.18em] uppercase">
              {session.status === 'now' ? 'Live now' : 'Scheduled'}
            </span>
            <span className="font-label text-xs font-bold text-secondary uppercase tracking-[0.16em]">
              {dayLabel}
            </span>
          </div>
          <h2 className="text-3xl font-headline font-black leading-tight text-primary">
            {session.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DetailStat label="Time" value={`${session.time} - ${session.endTime}`} />
          <DetailStat label="Room" value={session.room} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="w-full py-3.5 bg-primary text-on-primary rounded-2xl font-headline font-bold flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
            onClick={onToggleSave}
            type="button"
          >
            <BookmarkIcon className={cn('w-5 h-5', session.isSaved && 'fill-current')} />
            {session.isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            className="w-full py-3.5 bg-surface-container-high text-primary rounded-2xl font-headline font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            onClick={onOpenVenue}
            type="button"
          >
            <MapIcon className="w-5 h-5" />
            Open venue
          </button>
        </div>

        <section className="space-y-3">
          <h3 className="font-label text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
            Summary
          </h3>
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm">
            <p className="text-on-surface-variant leading-relaxed text-base">
              {session.description}
            </p>
          </div>
        </section>

        {session.speakers.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-label text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
              Speakers
            </h3>
            <div className="space-y-3">
              {session.speakers.map((speaker) => (
                <div
                  className="flex items-center gap-4 bg-surface-container-low p-4 rounded-3xl border border-outline-variant/5"
                  key={speaker.name}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-dim shadow-sm">
                    <img
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      src={speaker.image}
                    />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-primary text-base">
                      {speaker.name}
                    </h4>
                    <p className="text-sm font-label text-secondary">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-primary/5 p-5 rounded-3xl border border-primary/10 space-y-3">
          <h3 className="font-bold text-primary text-lg">Attendee reminder</h3>
          <p className="text-sm text-on-surface leading-relaxed">
            Presentation files and late room changes depend on official organizers. Use
            Pulse for quick access, then confirm with stage announcements and posted signs.
          </p>
        </section>
      </div>
    </motion.div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/5">
      <span className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary mb-1 block">
        {label}
      </span>
      <span className="text-base font-headline font-bold text-primary">{value}</span>
    </div>
  );
}

function readSavedSessionIds(): string[] {
  if (typeof window === 'undefined') {
    return SESSIONS.en.filter((session) => session.isSaved).map((session) => session.id);
  }

  const rawValue = window.localStorage.getItem(SAVED_SESSION_STORAGE_KEY);
  if (!rawValue) {
    return SESSIONS.en.filter((session) => session.isSaved).map((session) => session.id);
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === 'string')
      : [];
  } catch {
    return SESSIONS.en.filter((session) => session.isSaved).map((session) => session.id);
  }
}

function readBooleanStorage(storageKey: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(storageKey) === 'true';
}

function getInitialConventionDayId(language: Language = 'en'): ConventionDayId {
  const todayInManila = getManilaDateId();
  const matchingDay = CONVENTION_DAYS[language].find((day) => day.id === todayInManila);
  return matchingDay?.id ?? CONVENTION_DAYS[language][0].id;
}

function getManilaDateId(): ConventionDayId | null {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  if (!year || !month || !day) {
    return null;
  }

  const candidate = `${year}-${month}-${day}`;
  return isConventionDayId(candidate) ? candidate : null;
}

function isConventionDayId(value: string): value is ConventionDayId {
  return CONVENTION_DAYS.en.some((day) => day.id === value);
}

function readRouteState(): {
  tab: Tab;
  dayId?: ConventionDayId;
  sessionId?: string;
  venueLocationId?: string;
  savedOnly: boolean;
} {
  if (typeof window === 'undefined') {
    return { tab: 'today', savedOnly: false };
  }

  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  const dayId = params.get('day');
  const sessionId = params.get('session');
  const venueLocationId = params.get('venue');

  return {
    tab: isTab(tab) ? tab : 'today',
    dayId: dayId && isConventionDayId(dayId) ? dayId : undefined,
    sessionId: sessionId ?? undefined,
    venueLocationId: venueLocationId ?? undefined,
    savedOnly: params.get('saved') === '1',
  };
}

function isTab(value: string | null): value is Tab {
  return TAB_ITEMS.some((item) => item.id === value);
}

function buildAppUrl({
  tab,
  dayId,
  sessionId,
  venueLocationId,
  savedOnly,
}: {
  tab: Tab;
  dayId: ConventionDayId;
  sessionId?: string | null;
  venueLocationId?: string | null;
  savedOnly: boolean;
}) {
  const params = new URLSearchParams();
  params.set('tab', tab);
  params.set('day', dayId);

  if (sessionId) {
    params.set('session', sessionId);
  }

  if (venueLocationId) {
    params.set('venue', venueLocationId);
  }

  if (savedOnly) {
    params.set('saved', '1');
  }

  return `${window.location.pathname}?${params.toString()}`;
}

function buildAbsoluteUrl(args: {
  tab: Tab;
  dayId: ConventionDayId;
  sessionId?: string | null;
  venueLocationId?: string | null;
  savedOnly: boolean;
}) {
  const relativeUrl = buildAppUrl(args);
  return new URL(relativeUrl, window.location.origin).toString();
}
