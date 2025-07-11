// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化图片懒加载
    initLazyLoading();
    
    // 初始化页面特定功能
    initPortfolioFeatures();
    initContactForm();
    initSocialLinks();
    // 新增：初始化作品图片粒子动画
    initWorkImageParticles();
    // 新增：初始化首页轮播图
    initWorkSlider();
    // 新增：初始化平面作品画框轮播
    initGalleryFrameSlider();
});

// 页面动画初始化
function initPageAnimations() {
    // 为需要动画的元素添加fade-in类
    const animatedElements = document.querySelectorAll('.work-item, .skill-category, .section-header');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 触发动画
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
}

// 滚动效果初始化
function initScrollEffects() {
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景透明度变化
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 图片懒加载初始化
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // 降级处理：直接加载所有图片
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// 工具函数：防抖
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 页面加载动画
window.addEventListener('load', function() {
    // 页面完全加载后的动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 控制台日志（开发环境）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('艺术作品集网站已加载完成');
    console.log('当前页面:', window.location.pathname);
}

// 作品集页面功能
function initPortfolioFeatures() {
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // 更新按钮状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 筛选作品
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 作品详情模态框
    const modal = document.getElementById('projectModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        const portfolioLinks = document.querySelectorAll('.portfolio-link');

        // 打开模态框
        portfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 获取项目数据
                const projectData = getProjectData(this.closest('.portfolio-item'));
                
                // 更新模态框内容
                updateModalContent(projectData);
                
                // 显示模态框
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // 关闭模态框
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// 获取项目数据
function getProjectData(portfolioItem) {
    // 获取项目序号（1~6）
    const imgEl = portfolioItem.querySelector('.portfolio-image img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const title = portfolioItem.querySelector('.portfolio-info h3').textContent;
    const category = portfolioItem.querySelector('.portfolio-info p').textContent;
    const categoryType = portfolioItem.getAttribute('data-category');
    return {
        title: title,
        category: category,
        categoryType: categoryType,
        date: '2025年',
        images: [imgSrc]
    };
}

// 更新模态框内容
function updateModalContent(data) {
    const modal = document.getElementById('projectModal');
    // 更新标题
    modal.querySelector('.project-info h2').textContent = data.title;
    // 更新分类和日期
    const projectMeta = modal.querySelector('.project-meta');
    projectMeta.innerHTML = `
        <span class="project-category">${data.category}</span>
        <span class="project-date">${data.date}</span>
    `;
    // 清空描述
    const projectDescription = modal.querySelector('.project-description');
    projectDescription.innerHTML = '';
    // 更新图片
    if (data.images && data.images.length > 0) {
        const projectGallery = modal.querySelector('.project-gallery img');
        projectGallery.src = data.images[0];
        projectGallery.alt = data.title;
        // 添加悬浮动画类
        projectGallery.classList.remove('enlarge-animate');
        setTimeout(()=>{
            projectGallery.classList.add('enlarge-animate');
        }, 10);
    }
}

// 联系表单功能
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // 实时表单验证
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });

        // 字符计数（用于项目描述）
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', function() {
                const length = this.value.length;
                const minLength = 20;
                
                // 更新字符计数
                let counter = this.parentNode.querySelector('.char-counter');
                if (!counter) {
                    counter = document.createElement('div');
                    counter.className = 'char-counter';
                    counter.style.cssText = `
                        font-size: 12px;
                        color: #666;
                        text-align: right;
                        margin-top: 5px;
                    `;
                    this.parentNode.appendChild(counter);
                }
                
                counter.textContent = `${length}/${minLength} 字符`;
                
                // 颜色变化
                if (length >= minLength) {
                    counter.style.color = '#27ae60';
                } else {
                    counter.style.color = '#666';
                }
            });
        }

        // 项目类型选择联动
        const projectTypeSelect = document.getElementById('project-type');
        const budgetSelect = document.getElementById('budget');
        
        if (projectTypeSelect && budgetSelect) {
            projectTypeSelect.addEventListener('change', function() {
                const projectType = this.value;
                
                // 重置预算选择
                budgetSelect.value = '';
                
                // 根据项目类型设置默认预算范围
                if (projectType === 'ui-design' || projectType === 'ux-design') {
                    budgetSelect.querySelector('option[value="10k-50k"]').selected = true;
                } else if (projectType === 'brand-design') {
                    budgetSelect.querySelector('option[value="under-10k"]').selected = true;
                } else if (projectType === 'web-design') {
                    budgetSelect.querySelector('option[value="50k-100k"]').selected = true;
                }
            });
        }
    }
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // 验证所有字段
    if (!validateForm(form)) {
        return;
    }
    
    // 显示提交状态
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟表单提交
    setTimeout(() => {
        showSuccessMessage('消息发送成功！我会在24小时内回复您。');
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// 表单验证
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 字段验证
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // 清除之前的错误
    clearFieldError(e);
    
    // 必填字段验证
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, '此字段为必填项');
        return false;
    }
    
    // 邮箱验证
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, '181241735@qq.com');
            return false;
        }
    }
    
    // 项目描述长度验证
    if (fieldName === 'message' && value) {
        if (value.length < 20) {
            showFieldError(field, '项目描述至少需要20个字符');
            return false;
        }
    }
    
    return true;
}

// 显示字段错误
function showFieldError(field, message) {
    // 移除之前的错误信息
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误样式
    field.style.borderColor = '#e74c3c';
    
    // 创建错误信息元素
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    // 插入错误信息
    field.parentNode.appendChild(errorElement);
}

// 清除字段错误
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '#e5e5e5';
}

// 显示成功消息
function showSuccessMessage(message) {
    // 创建成功消息元素
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    successElement.textContent = message;
    
    // 添加到页面
    document.body.appendChild(successElement);
    
    // 3秒后自动移除
    setTimeout(() => {
        successElement.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.parentNode.removeChild(successElement);
            }
        }, 300);
    }, 3000);
}

// 社交媒体链接处理
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.querySelector('span:last-child').textContent;
            showSocialInfo(platform);
        });
    });
}

// 显示社交媒体信息
function showSocialInfo(platform) {
    const messages = {
        '微信': '搜索微信号：WeChat：liang_liang_ren',
        
        'Instagram': '关注我的Instagram：@liangliang_goodlighthuman'
    };
    
    const message = messages[platform] || 'liangliangren001@gmail.com';
    showSuccessMessage(message);
}

// 粒子动画函数
function createParticle(x, y, parent) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 8 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x - size/2}px`;
    particle.style.top = `${y - size/2}px`;
    particle.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
    particle.style.opacity = 1;
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';
    particle.style.borderRadius = '50%';
    particle.style.zIndex = 10;
    parent.appendChild(particle);
    // 动画
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 60 + 30;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    particle.animate([
        { transform: 'translate(0,0)', opacity: 1 },
        { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }
    ], {
        duration: 700 + Math.random()*300,
        easing: 'cubic-bezier(.61,-0.01,.5,1.01)'
    });
    setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 900);
}

function initWorkImageParticles() {
    const workImages = document.querySelectorAll('.work-image');
    workImages.forEach(imgBox => {
        imgBox.style.position = 'relative'; // 保证粒子定位
        imgBox.addEventListener('click', function(e) {
            // 计算点击位置（相对于imgBox）
            const rect = imgBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // 生成多个粒子
            for(let i=0;i<18;i++) {
                createParticle(x, y, imgBox);
            }
        });
    });
}

function initWorkSlider() {
    const sliders = document.querySelectorAll('.work-slider');
    sliders.forEach(slider => {
        const imgs = slider.querySelectorAll('img');
        let idx = 0;
        if (imgs.length === 0) return;
        imgs.forEach((img, i) => img.classList.toggle('active', i === 0));
        setInterval(() => {
            imgs[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
        }, 2500);
    });
}

function initGalleryFrameSlider() {
    const galleries = document.querySelectorAll('.work-gallery');
    galleries.forEach(gallery => {
        const frames = gallery.querySelectorAll('.gallery-frame');
        let idx = 0;
        if (frames.length === 0) return;
        frames.forEach((f, i) => f.classList.toggle('active', i === 0));
        setInterval(() => {
            frames[idx].classList.remove('active');
            idx = (idx + 1) % frames.length;
            frames[idx].classList.add('active');
        }, 2500);
        // 点击放大功能
        frames.forEach(frame => {
            frame.addEventListener('click', function(e) {
                if (frame.classList.contains('enlarged')) return;
                // 创建遮罩
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                document.body.appendChild(overlay);
                // 放大图片
                frame.classList.add('enlarged');
                // 关闭放大
                function closeEnlarge() {
                    frame.classList.remove('enlarged');
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    document.removeEventListener('keydown', escListener);
                }
                overlay.addEventListener('click', closeEnlarge);
                // ESC关闭
                function escListener(e) {
                    if (e.key === 'Escape') closeEnlarge();
                }
                document.addEventListener('keydown', escListener);
            });
        });
    });
}

// 动态插入 image01 文件夹下的图片
(function(){
    const imageCount = 2; // image01/1.JPG, 2.JPG
    const imageBase = 'image/image01/';
    const imageExts = ['JPG', 'JPG']; // 按实际文件名顺序填写
    const container = document.getElementById('yesterday-world-images');
    if (!container) return;
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imageBase}${i}.${imageExts[i-1]}`;
        img.alt = `昨日世界${i}`;
        img.className = 'zoomable-img';
        container.appendChild(img);
    }

    // 放大图片功能
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.classList.add('active');
            modalImg.src = e.target.src;
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
})();

// 动态插入 image02 文件夹下的图片
(function(){
    const imageCount = 2; // image02/1.JPG, 2.jpg
    const imageBase = 'image/image02/';
    const imageExts = ['JPG', 'jpg']; // 按实际文件名顺序填写
    const container = document.getElementById('arm-spirit-images');
    if (!container) return;
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imageBase}${i}.${imageExts[i-1]}`;
        img.alt = `成精的手臂${i}`;
        img.className = 'zoomable-img';
        container.appendChild(img);
    }

    // 放大图片功能
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.classList.add('active');
            modalImg.src = e.target.src;
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
})();

// 动态插入 image03 文件夹下的图片
(function(){
    const imageCount = 2; // image03/1.jpg, 2.JPG
    const imageBase = 'image/image03/';
    const imageExts = ['jpg', 'JPG']; // 按实际文件名顺序填写
    const container = document.getElementById('paper-waves-images');
    if (!container) return;
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imageBase}${i}.${imageExts[i-1]}`;
        img.alt = `纸上云波${i}`;
        img.className = 'zoomable-img';
        container.appendChild(img);
    }

    // 放大图片功能
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.classList.add('active');
            modalImg.src = e.target.src;
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
})();

// 动态插入 image04 文件夹下的图片
(function(){
    const imageCount = 2; // image04/1.jpg, 2.JPG
    const imageBase = 'image/image04/';
    const imageExts = ['jpg', 'JPG']; // 按实际文件名顺序填写
    const container = document.getElementById('sea-god-images');
    if (!container) return;
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imageBase}${i}.${imageExts[i-1]}`;
        img.alt = `遛海遗神${i}`;
        img.className = 'zoomable-img';
        container.appendChild(img);
    }

    // 放大图片功能
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.classList.add('active');
            modalImg.src = e.target.src;
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
})();

// 动态插入 image05 文件夹下的图片
(function(){
    const imageCount = 2; // image05/1.JPG, 2.jpg
    const imageBase = 'image/image05/';
    const imageExts = ['JPG', 'jpg']; // 按实际文件名顺序填写
    const container = document.getElementById('blue-dizziness-images');
    if (!container) return;
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imageBase}${i}.${imageExts[i-1]}`;
        img.alt = `蓝色眩晕${i}`;
        img.className = 'zoomable-img';
        container.appendChild(img);
    }

    // 放大图片功能
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.classList.add('active');
            modalImg.src = e.target.src;
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });
})();

// 动态插入 image06 文件夹下的图片（平面作品）
(function(){
    const imageCount = 2; // image06/1.JPG, 2.JPG
    const imageBase = 'image/image06/';
    const imageExts = ['JPG', 'JPG'];
    const container = document.getElementById('plane-works-images');
    if (!container) return;
    container.style.display = 'flex';
    container.style.gap = '12px';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '180px';
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${imageBase}${i}.${imageExts[i-1]}`;
        img.alt = `平面作品${i}`;
        img.className = 'zoomable-img';
        img.style.flex = '1 1 0';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '12px';
        img.style.cursor = 'pointer';
        img.style.transition = 'box-shadow 0.3s, transform 0.3s';
        img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        img.addEventListener('mouseenter',()=>{
            img.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
            img.style.transform = 'scale(1.04)';
        });
        img.addEventListener('mouseleave',()=>{
            img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            img.style.transform = 'none';
        });
        container.appendChild(img);
    }
    // 放大图片功能
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modal.classList.add('active');
            modalImg.src = e.target.src;
            modalImg.style.animation = 'floatUpDown 2.5s infinite alternate ease-in-out';
        }
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
            modalImg.style.animation = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            modalImg.src = '';
            modalImg.style.animation = '';
        }
    });
})();

// 添加动画样式
const additionalStyles = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.particle {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    will-change: transform, opacity;
    box-shadow: 0 0 8px rgba(0,0,0,0.08);
}
`;