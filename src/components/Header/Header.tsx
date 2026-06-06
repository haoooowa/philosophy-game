import { useGameStore } from '../../store/gameStore';
import styles from './Header.module.css';

export default function Header() {
  const { gamePhase, setGamePhase, selectChapter } = useGameStore();

  const handleBack = () => {
    setGamePhase('grid');
    selectChapter(1);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={handleBack}>
          <span className={styles.logoMark}>L</span>
          <span className={styles.logoText}>逻辑谬误</span>
        </button>

        <div className={styles.nav}>
          {gamePhase !== 'grid' && (
            <button className={styles.backBtn} onClick={handleBack}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 3L5 7l4 4" />
              </svg>
              关卡列表
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
