// 🎹 Piano Rhythm Game - Audio System
// Synthesized piano sounds using Web Audio API

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.initialized = false;
        
        // Piano key frequencies (C major scale)
        this.frequencies = {
            1: 261.63,  // C4
            2: 293.66,  // D4
            3: 329.63,  // E4
            4: 349.23,  // F4
            5: 392.00,  // G4
            6: 440.00   // A4
        };
        
        // Note colors matching keys
        this.noteColors = [
            '#ff6b9d', // 1 - C
            '#4ecdc4', // 2 - D
            '#ffeaa7', // 3 - E
            '#a29bfe', // 4 - F
            '#81ecec', // 5 - G
            '#fd79a8'  // 6 - A
        ];
    }
    
    init() {
        if (this.initialized) return;
        
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.ctx.destination);
        this.initialized = true;
    }
    
    // Play a piano note
    playNote(keyNumber, duration = 0.5) {
        if (!this.initialized) this.init();
        
        const freq = this.frequencies[keyNumber];
        if (!freq) return;
        
        const now = this.ctx.currentTime;
        
        // Create oscillator for main tone
        const oscillator = this.ctx.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(freq, now);
        
        // Add harmonics for richer sound
        const harmonic2 = this.ctx.createOscillator();
        harmonic2.type = 'sine';
        harmonic2.frequency.setValueAtTime(freq * 2, now);
        
        const harmonic3 = this.ctx.createOscillator();
        harmonic3.type = 'sine';
        harmonic3.frequency.setValueAtTime(freq * 3, now);
        
        // Create envelope for piano-like decay
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + 0.01); // Attack
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Decay
        
        const gain2 = this.ctx.createGain();
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(0.3, now + 0.01);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        const gain3 = this.ctx.createGain();
        gain3.gain.setValueAtTime(0, now);
        gain3.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain3.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        // Connect everything
        oscillator.connect(gain);
        harmonic2.connect(gain2);
        harmonic3.connect(gain3);
        
        gain.connect(this.masterGain);
        gain2.connect(this.masterGain);
        gain3.connect(this.masterGain);
        
        // Start and stop
        oscillator.start(now);
        harmonic2.start(now);
        harmonic3.start(now);
        
        oscillator.stop(now + duration);
        harmonic2.stop(now + duration);
        harmonic3.stop(now + duration);
    }
    
    // Play hit sound for perfect timing
    playHitSound(type = 'perfect') {
        if (!this.initialized) return;
        
        const now = this.ctx.currentTime;
        const oscillator = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        if (type === 'perfect') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, now);
            oscillator.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        } else if (type === 'good') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(660, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        } else {
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        }
        
        oscillator.connect(gain);
        gain.connect(this.masterGain);
        
        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }
    
    // Get color for a key
    getColor(keyNumber) {
        return this.noteColors[keyNumber - 1] || '#fff';
    }
}

// Global audio instance
const audio = new AudioEngine();
