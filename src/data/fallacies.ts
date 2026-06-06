import type { FallacyType } from '../types';

export const FALLACIES: Record<string, FallacyType> = {
  // ======= 关联谬误 =======
  ad_hominem: {
    key: 'ad_hominem',
    name: '人身攻击',
    category: '关联谬误',
    description: '不针对论点，而是攻击提出论点的人的特征、动机或处境',
    icon: 'AH',
  },
  appeal_authority: {
    key: 'appeal_authority',
    name: '诉诸权威',
    category: '关联谬误',
    description: '以某权威人士的观点来取代严谨的论证',
    icon: 'AA',
  },
  appeal_popularity: {
    key: 'appeal_popularity',
    name: '诉诸大众',
    category: '关联谬误',
    description: '以多数人相信或赞同为理由来证明一个观点的正确性',
    icon: 'AP',
  },
  appeal_emotion: {
    key: 'appeal_emotion',
    name: '诉诸情感',
    category: '关联谬误',
    description: '用情感操控代替理性论证，通过激发同情、恐惧等情绪来获取认同',
    icon: 'AE',
  },
  tu_quoque: {
    key: 'tu_quoque',
    name: '你也一样',
    category: '关联谬误',
    description: '通过指出对方言行不一或也有类似问题来回避对方的批评',
    icon: 'TQ',
  },
  appeal_tradition: {
    key: 'appeal_tradition',
    name: '诉诸传统',
    category: '关联谬误',
    description: '以某事物历史悠久或有传统为由，断定其正确或优越',
    icon: 'AT',
  },
  appeal_novelty: {
    key: 'appeal_novelty',
    name: '诉诸新奇',
    category: '关联谬误',
    description: '以某事物是新事物为由，断定其更好或更正确',
    icon: 'AN',
  },

  // ======= 预设谬误 =======
  begging_question: {
    key: 'begging_question',
    name: '循环论证',
    category: '预设谬误',
    description: '将结论隐含在前提中，用结论本身来证明结论',
    icon: 'BQ',
  },
  loaded_question: {
    key: 'loaded_question',
    name: '预设问题',
    category: '预设谬误',
    description: '在问题中嵌入未经证实的预设，使无论怎么回答都落入陷阱',
    icon: 'LQ',
  },
  false_dichotomy: {
    key: 'false_dichotomy',
    name: '虚假两难',
    category: '预设谬误',
    description: '将复杂问题简化为非此即彼的两个极端选项，忽略中间地带和其他可能',
    icon: 'FD',
  },
  slippery_slope: {
    key: 'slippery_slope',
    name: '滑坡谬误',
    category: '预设谬误',
    description: '声称某个小步骤必然引发一连串不可控的极端后果，但缺乏证据支持',
    icon: 'SS',
  },

  // ======= 因果谬误 =======
  post_hoc: {
    key: 'post_hoc',
    name: '事后归因',
    category: '因果谬误',
    description: '仅凭时间先后就断定因果关系（因为A发生在B之前，所以A导致B）',
    icon: 'PH',
  },
  false_cause: {
    key: 'false_cause',
    name: '错误归因',
    category: '因果谬误',
    description: '将相关性误认为因果关系，或将结果归因于错误的原因',
    icon: 'FC',
  },
  single_cause: {
    key: 'single_cause',
    name: '单因谬误',
    category: '因果谬误',
    description: '将复杂事件过度简化为单一原因，忽略多种因素的共同作用',
    icon: 'SC',
  },

  // ======= 归纳谬误 =======
  hasty_generalization: {
    key: 'hasty_generalization',
    name: '以偏概全',
    category: '归纳谬误',
    description: '基于不充分或非典型的样本，得出过于宽泛的普遍结论',
    icon: 'HG',
  },
  false_analogy: {
    key: 'false_analogy',
    name: '错误类比',
    category: '归纳谬误',
    description: '将两个在关键方面不同的事物进行类比，并据此得出相同结论',
    icon: 'FA',
  },
  straw_man: {
    key: 'straw_man',
    name: '稻草人谬误',
    category: '归纳谬误',
    description: '曲解或夸大对方的观点，然后攻击这个更容易攻击的虚假立场',
    icon: 'SM',
  },
  red_herring: {
    key: 'red_herring',
    name: '转移话题',
    category: '归纳谬误',
    description: '引入与论题无关的话题来转移注意力，回避对原论题的回应',
    icon: 'RH',
  },
  composition: {
    key: 'composition',
    name: '合成谬误',
    category: '归纳谬误',
    description: '错误地认为部分的性质必然适用于整体',
    icon: 'CP',
  },
  division: {
    key: 'division',
    name: '分割谬误',
    category: '归纳谬误',
    description: '错误地认为整体的性质必然适用于每个部分',
    icon: 'DV',
  },

  // ======= 歧义/其他谬误 =======
  equivocation: {
    key: 'equivocation',
    name: '偷换概念',
    category: '歧义谬误',
    description: '在论证过程中改变关键词的含义，用不同的定义混淆视听',
    icon: 'EQ',
  },
  amphiboly: {
    key: 'amphiboly',
    name: '模棱两可',
    category: '歧义谬误',
    description: '利用语法结构或表达的歧义性来制造误导性结论',
    icon: 'AB',
  },
  no_true_scotsman: {
    key: 'no_true_scotsman',
    name: '诉诸纯洁',
    category: '歧义谬误',
    description: '面对反例时，临时修改定义以排除反例，而非重新审视原主张',
    icon: 'NS',
  },
  genetic_fallacy: {
    key: 'genetic_fallacy',
    name: '起源谬误',
    category: '歧义谬误',
    description: '以某事物的来源、历史或起源来评判其当前的价值或正确性',
    icon: 'GF',
  },
  appeal_nature: {
    key: 'appeal_nature',
    name: '诉诸自然',
    category: '歧义谬误',
    description: '以某事物是否"自然"来判断其好坏，认为自然的就一定好，不自然的就一定坏',
    icon: 'NA',
  },
  middle_ground: {
    key: 'middle_ground',
    name: '中间立场',
    category: '歧义谬误',
    description: '认为两个极端观点的折中一定是正确的，无视证据仅凭位置来判断',
    icon: 'MG',
  },
  anecdotal: {
    key: 'anecdotal',
    name: '轶事证据',
    category: '歧义谬误',
    description: '以个人经历或孤立的个例作为证据来支持或反驳一个普遍性主张',
    icon: 'AD',
  },
};

// 按类别分组
export const FALLACY_CATEGORIES: Record<string, string[]> = {
  '关联谬误': ['ad_hominem', 'appeal_authority', 'appeal_popularity', 'appeal_emotion', 'tu_quoque', 'appeal_tradition', 'appeal_novelty'],
  '预设谬误': ['begging_question', 'loaded_question', 'false_dichotomy', 'slippery_slope'],
  '因果谬误': ['post_hoc', 'false_cause', 'single_cause'],
  '归纳谬误': ['hasty_generalization', 'false_analogy', 'straw_man', 'red_herring', 'composition', 'division'],
  '歧义谬误': ['equivocation', 'amphiboly', 'no_true_scotsman', 'genetic_fallacy', 'appeal_nature', 'middle_ground', 'anecdotal'],
};

// 获取谬误列表（按key）
export function getFallacyEntries(): [string, FallacyType][] {
  return Object.entries(FALLACIES);
}

// 从谬误池中获取谬误列表
export function getFallacyPool(keys: string[]): FallacyType[] {
  return keys.map(k => FALLACIES[k]).filter(Boolean);
}
