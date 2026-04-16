/* ================================================================
   MAIN.JS — David Budha Magar Portfolio
   All fixes applied:
   - pct counter updates live (0→100)
   - twitterUrl handled safely (falls back to '#')
   - XSS: all config values sanitised before innerHTML
   - honeypot check blocks bot submissions
   - linkedin URL passed with https:// from config
   - education section built
   - cert-cards section built
   - nav dot count matches section count (7)
   ================================================================ */

/* ── XSS sanitiser: strips HTML tags from user-controlled strings ── */
function sanitise(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#x27;');
}

/* Allow a safe subset of HTML tags used in bio fields only */
function safeBioHTML(str) {
  if (typeof str !== 'string') return '';
  // Allow only <strong> and <br> — strip everything else
  return str
    .replace(/<(?!\/?(strong|br)\b)[^>]*>/gi, '')
    .replace(/&(?!amp;|lt;|gt;|quot;|#x27;|#\d+;)/g, '&amp;');
}

document.addEventListener('DOMContentLoaded', () => {

  buildPage();

  /* ── CURSOR ──────────────────────────────────────────────────── */
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  (function loopRing(){
    rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loopRing);
  })();

  /* ── MATRIX RAIN ─────────────────────────────────────────────── */
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas ? canvas.getContext('2d') : null;
  const CHARS  = '01アイウエオカキ><{}[]#$%|\\/*&^ABCDEF0123456789';
  let cols, drops;

  function initMatrix() {
    if (!canvas) return;
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const sz=12; cols=Math.floor(canvas.width/sz);
    drops=Array.from({length:cols},()=>Math.random()*-60);
  }
  function drawMatrix() {
    if (!ctx) return;
    ctx.fillStyle='rgba(2,7,4,.042)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font='12px "Share Tech Mono",monospace';
    drops.forEach((y,i)=>{
      const b=Math.random();
      ctx.fillStyle=b>.93?`rgba(200,255,210,${b})`:`rgba(0,${90+Math.floor(b*160)},38,${.12+b*.22})`;
      ctx.fillText(CHARS[Math.floor(Math.random()*CHARS.length)],i*12,y*12);
      if(y*12>canvas.height&&Math.random()>.975) drops[i]=0;
      drops[i]+=.45+Math.random()*.5;
    });
  }
  initMatrix();
  setInterval(drawMatrix,55);
  window.addEventListener('resize',initMatrix);

  /* ================================================================
     SPLASH SEQUENCE
     0.0s — splash visible, boot lines animate
     1.3s — "Welcome." fades in (CSS)
     2.0s — sub-text fades in (CSS)
     2.1s — 0→100 counter + bar start
     3.6s — zoom-out triggers
     4.4s — splash fades out
     4.6s — matrix + hero fade in
     5.0s — name letters stagger
     ================================================================ */

  const splash      = document.getElementById('splash');
  const splashWelc  = document.getElementById('splash-welcome');
  const mainHero    = document.getElementById('main-hero');
  const matrixCvs   = document.getElementById('matrix-canvas');
  const barFill     = document.getElementById('bar-fill');
  const pctEl       = document.getElementById('pct');   // FIX: counter element

  /* 0→100 counter — starts at 2.1s, takes ~1.4s to reach 100 */
  let pct = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      pct++;
      if (barFill) barFill.style.width = pct + '%';
      if (pctEl)   pctEl.textContent   = pct + '%';  // FIX: live counter
      if (pct >= 100) clearInterval(iv);
    }, 14); // 14ms × 100 steps = 1.4s
  }, 2100);

  setTimeout(() => { if(splashWelc) splashWelc.classList.add('zoom-out'); }, 3600);
  setTimeout(() => { if(splash) splash.classList.add('done'); }, 4400);
  setTimeout(() => {
    if(matrixCvs) matrixCvs.classList.add('visible');
    if(mainHero)  mainHero.classList.add('visible');
  }, 4600);
  setTimeout(() => {
    document.querySelectorAll('.name-letter').forEach((l,i)=>{
      setTimeout(()=>l.classList.add('in'), i*44);
    });
    const tag = document.querySelector('.hero-tagline');
    if(tag) tag.classList.add('in');
    if(typeof CONFIG !== 'undefined' && CONFIG.available){
      const av = document.querySelector('.available-badge');
      if(av) av.classList.add('in');
    }
    const sc = document.querySelector('.scroll-cue');
    if(sc) sc.classList.add('in');
  }, 5000);

  /* ================================================================
     NAV DOTS + FABS
     ================================================================ */
  const navDots  = document.getElementById('nav-dots');
  const fabGroup = document.getElementById('fab-group');
  // FIX: matches 7 sections in HTML
  const sections = ['main-hero','about','certs','portfolio','experience','education','contact'];

  window.goTo = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

  function updateNav() {
    const sy = window.scrollY;
    if(sy>50)  navDots.classList.add('visible');
    if(sy>260) fabGroup.classList.add('visible');
    const mid = window.innerHeight/2;
    sections.forEach((id,i)=>{
      const el=document.getElementById(id); if(!el) return;
      const r=el.getBoundingClientRect();
      const dots=navDots.querySelectorAll('.dot');
      if(r.top<=mid&&r.bottom>=mid){
        dots.forEach(d=>d.classList.remove('active'));
        if(dots[i]) dots[i].classList.add('active');
      }
    });
  }

  /* ================================================================
     TIMELINE FILL
     ================================================================ */
  const tlFill = document.getElementById('timeline-fill');
  const tlEl   = document.getElementById('timeline');

  function updateTL() {
    if(!tlEl||!tlFill) return;
    const r=tlEl.getBoundingClientRect(), wh=window.innerHeight;
    const v=Math.max(0,Math.min(1,(wh-r.top)/(r.height+wh*.5)));
    tlFill.style.height=(v*100)+'%';
    tlEl.querySelectorAll('.timeline-dot').forEach(d=>{
      if(d.getBoundingClientRect().top<wh*.82) d.classList.add('in');
    });
  }

  /* ================================================================
     INTERSECTION OBSERVER
     ================================================================ */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:.1,rootMargin:'0px 0px -36px 0px'});

  document.querySelectorAll('.anim').forEach(el=>io.observe(el));

  const stBox=document.getElementById('skill-tags');
  if(stBox){
    new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting)
        stBox.querySelectorAll('.skill-tag').forEach((t,i)=>
          setTimeout(()=>t.classList.add('in'),i*55));
    },{threshold:.3}).observe(stBox);
  }

  window.addEventListener('scroll',()=>{updateNav();updateTL();},{passive:true});
  updateNav(); updateTL();

  /* ================================================================
     CONTACT FORM  — honeypot + validation + XSS guard
     ================================================================ */
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();

      // Honeypot check — if filled, silently discard (bot)
      const hp = form.querySelector('input[name="_hp"]');
      if(hp && hp.value.trim() !== '') return;

      // Basic client-side validation
      const name    = form.querySelector('#f-name').value.trim();
      const email   = form.querySelector('#f-email').value.trim();
      const message = form.querySelector('#f-msg').value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!name || !email || !message)    return;
      if(name.length > 100)              return;
      if(!emailRe.test(email))           return;
      if(message.length > 2000)          return;

      const success = document.getElementById('form-success');
      form.style.cssText='opacity:0;transform:translateY(-8px);transition:opacity .4s,transform .4s';
      setTimeout(()=>{
        form.style.display='none';
        success.classList.add('show');
        success.style.cssText='display:block;opacity:0;transform:translateY(8px);transition:opacity .4s,transform .4s';
        requestAnimationFrame(()=>{success.style.opacity='1';success.style.transform='none';});
      },420);
    });
  }

  /* ── TYPEWRITER ──────────────────────────────────────────────── */
  const tp=document.getElementById('term-prompt');
  if(tp){
    const txt=tp.dataset.text||''; tp.textContent=''; let i=0;
    setTimeout(()=>{
      const iv=setInterval(()=>{
        if(i<txt.length){tp.textContent+=txt[i++];}
        else clearInterval(iv);
      },55);
    },550);
  }

}); /* end DOMContentLoaded */


/* ================================================================
   BUILD PAGE FROM CONFIG
   ================================================================ */
function buildPage() {
  if(typeof CONFIG==='undefined'){console.warn('config.js not loaded');return;}

  document.title = sanitise(CONFIG.name) + ' — Security Portfolio';

  /* Splash welcome word */
  const ww=document.getElementById('welcome-word');
  if(ww){
    const w=CONFIG.welcomeWord||'Welcome.';
    ww.dataset.text=w.replace('.','');
    ww.innerHTML=sanitise(w).replace('.','<span class="welcome-period">.</span>');
  }
  setText('hero-sub', CONFIG.heroSub);

  /* Photo */
  if(CONFIG.photoSrc){
    const pi=document.getElementById('photo-inner');
    if(pi){
      const img=document.createElement('img');
      img.src=sanitise(CONFIG.photoSrc);
      img.alt=sanitise(CONFIG.photoAlt||'');
      pi.innerHTML='';
      pi.appendChild(img);
    }
  }

  buildNameLetters(CONFIG.name);
  setText('hero-tagline', CONFIG.tagline);

  /* About */
  setHTML('about-bio1', safeBioHTML(CONFIG.aboutBio1||''));
  setHTML('about-bio2', safeBioHTML(CONFIG.aboutBio2||''));
  buildStats();
  buildCertsSmall();   // sidebar list
  buildCertCards();    // full section cards
  buildSkills();
  buildInterests();
  buildProjects();
  buildExperience();
  buildEducation();    // FIX: education section

  /* Contact info */
  document.querySelectorAll('.contact-email').forEach(el=>{
    el.href=sanitise(CONFIG.emailHref||'#');
    el.textContent=sanitise(CONFIG.email||'');
  });

  // FIX: safe href setter — ensures https:// prefix
  function safeHref(sel, url){
    document.querySelectorAll(sel).forEach(el=>{
      if(!url||url==='#'){el.href='#';return;}
      // Only allow http/https protocols
      if(/^https?:\/\//i.test(url)) el.href=url;
      else el.href='https://'+url;
    });
  }
  safeHref('.social-linkedin', CONFIG.linkedinUrl);
  safeHref('.social-github',   CONFIG.githubUrl);
  safeHref('.social-website',  CONFIG.websiteUrl);
  // FIX: twitterUrl may not exist in config — default to '#'
  safeHref('.social-twitter',  CONFIG.twitterUrl||'#');

  document.querySelectorAll('.cv-link').forEach(el=>{ el.href=sanitise(CONFIG.cvFile||'#'); });

  setHTML('footer-name', sanitise(CONFIG.name||''));
  setHTML('footer-year', sanitise(String(CONFIG.footerYear||new Date().getFullYear())));

  const fabEm=document.getElementById('fab-email');
  if(fabEm) fabEm.href=sanitise(CONFIG.emailHref||'#');
  const fabCv=document.getElementById('fab-cv');
  if(fabCv) fabCv.href=sanitise(CONFIG.cvFile||'#');  // FIX: was hardcoded
}

/* ── Helpers ─────────────────────────────────────────────────── */
function setHTML(id,html){ const el=document.getElementById(id); if(el&&html!==undefined) el.innerHTML=html; }
function setText(id,txt){ const el=document.getElementById(id); if(el) el.textContent=txt||''; }

function buildNameLetters(name){
  const c=document.getElementById('name-letters'); if(!c||!name) return;
  c.innerHTML='';
  sanitise(name).split('').forEach((ch,i)=>{
    const s=document.createElement('span');
    s.className='name-letter'+(i===0?' g':'');
    s.textContent=ch===' '?'\u00A0':ch;
    s.style.transitionDelay=(i*42)+'ms';
    c.appendChild(s);
  });
}

function buildStats(){
  const c=document.getElementById('stats-container'); if(!c) return;
  c.innerHTML=(CONFIG.aboutStats||[]).map(s=>`
    <div class="stat-block">
      <div class="stat-num">${sanitise(s.num)}</div>
      <div class="stat-label">${sanitise(s.label)}</div>
    </div>`).join('');
}

function buildCertsSmall(){
  const c=document.getElementById('certs-list'); if(!c) return;
  c.innerHTML=(CONFIG.certs||[]).map(cert=>`
    <div class="cert-item">
      <span class="cert-badge">${sanitise(cert.code)}</span>
      <span class="cert-name">${sanitise(cert.name)}</span>
    </div>`).join('');
}

function buildCertCards(){
  const c=document.getElementById('cert-cards'); if(!c) return;
  c.innerHTML=(CONFIG.certs||[]).map((cert,i)=>{
    const hasLink=cert.credUrl&&cert.credUrl!=='#';
    return `
    <div class="cert-card anim d${Math.min(i+1,6)}">
      <div class="cert-card-badge">${sanitise(cert.code)}</div>
      <div class="cert-card-body">
        <div class="cert-card-name">
          ${sanitise(cert.name)}
          ${hasLink?`<span class="cert-verified">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Verified
          </span>`:''}
        </div>
        <div class="cert-card-meta">${sanitise(cert.issuer||'')} · ${sanitise(String(cert.year||''))}</div>
        ${hasLink?`<a href="${sanitise(cert.credUrl)}" class="cert-card-link" target="_blank" rel="noopener noreferrer">
          View credential
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>`:''}
      </div>
    </div>`;
  }).join('');
  reObserve('#cert-cards .anim');
}

function buildSkills(){
  const c=document.getElementById('skill-tags'); if(!c) return;
  c.innerHTML=(CONFIG.skills||[]).map(s=>`<span class="skill-tag">${sanitise(s)}</span>`).join('');
}

function buildInterests(){
  const c=document.getElementById('interests-list'); if(!c) return;
  // Interests allow &amp; entity — use safeBioHTML
  c.innerHTML=(CONFIG.interests||[]).map(i=>`<li>${safeBioHTML(i)}</li>`).join('');
}

function buildProjects(){
  const c=document.getElementById('portfolio-grid'); if(!c) return;
  const thumbs=['t1','t2','t3','t4','t5'];
  c.innerHTML=(CONFIG.projects||[]).map((p,i)=>`
    <div class="project-card ${p.featured?'featured':''} anim d${Math.min(i+1,6)}">
      <div class="project-thumb">
        <div class="thumb-inner ${thumbs[i%thumbs.length]}">
          <div class="thumb-grid"></div>
          <span class="thumb-label">${sanitise((p.name||'').substring(0,14))}</span>
          <div class="proj-overlay">
            <a href="${sanitise(p.link||'#')}" class="view-btn" target="_blank" rel="noopener noreferrer">View →</a>
          </div>
        </div>
      </div>
      <div class="proj-info">
        <div class="proj-num">${sanitise(p.num||'')}${p.badge?` — <span class="badge">${sanitise(p.badge)}</span>`:''}</div>
        <h3 class="proj-name">${sanitise(p.name||'')}</h3>
        <p class="proj-desc">${sanitise(p.desc||'')}</p>
        <div class="proj-tags">${(p.tags||[]).map(t=>`<span class="proj-tag">${sanitise(t)}</span>`).join('')}</div>
      </div>
    </div>`).join('');
  reObserve('#portfolio-grid .anim');
}

function buildExperience(){
  const c=document.getElementById('timeline'); if(!c) return;
  const track=c.querySelector('.timeline-track');
  c.innerHTML=''; if(track) c.appendChild(track);
  (CONFIG.experience||[]).forEach((job,i)=>{
    const d=document.createElement('div');
    d.className=`timeline-item anim d${Math.min(i+1,6)}`;
    d.innerHTML=`
      <div class="timeline-dot"></div>
      <div class="job-meta">
        <span class="job-company">${sanitise(job.company)}</span>
        <span class="job-dates">${sanitise(job.dates)}</span>
      </div>
      <div class="job-role">${sanitise(job.role)}</div>
      <ul class="job-bullets">
        ${(job.bullets||[]).map(b=>`<li>${sanitise(b)}</li>`).join('')}
      </ul>`;
    c.appendChild(d);
  });
  reObserve('#timeline .anim');
}

function buildEducation(){
  const c=document.getElementById('edu-list'); if(!c) return;
  c.innerHTML=(CONFIG.education||[]).map((e,i)=>`
    <div class="edu-card anim d${Math.min(i+1,6)}">
      <div>
        <div class="edu-degree">${sanitise(e.degree)}</div>
        <div class="edu-school">${sanitise(e.school)}</div>
      </div>
      <div class="edu-year">${sanitise(e.years)}</div>
    </div>`).join('');
  reObserve('#edu-list .anim');
}

function reObserve(sel){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('in');});
  },{threshold:.08});
  document.querySelectorAll(sel).forEach(el=>obs.observe(el));
}
