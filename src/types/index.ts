// 对话中的一句话
export interface DialogueLine {
  id: number;
  speaker: string;
  text: string;
}

// 关卡中存在的谬误实例
export interface FallacyInstance {
  lineIds: number[];
  fallacyType: string;
  explanation: string;
}

// 谬误类型定义
export interface FallacyType {
  key: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}

// 章节定义
export interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
  color: string;        // 主题色
  lightColor: string;   // 浅色背景
  difficulty: number;   // 1-5
  description: string;
}

// 关卡数据
export interface LevelData {
  id: number;
  chapter: number;
  title: string;
  scenario: string;
  dialogue: DialogueLine[];
  fallacies: FallacyInstance[];
  hint?: string;
  // 难度时期选择哪些谬误类型可选
  fallacyPool?: string[];
}

// 玩家进度
export interface PlayerProgress {
  unlockedLevels: number[];
  completedLevels: Record<number, number>; // levelId -> stars (1|2|3)
  currentLevel: number;                     // 1-81
}

// 游戏阶段
export type GamePhase = 'grid' | 'chapter-intro' | 'playing' | 'feedback';

// 关卡内阶段
export type LevelPhase = 'reading' | 'highlighting' | 'classifying' | 'feedback';

// 关卡结果
export interface LevelResult {
  levelId: number;
  highlightedIds: number[];
  selectedFallacy: string | null;
  highlightedCorrect: boolean;
  fallacyCorrect: boolean;
  stars: number;
}
