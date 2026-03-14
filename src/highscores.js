// 🏆 High Score Manager - Persistent Score Tracking

class HighScoreManager {
    constructor() {
        this.storageKey = 'pianoRhythm_highScores';
        this.maxScoresPerSong = 10;
        this.scores = this.loadScores();
    }
    
    // Load scores from localStorage
    loadScores() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to load high scores:', e);
            }
        }
        return {};
    }
    
    // Save scores to localStorage
    saveScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        } catch (e) {
            console.error('Failed to save high scores:', e);
        }
    }
    
    // Add a new score
    addScore(songId, scoreData) {
        if (!this.scores[songId]) {
            this.scores[songId] = [];
        }
        
        const scoreEntry = {
            score: scoreData.score,
            accuracy: scoreData.accuracy,
            maxCombo: scoreData.maxCombo,
            hits: scoreData.hits,
            misses: scoreData.misses,
            date: new Date().toISOString(),
            songName: scoreData.songName || 'Unknown'
        };
        
        this.scores[songId].push(scoreEntry);
        
        // Sort by score (descending)
        this.scores[songId].sort((a, b) => b.score - a.score);
        
        // Keep only top N
        this.scores[songId] = this.scores[songId].slice(0, this.maxScoresPerSong);
        
        this.saveScores();
        
        // Return rank (1-based)
        return this.scores[songId].findIndex(s => s === scoreEntry) + 1;
    }
    
    // Get high scores for a song
    getHighScores(songId) {
        return this.scores[songId] || [];
    }
    
    // Get personal best for a song
    getPersonalBest(songId) {
        const scores = this.getHighScores(songId);
        return scores.length > 0 ? scores[0] : null;
    }
    
    // Check if score is a new high score
    isNewHighScore(songId, score) {
        const scores = this.getHighScores(songId);
        if (scores.length === 0) return true;
        if (scores.length < this.maxScoresPerSong) return true;
        return score > scores[scores.length - 1].score;
    }
    
    // Clear all scores for a song
    clearScores(songId) {
        if (this.scores[songId]) {
            delete this.scores[songId];
            this.saveScores();
        }
    }
    
    // Clear all scores
    clearAllScores() {
        this.scores = {};
        this.saveScores();
    }
    
    // Get all scores summary
    getSummary() {
        let totalGames = 0;
        let totalScore = 0;
        
        for (const songId in this.scores) {
            totalGames += this.scores[songId].length;
            for (const score of this.scores[songId]) {
                totalScore += score.score;
            }
        }
        
        return {
            totalGames,
            totalScore,
            averageScore: totalGames > 0 ? Math.round(totalScore / totalGames) : 0
        };
    }
}

// Global instance
const highScores = new HighScoreManager();
