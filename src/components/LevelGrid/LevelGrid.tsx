import { CHAPTERS } from '../../data/chapters';
import { ALL_LEVELS } from '../../data/levels';
import { useGameStore } from '../../store/gameStore';
import styles from './LevelGrid.module.css';

interface Props {
  onSelectChapter: (chapterId: number) => void;
}

export default function LevelGrid({ onSelectChapter }: Props) {
  const { isLevelUnlocked, isLevelCompleted, getStars, getTotalStars, getCompletedCount } = useGameStore();

  const chapterGroups = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>逻辑谬误</h1>
        <p className={styles.heroSub}>识别对话中的逻辑谬误，锻炼批判性思维</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{getCompletedCount()}<span className={styles.statUnit}>/81</span></span>
            <span className={styles.statLabel}>已通关</span>
          </div>
          <span className={styles.statSep}>|</span>
          <div className={styles.stat}>
            <span className={styles.statNum}>{getTotalStars()}<span className={styles.statUnit}>/243</span></span>
            <span className={styles.statLabel}>总星数</span>
          </div>
        </div>
      </section>

      <div className={styles.chapterGrid}>
        {chapterGroups.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.chapterRow}>
            {row.map(chapterId => {
              const chapter = CHAPTERS[chapterId - 1];
              const chapterLevels = ALL_LEVELS.filter(l => l.chapter === chapterId);
              const completedCount = chapterLevels.filter(l => isLevelCompleted(l.id)).length;
              const chapterStars = chapterLevels.reduce((sum, l) => sum + getStars(l.id), 0);

              return (
                <button
                  key={chapterId}
                  className={styles.chapterCard}
                  onClick={() => onSelectChapter(chapterId)}
                  style={{ borderColor: `${chapter.color}20` } as React.CSSProperties}
                  type="button"
                >
                  <div className={styles.chapterHeader}>
                    <span className={styles.chapterNum}>{chapterId}</span>
                    <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                    <span className={styles.chapterSub}>{chapter.subtitle}</span>
                  </div>

                  <div className={styles.miniGrid}>
                    {chapterLevels.map(level => {
                      const unlocked = isLevelUnlocked(level.id);
                      const completed = isLevelCompleted(level.id);
                      const stars = getStars(level.id);

                      let cellClass = styles.cell;
                      if (completed && stars === 3) cellClass += ` ${styles.cellGold}`;
                      else if (completed) cellClass += ` ${styles.cellDone}`;
                      else if (unlocked) cellClass += ` ${styles.cellOpen}`;
                      else cellClass += ` ${styles.cellLocked}`;

                      return <span key={level.id} className={cellClass} />;
                    })}
                  </div>

                  <div className={styles.progressRow}>
                    <span className={styles.progressText}>{completedCount}/9</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${(completedCount / 9) * 100}%`,
                          backgroundColor: chapter.color,
                        }}
                      />
                    </div>
                    <span className={styles.starText}>{chapterStars}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
