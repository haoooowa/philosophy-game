import type { LevelData, FallacyInstance } from '../../types';
import { FALLACIES } from '../../data/fallacies';
import styles from './FeedbackPanel.module.css';

interface Props {
  level: LevelData;
  stars: number;
  highlightedCorrect: boolean;
  fallacyCorrect: boolean;
  selectedFallacy: string | null;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToGrid: () => void;
  hasNextLevel: boolean;
}

export default function FeedbackPanel({
  level,
  stars,
  highlightedCorrect,
  fallacyCorrect,
  selectedFallacy,
  onNextLevel,
  onRetry,
  onBackToGrid,
  hasNextLevel,
}: Props) {
  const allCorrect = stars === 3;
  const partialCorrect = stars === 2;

  const statusTitle = allCorrect ? 'Perfect' : partialCorrect ? 'Close' : 'Keep trying';
  const statusText = allCorrect
    ? 'You correctly identified the logical fallacy in this dialogue.'
    : partialCorrect
      ? 'You found some errors, but not all. Review the analysis below.'
      : 'Not quite right this time, but each attempt builds your logical intuition.';

  return (
    <div className={styles.wrapper}>
      {/* Stars */}
      <div className={styles.starRow}>
        {[1, 2, 3].map(s => (
          <svg
            key={s}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={s <= stars ? 'var(--color-gold)' : 'none'}
            stroke={s <= stars ? 'var(--color-gold)' : 'var(--color-border)'}
            strokeWidth="1.2"
            className={s <= stars ? styles.starActive : styles.starInactive}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Status */}
      <div className={styles.statusBlock}>
        <h2 className={styles.statusTitle}>{statusTitle}</h2>
        <p className={styles.statusText}>{statusText}</p>
      </div>

      {/* Analysis */}
      <div className={styles.analysis}>
        <h3 className={styles.analysisTitle}>Analysis</h3>
        {level.fallacies.map((f: FallacyInstance, i: number) => {
          const info = FALLACIES[f.fallacyType];
          return (
            <div key={i} className={styles.fallacyCard}>
              <div className={styles.fallacyHeader}>
                <span className={styles.fallacyBadge}>{info?.icon ?? '?'}</span>
                <div>
                  <span className={styles.fallacyName}>{info?.name ?? f.fallacyType}</span>
                  <span className={styles.fallacyCat}>{info?.category}</span>
                </div>
              </div>
              <p className={styles.fallacyExp}>{f.explanation}</p>
            </div>
          );
        })}

        {!highlightedCorrect && (
          <div className={styles.hintBox}>
            <h4>Highlight feedback</h4>
            <p>
              The correct sentence{level.fallacies.flatMap(f => f.lineIds).length > 1 ? 's' : ''} to highlight
              {level.fallacies.flatMap(f => f.lineIds).length > 1 ? ' are' : ' is'} from{' '}
              {level.fallacies.flatMap(f => f.lineIds).map(id => {
                const line = level.dialogue.find(l => l.id === id);
                return line ? `"${line.speaker}"` : '';
              }).join(' and ')}.
            </p>
          </div>
        )}

        {!fallacyCorrect && (
          <div className={styles.hintBox}>
            <h4>Classification feedback</h4>
            <p>
              The correct fallacy type is{' '}
              <strong>
                {(() => { const info = FALLACIES[level.fallacies[0].fallacyType]; return info?.name ?? level.fallacies[0].fallacyType; })()}
              </strong>.
              {selectedFallacy && (
                <> You selected "{FALLACIES[selectedFallacy]?.name ?? selectedFallacy}".</>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {!allCorrect && (
          <button className={styles.retryBtn} type="button" onClick={onRetry}>
            Retry
          </button>
        )}
        {hasNextLevel && (
          <button className={styles.nextBtn} type="button" onClick={onNextLevel}>
            Next level
          </button>
        )}
        <button className={styles.gridBtn} type="button" onClick={onBackToGrid}>
          All levels
        </button>
      </div>
    </div>
  );
}
