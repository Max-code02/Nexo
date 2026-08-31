import React, { useState } from 'react';
import { 
  Hash, 
  Volume2, 
  Users, 
  Calendar, 
  Trophy, 
  Star, 
  Box, 
  Sparkles, 
  ShieldCheck, 
  Ticket, 
  ChevronRight,
  MessageSquare,
  Smile,
  Send,
  Radio,
  Lock,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { DISCORD_CHANNELS, UPCOMING_EVENTS, COMMUNITY_INFO } from '../data/communityData';
import { useDiscordStats } from '../context/DiscordStatsContext';
import { playUiSound } from '../utils/audio';
import { ChatRedirectModal } from './Modals';

interface DiscordMockupProps {
  onOpenRules: () => void;
  onOpenTicket: () => void;
  onOpenDiscordLive?: () => void;
  onSelectEvent: (eventId: string) => void;
}

export const DiscordMockup: React.FC<DiscordMockupProps> = ({
  onOpenRules,
  onOpenTicket,
  onOpenDiscordLive,
  onSelectEvent,
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>('c1');
  const [showChatRedirectModal, setShowChatRedirectModal] = useState<boolean>(false);
  const { isLive, memberCount, onlineCount, serverName, serverIconUrl } = useDiscordStats();
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; avatarBg: string; role: string; time: string; text: string; isStaff?: boolean }>>([
    {
      id: 'm1',
      user: 'Niko (Serverleitung)',
      avatarBg: 'bg-amber-500',
      role: 'Owner',
      time: 'Heute um 14:20',
      text: 'Willkommen an alle neuen Mitglieder bei NEXO! ⚡ Schaut euch gerne in #events um – dieses Wochenende steht das 1v1 Turnier an!',
      isStaff: true,
    },
    {
      id: 'm2',
      user: 'GhostRider',
      avatarBg: 'bg-blue-500',
      role: 'Member',
      time: 'Heute um 14:23',
      text: 'Wer hat Bock heute Abend auf Valorant 5-Stack oder CS2 Premier? Schreibt in #suche-gruppe!',
    },
    {
      id: 'm3',
      user: 'Kira_Support',
      avatarBg: 'bg-emerald-500',
      role: 'Support-Team',
      time: 'Heute um 14:25',
      text: 'Reminder: Wenn ihr Fragen oder Wünsche habt, könnt ihr jederzeit in #ticket-erstellen ein Ticket öffnen!',
      isStaff: true,
    },
  ]);
  const [userInput, setUserInput] = useState('');

  const activeChannel = DISCORD_CHANNELS.find((c) => c.id === activeChannelId) || DISCORD_CHANNELS[0];

  const handleOpenChatRedirect = () => {
    playUiSound('electric');
    setShowChatRedirectModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenChatRedirect();
  };

  return (
    <div
      id="discord-interactive-mockup"
      className="relative rounded-2xl overflow-hidden bg-[#0e1118]/95 border-2 border-amber-400/50 shadow-[0_0_40px_rgba(250,204,21,0.25)] flex flex-col font-sans"
    >
      {/* Top Banner / Window Controls */}
      <div className="bg-[#121620] px-4 py-2.5 border-b border-amber-400/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          <span className="text-xs text-zinc-400 font-mono ml-2 hidden sm:inline">discord.com/app/nexo</span>
        </div>
        <button
          type="button"
          onClick={() => {
            playUiSound('click');
            if (onOpenDiscordLive) onOpenDiscordLive();
          }}
          className="flex items-center gap-2 text-xs font-['Chakra_Petch'] text-amber-400 font-bold tracking-wider hover:text-amber-300 transition-colors cursor-pointer group"
          title="Klicken für Live-Status"
        >
          <Radio className={`w-3.5 h-3.5 ${isLive ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
          <span>{isLive ? 'DISCORD LIVE SYNC' : 'SERVER STATUS'}</span>
          <span className="text-[10px] text-zinc-500 font-mono group-hover:text-zinc-300">⚙️</span>
        </button>
      </div>

      {/* Main Grid: Sidebar + Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
        {/* Left Column: Discord Server Navigation */}
        <div className="md:col-span-5 bg-[#090b10] border-r border-amber-400/20 p-3 flex flex-col justify-between">
          <div>
            {/* Server Badge in Poster Style */}
            <div className="p-3 mb-3 rounded-xl bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-transparent border border-amber-400/30 flex items-center gap-3">
              {serverIconUrl ? (
                <img
                  src={serverIconUrl}
                  alt={serverName}
                  className="w-10 h-10 rounded-lg border border-amber-400/60 object-cover shadow-[0_0_12px_rgba(250,204,21,0.4)] flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-black border border-amber-400/60 flex items-center justify-center shadow-[0_0_12px_rgba(250,204,21,0.4)] flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-6 h-6">
                    <path
                      d="M56 18 L32 52 L50 52 L42 82 L70 46 L52 46 Z"
                      fill="#facc15"
                    />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-white text-base tracking-wide font-['Chakra_Petch'] truncate">
                    {serverName}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    {onlineCount} ON
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 font-semibold">{memberCount}</span> Mitglieder
                </p>
              </div>
            </div>

            {/* Channels List by Categories (Exact match with poster image) */}
            <div className="space-y-3 text-xs max-h-[310px] overflow-y-auto pr-1 select-none">
              {/* Category: WILLKOMMEN */}
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1 flex items-center justify-between">
                  <span>WILLKOMMEN</span>
                </div>
                <div className="space-y-0.5">
                  {DISCORD_CHANNELS.filter((c) => c.category === 'WILLKOMMEN').map((c) => {
                    const isSelected = activeChannelId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          playUiSound('click');
                          setActiveChannelId(c.id);
                          if (c.name === 'regeln') onOpenRules();
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{c.name}</span>
                        </span>
                        {c.name === 'regeln' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            Regeln
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category: COMMUNITY */}
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1">
                  COMMUNITY
                </div>
                <div className="space-y-0.5">
                  {DISCORD_CHANNELS.filter((c) => c.category === 'COMMUNITY').map((c) => {
                    const isSelected = activeChannelId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          playUiSound('click');
                          setActiveChannelId(c.id);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{c.name}</span>
                        </span>
                        {c.unread && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category: GAMING */}
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1">
                  GAMING
                </div>
                <div className="space-y-0.5">
                  {DISCORD_CHANNELS.filter((c) => c.category === 'GAMING').map((c) => {
                    const isSelected = activeChannelId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          playUiSound('click');
                          setActiveChannelId(c.id);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{c.name}</span>
                        </span>
                        {c.name === 'turniere' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-yellow-500/20 text-yellow-300">
                            1v1
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category: SUPPORT */}
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1">
                  SUPPORT
                </div>
                <button
                  onClick={() => {
                    playUiSound('click');
                    setActiveChannelId('c9');
                    onOpenTicket();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                    activeChannelId === 'c9'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5 text-amber-400" />
                    <span>ticket-erstellen</span>
                  </span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Hilfe
                  </span>
                </button>
              </div>

              {/* Category: VOICE */}
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1">
                  VOICE (24/7 TALK)
                </div>
                <div className="space-y-1">
                  {DISCORD_CHANNELS.filter((c) => c.category === 'VOICE').map((v) => (
                    <div key={v.id} className="bg-zinc-900/60 rounded-md p-1.5 border border-zinc-800">
                      <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs mb-1 px-1">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>{v.name}</span>
                      </div>
                      {v.members && (
                        <div className="space-y-1 pl-4">
                          {v.members.map((member, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500/30"></span>
                              <span className="truncate">{member}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 mt-2">
            <div className="text-[10px] text-zinc-400 text-center font-mono">
              ⚡ Gekoppelt mit Discord Gateway
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Content / Channel View & Events Widget */}
        <div className="md:col-span-7 bg-[#0b0e14] p-4 flex flex-col justify-between">
          <div>
            {/* Top Server Greeting Box (Matching Poster Image Layout) */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-900/90 border border-amber-400/30 mb-4 shadow-[0_0_15px_rgba(250,204,21,0.08)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-amber-400 font-extrabold text-sm sm:text-base tracking-wide font-['Chakra_Petch'] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    WILLKOMMEN BEI NEXO!
                  </h3>
                  <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                    Ein aktiver Gaming-Server mit einer starken Community & engagiertem Team.
                  </p>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-400 text-black font-['Chakra_Petch']">
                    OFFIZIELL
                  </span>
                </div>
              </div>
            </div>

            {/* AKTUELLE EVENTS CARD (Matching Poster Image) */}
            <div className="p-3.5 rounded-xl bg-[#10141d] border border-amber-400/40 mb-4 shadow-[0_0_20px_rgba(250,204,21,0.12)]">
              <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-xs sm:text-sm font-extrabold text-amber-300 uppercase tracking-wider font-['Chakra_Petch']">
                    AKTUELLE EVENTS
                  </span>
                </div>
                <a
                  href="#events"
                  onClick={() => playUiSound('click')}
                  className="text-[11px] text-zinc-400 hover:text-amber-400 flex items-center gap-0.5 font-medium transition-colors"
                >
                  Alle Events <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              {/* 3 Featured Events matching poster */}
              <div className="space-y-2">
                {/* 1v1 Turnier */}
                <div
                  onClick={() => {
                    playUiSound('click');
                    onSelectEvent('event-1');
                  }}
                  className="p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-amber-400/25 hover:border-amber-400/60 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate font-['Chakra_Petch']">
                        1v1 Turnier
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Samstag, 18:00 Uhr
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    Teilnehmen
                  </span>
                </div>

                {/* Community Abend */}
                <div
                  onClick={() => {
                    playUiSound('click');
                    onSelectEvent('event-2');
                  }}
                  className="p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-amber-400/25 hover:border-amber-400/60 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-center text-yellow-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors truncate font-['Chakra_Petch']">
                        Community Abend
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Freitag, 20:00 Uhr
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    Dabei sein
                  </span>
                </div>

                {/* Minecraft Event */}
                <div
                  onClick={() => {
                    playUiSound('click');
                    onSelectEvent('event-3');
                  }}
                  className="p-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-amber-400/25 hover:border-amber-400/60 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Box className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate font-['Chakra_Petch']">
                        Minecraft Event
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Sonntag, 16:00 Uhr
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    Details
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Chat Stream Preview */}
            <div className="bg-black/40 rounded-xl border border-zinc-800 p-3">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-zinc-800/80 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  Live Chat #{activeChannel.name}
                </span>
                <span className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  Discord-Verbindung
                </span>
              </div>

              <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-xs flex items-start gap-2">
                    <div className={`w-6 h-6 rounded-full ${msg.avatarBg} text-black font-bold flex items-center justify-center text-[10px] flex-shrink-0`}>
                      {msg.user[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-[11px] truncate">{msg.user}</span>
                        {msg.isStaff && (
                          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                            STAFF
                          </span>
                        )}
                        <span className="text-[9px] text-zinc-400">{msg.time}</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-tight break-words">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input & Discord Redirect Trigger */}
              <div className="mt-2.5">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <div 
                    onClick={handleOpenChatRedirect}
                    className="flex-1 bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-700/70 hover:border-amber-400/70 rounded-lg px-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-500 cursor-pointer flex items-center justify-between gap-2 transition-all group"
                  >
                    <span className="truncate text-zinc-400 group-hover:text-amber-300 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span>Hier klicken, um auf Discord zu chatten...</span>
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30 flex-shrink-0 hidden sm:inline">
                      Discord Join &rarr;
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenChatRedirect}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-all font-['Chakra_Petch'] font-bold text-xs flex items-center gap-1.5 flex-shrink-0 shadow-[0_0_12px_rgba(250,204,21,0.3)]"
                    title="Live-Chat auf Discord öffnen"
                  >
                    <Send className="w-3 h-3" />
                    <span>Chatten</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Card Tagline (Directly from poster: "Gemeinsam. Aktiv. NEXO. ⚡") */}
          <div className="mt-3 pt-2 border-t border-amber-400/20 flex items-center justify-between text-xs">
            <span className="font-['Chakra_Petch'] font-bold text-amber-400 tracking-wider">
              Gemeinsam. Aktiv. NEXO. ⚡
            </span>
            <button
              onClick={handleOpenChatRedirect}
              className="text-[11px] font-bold text-amber-300 hover:text-white underline decoration-amber-400/50 underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              Jetzt im Discord mitreden &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Discord Chat Redirect Popup Modal */}
      <ChatRedirectModal
        isOpen={showChatRedirectModal}
        channelName={activeChannel.name}
        onClose={() => setShowChatRedirectModal(false)}
      />
    </div>
  );
};
