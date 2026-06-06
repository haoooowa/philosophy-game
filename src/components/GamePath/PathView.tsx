import { useMemo, useEffect, useRef } from 'react';
import { ALL_LEVELS } from '../../data/levels';
import { CHAPTERS } from '../../data/chapters';
import { useGameStore } from '../../store/gameStore';
import OwlMascot from '../Mascot/OwlMascot';
import HeartsBar from '../HeartsBar/HeartsBar';
import StreakBadge from '../StreakBadge/StreakBadge';
import styles from './PathView.module.css';

interface Props {
  onSelectLevel: (levelId: number) => void;
}

function buildSnake() {
  const rows: { levelId: number; chapterId: number; col: number; row: number }[] = [];
  for (let ch = 1; ch <= 9; ch++) {
    const levels = ALL_LEVELS.filter(l => l.chapter === ch);
    const reversed = ch % 2 === 0;
    const ordered = reversed ? [...levels].reverse() : levels;
    ordered.forEach((lv, i) => {
      rows.push({ levelId: lv.id, chapterId: ch, col: i, row: ch - 1 });
    });
  }
  return rows;
}

// Decorative cloud positions
const CLOUDS = [
  { top: '6%', left: '5%', scale: 0.7, delay: 0 },
  { top: '10%', left: '55%', scale: 1, delay: 2 },
  { top: '3%', left: '30%', scale: 0.5, delay: 4 },
  { top: '8%', left: '75%', scale: 0.8, delay: 1 },
  { top: '14%', left: '15%', scale: 0.6, delay: 3 },
];

// Star positions for night sky sparkle
const STARS = Array.from({ length: 12 }, (_, i) => ({
  top: `${2 + Math.random() * 18}%`,
  left: `${5 + i * 7.5}%`,
  delay: Math.random() * 3,
  size: 1 + Math.random() * 2,
}));

export default function PathView({ onSelectLevel }: Props) {
  const {
    isLevelUnlocked, isLevelCompleted, getStars,
    hearts, maxHearts, xp, playerLevel, getXPToNextLevel,
    streak, owlMood, owlMessage, setOwlMood,
  } = useGameStore();

  const nodes = useMemo(() => buildSnake(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  const currentLevelId = useMemo(() => {
    for (const lv of ALL_LEVELS) {
      if (isLevelUnlocked(lv.id) && !isLevelCompleted(lv.id)) return lv.id;
    }
    return 81;
  }, [isLevelUnlocked, isLevelCompleted]);

  useEffect(() => {
    if (currentRef.current && scrollRef.current) {
      const c = scrollRef.current;
      const el = currentRef.current;
      c.scrollTo({ top: el.offsetTop - c.clientHeight / 3, behavior: 'smooth' });
    }
  }, [currentLevelId]);

  const completedCount = ALL_LEVELS.filter(l => isLevelCompleted(l.id)).length;
  const totalStars = ALL_LEVELS.reduce((s, l) => s + getStars(l.id), 0);
  const xpPercent = Math.min((xp / getXPToNextLevel()) * 100, 100);

  const chapterStarts = new Set<number>();
  for (let ch = 1; ch <= 9; ch++) {
    const first = ALL_LEVELS.filter(l => l.chapter === ch).sort((a, b) => a.id - b.id)[0];
    if (first) chapterStarts.add(first.id);
  }

  return (
    <div className={styles.world}>
      {/* ====== SKY & ENVIRONMENT ====== */}
      <div className={styles.sky}>
        {/* Clouds */}
        {CLOUDS.map((c, i) => (
          <div key={i} className={styles.cloud} style={{ top: c.top, left: c.left, transform: `scale(${c.scale})`, animationDelay: `${c.delay}s` }}>
            <div className={styles.cloudPuff} />
            <div className={styles.cloudPuff2} />
            <div className={styles.cloudPuff3} />
          </div>
        ))}

        {/* Stars */}
        {STARS.map((s, i) => (
          <div key={i} className={styles.star} style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s`, width: `${s.size * 3}px`, height: `${s.size * 3}px` }} />
        ))}

        {/* Hills */}
        <div className={styles.hills}>
          <div className={styles.hill1} />
          <div className={styles.hill2} />
          <div className={styles.hill3} />
        </div>

        {/* Greek columns */}
        <div className={styles.columnLeft}>
          <div className={styles.columnBase} />
          <div className={styles.columnShaft} />
          <div className={styles.columnCapital} />
        </div>
        <div className={styles.columnRight}>
          <div className={styles.columnBase} />
          <div className={styles.columnShaft} />
          <div className={styles.columnCapital} />
        </div>
      </div>

      {/* ====== UI OVERLAY ====== */}
      {/* Top bar */}
      <div className={styles.topBar}>
        <StreakBadge days={streak} />
        <HeartsBar maxHearts={maxHearts} currentHearts={hearts} />
        <div className={styles.xpBadge}>
          <svg width="34" height="34" viewBox="0 0 34 34">
            <circle cx="17" cy="17" r="13" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3.5" />
            <circle cx="17" cy="17" r="13" fill="none" stroke="#FFD700" strokeWidth="3.5"
              strokeDasharray={`${xpPercent * 0.816} ${81.6 - xpPercent * 0.816}`}
              strokeLinecap="round" transform="rotate(-90 17 17)" />
          </svg>
          <span className={styles.xpNum}>{playerLevel}</span>
        </div>
      </div>

      {/* Marble pedestal + Owl */}
      <div className={styles.pedestalWrap}>
        <div className={styles.pedestal}>
          <div className={styles.pedestalTop} />
          <div className={styles.pedestalBody} />
          <div className={styles.pedestalBottom} />
        </div>
        <div className={styles.owlOnPedestal}>
          <OwlMascot mood={owlMood} size="lg" message={owlMessage || undefined} />
        </div>
      </div>

      {/* Progress */}
      <div className={styles.progressStrip}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${(completedCount / 81) * 100}%` }} />
        </div>
        <div className={styles.progressNums}>
          <span>{completedCount}<small>/81</small></span>
          <span>{totalStars}<small>/243</small></span>
        </div>
      </div>

      {/* Chapter tabs */}
      <div className={styles.chapterTabs}>
        {CHAPTERS.map(ch => {
          const chLevels = ALL_LEVELS.filter(l => l.chapter === ch.id);
          const chDone = chLevels.filter(l => isLevelCompleted(l.id)).length;
          const isActive = currentLevelId >= chLevels[0].id && currentLevelId <= chLevels[8].id;
          return (
            <button
              key={ch.id}
              className={`${styles.chapterTab} ${isActive ? styles.chapterTabActive : ''} ${chDone === 9 ? styles.chapterTabDone : ''}`}
              style={isActive ? { borderColor: ch.color } : undefined}
              type="button"
            >
              {ch.title}
            </button>
          );
        })}
      </div>

      {/* Path */}
      <div className={styles.pathScroll} ref={scrollRef}>
        <div className={styles.pathTrack}>
          {nodes.map((node) => {
            const level = ALL_LEVELS.find(l => l.id === node.levelId)!;
            const unlocked = isLevelUnlocked(node.levelId);
            const completed = isLevelCompleted(node.levelId);
            const stars = getStars(node.levelId);
            const isCurrent = node.levelId === currentLevelId;
            const isStart = chapterStarts.has(node.levelId);
            const chapter = CHAPTERS[node.chapterId - 1];

            const colOffset = (node.col - 4) * 56;
            const rowOffset = node.row * 220;

            const idx = ALL_LEVELS.findIndex(l => l.id === node.levelId);
            const curIdx = ALL_LEVELS.findIndex(l => l.id === currentLevelId);
            const dist = Math.abs(idx - curIdx);
            const inView = dist <= 7;

            return (
              <div
                key={node.levelId}
                className={`${styles.nodeWrap} ${inView ? styles.inView : styles.outView}`}
                style={{ transform: `translateX(${colOffset}px)`, top: `${rowOffset}px` }}
                ref={isCurrent ? currentRef : undefined}
              >
                {isStart && (
                  <div className={styles.banner}>
                    <span className={styles.bannerDot} style={{ background: chapter.color }} />
                    <span>{chapter.title}</span>
                  </div>
                )}

                <button
                  className={`
                    ${styles.node}
                    ${completed && stars === 3 ? styles.nodeGold : ''}
                    ${completed && stars < 3 ? styles.nodeDone : ''}
                    ${isCurrent ? styles.nodeNow : ''}
                    ${!unlocked ? styles.nodeLock : ''}
                  `}
                  onClick={() => {
                    if (!unlocked) return;
                    if (hearts <= 0) { setOwlMood('sad', 'No hearts!'); return; }
                    onSelectLevel(node.levelId);
                  }}
                  disabled={!unlocked}
                  type="button"
                >
                  <span className={styles.nodeFace}>
                    {completed ? (
                      <span className={styles.nodeStars}>{'*'.repeat(stars)}</span>
                    ) : isCurrent ? (
                      <span className={styles.nodeGo}>GO</span>
                    ) : (
                      <span className={styles.nodeId}>{node.levelId}</span>
                    )}
                  </span>
                  <span className={styles.nodeShine} />
                </button>

                <span className={styles.nodeLabel}>{level.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <button className={`${styles.tab} ${styles.tabOn}`} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
          Path
        </button>
        <button className={styles.tab} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="10" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="17" rx="1"/></svg>
          Stats
        </button>
      </div>
    </div>
  );
}
