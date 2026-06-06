import { useMemo, useEffect, useRef } from 'react';
import { ALL_LEVELS } from '../../data/levels';
import { CHAPTERS } from '../../data/chapters';
import { useGameStore } from '../../store/gameStore';
import OwlMascot from '../Mascot/OwlMascot';
import HeartsBar from '../HeartsBar/HeartsBar';
import XPDisplay from '../XPDisplay/XPDisplay';
import StreakBadge from '../StreakBadge/StreakBadge';
import styles from './PathView.module.css';

interface Props {
  onSelectLevel: (levelId: number) => void;
}

// Build a single snake path: chapter rows alternate left-to-right / right-to-left
function buildPath() {
  const nodes: { levelId: number; chapterId: number; x: number; y: number }[] = [];
  let y = 0;

  for (let ch = 1; ch <= 9; ch++) {
    const levels = ALL_LEVELS.filter(l => l.chapter === ch);
    const reversed = ch % 2 === 0;
    const ordered = reversed ? [...levels].reverse() : levels;

    ordered.forEach((level, i) => {
      nodes.push({
        levelId: level.id,
        chapterId: ch,
        x: i,        // column within the row (0-8)
        y,           // row index
      });
    });
    y++;
  }
  return nodes;
}

export default function PathView({ onSelectLevel }: Props) {
  const {
    isLevelUnlocked, isLevelCompleted, getStars, progress,
    hearts, maxHearts, xp, playerLevel, getXPToNextLevel,
    streak, owlMood, owlMessage, setOwlMood,
  } = useGameStore();

  const pathNodes = useMemo(() => buildPath(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  // Find the first uncompleted level as "current"
  const currentLevelId = useMemo(() => {
    const firstUncompleted = ALL_LEVELS.find(l => !isLevelCompleted(l.id) && isLevelUnlocked(l.id));
    return firstUncompleted?.id ?? progress.currentLevel;
  }, [progress.currentLevel, isLevelCompleted, isLevelUnlocked]);

  // Auto-scroll to current level
  useEffect(() => {
    if (currentRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = currentRef.current;
      const offset = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, [currentLevelId]);

  const handleLevelClick = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) return;
    if (hearts <= 0) {
      setOwlMood('sad', 'No hearts left!');
      return;
    }
    onSelectLevel(levelId);
  };

  const completedCount = ALL_LEVELS.filter(l => isLevelCompleted(l.id)).length;

  return (
    <div className={styles.outer}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <StreakBadge days={streak} />
        <HeartsBar maxHearts={maxHearts} currentHearts={hearts} />
        <XPDisplay xp={xp} level={playerLevel} xpToNext={getXPToNextLevel()} />
      </div>

      {/* Owl */}
      <div className={styles.owlArea}>
        <OwlMascot mood={owlMood} size="md" message={owlMessage || undefined} />
      </div>

      {/* Progress header */}
      <div className={styles.progressHeader}>
        <span className={styles.progressCount}>{completedCount}/81</span>
      </div>

      {/* Scrollable path */}
      <div className={styles.scrollContainer} ref={scrollRef}>
        <div className={styles.pathTrack}>
          {/* Continuous vertical connector line */}
          <div className={styles.connectorLine} />

          {pathNodes.map((node) => {
            const chapter = CHAPTERS[node.chapterId - 1];
            const level = ALL_LEVELS.find(l => l.id === node.levelId)!;
            const unlocked = isLevelUnlocked(node.levelId);
            const completed = isLevelCompleted(node.levelId);
            const stars = getStars(node.levelId);
            const isCurrent = node.levelId === currentLevelId;

            // Show chapter banner at the first level of each chapter
            const isFirstInChapter = ALL_LEVELS
              .filter(l => l.chapter === node.chapterId)
              .sort((a, b) => a.id - b.id)[0]?.id === node.levelId;

            // Determine visibility: show levels around current ± a window
            const levelIdx = ALL_LEVELS.findIndex(l => l.id === node.levelId);
            const currentIdx = ALL_LEVELS.findIndex(l => l.id === currentLevelId);
            const distance = Math.abs(levelIdx - currentIdx);
            const inWindow = distance <= 6;

            // Calculate horizontal offset (snake path)
            const col = node.x;
            const maxCol = 8;
            const offsetPx = ((col - maxCol / 2) / (maxCol / 2)) * 140;

            // Node styling
            let nodeClass = styles.node;
            if (completed && stars === 3) nodeClass += ` ${styles.nodeGold}`;
            else if (completed) nodeClass += ` ${styles.nodeDone}`;
            else if (isCurrent) nodeClass += ` ${styles.nodeCurrent}`;
            else if (!unlocked) nodeClass += ` ${styles.nodeLocked}`;

            return (
              <div
                key={node.levelId}
                className={`${styles.nodeWrapper} ${inWindow ? '' : styles.nodeHidden}`}
                style={{ '--node-offset': `${offsetPx}px` } as React.CSSProperties}
                ref={isCurrent ? currentRef : undefined}
              >
                {/* Chapter banner */}
                {isFirstInChapter && (
                  <div className={styles.chapterBanner}>
                    <span className={styles.chapterDot} style={{ backgroundColor: chapter.color }} />
                    <span className={styles.chapterLabel}>{chapter.title}</span>
                  </div>
                )}

                {/* Level node */}
                <button
                  className={nodeClass}
                  onClick={() => handleLevelClick(node.levelId)}
                  disabled={!unlocked}
                  type="button"
                  style={isCurrent ? {
                    borderColor: chapter.color,
                    boxShadow: `0 0 0 6px ${chapter.color}20`,
                  } : undefined}
                >
                  {completed ? (
                    <span className={styles.nodeIcon} style={{ color: stars === 3 ? 'var(--color-gold)' : 'var(--color-success)' }}>
                      {stars === 3 ? '3' : stars === 2 ? '2' : '1'}
                    </span>
                  ) : isCurrent ? (
                    <span className={styles.nodePlay}>&#9654;</span>
                  ) : (
                    <span className={styles.nodeDot}>&#183;</span>
                  )}

                  <span className={styles.nodeLabel}>
                    <span className={styles.nodeNum}>{node.levelId}</span>
                    <span className={styles.nodeTitle}>{level.title}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
