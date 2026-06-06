import type { FallacyType } from '../../types';
import styles from './FallacySelector.module.css';

interface Props {
  fallacyPool: FallacyType[];
  selectedFallacy: string | null;
  onSelect: (key: string) => void;
  disabled?: boolean;
  correctFallacy?: string;
  showResult?: boolean;
}

export default function FallacySelector({
  fallacyPool,
  selectedFallacy,
  onSelect,
  disabled = false,
  correctFallacy,
  showResult = false,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {showResult ? 'Result' : 'Select the logical fallacy'}
      </h3>

      <div className={styles.grid}>
        {fallacyPool.map((f) => {
          let btnClass = styles.btn;
          const isSelected = selectedFallacy === f.key;
          const isCorrectAnswer = showResult && correctFallacy === f.key;

          if (showResult) {
            if (isCorrectAnswer) btnClass += ` ${styles.correct}`;
            if (isSelected && !isCorrectAnswer) btnClass += ` ${styles.wrong}`;
            if (!isSelected && !isCorrectAnswer) btnClass += ` ${styles.dimmed}`;
          } else if (isSelected) {
            btnClass += ` ${styles.selected}`;
          }

          return (
            <button
              key={f.key}
              className={btnClass}
              onClick={() => !disabled && onSelect(f.key)}
              disabled={disabled}
              type="button"
            >
              <span className={styles.icon}>{f.icon}</span>
              <span className={styles.name}>{f.name}</span>
              <span className={styles.desc}>{f.description}</span>
              {showResult && isCorrectAnswer && (
                <span className={styles.resultTag}>Correct</span>
              )}
              {showResult && isSelected && !isCorrectAnswer && (
                <span className={`${styles.resultTag} ${styles.resultTagWrong}`}>Your pick</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
