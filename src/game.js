// 🎹 Piano Rhythm Game - Main Game Logic

// Game State
let gameState = {
    isPlaying: false,
    score: 0,
    combo: 0,
    maxCombo: 0,
    hits: 0,
    misses: 0,
    notes: [],
    noteSpeed: 300, // pixels per second
    spawnRate: 800, // ms between notes
    lastSpawn: 0,
    songPattern: [],
    songIndex: 0,
    startTime: 0,
    currentSongId: 'easy',
    isPaused: false
};

// Constants
const HIT_LINE_Y = 500; // Y position of hit line
const HIT_WINDOW_PERFECT = 30; // ms for perfect hit
const HIT_WINDOW_GOOD = 80; // ms for good hit
const HIT_WINDOW_BAD = 150; // ms for bad hit

// DOM Elements
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const accuracyEl = document.getElementById('accuracy');
const gameArea = document.getElementById('game-area');
const noteLanes = document.getElementById('note-lanes');
const feedbackEl = document.getElementById('feedback');
const comboDisplay = document.getElementById('combo-display');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const pianoKeys = document.querySelectorAll('.piano-key');

// Song patterns (simplified melodies)
const songs = {
    easy: {
        name: 'Twinkle Star',
        bpm: 100,
        pattern: [
            { key: 1, time: 0 },
            { key: 1, time: 500 },
            { key: 5, time: 1000 },
            { key: 5, time: 1500 },
            { key: 6, time: 2000 },
            { key: 6, time: 2500 },
            { key: 5, time: 3000 },
            { key: 4, time: 3500 },
            { key: 4, time: 4000 },
            { key: 3, time: 4500 },
            { key: 3, time: 5000 },
            { key: 2, time: 5500 },
            { key: 2, time: 6000 },
            { key: 1, time: 6500 },
        ]
    },
    medium: {
        name: 'River Flow',
        bpm: 120,
        pattern: [
            { key: 1, time: 0 },
            { key: 3, time: 250 },
            { key: 5, time: 500 },
            { key: 6, time: 750 },
            { key: 5, time: 1000 },
            { key: 3, time: 1250 },
            { key: 1, time: 1500 },
            { key: 2, time: 1750 },
            { key: 4, time: 2000 },
            { key: 6, time: 2250 },
            { key: 5, time: 2500 },
            { key: 4, time: 2750 },
            { key: 3, time: 3000 },
            { key: 2, time: 3250 },
            { key: 1, time: 3500 },
            { key: 3, time: 3750 },
            { key: 5, time: 4000 },
            { key: 6, time: 4250 },
            { key: 5, time: 4500 },
            { key: 3, time: 4750 },
        ]
    },
    hard: {
        name: 'Lightning Storm',
        bpm: 160,
        pattern: [
            { key: 1, time: 0 },
            { key: 2, time: 187 },
            { key: 3, time: 375 },
            { key: 4, time: 562 },
            { key: 5, time: 750 },
            { key: 6, time: 937 },
            { key: 5, time: 1125 },
            { key: 4, time: 1312 },
            { key: 3, time: 1500 },
            { key: 2, time: 1687 },
            { key: 1, time: 1875 },
            { key: 3, time: 2062 },
            { key: 5, time: 2250 },
            { key: 6, time: 2437 },
            { key: 5, time: 2625 },
            { key: 4, time: 2812 },
            { key: 3, time: 3000 },
            { key: 2, time: 3187 },
            { key: 1, time: 3375 },
            { key: 6, time: 3562 },
            { key: 5, time: 3750 },
            { key: 4, time: 3937 },
            { key: 3, time: 4125 },
            { key: 2, time: 4312 },
            { key: 1, time: 4500 },
        ]
    }
};

let currentSong = songs.easy;

// Initialize keyboard input
document.addEventListener('keydown', (e) => {
    if (!gameState.isPlaying) return;
    
    const keyMap = {
        '1': 1, 'q': 1, 'Q': 1,
        '2': 2, 'w': 2, 'W': 2,
        '3': 3, 'e': 3, 'E': 3,
        '4': 4, 'r': 4, 'R': 4,
        '5': 5, 't': 5, 'T': 5,
        '6': 6, 'y': 6, 'Y': 6
    };
    
    const keyNumber = keyMap[e.key];
    if (keyNumber && !e.repeat) {
        handleInput(keyNumber);
    }
});

// Handle input (touch or keyboard)
function handleInput(keyNumber) {
    if (!gameState.isPlaying) return;
    
    // Visual feedback on piano key
    const keyEl = document.querySelector(`.piano-key[data-key="${keyNumber}"]`);
    keyEl.classList.add('active');
    setTimeout(() => keyEl.classList.remove('active'), 100);
    
    // Play sound
    audio.playNote(keyNumber);
    
    // Check for hits
    checkHit(keyNumber);
}

// Check if input hits a note
function checkHit(keyNumber) {
    const now = Date.now();
    const hitY = HIT_LINE_Y;
    
    // Find notes in this lane that are near the hit line
    const laneNotes = gameState.notes.filter(n => 
        n.key === keyNumber && 
        !n.hit && 
        !n.missed
    );
    
    let bestHit = null;
    let bestDistance = Infinity;
    
    for (const note of laneNotes) {
        const noteY = note.y + 50; // Bottom of note
        const distance = Math.abs(noteY - hitY);
        
        if (distance < HIT_WINDOW_BAD && distance < bestDistance) {
            bestDistance = distance;
            bestHit = note;
        }
    }
    
    if (bestHit) {
        // Determine hit quality
        let quality;
        if (bestDistance <= HIT_WINDOW_PERFECT) {
            quality = 'perfect';
        } else if (bestDistance <= HIT_WINDOW_GOOD) {
            quality = 'good';
        } else {
            quality = 'bad';
        }
        
        registerHit(bestHit, quality);
    }
}

// Register a successful hit
function registerHit(note, quality) {
    note.hit = true;
    gameState.hits++;
    
    let points = 0;
    let feedback = '';
    
    if (quality === 'perfect') {
        points = 100;
        feedback = 'Perfect!';
        gameState.combo++;
        audio.playHitSound('perfect');
    } else if (quality === 'good') {
        points = 50;
        feedback = 'Good!';
        gameState.combo++;
        audio.playHitSound('good');
    } else {
        points = 10;
        feedback = 'Bad';
        gameState.combo = 0;
        audio.playHitSound('bad');
    }
    
    // Combo multiplier
    if (gameState.combo >= 10) points *= 2;
    else if (gameState.combo >= 5) points *= 1.5;
    
    gameState.score += Math.floor(points);
    gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
    
    // Update UI
    updateScore();
    showFeedback(feedback, quality);
    
    // Visual on note
    const noteEl = note.element;
    if (noteEl) {
        noteEl.classList.add('hit');
        noteEl.style.background = audio.getColor(note.key);
    }
}

// Show feedback text
function showFeedback(text, quality) {
    feedbackEl.textContent = text;
    feedbackEl.className = '';
    feedbackEl.classList.add(`feedback-${quality}`);
    feedbackEl.style.opacity = '1';
    
    setTimeout(() => {
        feedbackEl.style.opacity = '0';
    }, 500);
    
    // Combo display
    if (gameState.combo >= 5) {
        comboDisplay.textContent = `${gameState.combo} Combo!`;
        comboDisplay.classList.add('show');
        setTimeout(() => comboDisplay.classList.remove('show'), 500);
    }
}

// Update score display
function updateScore() {
    scoreEl.textContent = gameState.score;
    comboEl.textContent = gameState.combo;
    
    const total = gameState.hits + gameState.misses;
    const accuracy = total > 0 ? Math.round((gameState.hits / total) * 100) : 100;
    accuracyEl.textContent = `${accuracy}%`;
}

// Spawn a note
function spawnNote(keyNumber, y = -50) {
    const lane = noteLanes.children[keyNumber - 1];
    const noteEl = document.createElement('div');
    noteEl.className = 'note';
    noteEl.style.background = audio.getColor(keyNumber);
    noteEl.style.boxShadow = `0 0 15px ${audio.getColor(keyNumber)}`;
    
    lane.appendChild(noteEl);
    
    const note = {
        key: keyNumber,
        y: y,
        element: noteEl,
        hit: false,
        missed: false,
        spawnTime: Date.now()
    };
    
    gameState.notes.push(note);
    return note;
}

// Update notes positions
function updateNotes(deltaTime) {
    const now = Date.now();
    const gameHeight = gameArea.offsetHeight;
    
    // Spawn notes based on song pattern
    if (gameState.songPattern.length > 0) {
        const elapsed = now - gameState.startTime;
        
        // Spawn upcoming notes
        while (gameState.songIndex < gameState.songPattern.length) {
            const noteData = gameState.songPattern[gameState.songIndex];
            const spawnTime = noteData.time - (HIT_LINE_Y / gameState.noteSpeed * 1000);
            
            if (elapsed >= spawnTime) {
                spawnNote(noteData.key);
                gameState.songIndex++;
            } else {
                break;
            }
        }
    }
    
    // Update note positions
    for (const note of gameState.notes) {
        if (note.hit || note.missed) continue;
        
        note.y += (gameState.noteSpeed * deltaTime) / 1000;
        note.element.style.transform = `translateY(${note.y}px)`;
        
        // Check if missed
        if (note.y > gameHeight) {
            note.missed = true;
            gameState.misses++;
            gameState.combo = 0;
            note.element.classList.add('missed');
            updateScore();
        }
    }
    
    // Clean up old notes
    gameState.notes = gameState.notes.filter(n => {
        if (n.y > gameHeight + 100) {
            if (n.element && n.element.parentNode) {
                n.element.remove();
            }
            return false;
        }
        return true;
    });
}

// Game loop
let lastTime = 0;
function gameLoop(timestamp) {
    if (!gameState.isPlaying) return;
    
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    updateNotes(deltaTime);
    
    // Check if song is complete
    const elapsed = Date.now() - gameState.startTime;
    const lastNoteTime = gameState.songPattern[gameState.songPattern.length - 1]?.time || 0;
    
    if (elapsed > lastNoteTime + 2000 && gameState.notes.length === 0) {
        endGame();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

// Start the game
function startGame() {
    // Initialize audio
    audio.init();
    
    // Get song ID from current song
    const songId = Object.keys(songs).find(key => songs[key] === currentSong) || 'easy';
    
    // Reset game state
    gameState = {
        isPlaying: true,
        score: 0,
        combo: 0,
        maxCombo: 0,
        hits: 0,
        misses: 0,
        notes: [],
        noteSpeed: 300,
        spawnRate: 800,
        lastSpawn: 0,
        songPattern: [...currentSong.pattern],
        songIndex: 0,
        startTime: Date.now(),
        currentSongId: songId,
        isPaused: false
    };
    
    // Clear existing notes
    document.querySelectorAll('.note').forEach(n => n.remove());
    
    // Hide screens
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // Start game loop
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
    
    console.log(`🎹 Game started: ${currentSong.name}`);
}

// End the game
function endGame() {
    gameState.isPlaying = false;
    
    const total = gameState.hits + gameState.misses;
    const accuracy = total > 0 ? Math.round((gameState.hits / total) * 100) : 100;
    
    // Save high score
    const rank = highScores.addScore(gameState.currentSongId, {
        score: gameState.score,
        accuracy: accuracy,
        maxCombo: gameState.maxCombo,
        hits: gameState.hits,
        misses: gameState.misses,
        songName: currentSong.name
    });
    
    // Check if new high score
    const isNewBest = rank === 1;
    
    // Calculate grade
    let grade = 'D';
    if (accuracy >= 95) grade = 'S';
    else if (accuracy >= 90) grade = 'A';
    else if (accuracy >= 80) grade = 'B';
    else if (accuracy >= 70) grade = 'C';
    
    document.getElementById('final-score').innerHTML = `
        <div style="font-size: 48px; margin-bottom: 10px;">${isNewBest ? '🏆 ' : ''}${grade}</div>
        <div style="color: #ff6b9d; font-size: 28px; margin-bottom: 15px;">Score: ${gameState.score}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left;">
            <div>🎯 Max Combo: ${gameState.maxCombo}</div>
            <div>📊 Accuracy: ${accuracy}%</div>
            <div>✅ Hits: ${gameState.hits}</div>
            <div>❌ Misses: ${gameState.misses}</div>
            <div>🏅 Rank: #${rank}</div>
            <div>🎵 Song: ${currentSong.name}</div>
        </div>
        ${isNewBest ? '<div style="margin-top: 15px; color: #00ff88; font-size: 18px;">✨ NEW HIGH SCORE! ✨</div>' : ''}
    `;
    
    // Show high scores
    showHighScores(gameState.currentSongId);
    
    gameOverScreen.style.display = 'flex';
}

// Show high scores for a song
function showHighScores(songId) {
    const scores = highScores.getHighScores(songId);
    if (scores.length === 0) return;
    
    const scoresHtml = scores.map((s, i) => `
        <div style="padding: 8px; margin: 5px 0; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: ${i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#888'}; font-weight: bold; width: 30px;">#${i + 1}</span>
                <span style="color: #fff; font-weight: bold;">${s.score}</span>
            </div>
            <div style="color: #888; font-size: 12px;">
                ${s.accuracy}% | ${new Date(s.date).toLocaleDateString()}
            </div>
        </div>
    `).join('');
    
    const highScoresDiv = document.getElementById('high-scores');
    if (highScoresDiv) {
        highScoresDiv.innerHTML = `<div style="margin-top: 20px; text-align: left;"><div style="color: #888; font-size: 14px; margin-bottom: 10px;">🏆 Top Scores</div>${scoresHtml}</div>`;
    }
}

// Show start screen
function showStartScreen() {
    startScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
}

// Select song difficulty
function selectSong() {
    const difficulties = ['easy', 'medium', 'hard'];
    const currentIndex = difficulties.indexOf(currentSong.name.toLowerCase().replace(' ', ''));
    const nextIndex = (currentIndex + 1) % difficulties.length;
    
    const songKeys = Object.keys(songs);
    currentSong = songs[songKeys[nextIndex]];
    
    startScreen.querySelector('p').innerHTML = `
        Current: <strong style="color: #ff6b9d">${currentSong.name}</strong><br>
        BPM: ${currentSong.bpm} | Notes: ${currentSong.pattern.length}
    `;
}

// Initialize
function init() {
    startScreen.querySelector('p').innerHTML = `
        Current: <strong style="color: #ff6b9d">${currentSong.name}</strong><br>
        BPM: ${currentSong.bpm} | Notes: ${currentSong.pattern.length}
    `;
    console.log('🎹 Piano Rhythm Game loaded!');
}

init();
