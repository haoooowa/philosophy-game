import styles from './StreakBadge.module.css';

interface Props {
  days: number;
}

export default function StreakBadge({ days }: Props) {
  if (days === 0) return null;

  return (
    <div className={`${styles.badge} ${days > 0 ? styles.active : ''}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" className={styles.flame}>
        <path
          d="M12 2C9.5 8 5 10 5 15c0 3.87 3.13 7 7 7s7-3.13 7-7c0-5-3.5-7-7-13z"
          fill={days >= 7 ? '#E8581C' : days >= 3 ? '#F09040' : '#F5C070'}
        />
        <path
          d="M12 4c2 5 5 6.5 5 11 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-4.5 3-6 5-11z"
          fill={days >= 7 ? '#FF6B2B' : days >= 3 ? '#FFA040' : '#FFD080'}
        />
      </svg>
      <span className={styles.count}>{days}</span>
    </div>
  );
}
