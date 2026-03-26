/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Tab, Session, Update, VenueLocation, FAQ } from './types';
import { SESSIONS, UPDATES, VENUE_LOCATIONS, FAQS } from './mockData';

// Re-mapping icons to Lucide as per baseline guidelines (Lucide is preferred)
import { 
  Menu as MenuIcon, 
  Search as SearchIcon, 
  Calendar, 
  Bell, 
  Map, 
  MoreHorizontal,
  ArrowRight,
  MapPin,
  Users,
  Bookmark as BookmarkIcon,
  Info as InfoIcon,
  Globe,
  ExternalLink,
  CheckCircle2,
  User,
  Download as DownloadIcon,
  ChevronRight as ChevronRightIcon,
  SlidersHorizontal,
  Clock,
  Coffee as CoffeeIcon,
  Utensils,
  UserCheck,
  Tv,
  ArrowLeft,
  Share2,
  Layout,
  DoorOpen,
  Compass,
  Star,
  Sparkles,
  MousePointer2,
  X,
  Send
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [seniorMode, setSeniorMode] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'today': return <HomeView onSessionClick={setSelectedSession} onScheduleClick={() => setActiveTab('schedule')} />;
      case 'schedule': return <ScheduleView onSessionClick={setSelectedSession} />;
      case 'updates': return <UpdatesView />;
      case 'venue': return <VenueView />;
      case 'more': return <MoreView onShowcaseClick={() => setActiveTab('showcase')} onFAQClick={() => setActiveTab('faq')} />;
      case 'showcase': return <ShowcaseView />;
      case 'faq': return <FAQView />;
      default: return <HomeView onSessionClick={setSelectedSession} onScheduleClick={() => setActiveTab('schedule')} />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col max-w-md mx-auto bg-surface shadow-2xl relative overflow-hidden",
      seniorMode && "senior-mode"
    )}>
      {/* Top Bar */}
      <header className="fixed top-0 w-full max-w-md z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 h-16">
          <button className="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
            <MenuIcon className="w-6 h-6 text-primary" />
          </button>
          <h1 className="text-xl font-black text-primary font-headline tracking-tight">
            {activeTab === 'showcase' ? 'Feature Showcase' : 
             activeTab === 'faq' ? 'Help & FAQ' : 'Pulse'}
          </h1>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setSeniorMode(!seniorMode)}
              className={cn(
                "p-2 rounded-full transition-colors flex items-center gap-1",
                seniorMode ? "bg-primary text-on-primary" : "hover:bg-surface-container-high text-primary"
              )}
              title="Toggle Senior Mode (Large Text)"
            >
              <span className="text-[10px] font-bold font-label">A+</span>
            </button>
            <button className="p-2 -mr-2 hover:bg-surface-container-high rounded-full transition-colors">
              <SearchIcon className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-24 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md z-50 bg-white/80 backdrop-blur-md border-t border-outline-variant/10 pb-safe pt-2">
        <div className="flex justify-around items-center px-4 h-16">
          <NavButton 
            active={activeTab === 'today'} 
            onClick={() => setActiveTab('today')} 
            icon={<Calendar className="w-6 h-6" />} 
            label="Today" 
          />
          <NavButton 
            active={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')} 
            icon={<Calendar className="w-6 h-6" />} 
            label="Schedule" 
          />
          <NavButton 
            active={activeTab === 'updates'} 
            onClick={() => setActiveTab('updates')} 
            icon={<Bell className="w-6 h-6" />} 
            label="Updates" 
          />
          <NavButton 
            active={activeTab === 'venue'} 
            onClick={() => setActiveTab('venue')} 
            icon={<Map className="w-6 h-6" />} 
            label="Venue" 
          />
          <NavButton 
            active={activeTab === 'more' || activeTab === 'showcase'} 
            onClick={() => setActiveTab('more')} 
            icon={<MoreHorizontal className="w-6 h-6" />} 
            label="More" 
          />
        </div>
      </nav>

      {/* Session Detail Modal */}
      <AnimatePresence>
        {selectedSession && (
          <SessionDetail 
            session={selectedSession} 
            onClose={() => setSelectedSession(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-1.5 transition-all duration-200 rounded-2xl",
        active ? "bg-secondary-container text-primary" : "text-secondary hover:text-primary"
      )}
    >
      <div className={cn("transition-transform", active && "scale-110")}>
        {icon}
      </div>
      <span className="text-[10px] font-bold font-label uppercase tracking-widest mt-1">{label}</span>
    </button>
  );
}

function HomeView({ onSessionClick, onScheduleClick }: { onSessionClick: (s: Session) => void, onScheduleClick: () => void }) {
  const nowNextSessions = SESSIONS.filter(s => s.status);
  const [activeDay, setActiveDay] = useState('Today');

  return (
    <div className="px-6 py-6 space-y-8">
      {/* Welcome Card */}
      <section className="relative overflow-hidden rounded-2xl primary-gradient text-on-primary p-8 shadow-xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex px-3 py-1 bg-white/20 rounded-full">
            <span className="font-label text-[10px] font-extrabold uppercase tracking-widest">Mabuhay!</span>
          </div>
          <h2 className="text-3xl font-black leading-tight">Welcome to Kiwanis Manila 2026</h2>
          <p className="text-primary-fixed/90 text-base leading-relaxed">
            We are honored to have you at the ASPAC Convention. May 22-25, SMX Convention Center.
          </p>
          <button 
            onClick={onScheduleClick}
            className="mt-4 bg-tertiary text-on-tertiary-container font-black px-6 py-3 rounded-xl flex items-center gap-2 text-sm active:scale-95 transition-transform shadow-lg"
          >
            Explore Schedule
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-tertiary/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Quick Nav */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6">
        {['Today', 'Tomorrow', 'May 24', 'May 25'].map(day => (
          <button 
            key={day}
            onClick={() => setActiveDay(day)}
            className={cn(
              "flex-none px-6 py-2.5 rounded-full font-label text-sm font-bold shadow-sm transition-all active:scale-95",
              activeDay === day ? "bg-primary text-on-primary" : "bg-surface-container-high text-secondary hover:bg-surface-container-highest"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Happening Now Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-label font-black text-secondary uppercase tracking-[0.2em]">Happening Now</h3>
          <button onClick={onScheduleClick} className="text-primary text-xs font-bold font-label uppercase tracking-wider hover:underline">See All</button>
        </div>
        <div className="grid gap-4">
          {nowNextSessions.length > 0 ? (
            nowNextSessions.map(session => (
              <div 
                key={session.id}
                onClick={() => onSessionClick(session)}
                className={cn(
                  "bg-surface-container-lowest rounded-2xl p-6 shadow-sm cursor-pointer active:scale-[0.98] transition-all border border-outline-variant/10",
                  session.status === 'now' && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <span className={cn(
                      "font-label text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                      session.status === 'now' ? "text-primary" : "text-secondary"
                    )}>
                      {session.status === 'now' && <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />}
                      {session.status === 'now' ? 'Live Now' : 'Up Next'}
                    </span>
                    <h4 className="text-xl font-bold text-on-surface leading-tight">{session.title}</h4>
                  </div>
                  <span className="text-2xl font-black font-headline text-primary/30">{session.time}</span>
                </div>
                <div className="flex items-center gap-6 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-label text-sm font-bold">{session.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-label text-sm font-bold">Main Hall</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-8 text-center space-y-3">
              <CoffeeIcon className="w-10 h-10 text-secondary mx-auto opacity-40" />
              <p className="text-on-surface-variant font-medium">No sessions currently live. Enjoy your break!</p>
            </div>
          )}
        </div>
      </section>

      {/* Urgent Update Snippet */}
      <section className="bg-error-container/20 border border-error/10 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-3 bg-error-container text-on-error-container rounded-xl">
          <Bell className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-on-error-container">Shuttle Service Update</h4>
          <p className="text-sm text-on-error-container/80">Evening shuttles to hotels will start 30 mins earlier at 18:30.</p>
        </div>
      </section>
    </div>
  );
}

function ScheduleView({ onSessionClick }: { onSessionClick: (s: Session) => void }) {
  const [activeDay, setActiveDay] = useState('22');
  const [activeCategory, setActiveCategory] = useState('All Sessions');

  const days = [
    { label: 'Mon', date: '22' },
    { label: 'Tue', date: '23' },
    { label: 'Wed', date: '24' },
    { label: 'Thu', date: '25' },
    { label: 'Fri', date: '26' },
  ];

  const categories = ['All Sessions', 'ASPAC', 'Leadership', 'SLP', 'Governance'];

  return (
    <div className="pb-12">
      <div className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm px-6 py-4 space-y-4 border-b border-outline-variant/10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {days.map(day => (
            <button 
              key={day.date}
              onClick={() => setActiveDay(day.date)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all active:scale-95",
                activeDay === day.date 
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20" 
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <span className="font-label text-xs opacity-80 uppercase tracking-tighter">{day.label}</span>
              <span className="text-xl font-bold">{day.date}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors active:scale-95",
                activeCategory === cat 
                  ? "bg-primary text-on-primary" 
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6 space-y-8">
        {['08:00', '09:30', '11:00'].map(time => (
          <div key={time} className="relative">
            <div className="flex items-baseline gap-4 mb-4">
              <h2 className="text-2xl font-black text-primary font-headline tracking-tighter w-20">{time}</h2>
              <div className="h-[2px] flex-grow bg-outline-variant/20 rounded-full"></div>
            </div>
            <div className="space-y-3">
              {SESSIONS
                .filter(s => s.time === time)
                .filter(s => activeCategory === 'All Sessions' || s.category.includes(activeCategory))
                .map(session => (
                <div 
                  key={session.id}
                  onClick={() => onSessionClick(session)}
                  className="bg-surface-container-lowest p-5 rounded-xl transition-all active:scale-[0.98] shadow-sm cursor-pointer border border-outline-variant/5"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {session.category.map(cat => (
                          <span 
                            key={cat}
                            className={cn(
                              "font-label text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded",
                              cat === 'ASPAC' ? "text-primary-container bg-secondary-fixed" : 
                              cat === 'Leadership' ? "text-on-tertiary-fixed-variant bg-tertiary-fixed" :
                              "text-primary-container bg-secondary-fixed"
                            )}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight">{session.title}</h3>
                      <div className="flex items-center gap-2 text-secondary">
                        <MapPin className="w-4 h-4" />
                        <span className="font-label text-xs font-semibold">{session.room}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* Toggle saved logic would go here */ }}
                      className={cn(
                        "transition-colors p-2 rounded-full hover:bg-surface-container-high",
                        session.isSaved ? "text-primary" : "text-secondary hover:text-primary"
                      )}
                    >
                      <BookmarkIcon className={cn("w-6 h-6", session.isSaved && "fill-current")} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-50">
        <SlidersHorizontal className="w-6 h-6" />
      </button>
    </div>
  );
}

function UpdatesView() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="px-6 py-6 space-y-8">
      <section>
        <h1 className="text-4xl font-black text-primary tracking-tight mb-2">Updates</h1>
        <p className="text-secondary font-label text-sm uppercase tracking-widest">Real-time convention feed</p>
      </section>

      <nav className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {['All', 'Program Changes', 'Venue Updates', 'ASPAC News'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-none px-6 py-2 rounded-full font-label text-sm font-bold transition-all active:scale-95",
              activeCategory === cat 
                ? "bg-primary text-on-primary shadow-sm" 
                : "bg-surface-container-high text-on-surface-variant hover:bg-secondary-fixed"
            )}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="space-y-4">
        {UPDATES
          .filter(u => activeCategory === 'All' || 
            (activeCategory === 'Program Changes' && u.type === 'urgent') ||
            (activeCategory === 'Venue Updates' && u.type === 'venue') ||
            (activeCategory === 'ASPAC News' && u.type === 'news')
          )
          .map(update => (
          <article 
            key={update.id}
            className={cn(
              "bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/10",
              update.type === 'urgent' && "border-l-4 border-error p-5",
              update.type !== 'urgent' && "flex flex-col"
            )}
          >
            {update.image && (
              <div className="h-48 w-full bg-surface-container">
                <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className={cn(update.type !== 'urgent' && "p-5")}>
              <div className="flex justify-between items-start mb-3">
                <span className={cn(
                  "text-[10px] font-bold font-label px-2 py-1 rounded uppercase tracking-wider",
                  update.type === 'urgent' ? "bg-error-container text-on-error-container" :
                  update.type === 'info' ? "bg-secondary-container text-on-secondary-container" :
                  update.type === 'news' ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                  "bg-primary-fixed text-on-primary-fixed-variant"
                )}>
                  {update.type === 'urgent' ? 'Urgent' : update.type === 'info' ? 'General Info' : update.type === 'news' ? 'ASPAC News' : 'Venue Updates'}
                </span>
                <time className="text-outline text-xs font-label">{update.time}</time>
              </div>
              <h2 className="text-lg font-bold text-on-surface mb-2 leading-tight">{update.title}</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{update.content}</p>
              
              {update.actionLabel && (
                <button className={cn(
                  "w-full py-3 font-bold text-sm rounded-lg transition-all active:scale-[0.98]",
                  update.type === 'urgent' ? "flex items-center gap-2 text-primary uppercase tracking-widest text-xs hover:bg-primary/5" :
                  "bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary"
                )}>
                  {update.type === 'urgent' && <Map className="w-4 h-4" />}
                  {update.actionLabel}
                </button>
              )}
            </div>
          </article>
        ))}

        <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
          <CheckCircle2 className="w-10 h-10 mb-2" />
          <p className="font-label text-sm font-semibold tracking-wider uppercase">You're all caught up</p>
        </div>
      </div>
    </div>
  );
}

function VenueView() {
  const [activeView, setActiveView] = useState<'guide' | 'getting-there'>('guide');

  return (
    <div className="px-6 py-6 space-y-8">
      <section>
        <span className="font-label text-secondary text-sm font-semibold tracking-wider uppercase">Manila Convention Center</span>
        <h2 className="text-4xl font-extrabold text-primary tracking-tight mt-1">Venue Guide</h2>
      </section>

      <div className="flex bg-surface-container-high p-1 rounded-xl">
        <button 
          onClick={() => setActiveView('guide')}
          className={cn(
            "flex-1 py-2.5 rounded-lg font-bold text-sm transition-all",
            activeView === 'guide' ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-primary"
          )}
        >
          Inside Venue
        </button>
        <button 
          onClick={() => setActiveView('getting-there')}
          className={cn(
            "flex-1 py-2.5 rounded-lg font-bold text-sm transition-all",
            activeView === 'getting-there' ? "bg-white text-primary shadow-sm" : "text-secondary hover:text-primary"
          )}
        >
          Getting There
        </button>
      </div>

      {activeView === 'guide' ? (
        <div className="space-y-6">
          {/* Map Card */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary">Floor Plan</h3>
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold font-label">L2 - Main Floor</span>
              </div>
            </div>
            <div className="relative aspect-video bg-surface-container-low group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592dee58c160?auto=format&fit=crop&q=80&w=800" 
                alt="Floor Plan" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50" 
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-3/4 border-2 border-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-1/2 h-1/2 border-2 border-primary/10 rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-white/90 backdrop-blur shadow-lg p-2 rounded-lg text-primary active:scale-90 transition-transform"><SearchIcon className="w-5 h-5" /></button>
                <button className="bg-white/90 backdrop-blur shadow-lg p-2 rounded-lg text-primary active:scale-90 transition-transform"><Layout className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="bg-primary p-6 rounded-xl text-on-primary shadow-lg">
            <h3 className="font-bold text-lg mb-4 font-headline">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Users className="w-6 h-6" />, label: 'Restrooms' },
                { icon: <ArrowRight className="w-6 h-6 -rotate-90" />, label: 'Elevators' },
                { icon: <InfoIcon className="w-6 h-6" />, label: 'Help Desk' },
                { icon: <CheckCircle2 className="w-6 h-6" />, label: 'First Aid' }
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors cursor-pointer border border-white/10 active:scale-95">
                  {item.icon}
                  <span className="font-label text-[10px] uppercase font-bold mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              Key Locations
              <div className="h-[2px] grow bg-surface-container-highest"></div>
            </h3>
            <div className="grid gap-4">
              {VENUE_LOCATIONS.map(loc => (
                <div key={loc.id} className="bg-surface-container-lowest p-5 rounded-xl transition-all hover:translate-y-[-2px] hover:shadow-md flex items-start gap-4 border border-outline-variant/5">
                  <div className="bg-primary-container text-on-primary-container p-3 rounded-xl">
                    {loc.icon === 'meeting_room' ? <DoorOpen /> : 
                     loc.icon === 'architecture' ? <Compass /> :
                     loc.icon === 'coffee' ? <CoffeeIcon /> :
                     loc.icon === 'restaurant' ? <Utensils /> :
                     loc.icon === 'how_to_reg' ? <UserCheck /> : <Tv />}
                  </div>
                  <div>
                    <span className="font-label text-[10px] font-extrabold text-secondary uppercase tracking-widest">{loc.floor} • {loc.hall}</span>
                    <h4 className="text-lg font-bold text-primary mt-1">{loc.name}</h4>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{loc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <MapPin className="w-6 h-6" />
              <h3 className="text-xl font-bold">SMX Convention Center</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Seashell Ln, Pasay, 1300 Metro Manila, Philippines. Located within the Mall of Asia Complex.
            </p>
            <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <ExternalLink className="w-4 h-4" />
              Open in Google Maps
            </button>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-primary px-2">Transport Options</h3>
            <div className="grid gap-4">
              {[
                { title: 'Official Shuttle', desc: 'Free for delegates. Pick-up from partner hotels every 30 mins.', icon: <Users className="w-5 h-5" /> },
                { title: 'Grab / Taxi', desc: 'Ask for "SMX Convention Center MOA". Drop-off at Main Lobby.', icon: <ArrowRight className="w-5 h-5" /> },
                { title: 'Public Transport', desc: 'Take the MRT-3 to Taft Ave, then a jeepney to MOA.', icon: <Compass className="w-5 h-5" /> }
              ].map((opt, i) => (
                <div key={i} className="bg-surface-container-low p-5 rounded-xl flex items-start gap-4 border border-outline-variant/5">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{opt.title}</h4>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function MoreView({ onShowcaseClick, onFAQClick }: { onShowcaseClick: () => void, onFAQClick: () => void }) {
  return (
    <div className="px-6 py-6 space-y-12">
      <section>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">About Pulse</h2>
        <p className="font-label text-sm uppercase tracking-widest text-secondary font-semibold">ASPAC Manila 2026 Companion</p>
      </section>

      <div className="space-y-4">
        {/* Showcase CTA */}
        <button 
          onClick={onShowcaseClick}
          className="w-full bg-primary text-on-primary p-6 rounded-xl shadow-lg flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-fixed" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg leading-tight">Interactive Showcase</h3>
              <p className="text-primary-fixed/70 text-xs font-label uppercase tracking-widest mt-1">Explore Key Features</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* FAQ CTA */}
        <button 
          onClick={onFAQClick}
          className="w-full bg-surface-container-low text-primary p-6 rounded-xl border border-primary/10 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <InfoIcon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg leading-tight">Help & FAQ</h3>
              <p className="text-secondary text-xs font-label uppercase tracking-widest mt-1">Common Questions</p>
            </div>
          </div>
          <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-3">Digital Concierge</h3>
          <p className="text-on-surface-variant leading-relaxed">
            Pulse is designed as a lightweight digital companion for the Kiwanis ASPAC Convention. Our mission is to provide attendees with instantaneous access to schedule updates, venue maps, and session details through a high-performance, editorial-grade interface.
          </p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
          <div className="flex items-start gap-4">
            <InfoIcon className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="text-sm font-label font-bold uppercase tracking-wider text-primary mb-2">Legal Disclaimer</h3>
              <p className="text-on-surface leading-relaxed font-medium">
                Pulse is a public companion app for the Manila 2026 convention. It is not an official operating system and does not replace official communication channels or on-site signage.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-label font-bold uppercase tracking-wider text-secondary">Official Resources</h3>
          {[
            { label: 'Kiwanis International', sub: 'kiwanis.org', icon: <Globe className="w-5 h-5" /> },
            { label: 'Convention Website', sub: 'aspac2026.com.ph', icon: <Calendar className="w-5 h-5" /> }
          ].map(link => (
            <a key={link.label} className="flex items-center justify-between group p-3 -mx-3 rounded-lg hover:bg-surface-container-lowest transition-colors" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                  {link.icon}
                </div>
                <div>
                  <p className="font-bold text-primary">{link.label}</p>
                  <p className="text-xs text-on-surface-variant">{link.sub}</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        <div className="pt-12 pb-8 text-center">
          <div className="inline-block px-4 py-1 bg-surface-container-highest rounded-full text-[10px] font-label font-bold tracking-[0.2em] text-secondary uppercase mb-4">
            Pulse App Version 2.1.0-Manila
          </div>
          <p className="text-xs text-outline leading-loose px-8">
            Designed for Kiwanis International by the Civic Clarity Systems Team.<br/>
            © 2026 All Rights Reserved. Manila, Philippines.
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQView() {
  const [activeCategory, setActiveCategory] = useState('General');
  const categories = Array.from(new Set(FAQS.map(f => f.category)));

  return (
    <div className="px-6 py-6 space-y-8">
      <section>
        <h1 className="text-4xl font-black text-primary tracking-tight mb-2">Help & FAQ</h1>
        <p className="text-secondary font-label text-sm uppercase tracking-widest">Common questions answered</p>
      </section>

      <nav className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-none px-6 py-2 rounded-full font-label text-sm font-bold transition-all active:scale-95",
              activeCategory === cat 
                ? "bg-primary text-on-primary shadow-sm" 
                : "bg-surface-container-high text-on-surface-variant hover:bg-secondary-fixed"
            )}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="space-y-4">
        {FAQS.filter(f => f.category === activeCategory).map((faq, i) => (
          <details key={i} className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden">
            <summary className="flex justify-between items-center p-5 cursor-pointer list-none font-bold text-primary group-open:bg-primary/5">
              {faq.question}
              <ChevronRightIcon className="w-5 h-5 transition-transform group-open:rotate-90" />
            </summary>
            <div className="p-5 pt-0 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/5">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-2xl text-center space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-primary">Still need help?</h3>
        <p className="text-sm text-on-surface-variant">Visit the Help Desk at the SMX Main Lobby or contact your delegation head.</p>
        <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform">
          Contact Support
        </button>
      </div>
    </div>
  );
}

function ShowcaseView() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const features = [
    {
      id: 'updates',
      title: 'Real-time Updates',
      desc: 'Instant notifications for program changes and venue alerts.',
      x: '20%',
      y: '30%',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'schedule',
      title: 'Interactive Schedule',
      desc: 'Browse and save sessions with a single tap.',
      x: '75%',
      y: '45%',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 'venue',
      title: 'Venue Guide',
      desc: 'High-resolution floor plans and key location navigation.',
      x: '40%',
      y: '70%',
      icon: <Map className="w-5 h-5" />
    }
  ];

  return (
    <div className="px-6 py-6 space-y-8 min-h-screen">
      <section>
        <h2 className="text-3xl font-black text-primary tracking-tight mb-2">Pulse Showcase</h2>
        <p className="text-secondary font-label text-sm uppercase tracking-widest">Interactive Product Tour</p>
      </section>

      {/* Interactive Product Image */}
      <div className="relative bg-surface-container-low rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-outline-variant/20">
        <img 
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
          alt="Pulse App Mockup" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />

        {/* Hotspots */}
        {features.map(feature => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(feature.id)}
            style={{ left: feature.x, top: feature.y }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
              activeFeature === feature.id 
                ? "bg-primary text-on-primary scale-125 z-30 shadow-xl" 
                : "bg-white/90 text-primary hover:bg-primary hover:text-on-primary z-20 shadow-md"
            )}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MousePointer2 className="w-5 h-5" />
            </motion.div>
          </button>
        ))}

        {/* Feature Tooltip */}
        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-5 shadow-2xl z-40 border border-primary/10"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {features.find(f => f.id === activeFeature)?.icon}
                  </div>
                  <h3 className="font-bold text-primary">{features.find(f => f.id === activeFeature)?.title}</h3>
                </div>
                <button onClick={() => setActiveFeature(null)} className="text-outline hover:text-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {features.find(f => f.id === activeFeature)?.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
        <h3 className="font-bold text-primary">Experience the Future</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Pulse isn't just an app; it's a bridge between delegates and the convention experience. Click the hotspots above to see how we're redefining event engagement.
        </p>
        <button 
          onClick={() => setShowFeedback(true)}
          className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Share Your Feedback
        </button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <FeedbackForm onClose={() => setShowFeedback(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function FeedbackForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comments: '',
    rating: 0
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('--- Pulse Showcase Feedback ---');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Rating:', formData.rating, 'stars');
    console.log('Comments:', formData.comments);
    console.log('-------------------------------');
    
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-primary tracking-tight">Feedback</h3>
            <button onClick={onClose} className="text-outline hover:text-primary">
              <X className="w-6 h-6" />
            </button>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-primary">Thank You!</h4>
              <p className="text-sm text-on-surface-variant">Your feedback has been logged to the console.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-label uppercase tracking-widest text-secondary">Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-label uppercase tracking-widest text-secondary">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-label uppercase tracking-widest text-secondary">Overall Impression</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className={cn(
                        "transition-colors",
                        formData.rating >= star ? "text-primary" : "text-outline-variant"
                      )}
                    >
                      <Star className={cn("w-8 h-8", formData.rating >= star && "fill-current")} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-label uppercase tracking-widest text-secondary">Comments</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.comments}
                  onChange={e => setFormData({...formData, comments: e.target.value})}
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary resize-none"
                  placeholder="What did you think of the showcase?"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SessionDetail({ session, onClose }: { session: Session, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-surface flex flex-col max-w-md mx-auto"
    >
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 h-16">
          <button onClick={onClose} className="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <span className="font-headline font-bold tracking-tight text-primary">Session Details</span>
          <button className="p-2 -mr-2 hover:bg-surface-container-high rounded-full transition-colors">
            <Share2 className="w-6 h-6 text-primary" />
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-0.5 bg-primary text-on-primary rounded-full text-[10px] font-label font-bold tracking-widest uppercase">
            {session.status === 'now' ? 'Live Now' : 'Upcoming'}
          </span>
          <span className="font-label text-xs font-bold text-secondary">Track: {session.category[0]}</span>
        </div>
        
        <h1 className="text-2xl font-headline font-black leading-tight text-primary mb-4">
          {session.title}
        </h1>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/5">
            <span className="font-label text-[10px] uppercase tracking-wider text-secondary mb-0.5 block">Time</span>
            <span className="text-base font-headline font-bold text-primary">{session.time} — {session.endTime || '10:30'}</span>
          </div>
          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/5">
            <span className="font-label text-[10px] uppercase tracking-wider text-secondary mb-0.5 block">Room</span>
            <span className="text-base font-headline font-bold text-primary">{session.room}</span>
          </div>
        </div>

        <button className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-headline font-bold flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all mb-6">
          <BookmarkIcon className={cn("w-5 h-5", session.isSaved && "fill-current")} />
          {session.isSaved ? 'Saved to Schedule' : 'Save to My Schedule'}
        </button>

        <section className="mb-8">
          <h2 className="font-label text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">Abstract</h2>
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
            <p className="text-on-surface-variant leading-relaxed text-base font-body">
              {session.description}
            </p>
          </div>
        </section>

        {session.speakers.length > 0 && (
          <section className="mb-8">
            <h2 className="font-label text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">Presented By</h2>
            <div className="space-y-2">
              {session.speakers.map(speaker => (
                <div key={speaker.name} className="flex items-center gap-4 bg-surface-container-low p-3 rounded-xl border border-outline-variant/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-dim shadow-sm">
                    <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary text-sm">{speaker.name}</h3>
                    <p className="text-xs font-label text-secondary">{speaker.role}</p>
                  </div>
                  <button className="ml-auto p-2 text-primary hover:bg-primary/5 rounded-full active:scale-90 transition-transform">
                    <InfoIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="font-label text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">Resources</h2>
          <div className="grid gap-2">
            <div className="flex items-center gap-3 p-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl group cursor-pointer active:bg-surface-container-low transition-colors">
              <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
                <DownloadIcon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-headline font-bold text-xs text-on-surface">Presentation Deck (PDF)</h4>
                <p className="text-[10px] font-label text-secondary">2.4 MB • Shared by Speaker</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-secondary" />
            </div>
          </div>
        </section>

        <div className="bg-primary/5 p-6 rounded-2xl text-center mb-6 border border-primary/10">
          <h3 className="font-headline font-bold text-primary mb-1 text-sm">Rate this Session</h3>
          <p className="text-on-surface-variant text-xs font-body mb-4">Help us improve future ASPAC Highlights.</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} className="text-primary/20 hover:text-primary transition-colors">
                <Star className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
