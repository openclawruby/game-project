// 🎵 Additional Songs - Sprint 3 Content

const additionalSongs = {
    // Easy Songs
    'twinkle': {
        id: 'twinkle',
        name: 'Twinkle Star',
        difficulty: 'easy',
        bpm: 100,
        category: 'Classic',
        locked: false,
        pattern: [
            { key: 1, time: 0 }, { key: 1, time: 500 },
            { key: 5, time: 1000 }, { key: 5, time: 1500 },
            { key: 6, time: 2000 }, { key: 6, time: 2500 },
            { key: 5, time: 3000 },
            { key: 4, time: 3500 }, { key: 4, time: 4000 },
            { key: 3, time: 4500 }, { key: 3, time: 5000 },
            { key: 2, time: 5500 }, { key: 2, time: 6000 },
            { key: 1, time: 6500 },
        ]
    },
    
    // Medium Songs
    'river': {
        id: 'river',
        name: 'River Flow',
        difficulty: 'medium',
        bpm: 120,
        category: 'Nature',
        locked: false,
        pattern: [
            { key: 1, time: 0 }, { key: 3, time: 250 },
            { key: 5, time: 500 }, { key: 6, time: 750 },
            { key: 5, time: 1000 }, { key: 3, time: 1250 },
            { key: 1, time: 1500 }, { key: 2, time: 1750 },
            { key: 4, time: 2000 }, { key: 6, time: 2250 },
            { key: 5, time: 2500 }, { key: 4, time: 2750 },
            { key: 3, time: 3000 }, { key: 2, time: 3250 },
            { key: 1, time: 3500 }, { key: 3, time: 3750 },
            { key: 5, time: 4000 }, { key: 6, time: 4250 },
            { key: 5, time: 4500 }, { key: 3, time: 4750 },
        ]
    },
    
    // Hard Songs
    'lightning': {
        id: 'lightning',
        name: 'Lightning Storm',
        difficulty: 'hard',
        bpm: 160,
        category: 'Intense',
        locked: false,
        pattern: [
            { key: 1, time: 0 }, { key: 2, time: 187 },
            { key: 3, time: 375 }, { key: 4, time: 562 },
            { key: 5, time: 750 }, { key: 6, time: 937 },
            { key: 5, time: 1125 }, { key: 4, time: 1312 },
            { key: 3, time: 1500 }, { key: 2, time: 1687 },
            { key: 1, time: 1875 }, { key: 3, time: 2062 },
            { key: 5, time: 2250 }, { key: 6, time: 2437 },
            { key: 5, time: 2625 }, { key: 4, time: 2812 },
            { key: 3, time: 3000 }, { key: 2, time: 3187 },
            { key: 1, time: 3375 }, { key: 6, time: 3562 },
            { key: 5, time: 3750 }, { key: 4, time: 3937 },
            { key: 3, time: 4125 }, { key: 2, time: 4312 },
            { key: 1, time: 4500 },
        ]
    },
    
    // New Songs - Sprint 3
    'moonlight': {
        id: 'moonlight',
        name: 'Moonlight Sonata',
        difficulty: 'medium',
        bpm: 110,
        category: 'Classical',
        locked: true,
        unlockCondition: 'river',
        pattern: [
            { key: 3, time: 0 }, { key: 2, time: 400 },
            { key: 1, time: 800 }, { key: 3, time: 1200 },
            { key: 5, time: 1600 }, { key: 4, time: 2000 },
            { key: 3, time: 2400 }, { key: 2, time: 2800 },
            { key: 1, time: 3200 }, { key: 4, time: 3600 },
            { key: 3, time: 4000 }, { key: 2, time: 4400 },
            { key: 1, time: 4800 }, { key: 5, time: 5200 },
            { key: 4, time: 5600 }, { key: 3, time: 6000 },
            { key: 2, time: 6400 }, { key: 1, time: 6800 },
        ]
    },
    
    'happyscale': {
        id: 'happyscale',
        name: 'Happy Scale',
        difficulty: 'easy',
        bpm: 130,
        category: 'Fun',
        locked: true,
        unlockCondition: 'twinkle',
        pattern: [
            { key: 1, time: 0 }, { key: 2, time: 300 },
            { key: 3, time: 600 }, { key: 4, time: 900 },
            { key: 5, time: 1200 }, { key: 6, time: 1500 },
            { key: 5, time: 1800 }, { key: 4, time: 2100 },
            { key: 3, time: 2400 }, { key: 2, time: 2700 },
            { key: 1, time: 3000 }, { key: 3, time: 3300 },
            { key: 5, time: 3600 }, { key: 1, time: 3900 },
            { key: 2, time: 4200 }, { key: 4, time: 4500 },
            { key: 6, time: 4800 }, { key: 3, time: 5100 },
            { key: 5, time: 5400 }, { key: 1, time: 5700 },
        ]
    },
    
    'rockstar': {
        id: 'rockstar',
        name: 'Rock Star',
        difficulty: 'hard',
        bpm: 180,
        category: 'Rock',
        locked: true,
        unlockCondition: 'lightning',
        pattern: [
            { key: 6, time: 0 }, { key: 5, time: 150 },
            { key: 4, time: 300 }, { key: 5, time: 450 },
            { key: 6, time: 600 }, { key: 6, time: 750 },
            { key: 6, time: 900 }, { key: 5, time: 1050 },
            { key: 4, time: 1200 }, { key: 3, time: 1350 },
            { key: 4, time: 1500 }, { key: 5, time: 1650 },
            { key: 4, time: 1800 }, { key: 3, time: 1950 },
            { key: 2, time: 2100 }, { key: 3, time: 2250 },
            { key: 4, time: 2400 }, { key: 5, time: 2550 },
            { key: 6, time: 2700 }, { key: 6, time: 2850 },
            { key: 5, time: 3000 }, { key: 4, time: 3150 },
            { key: 3, time: 3300 }, { key: 2, time: 3450 },
            { key: 1, time: 3600 }, { key: 1, time: 3750 },
            { key: 1, time: 3900 }, { key: 2, time: 4050 },
            { key: 3, time: 4200 }, { key: 4, time: 4350 },
            { key: 5, time: 4500 }, { key: 6, time: 4650 },
        ]
    },
    
    'ocean': {
        id: 'ocean',
        name: 'Ocean Waves',
        difficulty: 'medium',
        bpm: 95,
        category: 'Nature',
        locked: true,
        unlockCondition: 'river',
        pattern: [
            { key: 1, time: 0 }, { key: 3, time: 500 },
            { key: 5, time: 1000 }, { key: 3, time: 1500 },
            { key: 1, time: 2000 }, { key: 2, time: 2500 },
            { key: 4, time: 3000 }, { key: 6, time: 3500 },
            { key: 4, time: 4000 }, { key: 2, time: 4500 },
            { key: 1, time: 5000 }, { key: 3, time: 5500 },
            { key: 5, time: 6000 }, { key: 6, time: 6500 },
            { key: 5, time: 7000 }, { key: 3, time: 7500 },
            { key: 1, time: 8000 },
        ]
    },
    
    'neon': {
        id: 'neon',
        name: 'Neon Nights',
        difficulty: 'hard',
        bpm: 145,
        category: 'Electronic',
        locked: true,
        unlockCondition: 'lightning',
        pattern: [
            { key: 1, time: 0 }, { key: 4, time: 200 },
            { key: 6, time: 400 }, { key: 4, time: 600 },
            { key: 1, time: 800 }, { key: 3, time: 1000 },
            { key: 5, time: 1200 }, { key: 3, time: 1400 },
            { key: 6, time: 1600 }, { key: 4, time: 1800 },
            { key: 2, time: 2000 }, { key: 5, time: 2200 },
            { key: 1, time: 2400 }, { key: 4, time: 2600 },
            { key: 6, time: 2800 }, { key: 3, time: 3000 },
            { key: 5, time: 3200 }, { key: 2, time: 3400 },
            { key: 6, time: 3600 }, { key: 4, time: 3800 },
            { key: 1, time: 4000 }, { key: 3, time: 4200 },
            { key: 5, time: 4400 }, { key: 6, time: 4600 },
            { key: 5, time: 4800 }, { key: 3, time: 5000 },
            { key: 1, time: 5200 },
        ]
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = additionalSongs;
}
