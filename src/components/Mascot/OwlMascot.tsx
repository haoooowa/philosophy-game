import { useEffect, useState } from 'react';
import styles from './OwlMascot.module.css';

export type OwlMood = 'idle' | 'happy' | 'thinking' | 'sad' | 'excited' | 'encourage';

interface Props {
  mood?: OwlMood;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const pool: Record<OwlMood, string[]> = {
  idle: ['Can you spot the fallacy?', 'Look closely...', 'Something is off here.', 'Find the logical flaw.'],
  happy: ['Well reasoned!', 'Nice catch!', 'Sharp thinking!'],
  thinking: ['Think deeper...', 'Read carefully...', 'Who avoids the point?'],
  sad: ['Not quite.', 'Almost!', 'Check the explanation.'],
  excited: ['Perfect logic!', 'You nailed it!', 'Flawless!'],
  encourage: ['Try again!', 'You got this!', 'One more time!'],
};

export default function OwlMascot({ mood = 'idle', size = 'md', message }: Props) {
  const [msg, setMsg] = useState(() => pool[mood][0]);
  useEffect(() => { setMsg(message || pool[mood][Math.floor(Math.random() * pool[mood].length)]); }, [mood, message]);

  const s = { sm: 56, md: 80, lg: 110 }[size];

  return (
    <div className={styles.wrap}>
      {msg && <div className={styles.bubble}><p>{msg}</p></div>}
      <svg width={s} height={s} viewBox="0 0 60 72">
        <ellipse cx="30" cy="44" rx="24" ry="26" fill="#E07B5A" />
        <ellipse cx="30" cy="50" rx="16" ry="14" fill="#FDF0EB" />
        <ellipse cx="20" cy="68" rx="7" ry="3.5" fill="#D4953A" />
        <ellipse cx="40" cy="68" rx="7" ry="3.5" fill="#D4953A" />
        <circle cx="22" cy="34" r="9" fill="white" />
        <circle cx="38" cy="34" r="9" fill="white" />
        <circle cx="23" cy="34" r="3.5" fill="#1a1a1a" />
        <circle cx="39" cy="34" r="3.5" fill="#1a1a1a" />
        <circle cx="21" cy="32" r="1.5" fill="white" opacity="0.8" />
        <circle cx="37" cy="32" r="1.5" fill="white" opacity="0.8" />
        <path d="M27 40 L30 45 L33 40 Z" fill="#E8A830" />
        <circle cx="22" cy="34" r="12" fill="none" stroke="#3D2B1F" strokeWidth="2" />
        <circle cx="38" cy="34" r="12" fill="none" stroke="#3D2B1F" strokeWidth="2" />
        <line x1="34" y1="34" x2="26" y2="34" stroke="#3D2B1F" strokeWidth="2" />
        <g transform="translate(30, 22) rotate(-5)">
          <rect x="-10" y="-4" width="20" height="3.5" rx="1" fill="#2B1A10" />
          <polygon points="-9,-4 9,-4 0,-13" fill="#2B1A10" />
          <circle cx="0" cy="-16" r="2" fill="#D4A853" />
        </g>
      </svg>
    </div>
  );
}
