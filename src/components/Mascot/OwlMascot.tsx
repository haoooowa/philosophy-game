import { useEffect, useState } from 'react';
import styles from './OwlMascot.module.css';

export type OwlMood = 'idle' | 'happy' | 'thinking' | 'sad' | 'excited' | 'encourage' | 'surprised';

interface Props {
  mood?: OwlMood;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const moodMessages: Record<OwlMood, string> = {
  idle: 'Find the logical fallacy!',
  happy: 'Great reasoning!',
  thinking: 'Hmm, think carefully...',
  sad: 'Not quite right.',
  excited: 'Perfect! You are a genius!',
  encourage: 'Try again, you got this!',
  surprised: 'Wow, impressive!',
};

export default function OwlMascot({ mood = 'idle', size = 'md', message }: Props) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey(k => k + 1);
  }, [mood]);

  const s = { sm: 60, md: 90, lg: 130 }[size];
  const displayMsg = message || moodMessages[mood];

  return (
    <div className={`${styles.wrap} ${styles[size]}`} key={animKey}>
      {/* Speech bubble */}
      <div className={`${styles.bubble} ${mood === 'excited' ? styles.bubbleExcited : ''}`}>
        <p>{displayMsg}</p>
      </div>

      <svg
        width={s}
        height={s}
        viewBox="0 0 80 96"
        className={styles.owl}
      >
        {/* Shadow */}
        <ellipse cx="40" cy="90" rx="30" ry="4" fill="rgba(0,0,0,0.08)" />

        {/* Body */}
        <ellipse cx="40" cy="56" rx="32" ry="34" fill="url(#owlBody)" />
        {/* Belly */}
        <ellipse cx="40" cy="62" rx="22" ry="20" fill="#FFF8F0" />

        {/* Feet */}
        <ellipse cx="25" cy="88" rx="9" ry="5" fill="#F0A030" />
        <ellipse cx="55" cy="88" rx="9" ry="5" fill="#F0A030" />

        {/* Wings */}
        <g className={mood === 'excited' ? styles.wingFlap : ''}>
          <ellipse cx="10" cy="52" rx="8" ry="18" fill="#E08040" transform="rotate(12,10,52)" />
          <ellipse cx="70" cy="52" rx="8" ry="18" fill="#E08040" transform="rotate(-12,70,52)" />
        </g>

        {/* Glasses frame */}
        <circle cx="28" cy="40" r="11" fill="none" stroke="#4A3020" strokeWidth="2" />
        <circle cx="52" cy="40" r="11" fill="none" stroke="#4A3020" strokeWidth="2" />
        <line x1="39" y1="40" x2="41" y2="40" stroke="#4A3020" strokeWidth="2.5" />

        {/* Eyes */}
        <ellipse cx="28" cy="40" rx="8" ry="9" fill="white" />
        <ellipse cx="52" cy="40" rx="8" ry="9" fill="white" />

        {/* Pupils - direction varies by mood */}
        <circle cx={mood === 'thinking' ? 26 : mood === 'sad' ? 28 : 29}
                cy={mood === 'thinking' ? 39 : mood === 'sad' ? 41 : 39}
                r={mood === 'surprised' || mood === 'excited' ? 2.5 : 4}
                fill="#1a1a1a" />
        <circle cx={mood === 'thinking' ? 50 : mood === 'sad' ? 52 : 53}
                cy={mood === 'thinking' ? 39 : mood === 'sad' ? 41 : 39}
                r={mood === 'surprised' || mood === 'excited' ? 2.5 : 4}
                fill="#1a1a1a" />

        {/* Eye shine */}
        <circle cx="26" cy="37" r="2" fill="white" opacity="0.9" />
        <circle cx="50" cy="37" r="2" fill="white" opacity="0.9" />

        {/* Beak */}
        <path d="M35 48 L40 55 L45 48 Z" fill="#FFB020" />

        {/* Eyebrows */}
        {mood === 'excited' || mood === 'surprised' ? (
          <>
            <path d="M20 32 Q28 28 34 33" fill="none" stroke="#4A3020" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 32 Q52 28 46 33" fill="none" stroke="#4A3020" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : mood === 'sad' ? (
          <>
            <path d="M20 34 Q28 36 34 33" fill="none" stroke="#4A3020" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 34 Q52 36 46 33" fill="none" stroke="#4A3020" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : null}

        {/* Graduation cap */}
        <g transform="translate(40, 20) rotate(-6)">
          <rect x="-12" y="-4" width="24" height="4" rx="1.5" fill="#3D2B1F" />
          <polygon points="-11,-4 11,-4 0,-16" fill="#3D2B1F" />
          <line x1="0" y1="-16" x2="6" y2="-26" stroke="#3D2B1F" strokeWidth="1.5" />
          <circle cx="6" cy="-28" r="2.5" fill="#FFB800" />
        </g>

        {/* Sparkles for excited */}
        {mood === 'excited' && (
          <>
            <text x="8" y="22" fontSize="8" className={styles.sparkle}>+</text>
            <text x="62" y="16" fontSize="6" className={styles.sparkle}>+</text>
            <text x="18" y="12" fontSize="5" className={styles.sparkle}>+</text>
          </>
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id="owlBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF8C52" />
            <stop offset="100%" stopColor="#E06830" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
