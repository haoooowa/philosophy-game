import { useMemo, useEffect, useRef } from 'react';
import { ALL_LEVELS } from '../../data/levels';
import { CHAPTERS } from '../../data/chapters';
import { useGameStore } from '../../store/gameStore';
import OwlMascot from '../Mascot/OwlMascot';
import HeartsBar from '../HeartsBar/HeartsBar';
import StreakBadge from '../StreakBadge/StreakBadge';
import styles from './PathView.module.css';

interface Props {
  onSelectLevel: (levelId: number) => void;
}

// Build a winding path: 9 chapters, each is a row of 9 levels
function buildSnake() {
  const rows: { levelId: number; chapterId: number; col: number; row: number }[] = [];
  for (let ch = 1; ch <= 9; ch++) {
    const levels = ALL_LEVELS.filter(l => l.chapter === ch);
    const reversed = ch % 2 === 0;
    const ordered = reversed ? [...levels].reverse() : levels;
    ordered.forEach((lv, i) => {
      rows.push({ levelId: lv.id, chapterId: ch, col: i, row: ch - 1 });
    });
  }
  return rows;
}

export default function PathView({ onSelectLevel }: Props) {
  const {
    isLevelUnlocked, isLevelCompleted, getStars,
    hearts, maxHearts, xp, playerLevel, getXPToNextLevel,
    streak, owlMood, owlMessage, setOwlMood,
  } = useGameStore();

  const nodes = useMemo(() => buildSnake(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  // Find current (first unlocked & uncompleted)
  const currentLevelId = useMemo(() => {
    for (const lv of ALL_LEVELS) {
      if (isLevelUnlocked(lv.id) && !isLevelCompleted(lv.id)) return lv.id;
    }
    return 81;
  }, [isLevelUnlocked, isLevelCompleted]);

  // Auto-scroll to current level
  useEffect(() => {
    if (currentRef.current && scrollRef.current) {
      const c = scrollRef.current;
      const el = currentRef.current;
      c.scrollTo({ top: el.offsetTop - c.clientHeight / 3, behavior: 'smooth' });
    }
  }, [currentLevelId]);

  const completedCount = ALL_LEVELS.filter(l => isLevelCompleted(l.id)).length;
  const totalStars = ALL_LEVELS.reduce((s, l) => s + getStars(l.id), 0);
  const totalXP = xp;
  const xpToNext = getXPToNextLevel();
  const xpPercent = Math.min((totalXP / xpToNext) * 100, 100);

  const handleClick = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) return;
    if (hearts <= 0) { setOwlMood('sad', 'Out of hearts!'); return; }
    onSelectLevel(levelId);
  };

  // Group nodes by chapter for banners
  const chapterStarts = new Set<number>();
  for (let ch = 1; ch <= 9; ch++) {
    const first = ALL_LEVELS.filter(l => l.chapter === ch).sort((a, b) => a.id - b.id)[0];
    if (first) chapterStarts.add(first.id);
  }

  return (
    <div className={styles.screen}>
      {/* Top status bar */}
      <div className={styles.topBar}>
        <StreakBadge days={streak} />
        <div className={styles.heartsWrap}>
          <HeartsBar maxHearts={maxHearts} currentHearts={hearts} />
        </div>
        <div className={styles.xpRing}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#E8DDD2" strokeWidth="4" />
            <circle cx="20" cy="20" r="16" fill="none" stroke="#FFB800" strokeWidth="4"
              strokeDasharray={`${xpPercent * 1.005} ${100 - xpPercent}`}
              strokeLinecap="round" transform="rotate(-90 20 20)" />
          </svg>
          <span className={styles.xpLevel}>{playerLevel}</span>
        </div>
      </div>

      {/* Owl mascot */}
      <div className={styles.owlArea}>
        <OwlMascot mood={owlMood} size="lg" message={owlMessage || undefined} />
      </div>

      {/* Progress */}
      <div className={styles.progressSection}>
        <div className={styles.progressBarOuter}>
          <div className={styles.progressBarInner} style={{ width: `${(completedCount / 81) * 100}%` }} />
        </div>
        <div className={styles.progressStats}>
          <span><strong>{completedCount}</strong> / 81 completed</span>
          <span><strong>{totalStars}</strong> / 243 stars</span>
        </div>
      </div>

      {/* Path - scrollable */}
      <div className={styles.pathScroll} ref={scrollRef}>
        <div className={styles.pathTrack}>
          {/* Background road */}
          <div className={styles.road} />

          {nodes.map((node) => {
            const level = ALL_LEVELS.find(l => l.id === node.levelId)!;
            const unlocked = isLevelUnlocked(node.levelId);
            const completed = isLevelCompleted(node.levelId);
            const stars = getStars(node.levelId);
            const isCurrent = node.levelId === currentLevelId;
            const isStart = chapterStarts.has(node.levelId);
            const chapter = CHAPTERS[node.chapterId - 1];

            // Snake offset
            const colOffset = (node.col - 4) * 48;
            const rowOffset = node.row * 140;

            // Visibility
            const idx = ALL_LEVELS.findIndex(l => l.id === node.levelId);
            const curIdx = ALL_LEVELS.findIndex(l => l.id === currentLevelId);
            const dist = Math.abs(idx - curIdx);
            const inView = dist <= 8;

            return (
              <div
                key={node.levelId}
                className={`${styles.nodeWrapper} ${inView ? styles.inView : styles.outView}`}
                style={{
                  transform: `translateX(${colOffset}px)`,
                  top: `${rowOffset + node.col * 4}px`,
                }}
                ref={isCurrent ? currentRef : undefined}
              >
                {/* Chapter start banner */}
                {isStart && (
                  <div className={styles.chapterSign} style={{ borderColor: chapter.color }}>
                    <span className={styles.chapterSignDot} style={{ background: chapter.color }} />
                    {chapter.title}
                  </div>
                )}

                {/* Connector line to previous */}
                {idx > 0 && (
                  <div className={styles.connector} style={{
                    transform: `rotate(${node.chapterId % 2 === 0 ? '15deg' : '-15deg'})`,
                  }} />
                )}

                {/* The node */}
                <button
                  className={`
                    ${styles.node}
                    ${completed && stars === 3 ? styles.nodeGold : ''}
                    ${completed && stars < 3 ? styles.nodeDone : ''}
                    ${isCurrent ? styles.nodeNow : ''}
                    ${!unlocked ? styles.nodeLock : ''}
                  `}
                  onClick={() => handleClick(node.levelId)}
                  disabled={!unlocked}
                  type="button"
                  style={isCurrent ? { borderColor: chapter.color } : undefined}
                >
                  <span className={styles.nodeInner}>
                    {completed ? (
                      <span className={styles.nodeStar}>
                        {'*'.repeat(stars)}
                      </span>
                    ) : isCurrent ? (
                      <span className={styles.nodeGo}>GO</span>
                    ) : (
                      <span className={styles.nodeWait}>{node.levelId}</span>
                    )}
                  </span>
                </button>

                {/* Label below node */}
                <span className={styles.nodeName}>{level.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <button className={`${styles.bottomTab} ${styles.bottomTabActive}`}>
          <span className={styles.bottomIcon}>P</span>
          <span>Path</span>
        </button>
        <button className={styles.bottomTab}>
          <span className={styles.bottomIcon}>S</span>
          <span>Stats</span>
        </button>
      </div>
    </div>
  );
}
