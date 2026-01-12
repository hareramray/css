/**
 * CSS Display Properties Demo - JavaScript
 * Block vs Inline vs Inline-Block
 */

// ============================================
// Mode Switching (Filter Demo Cards)
// ============================================
function setMode(mode) {
    // Update button states
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Update card visibility
    const cards = document.querySelectorAll('.demo-card');
    cards.forEach(card => {
        if (mode === 'all') {
            card.classList.remove('hidden');
        } else {
            if (card.dataset.type === mode) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// ============================================
// Live Playground
// ============================================
function updatePlayground() {
    const displayType = document.getElementById('displaySelect').value;
    const width = document.getElementById('widthSlider').value;
    const height = document.getElementById('heightSlider').value;
    const margin = document.getElementById('marginSlider').value;

    // Update value displays
    document.getElementById('widthValue').textContent = width + 'px';
    document.getElementById('heightValue').textContent = height + 'px';
    document.getElementById('marginValue').textContent = margin + 'px';

    // Get playground elements
    const elements = document.querySelectorAll('.playground-element');

    elements.forEach(el => {
        el.style.display = displayType;

        // Width and height only work for block and inline-block
        if (displayType === 'inline') {
            el.style.width = 'auto';
            el.style.height = 'auto';
            // Inline elements can't have vertical margin
            el.style.margin = `0 ${margin}px`;
        } else {
            el.style.width = width + 'px';
            el.style.height = height + 'px';
            el.style.margin = margin + 'px';
        }

        // Update gradient color based on display type
        switch (displayType) {
            case 'block':
                el.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)';
                break;
            case 'inline':
                el.style.background = 'linear-gradient(135deg, #f43f5e, #ec4899, #f472b6)';
                break;
            case 'inline-block':
                el.style.background = 'linear-gradient(135deg, #10b981, #06b6d4, #22d3ee)';
                break;
        }
    });

    // Update generated code
    updateGeneratedCode(displayType, width, height, margin);
}

function updateGeneratedCode(displayType, width, height, margin) {
    const codeElement = document.getElementById('generatedCode');

    let code = '';

    if (displayType === 'inline') {
        code = `<span class="code-selector">.element</span> {
  <span class="code-property">display</span>: <span class="code-value">${displayType}</span>;
  <span class="code-comment">/* width: ${width}px; - IGNORED */</span>
  <span class="code-comment">/* height: ${height}px; - IGNORED */</span>
  <span class="code-property">margin</span>: <span class="code-value">0 ${margin}px</span>;
  <span class="code-comment">/* vertical margin IGNORED */</span>
}`;
    } else {
        code = `<span class="code-selector">.element</span> {
  <span class="code-property">display</span>: <span class="code-value">${displayType}</span>;
  <span class="code-property">width</span>: <span class="code-value">${width}px</span>;
  <span class="code-property">height</span>: <span class="code-value">${height}px</span>;
  <span class="code-property">margin</span>: <span class="code-value">${margin}px</span>;
}`;
    }

    codeElement.innerHTML = code;
}

// ============================================
// Element Management (Add/Remove)
// ============================================
let elementCounter = 3; // Starting count

function addElement() {
    const preview = document.getElementById('playgroundPreview');
    const elements = preview.querySelectorAll('.playground-element');

    // Limit to max 10 elements
    if (elements.length >= 10) {
        shakeButton('.add-btn');
        return;
    }

    elementCounter++;

    // Create new element
    const newElement = document.createElement('div');
    newElement.className = 'playground-element';
    newElement.textContent = `Element ${elementCounter}`;

    // Add entrance animation
    newElement.style.opacity = '0';
    newElement.style.transform = 'scale(0.5)';

    preview.appendChild(newElement);

    // Trigger animation
    requestAnimationFrame(() => {
        newElement.style.transition = 'all 0.3s ease';
        newElement.style.opacity = '1';
        newElement.style.transform = 'scale(1)';
    });

    // Update display and count
    updatePlayground();
    updateElementCount();
}

function removeElement() {
    const preview = document.getElementById('playgroundPreview');
    const elements = preview.querySelectorAll('.playground-element');

    // Keep at least 1 element
    if (elements.length <= 1) {
        shakeButton('.remove-btn');
        return;
    }

    const lastElement = elements[elements.length - 1];

    // Add exit animation
    lastElement.style.transition = 'all 0.3s ease';
    lastElement.style.opacity = '0';
    lastElement.style.transform = 'scale(0.5)';

    setTimeout(() => {
        lastElement.remove();
        updateElementCount();
    }, 300);
}

function updateElementCount() {
    const preview = document.getElementById('playgroundPreview');
    const elements = preview.querySelectorAll('.playground-element');
    const countDisplay = document.getElementById('elementCount');

    if (countDisplay) {
        countDisplay.textContent = elements.length;

        // Add pulse animation
        countDisplay.style.transform = 'scale(1.3)';
        countDisplay.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            countDisplay.style.transform = 'scale(1)';
        }, 200);
    }

    // Update button states
    const addBtn = document.querySelector('.add-btn');
    const removeBtn = document.querySelector('.remove-btn');

    if (addBtn) {
        addBtn.disabled = elements.length >= 10;
    }
    if (removeBtn) {
        removeBtn.disabled = elements.length <= 1;
    }
}

function shakeButton(selector) {
    const btn = document.querySelector(selector);
    if (btn) {
        btn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
    }
}

// ============================================
// Add Hover Effects to Demo Elements
// ============================================
function addHoverEffects() {
    // Block elements hover effect
    const blockElements = document.querySelectorAll('.block-element');
    blockElements.forEach((el, index) => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.02) translateX(10px)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1) translateX(0)';
        });
    });

    // Inline-block elements hover effect
    const inlineBlockElements = document.querySelectorAll('.inline-block-element');
    inlineBlockElements.forEach((el, index) => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-5px) scale(1.05)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// Initialize Intersection Observer for Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
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
    const sections = document.querySelectorAll('.comparison-section, .playground-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// Add Ripple Effect to Buttons
// ============================================
function addRippleEffect() {
    const buttons = document.querySelectorAll('.control-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        
        .code-selector { color: #f97316; }
        .code-property { color: #38bdf8; }
        .code-value { color: #a78bfa; }
        .code-comment { color: #64748b; font-style: italic; }
    `;
    document.head.appendChild(style);
}

// ============================================
// Add Keyboard Navigation
// ============================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
            return;
        }

        switch (e.key) {
            case '1':
                setMode('block');
                break;
            case '2':
                setMode('inline');
                break;
            case '3':
                setMode('inline-block');
                break;
            case '0':
            case 'Escape':
                setMode('all');
                break;
            case '+':
            case '=':
                addElement();
                break;
            case '-':
            case '_':
                removeElement();
                break;
        }
    });
}

// ============================================
// Tooltip System
// ============================================
function initTooltips() {
    const tooltipData = {
        '.block-element': 'Block elements take 100% width and stack vertically',
        '.inline-element': 'Inline elements flow with text and ignore width/height',
        '.inline-block-element': 'Inline-block combines inline flow with block sizing'
    };

    for (const [selector, text] of Object.entries(tooltipData)) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.setAttribute('title', text);
        });
    }
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize playground with default values
    updatePlayground();

    // Add interactive effects
    addHoverEffects();
    addRippleEffect();
    initScrollAnimations();
    initKeyboardNavigation();
    initTooltips();

    // Add smooth reveal animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    console.log('🎨 CSS Display Properties Demo Loaded!');
    console.log('💡 Keyboard shortcuts: 1=Block, 2=Inline, 3=Inline-Block, 0/Esc=All, +/- = Add/Remove Elements');
});
