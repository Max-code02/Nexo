import React from 'react';
import { NexoLogo } from './NexoLogo';
import { DiscordMockup } from './DiscordMockup';
import { COMMUNITY_INFO } from '../data/communityData';
import { useDiscordStats } from '../context/DiscordStatsContext';
import { Sparkles, Users, ArrowRight, Zap, Copy, Check, Radio } from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onOpenRules: () => void;
  onOpenTicket: () => void;
  onOpenApply: () => void;
  onOpenDiscordLive?: () => void;
  onSelectEvent: (eventId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRules,
  onOpenTicket,
  onOpenApply,
  onOpenDiscordLive,
  onSelectEvent,
}) => {
  const [copied, setCopied] = React.useState(false);
  const { isLive, memberCount, onlineCount, inviteCode } = useDiscordStats();

  const handleCopyInvite = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(COMMUNITY_INFO.discordInviteUrl);
    setCopied(true);
    playUiSound('success');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fef08a', '#eab308', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background Lighting / Particle Atmosphere */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* Subtle geometric grid lines */}
      <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Growth Banner matching the poster's top-right badge */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-amber-400/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>DEINE DEUTSCHE GAMING & ESPORTS COMMUNITY</span>
          </div>

          {/* Poster's top-right badge: "WERDE TEIL VON NEXO - WIR WACHSEN - SEI DABEI!" */}
          <div
            id="growth-badge"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-transparent border border-amber-400/50 shadow-[0_0_20px_rgba(250,204,21,0.2)] ml-auto"
          >
            <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-amber-300 font-['Chakra_Petch'] uppercase tracking-wider">
                WERDE TEIL VON NEXO
              </div>
              <div className="text-[11px] text-zinc-300 font-semibold">
                WIR WACHSEN – SEI DABEI!
              </div>
            </div>
          </div>
        </div>

        {/* Hero Main Grid (Poster Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand, Headline, Message */}
          <div className="lg:col-span-6 space-y-6">
            {/* Nexo Brand Header */}
            <div>
              <NexoLogo size="lg" className="mb-4" />
              
              {/* Massive Poster Headline: "DEINE NEUE GAMING COMMUNITY" */}
              <h1
                id="hero-main-title"
                className="text-4xl sm:text-5xl xl:text-6xl font-black font-['Chakra_Petch'] uppercase tracking-tight text-white leading-none mt-2"
              >
                DEINE NEUE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 gold-glow-text block sm:inline">
                  GAMING COMMUNITY
                </span>
              </h1>
            </div>

            {/* Poster Description Text */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-medium">
                <span className="text-white font-bold">NEXO</span> ist mehr als nur ein Discord Server – wir sind eine Community!
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Gemeinsam zocken, quatschen, Events feiern & zusammen wachsen. Egal ob Casual Gamer oder Ranked Tryhard – hier findest du dein Team!
              </p>
            </div>

            {/* Poster Highlight: "WIR FREUEN UNS AUF DICH! ⚡" */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-transparent border-l-4 border-amber-400 flex items-center justify-between">
              <div className="flex items-center gap-2 text-base sm:text-lg font-black text-amber-300 font-['Chakra_Petch'] tracking-wide">
                <Zap className="w-5 h-5 text-yellow-300 animate-pulse fill-amber-400" />
                <span>WIR FREUEN UNS AUF DICH!</span>
                <span className="text-yellow-400">⚡</span>
              </div>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                #NEXOfamily
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Join Discord Main Button */}
              <a
                id="btn-hero-join"
                href={COMMUNITY_INFO.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('join')}
                className="group relative overflow-hidden px-7 py-4 rounded-xl font-black text-sm uppercase tracking-widest font-['Chakra_Petch'] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-[0_0_25px_rgba(250,204,21,0.5)] hover:shadow-[0_0_35px_rgba(250,204,21,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-5 h-5" />
                <span>JETZT BEITRETEN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>

              {/* Copy Invite Code Button */}
              <button
                id="btn-hero-copy-code"
                onClick={handleCopyInvite}
                className="px-5 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-400/30 hover:border-amber-400/70 text-zinc-200 font-bold text-xs uppercase tracking-wider font-['Chakra_Petch'] transition-all flex items-center justify-center gap-2"
                title="Discord Link in die Zwischenablage kopieren"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span className="lowercase font-mono text-zinc-300 font-bold tracking-normal text-xs sm:text-sm">
                      discord.gg/{COMMUNITY_INFO.discordInviteCode}
                    </span>
                  </>
                )}
              </button>

              {/* Team Apply Button */}
              <button
                onClick={() => {
                  playUiSound('click');
                  onOpenApply();
                }}
                className="px-5 py-4 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider font-['Chakra_Petch'] transition-all text-center"
              >
                Team Bewerbung
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  if (onOpenDiscordLive) onOpenDiscordLive();
                }}
                className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400/50 transition-all text-left group cursor-pointer"
              >
                <div className="text-xl sm:text-2xl font-black font-['Chakra_Petch'] text-amber-400 group-hover:text-amber-300 transition-colors">
                  {memberCount}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium flex items-center justify-between">
                  <span>Mitglieder</span>
                  {isLive && <span className="text-[9px] text-emerald-400 font-mono">● LIVE</span>}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  if (onOpenDiscordLive) onOpenDiscordLive();
                }}
                className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-400/50 transition-all text-left group cursor-pointer"
              >
                <div className="text-xl sm:text-2xl font-black font-['Chakra_Petch'] text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {onlineCount}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium flex items-center justify-between">
                  <span>Online & Zocken</span>
                  {isLive && <span className="text-[9px] text-emerald-400 font-mono">ECHTZEIT</span>}
                </div>
              </button>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-xl sm:text-2xl font-black font-['Chakra_Petch'] text-yellow-300">
                  {COMMUNITY_INFO.stats.tournamentsHosted}+
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">Turniere & Events</div>
              </div>
            </div>
          </div>

          {/* Right Column: Poster's Discord Server Interactive Card */}
          <div className="lg:col-span-6" id="discord-preview">
            <div className="relative">
              {/* Decorative Corner Glow */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
              
              <DiscordMockup
                onOpenRules={onOpenRules}
                onOpenTicket={onOpenTicket}
                onOpenDiscordLive={onOpenDiscordLive}
                onSelectEvent={onSelectEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
