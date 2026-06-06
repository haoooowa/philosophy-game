import { useEffect, useState } from 'react';
import styles from './OwlMascot.module.css';

export type OwlMood = 'idle' | 'happy' | 'thinking' | 'sad' | 'excited' | 'encourage';

interface Props {
  mood?: OwlMood;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  speaking?: boolean;
}

export default function OwlMascot({
  mood = 'idle',
  size = 'md',
  message,
  speaking = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (message) {
      setMsgVisible(false);
      const t = setTimeout(() => setMsgVisible(true), 150);
      return () => clearTimeout(t);
    } else {
      setMsgVisible(false);
    }
  }, [message]);

  const sizeMap = { sm: 60, md: 90, lg: 120 };
  const s = sizeMap[size];

  // Eye state based on mood
  const eyeOpen = mood === 'sad' ? 0.3 : mood === 'excited' ? 1.3 : 0.85;
  const pupilScale = mood === 'excited' ? 1 : mood === 'sad' ? 0.6 : 1;
  const mouthCurve = mood === 'happy' ? 'M22 55 Q30 66 38 55' :
                     mood === 'sad' ? 'M24 58 Q30 52 36 58' :
                     mood === 'excited' ? 'M20 54 Q30 68 40 54' :
                     'M24 56 Q30 60 36 56';

  return (
    <div className={`${styles.container} ${styles[size]} ${visible ? styles.enter : ''}`}>
      {message && (
        <div className={`${styles.bubble} ${msgVisible ? styles.bubbleShow : ''}`}>
          <p>{message}</p>
        </div>
      )}

      <svg
        width={s}
        height={s}
        viewBox="0 0 60 72"
        className={`${styles.owl} ${styles[`mood-${mood}`]}`}
      >
        {/* Body */}
        <ellipse cx="30" cy="42" rx="26" ry="28" fill="#A0724A" />
        {/* Belly */}
        <ellipse cx="30" cy="47" rx="17" ry="16" fill="#E8D5B7" />

        {/* Feet */}
        <ellipse cx="18" cy="68" rx="7" ry="4" fill="#D4953A" />
        <ellipse cx="42" cy="68" rx="7" ry="4" fill="#D4953A" />

        {/* Wings */}
        <ellipse cx="4" cy="42" rx="6" ry="14" fill="#8B5E3C" transform="rotate(10 4 42)" />
        <ellipse cx="56" cy="42" rx="6" ry="14" fill="#8B5E3C" transform="rotate(-10 56 42)" />

        {/* Glasses */}
        <circle cx="21" cy="32" r="10" fill="none" stroke="#3D2B1F" strokeWidth="2" />
        <circle cx="39" cy="32" r="10" fill="none" stroke="#3D2B1F" strokeWidth="2" />
        <line x1="31" y1="32" x2="29" y2="32" stroke="#3D2B1F" strokeWidth="2" />

        {/* Eyes */}
        <ellipse cx="21" cy="32" rx={5.5 * eyeOpen} ry={6 * eyeOpen} fill="white" />
        <ellipse cx="39" cy="32" rx={5.5 * eyeOpen} ry={6 * eyeOpen} fill="white" />
        {/* Pupils */}
        <circle cx={21 + (mood === 'thinking' ? 0 : 0)} cy={32 + (mood === 'sad' ? 1.5 : 0)} r={3 * pupilScale} fill="#1a1a1a" />
        <circle cx={39 + (mood === 'thinking' ? 0 : 0)} cy={32 + (mood === 'sad' ? 1.5 : 0)} r={3 * pupilScale} fill="#1a1a1a" />
        {/* Eye shine */}
        <circle cx="19" cy="30" r="1.3" fill="white" opacity={mood === 'sad' ? 0.3 : 0.9} />
        <circle cx="37" cy="30" r="1.3" fill="white" opacity={mood === 'sad' ? 0.3 : 0.9} />

        {/* Beak */}
        <path d="M27 38 L30 44 L33 38 Z" fill="#E8A830" />

        {/* Mouth */}
        <path d={mouthCurve} fill="none" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" />

        {/* Eyebrows (for expression) */}
        {mood === 'excited' && (
          <>
            <line x1="14" y1="24" x2="24" y2="26" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="24" x2="36" y2="26" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {mood === 'sad' && (
          <>
            <line x1="14" y1="25" x2="24" y2="23" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="25" x2="36" y2="23" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Graduation cap (philosophy theme) */}
        <g transform="translate(30, 16) rotate(-8)">
          <rect x="-11" y="-4" width="22" height="3" rx="1" fill="#3D2B1F" />
          <polygon points="-10,-4 10,-4 0,-14" fill="#3D2B1F" />
          <line x1="0" y1="-14" x2="5" y2="-22" stroke="#3D2B1F" strokeWidth="1.2" />
          <circle cx="5" cy="-23" r="1.5" fill="#C4A148" />
        </g>

        {/* Sparkles for excited/happy */}
        {(mood === 'excited' || mood === 'happy') && (
          <>
            <text x="6" y="18" fontSize="6" className={styles.sparkle}>*</text>
            <text x="46" y="12" fontSize="5" className={styles.sparkle}>*</text>
          </>
        )}
      </svg>
    </div>
  );
}
