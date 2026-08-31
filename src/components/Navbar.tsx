import React, { useState } from 'react';
import { NexoLogo } from './NexoLogo';
import { COMMUNITY_INFO } from '../data/communityData';
import { useDiscordStats } from '../context/DiscordStatsContext';
import { Volume2, VolumeX, Sparkles, ExternalLink, Radio, Menu, X } from 'lucide-react';
import { playUiSound, toggleSound, isSoundEnabled } from '../utils/audio';

interface NavbarProps {
  onOpenRules: () => void;
  onOpenApply: () => void;
  onOpenDiscordLive?: () => void;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenRules, 
  onOpenApply, 
  onOpenDiscordLive,
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const { isLive, memberCount, onlineCount } = useDiscordStats();

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) {
      playUiSound('electric');
    }
  };

  const navLinks = [
    { label: 'Was dich erwartet', id: 'features', href: '#features' },
    { label: 'Discord Server', id: 'discord-preview', href: '#discord-preview' },
    { label: 'Events & Turniere', id: 'events', href: '#events' },
    { label: 'Team gesucht', id: 'team', href: '#team' },
    { label: 'Mitspieler (LFG)', id: 'lfg', href: '#lfg' },
  ];

  const handleLinkClick = (id: string, href: string) => {
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
    <nav
      id="main-navbar"
      className="sticky top-0 z-50 w-full bg-[#080a0f]/90 backdrop-blur-md border-b border-amber-400/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <NexoLogo
          size="md"
          onClick={() => {
            playUiSound('click');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.id, link.href)}
              className="px-3.5 py-2 text-sm font-semibold text-zinc-300 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-all tracking-wide font-['Chakra_Petch']"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              playUiSound('click');
              onOpenRules();
            }}
            className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-lg border border-zinc-700/50 transition-all font-['Chakra_Petch'] ml-1"
          >
            #regeln
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="hidden md:flex items-center gap-3">
          {/* Live Status Badge */}
          <button
            type="button"
            id="discord-live-stats"
            onClick={() => {
              playUiSound('click');
              if (onOpenDiscordLive) onOpenDiscordLive();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-amber-400/40 hover:border-amber-400 text-xs text-zinc-300 font-mono shadow-[0_0_10px_rgba(250,204,21,0.15)] transition-all cursor-pointer group"
            title="Klicken für Discord Live-Status Details"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="font-bold text-emerald-400">{onlineCount}</span>
            <span className="text-zinc-500">/</span>
            <span className="text-amber-400 font-semibold">{memberCount} Mitglieder</span>
            {isLive && (
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/40 font-bold uppercase hidden xl:inline">
                LIVE
              </span>
            )}
          </button>

          {/* Audio Toggle */}
          <button
            id="btn-sound-toggle"
            onClick={handleSoundToggle}
            className={`p-2 rounded-lg border transition-all ${
              soundOn
                ? 'bg-amber-400/15 border-amber-400/50 text-amber-400 shadow-[0_0_10px_rgba(250,204,21,0.2)]'
                : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300'
            }`}
            title={soundOn ? 'Sound Effekte aktiviert' : 'Sound Effekte stummgeschaltet'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Join Discord CTA Button */}
          <a
            id="btn-nav-join-discord"
            href={COMMUNITY_INFO.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiSound('join')}
            className="relative group overflow-hidden px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider font-['Chakra_Petch'] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-extrabold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              Discord Beitreten
            </span>
            <ExternalLink className="w-3.5 h-3.5 relative z-10 opacity-70 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-amber-400"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>
          <button
            id="btn-mobile-menu"
            onClick={() => {
              playUiSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-amber-400/30 text-amber-400"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0c13] border-b border-amber-400/30 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-zinc-800 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {COMMUNITY_INFO.stats.onlineMembers} Online
            </span>
            <span className="text-amber-400 font-semibold">{COMMUNITY_INFO.stats.members} Mitglieder</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick(link.id, link.href);
                }}
                className="text-left px-3 py-2.5 text-sm font-semibold text-zinc-200 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg font-['Chakra_Petch']"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                playUiSound('click');
                setMobileMenuOpen(false);
                onOpenRules();
              }}
              className="text-left px-3 py-2.5 text-sm font-semibold text-zinc-300 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg font-['Chakra_Petch']"
            >
              #regeln (Serverregeln)
            </button>
            <button
              onClick={() => {
                playUiSound('click');
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="text-left px-3 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-400/10 rounded-lg font-['Chakra_Petch']"
            >
              Team-Bewerbung ausfüllen
            </button>
          </div>

          <div className="pt-2">
            <a
              href={COMMUNITY_INFO.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUiSound('join')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-extrabold text-sm uppercase tracking-wider font-['Chakra_Petch'] bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"
            >
              <Sparkles className="w-4 h-4" />
              Jetzt Discord Beitreten
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
