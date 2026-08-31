import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TeamSection } from './components/TeamSection';
import { EventsSection } from './components/EventsSection';
import { LFGSection } from './components/LFGSection';
import { JoinSection } from './components/JoinSection';
import { HighlightBar } from './components/HighlightBar';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RulesModal, TicketModal, ApplyModal } from './components/Modals';
import { CollapsibleTopic } from './components/CollapsibleTopic';
import { 
  Zap, 
  Users, 
  Trophy, 
  Gamepad2, 
  Radio, 
  HelpCircle, 
  ChevronsUpDown, 
  Maximize2, 
  Minimize2,
  Sparkles,
  Layers,
  CheckCircle
} from 'lucide-react';
import { playUiSound } from './utils/audio';

export default function App() {
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyRole, setApplyRole] = useState<string>('MODERATION');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // All topics start collapsed by default as requested
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    features: false,
    team: false,
    events: false,
    lfg: false,
    join: false,
    faq: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const expandAll = () => {
    playUiSound('electric');
    setOpenSections({
      features: true,
      team: true,
      events: true,
      lfg: true,
      join: true,
      faq: true,
    });
  };

  const collapseAll = () => {
    playUiSound('click');
    setOpenSections({
      features: false,
      team: false,
      events: false,
      lfg: false,
      join: false,
      faq: false,
    });
  };

  const handleOpenTopic = (key: string) => {
    // If it's a special anchor like discord-preview
    if (key === 'discord-preview') {
      const elem = document.getElementById('discord-preview');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setOpenSections((prev) => ({
      ...prev,
      [key]: true,
    }));

    setTimeout(() => {
      const elem = document.getElementById(key);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const handleOpenApply = (role?: string) => {
    if (role) {
      setApplyRole(role);
    }
    setApplyModalOpen(true);
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    handleOpenTopic('events');
  };

  const openCount = Object.values(openSections).filter(Boolean).length;
  const totalTopics = Object.keys(openSections).length;

  const topicShortcuts = [
    { key: 'features', label: 'Was erwartet dich', icon: Zap },
    { key: 'team', label: 'Team gesucht', icon: Users },
    { key: 'events', label: 'Events & Turniere', icon: Trophy },
    { key: 'lfg', label: 'Mitspieler (LFG)', icon: Gamepad2 },
    { key: 'join', label: 'Join Us (Discord)', icon: Radio },
    { key: 'faq', label: 'FAQ & Hilfe', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-amber-400 selection:text-black flex flex-col font-sans relative overflow-x-hidden">
      {/* Sticky Top Navbar */}
      <Navbar
        onOpenRules={() => setRulesModalOpen(true)}
        onOpenApply={() => handleOpenApply()}
        onNavigate={handleOpenTopic}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section + Discord Server Preview Widget */}
        <HeroSection
          onOpenRules={() => setRulesModalOpen(true)}
          onOpenTicket={() => setTicketModalOpen(true)}
          onOpenApply={() => handleOpenApply()}
          onSelectEvent={handleSelectEvent}
        />

        {/* 2. TOPICS ACCORDION HUB / THEMEN-ÜBERSICHT */}
        <section id="themen-hub" className="py-12 md:py-16 relative bg-[#07090e] border-t border-amber-400/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & Controls */}
            <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e111a] via-[#0b0e14] to-[#0a0c12] border border-amber-400/30 shadow-[0_0_30px_rgba(250,204,21,0.08)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-widest mb-3">
                  <Layers className="w-4 h-4 text-amber-400" />
                  THEMEN-ÜBERSICHT & COMMUNITY-BEREICHE
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Chakra_Petch'] uppercase text-white tracking-wide">
                  ALLE NEXO THEMEN IM ÜBERBLICK
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                  Klicke auf ein Thema zum Auf- oder Zuklappen. Aktueller Status:{' '}
                  <span className="font-bold text-amber-400">
                    {openCount === 0 ? 'Alle 6 Themen eingeklappt' : `${openCount} von ${totalTopics} ausgeklappt`}
                  </span>
                </p>
              </div>

              {/* Action Buttons: Expand All / Collapse All */}
              <div className="flex items-center gap-2.5 flex-wrap w-full lg:w-auto">
                <button
                  onClick={expandAll}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 border border-amber-400/50 hover:border-amber-400 text-amber-300 hover:text-black font-bold font-['Chakra_Petch'] text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.15)]"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Alle Ausklappen</span>
                </button>
                <button
                  onClick={collapseAll}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400/40 text-zinc-300 hover:text-white font-bold font-['Chakra_Petch'] text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Alle Einklappen</span>
                </button>
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-thin">
              {topicShortcuts.map((shortcut) => {
                const isOpen = openSections[shortcut.key];
                const Icon = shortcut.icon;
                return (
                  <button
                    key={shortcut.key}
                    onClick={() => {
                      playUiSound('click');
                      toggleSection(shortcut.key);
                    }}
                    className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold font-['Chakra_Petch'] transition-all ${
                      isOpen
                        ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(250,204,21,0.35)]'
                        : 'bg-[#0e1118] border-zinc-800 text-zinc-300 hover:border-amber-400/50 hover:text-amber-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{shortcut.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                        isOpen ? 'bg-black/20 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isOpen ? 'Geöffnet' : '+ Öffnen'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The Collapsible Topics */}
            <div className="space-y-4">
              {/* TOPIC 01: WAS ERWARTET DICH? */}
              <CollapsibleTopic
                id="features"
                topicNumber="01"
                title="Was erwartet dich?"
                subtitle="Aktive Community, Ticket-System, Engagiertes Team & Stetige Weiterentwicklung"
                icon={<Zap className="w-6 h-6" />}
                badge="4 Säulen"
                isOpen={openSections.features}
                onToggle={() => toggleSection('features')}
              >
                <FeaturesSection
                  onOpenTicket={() => setTicketModalOpen(true)}
                  onOpenRules={() => setRulesModalOpen(true)}
                  onOpenApply={() => handleOpenApply()}
                />
              </CollapsibleTopic>

              {/* TOPIC 02: WIR SUCHEN DICH! (TEAM & STAFF) */}
              <CollapsibleTopic
                id="team"
                topicNumber="02"
                title="Wir suchen dich! Werde Teil unseres Teams"
                subtitle="Moderation, Support, Event-Team, Organisation & Betreuung – Leitung: niko_0903"
                icon={<Users className="w-6 h-6" />}
                badge="Team gesucht"
                isOpen={openSections.team}
                onToggle={() => toggleSection('team')}
              >
                <TeamSection onOpenApply={handleOpenApply} />
              </CollapsibleTopic>

              {/* TOPIC 03: AKTUELLE EVENTS & TURNIERE */}
              <CollapsibleTopic
                id="events"
                topicNumber="03"
                title="Events & Turniere"
                subtitle="1v1 Community-Turnier, Discord Quiz & Wöchentliche Giveaways"
                icon={<Trophy className="w-6 h-6" />}
                badge="Turnierplan"
                isOpen={openSections.events}
                onToggle={() => toggleSection('events')}
              >
                <EventsSection
                  selectedEventId={selectedEventId}
                  onOpenTicket={() => setTicketModalOpen(true)}
                />
              </CollapsibleTopic>

              {/* TOPIC 04: MITSPIELER-SUCHE (LFG / SQUADS) */}
              <CollapsibleTopic
                id="lfg"
                topicNumber="04"
                title="Mitspieler-Suche (LFG / Squad-Finder)"
                subtitle="Finde Teammates für Valorant, CS2, Minecraft, Fortnite & GTA RP (#suche-gruppe)"
                icon={<Gamepad2 className="w-6 h-6" />}
                badge="#suche-gruppe"
                isOpen={openSections.lfg}
                onToggle={() => toggleSection('lfg')}
              >
                <LFGSection />
              </CollapsibleTopic>

              {/* TOPIC 05: DEIN WEG ZU NEXO (DISCORD JOIN & QR-CODE) */}
              <CollapsibleTopic
                id="join"
                topicNumber="05"
                title="Dein Weg zu NEXO: Join Us!"
                subtitle="discord.gg/MRCC6XSVWG – Tritt sofort über 534 Gaming-Begeisterten bei"
                icon={<Radio className="w-6 h-6" />}
                badge="Invite Code"
                isOpen={openSections.join}
                onToggle={() => toggleSection('join')}
              >
                <JoinSection />
              </CollapsibleTopic>

              {/* TOPIC 06: HÄUFIG GESTELLTE FRAGEN (FAQ) */}
              <CollapsibleTopic
                id="faq"
                topicNumber="06"
                title="Häufig gestellte Fragen (FAQ)"
                subtitle="Alles Wichtige zu Serverregeln, VIP-Rängen, Voice-Channels und Support"
                icon={<HelpCircle className="w-6 h-6" />}
                badge="Hilfe"
                isOpen={openSections.faq}
                onToggle={() => toggleSection('faq')}
              >
                <FAQSection />
              </CollapsibleTopic>
            </div>
          </div>
        </section>

        {/* 3. Bottom Highlight Bar with Motto: GEMEINSAM. AKTIV. STARK. NEXO. */}
        <HighlightBar />
      </main>

      {/* Footer */}
      <Footer
        onOpenRules={() => setRulesModalOpen(true)}
        onOpenTicket={() => setTicketModalOpen(true)}
        onOpenApply={() => handleOpenApply()}
        onNavigate={handleOpenTopic}
      />

      {/* Interactive Modals */}
      <RulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      />

      <TicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        initialRole={applyRole}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
