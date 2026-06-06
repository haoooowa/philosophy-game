import { create } from 'zustand';
import type { PlayerProgress, GamePhase } from '../types';
import type { OwlMood } from '../components/Mascot/OwlMascot';

interface GameState {
  // Core progress
  progress: PlayerProgress;
  gamePhase: GamePhase;
  selectedLevel: number;
  selectedChapter: number;

  // Gamification
  hearts: number;
  maxHearts: number;
  xp: number;
  playerLevel: number;
  streak: number;
  lastPlayedDate: string | null;
  owlMood: OwlMood;
  owlMessage: string;
  soundEnabled: boolean;

  // Actions - Core
  initProgress: () => void;
  unlockLevel: (levelId: number) => void;
  completeLevel: (levelId: number, stars: number) => void;
  setGamePhase: (phase: GamePhase) => void;
  selectLevel: (levelId: number) => void;
  selectChapter: (chapterId: number) => void;
  resetProgress: () => void;
  isLevelUnlocked: (levelId: number) => boolean;
  isLevelCompleted: (levelId: number) => boolean;
  getStars: (levelId: number) => number;
  getTotalStars: () => number;
  getCompletedCount: () => number;

  // Actions - Gamification
  loseHeart: () => void;
  refillHearts: () => void;
  addXP: (amount: number) => void;
  getXPToNextLevel: () => number;
  setOwlMood: (mood: OwlMood, message?: string) => void;
  checkStreak: () => void;
  toggleSound: () => void;
}

const STORAGE_KEY = 'philosophy-game-progress';
const GAME_KEY = 'philosophy-game-state';

// XP per level: Lv N needs 50 + N*30 XP
function xpForLevel(n: number): number {
  return 50 + (n - 1) * 30;
}

function loadFullState() {
  const defaults = {
    hearts: 5,
    maxHearts: 5,
    xp: 0,
    playerLevel: 1,
    streak: 0,
    lastPlayedDate: null as string | null,
    soundEnabled: true,
  };
  try {
    const raw = localStorage.getItem(GAME_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaults, ...parsed };
    }
  } catch { /* ignore */ }
  return defaults;
}

function saveFullState(state: {
  hearts: number;
  xp: number;
  playerLevel: number;
  streak: number;
  lastPlayedDate: string | null;
  soundEnabled: boolean;
}) {
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

// Progress storage (separate for compatibility)
function loadProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        unlockedLevels: parsed.unlockedLevels ?? [1],
        completedLevels: parsed.completedLevels ?? {},
        currentLevel: parsed.currentLevel ?? 1,
      };
    }
  } catch { /* ignore */ }
  return { unlockedLevels: [1], completedLevels: {}, currentLevel: 1 };
}

function saveProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* ignore */ }
}

export const useGameStore = create<GameState>((set, get) => {
  const fullState = loadFullState();

  return {
    // Initial state
    progress: loadProgress(),
    gamePhase: 'grid' as GamePhase,
    selectedLevel: 1,
    selectedChapter: 1,
    hearts: fullState.hearts,
    maxHearts: fullState.maxHearts,
    xp: fullState.xp,
    playerLevel: fullState.playerLevel,
    streak: fullState.streak,
    lastPlayedDate: fullState.lastPlayedDate,
    owlMood: 'idle' as OwlMood,
    owlMessage: '',
    soundEnabled: fullState.soundEnabled,

    // ---- Core Actions ----
    initProgress: () => {
      const progress = loadProgress();
      const fs = loadFullState();
      set({
        progress,
        gamePhase: 'grid',
        selectedLevel: progress.currentLevel,
        hearts: fs.hearts,
        xp: fs.xp,
        playerLevel: fs.playerLevel,
        streak: fs.streak,
        lastPlayedDate: fs.lastPlayedDate,
        soundEnabled: fs.soundEnabled,
      });
      get().checkStreak();
    },

    unlockLevel: (levelId: number) => {
      const { progress } = get();
      if (!progress.unlockedLevels.includes(levelId)) {
        const newProgress = {
          ...progress,
          unlockedLevels: [...progress.unlockedLevels, levelId],
        };
        saveProgress(newProgress);
        set({ progress: newProgress });
      }
    },

    completeLevel: (levelId: number, stars: number) => {
      const { progress } = get();
      const existingStars = progress.completedLevels[levelId] ?? 0;
      const newStars = Math.max(existingStars, stars);
      const nextLevel = levelId < 81 ? levelId + 1 : null;

      const newProgress: PlayerProgress = {
        ...progress,
        completedLevels: { ...progress.completedLevels, [levelId]: newStars },
        currentLevel: nextLevel && !progress.unlockedLevels.includes(nextLevel)
          ? nextLevel : progress.currentLevel,
      };

      if (nextLevel && !progress.unlockedLevels.includes(nextLevel)) {
        newProgress.unlockedLevels = [...progress.unlockedLevels, nextLevel];
      }

      saveProgress(newProgress);
      set({ progress: newProgress });

      // XP rewards
      const xpGain = stars === 3 ? 25 : stars === 2 ? 15 : 5;
      get().addXP(xpGain);
      get().checkStreak();
    },

    setGamePhase: (phase: GamePhase) => set({ gamePhase: phase }),
    selectLevel: (levelId: number) => set({ selectedLevel: levelId }),
    selectChapter: (chapterId: number) => set({ selectedChapter: chapterId }),

    resetProgress: () => {
      const freshProgress: PlayerProgress = {
        unlockedLevels: [1],
        completedLevels: {},
        currentLevel: 1,
      };
      saveProgress(freshProgress);
      const fresh: typeof fullState = {
        hearts: 5, maxHearts: 5, xp: 0, playerLevel: 1,
        streak: 0, lastPlayedDate: null, soundEnabled: get().soundEnabled,
      };
      saveFullState(fresh);
      set({
        progress: freshProgress, gamePhase: 'grid', selectedLevel: 1,
        hearts: 5, xp: 0, playerLevel: 1, streak: 0, lastPlayedDate: null,
      });
    },

    isLevelUnlocked: (levelId: number) => get().progress.unlockedLevels.includes(levelId),
    isLevelCompleted: (levelId: number) => levelId in get().progress.completedLevels,
    getStars: (levelId: number) => get().progress.completedLevels[levelId] ?? 0,
    getTotalStars: () => Object.values(get().progress.completedLevels).reduce((a, b) => a + b, 0),
    getCompletedCount: () => Object.keys(get().progress.completedLevels).length,

    // ---- Gamification Actions ----
    loseHeart: () => {
      const { hearts } = get();
      if (hearts <= 0) return;
      const newHearts = hearts - 1;
      set({ hearts: newHearts });
      saveFullState({ ...loadFullState(), hearts: newHearts, xp: get().xp, playerLevel: get().playerLevel, streak: get().streak, lastPlayedDate: get().lastPlayedDate, soundEnabled: get().soundEnabled });
    },

    refillHearts: () => {
      const { maxHearts } = get();
      set({ hearts: maxHearts });
      const s = get();
      saveFullState({ hearts: maxHearts, xp: s.xp, playerLevel: s.playerLevel, streak: s.streak, lastPlayedDate: s.lastPlayedDate, soundEnabled: s.soundEnabled });
    },

    addXP: (amount: number) => {
      const { xp, playerLevel } = get();
      const newXP = xp + amount;
      const needed = xpForLevel(playerLevel);
      let newLevel = playerLevel;
      let remainingXP = newXP;

      while (remainingXP >= needed) {
        remainingXP -= needed;
        newLevel++;
      }

      set({ xp: remainingXP, playerLevel: newLevel });
      const s = get();
      saveFullState({ hearts: s.hearts, xp: remainingXP, playerLevel: newLevel, streak: s.streak, lastPlayedDate: s.lastPlayedDate, soundEnabled: s.soundEnabled });
    },

    getXPToNextLevel: () => xpForLevel(get().playerLevel),

    setOwlMood: (mood: OwlMood, message?: string) => {
      set({ owlMood: mood, owlMessage: message ?? '' });
    },

    checkStreak: () => {
      const today = new Date().toISOString().split('T')[0];
      const { lastPlayedDate, streak } = get();

      if (!lastPlayedDate) {
        set({ streak: 1, lastPlayedDate: today });
        const s = get();
        saveFullState({ hearts: s.hearts, xp: s.xp, playerLevel: s.playerLevel, streak: 1, lastPlayedDate: today, soundEnabled: s.soundEnabled });
        return;
      }

      if (lastPlayedDate === today) return; // already played today

      const lastDate = new Date(lastPlayedDate);
      const todayDate = new Date(today);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        const newStreak = streak + 1;
        set({ streak: newStreak, lastPlayedDate: today });
        const s = get();
        saveFullState({ hearts: s.hearts, xp: s.xp, playerLevel: s.playerLevel, streak: newStreak, lastPlayedDate: today, soundEnabled: s.soundEnabled });
      } else if (diffDays > 1) {
        // Streak broken
        set({ streak: 1, lastPlayedDate: today });
        const s = get();
        saveFullState({ hearts: s.hearts, xp: s.xp, playerLevel: s.playerLevel, streak: 1, lastPlayedDate: today, soundEnabled: s.soundEnabled });
      }
    },

    toggleSound: () => {
      const newVal = !get().soundEnabled;
      set({ soundEnabled: newVal });
      const s = get();
      saveFullState({ hearts: s.hearts, xp: s.xp, playerLevel: s.playerLevel, streak: s.streak, lastPlayedDate: s.lastPlayedDate, soundEnabled: newVal });
    },
  };
});
