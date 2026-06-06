import type { LevelData } from '../types';

interface CheckResult {
  highlightedCorrect: boolean;
  fallacyCorrect: boolean;
  stars: number;
  // 正确的lineIds
  correctLineIds: number[];
  // 正确的谬误类型
  correctFallacyType: string;
}

/**
 * 校验玩家的答案
 * @param level 关卡数据
 * @param highlightedIds 玩家高亮的对话行id
 * @param selectedFallacy 玩家选择的谬误类型
 */
export function checkAnswer(
  level: LevelData,
  highlightedIds: number[],
  selectedFallacy: string | null,
): CheckResult {
  // 获取所有正确的lineIds（可能会跨多个fallacy实例）
  const allCorrectLineIds = new Set<number>();
  const correctFallacyTypes = new Set<string>();

  for (const f of level.fallacies) {
    for (const lid of f.lineIds) {
      allCorrectLineIds.add(lid);
    }
    correctFallacyTypes.add(f.fallacyType);
  }

  const correctLineIdsArr = Array.from(allCorrectLineIds).sort();
  const highlightedSorted = [...highlightedIds].sort();

  // 检查高亮是否完全正确
  const highlightedCorrect =
    correctLineIdsArr.length === highlightedSorted.length &&
    correctLineIdsArr.every((id, i) => id === highlightedSorted[i]);

  // 检查谬误类型是否正确（对于单谬误关卡，只需匹配一个）
  const fallacyCorrect =
    selectedFallacy !== null && correctFallacyTypes.has(selectedFallacy);

  // 计算星级
  let stars = 0;
  if (highlightedCorrect && fallacyCorrect) {
    stars = 3;
  } else if (highlightedCorrect || fallacyCorrect) {
    // 部分正确：高亮对但分类错，或分类对但高亮有遗漏
    stars = 1;
    // 如果高亮完全正确，但分类错误，给2星
    if (highlightedCorrect && !fallacyCorrect) {
      stars = 2;
    }
    // 如果分类正确，但高亮有遗漏（至少选对了一些），给2星
    if (fallacyCorrect && highlightedIds.some(id => allCorrectLineIds.has(id))) {
      stars = 2;
    }
  }

  return {
    highlightedCorrect,
    fallacyCorrect,
    stars,
    correctLineIds: correctLineIdsArr,
    correctFallacyType: level.fallacies[0]?.fallacyType ?? '',
  };
}

/**
 * 判断玩家的高亮是否至少命中了一个正确行
 */
export function hasPartialCorrectHighlight(
  level: LevelData,
  highlightedIds: number[],
): boolean {
  const allCorrectIds = new Set<number>();
  for (const f of level.fallacies) {
    for (const lid of f.lineIds) {
      allCorrectIds.add(lid);
    }
  }
  return highlightedIds.some(id => allCorrectIds.has(id));
}
