// Simple Web Audio API sound effects
let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch { /* audio not available */ }
}

export function playCorrectSound() {
  playTone(523, 0.1, 'sine', 0.12);
  setTimeout(() => playTone(659, 0.1, 'sine', 0.12), 80);
  setTimeout(() => playTone(784, 0.2, 'sine', 0.12), 160);
}

export function playWrongSound() {
  playTone(200, 0.15, 'square', 0.08);
  setTimeout(() => playTone(180, 0.2, 'square', 0.08), 120);
}

export function playClickSound() {
  playTone(880, 0.05, 'sine', 0.06);
}

export function playLevelUpSound() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.15, 'sine', 0.1), i * 100);
  });
}

export function playStarSound() {
  playTone(1047, 0.1, 'sine', 0.08);
  setTimeout(() => playTone(1319, 0.15, 'sine', 0.08), 80);
}

export function playHeartLossSound() {
  playTone(150, 0.25, 'triangle', 0.1);
}
