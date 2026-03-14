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
        
        // Particle burst for perfect hits
        if (settings.get('particlesEnabled') && particles) {
            const laneIndex = note.key - 1;
            const lane = noteLanes.children[laneIndex];
            const rect = lane.getBoundingClientRect();
            const gameRect = gameArea.getBoundingClientRect();
            const x = rect.left - gameRect.left + rect.width / 2;
            const y = note.y + 25;
            particles.createBurst(x, y, audio.getColor(note.key), 25);
        }
    } else if (quality === 'good') {
        points = 50;
        feedback = 'Good!';
        gameState.combo++;
        audio.playHitSound('good');
        
        // Small sparkle for good hits
        if (settings.get('particlesEnabled') && particles) {
            const laneIndex = note.key - 1;
            const lane = noteLanes.children[laneIndex];
            const rect = lane.getBoundingClientRect();
            const gameRect = gameArea.getBoundingClientRect();
            const x = rect.left - gameRect.left + rect.width / 2;
            const y = note.y + 25;
            particles.createSparkle(x, y, audio.getColor(note.key));
        }
    } else {
        points = 10;
        feedback = 'Bad';
        gameState.combo = 0;
        audio.playHitSound('bad');
    }
    
    // Combo celebration at milestones
    if (gameState.combo > 0 && gameState.combo % 10 === 0 && settings.get('particlesEnabled') && particles) {
        const gameRect = gameArea.getBoundingClientRect();
        particles.createComboCelebration(gameRect.width / 2, gameRect.height / 2, '#ffd700');
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

// Update progress bar
function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
    }
}

// Game loop
let lastTime = 0;
function gameLoop(timestamp) {
    if (!gameState.isPlaying) return;
    
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    updateNotes(deltaTime);
    
    // Update and render particles
    if (particles && settings.get('particlesEnabled')) {
        particles.update();
        // Clear and redraw particles
        const canvas = particles.canvas;
        const ctx = particles.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.draw();
    }
    
    // Update progress bar
    const elapsed = Date.now() - gameState.startTime;
    const lastNoteTime = gameState.songPattern[gameState.songPattern.length - 1]?.time || 0;
    const songDuration = lastNoteTime + 2000;
    const progress = Math.min(elapsed / songDuration, 1);
    updateProgressBar(progress);
    
    // Check if song is complete
    if (elapsed > songDuration && gameState.notes.length === 0) {
        endGame();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

// Start the game
function startGame() {
    // Initialize audio
    audio.init();
    
    // Initialize particles
    if (typeof particles === 'undefined' && gameArea) {
        const canvas = document.createElement('canvas');
        canvas.width = gameArea.offsetWidth;
        canvas.height = gameArea.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.pointerEvents = 'none';
        canvas.style.top = '0';
        canvas.style.left = '0';
        gameArea.appendChild(canvas);
        initParticles(canvas);
    }
    
    // Get song ID from current song
    const songId = currentSong.id || 'twinkle';
    
    // Reset game state completely
    gameState = {
        isPlaying: true,
        score: 0,
        combo: 0,
        maxCombo: 0,
        hits: 0,
        misses: 0,
        notes: [],
        noteSpeed: settings.get('noteSpeed'),
        spawnRate: 800,
        lastSpawn: 0,
        songPattern: [...currentSong.pattern],
        songIndex: 0,
        startTime: Date.now(),
        currentSongId: songId,
        isPaused: false
    };
    
    // Reset UI displays
    scoreEl.textContent = '0';
    comboEl.textContent = '0';
    accuracyEl.textContent = '100%';
    
    // Clear existing notes
    document.querySelectorAll('.note').forEach(n => n.remove());
    
    // Hide screens
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    document.getElementById('pause-overlay').style.display = 'none';
    document.getElementById('pause-btn').disabled = false;
    
    // Reset progress bar
    updateProgressBar(0);
    
    // Start game loop
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
    
    console.log(`🎹 Game started: ${currentSong.name}`);
}

// End the game
function endGame() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    
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
    
    // Update progress bar to 100%
    updateProgressBar(1);
    
    gameOverScreen.style.display = 'flex';
}

// Restart game (same song)
function restartGame() {
    // Reset game state completely
    gameState = {
        isPlaying: true,
        score: 0,
        combo: 0,
        maxCombo: 0,
        hits: 0,
        misses: 0,
        notes: [],
        noteSpeed: settings.get('noteSpeed'),
        spawnRate: 800,
        lastSpawn: 0,
        songPattern: [...currentSong.pattern],
        songIndex: 0,
        startTime: Date.now(),
        currentSongId: currentSong.id || 'twinkle',
        isPaused: false
    };
    
    // Reset UI
    scoreEl.textContent = '0';
    comboEl.textContent = '0';
    accuracyEl.textContent = '100%';
    
    // Clear existing notes
    document.querySelectorAll('.note').forEach(n => n.remove());
    
    // Hide screens
    gameOverScreen.style.display = 'none';
    document.getElementById('pause-overlay').style.display = 'none';
    
    // Reset progress bar
    updateProgressBar(0);
    
    // Start game loop
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
    
    console.log(`🎹 Game restarted: ${currentSong.name}`);
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
    // Get all available songs from additionalSongs
    const allSongs = Object.values(additionalSongs);
    
    // Find current song index
    const currentIndex = allSongs.findIndex(s => s.id === (currentSong.id || 'twinkle'));
    
    // Move to next song
    const nextIndex = (currentIndex + 1) % allSongs.length;
    const nextSong = allSongs[nextIndex];
    
    // Update current song
    currentSong = {
        name: nextSong.name,
        bpm: nextSong.bpm,
        pattern: nextSong.pattern
    };
    currentSong.id = nextSong.id;
    
    // Update display
    startScreen.querySelector('p').innerHTML = `
        Current: <strong style="color: #ff6b9d">${nextSong.name}</strong><br>
        <span style="color: #888;">${nextSong.difficulty} • ${nextSong.category}</span><br>
        BPM: ${nextSong.bpm} | Notes: ${nextSong.pattern.length}
    `;
}

// Initialize
function init() {
    // Set default song
    const defaultSong = additionalSongs['twinkle'];
    currentSong = {
        name: defaultSong.name,
        bpm: defaultSong.bpm,
        pattern: defaultSong.pattern,
        id: defaultSong.id
    };
    
    startScreen.querySelector('p').innerHTML = `
        Current: <strong style="color: #ff6b9d">${currentSong.name}</strong><br>
        <span style="color: #888;">${defaultSong.difficulty} • ${defaultSong.category}</span><br>
        BPM: ${defaultSong.bpm} | Notes: ${defaultSong.pattern.length}
    `;
    
    // Initialize settings
    if (typeof settings !== 'undefined') {
        settings.apply();
        document.getElementById('volume-slider').value = settings.get('masterVolume') * 100;
        document.getElementById('speed-slider').value = (settings.get('noteSpeed') / 300) * 100;
        document.getElementById('sounds-toggle').checked = settings.get('keySoundsEnabled');
        document.getElementById('particles-toggle').checked = settings.get('particlesEnabled');
    }
    
    console.log('🎹 Piano Rhythm Game loaded!');
}

// Pause functionality
function togglePause() {
    if (!gameState.isPlaying && !gameState.isPaused) return;
    
    const pauseOverlay = document.getElementById('pause-overlay');
    const pauseBtn = document.getElementById('pause-btn');
    
    if (gameState.isPaused) {
        // Resume
        gameState.isPaused = false;
        gameState.isPlaying = true;
        pauseOverlay.style.display = 'none';
        pauseBtn.disabled = false;
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
        if (audio.ctx) audio.ctx.resume();
    } else {
        // Pause
        gameState.isPaused = true;
        gameState.isPlaying = false;
        pauseOverlay.style.display = 'flex';
        pauseBtn.disabled = false;
        if (audio.ctx) audio.ctx.suspend();
    }
}

function quitGame() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    document.getElementById('pause-overlay').style.display = 'none';
    showStartScreen();
    document.getElementById('pause-btn').disabled = true;
}

// Settings functions
function showSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = 'flex';
    
    // Load current values
    document.getElementById('volume-slider').value = settings.get('masterVolume') * 100;
    document.getElementById('volume-value').textContent = Math.round(settings.get('masterVolume') * 100);
    document.getElementById('speed-slider').value = (settings.get('noteSpeed') / 300) * 100;
    document.getElementById('speed-value').textContent = Math.round((settings.get('noteSpeed') / 300) * 100);
    document.getElementById('sounds-toggle').checked = settings.get('keySoundsEnabled');
    document.getElementById('particles-toggle').checked = settings.get('particlesEnabled');
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function updateVolume(value) {
    document.getElementById('volume-value').textContent = value;
    settings.set('masterVolume', value / 100);
    if (audio.masterGain) {
        audio.masterGain.gain.value = value / 100;
    }
}

function updateSpeed(value) {
    document.getElementById('speed-value').textContent = value;
    settings.set('noteSpeed', (value / 100) * 300);
    if (gameState.isPlaying) {
        gameState.noteSpeed = (value / 100) * 300;
    }
}

function toggleSounds(enabled) {
    settings.set('keySoundsEnabled', enabled);
}

function toggleParticles(enabled) {
    settings.set('particlesEnabled', enabled);
}

function saveSettings() {
    settings.saveSettings();
    settings.apply();
    closeSettings();
}

function resetSettings() {
    if (confirm('Reset all settings to defaults?')) {
        settings.reset();
        settings.apply();
        showSettings();
    }
}

// Keyboard shortcut for pause
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameState.isPlaying) {
        e.preventDefault();
        togglePause();
    }
});

init();
