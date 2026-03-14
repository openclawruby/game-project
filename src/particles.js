// ✨ Particle System - Visual Effects for Hits

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 200;
    }
    
    // Create burst effect
    createBurst(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 3 + Math.random() * 4;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.02,
                size: 3 + Math.random() * 4,
                color: color,
                gravity: 0.1
            });
        }
    }
    
    // Create sparkle trail
    createSparkle(x, y, color) {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0.8,
            decay: 0.05,
            size: 2 + Math.random() * 2,
            color: color,
            gravity: 0
        });
    }
    
    // Create combo celebration
    createComboCelebration(x, y, color) {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 1) * 10,
                life: 1.0,
                decay: 0.015,
                size: 4 + Math.random() * 4,
                color: color,
                gravity: 0.2
            });
        }
    }
    
    // Update all particles
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    // Draw all particles
    draw() {
        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    // Clear all particles
    clear() {
        this.particles = [];
    }
}

// Global particle system
let particles = null;

function initParticles(canvas) {
    particles = new ParticleSystem(canvas);
}
