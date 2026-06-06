import type { ChapterInfo } from '../types';

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    title: '初识谬误',
    subtitle: '第1-9关',
    theme: '基础辨识',
    color: '#E07B5A',
    lightColor: '#FDF0EB',
    difficulty: 1,
    description: '欢迎来到逻辑谬误的世界！本章将介绍最常见、最易于辨识的逻辑谬误，对话简短直白，让你快速上手。',
  },
  {
    id: 2,
    title: '常见谬误',
    subtitle: '第10-18关',
    theme: '深入识别',
    color: '#D4915C',
    lightColor: '#FDF3EA',
    difficulty: 2,
    description: '稍微提升难度，对话变长，谬误仍然以单人单句为主，但需要从更多选项中做出正确判断。',
  },
  {
    id: 3,
    title: '因果之惑',
    subtitle: '第19-27关',
    theme: '因果关系',
    color: '#C79A5A',
    lightColor: '#FCF5EB',
    difficulty: 2,
    description: '因果关系是人类思维中最容易出错的环节。本章聚焦于各种因果相关的逻辑谬误，需要高亮1-2句话。',
  },
  {
    id: 4,
    title: '预设陷阱',
    subtitle: '第28-36关',
    theme: '隐性预设',
    color: '#BBA158',
    lightColor: '#FBF7ED',
    difficulty: 3,
    description: '最危险的谬误往往隐藏在看似合理的预设之中。本章对话更长，包含明显干扰句，需要细心分辨。',
  },
  {
    id: 5,
    title: '歧义迷宫',
    subtitle: '第37-45关',
    theme: '语言歧义',
    color: '#9EA560',
    lightColor: '#F6F8ED',
    difficulty: 3,
    description: '语言是一把双刃剑。本章的谬误深藏于词语的歧义和概念的滑动之间，非常隐蔽。',
  },
  {
    id: 6,
    title: '关联之谬',
    subtitle: '第46-54关',
    theme: '不当关联',
    color: '#78A868',
    lightColor: '#F0F6EE',
    difficulty: 3,
    description: '当论证者诉诸人身、权威、大众或情感而非逻辑时，关联谬误便悄然登场。本章对话更长，需排除干扰谬误。',
  },
  {
    id: 7,
    title: '转移之术',
    subtitle: '第55-63关',
    theme: '论证转移',
    color: '#5CAA72',
    lightColor: '#EEF6F1',
    difficulty: 4,
    description: '高水平的诡辩者善于转移论证焦点。本章每关可能包含1-2个交织的谬误，需要全部找出。',
  },
  {
    id: 8,
    title: '复合战场',
    subtitle: '第64-72关',
    theme: '多谬误复合',
    color: '#4A9E80',
    lightColor: '#ECF5F2',
    difficulty: 4,
    description: '真实世界中的辩论很少只包含一种谬误。本章的对话场景复杂，谬误层层交织，比以往更具挑战性。',
  },
  {
    id: 9,
    title: '终极试炼',
    subtitle: '第73-81关',
    theme: '综合挑战',
    color: '#3D8C8C',
    lightColor: '#EAF4F4',
    difficulty: 5,
    description: '最终的考验！本章综合了所有谬误类型，对话长达12-20句，谬误细微而隐蔽。只有真正的逻辑大师才能通关！',
  },
];

export function getChapterByLevel(levelId: number): ChapterInfo {
  const chapterId = Math.ceil(levelId / 9);
  return CHAPTERS[chapterId - 1];
}

export function getChapterById(chapterId: number): ChapterInfo {
  return CHAPTERS[chapterId - 1];
}
