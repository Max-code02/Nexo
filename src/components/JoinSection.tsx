import React, { useState } from 'react';
import { COMMUNITY_INFO } from '../data/communityData';
import { useDiscordStats } from '../context/DiscordStatsContext';
import { Sparkles, Copy, Check, ExternalLink, QrCode, Shield, Users, Trophy } from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const JoinSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const { inviteCode } = useDiscordStats();
  const currentInviteUrl = `https://discord.gg/${inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentInviteUrl);
    setCopied(true);
    playUiSound('success');
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#facc15', '#fef08a', '#eab308', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-2 md:py-4 relative">
      {/* Golden Aura & Fog particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Banner Card (Faithful to poster) */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#111520] to-[#0a0d14] border border-amber-400/60 p-6 sm:p-12 shadow-[0_0_40px_rgba(250,204,21,0.18)] overflow-hidden">
          {/* Soldier / Gamer Silhouette Graphic Backdrop on the bottom right (as in poster) */}
          <div className="absolute bottom-0 right-0 w-full md:w-2/3 h-64 pointer-events-none opacity-35 sm:opacity-45 overflow-hidden flex items-end justify-end">
            <svg viewBox="0 0 800 240" className="w-full h-full text-amber-400 fill-current">
              {/* Silhouette silhouettes of squad team */}
              <defs>
                <linearGradient id="squadGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#ca8a04" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0a0d14" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M 50 240 L 70 190 Q 80 160 95 160 Q 110 160 120 190 L 140 240 Z
                   M 160 240 L 180 170 Q 195 140 215 140 Q 235 140 250 170 L 270 240 Z
                   M 290 240 L 320 150 Q 340 120 365 120 Q 390 120 410 150 L 430 240 Z
                   M 450 240 L 480 130 Q 500 100 525 100 Q 550 100 570 130 L 600 240 Z
                   M 620 240 L 650 160 Q 670 130 690 130 Q 710 130 730 160 L 750 240 Z
                   M 760 240 L 780 180 Q 790 150 800 150 L 800 240 Z"
                fill="url(#squadGlow)"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side: Hexagonal Discord Badge + JOIN US! */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Hexagonal Yellow Discord Icon (Matching poster) */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-0 bg-amber-400/40 rounded-2xl blur-xl animate-pulse-glow" />
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full drop-shadow-[0_0_20px_rgba(250,204,21,0.9)]"
                >
                  <polygon
                    points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
                    fill="#0b0d14"
                    stroke="#facc15"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Discord Glyph in Yellow */}
                <div className="absolute z-10 w-12 h-12 flex items-center justify-center text-amber-400">
                  <svg viewBox="0 0 127.14 96.36" className="w-10 h-10 fill-current drop-shadow-[0_0_8px_#fde047]">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                </div>
              </div>

              {/* Text: "DEIN WEG ZU NEXO: JOIN US!" */}
              <div className="space-y-1">
                <div className="text-sm sm:text-base font-bold text-amber-400 font-['Chakra_Petch'] uppercase tracking-widest">
                  DEIN WEG ZU NEXO:
                </div>
                <h2
                  id="join-us-title"
                  className="text-4xl sm:text-6xl md:text-7xl font-black font-['Chakra_Petch'] uppercase text-white tracking-tight leading-none drop-shadow-[0_0_25px_rgba(250,204,21,0.5)]"
                >
                  JOIN US!
                </h2>
                <p className="text-zinc-300 text-xs sm:text-sm max-w-md">
                  Klicke auf den Button oder nutze den Einladungscode, um direkt auf unseren Discord Server zu gelangen.
                </p>
              </div>
            </div>

            {/* Right Side: Glowing Link Button & Actions */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-3.5">
              {/* Massive Glowing Invite Pill (DISCORD.GG/gj4VUe85) */}
              <a
                id="btn-discord-invite-pill"
                href={currentInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('join')}
                className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-black font-['Chakra_Petch'] text-base sm:text-lg uppercase tracking-wider text-center shadow-[0_0_35px_rgba(250,204,21,0.6)] hover:shadow-[0_0_50px_rgba(250,204,21,0.9)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 border-2 border-yellow-200"
              >
                <span className="text-black font-extrabold flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  DISCORD.GG/{inviteCode}
                </span>
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>

              {/* Utility Action Buttons (Copy & QR Code) */}
              <div className="flex items-center gap-2.5 w-full">
                <button
                  id="btn-copy-invite-link"
                  onClick={handleCopyLink}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-400/40 hover:border-amber-400 text-zinc-200 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Link kopiert!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Link Kopieren</span>
                    </>
                  )}
                </button>

                <button
                  id="btn-show-qr-code"
                  onClick={() => {
                    playUiSound('click');
                    setShowQr(!showQr);
                  }}
                  className="py-3 px-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-400/40 hover:border-amber-400 text-amber-400 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  title="QR-Code für Handy anzeigen"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="hidden sm:inline">QR-Code</span>
                </button>
              </div>

              {/* QR Code Popover */}
              {showQr && (
                <div className="p-4 rounded-2xl bg-black border-2 border-amber-400 shadow-[0_0_30px_rgba(250,204,21,0.5)] flex flex-col items-center gap-2 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-white p-2 rounded-xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        COMMUNITY_INFO.discordInviteUrl
                      )}`}
                      alt="NEXO Discord QR Code"
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="text-xs text-zinc-300 font-mono">
                    Scanne mit deinem Smartphone
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
