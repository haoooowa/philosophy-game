import styles from './XPDisplay.module.css';

interface Props {
  xp: number;
  level: number;
  xpToNext: number;
}

export default function XPDisplay({ xp, level, xpToNext }: Props) {
  const progress = Math.min((xp / xpToNext) * 100, 100);

  return (
    <div className={styles.wrapper}>
      <span className={styles.level}>Lv.{level}</span>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <span className={styles.xp}>{xp}/{xpToNext}</span>
    </div>
  );
}
