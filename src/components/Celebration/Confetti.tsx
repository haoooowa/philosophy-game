import { useEffect, useState, useCallback } from 'react';
import styles from './Confetti.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  delay: number;
  duration: number;
}

interface Props {
  active: boolean;
  onComplete?: () => void;
}

const COLORS = ['#E07B5A', '#D4A853', '#6BAF7B', '#5C8DC9', '#C4825E', '#A87CA0', '#56A89B'];

export default function Confetti({ active, onComplete }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawn = useCallback(() => {
    const p: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      p.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 2,
      });
    }
    setParticles(p);
  }, []);

  useEffect(() => {
    if (active) {
      spawn();
      if (onComplete) {
        const t = setTimeout(onComplete, 3000);
        return () => clearTimeout(t);
      }
    } else {
      setParticles([]);
    }
  }, [active, spawn, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className={styles.container}>
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
