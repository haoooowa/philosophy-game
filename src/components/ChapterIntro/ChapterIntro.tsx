import { getChapterById } from '../../data/chapters';
import { useGameStore } from '../../store/gameStore';
import { getLevelsByChapter } from '../../data/levels';
import styles from './ChapterIntro.module.css';

interface Props {
  chapterId: number;
  onStart: () => void;
  onSelectLevel: (levelId: number) => void;
}

export default function ChapterIntro({ chapterId, onStart, onSelectLevel }: Props) {
  const chapter = getChapterById(chapterId);
  const { isLevelUnlocked, isLevelCompleted, getStars } = useGameStore();
  const levels = getLevelsByChapter(chapterId);

  const firstUnplayedLevel = levels.find(l => !isLevelCompleted(l.id));
  const completedCount = levels.filter(l => isLevelCompleted(l.id)).length;

  return (
    <div className={`${styles.wrapper} fade-in`}>
      <div className={styles.banner}>
        <div className={styles.chapterNum}>Chapter {chapter.id}</div>
        <h1 className={styles.title}>{chapter.title}</h1>
        <p className={styles.subtitle}>{chapter.subtitle}</p>
        <p className={styles.desc}>{chapter.description}</p>
        <div className={styles.progressRow}>
          <span className={styles.progressNum}>{completedCount}/{levels.length}</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(completedCount / levels.length) * 100}%`, backgroundColor: chapter.color }}
            />
          </div>
        </div>
      </div>

      <div className={styles.levelList}>
        <h3 className={styles.listTitle}>Levels</h3>
        <div className={styles.grid}>
          {levels.map(level => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);
            const stars = getStars(level.id);

            return (
              <button
                key={level.id}
                className={`${styles.levelItem} ${!unlocked ? styles.locked : ''} ${completed ? styles.completed : ''}`}
                onClick={() => unlocked && onSelectLevel(level.id)}
                disabled={!unlocked}
                type="button"
                style={unlocked && completed ? { borderColor: `${chapter.color}60` } : undefined}
              >
                <span className={styles.levelNum}>{level.id}</span>
                <span className={styles.levelTitle}>{level.title}</span>
                {completed ? (
                  <span className={styles.starsText}>{stars}/3</span>
                ) : !unlocked ? (
                  <span className={styles.lockMark}>-</span>
                ) : (
                  <span className={styles.goMark}>&rarr;</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        {firstUnplayedLevel && (
          <button
            className={styles.startBtn}
            type="button"
            onClick={() => onSelectLevel(firstUnplayedLevel.id)}
          >
            Continue
          </button>
        )}
        <button className={styles.backBtn} type="button" onClick={onStart}>
          Back to all levels
        </button>
      </div>
    </div>
  );
}
