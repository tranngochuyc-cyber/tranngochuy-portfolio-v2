(function(){
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCompact = window.matchMedia('(max-width: 960px)').matches;

  /* 0. Chuyển hướng tương thích ngược các liên kết hash cũ trên trang chính */
  const pageName = (document.body.dataset.page || '').toLowerCase();
  if (pageName === 'home' && window.location.hash) {
    const legacyMap = {
      '#profile': 'profile.html',
      '#about': 'profile.html',
      '#video-studio': 'projects.html?cat=video',
      '#projects': 'projects.html',
      '#experience': 'experience.html',
      '#philosophy': 'philosophy.html',
      '#contact': 'contact.html'
    };
    const dest = legacyMap[window.location.hash];
    if (dest) {
      window.location.replace(dest);
      return;
    }
  }

  /* 1. Tuyết biển nhẹ */
  const cv = document.getElementById('snow');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.75), rafId = 0;
    const count = isCompact ? 38 : 82;
    const parts = Array.from({length: count}, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      v: Math.random() * 0.00028 + 0.00008,
      s: Math.random() * Math.PI * 2,
      bubble: Math.random() < 0.14
    }));
    function resize(){
      W = cv.width = Math.floor(innerWidth * dpr);
      H = cv.height = Math.floor(innerHeight * dpr);
      cv.style.width = innerWidth + 'px';
      cv.style.height = innerHeight + 'px';
    }
    resize();
    addEventListener('resize', resize, {passive: true});
    function frame(t){
      ctx.clearRect(0, 0, W, H);
      for (const p of parts){
        p.y -= p.bubble ? p.v * 2.4 : p.v;
        p.x += Math.sin(t * 0.00035 + p.s) * 0.0001;
        if (p.y < -0.02){ p.y = 1.02; p.x = Math.random(); }
        const a = 0.18 + 0.28 * Math.abs(Math.sin(t * 0.0008 + p.s));
        const x = p.x * W, y = p.y * H, r = p.r * dpr * (p.bubble ? 2 : 1);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        if (p.bubble){
          ctx.strokeStyle = 'rgba(180,242,255,' + a.toFixed(2) + ')';
          ctx.lineWidth = dpr * 0.75;
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(166,232,255,' + a.toFixed(2) + ')';
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden){ cancelAnimationFrame(rafId); }
      else { rafId = requestAnimationFrame(frame); }
    });
  }

  /* 2. Đồng hồ độ sâu theo từng tầng trang nhánh + veil */
  const veil = document.getElementById('veil');
  const depthVal = document.getElementById('depthVal');
  const depthFill = document.getElementById('depthFill');
  const depthStart = Number(document.body.dataset.depthStart || 0);
  const depthEnd = Number(document.body.dataset.depthEnd || 11000);

  let ticking = false;
  function updateScrollUI(){
    ticking = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = Math.min(1, Math.max(0, scrollY / max));
    const currentDepth = Math.round(depthStart + (depthEnd - depthStart) * p);
    const overallProgress = Math.min(1, Math.max(0, currentDepth / 11000));
    if (depthVal) depthVal.textContent = currentDepth.toLocaleString('vi-VN');
    if (depthFill) depthFill.style.height = (overallProgress * 100).toFixed(1) + '%';
    if (veil) veil.style.opacity = Math.min(0.42, overallProgress * 0.48).toFixed(3);
  }
  addEventListener('scroll', () => {
    if (!ticking){ ticking = true; requestAnimationFrame(updateScrollUI); }
  }, {passive: true});
  updateScrollUI();

  /* 3. Reveal mượt & an toàn tuyệt đối */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reduce && 'IntersectionObserver' in window && reveals.length){
    document.documentElement.classList.add('js-anim');
    const showEl = (el) => {
      el.classList.add('is-visible');
      io.unobserve(el);
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries){
        if (e.isIntersecting) showEl(e.target);
      }
    }, {rootMargin: '260px 0px 260px 0px', threshold: 0});

    const flushPassed = () => {
      const limit = innerHeight + 220;
      for (const el of reveals){
        if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top <= limit){
          showEl(el);
        }
      }
    };

    reveals.forEach(el => {
      if (el.getBoundingClientRect().top <= innerHeight + 160) el.classList.add('is-visible');
      else io.observe(el);
    });

    addEventListener('scroll', flushPassed, {passive: true});
    addEventListener('scrollend', flushPassed, {passive: true});
    addEventListener('resize', flushPassed, {passive: true});
  }

  /* 4. Menu di động */
  const menuBtn = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (menuBtn && drawer){
    const closeDrawer = () => {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    drawer.querySelectorAll('a, button').forEach(el => el.addEventListener('click', closeDrawer));
    addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  }

  /* 5. In / Lưu CV (PDF): ở trang cv.html sẽ gọi window.print(), ở các trang khác chuyển sang cv.html?print=1 */
  ['printCvNav', 'printCvMobile', 'printCvContact', 'printCvDirect'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (pageName === 'cv') {
        window.print();
      } else {
        window.location.href = 'cv.html?print=1';
      }
    });
  });

  if (pageName === 'cv' && new URLSearchParams(window.location.search).get('print') === '1') {
    const triggerPrint = () => {
      try { window.history.replaceState(null, '', 'cv.html'); } catch {}
      setTimeout(() => window.print(), 350);
    };
    if (document.readyState === 'complete') triggerPrint();
    else window.addEventListener('load', triggerPrint, {once: true});
  }

  /* 6. Trình phát Video tương tác (tự tạm dừng video khác khi phát) */
  const allVideos = Array.from(document.querySelectorAll('video'));
  if (allVideos.length) {
    document.querySelectorAll('.play-overlay').forEach(overlay => {
      const v = document.getElementById(overlay.dataset.play);
      if (!v) return;
      overlay.addEventListener('click', () => {
        allVideos.forEach(other => { if (other !== v) other.pause(); });
        overlay.classList.add('hidden');
        v.play().catch(() => { overlay.classList.remove('hidden'); });
      });
      v.addEventListener('play', () => {
        allVideos.forEach(other => { if (other !== v) other.pause(); });
        overlay.classList.add('hidden');
      });
      v.addEventListener('ended', () => overlay.classList.remove('hidden'));
    });
  }

  /* 7. Bộ lọc dự án & video theo lĩnh vực (hỗ trợ cả ?cat=video|web|game|ai|edu) */
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const projectCards = Array.from(document.querySelectorAll('#projectsGrid .project-card'));
  const projectsCodeGroup = document.getElementById('projectsCodeGroup');
  const videoStudioGroup = document.getElementById('videoStudioGroup');
  if (filterBtns.length && (projectCards.length || videoStudioGroup)) {
    const revealGroup = (group) => {
      if (!group) return;
      group.classList.remove('hidden-item');
      group.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    };
    const applyFilter = (cat) => {
      const valid = filterBtns.some(b => b.dataset.filter === cat) ? cat : 'all';
      filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === valid));
      if (valid === 'video') {
        if (projectsCodeGroup) projectsCodeGroup.classList.add('hidden-item');
        revealGroup(videoStudioGroup);
        return;
      }
      if (projectsCodeGroup) projectsCodeGroup.classList.remove('hidden-item');
      projectCards.forEach(card => {
        const show = valid === 'all' || card.dataset.cat === valid;
        card.classList.toggle('hidden-item', !show);
        if (show) card.classList.add('is-visible');
      });
      if (videoStudioGroup) {
        if (valid === 'all') {
          revealGroup(videoStudioGroup);
        } else {
          videoStudioGroup.classList.add('hidden-item');
          videoStudioGroup.querySelectorAll('video').forEach(v => v.pause());
        }
      }
    };
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
    const initCat = new URLSearchParams(window.location.search).get('cat');
    if (initCat) applyFilter(initCat);
  }

  /* 8. Mã QR dẫn tới GitHub */
  function renderQr(){
    const box = document.getElementById('githubQr');
    if (!box) return;
    if (typeof window.qrcode === 'function'){
      const qr = window.qrcode(0, 'M');
      qr.addData('https://github.com/tranngochuyc-cyber');
      qr.make();
      box.innerHTML = qr.createSvgTag({cellSize: 3, margin: 0, scalable: true});
    } else {
      box.innerHTML = '<a href="https://github.com/tranngochuyc-cyber" target="_blank" rel="noopener" style="color:#031424;font-weight:700;font-size:11px;text-align:center;line-height:1.3">GitHub<br>tranngochuyc</a>';
    }
  }
  if (document.getElementById('githubQr')) {
    if (document.readyState === 'complete') renderQr();
    else addEventListener('load', renderQr);
  }

  /* 9. Sao chép Email & Trình tạo lời nhắn liên hệ */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn){
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('tranngochuyc@gmail.com');
        copyEmailBtn.textContent = 'Đã sao chép';
        setTimeout(() => { copyEmailBtn.textContent = 'Sao chép'; }, 2200);
      } catch {
        copyEmailBtn.textContent = 'tranngochuyc@gmail.com';
      }
    });
  }

  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const copyMsgBtn = document.getElementById('copyMsgBtn');

  function buildMessage(){
    const sender = form.sender.value.trim();
    const replyTo = form.replyTo.value.trim();
    const topic = form.topic.value;
    const body = form.body.value.trim();
    if (!sender || !replyTo || !body){
      formStatus.className = 'form-status err';
      formStatus.textContent = 'Vui lòng điền đủ tên, kênh phản hồi và nội dung ngắn trước khi gửi.';
      return null;
    }
    const text = 'Chào Trần Ngọc Huy,\n\n'
      + 'Người liên hệ: ' + sender + '\n'
      + 'Kênh phản hồi: ' + replyTo + '\n'
      + 'Chủ đề: ' + topic + '\n\n'
      + 'Nội dung:\n' + body;
    return {subject: '[Portfolio] ' + topic + ' — ' + sender, text};
  }

  if (form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const built = buildMessage();
      if (!built) return;
      const mailto = 'mailto:tranngochuyc@gmail.com?subject=' + encodeURIComponent(built.subject) + '&body=' + encodeURIComponent(built.text);
      formStatus.className = 'form-status';
      formStatus.textContent = 'Đang mở ứng dụng Email đã điền sẵn nội dung...';
      window.location.href = mailto;
    });
  }

  if (copyMsgBtn && form){
    copyMsgBtn.addEventListener('click', async () => {
      const built = buildMessage();
      if (!built) return;
      try {
        await navigator.clipboard.writeText(built.text);
        formStatus.className = 'form-status';
        formStatus.textContent = 'Đã sao chép lời nhắn vào bộ nhớ tạm — anh/chị có thể dán gửi ngay.';
      } catch {
        formStatus.className = 'form-status err';
        formStatus.textContent = 'Trình duyệt không cho phép sao chép tự động; vui lòng dùng nút Mở Email điền sẵn.';
      }
    });
  }

  /* 10. Tương tác Bento kỹ năng & trụ cột 50/25/25 trên profile.html */
  const bentoCards = Array.from(document.querySelectorAll('.bento-skill'));
  const pillarBtns = Array.from(document.querySelectorAll('.pillar-btn[data-pillar]'));
  if (bentoCards.length && !reduce) {
    bentoCards.forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      });
    });
  }
  if (pillarBtns.length && bentoCards.length) {
    const activatePillar = (key, shouldScroll) => {
      pillarBtns.forEach(b => {
        const active = b.dataset.pillar === key;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      let targetCard = null;
      bentoCards.forEach(c => {
        const match = c.dataset.pillar === key;
        c.classList.toggle('is-spotlight', match);
        if (match) targetCard = c;
      });
      if (shouldScroll && targetCard) {
        const rect = targetCard.getBoundingClientRect();
        if (rect.top > innerHeight - 120 || rect.bottom < 80) {
          targetCard.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        }
      }
    };
    pillarBtns.forEach(btn => {
      btn.addEventListener('click', () => activatePillar(btn.dataset.pillar, true));
    });
  }
})();
