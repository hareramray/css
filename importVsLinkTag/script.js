// ===== DOM Elements =====
const startDemoBtn = document.getElementById('startDemo');
const resetDemoBtn = document.getElementById('resetDemo');
const tabBtns = document.querySelectorAll('.tab-btn');
const demoPanels = document.querySelectorAll('.demo-panel');

// ===== Loading Demo Animation =====
let isAnimating = false;

function animateLoadingDemo() {
    if (isAnimating) return;
    isAnimating = true;

    // Reset first
    resetLoadingDemo();

    // Get elements
    const importProgress = document.querySelectorAll('.import-loading .progress');
    const linkProgress = document.querySelectorAll('.link-loading .progress');
    const importTime = document.querySelector('.import-time');
    const linkTime = document.querySelector('.link-time');
    const importStatus = document.querySelector('.import-loading .loading-status');
    const linkStatus = document.querySelector('.link-loading .loading-status');
    const importStatusText = importStatus.querySelector('.status-text');
    const linkStatusText = linkStatus.querySelector('.status-text');

    // Set active status
    importStatus.className = 'loading-status active';
    linkStatus.className = 'loading-status active';
    importStatusText.textContent = 'Loading...';
    linkStatusText.textContent = 'Loading...';

    // Timing configs (in ms)
    const importTimes = [300, 400, 350, 450]; // Sequential delays
    const linkMaxTime = 450; // All load in parallel, takes max time

    // Animate @import (Sequential)
    let importDelay = 0;
    importProgress.forEach((bar, index) => {
        importDelay += importTimes[index];
        setTimeout(() => {
            bar.style.width = '100%';
            // Update time display progressively
            const currentTotal = importTimes.slice(0, index + 1).reduce((a, b) => a + b, 0);
            importTime.textContent = currentTotal + 'ms';
        }, importDelay);
    });

    // Calculate total import time
    const totalImportTime = importTimes.reduce((a, b) => a + b, 0);
    setTimeout(() => {
        importStatus.className = 'loading-status complete';
        importStatusText.textContent = 'Complete (Sequential)';
    }, totalImportTime + 100);

    // Animate <link> (Parallel)
    linkProgress.forEach((bar, index) => {
        const randomTime = 200 + Math.random() * 250; // Random between 200-450ms
        setTimeout(() => {
            bar.style.width = '100%';
        }, randomTime);
    });

    // Link completes when all are done (simulated as max time)
    setTimeout(() => {
        linkTime.textContent = linkMaxTime + 'ms';
        linkStatus.className = 'loading-status complete';
        linkStatusText.textContent = 'Complete (Parallel)';
        isAnimating = false;
    }, linkMaxTime);

    // Speed difference indicator
    setTimeout(() => {
        const speedDiff = totalImportTime - linkMaxTime;
        const speedPercentage = Math.round((speedDiff / totalImportTime) * 100);
        
        // Add speed comparison message
        const existingMsg = document.querySelector('.speed-message');
        if (existingMsg) existingMsg.remove();
        
        const msg = document.createElement('div');
        msg.className = 'speed-message';
        msg.innerHTML = `
            <div class="speed-content glass-card">
                <span class="speed-icon">⚡</span>
                <div class="speed-text">
                    <strong>&lt;link&gt; is ${speedPercentage}% faster!</strong>
                    <p>Saved ${speedDiff}ms by loading files in parallel</p>
                </div>
            </div>
        `;
        msg.style.cssText = `
            margin-top: 24px;
            animation: fadeInUp 0.5s ease;
        `;
        
        const comparisonEl = document.querySelector('.loading-comparison');
        comparisonEl.insertAdjacentElement('afterend', msg);
    }, totalImportTime + 200);
}

function resetLoadingDemo() {
    // Reset progress bars
    document.querySelectorAll('.progress').forEach(bar => {
        bar.style.width = '0';
    });

    // Reset times
    document.querySelector('.import-time').textContent = '0ms';
    document.querySelector('.link-time').textContent = '0ms';

    // Reset status
    const statuses = document.querySelectorAll('.loading-status');
    statuses.forEach(status => {
        status.className = 'loading-status';
        status.querySelector('.status-text').textContent = 'Waiting...';
    });

    // Remove speed message
    const speedMsg = document.querySelector('.speed-message');
    if (speedMsg) speedMsg.remove();

    isAnimating = false;
}

// ===== Tab Switching =====
function switchTab(tabId) {
    // Update buttons
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update panels
    demoPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === tabId);
    });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Header Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 26, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 26, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== Animate Verdict Bars on Scroll =====
const verdictObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.score-fill');
            bars.forEach(bar => {
                // Trigger the CSS transition by setting the width
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
            verdictObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const verdictSection = document.querySelector('.verdict-section');
if (verdictSection) {
    verdictObserver.observe(verdictSection);
}

// ===== Event Listeners =====
if (startDemoBtn) {
    startDemoBtn.addEventListener('click', animateLoadingDemo);
}

if (resetDemoBtn) {
    resetDemoBtn.addEventListener('click', resetLoadingDemo);
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
    });
});

// ===== Hero Card Hover Effects =====
document.querySelectorAll('.hero-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Add dynamic styles for speed message =====
const speedMessageStyles = document.createElement('style');
speedMessageStyles.textContent = `
    .speed-message .speed-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 24px;
        background: rgba(52, 211, 153, 0.1);
        border: 1px solid rgba(52, 211, 153, 0.3);
    }
    .speed-message .speed-icon {
        font-size: 2rem;
    }
    .speed-message .speed-text strong {
        color: #34d399;
        font-size: 1.125rem;
    }
    .speed-message .speed-text p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.875rem;
        margin-top: 4px;
    }
`;
document.head.appendChild(speedMessageStyles);

// ===== Initialize =====
console.log('🎨 CSS @import vs Link Tag Demo loaded!');
console.log('Click "Start Demo" to see the loading difference!');
