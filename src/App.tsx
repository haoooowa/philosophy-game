import { useCallback, useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import Header from './components/Header/Header';
import PathView from './components/GamePath/PathView';
import ChapterIntro from './components/ChapterIntro/ChapterIntro';
import LevelPlayer from './components/LevelPlayer/LevelPlayer';
import styles from './App.module.css';

export default function App() {
  const {
    gamePhase, selectedLevel, selectedChapter,
    setGamePhase, selectLevel, selectChapter,
    initProgress, setOwlMood,
  } = useGameStore();

  // Init progress and streak on mount
  useEffect(() => {
    initProgress();
  }, [initProgress]);

  const handleSelectChapter = useCallback((chapterId: number) => {
    selectChapter(chapterId);
    setGamePhase('chapter-intro');
  }, [selectChapter, setGamePhase]);

  const handleSelectLevel = useCallback((levelId: number) => {
    selectLevel(levelId);
    setGamePhase('playing');
    setOwlMood('idle', '');
  }, [selectLevel, setGamePhase, setOwlMood]);

  const handleBackToGrid = useCallback(() => {
    setGamePhase('grid');
    setOwlMood('idle', '');
  }, [setGamePhase, setOwlMood]);

  const handleNextLevel = useCallback(() => {
    const nextId = selectedLevel + 1;
    if (nextId <= 81) {
      selectLevel(nextId);
    }
  }, [selectedLevel, selectLevel]);

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        {gamePhase === 'grid' && (
          <PathView onSelectLevel={handleSelectLevel} />
        )}

        {gamePhase === 'chapter-intro' && (
          <ChapterIntro
            chapterId={selectedChapter}
            onStart={handleBackToGrid}
            onSelectLevel={handleSelectLevel}
          />
        )}

        {gamePhase === 'playing' && (
          <LevelPlayer
            key={selectedLevel}
            levelId={selectedLevel}
            onBack={handleBackToGrid}
            onNextLevel={handleNextLevel}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <p>Logic Fallacy Challenge</p>
      </footer>
    </div>
  );
}
