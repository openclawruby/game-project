// 🎮 Game Project - Core Game Engine
// Sprint 1 MVP Implementation

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game State
let score = 0;
let gameOver = false;

// Player
const player = {
    x: 400,
    y: 300,
    width: 40,
    height: 40,
    speed: 5,
    color: '#4a9eff',
    dx: 0,
    dy: 0
};

// Collectible
const collectible = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    color: '#00ff88'
};

// Input handling (GAME-003)
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    // Prevent scrolling with arrow keys
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Spawn collectible at random position
function spawnCollectible() {
    collectible.x = Math.random() * (canvas.width - collectible.width);
    collectible.y = Math.random() * (canvas.height - collectible.height);
}

// Update game state (GAME-001 - Core Game Loop)
function update() {
    if (gameOver) return;

    // Player movement
    if (keys['arrowup'] || keys['w']) player.y -= player.speed;
    if (keys['arrowdown'] || keys['s']) player.y += player.speed;
    if (keys['arrowleft'] || keys['a']) player.x -= player.speed;
    if (keys['arrowright'] || keys['d']) player.x += player.speed;

    // Boundary checking
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // Collision detection with collectible
    if (
        player.x < collectible.x + collectible.width &&
        player.x + player.width > collectible.x &&
        player.y < collectible.y + collectible.height &&
        player.y + player.height > collectible.y
    ) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        spawnCollectible();
    }
}

// Render game (GAME-002 - Basic Graphics)
function draw() {
    // Clear canvas
    ctx.fillStyle = '#0f0f23';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid pattern
    ctx.strokeStyle = '#1a1a3e';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw collectible
    ctx.fillStyle = collectible.color;
    ctx.shadowColor = collectible.color;
    ctx.shadowBlur = 15;
    ctx.fillRect(collectible.x, collectible.y, collectible.width, collectible.height);
    ctx.shadowBlur = 0;

    // Draw player
    ctx.fillStyle = player.color;
    ctx.shadowColor = player.color;
    ctx.shadowBlur = 20;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Draw player eyes (cute factor!)
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 10, player.y + 10, 8, 8);
    ctx.fillRect(player.x + 22, player.y + 10, 8, 8);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize game
function init() {
    spawnCollectible();
    gameLoop();
    console.log('🎮 Game initialized! Sprint 1 MVP ready.');
}

// Start!
init();
