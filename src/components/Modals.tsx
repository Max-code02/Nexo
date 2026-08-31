import React, { useState } from 'react';
import { SERVER_RULES, TEAM_ROLES, COMMUNITY_INFO } from '../data/communityData';
import { 
  X, 
  ShieldAlert, 
  Ticket, 
  Send, 
  Check, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  UserCheck,
  AlertCircle,
  MessageSquare,
  ExternalLink,
  Copy,
  Radio,
  Lock
} from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e121a] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(250,204,21,0.35)] max-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                NEXO SERVERREGELN (#REGELN)
              </h3>
              <p className="text-xs text-zinc-400 font-mono">Für ein faires, respektvolles Miteinander</p>
            </div>
          </div>
          <button
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-amber-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules List */}
        <div className="py-4 space-y-3 overflow-y-auto pr-1 my-2 flex-1 text-xs sm:text-sm">
          {SERVER_RULES.map((rule) => (
            <div
              key={rule.number}
              className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-400/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold font-['Chakra_Petch'] text-amber-400 uppercase text-sm">
                  §{rule.number} {rule.title}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
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
              <p className="text-zinc-300 leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-zinc-400">
            Regeln werden durch unser <span className="text-amber-400 font-bold">Staff-Team</span> durchgesetzt.
          </span>
          <button
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.4)]"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e121a] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(250,204,21,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                SUPPORT-TICKET ERSTELLEN
              </h3>
              <p className="text-xs text-zinc-400 font-mono">Kanal: #ticket-erstellen</p>
            </div>
          </div>
          <button
            onClick={() => {
              playUiSound('click');
              handleReset();
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedTicketId ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Check className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-black font-['Chakra_Petch'] text-white">
              Ticket erfolgreich erstellt!
            </h4>

            <div className="p-3 bg-zinc-900 border border-amber-400/40 rounded-xl font-mono text-amber-400 font-bold text-sm inline-block">
              {submittedTicketId}
            </div>

            <p className="text-zinc-300 text-xs sm:text-sm max-w-sm mx-auto">
              Unser Support-Team wurde benachrichtigt und meldet sich schnellstmöglich bei dir (Ø 2-5 Min.) auf Discord.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={COMMUNITY_INFO.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('join')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300"
              >
                Zu Discord & Ticket ansehen
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold font-['Chakra_Petch']"
              >
                Schließen
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
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
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Beschreibe dein Anliegen möglichst genau..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold font-['Chakra_Petch']"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)] flex items-center gap-1.5"
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
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordTag.trim() || !motivation.trim()) return;

    playUiSound('success');
    setSubmitted(true);
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
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setDiscordTag('');
    setAge('');
    setExperience('');
    setMotivation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e121a] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-[0_0_50px_rgba(250,204,21,0.35)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                TEAM-BEWERBUNG BEI NEXO
              </h3>
              <p className="text-xs text-zinc-400 font-mono">Werde Teil unserer Community-Leitung</p>
            </div>
          </div>
          <button
            onClick={() => {
              playUiSound('click');
              handleReset();
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.5)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-black font-['Chakra_Petch'] text-white">
              Bewerbung erhalten!
            </h4>

            <p className="text-zinc-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Vielen Dank für dein Interesse am NEXO-Team! Serverleiter <span className="text-amber-400 font-bold">Niko ({COMMUNITY_INFO.teamContactDiscord})</span> wird deine Bewerbung prüfen und dich per Discord kontaktieren.
            </p>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 text-left max-w-sm mx-auto">
              <div className="font-bold text-amber-400 mb-1">Nächster Schritt:</div>
              <div>Tritt dem Discord bei, damit Niko dir eine DM schreiben und dich auf die Probezeit vorbereiten kann!</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={COMMUNITY_INFO.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('join')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300"
              >
                Discord Server Beitreten
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold font-['Chakra_Petch']"
              >
                Fertig
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                Für welchen Bereich möchtest du dich bewerben? *
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-bold font-['Chakra_Petch']"
              >
                <option value="MODERATION">🛡️ Moderation (Serverüberwachung & Regeln)</option>
                <option value="SUPPORT">🎧 Support (User-Hilfe & Tickets)</option>
                <option value="TEAM & ORGANISATION">👥 Team & Organisation (Management & Struktur)</option>
                <option value="EVENT-TEAM">📅 Event-Team (Turniere & Community-Abende)</option>
                <option value="COMMUNITY BETREUUNG">💛 Community Betreuung (Giveaways & Feedback)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                  Dein Name / Spitzname *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Alex"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                  Dein Discord Tag *
                </label>
                <input
                  type="text"
                  required
                  value={discordTag}
                  onChange={(e) => setDiscordTag(e.target.value)}
                  placeholder="z.B. alex_gamer#1234"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                Alter & Online-Zeiten (ca. Stunden pro Woche)
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="z.B. 18 Jahre, ca. 15-20 Std. wöchentlich online"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                Warum hast du Bock auf NEXO? (Motivation & Erfahrung) *
              </label>
              <textarea
                required
                rows={4}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Erzähl kurz über dich, deine Erfahrungen mit Discord und warum du NEXO unterstützen willst..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Du kannst dich alternativ auch direkt per Discord DM bei <strong className="text-amber-300">{COMMUNITY_INFO.teamContactDiscord}</strong> melden.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold font-['Chakra_Petch']"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)] flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Bewerbung Absenden
              </button>
            </div>
          </form>
        )}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e121a] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(250,204,21,0.4)] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                  DISCORD LIVE-CHAT
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  #{channelName}
                </span>
              </div>
              <p className="text-xs text-zinc-400">Exklusiv auf unserem Discord Server</p>
            </div>
          </div>
          <button
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-amber-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="py-6 text-center space-y-4 relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400/25 to-yellow-500/10 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.35)] animate-pulse">
            <Radio className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-xl font-black font-['Chakra_Petch'] text-white uppercase tracking-wide">
              Echtzeit-Chatting ist auf Discord!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed">
              Auf der Website ist das Schreiben deaktiviert. Tritt jetzt unserem offiziellen Server bei, um live mit <strong className="text-amber-300">Niko</strong>, dem Team und über <strong className="text-amber-300">{COMMUNITY_INFO.stats.members} Mitgliedern</strong> zu chatten, Voice-Channels beizutreten und Squads zu gründen!
            </p>
          </div>

          {/* Discord Quick Box */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-400/30 flex items-center justify-between gap-3 text-left">
            <div className="min-w-0">
              <div className="text-[10px] text-zinc-400 uppercase font-mono font-bold">Direkter Einladungslink:</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 truncate">
                discord.gg/{COMMUNITY_INFO.discordInviteCode}
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-['Chakra_Petch'] font-bold flex items-center gap-1.5 transition-colors flex-shrink-0"
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
        <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-3 relative z-10">
          <button
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold font-['Chakra_Petch']"
          >
            Später
          </button>
          <button
            onClick={handleJoinDiscord}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.45)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <span>Jetzt Discord Beitreten & Mitchatten</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

