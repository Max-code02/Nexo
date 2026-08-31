import React, { useState } from 'react';
import { UPCOMING_EVENTS, COMMUNITY_INFO } from '../data/communityData';
import { EventItem } from '../types';
import { Calendar, Trophy, Star, Box, Sparkles, Clock, Award, Users, Check, ExternalLink } from 'lucide-react';
import { playUiSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface EventsSectionProps {
  selectedEventId?: string | null;
  onOpenTicket: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  selectedEventId,
  onOpenTicket,
}) => {
  const [joinedEvents, setJoinedEvents] = useState<Record<string, boolean>>({});

  const handleJoinEvent = (eventId: string) => {
    playUiSound('success');
    setJoinedEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
    if (!joinedEvents[eventId]) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#facc15', '#fef08a', '#eab308']
        });
      } catch {
        // ignore
      }
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'trophy': return Trophy;
      case 'star': return Star;
      case 'cube': return Box;
      default: return Calendar;
    }
  };

  return (
    <div className="py-2 md:py-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-widest mb-3">
            <Trophy className="w-4 h-4 text-amber-400" />
            COMMUNITY HIGHLIGHTS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Chakra_Petch'] uppercase text-white tracking-wide">
            AKTUELLE EVENTS & TURNIERE
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Zeig dein Können, gewinne Discord Nitro, Ingame-Ränge und hab Spaß mit der Community!
          </p>
        </div>

        {/* 3 Event Cards (Matching the Poster) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => {
            const Icon = getEventIcon(event.iconType);
            const isJoined = joinedEvents[event.id];
            const isHighlighted = selectedEventId === event.id;

            return (
              <div
                key={event.id}
                id={`event-card-${event.id}`}
                className={`rounded-2xl p-6 bg-[#0e121a] border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isHighlighted
                    ? 'border-amber-400 shadow-[0_0_35px_rgba(250,204,21,0.4)] ring-2 ring-amber-400/50'
                    : 'border-amber-400/30 hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(250,204,21,0.2)]'
                }`}
              >
                {/* Top Corner Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/5 rounded-bl-full pointer-events-none group-hover:bg-amber-400/10 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(250,204,21,0.3)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 border border-zinc-700 font-['Chakra_Petch']">
                      {event.tag}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-['Chakra_Petch']">
                    {event.category}
                  </div>
                  <h3 className="text-2xl font-black font-['Chakra_Petch'] uppercase text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </h3>

                  {event.game && (
                    <div className="text-xs font-mono text-zinc-400 mt-1 mb-3">
                      Game: <span className="text-zinc-200 font-semibold">{event.game}</span>
                    </div>
                  )}

                  <p className="text-zinc-300 text-xs leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-zinc-800/80 text-xs">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Termin:
                      </span>
                      <span className="font-bold text-white font-['Chakra_Petch']">{event.dayTime}</span>
                    </div>

                    {event.prize && (
                      <div className="flex items-center justify-between text-zinc-300">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <Award className="w-3.5 h-3.5 text-yellow-400" /> Gewinn:
                        </span>
                        <span className="font-semibold text-amber-300 text-right truncate max-w-[170px]">{event.prize}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Users className="w-3.5 h-3.5 text-emerald-400" /> Teilnehmer:
                      </span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        {event.participants + (isJoined ? 1 : 0)} {event.maxParticipants ? `/ ${event.maxParticipants}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 space-y-2">
                  <button
                    onClick={() => handleJoinEvent(event.id)}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider font-['Chakra_Petch'] transition-all flex items-center justify-center gap-2 ${
                      isJoined
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black hover:shadow-[0_0_20px_rgba(250,204,21,0.6)]'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Angemeldet (Bestätigt)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Jetzt Anmelden ({event.dayTime})</span>
                      </>
                    )}
                  </button>

                  <a
                    href={COMMUNITY_INFO.discordInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playUiSound('click')}
                    className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-[11px] font-semibold text-center block transition-colors border border-zinc-800"
                  >
                    Im Discord #events Kanal ansehen &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
