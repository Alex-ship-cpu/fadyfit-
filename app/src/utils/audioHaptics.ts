// Audio and Haptic Feedback for Training & Mindfulness Pacing
// Compatible with iOS Safari / WebKit Web Audio API

class AudioHapticsService {
  private audioCtx: AudioContext | null = null;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  // Pure synthesized chime (no external MP3 asset dependency)
  public playChime(success: boolean = true) {
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(success ? 880 : 440, this.audioCtx.currentTime); // A5 or A4
      osc.frequency.exponentialRampToValueAtTime(success ? 1760 : 220, this.audioCtx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.5);

      // Trigger Web Vibration API if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(success ? [50, 50, 100] : [150]);
      }
    } catch (e) {
      console.warn('Audio synthesis bypassed', e);
    }
  }

  public playTick() {
    try {
      this.initCtx();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      // Ignored
    }
  }
}

export const audioHaptics = new AudioHapticsService();
