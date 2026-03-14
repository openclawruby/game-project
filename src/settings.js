// ⚙️ Settings Manager - Game Configuration

class SettingsManager {
    constructor() {
        this.storageKey = 'pianoRhythm_settings';
        this.defaults = {
            masterVolume: 0.3,
            noteSpeed: 300,
            keySoundsEnabled: true,
            particlesEnabled: true,
            tutorialShown: false
        };
        this.settings = this.loadSettings();
    }
    
    loadSettings() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                return { ...this.defaults, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
        return { ...this.defaults };
    }
    
    saveSettings() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        } catch (e) {
            console.error('Failed to save settings:', e);
        }
    }
    
    get(key) {
        return this.settings[key] !== undefined ? this.settings[key] : this.defaults[key];
    }
    
    set(key, value) {
        this.settings[key] = value;
        this.saveSettings();
    }
    
    reset() {
        this.settings = { ...this.defaults };
        this.saveSettings();
    }
    
    // Apply settings to game
    apply() {
        if (audio && audio.masterGain) {
            audio.masterGain.gain.value = this.get('masterVolume');
        }
        if (gameState && gameState.isPlaying) {
            gameState.noteSpeed = this.get('noteSpeed');
        }
    }
}

// Global settings instance
const settings = new SettingsManager();
