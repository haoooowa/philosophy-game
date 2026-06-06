import styles from './HeartsBar.module.css';

interface Props {
  maxHearts: number;
  currentHearts: number;
}

export default function HeartsBar({ maxHearts = 5, currentHearts }: Props) {
  return (
    <div className={styles.row}>
      {Array.from({ length: maxHearts }, (_, i) => (
        <svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className={`${styles.heart} ${i >= currentHearts ? styles.empty : styles.full}`}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={i < currentHearts ? 'var(--color-error)' : 'none'}
            stroke={i < currentHearts ? 'var(--color-error)' : 'var(--color-border)'}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}
