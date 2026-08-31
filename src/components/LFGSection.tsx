import React, { useState } from 'react';
import { INITIAL_LFG_POSTS, COMMUNITY_INFO } from '../data/communityData';
import { LFGPost } from '../types';
import { Gamepad2, Users, Mic, Clock, Plus, Search, Filter, MessageSquare, Send, Check } from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const LFGSection: React.FC = () => {
  const [posts, setPosts] = useState<LFGPost[]>(INITIAL_LFG_POSTS);
  const [selectedGame, setSelectedGame] = useState<string>('Alle');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [newGame, setNewGame] = useState('Valorant');
  const [newTag, setNewTag] = useState('');
  const [newLookingFor, setNewLookingFor] = useState('');
  const [newRank, setNewRank] = useState('');
  const [newMic, setNewMic] = useState(true);
  const [newSpots, setNewSpots] = useState(2);

  const gamesList = ['Alle', 'Valorant', 'Minecraft', 'Counter-Strike 2', 'Fortnite', 'GTA RP', 'Warzone'];

  const filteredPosts = selectedGame === 'Alle' 
    ? posts 
    : posts.filter((p) => p.game.toLowerCase() === selectedGame.toLowerCase());

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || !newLookingFor.trim()) return;

    playUiSound('success');
    const newPost: LFGPost = {
      id: Date.now().toString(),
      game: newGame,
      author: newTag.split('#')[0] || newTag,
      discordTag: newTag,
      lookingFor: newLookingFor,
      rank: newRank || undefined,
      timeAgo: 'Gerade eben',
      micRequired: newMic,
      spotsLeft: Number(newSpots),
    };

    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
    setNewTag('');
    setNewLookingFor('');
    setNewRank('');

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#fef08a']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="py-2 md:py-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-widest mb-3">
              <Users className="w-4 h-4 text-amber-400" />
              #SUCHE-GRUPPE LIVE-FEED
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-['Chakra_Petch'] uppercase text-white tracking-wide">
              MITSPIELER & SQUADS FINDEN
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Nie wieder Solo-Queue Frust! Finde sofort Mitspieler für deine Lieblingsgames.
            </p>
          </div>

          <button
            onClick={() => {
              playUiSound('click');
              setShowCreateModal(true);
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Eigene Suche Aufgeben
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 select-none no-scrollbar">
          {gamesList.map((game) => (
            <button
              key={game}
              onClick={() => {
                playUiSound('click');
                setSelectedGame(game);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-['Chakra_Petch'] uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedGame === game
                  ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                  : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-amber-400/40 hover:text-zinc-200'
              }`}
            >
              {game}
            </button>
          ))}
        </div>

        {/* LFG Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-2xl bg-[#0d1017] border border-amber-400/30 hover:border-amber-400/70 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 font-extrabold text-xs font-['Chakra_Petch'] uppercase tracking-wider border border-amber-400/30">
                      {post.game}
                    </span>
                    {post.rank && (
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-700">
                        {post.rank}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {post.timeAgo}
                  </span>
                </div>

                <p className="text-zinc-200 text-sm leading-relaxed mb-4 font-medium">
                  „{post.lookingFor}“
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white font-mono text-xs">{post.discordTag}</div>
                    <div className="text-[10px] text-zinc-400 flex items-center gap-2">
                      <span>{post.spotsLeft} Plätze frei</span>
                      {post.micRequired && (
                        <span className="flex items-center gap-0.5 text-emerald-400 font-semibold">
                          <Mic className="w-3 h-3" /> Headset
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <a
                  href={COMMUNITY_INFO.discordInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiSound('join')}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-400 hover:text-black text-amber-300 text-[11px] font-extrabold font-['Chakra_Petch'] uppercase tracking-wider transition-all border border-amber-400/30"
                >
                  Im Discord anschreiben
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Create LFG Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0e121a] border-2 border-amber-400 rounded-3xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(250,204,21,0.3)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                <h3 className="text-xl font-black font-['Chakra_Petch'] uppercase text-amber-400">
                  MITSPIELER-SUCHE AUFGEBEN
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-zinc-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                    Spiel auswählen
                  </label>
                  <select
                    value={newGame}
                    onChange={(e) => setNewGame(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="Valorant">Valorant</option>
                    <option value="Minecraft">Minecraft</option>
                    <option value="Counter-Strike 2">Counter-Strike 2</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="GTA RP">GTA RP</option>
                    <option value="Warzone">Call of Duty: Warzone</option>
                    <option value="Rocket League">Rocket League</option>
                    <option value="League of Legends">League of Legends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                    Dein Discord Tag / Ingame Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="z.B. shadow_gamer#1234"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                    Was suchst du? (Beschreibung) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newLookingFor}
                    onChange={(e) => setNewLookingFor(e.target.value)}
                    placeholder="z.B. Suche 2 Mitspieler für Ranked / Chillige Runden..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                      Rang / Elo (Optional)
                    </label>
                    <input
                      type="text"
                      value={newRank}
                      onChange={(e) => setNewRank(e.target.value)}
                      placeholder="z.B. Gold II / Unranked"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-bold mb-1 font-['Chakra_Petch']">
                      Freie Plätze
                    </label>
                    <select
                      value={newSpots}
                      onChange={(e) => setNewSpots(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={1}>1 Spieler</option>
                      <option value={2}>2 Spieler</option>
                      <option value={3}>3 Spieler</option>
                      <option value={4}>4 Spieler (Full Team)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="mic-req"
                    checked={newMic}
                    onChange={(e) => setNewMic(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-zinc-900 border-zinc-700"
                  />
                  <label htmlFor="mic-req" className="text-zinc-300 cursor-pointer font-medium">
                    Headset / Mikrofon erwünscht
                  </label>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold font-['Chakra_Petch']"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-black font-['Chakra_Petch'] uppercase tracking-wider hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                  >
                    Suche Posten
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
