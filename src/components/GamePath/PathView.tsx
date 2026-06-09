import { useMemo, useEffect, useRef, useState } from 'react';
import { ALL_LEVELS } from '../../data/levels';
import { CHAPTERS } from '../../data/chapters';
import { useGameStore } from '../../store/gameStore';
import OwlMascot from '../Mascot/OwlMascot';
import HeartsBar from '../HeartsBar/HeartsBar';
import StreakBadge from '../StreakBadge/StreakBadge';
import styles from './PathView.module.css';

interface Props { onSelectLevel: (levelId: number) => void; }

function buildSnake() {
  const rows: { levelId: number; chapterId: number; col: number; row: number }[] = [];
  for (let ch = 1; ch <= 9; ch++) {
    const lvs = ALL_LEVELS.filter(l => l.chapter === ch);
    const ordered = ch % 2 === 0 ? [...lvs].reverse() : lvs;
    ordered.forEach((lv, i) => rows.push({ levelId: lv.id, chapterId: ch, col: i, row: ch - 1 }));
  }
  return rows;
}

export default function PathView({ onSelectLevel }: Props) {
  const {
    isLevelUnlocked, isLevelCompleted, getStars,
    hearts, maxHearts, playerLevel,
    streak, owlMood, owlMessage,
    regenerateHearts, getHeartRegenRemaining, refillHearts,
  } = useGameStore();

  const nodes = useMemo(() => buildSnake(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  const currentLevelId = useMemo(() => {
    for (const lv of ALL_LEVELS)
      if (isLevelUnlocked(lv.id) && !isLevelCompleted(lv.id)) return lv.id;
    return 81;
  }, [isLevelUnlocked, isLevelCompleted]);

  useEffect(() => {
    if (currentRef.current && scrollRef.current) {
      const c = scrollRef.current;
      c.scrollTo({ top: currentRef.current.offsetTop - c.clientHeight / 3, behavior: 'smooth' });
    }
  }, [currentLevelId]);

  const completedCount = ALL_LEVELS.filter(l => isLevelCompleted(l.id)).length;
  const totalStars = ALL_LEVELS.reduce((s, l) => s + getStars(l.id), 0);

  const chapterStarts = new Set<number>();
  for (let ch = 1; ch <= 9; ch++) {
    const f = ALL_LEVELS.filter(l => l.chapter === ch).sort((a, b) => a.id - b.id)[0];
    if (f) chapterStarts.add(f.id);
  }

  const [regenSecs, setRegenSecs] = useState(() => getHeartRegenRemaining());
  useEffect(() => {
    const t = setInterval(() => { regenerateHearts(); setRegenSecs(getHeartRegenRemaining()); }, 1000);
    return () => clearInterval(t);
  }, [regenerateHearts, getHeartRegenRemaining]);

  const noHearts = hearts <= 0;

  return (
    <div className={styles.screen}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <StreakBadge days={streak} />
        <HeartsBar maxHearts={maxHearts} currentHearts={hearts} />
        <span className={styles.levelBadge}>Lv.{playerLevel}</span>
      </div>

      {/* Owl */}
      <div className={styles.owlArea}>
        <OwlMascot mood={owlMood} size="md" message={owlMessage || undefined} />
      </div>

      {/* Progress */}
      <div className={styles.progressRow}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${(completedCount / 81) * 100}%` }} />
        </div>
        <span className={styles.progressText}>{completedCount}/81 &middot; {totalStars}/243</span>
      </div>

      {/* Chapter tabs */}
      <div className={styles.tabs}>
        {CHAPTERS.map(ch => {
          const active = currentLevelId >= (ch.id - 1) * 9 + 1 && currentLevelId <= ch.id * 9;
          return (
            <button key={ch.id}
              className={`${styles.tab} ${active ? styles.tabActive : ''}`}
              type="button">{ch.title}</button>
          );
        })}
      </div>

      {/* Path */}
      <div className={styles.pathScroll} ref={scrollRef}>
        <div className={styles.pathTrack}>
          {nodes.map((node) => {
            const level = ALL_LEVELS.find(l => l.id === node.levelId)!;
            const unlocked = isLevelUnlocked(node.levelId);
            const completed = isLevelCompleted(node.levelId);
            const stars = getStars(node.levelId);
            const isCurrent = node.levelId === currentLevelId;
            const isStart = chapterStarts.has(node.levelId);

            const colOffset = (node.col - 4) * 56;
            const rowOffset = node.row * 180;
            const idx = ALL_LEVELS.findIndex(l => l.id === node.levelId);
            const curIdx = ALL_LEVELS.findIndex(l => l.id === currentLevelId);
            const dist = Math.abs(idx - curIdx);
            const inView = dist <= 6;

            return (
              <div key={node.levelId}
                className={`${styles.nodeWrap} ${inView ? styles.inView : styles.outView}`}
                style={{ transform: `translateX(${colOffset}px)`, top: `${rowOffset}px` }}
                ref={isCurrent ? currentRef : undefined}>

                {isStart && <div className={styles.banner}>{CHAPTERS[node.chapterId - 1].title}</div>}

                <button
                  className={`${styles.node} ${completed && stars === 3 ? styles.nodeGold : ''} ${completed && stars < 3 ? styles.nodeDone : ''} ${isCurrent ? styles.nodeNow : ''} ${!unlocked ? styles.nodeLock : ''}`}
                  onClick={() => {
                    if (!unlocked || noHearts) return;
                    onSelectLevel(node.levelId);
                  }}
                  disabled={!unlocked || noHearts}
                  type="button">
                  {completed ? <span>{stars === 3 ? '3' : stars === 2 ? '2' : '1'}</span>
                   : isCurrent ? <span>GO</span>
                   : <span>{node.levelId}</span>}
                </button>
                <span className={styles.nodeLabel}>{level.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* No hearts overlay */}
      {noHearts && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            <h2>Out of Hearts</h2>
            <p>Next heart in {Math.floor(regenSecs / 60)}:{String(regenSecs % 60).padStart(2, '0')}</p>
            <button type="button" onClick={() => { refillHearts(); regenerateHearts(); }}>Refill</button>
          </div>
        </div>
      )}
    </div>
  );
}
