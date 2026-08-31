import React from 'react';
import { Users, Trophy, Shield, MessageSquare, Gamepad2 } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';

export const HighlightBar: React.FC = () => {
  const highlights = [
    {
      icon: Users,
      text: 'AKTIVE COMMUNITY',
    },
    {
      icon: Trophy,
      text: 'REGELMÄSSIGE EVENTS & TURNIERE',
    },
    {
      icon: Shield,
      text: 'FAIRE & AKTIVE MODERATION',
    },
    {
      icon: MessageSquare,
      text: 'WIR HÖREN AUF UNSERE COMMUNITY',
    },
    {
      icon: Gamepad2,
      text: 'EIN ORT FÜR JEDEN GAMER',
    },
  ];

  return (
    <div id="highlight-bar-section" className="bg-[#050608] border-y border-amber-400/30 py-8 relative overflow-hidden">
      {/* Background Subtle Sparks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The 5 Highlight Badges matching the poster footer bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-[#0d1017]/80 border border-amber-400/20 hover:border-amber-400/60 hover:bg-[#121622] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-black font-['Chakra_Petch'] uppercase tracking-wider text-zinc-200 group-hover:text-amber-300 transition-colors leading-tight">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* The Big Golden Motto from poster: "GEMEINSAM. AKTIV. STARK. NEXO." */}
        <div className="mt-8 text-center">
          <h2
            id="community-motto"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-['Chakra_Petch'] uppercase tracking-[0.18em] italic text-amber-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]"
          >
            {COMMUNITY_INFO.motto}
          </h2>
        </div>
      </div>
    </div>
  );
};
