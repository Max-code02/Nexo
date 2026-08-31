import React from 'react';
import { NexoLogo } from './NexoLogo';
import { COMMUNITY_INFO } from '../data/communityData';
import { ChevronUp, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { playUiSound } from '../utils/audio';

interface FooterProps {
  onOpenRules: () => void;
  onOpenTicket: () => void;
  onOpenApply: () => void;
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRules,
  onOpenTicket,
  onOpenApply,
  onNavigate,
}) => {
  const scrollToTop = () => {
    playUiSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    playUiSound('click');
    if (onNavigate) {
      onNavigate(id);
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050608] border-t border-amber-400/20 pt-16 pb-12 text-zinc-400 text-xs font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <NexoLogo size="md" />
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              {COMMUNITY_INFO.description}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Gateway Status: 100% Online</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-extrabold text-sm font-['Chakra_Petch'] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavClick('features')} className="hover:text-amber-300 transition-colors text-left">
                  Was dich erwartet
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('discord-preview')} className="hover:text-amber-300 transition-colors text-left">
                  Discord Server Preview
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('events')} className="hover:text-amber-300 transition-colors text-left">
                  Events & Turniere
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('team')} className="hover:text-amber-300 transition-colors text-left">
                  Team gesucht
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('lfg')} className="hover:text-amber-300 transition-colors text-left">
                  Mitspieler-Suche (LFG)
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Support */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-extrabold text-sm font-['Chakra_Petch'] uppercase tracking-wider">
              Support & Regeln
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    playUiSound('click');
                    onOpenRules();
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Serverregeln (#regeln)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playUiSound('click');
                    onOpenTicket();
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Ticket erstellen (#support)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playUiSound('click');
                    onOpenApply();
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Team Bewerbung
                </button>
              </li>
              <li>
                <span className="text-zinc-500">
                  Discord Leitung: <strong className="text-zinc-300">{COMMUNITY_INFO.teamContactDiscord}</strong>
                </span>
              </li>
            </ul>
          </div>

          {/* Discord CTA */}
          <div className="space-y-3">
            <h4 className="text-amber-400 font-extrabold text-sm font-['Chakra_Petch'] uppercase tracking-wider">
              Discord Invite
            </h4>
            <p className="text-xs text-zinc-400">
              Tritt über 534 Gaming-Begeisterten bei:
            </p>
            <a
              href={COMMUNITY_INFO.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUiSound('join')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 text-black font-black font-['Chakra_Petch'] text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)]"
            >
              <span>discord.gg/{COMMUNITY_INFO.discordInviteCode}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} NEXO Gaming Community. Alle Rechte vorbehalten.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400 font-mono">Gemeinsam. Aktiv. Stark. NEXO. ⚡</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1"
              title="Nach oben scrollen"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
