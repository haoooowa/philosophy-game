import type { LevelData } from '../types';

// ============================================================
// 第1章: 初识谬误 (Levels 1-9) — ⭐ 单人单句，对话2-4句
// ============================================================

const CHAPTER1: LevelData[] = [
  {
    id: 1,
    chapter: 1,
    title: '晚自习的争论',
    scenario: '大学自习室里，两位同学在讨论学习效率问题。',
    dialogue: [
      { id: 1, speaker: '小明', text: '我觉得戴耳机听音乐学习效率更高，能让我更专注。' },
      { id: 2, speaker: '小刚', text: '你一个挂过三门课的人，懂什么学习效率？先把自己成绩搞好再说吧。' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'ad_hominem', explanation: '小刚没有回应小明关于学习效率的观点，而是攻击小明挂科的经历。这就是典型的"人身攻击"谬误——不针对论点，而是攻击提出论点的人。' },
    ],
    fallacyPool: ['ad_hominem', 'straw_man', 'red_herring', 'appeal_popularity', 'false_dichotomy'],
  },
  {
    id: 2,
    chapter: 1,
    title: '老板的选择',
    scenario: '公司紧急会议上，经理在讨论一个即将到期的项目。',
    dialogue: [
      { id: 1, speaker: '经理', text: '要么我们全员加班赶这个项目，要么公司倒闭大家一起失业。你们选吧。' },
      { id: 2, speaker: '员工小陈', text: '但是我们可以考虑缩减功能、延期交付或者外包部分工作……' },
      { id: 3, speaker: '经理', text: '没时间讨论那些了！现在就决定：加班还是失业？' },
    ],
    fallacies: [
      { lineIds: [1, 3], fallacyType: 'false_dichotomy', explanation: '经理把复杂情况简化为只有两个极端选项（全员加班 vs 公司倒闭），完全忽略了其他可行方案。这就是"虚假两难"——将问题框定为非此即彼的选择题。' },
    ],
    fallacyPool: ['false_dichotomy', 'slippery_slope', 'post_hoc', 'appeal_authority', 'straw_man'],
  },
  {
    id: 3,
    chapter: 1,
    title: '买手机',
    scenario: '手机店里，一位顾客在和朋友讨论选购哪款手机。',
    dialogue: [
      { id: 1, speaker: '小刘', text: '你看这款新手机，销量突破1000万台了，肯定是目前市面上最好的手机！' },
      { id: 2, speaker: '小王', text: '销量好不一定代表产品好吧？还是得看看具体配置和评测。' },
      { id: 3, speaker: '小刘', text: '这么多人买怎么可能不好？群众的眼睛是雪亮的！' },
    ],
    fallacies: [
      { lineIds: [1, 3], fallacyType: 'appeal_popularity', explanation: '小刘以"销量高"和"很多人买"为理由来证明手机好。这就是"诉诸大众"谬误——受欢迎或流行不等于正确或优秀。' },
    ],
    fallacyPool: ['appeal_popularity', 'appeal_authority', 'hasty_generalization', 'false_analogy', 'ad_hominem'],
  },
  {
    id: 4,
    chapter: 1,
    title: '考研建议',
    scenario: '宿舍里，学长在给学弟提毕业建议。',
    dialogue: [
      { id: 1, speaker: '学长', text: '你一定要考研。你看我们学校那个张教授，他就是本硕博连读出来的，现在多成功。' },
      { id: 2, speaker: '学弟', text: '可是我的专业实践性很强，早点工作可能更适合我……' },
      { id: 3, speaker: '学长', text: '张教授就是最好的例子！学历高才有前途，一个人成功就够说明问题了。' },
    ],
    fallacies: [
      { lineIds: [1, 3], fallacyType: 'hasty_generalization', explanation: '学长仅凭张教授一个例子就得出"学历高才有前途"的普遍结论。这就是"以偏概全"——基于不充分的样本做出过于宽泛的概括。' },
    ],
    fallacyPool: ['hasty_generalization', 'appeal_authority', 'anecdotal', 'false_cause', 'ad_hominem'],
  },
  {
    id: 5,
    chapter: 1,
    title: '食堂争论',
    scenario: '食堂里，两位同学在讨论饮食选择。',
    dialogue: [
      { id: 1, speaker: '阿杰', text: '我最近开始吃素了，觉得对身体好，而且也更环保。' },
      { id: 2, speaker: '大刘', text: '吃素？你觉得杀动物残忍是吧？那你吃蔬菜的时候，蔬菜就不是生命吗？植物也有感觉你知道吗？' },
      { id: 3, speaker: '阿杰', text: '我没说杀动物残忍啊，我只是说吃素对身体好……' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'straw_man', explanation: '阿杰说的是"吃素对身体好和环保"，大刘却把阿杰的立场歪曲为"杀动物残忍"并攻击这个虚构的立场。这就是"稻草人谬误"——曲解对方的观点使其更容易被攻击。' },
    ],
    fallacyPool: ['straw_man', 'ad_hominem', 'red_herring', 'tu_quoque', 'false_dichotomy'],
  },
  {
    id: 6,
    chapter: 1,
    title: '家长会',
    scenario: '家长会上，老师和家长在讨论学生成绩下降的问题。',
    dialogue: [
      { id: 1, speaker: '家长', text: '孩子最近成绩下降得厉害，我怀疑是打游戏太多了。' },
      { id: 2, speaker: '老师', text: '这还用怀疑？自从学校电竞社成立以来，这届学生的年级平均分就一直在降。电竞社就是罪魁祸首。' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'post_hoc', explanation: '老师仅凭时间先后（电竞社成立在前，成绩下降在后）就断定因果关系。这就是"事后归因"谬误——发生在前面的事情不一定就是原因，可能只是巧合或有其他因素。' },
    ],
    fallacyPool: ['post_hoc', 'false_cause', 'single_cause', 'hasty_generalization', 'slippery_slope'],
  },
  {
    id: 7,
    chapter: 1,
    title: '垃圾分类',
    scenario: '社区业主大会上，大家在讨论推行垃圾分类。',
    dialogue: [
      { id: 1, speaker: '社区委员', text: '为了更好地保护环境，我们小区应该严格执行垃圾分类。' },
      { id: 2, speaker: '业主老赵', text: '如果今天执行垃圾分类，明天是不是就要规定每家每户几点吃饭？后天连上厕所都要打报告？这跟极权社会有什么区别？' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'slippery_slope', explanation: '老赵从一个合理的政策出发，未经任何证据就推导出一连串极端后果。这就是"滑坡谬误"——声称一小步必然引发不可控的连锁反应，但没有任何证据支持这种必然性。' },
    ],
    fallacyPool: ['slippery_slope', 'false_dichotomy', 'false_analogy', 'red_herring', 'straw_man'],
  },
  {
    id: 8,
    chapter: 1,
    title: '中医讨论',
    scenario: '学术论坛上，两位学者在讨论中医的科学性问题。',
    dialogue: [
      { id: 1, speaker: '学者A', text: '中医有几千年的历史了，这说明它是有效的医学体系。' },
      { id: 2, speaker: '学者B', text: '历史悠久不等于有效。古代欧洲的放血疗法也有上千年历史，现在已经被证明有害。' },
      { id: 3, speaker: '学者A', text: '那不一样！中医是中华民族的瑰宝，你对中医的质疑就是文化不自信！' },
    ],
    fallacies: [
      { lineIds: [1], fallacyType: 'appeal_tradition', explanation: '学者A以"中医有几千年历史"作为有效性的证据。这就是"诉诸传统"——历史悠久不等于正确，很多古老的实践已被科学证伪。' },
    ],
    fallacyPool: ['appeal_tradition', 'appeal_popularity', 'appeal_emotion', 'ad_hominem', 'genetic_fallacy'],
  },
  {
    id: 9,
    chapter: 1,
    title: '买保险',
    scenario: '保险销售正在向客户推销一款重疾险产品。',
    dialogue: [
      { id: 1, speaker: '销售', text: '这款重疾险特别好，隔壁王阿姨买了，她表姐的邻居也买了，大家都说好。' },
      { id: 2, speaker: '客户', text: '保障范围具体有哪些？保费怎么算？' },
      { id: 3, speaker: '销售', text: '哎呀你放心，这么多人买肯定不会错的。而且你现在不买，万一以后生病了怎么办？你敢保证自己永远健康吗？' },
    ],
    fallacies: [
      { lineIds: [3], fallacyType: 'loaded_question', explanation: '销售人员说"你敢保证自己永远健康吗"是一个"预设问题"——它将"不买保险"等同于"保证永远健康"，在问题中嵌入了虚假的预设，让客户无论怎么回答都像是在承认自己的风险。' },
    ],
    fallacyPool: ['loaded_question', 'begging_question', 'appeal_popularity', 'appeal_emotion', 'false_dichotomy'],
  },
];

// ============================================================
// 第2章: 常见谬误 (Levels 10-18) — ⭐⭐ 对话4-6句，8选1
// ============================================================

const CHAPTER2: LevelData[] = [
  {
    id: 10,
    chapter: 2,
    title: '竞聘面试',
    scenario: '公司内部竞聘面试中，面试官正在评估一位候选人。',
    dialogue: [
      { id: 1, speaker: '面试官', text: '说说你为什么适合这个管理岗位？' },
      { id: 2, speaker: '应聘者', text: '我有十年工作经验，带过三个团队，每次都能完成KPI。' },
      { id: 3, speaker: '面试官', text: '但是我听说你之前带的团队离职率很高，这很让人担忧。' },
      { id: 4, speaker: '应聘者', text: '那是因为现在的年轻人吃不了苦！我当年刚工作的时候，加班到凌晨是常事。他们就是太娇气了，动不动就辞职。' },
    ],
    fallacies: [
      { lineIds: [4], fallacyType: 'red_herring', explanation: '当被问及团队离职率高的问题时，应聘者不直接回应，而是将话题转移到"年轻人吃不了苦"和"自己当年如何努力"。这就是"转移话题（红鲱鱼）"——引入无关话题回避核心问题。' },
    ],
    fallacyPool: ['red_herring', 'ad_hominem', 'straw_man', 'hasty_generalization', 'tu_quoque', 'appeal_tradition', 'false_cause', 'anecdotal'],
  },
  {
    id: 11,
    chapter: 2,
    title: 'AI与就业',
    scenario: '科技论坛上，两人在激烈讨论AI对就业市场的影响。',
    dialogue: [
      { id: 1, speaker: '网友A', text: 'AI和机器人会大规模取代人类的工作，我们应该提前做好准备。' },
      { id: 2, speaker: '网友B', text: '历史上每次技术革命都会取代一些工作，但同时也会创造新的就业机会。纺织机取代了手工纺织工人，但催生了整个现代服装产业。' },
      { id: 3, speaker: '网友A', text: '但AI和纺织机本质上不一样，AI替代的是认知劳动而非体力劳动。' },
      { id: 4, speaker: '网友B', text: '本质是相同的，都是技术替代人力。既然纺织机最终创造了更多就业，AI也一定会这样。' },
    ],
    fallacies: [
      { lineIds: [4], fallacyType: 'false_analogy', explanation: '网友B将AI革命简单类比为纺织机革命，但两者在替代范围、速度和性质上有本质区别。忽略这些关键差异而强行得出一致结论，属于"错误类比"。' },
    ],
    fallacyPool: ['false_analogy', 'hasty_generalization', 'post_hoc', 'slippery_slope', 'composition', 'single_cause', 'appeal_tradition', 'false_dichotomy'],
  },
  {
    id: 12,
    chapter: 2,
    title: '什么是幸福',
    scenario: '哲学课上，老师和学生们在讨论"幸福"的定义。',
    dialogue: [
      { id: 1, speaker: '老师', text: '同学们，我们来讨论一下：什么是幸福？' },
      { id: 2, speaker: '学生A', text: '幸福就是做让自己感到快乐的事情。' },
      { id: 3, speaker: '学生B', text: '那吸毒的人吸毒时也很快乐，吸毒是幸福吗？' },
      { id: 4, speaker: '学生A', text: '我说的幸福是真正的幸福，不是那种虚假的快乐。吸毒带来的只是快感，根本不是幸福。' },
    ],
    fallacies: [
      { lineIds: [4], fallacyType: 'no_true_scotsman', explanation: '学生A在面对吸毒这个反例时，通过临时加入"真正的"这一限定词来排除反例，而不是反思自己最初的定义是否准确。这就是"诉诸纯洁"——遇到反例时修改定义来保护自己的主张。' },
    ],
    fallacyPool: ['no_true_scotsman', 'equivocation', 'begging_question', 'red_herring', 'loaded_question', 'straw_man', 'appeal_emotion', 'genetic_fallacy'],
  },
  {
    id: 13,
    chapter: 2,
    title: '要不要养狗',
    scenario: '家庭晚餐时，一家人讨论是否要养一只宠物狗。',
    dialogue: [
      { id: 1, speaker: '妈妈', text: '我不同意养狗。养狗的人家里都乱糟糟的，你看看你表姐家。' },
      { id: 2, speaker: '爸爸', text: '也不一定，我们可以训练狗狗，保持家里整洁。' },
      { id: 3, speaker: '妈妈', text: '算了吧，你看你妹妹家——养狗之后不久就离婚了！养狗破坏家庭关系。' },
      { id: 4, speaker: '女儿', text: '妈，这两件事有什么关系啊……' },
    ],
    fallacies: [
      { lineIds: [3], fallacyType: 'post_hoc', explanation: '妈妈把妹妹养狗和离婚这两件先后发生的事情直接关联为因果关系。这就是"事后归因"——仅仅因为一件事发生在另一件事之前，就错误地认定为前者导致了后者。' },
    ],
    fallacyPool: ['post_hoc', 'false_cause', 'single_cause', 'hasty_generalization', 'slippery_slope', 'false_analogy', 'straw_man', 'anecdotal'],
  },
  {
    id: 14,
    chapter: 2,
    title: '学外语的争论',
    scenario: '教育论坛上，两位家长在争论孩子是否应该从小学习外语。',
    dialogue: [
      { id: 1, speaker: 'A家长', text: '我认为孩子应该从小学习一门外语，这有助于认知发展和未来的竞争力。' },
      { id: 2, speaker: 'B家长', text: '我坚决不同意。你有没有想过，强迫所有孩子学外语会扼杀他们对母语的兴趣？而且你这种观点说到底是崇洋媚外，觉得外国的东西就是比中国的好。' },
      { id: 3, speaker: 'A家长', text: '我只是说学外语有益处，没说不学母语，也没有崇洋媚外的意思……' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'straw_man', explanation: 'B家长将A的观点曲解为"强迫孩子学外语→扼杀母语兴趣"并攻击这个虚构的立场，同时还用"崇洋媚外"进行人身攻击。这就是"稻草人谬误"——先把对方的观点极端化再攻击。' },
    ],
    fallacyPool: ['straw_man', 'ad_hominem', 'red_herring', 'false_dichotomy', 'slippery_slope', 'tu_quoque', 'equivocation', 'genetic_fallacy'],
  },
  {
    id: 15,
    chapter: 2,
    title: '手机辐射',
    scenario: '办公室里，同事们在午休时聊起了手机辐射的话题。',
    dialogue: [
      { id: 1, speaker: '小王', text: '我看到研究说手机辐射可能对身体有一定影响，建议睡觉时把手机放远一点。' },
      { id: 2, speaker: '老李', text: '我用了二十年手机，天天放枕头下面，不也活得好好的？什么辐射有害都是瞎扯！' },
      { id: 3, speaker: '小王', text: '但是世界卫生组织的报告也提到需要警惕长期影响……' },
      { id: 4, speaker: '老李', text: '我不看什么报告。科学理论不还是科学家说了算？今天说咖啡有害明天说有益，都是骗经费的。' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'anecdotal', explanation: '老李用自己个人经历（"我二十年没事"）来否定系统性的科学研究。这就是"轶事证据"谬误——以个人经历或孤立案例来反驳基于大量数据得出的普遍结论。' },
    ],
    fallacyPool: ['anecdotal', 'ad_hominem', 'appeal_authority', 'hasty_generalization', 'red_herring', 'false_cause', 'tu_quoque', 'appeal_emotion'],
  },
  {
    id: 16,
    chapter: 2,
    title: '气候讨论',
    scenario: '环保宣传活动上，一位环保人士和一位路人在争论。',
    dialogue: [
      { id: 1, speaker: '环保者', text: '科学界97%的共识认为人类活动导致了全球变暖，我们应该立即采取行动。' },
      { id: 2, speaker: '路人', text: '以前科学家不也一致认为地球是平的、太阳绕地球转吗？多数人的意见不等于真理！' },
      { id: 3, speaker: '环保者', text: '但那是在现代科学方法建立之前……现在的科学是基于大量数据和同行评议的。' },
      { id: 4, speaker: '路人', text: '我不否认气候在变暖，但你怎么证明一定是人类造成的？自然本身也有周期变化啊。' },
    ],
    fallacies: [
      { lineIds: [2], fallacyType: 'false_analogy', explanation: '路人把"古代基于有限观察的粗糙宇宙观"与"现代基于大量数据和严谨同行评议的科学共识"做类比，忽略了两者在方法论上的本质区别。这是"错误类比"。' },
    ],
    fallacyPool: ['false_analogy', 'hasty_generalization', 'appeal_authority', 'red_herring', 'middle_ground', 'genetic_fallacy', 'equivocation', 'single_cause'],
  },
  {
    id: 17,
    chapter: 2,
    title: '素肉之争',
    scenario: '朋友聚餐时，素食者和非素食者之间发生了一场争论。',
    dialogue: [
      { id: 1, speaker: '小美', text: '你为什么吃素呀？' },
      { id: 2, speaker: '阿琳', text: '因为我觉得工业化养殖太残忍了，动物在养殖场里遭受了巨大的痛苦。' },
      { id: 3, speaker: '小美', text: '你说残忍？那你知不知道你吃的蔬菜水果也是用农药杀死无数昆虫才种出来的？你吃的每一口饭都有小动物因农业机械化而死。难道只有牛羊值得同情，昆虫就不值得吗？你不也一样残忍吗？' },
    ],
    fallacies: [
      { lineIds: [3], fallacyType: 'tu_quoque', explanation: '小美没有回应阿琳关于工业化养殖残忍的论点，而是通过指出阿琳在其他方面可能存在的矛盾（吃蔬菜也间接伤害动物）来否定她的立场。这就是"你也一样"谬误——指出对方的虚伪不等于驳斥了对方的论点。' },
    ],
    fallacyPool: ['tu_quoque', 'ad_hominem', 'straw_man', 'red_herring', 'whataboutism', 'false_analogy', 'appeal_emotion', 'equivocation'],
  },
  {
    id: 18,
    chapter: 2,
    title: '天才儿童',
    scenario: '两个妈妈在幼儿园门口聊天，话题转到各自的孩子。',
    dialogue: [
      { id: 1, speaker: '张妈', text: '我家小明三岁就能背唐诗三百首了，绝对是天才儿童！' },
      { id: 2, speaker: '李妈', text: '每个孩子发展速度不同，三岁背诗不一定就能说明是天才吧……' },
      { id: 3, speaker: '张妈', text: '你这就是嫉妒！你家孩子不会背就说我家孩子不是天才？天才儿童的定义就是三岁能背唐诗三百首的儿童，我家小明就是证明。' },
    ],
    fallacies: [
      { lineIds: [3], fallacyType: 'begging_question', explanation: '张妈将"天才儿童"直接定义为"三岁能背唐诗三百首的儿童"，然后用这个定义来证明小明是天才。这就是"循环论证"——把需要证明的结论当成了已经成立的前提。' },
    ],
    fallacyPool: ['begging_question', 'equivocation', 'ad_hominem', 'hasty_generalization', 'no_true_scotsman', 'straw_man', 'appeal_emotion', 'loaded_question'],
  },
];

// ============================================================
// 第3章: 因果之惑 (Levels 19-27) — ⭐⭐ 单谬误，高亮1-2句
// ============================================================

const CHAPTER3: LevelData[] = [
  {
    id: 19,
    chapter: 3,
    title: '自由意志',
    scenario: '哲学读书会上，大家在讨论自由意志是否存在。',
    dialogue: [
      { id: 1, speaker: '书友A', text: '我认为人没有自由意志。每一个决定都是大脑神经元活动的必然结果，而神经元活动遵循物理定律。' },
      { id: 2, speaker: '书友B', text: '如果人没有自由意志，那你现在跟我辩论不也是被决定的吗？被物理定律决定的论证又有什么说服力呢？' },
      { id: 3, speaker: '书友A', text: '论证的正确性取决于逻辑和证据，不取决于论证者是否有自由意志。' },
      { id: 4, speaker: '书友B', text: '但你自己刚才说了，你的论证只是神经元物理活动的结果。物理活动没有真值判断能力，所以你的论证也不值得信。' },
    ],
    fallacies: [
      { lineIds: [4], fallacyType: 'genetic_fallacy', explanation: '书友B试图通过质疑A的论证"来源"（被决定的神经元活动）来否定论证本身的有效性。但论证正确性和论证者的意志状态是两回事。这就是"起源谬误"——以事物的来源来评判其价值。' },
    ],
    fallacyPool: ['genetic_fallacy', 'ad_hominem', 'begging_question', 'equivocation', 'red_herring', 'false_dichotomy', 'straw_man', 'composition'],
  },
  {
    id: 20,
    chapter: 3,
    title: '裁员风波',
    scenario: '公司HR部门会议上，HR总监提出了一个新的绩效考核方案。',
    dialogue: [
      { id: 1, speaker: 'HR总监', text: '我提议引入末位淘汰制，表现最差的5%员工被辞退。这是提高效率的唯一办法。' },
      { id: 2, speaker: '部门经理', text: '但不同岗位的工作性质完全不同，根本无法放在一起量化排名啊。' },
      { id: 3, speaker: 'HR总监', text: '很简单，每个经理给自己的人打分排名，末5%走人，就这么定了。' },
      { id: 4, speaker: '部门经理', text: '这会导致经理们为了凑够5%而冤枉好员工，难道没有更好的方案吗？' },
      { id: 5, speaker: 'HR总监', text: '你既然拿不出更好的方案，那就说明我的方案是最好的。要么用我的方案，要么就继续让混日子的人永远混下去——你自己选。' },
    ],
    fallacies: [
      { lineIds: [5], fallacyType: 'false_dichotomy', explanation: 'HR总监制造了虚假的两难选择：要么支持他的方案，要么就是"让混日子的人永远混下去"。他还将举证责任转移给反对者（"拿不出更好的方案就说明我的对"），犯了"虚假两难"谬误。' },
    ],
    fallacyPool: ['false_dichotomy', 'false_cause', 'single_cause', 'loaded_question', 'slippery_slope', 'straw_man', 'begging_question', 'ad_hominem'],
  },
];

// ============================================================
// 组装全部81关
// ============================================================

// 为第3章补充第21-27关
const CHAPTER3_EXTRA: LevelData[] = Array.from({ length: 7 }, (_, i) => ({
  id: 21 + i,
  chapter: 3,
  title: `第${21 + i}关`,
  scenario: '（待设计）',
  dialogue: [
    { id: 1, speaker: '角色A', text: '（对话内容待补充）' },
    { id: 2, speaker: '角色B', text: '（对话内容待补充）' },
  ],
  fallacies: [
    { lineIds: [1], fallacyType: 'post_hoc', explanation: '（解释待补充）' },
  ],
  fallacyPool: ['post_hoc', 'false_cause', 'single_cause', 'hasty_generalization', 'slippery_slope', 'false_analogy', 'false_dichotomy', 'red_herring'],
}));

// 第4-9章占位关卡
function createPlaceholderChapter(chapter: number, fallacyTypes: string[]): LevelData[] {
  return Array.from({ length: 9 }, (_, i) => ({
    id: (chapter - 1) * 9 + 1 + i,
    chapter,
    title: `第${(chapter - 1) * 9 + 1 + i}关`,
    scenario: '（待设计）',
    dialogue: [
      { id: 1, speaker: '角色A', text: '（对话内容待补充）' },
      { id: 2, speaker: '角色B', text: '（对话内容待补充）' },
    ],
    fallacies: [
      { lineIds: [1], fallacyType: fallacyTypes[i % fallacyTypes.length], explanation: '（解释待补充）' },
    ],
    fallacyPool: fallacyTypes,
  }));
}

const CHAPTER4 = createPlaceholderChapter(4, ['begging_question', 'loaded_question', 'false_dichotomy', 'slippery_slope', 'no_true_scotsman', 'equivocation', 'appeal_nature', 'middle_ground', 'anecdotal']);
const CHAPTER5 = createPlaceholderChapter(5, ['equivocation', 'amphiboly', 'no_true_scotsman', 'genetic_fallacy', 'appeal_nature', 'middle_ground', 'anecdotal', 'begging_question', 'slippery_slope']);
const CHAPTER6 = createPlaceholderChapter(6, ['ad_hominem', 'appeal_authority', 'appeal_popularity', 'appeal_emotion', 'tu_quoque', 'appeal_tradition', 'appeal_novelty', 'straw_man', 'red_herring']);
const CHAPTER7 = createPlaceholderChapter(7, ['red_herring', 'straw_man', 'tu_quoque', 'ad_hominem', 'equivocation', 'false_dichotomy', 'begging_question', 'loaded_question', 'genetic_fallacy']);
const CHAPTER8 = createPlaceholderChapter(8, ['false_dichotomy', 'straw_man', 'ad_hominem', 'slippery_slope', 'begging_question', 'equivocation', 'red_herring', 'post_hoc', 'false_analogy']);
const CHAPTER9 = createPlaceholderChapter(9, ['equivocation', 'genetic_fallacy', 'begging_question', 'straw_man', 'false_analogy', 'red_herring', 'slippery_slope', 'false_dichotomy', 'ad_hominem']);

export const ALL_LEVELS: LevelData[] = [
  ...CHAPTER1,
  ...CHAPTER2,
  ...CHAPTER3,
  ...CHAPTER3_EXTRA,
  ...CHAPTER4,
  ...CHAPTER5,
  ...CHAPTER6,
  ...CHAPTER7,
  ...CHAPTER8,
  ...CHAPTER9,
];

// 确保恰好81关
if (ALL_LEVELS.length !== 81) {
  console.error(`关卡数量错误: 期望81关, 实际${ALL_LEVELS.length}关`);
}

export function getLevelById(id: number): LevelData | undefined {
  return ALL_LEVELS.find(l => l.id === id);
}

export function getLevelsByChapter(chapter: number): LevelData[] {
  return ALL_LEVELS.filter(l => l.chapter === chapter);
}
