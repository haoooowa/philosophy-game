import { useState, useCallback, useMemo, useEffect } from 'react';
import type { LevelPhase } from '../../types';
import { getLevelById } from '../../data/levels';
import { getFallacyPool } from '../../data/fallacies';
import { checkAnswer } from '../../utils/checkAnswer';
import { useGameStore } from '../../store/gameStore';
import DialogueDisplay from '../DialogueDisplay/DialogueDisplay';
import FallacySelector from '../FallacySelector/FallacySelector';
import FeedbackPanel from '../FeedbackPanel/FeedbackPanel';
import OwlMascot from '../Mascot/OwlMascot';
import HeartsBar from '../HeartsBar/HeartsBar';
import Confetti from '../Celebration/Confetti';
import { getChapterByLevel } from '../../data/chapters';
import { playCorrectSound, playWrongSound, playClickSound, playLevelUpSound, playHeartLossSound } from '../../utils/sound';
import styles from './LevelPlayer.module.css';

interface Props {
  levelId: number;
  onBack: () => void;
  onNextLevel: () => void;
}

const ALL_FALLACY_KEYS = [
  'ad_hominem', 'appeal_authority', 'appeal_popularity', 'appeal_emotion',
  'tu_quoque', 'appeal_tradition', 'begging_question', 'loaded_question',
  'false_dichotomy', 'slippery_slope', 'post_hoc', 'false_cause',
  'single_cause', 'hasty_generalization', 'false_analogy', 'straw_man',
  'red_herring', 'composition', 'division', 'equivocation', 'amphiboly',
  'no_true_scotsman', 'genetic_fallacy', 'appeal_nature', 'middle_ground', 'anecdotal',
];

export default function LevelPlayer({ levelId, onBack, onNextLevel }: Props) {
  const level = useMemo(() => getLevelById(levelId), [levelId]);
  const chapter = useMemo(() => (level ? getChapterByLevel(level.id) : null), [level]);
  const {
    completeLevel, unlockLevel, hearts, maxHearts,
    loseHeart, soundEnabled,
    owlMood, owlMessage, setOwlMood,
  } = useGameStore();

  const [phase, setPhase] = useState<LevelPhase>('reading');
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  const [selectedFallacy, setSelectedFallacy] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof checkAnswer> | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fallacyPool = useMemo(() => {
    if (!level) return [];
    if (level.fallacyPool) return getFallacyPool(level.fallacyPool);
    return getFallacyPool(ALL_FALLACY_KEYS);
  }, [level]);

  // Owl greeting on mount
  useEffect(() => {
    const msgs = ['Ready to spot fallacies?', 'Let us reason together.', 'Think carefully!', 'What fallacy hides here?'];
    setOwlMood('idle', msgs[Math.floor(Math.random() * msgs.length)]);
  }, [levelId, setOwlMood]);

  const handleToggleHighlight = useCallback((id: number) => {
    if (soundEnabled) playClickSound();
    setHighlightedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    if (highlightedIds.length === 0) {
      setOwlMood('thinking', 'Hmm, which line contains the fallacy?');
    }
  }, [highlightedIds.length, soundEnabled, setOwlMood]);

  const handleConfirmHighlight = () => {
    if (highlightedIds.length === 0) return;
    if (soundEnabled) playClickSound();
    setOwlMood('thinking', 'Now, what type of fallacy is it?');
    setPhase('classifying');
  };

  const handleSubmitClassification = () => {
    if (!level || !selectedFallacy || submitted) return;
    setSubmitted(true);

    const checkResult = checkAnswer(level, highlightedIds, selectedFallacy);
    setResult(checkResult);
    setPhase('feedback');

    // Sound
    if (soundEnabled) {
      if (checkResult.stars === 3) playLevelUpSound();
      else if (checkResult.stars >= 1) playCorrectSound();
      else playWrongSound();
    }

    // Owl reaction
    if (checkResult.stars === 3) {
      setOwlMood('excited', 'Perfect analysis! You are a logic master!');
      setShowConfetti(true);
    } else if (checkResult.stars === 2) {
      setOwlMood('happy', 'Almost there! Check the explanation.');
    } else if (checkResult.stars === 1) {
      setOwlMood('encourage', 'Good effort! Review and try again.');
    } else {
      setOwlMood('sad', 'Not quite. Let us learn from this.');
      if (soundEnabled) playHeartLossSound();
      loseHeart();
    }

    // Save progress
    completeLevel(levelId, checkResult.stars);
    if (levelId < 81) unlockLevel(levelId + 1);
  };

  const handleRetry = () => {
    setHighlightedIds([]);
    setSelectedFallacy(null);
    setResult(null);
    setSubmitted(false);
    setShowConfetti(false);
    setPhase('reading');
    setOwlMood('encourage', 'Try again! You can do it.');
  };

  const handleNext = () => {
    if (levelId < 81) onNextLevel();
    else onBack();
  };

  if (!level) {
    return (
      <div className={styles.error}>
        <p>Level not found</p>
        <button onClick={onBack} type="button">Back</button>
      </div>
    );
  }

  const phaseLabels: Record<LevelPhase, string> = {
    reading: 'Read',
    highlighting: 'Select',
    classifying: 'Identify',
    feedback: 'Result',
  };
  const phaseOrder: LevelPhase[] = ['reading', 'highlighting', 'classifying', 'feedback'];

  return (
    <div className={styles.wrapper}>
      {/* Celebration */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Top bar: hearts + owl */}
      <div className={styles.topRow}>
        <button className={styles.exitBtn} type="button" onClick={onBack}>
          &times;
        </button>
        <HeartsBar maxHearts={maxHearts} currentHearts={hearts} />
      </div>

      {/* Owl */}
      <div className={styles.owlSpot}>
        <OwlMascot
          mood={owlMood}
          size="md"
          message={owlMessage || undefined}
          speaking={!!owlMessage}
        />
      </div>

      {/* Level header */}
      <div className={styles.levelHeader}>
        <div className={styles.levelMeta}>
          <span className={styles.chapterTag} style={{ color: chapter?.color }}>
            Ch.{chapter?.id} {chapter?.title}
          </span>
          <span className={styles.levelId}>No. {levelId}</span>
        </div>
        <h1 className={styles.levelTitle}>{level.title}</h1>
        <p className={styles.scenario}>{level.scenario}</p>
      </div>

      {/* Phase indicator */}
      <div className={styles.phaseRow}>
        {phaseOrder.map((p, i) => {
          const idx = phaseOrder.indexOf(phase);
          const isPast = i < idx || (phase === 'feedback' && i <= idx);
          const isCurrent = i === idx && phase !== 'feedback';
          let cls = styles.phaseDot;
          if (isPast) cls += ` ${styles.phaseDone}`;
          if (isCurrent) cls += ` ${styles.phaseActive}`;
          return (
            <div key={p} className={styles.phaseItem}>
              <span className={cls}>{isPast ? 'V' : i + 1}</span>
              <span className={`${styles.phaseLabel} ${(isPast || isCurrent) ? styles.phaseLabelOn : ''}`}>
                {phaseLabels[p]}
              </span>
              {i < 3 && <span className={styles.phaseLine} />}
            </div>
          );
        })}
      </div>

      {/* Phase: reading + highlighting */}
      {(phase === 'reading' || phase === 'highlighting') && (
        <div className="fade-in">
          <div className={styles.instruction}>
            {phase === 'reading' && (
              <p>Read the dialogue. Click sentences that contain logical fallacies.</p>
            )}
            {phase === 'highlighting' && highlightedIds.length > 0 && (
              <p><strong>{highlightedIds.length}</strong> selected. Confirm to continue.</p>
            )}
          </div>

          <DialogueDisplay
            dialogue={level.dialogue}
            highlightedIds={highlightedIds}
            onToggle={(id) => {
              if (phase === 'reading') setPhase('highlighting');
              handleToggleHighlight(id);
            }}
          />

          <div className={styles.bottomActions}>
            {highlightedIds.length > 0 && (
              <>
                <button className={styles.resetBtn} type="button" onClick={() => { setHighlightedIds([]); setPhase('reading'); }}>
                  Reset
                </button>
                <button className={styles.confirmBtn} type="button" onClick={handleConfirmHighlight}>
                  Confirm selection
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Phase: classifying */}
      {phase === 'classifying' && (
        <div className="fade-in">
          <div className={styles.instruction}>
            <p>Identify the logical fallacy in the highlighted sentences.</p>
          </div>

          <DialogueDisplay dialogue={level.dialogue} highlightedIds={highlightedIds} onToggle={() => {}} disabled />

          <FallacySelector fallacyPool={fallacyPool} selectedFallacy={selectedFallacy} onSelect={setSelectedFallacy} />

          <div className={styles.bottomActions}>
            <button className={styles.resetBtn} type="button" onClick={handleRetry}>Back</button>
            <button
              className={styles.confirmBtn}
              type="button"
              onClick={handleSubmitClassification}
              disabled={!selectedFallacy || submitted}
            >
              {selectedFallacy ? 'Submit' : 'Select a fallacy'}
            </button>
          </div>
        </div>
      )}

      {/* Phase: feedback */}
      {phase === 'feedback' && result && (
        <div className="fade-in">
          <DialogueDisplay
            dialogue={level.dialogue} highlightedIds={highlightedIds}
            correctIds={result.correctLineIds} showResult
            onToggle={() => {}} disabled
          />
          <FallacySelector
            fallacyPool={fallacyPool} selectedFallacy={selectedFallacy}
            onSelect={() => {}} disabled correctFallacy={result.correctFallacyType} showResult
          />
          <FeedbackPanel
            level={level} stars={result.stars}
            highlightedCorrect={result.highlightedCorrect} fallacyCorrect={result.fallacyCorrect}
            selectedFallacy={selectedFallacy}
            onNextLevel={handleNext} onRetry={handleRetry} onBackToGrid={onBack}
            hasNextLevel={levelId < 81}
          />
        </div>
      )}
    </div>
  );
}
