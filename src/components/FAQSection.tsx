import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/communityData';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { playUiSound } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    playUiSound('click');
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-2 md:py-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-['Chakra_Petch'] uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            HÄUFIG GESTELLTE FRAGEN
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-['Chakra_Petch'] uppercase text-white tracking-wide">
            ALLES WICHTIGE ZU NEXO
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#10141d] border-amber-400/60 shadow-[0_0_20px_rgba(250,204,21,0.15)]'
                    : 'bg-[#0d0f17] border-zinc-800 hover:border-amber-400/30'
                }`}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold font-['Chakra_Petch'] text-sm sm:text-base text-zinc-100 hover:text-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-xs">0{idx + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
