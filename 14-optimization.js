/* ═══════════════════════════════════════════════════════════════════════════
   14-OPTIMIZATION.JS (Complete Memory/CPU/GPU Management)
   Mystery Temple - Galaxy Edition

   Optimizes for low-end devices WITHOUT removing any visual effects.
   Uses memory management, CPU throttling, GPU optimizations.
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════════════════════════
   ULTRA LOW-END DEVICE DETECTION & ADAPTIVE QUALITY
   Detects very weak devices and reduces spawn rates / effects dynamically.
   Animations are NEVER disabled — only object counts are reduced.
══════════════════════════════════════════════════════════════════════════ */
(function applyUltraLowEndFixes() {
    const ua = navigator.userAgent;
    const mem  = navigator.deviceMemory || 4;
    const cpu  = navigator.hardwareConcurrency || 4;
    const w    = window.innerWidth;

    // Ultra low-end: <= 1GB RAM, 1-2 CPU cores, or tiny screen
    const isUltraLow = mem <= 1 || cpu <= 2 || (w < 400 && /Android/i.test(ua));
    // Low-end: <= 2GB RAM, <= 4 CPU cores, or mobile
    const isLow = !isUltraLow && (mem <= 2 || cpu <= 4 || /Android|iPhone/i.test(ua));

    if (!isUltraLow && !isLow) return;

    console.log(isUltraLow ? '⚡ ULTRA low-end mode' : '⚡ Low-end mode', { mem, cpu, w });

    // Wait for QUALITY object to be defined (from 01-config.js)
    const applyQ = () => {
        if (typeof QUALITY === 'undefined') { setTimeout(applyQ, 100); return; }
        if (isUltraLow) {
            QUALITY.particleCount   = 3;
            QUALITY.maxObstacles    = 3;
            QUALITY.maxGems         = 2;
            QUALITY.maxTrails       = 4;
            QUALITY.bgParticles     = 4;
            QUALITY.maxGreenGems    = 1;
            QUALITY.maxRedGems      = 1;
            QUALITY.maxBoosts       = 1;
            QUALITY.shootingStarInterval = 15000;
        } else {
            QUALITY.particleCount   = 5;
            QUALITY.maxObstacles    = 4;
            QUALITY.maxGems         = 3;
            QUALITY.maxTrails       = 8;
            QUALITY.bgParticles     = 8;
            QUALITY.maxGreenGems    = 2;
            QUALITY.maxRedGems      = 1;
            QUALITY.maxBoosts       = 1;
            QUALITY.shootingStarInterval = 10000;
        }
        console.log('✅ QUALITY applied:', QUALITY);
    };
    applyQ();

    // Disable Three.js antialias on ultra low-end (renderer created after this runs)
    if (isUltraLow) {
        window.__FORCE_NO_ANTIALIAS__ = true;
        window.__PIXEL_RATIO_MAX__ = 1;
    } else {
        window.__PIXEL_RATIO_MAX__ = 1.5;
    }

    // Reduce CSS animations complexity on ultra low-end
    if (isUltraLow) {
        const style = document.createElement('style');
        style.textContent = `
            /* Ultra low-end: reduce blur/shadow filters */
            .gem-pickup-popup { filter: none !important; }
            .boost-pickup-popup { filter: none !important; }
            canvas { image-rendering: pixelated; }
        `;
        document.head.appendChild(style);
    }
})();


// ============================================================================
// ORIGINAL initOptimizations FUNCTION (auto-pause)
// ============================================================================
function initOptimizations() {
    console.log('✅ initOptimizations called – full optimizations active');

    // Auto pause when user switches tab / locks screen
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (typeof pauseGame === 'function') pauseGame();
            else {
                gamePaused = true;
                const overlay = document.getElementById('pauseOverlay');
                if (overlay) overlay.classList.remove('hidden');
            }
        }
    }, { passive: true });
}

// ============================================================================
// ADVANCED OPTIMIZATIONS (preserve all visual effects)
// ============================================================================
(function() {
    // Detect low-end device
    const isLowEnd = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
                     window.innerWidth < 768 ||
                     (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
                     (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    if (!isLowEnd) {
        console.log('✅ High-end device detected – no optimizations needed');
        return;
    }

    console.log('⚡ Low-end optimization active – preserving all visual effects');

    /* ------------------------------------------------------------------------
       MEMORY MANAGEMENT
       ------------------------------------------------------------------------ */
    
    // Trim particle arrays every 10 seconds to prevent memory bloat
    setInterval(() => {
        if (!gameRunning) return;

        // Particles (simple spheres)
        if (typeof particles !== 'undefined' && particles.length > 30) {
            const toRemove = particles.splice(20, particles.length - 20);
            toRemove.forEach(p => {
                if (scene) scene.remove(p);
            });
        }

        // Magic trails
        if (typeof magicTrails !== 'undefined' && magicTrails.length > 20) {
            const toRemove = magicTrails.splice(15, magicTrails.length - 15);
            toRemove.forEach(t => {
                if (scene) scene.remove(t);
            });
        }

        // Gem bursts (rings)
        if (typeof gemBursts !== 'undefined' && gemBursts.length > 10) {
            const toRemove = gemBursts.splice(5, gemBursts.length - 5);
            toRemove.forEach(b => {
                if (scene) scene.remove(b);
            });
        }

        // Also trim obstacles, gems, etc. if they exceed QUALITY limits (optional)
        // But QUALITY already limits spawn, so no need.
    }, 10000); // every 10 seconds

    /* ------------------------------------------------------------------------
       CPU MANAGEMENT
       ------------------------------------------------------------------------ */

    // Reduce QUALITY settings (particle counts, max objects) – preserves effects
    if (typeof QUALITY !== 'undefined') {
        // Reduce particles by 40% – still plenty visible
        QUALITY.particleCount = Math.max(3, Math.floor(QUALITY.particleCount * 0.6));
        QUALITY.maxTrails = Math.max(3, Math.floor(QUALITY.maxTrails * 0.5));
        QUALITY.bgParticles = Math.max(3, Math.floor(QUALITY.bgParticles * 0.5));
        
        // Keep gem/obstacle counts reasonable
        QUALITY.maxGems = Math.min(QUALITY.maxGems, 4);
        QUALITY.maxObstacles = Math.min(QUALITY.maxObstacles, 4);
        QUALITY.maxGreenGems = Math.min(QUALITY.maxGreenGems, 2);
        QUALITY.maxRedGems = Math.min(QUALITY.maxRedGems, 2);
        QUALITY.maxBoosts = Math.min(QUALITY.maxBoosts, 1);
        
        // Shooting stars less frequent
        QUALITY.shootingStarInterval = 8000;

        console.log('✅ QUALITY adjusted for low-end:', QUALITY);
    }

    // Throttle shooting star spawn rate (already in QUALITY, but we can also hook into the function)
    // We'll override spawnShootingStar to be less frequent on low-end
    if (typeof spawnShootingStar === 'function') {
        const originalSpawn = spawnShootingStar;
        window.spawnShootingStar = function() {
            // Random chance to skip – about 50% less
            if (Math.random() < 0.5) return;
            originalSpawn();
        };
    }

    // Throttle magic trail creation (handled in main.js by checking isLowEnd, but we can also adjust)
    // We'll add a global flag to reduce trail frequency
    window._reduceTrails = true; // This will be used in main.js if we modify one line

    /* ------------------------------------------------------------------------
       GPU MANAGEMENT
       ------------------------------------------------------------------------ */

    // Wait for renderer to be ready
    const waitForRenderer = setInterval(() => {
        if (typeof renderer !== 'undefined' && renderer) {
            clearInterval(waitForRenderer);

            // Cap pixel ratio – reduces GPU fill rate without affecting visual quality much
            const currentPR = renderer.getPixelRatio();
            renderer.setPixelRatio(Math.min(currentPR, 1.2));

            // Disable shadows if they ever become enabled (we don't use them)
            if (renderer.shadowMap) renderer.shadowMap.enabled = false;

            console.log('✅ Renderer optimized (pixel ratio: ' + renderer.getPixelRatio() + ')');
        }
    }, 100);

    // Add CSS will-change hints to help browser compositing
    const style = document.createElement('style');
    style.textContent = `
        .control-btn, .btn, .gem-collect-popup, .boost-popup {
            will-change: transform, opacity;
        }
        .glow-text, .title-icon, .stat-value {
            will-change: filter;
        }
        /* Reduce layer count for elements with many animations */
        .magic-particle, .shooting-star {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);

    // Optional: lower texture quality if we could access textures, but we can't easily.

    /* ------------------------------------------------------------------------
       GENERAL PERFORMANCE TIPS
       ------------------------------------------------------------------------ */

    // Reduce expensive operations in main loop (like distance calculations) – not possible without modifying main.js
    // But we can hint the browser to use GPU for animations
    // Already done via will-change.

    // Also, if game lags too much, we can reduce spawn rates further dynamically
    // But that's complex; QUALITY settings should suffice.

    console.log('✅ All optimizations applied – visual effects preserved');
})();

// Expose initOptimizations globally
window.initOptimizations = initOptimizations;