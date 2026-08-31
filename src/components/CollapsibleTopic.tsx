import React from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { playUiSound } from '../utils/audio';

interface CollapsibleTopicProps {
  id: string;
  topicNumber: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const CollapsibleTopic: React.FC<CollapsibleTopicProps> = ({
  id,
  topicNumber,
  title,
  subtitle,
  icon,
  badge,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div
      id={id}
      className={`scroll-mt-24 transition-all duration-300 rounded-3xl border ${
        isOpen
          ? 'bg-[#0a0c13] border-amber-400/60 shadow-[0_0_35px_rgba(250,204,21,0.12)]'
          : 'bg-[#090b10] border-zinc-800/80 hover:border-amber-400/40 hover:bg-[#0c0f17]'
      } overflow-hidden mb-6`}
    >
      {/* Header Button to Expand / Collapse */}
      <button
        onClick={() => {
          playUiSound('click');
          onToggle();
        }}
        className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 group transition-colors select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
          {/* Topic Number & Icon */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all ${
                isOpen
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)] rotate-0 scale-105'
                  : 'bg-zinc-900 border border-zinc-700 text-amber-400 group-hover:border-amber-400/60 group-hover:scale-105'
              }`}
            >
              {icon}
            </div>
            <span className="absolute -top-2 -left-2 px-1.5 py-0.5 rounded bg-black/90 border border-amber-400/50 text-[10px] font-mono font-bold text-amber-400">
              #{topicNumber}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg sm:text-2xl font-black font-['Chakra_Petch'] uppercase tracking-wide text-white group-hover:text-amber-300 transition-colors truncate">
                {title}
              </h3>
              {badge && (
                <span className="text-[10px] sm:text-xs font-bold font-['Chakra_Petch'] uppercase px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 truncate mt-0.5 font-sans">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Action / Chevron Indicator */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden md:inline-block text-xs font-bold font-['Chakra_Petch'] uppercase px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors">
            {isOpen ? 'Einklappen' : 'Ausklappen'}
          </span>
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isOpen
                ? 'bg-amber-400/20 border-amber-400 text-amber-400 rotate-180 shadow-[0_0_15px_rgba(250,204,21,0.25)]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-amber-400/40'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      {/* Collapsible Content Area */}
      {isOpen && (
        <div className="border-t border-zinc-800/80 p-4 sm:p-8 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};
