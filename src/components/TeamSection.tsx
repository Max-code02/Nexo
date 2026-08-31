import React, { useState } from 'react';
import { 
  Shield, 
  Headphones, 
  Users, 
  Calendar, 
  Heart, 
  Copy, 
  Check, 
  MessageSquare, 
  ExternalLink,
  Sparkles,
  Radio
} from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TeamSectionProps {
  onOpenApply: (selectedRole?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenApply }) => {
  const [copiedContact, setCopiedContact] = useState(false);

  const handleCopyDiscordTag = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.teamContactDiscord);
    setCopiedContact(true);
    playUiSound('success');
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#facc15', '#fef08a', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopiedContact(false), 2500);
  };

  const handleOpenDiscord = () => {
    playUiSound('join');
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fef08a', '#ffffff']
      });
    } catch {
      // ignore
    }
    window.open(COMMUNITY_INFO.discordInviteUrl, '_blank', 'noopener,noreferrer');
  };

  const roles = [
    {
      id: 'moderation',
      title: 'MODERATION',
      icon: Shield,
      desc: 'Sorge für ein freundliches Miteinander und einen sauberen Chat.'
    },
    {
      id: 'support',
      title: 'SUPPORT',
      icon: Headphones,
      desc: 'Hilf Mitgliedern bei Fragen und technischen Anliegen weiter.'
    },
    {
      id: 'organisation',
      title: 'ORGANISATION',
      icon: Users,
      desc: 'Unterstütze bei Team-Struktur, Koordination und Server-Planung.'
    },
    {
      id: 'event-team',
      title: 'EVENT-TEAM',
      icon: Calendar,
      desc: 'Plane und veranstalte spannende Gaming-Turniere und Community-Abende.'
    },
    {
      id: 'community-betreuung',
      title: 'COMMUNITY-BETREUUNG',
      icon: Heart,
      desc: 'Verstärke den Zusammenhalt durch Giveaways, Umfragen und Interaktion.'
    }
  ];

  return (
    <div className="py-2 md:py-4 relative">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Poster Container */}
        <div className="rounded-3xl bg-[#0c0f17]/95 border-2 border-amber-400/50 p-6 sm:p-10 shadow-[0_0_40px_rgba(250,204,21,0.2)]">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-widest mb-3">
              <Users className="w-4 h-4 text-amber-400" />
              WIR SUCHEN DICH!
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Chakra_Petch'] uppercase text-white tracking-wide">
              WERDE TEIL UNSERES TEAMS
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
              <span className="text-amber-400 font-bold">NEXO wächst</span> – und dafür brauchen wir <span className="text-white font-bold underline decoration-amber-400 underline-offset-4">DICH!</span> Werde Teil unseres Teams und hilf mit, NEXO noch besser zu machen.
            </p>
          </div>

          {/* 5 Roles Grid (Original Poster Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="p-5 rounded-2xl bg-zinc-900/90 border border-amber-400/30 hover:border-amber-400 hover:bg-zinc-850/90 transition-all duration-300 flex flex-col items-center text-center group shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/40 group-hover:bg-amber-400 group-hover:text-black text-amber-400 flex items-center justify-center transition-all duration-300 mb-3 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider font-['Chakra_Petch'] text-zinc-100 group-hover:text-amber-300 mb-1.5">
                    {role.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {role.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Lower Grid: "WAS WIR UNS WÜNSCHEN" & Direct Discord Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 border-t border-zinc-800/80">
            {/* Left: Checklist matching poster */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg font-black font-['Chakra_Petch'] uppercase text-amber-400 tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                WAS WIR UNS WÜNSCHEN:
              </h3>

              <div className="grid grid-cols-2 gap-3.5">
                {[
                  'Zuverlässigkeit',
                  'Teamfähigkeit',
                  'Aktivität',
                  'Motivation',
                ].map((req, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-900/90 border border-amber-400/30 flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-md bg-amber-400 flex items-center justify-center text-black flex-shrink-0 font-bold shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                      ✓
                    </div>
                    <span className="font-bold text-sm text-zinc-200 font-['Chakra_Petch']">
                      {req}
                    </span>
                  </div>
                ))}
              </div>

              {/* Poster Quote: "Du musst nicht perfekt sein..." */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-transparent border-l-4 border-amber-400 mt-2">
                <p className="text-sm sm:text-base font-semibold text-zinc-200 italic leading-relaxed">
                  „Du musst nicht perfekt sein – <span className="text-amber-300 font-bold not-italic">wichtig ist, dass du Bock hast, etwas zu bewegen!</span>“
                  <span className="text-yellow-400 not-italic ml-1">⚡</span>
                </p>
              </div>
            </div>

            {/* Right: Direct Niko Discord Contact & Application Box */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121622] to-[#0a0d14] border-2 border-amber-400/70 shadow-[0_0_35px_rgba(250,204,21,0.25)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2] flex items-center justify-center text-white shadow-[0_0_20px_rgba(88,101,242,0.4)]">
                    <svg viewBox="0 0 127.14 96.36" className="w-6 h-6 fill-current text-[#5865F2]">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 font-['Chakra_Petch'] uppercase tracking-widest block">
                      INTERESSE? MELDE DICH BEI MIR!
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black font-['Chakra_Petch'] text-white">
                      Discord: <span className="text-amber-300 font-mono">{COMMUNITY_INFO.teamContactDiscord}</span>
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Tritt einfach unserem Discord Server bei und schreibe Serverleiter <strong className="text-amber-300">Niko ({COMMUNITY_INFO.teamContactDiscord})</strong> direkt per DM oder erstelle ein kurzes Bewerbungsticket!
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleOpenDiscord}
                    className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                  >
                    <span>Auf Discord Melden</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    id="btn-copy-niko-discord"
                    onClick={handleCopyDiscordTag}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold font-['Chakra_Petch'] text-zinc-200 border border-zinc-700 hover:border-amber-400/40 transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
                    title="Discord Tag kopieren"
                  >
                    {copiedContact ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Tag kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-amber-400" />
                        <span>Tag kopieren</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
