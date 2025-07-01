// 多语言内容
const langData = {
  zh: {
    title: '艺术家作品集',
    intro: '欢迎来到我的极简主义艺术作品展示网站。',
    artworks: [
      { title: '作品一', desc: '极简主义画作。' },
      { title: '作品二', desc: '抽象艺术。' }
    ]
  },
  en: {
    title: 'Art Portfolio',
    intro: 'Welcome to my minimalist art portfolio website.',
    artworks: [
      { title: 'Artwork 1', desc: 'A minimalist painting.' },
      { title: 'Artwork 2', desc: 'Abstract art.' }
    ]
  }
};

const btnZh = document.getElementById('lang-zh');
const btnEn = document.getElementById('lang-en');
const siteTitle = document.getElementById('site-title');
const introText = document.getElementById('intro-text');
const artworks = document.querySelectorAll('.artwork');

function setLang(lang) {
  siteTitle.textContent = langData[lang].title;
  introText.textContent = langData[lang].intro;
  artworks.forEach((art, i) => {
    art.querySelector('.art-title').textContent = langData[lang].artworks[i].title;
    art.querySelector('.art-desc').textContent = langData[lang].artworks[i].desc;
  });
  if (lang === 'zh') {
    btnZh.classList.add('active');
    btnEn.classList.remove('active');
    document.documentElement.lang = 'zh';
  } else {
    btnEn.classList.add('active');
    btnZh.classList.remove('active');
    document.documentElement.lang = 'en';
  }
}

btnZh.addEventListener('click', () => setLang('zh'));
btnEn.addEventListener('click', () => setLang('en'));

// 初始动画效果
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.artwork').forEach((el, i) => {
    el.style.animationDelay = (i * 0.15) + 's';
  });
});

// 按钮点击动画
[btnZh, btnEn].forEach(btn => {
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.92)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = '';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// 塞尔达传说风格 - 交互式功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initZeldaWebsite();
});

function initZeldaWebsite() {
    // 初始化按钮交互
    initButtonInteractions();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化导航交互
    initNavigation();
    
    // 初始化鼠标轨迹效果
    initMouseTrail();
    
    // 初始化音效模拟
    initSoundEffects();
    
    // 初始化响应式功能
    initResponsiveFeatures();
}

// 按钮交互功能
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.zelda-btn');
    
    buttons.forEach(button => {
        // 点击效果
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 创建点击波纹效果
            createRippleEffect(e, button);
            
            // 播放按钮音效
            playButtonSound();
            
            // 按钮动作处理
            handleButtonAction(this.dataset.action);
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // 悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            playHoverSound();
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 创建波纹效果
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 按钮动作处理
function handleButtonAction(action) {
    switch(action) {
        case 'start-adventure':
            showAdventureModal('准备开始你的冒险之旅！');
            break;
        case 'explore-world':
            showAdventureModal('探索海拉鲁的神秘世界！');
            break;
        default:
            // 处理卡片按钮
            if (action) {
                showAdventureModal(`进入${action}区域！`);
            }
    }
}

// 显示冒险模态框
function showAdventureModal(message) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'zelda-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>冒险提示</h3>
                <button class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="zelda-btn primary-btn">确认</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.modal-close');
    const confirmBtn = modal.querySelector('.zelda-btn');
    
    [closeBtn, confirmBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.adventure-card, .character-item, .map-region');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 导航交互
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时高亮当前导航
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 鼠标轨迹效果
function initMouseTrail() {
    let trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';
        dot.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: var(--zelda-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.8;
        `;
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        // 限制轨迹长度
        if (trail.length > maxTrailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }
        
        // 淡出效果
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
            setTimeout(() => {
                dot.remove();
                trail = trail.filter(d => d !== dot);
            }, 300);
        }, 100);
    });
}

// 音效模拟
function initSoundEffects() {
    // 创建音频上下文（需要用户交互才能播放）
    let audioContext = null;
    
    function createAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    // 播放按钮音效
    window.playButtonSound = function() {
        createAudioContext();
        if (audioContext && audioContext.state === 'running') {
            playTone(800, 0.1, 'sine');
        }
    };
    
    // 播放悬停音效
    window.playHoverSound = function() {
        createAudioContext();
        if (audioContext && audioContext.state === 'running') {
            playTone(600, 0.05, 'triangle');
        }
    };
    
    // 播放音调
    function playTone(frequency, duration, type) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // 用户首次交互时启用音效
    document.addEventListener('click', createAudioContext, { once: true });
}

// 响应式功能
function initResponsiveFeatures() {
    // 移动端菜单切换
    const createMobileMenu = () => {
        const header = document.querySelector('.zelda-header');
        const nav = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: var(--zelda-gold);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            header.querySelector('.header-content').appendChild(toggle);
            
            toggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
                toggle.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
            });
        }
    };
    
    // 监听窗口大小变化
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
    
    // 触摸设备优化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // 为触摸设备添加特殊样式
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .zelda-btn {
                min-height: 44px;
                min-width: 44px;
            }
            
            .touch-device .nav-link {
                padding: 0.8rem 1rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .zelda-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .zelda-modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: linear-gradient(135deg, var(--zelda-green), var(--zelda-accent));
        border: 3px solid var(--zelda-gold);
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }
    
    .zelda-modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        border-bottom: 2px solid var(--zelda-gold);
        padding-bottom: 1rem;
    }
    
    .modal-header h3 {
        color: var(--zelda-gold);
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--zelda-gold);
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-body {
        margin-bottom: 1.5rem;
    }
    
    .modal-body p {
        color: var(--zelda-light);
        font-size: 1.1rem;
        line-height: 1.6;
    }
    
    .modal-footer {
        text-align: center;
    }
    
    .adventure-card,
    .character-item,
    .map-region {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .adventure-card.animate-in,
    .character-item.animate-in,
    .map-region.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: var(--zelda-gold);
        background: rgba(255, 215, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block !important;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--zelda-green);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            border-top: 2px solid var(--zelda-gold);
        }
        
        .nav-menu.mobile-open {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// 页面加载完成后的初始化动画
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 延迟显示内容
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
});

// 添加页面加载样式
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(loadStyle); 