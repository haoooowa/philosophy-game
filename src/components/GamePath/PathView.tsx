import { useMemo } from 'react';
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

// Arrange 81 levels in a snake path: 9 chapters, each in a row that alternates direction
function buildSnakePath() {
  const rows: { chapterId: number; levels: typeof ALL_LEVELS }[] = [];
  for (let ch = 1; ch <= 9; ch++) {
    const chapterLevels = ALL_LEVELS.filter(l => l.chapter === ch);
    // Even chapters go right-to-left for snake effect
    if (ch % 2 === 0) chapterLevels.reverse();
    rows.push({ chapterId: ch, levels: chapterLevels });
  }
  return rows;
}

export default function PathView({ onSelectLevel }: Props) {
  const {
    isLevelUnlocked, isLevelCompleted, getStars,
    hearts, maxHearts, xp, playerLevel, getXPToNextLevel,
    streak, owlMood, owlMessage,
    setOwlMood,
  } = useGameStore();

  const rows = useMemo(() => buildSnakePath(), []);
  const completedCount = useMemo(
    () => ALL_LEVELS.filter(l => isLevelCompleted(l.id)).length,
    [isLevelCompleted]
  );

  const handleLevelClick = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) return;
    if (hearts <= 0) {
      setOwlMood('sad', 'No hearts left! Wait or refill.');
      return;
    }
    onSelectLevel(levelId);
  };

  return (
    <div className={styles.wrapper}>
      {/* Top bar with stats */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <StreakBadge days={streak} />
          <HeartsBar maxHearts={maxHearts} currentHearts={hearts} />
        </div>
        <div className={styles.topRight}>
          <XPDisplay xp={xp} level={playerLevel} xpToNext={getXPToNextLevel()} />
        </div>
      </div>

      {/* Owl mascot area */}
      <div className={styles.owlArea}>
        <OwlMascot
          mood={owlMood}
          size="md"
          message={owlMessage || undefined}
          speaking={!!owlMessage}
        />
      </div>

      {/* Progress summary */}
      <div className={styles.summary}>
        <h1 className={styles.title}>Logic Path</h1>
        <p className={styles.sub}>{completedCount}/81 levels completed</p>
      </div>

      {/* Snake path */}
      <div className={styles.pathContainer}>
        {rows.map((row, rowIdx) => {
          const chapter = CHAPTERS[row.chapterId - 1];
          const isReversed = row.chapterId % 2 === 0;

          return (
            <div key={row.chapterId} className={styles.chapterRow}>
              {/* Chapter label */}
              <div className={styles.chapterLabel}>
                <span
                  className={styles.chapterDot}
                  style={{ backgroundColor: chapter.color }}
                />
                <span className={styles.chapterName}>{chapter.title}</span>
              </div>

              {/* Level nodes */}
              <div className={`${styles.levelRow} ${isReversed ? styles.reversed : ''}`}>
                {row.levels.map((level, i) => {
                  const unlocked = isLevelUnlocked(level.id);
                  const completed = isLevelCompleted(level.id);
                  const stars = getStars(level.id);
                  const isCurrent = unlocked && !completed;

                  let nodeClass = styles.node;
                  if (completed && stars === 3) nodeClass += ` ${styles.nodeGold}`;
                  else if (completed) nodeClass += ` ${styles.nodeDone}`;
                  else if (isCurrent) nodeClass += ` ${styles.nodeCurrent}`;
                  else nodeClass += ` ${styles.nodeLocked}`;

                  // Show first uncompleted level's number prominently
                  const showLabel = isCurrent || (completed && i === 0);

                  return (
                    <button
                      key={level.id}
                      className={nodeClass}
                      onClick={() => handleLevelClick(level.id)}
                      disabled={!unlocked}
                      type="button"
                      style={isCurrent ? {
                        borderColor: chapter.color,
                        boxShadow: `0 0 0 4px ${chapter.color}20`,
                      } : undefined}
                    >
                      <span className={styles.nodeInner}>
                        {completed ? (
                          <span className={styles.nodeStars}>
                            {stars === 3 ? '3' : stars === 2 ? '2' : '1'}
                          </span>
                        ) : isCurrent ? (
                          <span className={styles.nodePlay}>&#9654;</span>
                        ) : (
                          <span className={styles.nodeLock}>&#9679;</span>
                        )}
                      </span>
                      {showLabel && (
                        <span className={styles.nodeLabel}>{level.id}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Connector line between rows */}
              {rowIdx < rows.length - 1 && (
                <div className={styles.connector}>
                  <svg width="24" height="32" viewBox="0 0 24 32">
                    <path
                      d={row.chapterId % 2 === 1
                        ? 'M22 0 Q22 16 2 32'
                        : 'M2 0 Q2 16 22 32'}
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
