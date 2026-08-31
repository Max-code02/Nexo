import React from 'react';
import { Users, Ticket, Shield, Rocket, Star, Sparkles, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { playUiSound } from '../utils/audio';

interface FeaturesSectionProps {
  onOpenTicket: () => void;
  onOpenRules: () => void;
  onOpenApply: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenTicket,
  onOpenRules,
  onOpenApply,
}) => {
  const features = [
    {
      id: 'active-community',
      icon: Users,
      title: 'AKTIVE COMMUNITY',
      subtitle: 'Täglich Voice & Text Chat',
      description: 'Finde Spieler, chatte oder lerne neue Leute kennen – bei uns ist immer was los!',
      highlight: '534+ Gamer & 24/7 Voice',
      ctaText: 'Mitspieler finden',
      ctaHref: '#lfg',
      badge: 'COMMUNITY',
    },
    {
      id: 'ticket-system',
      icon: Ticket,
      title: 'TICKET-SYSTEM',
      subtitle: 'Schneller 1-zu-1 Support',
      description: 'Du brauchst Hilfe? Unser Team ist schnell & zuverlässig für dich da.',
      highlight: 'Ø Antwortzeit 2-5 Min.',
      ctaText: 'Ticket öffnen',
      onClick: onOpenTicket,
      badge: 'SUPPORT',
    },
    {
      id: 'engaged-team',
      icon: Shield,
      title: 'ENGAGIERTES TEAM',
      subtitle: 'Faire & aktive Moderation',
      description: 'Unser Staff-Team sorgt für Ordnung, Respekt & ein gutes Miteinander.',
      highlight: 'Geregelte Verhältnisse',
      ctaText: 'Regeln einsehen',
      onClick: onOpenRules,
      badge: 'STAFF',
    },
    {
      id: 'constant-evolution',
      icon: Rocket,
      title: 'STETIGE WEITERENTWICKLUNG',
      subtitle: 'Community-Driven Updates',
      description: 'Wir wachsen ständig weiter & setzen eure Ideen und Vorschläge um!',
      highlight: 'Wöchentliche Updates',
      ctaText: 'Team unterstützen',
      onClick: onOpenApply,
      badge: 'FUTURE',
    },
  ];

  return (
    <div className="py-2 md:py-4 relative">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header (Poster Style: "WAS ERWARTET DICH?") */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            id="badge-what-to-expect"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-amber-400/15 border border-amber-400/50 shadow-[0_0_20px_rgba(250,204,21,0.2)] mb-4"
          >
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <h2 className="text-sm sm:text-base font-extrabold text-amber-300 font-['Chakra_Petch'] uppercase tracking-widest">
              WAS ERWARTET DICH?
            </h2>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black font-['Chakra_Petch'] uppercase text-white tracking-wide">
            ALLES WAS EIN GAMER BRAUCHT AN EINEM ORT
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Entdecke die Säulen unserer Community – aufgebaut von Gamern für Gamer.
          </p>
        </div>

        {/* 4 Poster Feature Cards in Hexagonal/Angled Neon Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`feature-card-${item.id}`}
                className="group relative rounded-2xl p-6 bg-[#0e1118] border border-amber-400/30 hover:border-amber-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(250,204,21,0.25)] flex flex-col justify-between"
              >
                {/* Top Corner Hex Badge */}
                <div className="flex items-center justify-between mb-5">
                  {/* Hexagonal Yellow Icon (Faithful to poster design) */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-md group-hover:bg-amber-400/40 transition-all" />
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">
                      <polygon
                        points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
                        fill="#121622"
                        stroke="#facc15"
                        strokeWidth="5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Icon className="w-6 h-6 text-amber-400 absolute z-10 group-hover:scale-110 transition-transform" />
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                    {item.badge}
                  </span>
                </div>

                {/* Content matching poster exact words */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-lg font-black font-['Chakra_Petch'] uppercase text-white group-hover:text-amber-300 transition-colors tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-zinc-300 text-xs leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight & Interactive Trigger */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.highlight}</span>
                  </div>

                  {item.onClick ? (
                    <button
                      onClick={() => {
                        playUiSound('click');
                        item.onClick!();
                      }}
                      className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-amber-400/20 border border-amber-400/30 hover:border-amber-400 text-xs font-bold text-amber-300 uppercase tracking-wider font-['Chakra_Petch'] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={item.ctaHref}
                      onClick={() => playUiSound('click')}
                      className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-amber-400/20 border border-amber-400/30 hover:border-amber-400 text-xs font-bold text-amber-300 uppercase tracking-wider font-['Chakra_Petch'] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
