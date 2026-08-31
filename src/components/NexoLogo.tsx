import React from 'react';

interface NexoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const NexoLogo: React.FC<NexoLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-2xl tracking-wider',
    md: 'text-3xl tracking-widest',
    lg: 'text-5xl tracking-widest',
    xl: 'text-6xl tracking-widest',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[11px] tracking-[0.3em]',
    lg: 'text-sm tracking-[0.35em]',
    xl: 'text-base tracking-[0.4em]',
  };

  return (
    <div
      id="nexo-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer group select-none ${className}`}
    >
      {/* Hexagon with Lightning Bolt */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center flex-shrink-0`}>
        {/* Glowing background aura */}
        <div className="absolute inset-0 bg-amber-400/30 rounded-lg blur-md group-hover:bg-amber-400/50 transition-all duration-300" />
        
        {/* Hexagon Border Container */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(250,204,21,0.8)] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Hexagon Stroke */}
          <polygon
            points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
            fill="#0b0d13"
            stroke="#facc15"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          
          {/* Inner ambient glow */}
          <polygon
            points="50 12, 85 30, 85 70, 50 88, 15 70, 15 30"
            fill="rgba(250, 204, 21, 0.08)"
          />

          {/* Electric Lightning Bolt */}
          <path
            d="M56 18 L32 52 L50 52 L42 82 L70 46 L52 46 Z"
            fill="url(#goldGradient)"
            stroke="#fef08a"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            className="filter drop-shadow-[0_0_6px_#fde047]"
          />

          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-black font-['Chakra_Petch'] text-amber-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] italic leading-none group-hover:text-yellow-300 transition-colors ${textSizes[size]}`}
          style={{ letterSpacing: '0.08em' }}
        >
          NEXO
        </span>
        {showSubtitle && (
          <span
            className={`font-bold font-['Chakra_Petch'] text-zinc-300 uppercase leading-none mt-1 opacity-90 group-hover:text-white transition-colors ${subSizes[size]}`}
          >
            GAMING COMMUNITY
          </span>
        )}
      </div>
    </div>
  );
};
