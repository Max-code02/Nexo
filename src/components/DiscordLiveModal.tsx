import React, { useState } from 'react';
import { useDiscordStats } from '../context/DiscordStatsContext';
import { COMMUNITY_INFO } from '../data/communityData';
import { 
  X, 
  RefreshCw, 
  Radio, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles,
  Users,
  ShieldAlert,
  Sliders
} from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DiscordLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscordLiveModal: React.FC<DiscordLiveModalProps> = ({ isOpen, onClose }) => {
  const {
    isLive,
    isLoading,
    error,
    memberCount,
    onlineCount,
    serverName,
    serverIconUrl,
    inviteCode,
    lastUpdated,
    refetch,
    updateInviteCode,
  } = useDiscordStats();

  const [testCodeInput, setTestCodeInput] = useState(inviteCode);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleManualRefresh = async () => {
    playUiSound('electric');
    await refetch();
  };

  const handleSaveCode = async (e: React.FormEvent) => {
    e.preventDefault();
    playUiSound('click');
    const ok = await updateInviteCode(testCodeInput);
    if (ok) {
      playUiSound('success');
      setSuccessMsg('Erfolgreich mit Discord synchronisiert!');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#facc15', '#22c55e', '#ffffff']
        });
      } catch {}
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

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

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-800 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black font-['Chakra_Petch'] uppercase text-white">
                  DISCORD ECHTZEIT-SYNCHRONISIERUNG
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">Offizielle Discord Invite API (Möglichkeit 1)</p>
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

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 py-4 space-y-4 relative z-10 pr-1 overscroll-contain">
          {/* Status Box */}
          <div className={`p-4 rounded-2xl border ${
            isLive 
              ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
              : 'bg-amber-950/20 border-amber-500/40'
          }`}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
                <span className="font-extrabold font-['Chakra_Petch'] text-sm uppercase text-white">
                  {isLive ? 'Live Verbunden mit Discord' : 'Vorbereitet / Fallback-Modus'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center gap-1.5 border border-zinc-700 transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Lade...' : 'Neu laden'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {isLive
                ? `Echte Server-Daten werden live aus dem Discord Einladungscode (${inviteCode}) bezogen.`
                : `Aktuell werden die vorkonfigurierten Community-Zahlen angezeigt. Sobald ein gültiger permanenter Invite hinterlegt ist, werden die Daten im Sekundentakt live von Discord aktualisiert.`}
            </p>
          </div>

          {/* Real Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mb-1">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Gesamt-Mitglieder</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-['Chakra_Petch'] text-amber-300">
                {memberCount}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                {isLive ? '✓ Direkt von Discord API' : 'Konfigurierter Basiswert'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mb-1">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Gerade Online</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-['Chakra_Petch'] text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                {onlineCount}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                {isLive ? '✓ Echte Live-Präsenz' : 'Geschätzte Aktivität'}
              </div>
            </div>
          </div>

          {/* Server Info Card if available */}
          {serverIconUrl && (
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-amber-400/30 flex items-center gap-3">
              <img src={serverIconUrl} alt="Discord Icon" className="w-12 h-12 rounded-xl border border-amber-400 shadow-md" />
              <div className="min-w-0">
                <div className="text-xs text-amber-400 font-mono font-bold uppercase">Erkannter Server:</div>
                <div className="text-base font-black text-white font-['Chakra_Petch'] truncate">{serverName}</div>
              </div>
            </div>
          )}

          {/* Invite Code Input Form to test/change */}
          <form onSubmit={handleSaveCode} className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase">
                  Discord Einladungscode / Link testen & anpassen:
                </label>
                <span className="text-[10px] text-amber-400 font-mono">discord.gg/CODE</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testCodeInput}
                  onChange={(e) => setTestCodeInput(e.target.value)}
                  placeholder="z. B. gj4VUe85 oder nexogaming"
                  className="flex-1 bg-black/70 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 text-black font-black text-xs font-['Chakra_Petch'] uppercase tracking-wider hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.3)] cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  Prüfen
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                <span>{error} (Tipp: Stelle sicher, dass der Einladungslink auf Discord als „dauerhaft gültig / nie ablaufend“ erstellt wurde).</span>
              </div>
            )}

            {successMsg && (
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="text-[11px] text-zinc-400 leading-normal pt-1">
              💡 <strong>Tipp für Serverleiter Niko:</strong> Wenn du auf Discord einen neuen permanenten Einladungslink generierst (z. B. <code>discord.gg/DEIN_CODE</code>), trage ihn einfach hier ein. Die Website ruft sofort die echten Mitglieder- und Online-Zahlen ab!
            </div>
          </form>

          {lastUpdated && (
            <div className="text-[10px] text-zinc-500 font-mono text-center">
              Zuletzt synchronisiert: {lastUpdated.toLocaleTimeString()} Uhr
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2.5">
          <a
            href={COMMUNITY_INFO.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:text-amber-300 font-['Chakra_Petch'] font-bold flex items-center gap-1.5"
          >
            <span>Discord Server aufrufen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
