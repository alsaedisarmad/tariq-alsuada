"use strict";
/* الهيكل المشترك لكل الدروس: التنقل، الأدوات، لوحة الأستاذة، المصحف، جدول التعلم، التقويم والشهادة */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const AR="٠١٢٣٤٥٦٧٨٩",ar=n=>String(n).replace(/\d/g,d=>AR[d]);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const BD=document.body.dataset,LKEY=BD.key;
const store={get(k,d){try{const v=localStorage.getItem(LKEY+":"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(LKEY+":"+k,JSON.stringify(v))}catch(e){}}};
const TEACHER="فاطمة الطلحي",PRINCIPAL="آمال باربود";
const LOGO_SRC="__LOGO__",SIGN_SRC="__SIGN__";

/* ---------- sound, toast, confetti ---------- */
const sfx=(()=>{let ctx;const tone=(f,d=.12,type="sine",g=.07,delay=0)=>{try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const t=ctx.currentTime+delay,o=ctx.createOscillator(),v=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v).connect(ctx.destination);o.start(t);o.stop(t+d+.02)}catch(e){}};
  return{tap:()=>tone(660,.05,"triangle",.04),ok:()=>{tone(660,.12);tone(880,.16,"sine",.07,.1)},no:()=>tone(190,.18,"square",.035),win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.22,"sine",.07,i*.11)),page:()=>tone(440,.05,"triangle",.025),tick:()=>tone(1000,.05,"square",.03),end:()=>[0,.25,.5].forEach(w=>tone(880,.18,"sine",.1,w))}})();
let toastT;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("on"),2600)}
function confetti(){const box=document.createElement("div");box.className="confetti";const C=["#F6C66B","#C93A60","#11806F","#5A45B5","#D98A1C"];
  for(let i=0;i<70;i++){const p=document.createElement("i");p.style.left=Math.random()*100+"vw";p.style.background=C[i%C.length];p.style.setProperty("--dx",(Math.random()*200-100)+"px");p.style.setProperty("--r",(Math.random()*720-360)+"deg");p.style.animationDuration=(1.6+Math.random()*1.6)+"s";p.style.animationDelay=Math.random()*.4+"s";box.appendChild(p)}
  document.body.appendChild(box);setTimeout(()=>box.remove(),3800)}

/* ---------- navigation ---------- */
const ST=$$(".st");let cur=-1;
const CHAPS=BD.chaps.split(",").map(s=>{const[n,c]=s.split(":");return[n,"var(--"+c+")"]});
const seen=new Set(store.get("seen",[]));
const ENTER={},LEAVE={};
function pauseMedia(){$$("audio,video").forEach(m=>{try{m.pause()}catch(e){}})}
function go(i){
  i=Math.max(0,Math.min(ST.length-1,+i||0));if(i===cur)return;
  if(LEAVE[cur])LEAVE[cur]();
  if(cur>=0)pauseMedia();
  ST.forEach((s,k)=>{s.classList.toggle("on",k===i);s.classList.toggle("back",k<i)});
  cur=i;seen.add(i);store.set("seen",[...seen]);store.set("cur",i);
  const s=ST[i];s.scrollTop=0;
  $("#progFill").style.width=(i/(ST.length-1)*100)+"%";
  $("#whereChap").textContent=s.dataset.chap;$("#whereTitle").textContent=s.dataset.title;$("#whereN").textContent=ar(i+1)+" / "+ar(ST.length);
  $("#prev").disabled=i===0;$("#next").disabled=i===ST.length-1;
  if(history.replaceState)history.replaceState(null,"","#s"+i);
  if(ENTER[i])ENTER[i]();
  sfx.page();
}
$("#prev").onclick=()=>go(cur-1);$("#next").onclick=()=>go(cur+1);
function buildMap(){
  $("#chaps").innerHTML=CHAPS.map(([c,col])=>`<div class="chap" style="--c:${col}"><h4><i></i>${c}</h4>${ST.map((s,k)=>s.dataset.chap===c?`<button class="mst${seen.has(k)?" seen":""}${k===cur?" cur":""}" data-k="${k}"><span>${ar(k+1)}</span>${esc(s.dataset.title)}</button>`:"").join("")}</div>`).join("");
}
function openMap(){buildMap();$("#map").hidden=false}
$("#where").onclick=openMap;$("#mapClose").onclick=()=>$("#map").hidden=true;
$("#chaps").onclick=e=>{const b=e.target.closest("[data-k]");if(b){$("#map").hidden=true;go(+b.dataset.k)}};

document.addEventListener("click",e=>{
  const r=e.target.closest("[data-reveal]");if(r){const el=document.getElementById(r.dataset.reveal);if(el){el.classList.toggle("open");sfx.tap()}}
  const g=e.target.closest("[data-go]");if(g)go(+g.dataset.go);
  const t=e.target.closest("[data-timer]");if(t)startTimer(+t.dataset.timer);
  const f=e.target.closest("[data-flip]");if(f){f.classList.toggle("on");sfx.page()}
});
document.addEventListener("keydown",e=>{
  if(e.target.matches("input,textarea,select")||e.ctrlKey||e.metaKey||e.altKey)return;
  const k=e.key.toLowerCase();
  if(e.key==="ArrowLeft"||e.key==="PageDown")go(cur+1);
  else if(e.key==="ArrowRight"||e.key==="PageUp")go(cur-1);
  else if(e.key==="Escape"){$("#map").hidden=true;closeDrawer();$("#picker").hidden=true;$("#imgSheet").classList.remove("on")}
  else if(k==="m"||k==="ة")$("#map").hidden?openMap():$("#map").hidden=true;
  else if(k==="t"||k==="ف")startTimer(60);
  else if(k==="r"||k==="ق")pick();
  else if(k==="f"||k==="ب")full();
});
(()=>{let x0,y0,t0,ok;const stg=$("#stage");
  stg.addEventListener("touchstart",e=>{const t=e.touches[0];x0=t.clientX;y0=t.clientY;t0=Date.now();ok=!e.target.closest(".nosw,input,textarea,canvas,button.trait,.film,.seek")},{passive:true});
  stg.addEventListener("touchend",e=>{if(!ok)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;if(Math.abs(dx)>70&&Math.abs(dy)<60&&Date.now()-t0<650)go(cur+(dx>0?1:-1))},{passive:true});
})();

/* ---------- header tools ---------- */
function setTheme(t){document.documentElement.dataset.theme=t;$("#btnTheme use").setAttribute("href",t==="night"?"#i-sun":"#i-moon");try{localStorage.setItem("lessons:theme",JSON.stringify(t))}catch(e){}}
setTheme((()=>{try{return JSON.parse(localStorage.getItem("lessons:theme"))||"day"}catch(e){return"day"}})());
$("#btnTheme").onclick=()=>setTheme(document.documentElement.dataset.theme==="night"?"day":"night");
const FS=[1,1.1,1.2,.92];let fsI=store.get("fs",0);
function setFs(){document.documentElement.style.setProperty("--fs",FS[fsI]);store.set("fs",fsI)}setFs();
$("#btnFont").onclick=()=>{fsI=(fsI+1)%FS.length;setFs();toast("حجم الخط: "+ar(Math.round(FS[fsI]*100))+"٪")};
function full(){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}}
$("#btnFull").onclick=full;

/* ---------- teams ---------- */
const TCOL=["#11806F","#D98A1C","#C93A60","#5A45B5","#2B7FB8","#6F6B80"];
const TDEF=BD.teams.split(",");
let teams=store.get("teams",null)||TDEF.slice(0,4).map(n=>({n,p:0}));
function renderTeams(bump){
  $("#teams").innerHTML=teams.map((t,i)=>`<div class="team"><span class="sw" style="background:${TCOL[i]}"></span><input value="${esc(t.n)}" data-i="${i}" maxlength="20" aria-label="اسم المجموعة"><button data-t="${i}" data-d="-1" aria-label="إنقاص">−</button><span class="pts">${ar(t.p)}</span><button data-t="${i}" data-d="1" aria-label="زيادة">+</button></div>`).join("");
  $("#score").innerHTML=teams.map((t,i)=>`<i style="background:${TCOL[i]}" title="${esc(t.n)}" class="${i===bump?"bump":""}">${ar(t.p)}</i>`).join("");
  store.set("teams",teams);
}
renderTeams();
$("#teams").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b)return;const i=+b.dataset.t;teams[i].p=Math.max(0,teams[i].p+ +b.dataset.d);renderTeams(i);if(+b.dataset.d>0)sfx.ok()});
$("#teams").addEventListener("change",e=>{const i=e.target.dataset.i;if(i!=null){teams[i].n=e.target.value.trim()||TDEF[i]||"مجموعة";renderTeams()}});
$("#teamAdd").onclick=()=>{if(teams.length<6){teams.push({n:TDEF[teams.length]||"مجموعة "+ar(teams.length+1),p:0});renderTeams()}};
$("#teamDel").onclick=()=>{if(teams.length>2){teams.pop();renderTeams()}};
$("#teamsReset").onclick=()=>{teams.forEach(t=>t.p=0);renderTeams()};
$("#score").onclick=()=>openDrawer("teams");

/* ---------- drawer ---------- */
function openDrawer(tab){$("#drawer").classList.add("on");$("#scrim").classList.add("on");if(tab)selTab(tab)}
function closeDrawer(){$("#drawer").classList.remove("on");$("#scrim").classList.remove("on")}
function selTab(n){$$(".tabs [data-tab]").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===n));$$(".pane").forEach(p=>p.hidden=p.dataset.pane!==n)}
$("#btnTeacher").onclick=()=>openDrawer();$("#drClose").onclick=closeDrawer;$("#scrim").onclick=closeDrawer;
$$(".tabs [data-tab]").forEach(b=>b.onclick=()=>selTab(b.dataset.tab));

/* ---------- timer ---------- */
const TP=[[30,"٣٠ ث"],[60,"١ د"],[120,"٢ د"],[180,"٣ د"],[300,"٥ د"],[600,"١٠ د"]];
$("#tpresets").innerHTML=TP.map(([s,l])=>`<button class="btn ghost sm" data-timer="${s}">${l}</button>`).join("");
let tTot=60,tLeft=60,tRun=false,tInt;
function tDraw(){const m=Math.floor(tLeft/60),s=tLeft%60;$("#tTxt").textContent=ar(m)+":"+ar(String(s).padStart(2,"0"));$("#tRing").style.strokeDashoffset=276.5*(1-tLeft/tTot)}
function startTimer(s){tTot=tLeft=s||60;const T=$("#timer");T.hidden=false;T.classList.remove("end");tRun=true;$("#tPause use").setAttribute("href","#i-pause");tDraw();clearInterval(tInt);
  tInt=setInterval(()=>{if(!tRun)return;tLeft--;tDraw();if(tLeft<=5&&tLeft>0)sfx.tick();if(tLeft<=0){clearInterval(tInt);tRun=false;T.classList.add("end");sfx.win()}},1000)}
$("#tPause").onclick=e=>{e.stopPropagation();if(tLeft<=0)return;tRun=!tRun;$("#tPause use").setAttribute("href",tRun?"#i-pause":"#i-play")};
$("#tReset").onclick=e=>{e.stopPropagation();startTimer(tTot)};
$("#tClose").onclick=e=>{e.stopPropagation();clearInterval(tInt);tRun=false;$("#timer").hidden=true;$("#timer").classList.remove("big")};
$("#timer").onclick=()=>$("#timer").classList.toggle("big");
$("#btnTimer").onclick=()=>$("#timer").hidden?startTimer(60):openDrawer("timer");

/* ---------- random picker ---------- */
const DEFN=Array.from({length:14},(_,i)=>"الطالبة "+ar(i+1));
let names=store.get("names",DEFN),used=[];
$("#names").value=names.join("\n");
$("#saveNames").onclick=()=>{names=$("#names").value.split("\n").map(s=>s.trim()).filter(Boolean);if(!names.length)names=DEFN;store.set("names",names);used=[];toast("حُفظت الأسماء: "+ar(names.length))};
function pick(){
  let pool=$("#noRepeat").checked?names.filter(n=>!used.includes(n)):names;
  if(!pool.length){used=[];pool=names}
  const P=$("#picker"),N=$("#pkName");P.hidden=false;let k=0,d=50;
  const spin=()=>{N.textContent=names[Math.random()*names.length|0];sfx.tap();k++;if(k<16){d*=1.13;setTimeout(spin,d)}else{const w=pool[Math.random()*pool.length|0];used.push(w);N.textContent=w;sfx.win()}};spin();
}
$("#btnPick").onclick=pick;$("#pickNow").onclick=()=>{closeDrawer();pick()};$("#pkAgain").onclick=pick;$("#pkClose").onclick=()=>$("#picker").hidden=true;

/* ---------- audio players: <div class="player" data-audio="audioId"> ---------- */
const fmt=s=>{s=isFinite(s)?Math.max(0,Math.floor(s)):0;return ar(Math.floor(s/60))+":"+ar(String(s%60).padStart(2,"0"))};
$$(".player[data-audio]").forEach(p=>{
  const a=document.getElementById(p.dataset.audio),pp=$(".pp",p),bar=$(".seek i",p),t=$(".t",p),spd=$(".spd",p),SP=[1,.75,1.25];let spI=0;
  pp.onclick=()=>{if(a.paused){pauseMedia();a.play().catch(()=>toast("تعذّر تشغيل الصوت"))}else a.pause()};
  const ico=()=>$("use",pp).setAttribute("href",a.paused?"#i-play":"#i-pause");
  a.addEventListener("play",ico);a.addEventListener("pause",ico);a.addEventListener("ended",ico);
  a.addEventListener("timeupdate",()=>{bar.style.width=(a.currentTime/(a.duration||1)*100)+"%";t.textContent=fmt(a.currentTime)+" / "+fmt(a.duration)});
  a.addEventListener("loadedmetadata",()=>t.textContent=fmt(0)+" / "+fmt(a.duration));
  $(".seek",p).onclick=e=>{const r=e.currentTarget.getBoundingClientRect();if(a.duration)a.currentTime=(e.clientX-r.left)/r.width*a.duration};
  spd.onclick=()=>{spI=(spI+1)%SP.length;a.playbackRate=SP[spI];spd.textContent=ar(SP[spI])+"×"};
});

/* ---------- verses: AYAT=[[n,"text with [cls:words]",theme,meaning]], AW={n:[[w,m]]} ---------- */
function mark(t){let p;do{p=t;t=t.replace(/\[([a-z,]+):([^\[\]]+)\]/g,(m,c,w)=>`<span class="m ${c.replace(/,/g," ")}">${w}</span>`)}while(t!==p);return t}
function versesInit(AYAT,AW,LEG){
  $("#ayat").innerHTML=AYAT.map(([n,t],i)=>`<span class="aya" data-i="${i}">${mark(t)}</span><span class="ano" data-i="${i}">${ar(n)}</span> `).join("");
  let ayI=0;
  function showAya(i){ayI=(i+AYAT.length)%AYAT.length;const[n,,th,tx]=AYAT[ayI];$$("#ayat .aya").forEach((a,k)=>a.classList.toggle("cur",k===ayI));
    $("#tfRef").textContent=ar(n);$("#tfTheme").textContent=th;$("#tfTxt").textContent=tx;$("#tfWords").innerHTML=(AW[n]||[]).map(([w,m])=>`<span><b>${w}:</b> ${m}</span>`).join("")}
  showAya(0);
  $("#ayat").addEventListener("click",e=>{const a=e.target.closest("[data-i]");if(a){showAya(+a.dataset.i);sfx.tap()}});
  $("#tfPrev").onclick=()=>showAya(ayI-1);$("#tfNext").onclick=()=>showAya(ayI+1);
  $$(".lens").forEach(b=>b.onclick=()=>{const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);$("#ayat").classList.toggle("lens-"+b.dataset.lens,on);sfx.tap();
    if(LEG&&$("#legend"))$("#legend").innerHTML=$$(".lens").filter(x=>x.getAttribute("aria-pressed")==="true").map(x=>LEG[x.dataset.lens]||"").join("")});
}

/* ---------- KWL: #kwl (three columns) and optional #kwl2 (what I learned) ---------- */
const KCOLS=[["ماذا أعرف؟","#D98A1C","#FFE7A8"],["ماذا أريد أن أعرف؟","#5A45B5","#E4DDFB"],["ماذا تعلمت؟","#11806F","#CDEFE6"]];
let kwl=store.get("kwl",[[],[],[]]);
const knote=(s,i,j)=>`<div class="knote" style="background:${KCOLS[i][2]}"><span>${esc(s)}</span><button data-c="${i}" data-j="${j}" aria-label="حذف">×</button></div>`;
function renderKwl(){
  if($("#kwl"))$("#kwl").innerHTML=KCOLS.map(([t,c],i)=>`<div class="kcol"><h4><i style="background:${c}"></i>${t}</h4>${kwl[i].map((s,j)=>knote(s,i,j)).join("")}</div>`).join("");
  if($("#kwl2"))$("#kwl2").innerHTML=`<div class="kcol"><h4><i style="background:${KCOLS[2][1]}"></i>${KCOLS[2][0]}</h4>${kwl[2].map((s,j)=>knote(s,2,j)).join("")}</div>`;
}
function addKwl(col,inp){const v=inp.value.trim();if(!v)return;kwl[col].push(v);store.set("kwl",kwl);inp.value="";renderKwl();sfx.ok()}
if($("#kwlAdd")){$("#kwlAdd").onclick=()=>addKwl(+$("#kwlCol").value,$("#kwlIn"));$("#kwlIn").onkeydown=e=>{if(e.key==="Enter")addKwl(+$("#kwlCol").value,$("#kwlIn"))}}
if($("#kwlAdd2")){$("#kwlAdd2").onclick=()=>addKwl(2,$("#kwlIn2"));$("#kwlIn2").onkeydown=e=>{if(e.key==="Enter")addKwl(2,$("#kwlIn2"))}}
document.addEventListener("click",e=>{const b=e.target.closest(".knote button[data-c]");if(!b)return;kwl[+b.dataset.c].splice(+b.dataset.j,1);store.set("kwl",kwl);renderKwl()});
renderKwl();

/* ---------- images: share / save / print ---------- */
const inApp=/FBAN|FBAV|Instagram|Line\/|Snapchat|TikTok|GSA\//.test(navigator.userAgent);
function showSheet(url,name,msg){$("#imgSheetImg").src=url;$("#imgSheetDl").href=url;$("#imgSheetDl").download=name;$("#imgSheetMsg").textContent=msg||"اضغطي مطولًا على الصورة، ثم اختاري «حفظ في الصور» أو «طباعة».";$("#imgSheet").classList.add("on")}
$("#imgSheetClose").onclick=()=>$("#imgSheet").classList.remove("on");
$("#imgSheet").addEventListener("click",e=>{if(e.target.id==="imgSheet")$("#imgSheet").classList.remove("on")});
/* يجب أن تكون الصورة جاهزة مسبقًا لتعمل الطباعة والمشاركة داخل اللمسة نفسها (متطلب سفاري الآيفون) */
function printImage(url,name){
  if(inApp||typeof window.print!=="function"){showSheet(url,name,"هذا المتصفح لا يدعم الطباعة. اضغطي مطولًا على الصورة واختاري «طباعة» أو «حفظ في الصور»، أو افتحي الرابط في Safari.");return}
  $("#printImg").src=url;document.body.classList.add("pimg");
  try{window.print()}catch(e){showSheet(url,name)}
}
addEventListener("afterprint",()=>document.body.classList.remove("pimg"));
function shareImage(url,file,name,title){
  if(file&&navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file],title}).catch(err=>{if(err&&err.name!=="AbortError")showSheet(url,name)});return}
  showSheet(url,name);
}
function loadImg(src){return new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src=src})}
function wrapLines(c,text,maxW){const out=[];let line="";String(text).split(" ").forEach(w=>{const t=line?line+" "+w:w;if(c.measureText(t).width>maxW&&line){out.push(line);line=w}else line=t});if(line)out.push(line);return out}
function tinted(im,w,h,color){const o=document.createElement("canvas");o.width=w;o.height=h;const x=o.getContext("2d");x.drawImage(im,0,0,w,h);x.globalCompositeOperation="source-in";x.fillStyle=color;x.fillRect(0,0,w,h);return o}

/* ---------- certificate (score ≥ 70%) ---------- */
const CERT_MIN=70;
let certURL="",certFile=null,certJob=0,certT=null,certPct=0;
async function drawCert(){
  const job=++certJob,nm=($("#certName")||{}).value?$("#certName").value.trim():"";
  try{await Promise.all(["700 90px Display","700 40px Body","400 30px Body"].map(f=>document.fonts.load(f)))}catch(e){}
  const[logo,sign]=await Promise.all([loadImg(LOGO_SRC),loadImg(SIGN_SRC)]);
  if(job!==certJob)return;
  const W=1600,H=1130,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  x.fillStyle="#FFFDF8";x.fillRect(0,0,W,H);
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#33246E");g.addColorStop(.6,"#5A45B5");g.addColorStop(1,"#C93A60");
  x.fillStyle=g;x.fillRect(0,0,W,22);x.fillRect(0,H-22,W,22);x.fillRect(0,0,22,H);x.fillRect(W-22,0,22,H);
  x.strokeStyle="#D98A1C";x.lineWidth=3;x.strokeRect(48,48,W-96,H-96);x.lineWidth=1.5;x.strokeRect(60,60,W-120,H-120);
  x.fillStyle="#F6C66B33";x.beginPath();x.arc(W-60,60,200,0,7);x.fill();x.beginPath();x.arc(60,H-60,170,0,7);x.fill();
  if(logo){const lw=170,lh=lw*logo.naturalHeight/logo.naturalWidth;x.drawImage(tinted(logo,lw,lh,"#33246E"),W/2-lw/2,96)}
  x.direction="rtl";x.textAlign="center";
  x.fillStyle="#33246E";x.font="700 104px Display";x.fillText("شهادة تميّز",W/2,350);
  x.fillStyle="#5E5A75";x.font="400 38px Body";x.fillText("تُمنح الطالبة",W/2,440);
  x.fillStyle="#C93A60";x.font="700 92px Display";x.fillText(nm||"……………………",W/2,560);
  x.fillStyle="#1D1A31";x.font="600 40px Body";
  wrapLines(x,"لاجتيازها تقويم درس «"+BD.lesson+"» بنسبة "+ar(certPct)+"٪",W-360).forEach((l,i)=>x.fillText(l,W/2,660+i*60));
  x.fillStyle="#5E5A75";x.font="400 32px Body";x.fillText($(".ttl span").textContent.split("|")[0].trim(),W/2,750);
  let dt="";try{dt=new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric"}).format(new Date(store.get("certDate",Date.now())))}catch(e){}
  x.fillStyle="#5E5A75";x.font="400 28px Body";if(dt)x.fillText(dt,W/2,975);
  /* RTL: الأستاذة يسارًا مع التوقيع، والمديرة يمينًا */
  x.font="400 30px Body";x.fillStyle="#5E5A75";x.fillText("أستاذة المادة",390,850);x.fillText("مديرة المدرسة",W-390,850);
  x.font="700 40px Body";x.fillStyle="#33246E";x.fillText(TEACHER,390,1035);x.fillText(PRINCIPAL,W-390,1035);
  if(sign){const sw=210,sh=sw*sign.naturalHeight/sign.naturalWidth;x.drawImage(sign,390-sw/2,868,sw,sh)}
  certURL=c.toDataURL("image/png");
  const pv=$("#certImg");if(pv){pv.src=certURL;pv.hidden=false}
  c.toBlob(b=>{if(job===certJob&&b)try{certFile=new File([b],"شهادة-"+(nm||"الطالبة")+".png",{type:"image/png"})}catch(e){certFile=null}},"image/png");
}
function queueCert(){if(!$("#certName"))return;clearTimeout(certT);certT=setTimeout(drawCert,250)}
function certReady(){if(!$("#certName").value.trim()){toast("اكتبي اسمك أولًا");$("#certName").focus();return false}if(!certURL){toast("لحظة… يتم تجهيز الشهادة");drawCert();return false}return true}
/* اسم الطالبة: تكتبه في الغلاف فيظهر في شهادتها، ويمكن تعديله في محطة الشهادة */
const getName=()=>store.get("certName","");
function setName(v,src){store.set("certName",v);$$("#stName,#certName").forEach(i=>{if(i!==src)i.value=v});queueCert()}
if($("#stName")){$("#stName").value=getName();$("#stName").oninput=e=>setName(e.target.value,e.target)}
/* محطة «الشهادة» تُضاف بعد التقويم عند البناء؛ تُفتح بنتيجة آخر محاولة في التقويم */
const QUIZ_I=ST.findIndex(s=>s.querySelector("#quiz")),CERT_I=ST.findIndex(s=>s.querySelector("#certArea"));
const AWARD=`<svg width="28" height="28" style="vertical-align:-6px;fill:none;stroke:currentColor;stroke-width:1.8"><use href="#i-award"/></svg>`;
function certRender(){
  const A=$("#certArea");if(!A)return;const pct=store.get("certPct",0);certURL="";
  if(pct<CERT_MIN){A.innerHTML=`<div class="cert-box locked"><h3>${AWARD} الشهادة مقفلة</h3><p class="note">أجيبي عن أسئلة التقويم بنسبة ${ar(CERT_MIN)}٪ فأكثر لتظهر شهادتك هنا.</p><button class="btn sun sm mt" data-go="${QUIZ_I}">إلى التقويم</button></div>`;return}
  certPct=pct;
  A.innerHTML=`<div class="cert-box"><h3>${AWARD} استحققتِ شهادة</h3>
    <p class="note">نتيجتك في التقويم ${ar(pct)}٪. اكتبي اسمك الثلاثي كما تريدين أن يظهر في الشهادة.</p>
    <input class="field" id="certName" maxlength="40" placeholder="اسم الطالبة" value="${esc(getName())}">
    <img id="certImg" alt="الشهادة" hidden>
    <div class="row center mt"><button class="btn sun sm" id="certPrint"><svg><use href="#i-print"/></svg> طباعة الشهادة</button><button class="btn sm" id="certSave"><svg><use href="#i-save"/></svg> حفظ صورة / مشاركة</button></div></div>`;
  $("#certName").oninput=e=>setName(e.target.value,e.target);
  $("#certPrint").onclick=()=>{if(certReady())printImage(certURL,"شهادة.png")};
  $("#certSave").onclick=()=>{if(certReady()){sfx.win();shareImage(certURL,certFile,"شهادة.png","شهادة تميّز")}};
  drawCert();
}
certRender();

/* ---------- quiz: QZ=[[question, options, answerIndex, why?]] ---------- */
function quizInit(QZ,MSG){
  let qI=0,qRes=[];const Q=$("#quiz");
  /* خط المصحف للآيات فقط (﴿…﴾)، أو حين تكون كل الخيارات كلمات قرآنية مشكولة؛ وإلا فكل الخيارات بخط واحد */
  const isAya=x=>x.startsWith("﴿"),isWord=x=>/[ً-ْ]/.test(x)&&x.length<22;
  function render(){
    if(qI>=QZ.length){const s=qRes.filter(Boolean).length,pct=Math.round(s/QZ.length*100),pass=pct>=CERT_MIN;
      Q.innerHTML=`<div style="text-align:center"><p class="qn">النتيجة</p><p style="font-family:Display;font-size:3rem;color:var(--plum);margin:0">${ar(s)} / ${ar(QZ.length)}</p><p class="note" style="margin:0">${ar(pct)}٪</p><p style="font-weight:700">${s===QZ.length?MSG.full:pass?MSG.good:MSG.low}</p><button class="btn ghost sm" id="qAgain"><svg><use href="#i-replay"/></svg> إعادة التقويم</button></div>${pass?`<div class="cert-box"><h3>${AWARD} استحققتِ شهادة</h3><button class="btn sun" data-go="${CERT_I}">استلمي شهادتك <svg><use href="#i-next"/></svg></button></div>`:`<p class="note" style="text-align:center">تحصل على الشهادة من تجيب بنسبة ${ar(CERT_MIN)}٪ فأكثر.</p>`}`;
      store.set("certPct",pct);if(pass)store.set("certDate",Date.now());certRender();
      $("#qAgain").onclick=()=>{qI=0;qRes=[];render()};if(pass){confetti();sfx.win()}return}
    const[t,o,a,why]=QZ[qI],allWords=o.every(x=>isAya(x)||isWord(x)),isQ=x=>isAya(x)||allWords;
    Q.innerHTML=`<div class="qdots">${QZ.map((_,k)=>`<i class="${k<qI?(qRes[k]?"ok":"no"):k===qI?"cur":""}"></i>`).join("")}</div><div class="qn">السؤال ${ar(qI+1)} من ${ar(QZ.length)}</div><div class="qq">${t}</div><div class="qo">${o.map((x,k)=>`<button data-k="${k}"><i>${"أبجد"[k]}</i><span class="${isQ(x)?"q":""}" style="${isQ(x)?"font-size:1.35rem;line-height:1.9":""}">${x}</span></button>`).join("")}</div><div class="fb" id="qFb"></div><div class="row" id="qNextRow" hidden><button class="btn" id="qNext">${qI===QZ.length-1?"النتيجة":"التالي"} <svg><use href="#i-next"/></svg></button></div>`;
    $(".qo",Q).onclick=e=>{const b=e.target.closest("button");if(!b||Q.dataset.lock==="1")return;Q.dataset.lock="1";const k=+b.dataset.k,ok=k===a;qRes[qI]=ok;
      $$(".qo button",Q)[a].classList.add("ok");if(!ok)b.classList.add("no");ok?sfx.ok():sfx.no();
      if(why){$("#qFb").className="fb "+(ok?"ok":"no");$("#qFb").textContent=why}$("#qNextRow").hidden=false};
    Q.dataset.lock="0";$("#qNext").onclick=()=>{qI++;render()};
  }
  render();
}

/* ---------- start (called at the end of each lesson script) ---------- */
function boot(){
  $$("#pName,#tkName").forEach(i=>{if(!i.value.trim()&&getName().trim()){i.value=getName();i.dispatchEvent(new Event("input"))}});
  const hs=/^#s(\d+)$/.exec(location.hash);
  go(hs?+hs[1]:store.get("cur",0));
  if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("../sw.js").catch(()=>{});
}
