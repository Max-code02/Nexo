import React, { useEffect, useState } from 'react';
import { SERVER_RULES, COMMUNITY_INFO } from '../data/communityData';
import { 
  X, 
  Ticket, 
  Send, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  UserCheck,
  MessageSquare,
  ExternalLink,
  Copy,
  Radio
} from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e121a] border-2 border-amber-400 rounded-2xl sm:rounded-3xl p-4 sm:p-7 max-w-2xl w-full max-h-[88dvh] sm:max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(250,204,21,0.35)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                NEXO SERVERREGELN (#REGELN)
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">Für ein faires, respektvolles Miteinander</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-amber-400 transition-colors flex items-center justify-center cursor-pointer active:scale-95 flex-shrink-0"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules List (Scrollable) */}
        <div className="overflow-y-auto pr-1 my-2 flex-1 space-y-2.5 sm:space-y-3 py-2 text-xs sm:text-sm overscroll-contain">
          {SERVER_RULES.map((rule) => (
            <div
              key={rule.number}
              className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-400/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <span className="font-extrabold font-['Chakra_Petch'] text-amber-400 uppercase text-xs sm:text-sm">
                  §{rule.number} {rule.title}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                    rule.severity === 'Kritisch'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : rule.severity === 'Wichtig'
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                  }`}
                >
                  {rule.severity}
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">{rule.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 pt-3 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-2.5">
          <span className="text-[11px] sm:text-xs text-zinc-400">
            Regeln werden durch unser <span className="text-amber-400 font-bold">Staff-Team</span> durchgesetzt.
          </span>
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer active:scale-95"
          >
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('Allgemeine Frage');
  const [discordUser, setDiscordUser] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordUser.trim() || !message.trim()) return;

    playUiSound('success');
    const randomTicketNumber = Math.floor(1000 + Math.random() * 9000);
    setSubmittedTicketId(`TICKET-${randomTicketNumber}`);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fef08a', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setSubmittedTicketId(null);
    setDiscordUser('');
    setMessage('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div 
        className="bg-[#0e121a] border-2 border-amber-400 rounded-2xl sm:rounded-3xl p-4 sm:p-7 max-w-lg w-full max-h-[88dvh] sm:max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(250,204,21,0.35)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                SUPPORT-TICKET ERSTELLEN
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">Kanal: #ticket-erstellen</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              handleReset();
            }}
            className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-amber-400 flex items-center justify-center cursor-pointer active:scale-95 flex-shrink-0"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedTicketId ? (
          <div className="overflow-y-auto py-6 text-center space-y-4 flex-1 overscroll-contain">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Check className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-black font-['Chakra_Petch'] text-white">
              Ticket erfolgreich erstellt!
            </h4>

            <div className="p-2.5 bg-zinc-900 border border-amber-400/40 rounded-xl font-mono text-amber-400 font-bold text-sm inline-block">
              {submittedTicketId}
            </div>

            <p className="text-zinc-300 text-xs sm:text-sm max-w-sm mx-auto">
              Unser Support-Team wurde benachrichtigt und meldet sich schnellstmöglich bei dir (Ø 2-5 Min.) auf Discord.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={COMMUNITY_INFO.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('join')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 text-center"
              >
                Zu Discord & Ticket ansehen
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold font-['Chakra_Petch'] cursor-pointer"
              >
                Schließen
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto py-3 space-y-3.5 text-xs flex-1 overscroll-contain pr-1">
            <div>
              <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                Kategorie / Anliegen
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Allgemeine Frage">Allgemeine Frage / Hilfe</option>
                <option value="Regelverstoß melden">Regelverstoß / Spieler melden</option>
                <option value="Turnier Support">Turnier & Event Anfrage</option>
                <option value="Rollenvergabe">Rollenvergabe & Discord VIP</option>
                <option value="Vorschlag / Feedback">Vorschlag & Community Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                Dein Discord Benutzername *
              </label>
              <input
                type="text"
                required
                value={discordUser}
                onChange={(e) => setDiscordUser(e.target.value)}
                placeholder="z.B. max_muster#0001"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                Wie können wir dir helfen? (Details) *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Beschreibe dein Anliegen möglichst genau..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold font-['Chakra_Petch'] cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)] flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Ticket Öffnen
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface ApplyModalProps {
  isOpen: boolean;
  initialRole?: string;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  initialRole = 'MODERATION',
  onClose,
}) => {
  const [copiedContact, setCopiedContact] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyDiscordTag = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.teamContactDiscord);
    setCopiedContact(true);
    playUiSound('success');
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fef08a', '#ffffff']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopiedContact(false), 2500);
  };

  const handleJoinDiscord = () => {
    playUiSound('join');
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#facc15', '#fef08a', '#ffffff']
      });
    } catch {
      // ignore
    }
    window.open(COMMUNITY_INFO.discordInviteUrl, '_blank', 'noopener,noreferrer');
  };

  const roleOptions = [
    { title: 'MODERATION', desc: 'Serverüberwachung, Chat-Klima & Regeln' },
    { title: 'SUPPORT', desc: 'Hilfe bei Fragen & Community-Support' },
    { title: 'ORGANISATION', desc: 'Team-Struktur, Koordination & Planung' },
    { title: 'EVENT-TEAM', desc: 'Turniere & Community-Abende' },
    { title: 'COMMUNITY-BETREUUNG', desc: 'Giveaways, Umfragen & Engagement' }
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e121a] border-2 border-amber-400 rounded-2xl sm:rounded-3xl p-4 sm:p-7 max-w-xl w-full max-h-[88dvh] sm:max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(250,204,21,0.4)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header - ALWAYS STICKY & VISIBLE */}
        <div className="flex-shrink-0 flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-800 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] flex-shrink-0">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                TEAM-BEWERBUNG
              </h3>
              <p className="text-[11px] sm:text-xs text-amber-400 font-mono">Direktkontakt zu Serverleiter Niko</p>
            </div>
          </div>
          
          {/* Close [X] Button with high contrast and touch friendly size */}
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="min-w-[42px] min-h-[42px] p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-600 hover:border-amber-400 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md flex-shrink-0"
            title="Schließen (ESC)"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 text-amber-300" />
          </button>
        </div>

        {/* Main Content - SCROLLABLE INSIDE */}
        <div className="overflow-y-auto flex-1 py-3.5 sm:py-5 space-y-3.5 sm:space-y-4 relative z-10 pr-1 overscroll-contain">
          {/* Quick Role Selector */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase tracking-wider mb-2">
              Gewünschter Bereich:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {roleOptions.map((r) => (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => {
                    playUiSound('click');
                    setSelectedRole(r.title);
                  }}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedRole === r.title
                      ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                      : 'bg-zinc-900/90 text-zinc-300 border-zinc-700/70 hover:border-amber-400/40 text-xs'
                  }`}
                >
                  <div className="text-[10px] sm:text-[11px] font-['Chakra_Petch'] uppercase font-extrabold truncate">
                    {r.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Niko Direct Contact Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#131825] to-[#0b0e16] border-2 border-amber-400/70 shadow-[0_0_25px_rgba(250,204,21,0.2)] space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#5865F2]/20 border border-[#5865F2] flex items-center justify-center text-white flex-shrink-0 shadow-[0_0_15px_rgba(88,101,242,0.4)]">
                <svg viewBox="0 0 127.14 96.36" className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#5865F2]">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 font-['Chakra_Petch'] uppercase tracking-wider block">
                  Bewerbungen direkt bei Serverleiter
                </span>
                <h4 className="text-base sm:text-xl font-black font-['Chakra_Petch'] text-white truncate">
                  Niko &bull; <span className="text-amber-300 font-mono text-xs sm:text-base">{COMMUNITY_INFO.teamContactDiscord}</span>
                </h4>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
              Bewerbungen laufen direkt persönlich über Discord: Tritt dem Server bei und schreibe <strong className="text-amber-300">Niko ({COMMUNITY_INFO.teamContactDiscord})</strong> eine Privatnachricht mit deiner gewünschten Rolle (<strong className="text-white">{selectedRole}</strong>).
            </p>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono truncate">
                Tag: <strong className="text-amber-300">{COMMUNITY_INFO.teamContactDiscord}</strong>
              </div>
              <button
                type="button"
                onClick={handleCopyDiscordTag}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-[11px] font-['Chakra_Petch'] font-bold flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 active:scale-95"
              >
                {copiedContact ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tag kopieren</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="font-bold text-amber-400 font-['Chakra_Petch'] mb-0.5 flex items-center gap-1.5 text-xs">
                <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] flex items-center justify-center font-mono font-bold">1</span>
                <span>Discord beitreten</span>
              </div>
              <p className="text-zinc-400 text-[10px] sm:text-[11px]">
                Nutze den Invite <strong className="text-zinc-300">discord.gg/{COMMUNITY_INFO.discordInviteCode}</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="font-bold text-amber-400 font-['Chakra_Petch'] mb-0.5 flex items-center gap-1.5 text-xs">
                <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] flex items-center justify-center font-mono font-bold">2</span>
                <span>Niko DM schreiben</span>
              </div>
              <p className="text-zinc-400 text-[10px] sm:text-[11px]">
                Schreibe <strong className="text-zinc-300">{COMMUNITY_INFO.teamContactDiscord}</strong> für deine Rolle an.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions - ALWAYS STICKY & VISIBLE */}
        <div className="flex-shrink-0 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-2 relative z-10">
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold font-['Chakra_Petch'] border border-zinc-700 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
            <span>Fenster Schließen</span>
          </button>
          <button
            type="button"
            onClick={handleJoinDiscord}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.45)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Discord Beitreten & Anschreiben</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ChatRedirectModalProps {
  isOpen: boolean;
  channelName?: string;
  onClose: () => void;
}

export const ChatRedirectModal: React.FC<ChatRedirectModalProps> = ({
  isOpen,
  channelName = 'chat',
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.discordInviteUrl);
    setCopied(true);
    playUiSound('success');
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fef08a']
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleJoinDiscord = () => {
    playUiSound('join');
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#facc15', '#fef08a', '#ffffff']
      });
    } catch {
      // ignore
    }
    window.open(COMMUNITY_INFO.discordInviteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e121a] border-2 border-amber-400 rounded-2xl sm:rounded-3xl p-4 sm:p-7 max-w-lg w-full max-h-[88dvh] sm:max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(250,204,21,0.4)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-800 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] flex-shrink-0">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                  DISCORD LIVE-CHAT
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  #{channelName}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400">Exklusiv auf unserem Discord Server</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-amber-400 transition-colors flex items-center justify-center cursor-pointer active:scale-95 flex-shrink-0"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto flex-1 py-4 sm:py-6 text-center space-y-3.5 sm:space-y-4 relative z-10 overscroll-contain">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-400/25 to-yellow-500/10 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.35)] animate-pulse">
            <Radio className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-black font-['Chakra_Petch'] text-white uppercase tracking-wide">
              Echtzeit-Chatting ist auf Discord!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed">
              Auf der Website ist das Schreiben deaktiviert. Tritt jetzt unserem offiziellen Server bei, um live mit <strong className="text-amber-300">Niko</strong>, dem Team und über <strong className="text-amber-300">{COMMUNITY_INFO.stats.members} Mitgliedern</strong> zu chatten!
            </p>
          </div>

          {/* Discord Quick Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/90 border border-amber-400/30 flex items-center justify-between gap-2.5 text-left">
            <div className="min-w-0">
              <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-mono font-bold">Direkter Einladungslink:</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 truncate">
                discord.gg/{COMMUNITY_INFO.discordInviteCode}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-['Chakra_Petch'] font-bold flex items-center gap-1.5 transition-colors flex-shrink-0 cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopiert!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kopieren</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold font-['Chakra_Petch'] cursor-pointer active:scale-95"
          >
            Später
          </button>
          <button
            type="button"
            onClick={handleJoinDiscord}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.45)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Jetzt Discord Beitreten</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
