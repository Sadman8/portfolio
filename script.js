(function(){
  "use strict";

  const DEFAULT_DATA = {
    profile:{ name:"Your Name", role:"Software Engineer // Systems Thinker",
      bio:"A short bio about you goes here. Enter the secret combo to unlock edit mode and type over this text.",
      email:"you@example.com", location:"Dhaka, Bangladesh", github:"github.com/username", linkedin:"linkedin.com/in/username",
      skills:["JavaScript","Python","React","Node.js","SQL","Linux"], avatar:null },
    photos:new Array(10).fill(null),
    projects:[
      {title:"Project One", desc:"Short description of what this project does and the problem it solves.", link:"https://github.com", image:null},
      {title:"Project Two", desc:"Short description of what this project does and the problem it solves.", link:"https://github.com", image:null},
      {title:"Project Three", desc:"Short description of what this project does and the problem it solves.", link:"https://github.com", image:null}
    ],
    customBlocks:[],
    theme:{accent:"#3dff96", mode:"dark"}
  };

  let DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
  let editMode = false;
  const LOCAL_KEY = 'portfolio_local_draft';
  const GH_CONFIG_KEY = 'portfolio_gh_config';

  /* ============ DATA LOADING ============
     1. If this browser has a local draft (owner editing), use it so reloads
        don't lose unsaved work.
     2. Otherwise fetch data.json - the committed, live content every visitor sees. */
  async function loadAll(){
    const local = localStorage.getItem(LOCAL_KEY);
    if(local){
      try{ DATA = mergeDefaults(JSON.parse(local)); return; }catch(e){}
    }
    try{
      const res = await fetch('./data.json', {cache:'no-store'});
      if(res.ok){ DATA = mergeDefaults(await res.json()); }
    }catch(e){ /* offline or opened via file:// - fall back to defaults */ }
  }
  function mergeDefaults(obj){
    return {
      profile: Object.assign({}, DEFAULT_DATA.profile, obj.profile||{}),
      photos: obj.photos || DEFAULT_DATA.photos,
      projects: obj.projects || DEFAULT_DATA.projects,
      customBlocks: obj.customBlocks || [],
      theme: Object.assign({}, DEFAULT_DATA.theme, obj.theme||{})
    };
  }
  function saveLocal(){
    try{ localStorage.setItem(LOCAL_KEY, JSON.stringify(DATA)); }catch(e){}
    toast('DRAFT SAVED (this browser)');
  }

  /* ============ GITHUB SYNC ============ */
  function getGhConfig(){
    try{ return JSON.parse(localStorage.getItem(GH_CONFIG_KEY)||'{}'); }catch(e){ return {}; }
  }
  function setGhConfig(cfg){
    localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(cfg));
  }
  function b64EncodeUtf8(str){ return btoa(unescape(encodeURIComponent(str))); }
  function b64DecodeUtf8(str){ return decodeURIComponent(escape(atob(str))); }

  function renderGhStatus(){
    const cfg = getGhConfig();
    const el = document.getElementById('ghStatus');
    document.getElementById('ghOwner').value = cfg.owner || '';
    document.getElementById('ghRepo').value = cfg.repo || '';
    document.getElementById('ghBranch').value = cfg.branch || '';
    document.getElementById('ghToken').value = cfg.token || '';
    if(cfg.owner && cfg.repo && cfg.token){
      el.textContent = 'connected: '+cfg.owner+'/'+cfg.repo;
      el.classList.add('ok');
    } else {
      el.textContent = 'not connected — fill in the fields below';
      el.classList.remove('ok');
    }
  }
  document.getElementById('ghSaveConfigBtn').addEventListener('click', ()=>{
    const cfg = {
      owner: document.getElementById('ghOwner').value.trim(),
      repo: document.getElementById('ghRepo').value.trim(),
      branch: document.getElementById('ghBranch').value.trim() || 'main',
      path: 'data.json',
      token: document.getElementById('ghToken').value.trim()
    };
    setGhConfig(cfg);
    renderGhStatus();
    toast('GITHUB CONNECTION SAVED');
  });

  async function pushToGitHub(){
    const cfg = getGhConfig();
    if(!cfg.owner || !cfg.repo || !cfg.token){
      toast('CONNECT GITHUB FIRST (see form below)', true);
      return;
    }
    const branch = cfg.branch || 'main';
    const apiUrl = 'https://api.github.com/repos/'+cfg.owner+'/'+cfg.repo+'/contents/'+cfg.path;
    toast('PUSHING TO GITHUB...');
    try{
      let sha = null;
      const getRes = await fetch(apiUrl+'?ref='+branch, {
        headers:{ 'Authorization':'token '+cfg.token, 'Accept':'application/vnd.github+json' }
      });
      if(getRes.ok){ const j = await getRes.json(); sha = j.sha; }
      else if(getRes.status !== 404){
        const errBody = await getRes.json().catch(()=>({}));
        throw new Error('GET failed ('+getRes.status+'): '+(errBody.message||'unknown error'));
      }

      const body = {
        message: 'Update portfolio content ('+new Date().toISOString()+')',
        content: b64EncodeUtf8(JSON.stringify(DATA, null, 2)),
        branch: branch
      };
      if(sha) body.sha = sha;

      const putRes = await fetch(apiUrl, {
        method:'PUT',
        headers:{ 'Authorization':'token '+cfg.token, 'Accept':'application/vnd.github+json', 'Content-Type':'application/json' },
        body: JSON.stringify(body)
      });
      if(!putRes.ok){
        const errBody = await putRes.json().catch(()=>({}));
        throw new Error('PUT failed ('+putRes.status+'): '+(errBody.message||'unknown error'));
      }
      toast('PUSHED — live in ~30-60s once Pages rebuilds');
    }catch(err){
      toast('PUSH FAILED: '+err.message, true);
    }
  }

  async function pullFromGitHub(){
    toast('PULLING LATEST...');
    try{
      const res = await fetch('./data.json?t='+Date.now(), {cache:'no-store'});
      if(!res.ok) throw new Error('data.json not reachable ('+res.status+')');
      DATA = mergeDefaults(await res.json());
      localStorage.removeItem(LOCAL_KEY);
      applyTheme();
      renderProfile(); renderGallery(); renderProjects(); renderCustomBlocks();
      toast('PULLED LATEST FROM GITHUB');
    }catch(err){
      toast('PULL FAILED: '+err.message, true);
    }
  }
  document.getElementById('ghPushBtn').addEventListener('click', pushToGitHub);
  document.getElementById('ghPullBtn').addEventListener('click', pullFromGitHub);

  function toast(msg, isError){
    const t = document.getElementById('saveToast');
    t.textContent = msg;
    t.classList.toggle('error', !!isError);
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(()=>t.classList.remove('show'), isError?3200:1800);
  }

  function resizeImage(file, maxW){
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onload=e=>{
        const img=new Image();
        img.onload=()=>{
          const scale=Math.min(1,maxW/img.width);
          const w=Math.round(img.width*scale), h=Math.round(img.height*scale);
          const canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h;
          canvas.getContext('2d').drawImage(img,0,0,w,h);
          resolve(canvas.toDataURL('image/jpeg',0.72));
        };
        img.onerror=reject; img.src=e.target.result;
      };
      reader.onerror=reject; reader.readAsDataURL(file);
    });
  }

  /* ============ THEME ============ */
  function hexToHsl(hex){
    let r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b); let h,s,l=(max+min)/2;
    if(max===min){h=0;s=0;} else {
      const d=max-min; s=l>0.5? d/(2-max-min): d/(max+min);
      switch(max){ case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; default: h=(r-g)/d+4; }
      h*=60;
    }
    return {h,s:s*100,l:l*100};
  }
  function hslToHex(h,s,l){
    s/=100; l/=100;
    const c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs((h/60)%2-1)), m=l-c/2;
    let r,g,b;
    if(h<60){r=c;g=x;b=0;} else if(h<120){r=x;g=c;b=0;} else if(h<180){r=0;g=c;b=x;}
    else if(h<240){r=0;g=x;b=c;} else if(h<300){r=x;g=0;b=c;} else {r=c;g=0;b=x;}
    const toHex=v=>Math.round((v+m)*255).toString(16).padStart(2,'0');
    return '#'+toHex(r)+toHex(g)+toHex(b);
  }
  function applyTheme(){
    const {accent,mode} = DATA.theme;
    const {h,s} = hexToHsl(accent);
    const soft = hslToHex(h, Math.min(s+10,100), mode==='light'?42:82);
    const dim = hslToHex(h, s*0.75, 38);
    const dark = hslToHex(h, s*0.6, mode==='light'?90:12);
    const root = document.documentElement.style;
    root.setProperty('--green', accent);
    root.setProperty('--green-soft', soft);
    root.setProperty('--green-dim', dim);
    root.setProperty('--green-dark', dark);
    if(mode==='light'){
      root.setProperty('--bg','#f4f7f3'); root.setProperty('--bg2','#e9efe6');
      root.setProperty('--panel','#ffffff'); root.setProperty('--panel-line','#d7ded4');
      root.setProperty('--text','#16241b'); root.setProperty('--text-dim','#5b6b60');
    } else {
      root.setProperty('--bg','#040705'); root.setProperty('--bg2','#081410');
      root.setProperty('--panel','#08130f'); root.setProperty('--panel-line','#123423');
      root.setProperty('--text','#cdf9df'); root.setProperty('--text-dim','#5f9c7c');
    }
  }
  const PRESETS = ["#3dff96","#3dd9ff","#ffb347","#ff4d6d","#b57bff","#f2f2f2"];
  function renderThemePanel(){
    const sw = document.getElementById('swatches'); sw.innerHTML='';
    PRESETS.forEach(c=>{
      const d=document.createElement('div');
      d.className='swatch'+(DATA.theme.accent.toLowerCase()===c.toLowerCase()?' active':'');
      d.style.background=c;
      d.addEventListener('click', ()=>{ DATA.theme.accent=c; applyTheme(); renderThemePanel(); saveLocal(); });
      sw.appendChild(d);
    });
    document.getElementById('customColorInput').value = DATA.theme.accent;
    document.querySelectorAll('#modeSwitch button').forEach(b=>b.classList.toggle('active', b.dataset.mode===DATA.theme.mode));
    renderGhStatus();
  }
  document.getElementById('customColorInput').addEventListener('input', (e)=>{
    DATA.theme.accent = e.target.value; applyTheme(); renderThemePanel(); saveLocal();
  });
  document.getElementById('modeSwitch').addEventListener('click', (e)=>{
    const btn = e.target.closest('button'); if(!btn) return;
    DATA.theme.mode = btn.dataset.mode; applyTheme(); renderThemePanel(); saveLocal();
  });

  /* ============ RENDER: PROFILE ============ */
  function renderProfile(){
    document.getElementById('nameField').textContent = DATA.profile.name;
    document.getElementById('brandName').textContent = DATA.profile.name.split(' ')[0].toUpperCase();
    document.getElementById('footerName').textContent = (DATA.profile.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g,'')) || 'portfolio';
    document.getElementById('roleField').textContent = DATA.profile.role;
    document.getElementById('bioField').textContent = DATA.profile.bio;
    document.getElementById('emailField').textContent = DATA.profile.email;
    document.getElementById('locField').textContent = DATA.profile.location;
    document.getElementById('ghField').textContent = DATA.profile.github;
    document.getElementById('liField').textContent = DATA.profile.linkedin;
    const skillsWrap = document.getElementById('skillsWrap'); skillsWrap.innerHTML='';
    DATA.profile.skills.forEach(s=>{ const el=document.createElement('span'); el.className='skill-tag'; el.textContent=s; skillsWrap.appendChild(el); });
    document.getElementById('socialsWrap').innerHTML =
      '<a class="portal-link" href="mailto:'+DATA.profile.email+'">EMAIL</a> '+
      '<a class="portal-link" href="https://'+DATA.profile.github+'" target="_blank" rel="noopener">GITHUB</a> '+
      '<a class="portal-link" href="https://'+DATA.profile.linkedin+'" target="_blank" rel="noopener">LINKEDIN</a>';
    const avatarFrame = document.getElementById('avatarFrame');
    avatarFrame.innerHTML = DATA.profile.avatar ? ('<img src="'+DATA.profile.avatar+'" alt="avatar">') : '<div class="ph">NO_SIGNAL</div>';
  }
  document.getElementById('avatarUploadBtn').addEventListener('click', ()=>document.getElementById('avatarInput').click());
  document.getElementById('avatarInput').addEventListener('change', async (e)=>{
    const f=e.target.files[0]; if(!f) return;
    DATA.profile.avatar = await resizeImage(f,400); renderProfile(); saveLocal();
  });

  /* ============ RENDER: GALLERY ============ */
  function renderGallery(){
    const grid = document.getElementById('galleryGrid'); grid.innerHTML='';
    DATA.photos.forEach((src,i)=>{
      const slot = document.createElement('div'); slot.className='g-slot';
      slot.innerHTML = '<span class="idx">'+String(i+1).padStart(2,'0')+'</span>'+
        (src?('<img src="'+src+'" alt="photo '+(i+1)+'">'):('<div class="ph">EMPTY<br>SLOT_'+String(i+1).padStart(2,'0')+'</div>'))+
        '<div class="up" data-idx="'+i+'">UPLOAD</div>';
      grid.appendChild(slot);
    });
    grid.querySelectorAll('.up').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx=+btn.dataset.idx;
        const input=document.createElement('input'); input.type='file'; input.accept='image/*';
        input.onchange = async ()=>{ const f=input.files[0]; if(!f) return; DATA.photos[idx]=await resizeImage(f,500); renderGallery(); saveLocal(); };
        input.click();
      });
    });
  }

  /* ============ TYPEWRITER + REVEAL ============ */
  function typeWriter(el, text, speed){
    el.textContent=''; let i=0;
    (function step(){ if(i<=text.length){ el.textContent=text.slice(0,i); i++; setTimeout(step, speed||16); } })();
  }
  function observeOnce(el, cb){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ cb(); io.unobserve(el); } });
    }, {threshold:0.25});
    io.observe(el);
  }
  function observeFadeOut(el){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ el.style.transition='opacity .5s'; el.style.opacity = entry.isIntersecting?1:0; });
    }, {threshold:0.15});
    io.observe(el);
  }

  /* ============ RENDER: PROJECTS ============ */
  function renderProjects(){
    const list = document.getElementById('projectsList'); list.innerHTML='';
    DATA.projects.forEach((p,i)=>{
      const row = document.createElement('div'); row.className='proj-row';
      row.innerHTML =
        '<div class="proj-id">'+String(i+1).padStart(2,'0')+'/</div>'+
        '<div class="proj-img" data-idx="'+i+'">'+
          (p.image?('<img src="'+p.image+'" alt="'+p.title+'">'):'<div class="ph">NO<br>IMAGE</div>')+
          '<div class="up" data-idx="'+i+'">UPLOAD</div>'+
        '</div>'+
        '<div>'+
          '<div class="proj-title" contenteditable="false" data-field="title" data-idx="'+i+'">'+(editMode? p.title : '')+'</div>'+
          '<div class="proj-desc" contenteditable="false" data-field="desc" data-idx="'+i+'">'+(editMode? p.desc : '')+'</div>'+
          '<div style="margin-top:6px;"><a class="proj-link portal-link" contenteditable="false" data-field="link" data-idx="'+i+'" href="'+p.link+'" target="_blank" rel="noopener">'+p.link+'</a></div>'+
        '</div>'+
        '<div class="proj-remove" data-idx="'+i+'">remove</div>';
      list.appendChild(row);

      const imgEl = row.querySelector('.proj-img');
      const titleEl = row.querySelector('.proj-title');
      const descEl = row.querySelector('.proj-desc');

      if(editMode){
        imgEl.style.opacity=1; titleEl.style.opacity=1; descEl.style.opacity=1;
      } else {
        observeOnce(imgEl, ()=>imgEl.classList.add('anim-slide-left'));
        observeOnce(titleEl, ()=>{ titleEl.style.opacity=1; typeWriter(titleEl, p.title, 22); });
        observeOnce(descEl, ()=>{ descEl.style.opacity=1; setTimeout(()=>typeWriter(descEl, p.desc, 10), p.title.length*22+150); });
      }
    });

    list.querySelectorAll('[contenteditable]').forEach(el=>{
      el.contentEditable = editMode;
      el.addEventListener('input', ()=>{
        const idx=+el.dataset.idx, field=el.dataset.field;
        DATA.projects[idx][field] = el.textContent.trim();
      });
      el.addEventListener('blur', saveLocal);
    });
    list.querySelectorAll('.proj-remove').forEach(btn=>{ btn.addEventListener('click', ()=>{ DATA.projects.splice(+btn.dataset.idx,1); renderProjects(); saveLocal(); }); });
    list.querySelectorAll('.proj-img .up').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx=+btn.dataset.idx;
        const input=document.createElement('input'); input.type='file'; input.accept='image/*';
        input.onchange = async ()=>{ const f=input.files[0]; if(!f) return; DATA.projects[idx].image=await resizeImage(f,500); renderProjects(); saveLocal(); };
        input.click();
      });
    });
  }
  document.getElementById('addProjBtn').addEventListener('click', ()=>{
    DATA.projects.push({title:"New Project", desc:"Describe this project.", link:"https://", image:null});
    renderProjects(); saveLocal();
  });

  /* ============ RENDER: CUSTOM BLOCKS ============ */
  function renderCustomBlocks(){
    const wrap = document.getElementById('customBlocksList'); wrap.innerHTML='';
    DATA.customBlocks.forEach((b,i)=>{
      const box = document.createElement('div'); box.className='cb-block';
      const toolbar = document.createElement('div'); toolbar.className='cb-toolbar';
      let opts = '<option value="none"'+(b.animation==='none'?' selected':'')+'>no animation</option>'+
        '<option value="fade-in"'+(b.animation==='fade-in'?' selected':'')+'>fade in</option>'+
        '<option value="fade-out"'+(b.animation==='fade-out'?' selected':'')+'>fade in/out (scroll)</option>'+
        '<option value="slide-left"'+(b.animation==='slide-left'?' selected':'')+'>slide right to left</option>'+
        '<option value="slide-right"'+(b.animation==='slide-right'?' selected':'')+'>slide left to right</option>';
      if(b.type==='text') opts += '<option value="typing"'+(b.animation==='typing'?' selected':'')+'>typing effect</option>';
      toolbar.innerHTML = '<span>'+b.type.toUpperCase()+'_BLOCK_'+String(i+1).padStart(2,'0')+'</span>'+
        '<select data-idx="'+i+'" class="cb-anim">'+opts+'</select>'+
        (b.type==='image'?('<span class="cb-upload" data-idx="'+i+'">upload</span>'):'')+
        '<span class="cb-remove" data-idx="'+i+'">remove</span>';
      box.appendChild(toolbar);

      let contentEl;
      if(b.type==='text'){
        contentEl = document.createElement('div');
        contentEl.className='cb-text'; contentEl.contentEditable = editMode;
        contentEl.textContent = b.content || 'Click to edit this text block...';
        contentEl.addEventListener('input', ()=>{ DATA.customBlocks[i].content = contentEl.textContent; });
        contentEl.addEventListener('blur', saveLocal);
      } else {
        contentEl = document.createElement('div'); contentEl.className='cb-image';
        contentEl.innerHTML = b.content ? ('<img src="'+b.content+'" alt="block image">') : '<div class="ph" style="color:var(--green-dim);font-size:11px;">no image uploaded yet</div>';
      }
      box.appendChild(contentEl);
      wrap.appendChild(box);

      if(editMode){
        contentEl.style.opacity=1;
      } else {
        const anim = b.animation||'none';
        if(anim==='fade-out'){ contentEl.style.opacity=1; observeFadeOut(contentEl); }
        else if(anim==='typing' && b.type==='text'){ observeOnce(contentEl, ()=>{ contentEl.style.opacity=1; typeWriter(contentEl, b.content||'', 18); }); }
        else if(anim==='slide-left'){ observeOnce(contentEl, ()=>contentEl.classList.add('anim-slide-left')); }
        else if(anim==='slide-right'){ observeOnce(contentEl, ()=>contentEl.classList.add('anim-slide-right')); }
        else if(anim==='fade-in'){ observeOnce(contentEl, ()=>contentEl.classList.add('anim-fade-in')); }
        else { contentEl.style.opacity=1; }
      }
    });

    wrap.querySelectorAll('.cb-anim').forEach(sel=>sel.addEventListener('change', ()=>{ DATA.customBlocks[+sel.dataset.idx].animation = sel.value; saveLocal(); }));
    wrap.querySelectorAll('.cb-remove').forEach(btn=>btn.addEventListener('click', ()=>{ DATA.customBlocks.splice(+btn.dataset.idx,1); renderCustomBlocks(); saveLocal(); }));
    wrap.querySelectorAll('.cb-upload').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx=+btn.dataset.idx;
        const input=document.createElement('input'); input.type='file'; input.accept='image/*';
        input.onchange = async ()=>{ const f=input.files[0]; if(!f) return; DATA.customBlocks[idx].content = await resizeImage(f,700); renderCustomBlocks(); saveLocal(); };
        input.click();
      });
    });
  }
  document.getElementById('addTextBlockBtn').addEventListener('click', ()=>{
    DATA.customBlocks.push({type:'text', content:'New text block — click to edit.', animation:'fade-in'});
    renderCustomBlocks(); saveLocal();
  });
  document.getElementById('addImageBlockBtn').addEventListener('click', ()=>{
    DATA.customBlocks.push({type:'image', content:null, animation:'slide-left'});
    renderCustomBlocks(); saveLocal();
  });

  /* ============ LINK PORTAL (map fade + inline preview on link click) ============ */
  function openPortal(url){
    const mapWrap = document.getElementById('mapWrap');
    mapWrap.scrollIntoView({behavior:'smooth', block:'center'});

    let portal = document.getElementById('linkPortal');
    if(!portal){
      portal = document.createElement('div');
      portal.id = 'linkPortal';
      portal.className = 'link-portal';
      portal.innerHTML =
        '<div class="portal-topbar">'+
          '<span id="portalDomain">—</span>'+
          '<div style="display:flex;gap:8px;">'+
            '<button class="portal-btn" id="portalOpenBtn">OPEN IN NEW TAB &#8599;</button>'+
            '<button class="portal-btn close" id="portalCloseBtn">&times; CLOSE</button>'+
          '</div>'+
        '</div>'+
        '<div class="portal-boot">'+
          '<div id="portalBootText">ESTABLISHING UPLINK...</div>'+
          '<div class="portal-bar"><span id="portalBarFill"></span></div>'+
          '<div style="font-size:10px;color:var(--text-dim);max-width:320px;">Some destinations block inline embedding — use OPEN IN NEW TAB if nothing appears.</div>'+
        '</div>'+
        '<iframe id="portalFrame"></iframe>';
      mapWrap.appendChild(portal);
      document.getElementById('portalCloseBtn').addEventListener('click', closePortal);
      document.getElementById('portalOpenBtn').addEventListener('click', ()=>window.open(portal.dataset.url,'_blank','noopener'));
    }

    portal.dataset.url = url;
    portal.classList.remove('loaded');
    document.getElementById('portalFrame').src = 'about:blank';

    let domain = url;
    try{ domain = new URL(url, location.href).hostname || url; }catch(e){}
    document.getElementById('portalDomain').textContent = domain;
    document.getElementById('portalBootText').textContent = 'ESTABLISHING UPLINK TO '+domain.toUpperCase()+' ...';

    const bar = document.getElementById('portalBarFill');
    bar.style.width = '0%';

    clearTimeout(portal._showT);
    portal._showT = setTimeout(()=>{
      mapWrap.classList.add('portal-active');
      portal.classList.add('show');
      requestAnimationFrame(()=>{ bar.style.width = '100%'; });
    }, 500);

    const isMail = url.indexOf('mailto:') === 0;
    clearTimeout(portal._loadT);
    portal._loadT = setTimeout(()=>{
      if(isMail){
        document.getElementById('portalBootText').textContent = 'LAUNCHING MAIL CLIENT...';
        window.location.href = url;
        setTimeout(closePortal, 900);
      } else {
        document.getElementById('portalFrame').src = url;
        portal.classList.add('loaded');
      }
    }, 1600);
  }
  function closePortal(){
    const mapWrap = document.getElementById('mapWrap');
    const portal = document.getElementById('linkPortal');
    if(portal){
      portal.classList.remove('show');
      portal.classList.remove('loaded');
      setTimeout(()=>{ const f=document.getElementById('portalFrame'); if(f) f.src='about:blank'; }, 400);
    }
    mapWrap.classList.remove('portal-active');
  }
  document.addEventListener('click', function(e){
    const a = e.target.closest('.portal-link');
    if(!a) return;
    e.preventDefault();
    if(editMode) return;
    openPortal(a.getAttribute('href'));
  });

  /* ============ EDIT MODE ============ */
  const editableTextFields = ['nameField','roleField','bioField','emailField','locField','ghField','liField'];
  function setEditMode(on){
    editMode = on;
    document.getElementById('app').classList.toggle('edit-on', editMode);
    editableTextFields.forEach(id=>{
      const el = document.getElementById(id);
      el.contentEditable = editMode;
    });
    if(!editMode){
      DATA.profile.name = document.getElementById('nameField').textContent.trim() || 'Your Name';
      DATA.profile.role = document.getElementById('roleField').textContent.trim();
      DATA.profile.bio = document.getElementById('bioField').textContent.trim();
      DATA.profile.email = document.getElementById('emailField').textContent.trim();
      DATA.profile.location = document.getElementById('locField').textContent.trim();
      DATA.profile.github = document.getElementById('ghField').textContent.trim();
      DATA.profile.linkedin = document.getElementById('liField').textContent.trim();
      renderProfile();
      saveLocal();
    } else {
      renderThemePanel();
    }
    renderProjects();
    renderCustomBlocks();
  }
  editableTextFields.forEach(id=>{
    document.getElementById(id).addEventListener('blur', ()=>{ if(editMode) saveLocal(); });
  });
  document.getElementById('editBadge').addEventListener('click', ()=>setEditMode(false));

  const SECRET = ['Digit6','Digit9','Digit7','Digit4','Digit2','Digit7'];
  let buf = [];
  window.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && editMode){ setEditMode(false); return; }
    if(!e.shiftKey) { return; }
    if(!/^Digit[0-9]$/.test(e.code)) return;
    buf.push(e.code);
    if(buf.length>SECRET.length) buf.shift();
    if(buf.length===SECRET.length && buf.every((v,i)=>v===SECRET[i])){
      buf=[];
      if(!editMode) setEditMode(true);
    }
  });

  /* ============ CLOCK ============ */
  function tickClock(){ document.getElementById('clock').textContent = new Date().toTimeString().slice(0,8); }
  setInterval(tickClock,1000); tickClock();

  /* ============ WORLD MAP ============ */
  const VB_W=1000, VB_H=500;
  const continents = [
    {cx:230,cy:130,rx:110,ry:65},{cx:150,cy:95,rx:75,ry:50},{cx:255,cy:205,rx:38,ry:32},
    {cx:330,cy:255,rx:52,ry:38},{cx:340,cy:325,rx:38,ry:65},{cx:348,cy:392,rx:16,ry:26},
    {cx:520,cy:108,rx:52,ry:33},{cx:495,cy:95,rx:30,ry:22},
    {cx:560,cy:178,rx:66,ry:46},{cx:558,cy:245,rx:52,ry:56},{cx:552,cy:322,rx:30,ry:26},
    {cx:645,cy:100,rx:95,ry:45},{cx:750,cy:140,rx:100,ry:55},{cx:815,cy:155,rx:55,ry:45},
    {cx:695,cy:195,rx:65,ry:38},{cx:878,cy:172,rx:32,ry:26},{cx:795,cy:225,rx:45,ry:26},
    {cx:900,cy:335,rx:52,ry:32}
  ];
  function inLand(x,y){ for(const c of continents){ const dx=(x-c.cx)/c.rx, dy=(y-c.cy)/c.ry; if(dx*dx+dy*dy<=1) return true; } return false; }
  function buildLandDots(){
    const g = document.getElementById('landDots'); let html='';
    for(let y=10;y<VB_H;y+=9){ for(let x=10;x<VB_W;x+=9){
      const jx=x+(Math.random()*4-2), jy=y+(Math.random()*4-2);
      if(inLand(jx,jy) && Math.random()>0.18){ html+='<circle cx="'+jx.toFixed(1)+'" cy="'+jy.toFixed(1)+'" r="1" fill="var(--green-dim)" opacity="'+(0.25+Math.random()*0.35).toFixed(2)+'"></circle>'; }
    }}
    g.innerHTML = html;
  }
  function buildGraticule(){
    const g = document.getElementById('graticule'); let html='';
    for(let x=0;x<=VB_W;x+=100) html+='<line x1="'+x+'" y1="0" x2="'+x+'" y2="'+VB_H+'" stroke="var(--panel-line)" stroke-width="1"></line>';
    for(let y=0;y<=VB_H;y+=100) html+='<line x1="0" y1="'+y+'" x2="'+VB_W+'" y2="'+y+'" stroke="var(--panel-line)" stroke-width="1"></line>';
    g.innerHTML = html;
  }
  const NODES = [
    {name:"NEW YORK",x:294,y:137},{name:"TORONTO",x:280,y:129},{name:"LOS ANGELES",x:172,y:156},
    {name:"SAO PAULO",x:371,y:315},{name:"LONDON",x:500,y:107},{name:"BERLIN",x:537,y:104},
    {name:"MOSCOW",x:605,y:95},{name:"CAIRO",x:587,y:167},{name:"LAGOS",x:509,y:232},
    {name:"DUBAI",x:654,y:180},{name:"MUMBAI",x:702,y:197},{name:"BEIJING",x:823,y:139},
    {name:"TOKYO",x:888,y:151},{name:"SINGAPORE",x:788,y:246},{name:"SYDNEY",x:920,y:344}
  ];
  function buildNodes(){
    const g = document.getElementById('nodesLayer'); let html='';
    NODES.forEach((n,i)=>{ html+='<g class="node" data-i="'+i+'"><circle class="pulse" cx="'+n.x+'" cy="'+n.y+'" r="3"></circle><circle class="dot" cx="'+n.x+'" cy="'+n.y+'" r="2.2"></circle><text x="'+(n.x+6)+'" y="'+(n.y+3)+'">'+n.name+'</text></g>'; });
    g.innerHTML = html;
  }
  buildLandDots(); buildGraticule(); buildNodes();

  const logPanel = document.getElementById('logPanel');
  function pushLog(text, warn){
    const row = document.createElement('div'); const t = new Date().toTimeString().slice(0,8);
    row.innerHTML = '<span class="t">['+t+']</span> '+text; if(warn) row.style.color='var(--amber)';
    logPanel.appendChild(row);
    while(logPanel.children.length>60) logPanel.removeChild(logPanel.firstChild);
    logPanel.scrollTop = logPanel.scrollHeight;
  }

  const attackLayer = document.getElementById('attackLayer');
  const fxLayer = document.getElementById('fxLayer');
  const photoBurst = document.getElementById('photoBurst');
  const photoBurstImg = document.getElementById('photoBurstImg');
  let photoCycle = 0, activeAttacks = 0;
  const MAX_CONCURRENT = 2;

  function nextPhoto(){
    const filled = DATA.photos.filter(p=>p);
    if(filled.length===0) return null;
    photoCycle = (photoCycle+1) % filled.length;
    return filled[photoCycle];
  }
  function showBurst(node){
    const src = nextPhoto();
    photoBurst.style.left = (node.x/VB_W*100)+'%';
    photoBurst.style.top = (node.y/VB_H*100)+'%';
    if(src){ photoBurstImg.src=src; photoBurstImg.style.display='block'; } else { photoBurstImg.style.display='none'; }
    photoBurst.classList.add('show');
    clearTimeout(photoBurst._t);
    photoBurst._t = setTimeout(()=>photoBurst.classList.remove('show'), 2600);
  }
  function explodeAt(node){
    const ring = document.createElementNS('http://www.w3.org/2000/svg','circle');
    ring.setAttribute('cx',node.x); ring.setAttribute('cy',node.y); ring.setAttribute('r',2);
    ring.setAttribute('class','explosion-ring'); ring.setAttribute('stroke','#ff4d4d'); ring.setAttribute('stroke-width','4'); ring.setAttribute('fill','none');
    fxLayer.appendChild(ring); setTimeout(()=>ring.remove(),950);
    document.querySelectorAll('.node .dot').forEach(d=>{
      if(+d.getAttribute('cx')===node.x && +d.getAttribute('cy')===node.y){ d.setAttribute('fill','#ff4d4d'); setTimeout(()=>d.removeAttribute('fill'),700); }
    });
  }
  function runAttack(){
    if(activeAttacks>=MAX_CONCURRENT) return;
    const src = NODES[Math.floor(Math.random()*NODES.length)];
    let dst = NODES[Math.floor(Math.random()*NODES.length)], guard=0;
    while(dst===src && guard<10){ dst = NODES[Math.floor(Math.random()*NODES.length)]; guard++; }
    const dx=dst.x-src.x, dy=dst.y-src.y, len=Math.sqrt(dx*dx+dy*dy);
    const nx=-dy/len, ny=dx/len, sign=Math.random()>0.5?1:-1, arc=Math.min(len*0.32,90)*sign;
    const mx=(src.x+dst.x)/2+nx*arc, my=(src.y+dst.y)/2+ny*arc;
    const d = 'M '+src.x+' '+src.y+' Q '+mx+' '+my+' '+dst.x+' '+dst.y;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path'); path.setAttribute('d',d); path.setAttribute('class','attack-line');
    attackLayer.appendChild(path);
    const missile = document.createElementNS('http://www.w3.org/2000/svg','circle'); missile.setAttribute('r','2.4'); missile.setAttribute('class','missile');
    attackLayer.appendChild(missile);
    pushLog('INTRUSION ATTEMPT :: '+src.name+' &rarr; '+dst.name+' :: PAYLOAD IN TRANSIT');
    activeAttacks++;
    const totalLen = path.getTotalLength(), duration = 1400+len*2.2, start = performance.now();
    function step(now){
      const t = Math.min(1,(now-start)/duration); const pt = path.getPointAtLength(t*totalLen);
      missile.setAttribute('cx',pt.x); missile.setAttribute('cy',pt.y);
      if(t<1){ requestAnimationFrame(step); } else {
        explodeAt(dst); showBurst(dst);
        pushLog('BREACH CONFIRMED :: '+dst.name+' :: ARCHIVE FILE DEPLOYED', true);
        setTimeout(()=>{ path.remove(); missile.remove(); activeAttacks--; },250);
      }
    }
    requestAnimationFrame(step);
  }
  setInterval(runAttack,2600); setTimeout(runAttack,900);

  /* ============ MATRIX RAIN ============ */
  (function rain(){
    const canvas=document.getElementById('rainCanvas'), ctx=canvas.getContext('2d');
    let w,h,cols,drops;
    function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; cols=Math.floor(w/16); drops=new Array(cols).fill(0).map(()=>Math.random()*-50); }
    resize(); window.addEventListener('resize',resize);
    const chars="01アイウエオカキクケコ$#&%!*";
    function draw(){
      ctx.fillStyle='rgba(4,7,5,0.15)'; ctx.fillRect(0,0,w,h);
      ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--green').trim()||'#3dff96';
      ctx.font='14px monospace';
      for(let i=0;i<cols;i++){ const ch=chars[Math.floor(Math.random()*chars.length)]; ctx.fillText(ch,i*16,drops[i]*16); if(drops[i]*16>h && Math.random()>0.975) drops[i]=0; drops[i]++; }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ============ BOOT SEQUENCE ============ */
  function runBoot(){
    const lines = ["> initializing kernel modules ...","> loading identity profile ......... OK","> mounting image archive [10] ...... OK","> establishing secure uplink ....... OK","> decrypting portfolio.sh","> ACCESS GRANTED"];
    const box = document.getElementById('bootLines'); box.innerHTML=''; let delay=0;
    lines.forEach(l=>{ const el=document.createElement('div'); el.textContent=l; box.appendChild(el); delay+=260; setTimeout(()=>{el.style.opacity=1;},delay); });
    setTimeout(()=>{ const cur=document.createElement('span'); cur.className='blink-cursor'; box.appendChild(cur); }, delay+200);
    setTimeout(()=>{ const boot=document.getElementById('bootScreen'); boot.classList.add('hide'); setTimeout(()=>boot.remove(),650); }, delay+900);
  }

  /* ============ INIT ============ */
  async function init(){
    await loadAll();
    applyTheme();
    renderProfile();
    renderGallery();
    renderProjects();
    renderCustomBlocks();
    runBoot();
  }
  init();
})();
