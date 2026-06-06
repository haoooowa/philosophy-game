import type { DialogueLine } from '../../types';
import styles from './DialogueDisplay.module.css';

interface Props {
  dialogue: DialogueLine[];
  highlightedIds: number[];
  correctIds?: number[];
  showResult?: boolean;
  onToggle: (id: number) => void;
  disabled?: boolean;
}

export default function DialogueDisplay({
  dialogue,
  highlightedIds,
  correctIds = [],
  showResult = false,
  onToggle,
  disabled = false,
}: Props) {
  return (
    <div className={styles.dialogue}>
      {dialogue.map((line) => {
        const isHighlighted = highlightedIds.includes(line.id);
        const isCorrect = correctIds.includes(line.id);
        const isWrongHighlight = showResult && isHighlighted && !isCorrect;
        const isMissedCorrect = showResult && !isHighlighted && isCorrect;

        let lineClass = styles.line;
        if (showResult) {
          if (isCorrect) lineClass += ` ${styles.correct}`;
          if (isWrongHighlight) lineClass += ` ${styles.wrongHighlight}`;
          if (isMissedCorrect) lineClass += ` ${styles.missed}`;
        } else if (isHighlighted) {
          lineClass += ` ${styles.highlighted}`;
        }

        return (
          <button
            key={line.id}
            className={lineClass}
            onClick={() => !disabled && onToggle(line.id)}
            disabled={disabled}
            type="button"
          >
            <span className={styles.speaker}>{line.speaker}</span>
            <span className={styles.text}>{line.text}</span>
            {showResult && isCorrect && (
              <span className={styles.badge}>Correct</span>
            )}
            {showResult && isWrongHighlight && (
              <span className={`${styles.badge} ${styles.badgeWrong}`}>No fallacy</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
