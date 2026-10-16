"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const AR="٠١٢٣٤٥٦٧٨٩",ar=n=>String(n).replace(/\d/g,d=>AR[d]);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const store={get(k,d){try{const v=localStorage.getItem("raad14:"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem("raad14:"+k,JSON.stringify(v))}catch(e){}}};

/* ---------- sound, toast, confetti ---------- */
const sfx=(()=>{let ctx;const tone=(f,d=.12,type="sine",g=.07,delay=0)=>{try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const t=ctx.currentTime+delay,o=ctx.createOscillator(),v=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v).connect(ctx.destination);o.start(t);o.stop(t+d+.02)}catch(e){}};
  return{tap:()=>tone(660,.05,"triangle",.04),ok:()=>{tone(660,.12);tone(880,.16,"sine",.07,.1)},no:()=>tone(190,.18,"square",.035),win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.22,"sine",.07,i*.11)),page:()=>tone(440,.05,"triangle",.025)}})();
let toastT;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("on"),2600)}
function confetti(){const box=document.createElement("div");box.className="confetti";const C=["#F6C66B","#C93A60","#11806F","#5A45B5","#D98A1C"];
  for(let i=0;i<70;i++){const p=document.createElement("i");p.style.left=Math.random()*100+"vw";p.style.background=C[i%C.length];p.style.setProperty("--dx",(Math.random()*200-100)+"px");p.style.setProperty("--r",(Math.random()*720-360)+"deg");p.style.animationDuration=(1.6+Math.random()*1.6)+"s";p.style.animationDelay=Math.random()*.4+"s";box.appendChild(p)}
  document.body.appendChild(box);setTimeout(()=>box.remove(),3800)}

/* ---------- navigation ---------- */
const ST=$$(".st");let cur=-1;
const CHAPS=[["البداية","var(--sun)"],["الآيات","var(--sea)"],["الطريقان","var(--plum2)"],["الأثر","var(--rose)"],["الختام","var(--ash)"]];
const seen=new Set(store.get("seen",[]));
const ENTER={},LEAVE={};
function go(i){
  i=Math.max(0,Math.min(ST.length-1,+i||0));if(i===cur)return;
  if(LEAVE[cur])LEAVE[cur]();
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
});
document.addEventListener("keydown",e=>{
  if(e.target.matches("input,textarea,select")||e.ctrlKey||e.metaKey||e.altKey)return;
  const k=e.key.toLowerCase();
  if(e.key==="ArrowLeft"||e.key==="PageDown")go(cur+1);
  else if(e.key==="ArrowRight"||e.key==="PageUp")go(cur-1);
  else if(e.key==="Escape"){$("#map").hidden=true;closeDrawer();$("#picker").hidden=true}
  else if(k==="m"||k==="ة")$("#map").hidden?openMap():$("#map").hidden=true;
  else if(k==="t"||k==="ف")startTimer(60);
  else if(k==="r"||k==="ق")pick();
  else if(k==="f"||k==="ب")full();
});
(()=>{let x0,y0,t0,ok;const stg=$("#stage");
  stg.addEventListener("touchstart",e=>{const t=e.touches[0];x0=t.clientX;y0=t.clientY;t0=Date.now();ok=!e.target.closest(".nosw,input,textarea,button.trait,.film")},{passive:true});
  stg.addEventListener("touchend",e=>{if(!ok)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;if(Math.abs(dx)>70&&Math.abs(dy)<60&&Date.now()-t0<650)go(cur+(dx>0?1:-1))},{passive:true});
})();

/* ---------- header tools ---------- */
function setTheme(t){document.documentElement.dataset.theme=t;$("#btnTheme use").setAttribute("href",t==="night"?"#i-sun":"#i-moon");store.set("theme",t)}
setTheme(store.get("theme","day"));
$("#btnTheme").onclick=()=>setTheme(document.documentElement.dataset.theme==="night"?"day":"night");
const FS=[1,1.1,1.2,.92];let fsI=store.get("fs",0);
function setFs(){document.documentElement.style.setProperty("--fs",FS[fsI]);store.set("fs",fsI)}setFs();
$("#btnFont").onclick=()=>{fsI=(fsI+1)%FS.length;setFs();toast("حجم الخط: "+ar(Math.round(FS[fsI]*100))+"٪")};
function full(){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}}
$("#btnFull").onclick=full;

/* ---------- teams ---------- */
const TCOL=["#11806F","#D98A1C","#C93A60","#5A45B5","#2B7FB8","#6F6B80"];
const TDEF=["الصابرات","الذاكرات","الواصلات","المنفقات","الموفيات","المحسنات"];
let teams=store.get("teams",null)||TDEF.slice(0,4).map(n=>({n,p:0}));
function renderTeams(bump){
  $("#teams").innerHTML=teams.map((t,i)=>`<div class="team"><span class="sw" style="background:${TCOL[i]}"></span><input value="${esc(t.n)}" data-i="${i}" maxlength="20" aria-label="اسم المجموعة"><button data-t="${i}" data-d="-1" aria-label="إنقاص">−</button><span class="pts">${ar(t.p)}</span><button data-t="${i}" data-d="1" aria-label="زيادة">+</button></div>`).join("");
  $("#score").innerHTML=teams.map((t,i)=>`<i style="background:${TCOL[i]}" title="${esc(t.n)}" class="${i===bump?"bump":""}">${ar(t.p)}</i>`).join("");
  store.set("teams",teams);
}
renderTeams();
$("#teams").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b)return;const i=+b.dataset.t;teams[i].p=Math.max(0,teams[i].p+ +b.dataset.d);renderTeams(i);if(+b.dataset.d>0)sfx.ok()});
$("#teams").addEventListener("change",e=>{const i=e.target.dataset.i;if(i!=null){teams[i].n=e.target.value.trim()||TDEF[i];renderTeams()}});
$("#teamAdd").onclick=()=>{if(teams.length<6){teams.push({n:TDEF[teams.length],p:0});renderTeams()}};
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
  tInt=setInterval(()=>{if(!tRun)return;tLeft--;tDraw();if(tLeft<=0){clearInterval(tInt);tRun=false;T.classList.add("end");sfx.win()}},1000)}
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

/* ========== 1 pledge ========== */
$$("#vows .vow").forEach(b=>b.onclick=()=>{if(b.classList.contains("lit"))return;b.classList.add("lit");const n=$$("#vows .lit").length;
  if(n===4){$("#sky").classList.add("dawn");$("#pledgeMsg").textContent="اكتمل ميثاق الصف… وطلع فجر الحصة";confetti();sfx.win()}else{$("#pledgeMsg").textContent="أضاءت "+ar(n)+" من ٤";sfx.ok()}});

/* ========== 2 dawn ========== */
let dawnT=[];
function dawnPlay(){const d=$("#dawn");dawnT.forEach(clearTimeout);dawnT=[];d.classList.remove("up");$$(".ln",d).forEach(l=>l.classList.remove("on"));
  dawnT.push(setTimeout(()=>d.classList.add("up"),120));$$(".ln",d).forEach((l,i)=>dawnT.push(setTimeout(()=>l.classList.add("on"),800+i*1000)))}
ENTER[2]=dawnPlay;$("#dawnAgain").onclick=dawnPlay;

/* ========== 3 review film ========== */
const REV=[
  ["تَغِيضُ الْأَرْحَامُ","بيّني المعنى","ما تنقصه الأرحام، من سِقطٍ أو نقصٍ في مدة الحمل."],
  ["سَارِبٌ بِالنَّهَارِ","بيّني المعنى","ظاهرٌ ذاهبٌ في طريقه بالنهار."],
  ["لَهُ مُعَقِّبَاتٌ","بيّني المعنى","ملائكة يتعاقبون على الإنسان بالليل والنهار، يحفظونه بأمر الله."],
  ["شَدِيدُ الْمِحَالِ","بيّني المعنى","شديد القوة والأخذ والعقوبة لمن عصاه."],
  ["الْغُدُوُّ وَالْآصَالُ","بيّني المعنى","أول النهار وآخره."],
  ["المحافظة على النعم","ما الذي يجب فعله للمحافظة على النعم؟","شكر الله عليها، والثبات على طاعته، والحذر من المعاصي؛ فإن الله لا يغيّر ما بقوم من نعمة حتى يغيّروا ما بأنفسهم."]
];
$("#frames").innerHTML=REV.map(([w,q,a],i)=>`<button class="frame" data-i="${i}"><div class="in"><div class="fc front"><span class="n">${ar(i+1)}</span><b style="${i<5?"font-family:Mushaf;font-weight:400;font-size:1.5rem":""}">${w}</b><small>${q}</small></div><div class="fc back"><em>إجابة مقترحة</em>${a}</div></div></button>`).join("");
$("#filmPick").innerHTML=REV.map((_,i)=>`<button data-i="${i}">${ar(i+1)}</button>`).join("");
$("#frames").onclick=e=>{const f=e.target.closest(".frame");if(!f)return;f.classList.toggle("flip");$$("#filmPick button")[f.dataset.i].classList.add("done");sfx.tap()};
$("#filmPick").onclick=e=>{const b=e.target.closest("button");if(!b)return;const f=$$("#frames .frame")[b.dataset.i];f.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});setTimeout(()=>{f.classList.add("flip");b.classList.add("done");sfx.ok()},450)};

/* ========== 4 hook chat ========== */
const CHAT=[
  ["nar","","عن أبي أيوب الأنصاري رضي الله عنه: أن أعرابيًّا عرض لرسول الله ﷺ وهو في سفر، فأخذ بخطام ناقته أو بزمامها."],
  ["a","الأعرابي","يا رسول الله -أو يا محمد- أخبرني بما يقرّبني من الجنة، وما يباعدني من النار."],
  ["nar","","فكفّ النبي ﷺ، ثم نظر في أصحابه."],
  ["p","النبي ﷺ","«لقد وُفِّق، أو لقد هُدِي». كيف قلتَ؟"],
  ["nar","","فأعاد الأعرابي سؤاله."],
  ["p","النبي ﷺ","«تعبدُ الله لا تشرك به شيئًا، وتقيم الصلاة، وتؤتي الزكاة، وتصل الرحم. دَعِ الناقة»."]
];
let chatN=0;
function chatAdd(){if(chatN>=CHAT.length)return;const[c,who,t]=CHAT[chatN++];const d=document.createElement("div");d.className="bub "+c;d.innerHTML=(who?`<small>${who}</small>`:"")+t;$("#chat").appendChild(d);sfx.tap();
  if(chatN>=CHAT.length){$("#chatNext").disabled=true;toast("الآن: ما الرابط بين الحديث والآيات؟")}}
function chatReset(){chatN=0;$("#chat").innerHTML="";$("#chatNext").disabled=false;chatAdd()}
$("#chatNext").onclick=chatAdd;$("#chatReset").onclick=chatReset;chatReset();
const DL=[["عبادة الله وحده","﴿الَّذِينَ يُوفُونَ بِعَهْدِ اللَّهِ وَلَا يَنقُضُونَ الْمِيثَاقَ﴾"],["إقامة الصلاة","﴿وَأَقَامُوا الصَّلَاةَ﴾"],["إيتاء الزكاة","﴿وَأَنفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً﴾"],["صلة الرحم","﴿وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ﴾"]];
$("#dlinks").innerHTML=DL.map(([d],i)=>`<div class="dl" data-i="${i}"><button>${d}</button><span class="arr"></span><span class="vp">؟</span></div>`).join("");
$("#dlinks").onclick=e=>{const r=e.target.closest(".dl");if(!r||r.classList.contains("on"))return;r.classList.add("on");$(".vp",r).textContent=DL[r.dataset.i][1];sfx.ok();if($$("#dlinks .on").length===4)$("#hookAns").classList.add("open")};

/* ========== 5 verses ========== */
const T20="يبيّن سبحانه بعض صفات المؤمنين؛ كالوفاء بالعهود التي بينهم وبين الله وبينهم وبين الناس، ووصل ما أمرهم الله بوصله من الإيمان بالله، وصلة الأرحام، والإحسان إلى الناس. ومن صفاتهم: خشية الله، والصبر على الالتزام بما أمر الله به ونهى عنه طلبًا لمرضاته سبحانه، ومحافظتهم على الصلاة، وأداؤهم ما يجب في أموالهم من زكاة ونفقة في الخفاء والعلن، ومقابلتهم الإساءة بالإحسان.";
const T23="ومن اتصف بهذه الصفات كانت له العاقبة المحمودة في الآخرة بدخول الجنة، والاجتماع فيها بالصالحين من أهليهم، وتدخل الملائكة عليهم من كل باب؛ لتهنئتهم بعاقبة صبرهم وطاعتهم.";
const AYAT=[
 [19,"[s:أَفَمَن يَعْلَمُ أَنَّمَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ] [h:كَمَنْ هُوَ أَعْمَىٰ] ۚ إِنَّمَا يَتَذَكَّرُ [s:أُولُو [q:الْأَلْبَابِ]]","لا يستوي المهتدي والأعمى","يخاطب الله تعالى نبيه ﷺ مبيّنًا عدم المساواة بين أهل الهداية ممن يؤمن بما جاء به من الحق، وأهل الغواية ممن عميت بصائرهم عن الحق؛ إذ لا ينتفع بهذا القرآن ولا يتعظ ويعتبر إلا أصحاب العقول السليمة."],
 [20,"الَّذِينَ [s:يُوفُونَ بِعَهْدِ اللَّهِ وَلَا يَنقُضُونَ الْمِيثَاقَ]","الوفاء بالعهد",T20],
 [21,"وَالَّذِينَ [s:يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ] [s:وَيَخْشَوْنَ رَبَّهُمْ وَيَخَافُونَ سُوءَ [q:الْحِسَابِ]]","الصلة والخشية",T20],
 [22,"وَالَّذِينَ [s:صَبَرُوا [q:ابْتِغَاءَ] وَجْهِ رَبِّهِمْ] [s:وَأَقَامُوا الصَّلَاةَ] [s:وَأَنفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً] [s:[v,q:وَيَدْرَءُونَ] بِالْحَسَنَةِ السَّيِّئَةَ] أُولَٰئِكَ لَهُمْ [q:عُقْبَى] الدَّارِ","الصبر والصلاة والإنفاق",T20],
 [23,"[v:جَنَّاتُ [q:عَدْنٍ]] [q:يَدْخُلُونَهَا] وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ ۖ وَالْمَلَائِكَةُ [q:يَدْخُلُونَ] عَلَيْهِم مِّن كُلِّ [q:بَابٍ]","جزاء السعداء",T23],
 [24,"سَلَامٌ عَلَيْكُم بِمَا صَبَرْتُمْ ۚ فَنِعْمَ [q:عُقْبَى] الدَّارِ","تهنئة الملائكة",T23],
 [25,"وَالَّذِينَ [h:يَنقُضُونَ عَهْدَ اللَّهِ مِن بَعْدِ مِيثَاقِهِ] [h:وَ[q:يَقْطَعُونَ] مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ] [h:وَيُفْسِدُونَ فِي الْأَرْضِ] ۙ أُولَٰئِكَ لَهُمُ اللَّعْنَةُ وَلَهُمْ سُوءُ الدَّارِ","صفات الأشقياء ومصيرهم","وأما الأشقياء فهم على خلاف تلك الصفات؛ ولذلك كان مصيرهم إلى سوء المستقرّ يوم القيامة."],
 [26,"اللَّهُ [q:يَبْسُطُ] الرِّزْقَ لِمَن يَشَاءُ [v,q:وَيَقْدِرُ] ۚ [h:وَفَرِحُوا بِالْحَيَاةِ الدُّنْيَا] وَمَا الْحَيَاةُ الدُّنْيَا فِي الْآخِرَةِ إِلَّا مَتَاعٌ","الرزق بيد الله","يبيّن الله أنه يوسّع الرزق لمن يشاء من عباده، ويضيّقه على من يشاء منهم، وفق حكمته وعلمه بشؤون عباده وما يصلحهم. وقد فرح من لم يؤمنوا بالله بما أنعم الله عليهم في الدنيا فرح بطرٍ وطغيان، وما علموا أن ذلك استدراج منه سبحانه لهم، ولا مقارنة بين نعيم الدنيا الزائل ونعيم الجنة المقيم الذي ادّخره الله لعباده المؤمنين."],
 [27,"وَيَقُولُ الَّذِينَ كَفَرُوا لَوْلَا أُنزِلَ عَلَيْهِ آيَةٌ مِّن رَّبِّهِ ۗ قُلْ إِنَّ اللَّهَ يُضِلُّ مَن يَشَاءُ [s:وَيَهْدِي إِلَيْهِ مَنْ [q:أَنَابَ]]","الهداية بيد الله","يخبر تعالى عن تساؤل من لم يؤمنوا بالله وطلبهم المعجزات من النبي ﷺ، والله تعالى قادر على إجابة ما سألوه، ولكنه يوجّه نبيه ﷺ أن يوضّح لهم أن الله هو الهادي وهو المضلّ، سواء بعث رسوله بتلك المعجزات أو لا؛ فإن الهداية والإضلال بيده سبحانه."],
 [28,"[s:الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ] ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ [q:الْقُلُوبُ]","طمأنينة القلوب","فالمستحقون للهداية هم الذين آمنوا، وجمعوا مع إيمان القلب ذكرَ الله الذي تطيب به القلوب وتسكن إليه، والعمل الصالح بجوارحهم."],
 [29,"[s:الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ] [v:طُوبَىٰ] لَهُمْ [v:وَحُسْنُ [q:مَآبٍ]]","طوبى وحسن مآب","أولئك لهم حالٌ طيبة، ومرجعٌ حسن إلى رضوان الله وجنته."]
];
const AW={22:[["يدرؤون","يدفعون"]],23:[["جنات عدن","جنات إقامة دائمة"]],26:[["يَقْدِر","يضيّق"]],29:[["طوبى","حال طيبة وعيش طيب"],["حسن مآب","العاقبة الحسنة وهي الجنة"]]};
function mark(t){let p;do{p=t;t=t.replace(/\[([a-z,]+):([^\[\]]+)\]/g,(m,c,w)=>`<span class="m ${c.replace(/,/g," ")}">${w}</span>`)}while(t!==p);return t}
$("#ayat").innerHTML=AYAT.map(([n,t],i)=>`<span class="aya" data-i="${i}">${mark(t)}</span><span class="ano" data-i="${i}">${ar(n)}</span> `).join("");
let ayI=0;
function showAya(i){ayI=(i+AYAT.length)%AYAT.length;const[n,,th,tx]=AYAT[ayI];$$("#ayat .aya").forEach((a,k)=>a.classList.toggle("cur",k===ayI));
  $("#tfRef").textContent=ar(n);$("#tfTheme").textContent=th;$("#tfTxt").textContent=tx;$("#tfWords").innerHTML=(AW[n]||[]).map(([w,m])=>`<span><b>${w}:</b> ${m}</span>`).join("")}
showAya(0);
$("#ayat").addEventListener("click",e=>{const a=e.target.closest("[data-i]");if(a){showAya(+a.dataset.i);sfx.tap()}});
$("#tfPrev").onclick=()=>showAya(ayI-1);$("#tfNext").onclick=()=>showAya(ayI+1);
$$(".lens").forEach(b=>b.onclick=()=>{const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);$("#ayat").classList.toggle("lens-"+b.dataset.lens,on);sfx.tap()});
const aud=$("#aud"),SP=[1,.75,1.25];let spI=0;
const fmt=s=>{s=isFinite(s)?Math.max(0,Math.floor(s)):0;return ar(Math.floor(s/60))+":"+ar(String(s%60).padStart(2,"0"))};
$("#pp").onclick=()=>{aud.paused?aud.play().catch(()=>toast("تعذّر تشغيل الصوت")):aud.pause()};
aud.addEventListener("play",()=>$("#pp use").setAttribute("href","#i-pause"));
aud.addEventListener("pause",()=>$("#pp use").setAttribute("href","#i-play"));
aud.addEventListener("timeupdate",()=>{$("#seek i").style.width=(aud.currentTime/(aud.duration||1)*100)+"%";$("#ptime").textContent=fmt(aud.currentTime)+" / "+fmt(aud.duration)});
aud.addEventListener("loadedmetadata",()=>$("#ptime").textContent=fmt(0)+" / "+fmt(aud.duration));
$("#seek").onclick=e=>{const r=e.currentTarget.getBoundingClientRect();if(aud.duration)aud.currentTime=(e.clientX-r.left)/r.width*aud.duration};
$("#pspd").onclick=()=>{spI=(spI+1)%SP.length;aud.playbackRate=SP[spI];$("#pspd").textContent=ar(SP[spI])+"×"};
LEAVE[5]=()=>aud.pause();

/* ========== 7 vocab ========== */
const VOC=[
  {w:"يَدْرَءُونَ",c:"﴿وَيَدْرَءُونَ بِالْحَسَنَةِ السَّيِّئَةَ﴾",o:["يدفعون","يُردّون","يستعجلون"],a:0},
  {w:"جَنَّاتُ عَدْنٍ",c:"﴿جَنَّاتُ عَدْنٍ يَدْخُلُونَهَا﴾",o:["جنات إقامة دائمة","بساتين في الدنيا","جنات مؤقتة"],a:0},
  {w:"يَقْدِرُ",c:"﴿اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ﴾",o:["يُقدِّر","يضيّق","يقضي"],a:1},
  {w:"طُوبَىٰ",c:"﴿طُوبَىٰ لَهُمْ وَحُسْنُ مَآبٍ﴾",o:["تعبٌ ومشقّة","حال طيبة وعيش طيب","طريق طويل"],a:1},
  {w:"حُسْنُ مَآبٍ",c:"﴿طُوبَىٰ لَهُمْ وَحُسْنُ مَآبٍ﴾",o:["حُسن الخُلق","المال الكثير","العاقبة الحسنة وهي الجنة"],a:2}
];
$("#vgrid").innerHTML=VOC.map((v,i)=>`<div class="vcard" data-i="${i}"><div class="w">${v.w}</div><div class="ctx">${v.c}</div><div class="opts">${shuffle(v.o.map((o,k)=>[o,k])).map(([o,k])=>`<button data-k="${k}">${o}</button>`).join("")}</div><div class="mean">${v.o[v.a]}</div></div>`).join("");
$("#vgrid").onclick=e=>{const b=e.target.closest(".opts button");if(!b)return;const c=b.closest(".vcard"),v=VOC[c.dataset.i];
  if(+b.dataset.k===v.a){b.classList.add("ok");sfx.ok();setTimeout(()=>{c.classList.add("done");const n=$$("#vgrid .done").length;if(n===VOC.length){$("#vFb").textContent="أحسنتنّ! اكتملت معاني الكلمات الخمس";confetti();sfx.win()}},350)}
  else{b.classList.add("no");c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);sfx.no()}};

/* ========== 8 roads ========== */
const TR=[["يعلمون أن ما أُنزل من ربهم هو الحق","s"],["يوفون بعهد الله ولا ينقضون الميثاق","s"],["يصلون ما أمر الله به أن يوصل","s"],["يخشون ربهم ويخافون سوء الحساب","s"],["صبروا ابتغاء وجه ربهم","s"],["أقاموا الصلاة","s"],["أنفقوا مما رزقهم الله سرًّا وعلانية","s"],["يدفعون بالحسنة السيئة","s"],["عَمِيت بصائرهم عن الحق","h"],["ينقضون عهد الله من بعد ميثاقه","h"],["يقطعون ما أمر الله به أن يوصل","h"],["يفسدون في الأرض","h"]];
let trSel=null;
function trInit(){$("#tpool").innerHTML=shuffle(TR.map((t,i)=>i)).map(i=>`<button class="trait" data-i="${i}">${TR[i][0]}</button>`).join("");$$("#roads .lane").forEach(l=>l.innerHTML="");$("#roads").classList.remove("done");$("#trFb").textContent="";trSel=null}
function trPlace(chip,road){const i=+chip.dataset.i,ok=TR[i][1]===road.dataset.r;
  if(ok){chip.classList.remove("sel");chip.classList.add("ok-"+road.dataset.r);chip.disabled=true;$(".lane",road).appendChild(chip);sfx.ok();trSel=null;
    if(!$("#tpool .trait")){$("#roads").classList.add("done");$("#trFb").className="fb ok";$("#trFb").textContent="أحسنتِ! انظري إلى نهاية كل طريق.";confetti();sfx.win()}}
  else{chip.classList.add("shake");setTimeout(()=>chip.classList.remove("shake"),400);$("#trFb").className="fb no";$("#trFb").textContent="تأمّلي الآيات مرة أخرى: هل هذه صفة "+(road.dataset.r==="s"?"السعداء":"الأشقياء")+"؟";sfx.no()}}
(()=>{let drag=null,sx,sy,ghost=null;
  $("#tpool").addEventListener("pointerdown",e=>{const c=e.target.closest(".trait");if(!c)return;drag=c;sx=e.clientX;sy=e.clientY;c.setPointerCapture(e.pointerId)});
  $("#tpool").addEventListener("pointermove",e=>{if(!drag)return;if(!ghost&&Math.hypot(e.clientX-sx,e.clientY-sy)>8){ghost=drag.cloneNode(true);ghost.classList.add("ghost");document.body.appendChild(ghost);drag.style.opacity=".35"}
    if(ghost){ghost.style.left=(e.clientX-ghost.offsetWidth/2)+"px";ghost.style.top=(e.clientY-ghost.offsetHeight/2)+"px";const r=document.elementFromPoint(e.clientX,e.clientY);$$("#roads .road").forEach(x=>x.classList.toggle("hot",!!r&&x.contains(r)))}});
  const end=e=>{if(!drag)return;const c=drag;drag=null;
    if(ghost){ghost.remove();ghost=null;c.style.opacity="";$$("#roads .road").forEach(x=>x.classList.remove("hot"));const r=document.elementFromPoint(e.clientX,e.clientY),road=r&&r.closest(".road");if(road)trPlace(c,road)}
    else{$$("#tpool .trait").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));trSel=c.classList.contains("sel")?c:null;sfx.tap()}};
  $("#tpool").addEventListener("pointerup",end);$("#tpool").addEventListener("pointercancel",e=>{if(ghost){ghost.remove();ghost=null}if(drag)drag.style.opacity="";drag=null});
})();
$$("#roads .road").forEach(r=>r.addEventListener("click",()=>{if(trSel)trPlace(trSel,r);else if($("#tpool .trait"))toast("اختاري صفة أولًا")}));
$("#trReset").onclick=trInit;trInit();

/* ========== 9 basira ========== */
$("#eyes").onclick=e=>{const b=e.target.closest(".eye");if(!b)return;$$("#eyes .eye").forEach(x=>x.classList.remove("ok","no"));
  if(b.dataset.ok==="1"){b.classList.add("ok");$("#eyeAns").classList.add("open");sfx.ok()}else{b.classList.add("no","shake");setTimeout(()=>b.classList.remove("shake"),400);toast("فكّري: هل يمنع عمى العين من قبول الحق؟");sfx.no()}};
$("#fogR").oninput=e=>{const v=+e.target.value;$("#fogV").style.setProperty("--b",(9*(1-v/100)).toFixed(1)+"px");if(v>=92&&!$("#fogAns").classList.contains("open")){$("#fogAns").classList.add("open");sfx.ok()}};

/* ========== 11 keys3 ========== */
$("#keys3").onclick=e=>{const k=e.target.closest(".k3");if(k){k.classList.toggle("on");sfx.tap()}};

/* ========== 12 doors ========== */
const DW=["سَلَامٌ","عَلَيْكُم","بِمَا","صَبَرْتُمْ","فَنِعْمَ","عُقْبَى","الدَّارِ","۞"];
$("#doors").innerHTML=DW.map((w,i)=>`<button class="door" aria-label="الباب ${ar(i+1)}"><div class="frm"><span>${w}</span></div><div class="leaf"></div><span class="num">${ar(i+1)}</span></button>`).join("");
$("#doors").onclick=e=>{const d=e.target.closest(".door");if(!d||d.classList.contains("open"))return;d.classList.add("open");sfx.ok();
  if($$("#doors .open").length===DW.length){setTimeout(()=>{toast("سلامٌ عليكم بما صبرتم فنعم عقبى الدار");confetti();sfx.win()},700)}};

/* ========== 13 rahim web ========== */
const REL=["الأم","الأب","الإخوة","الأجداد","الأعمام","العمّات","الأخوال","الخالات"];
(()=>{const W=$("#web");let lines="";
  REL.forEach((r,i)=>{const a=-Math.PI/2+i*2*Math.PI/REL.length,x=50+40*Math.cos(a),y=50+40*Math.sin(a);lines+=`<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" data-i="${i}"/>`;
    W.insertAdjacentHTML("beforeend",`<button class="node" data-i="${i}" style="left:${x}%;top:${y}%">${r}</button>`)});
  W.insertAdjacentHTML("beforeend",`<span class="node me" style="left:50%;top:50%">أنا</span>`);
  $("#webLines").setAttribute("viewBox","0 0 100 100");$("#webLines").innerHTML=lines.replace(/<line /g,'<line vector-effect="non-scaling-stroke" ');
  W.addEventListener("click",e=>{const n=e.target.closest(".node[data-i]");if(!n||n.classList.contains("on"))return;n.classList.add("on");$(`#webLines line[data-i="${n.dataset.i}"]`).classList.add("on");sfx.ok();
    const c=$$("#web .node.on[data-i]").length,f=$$("#fruits .fruit");[2,5,8].forEach((t,k)=>{if(c>=t)f[k].classList.add("on")});
    if(c===REL.length){toast("وصلتِ رحمكِ كلها، فطابت الثمار");confetti();sfx.win()}});
})();

/* ========== 14 rizq ========== */
const IC={
  money:'<circle cx="12" cy="12" r="8"/><path d="M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2-.5-2.5-1.5M12 6.5v1.5M12 16v1.5"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/><path d="M7 12h3l1.2-2 1.6 4 1.2-2h3"/>',
  book:'<path d="M12 6.5c-2.5-2-6-2.2-8-1.2v13c2-1 5.5-.8 8 1.2 2.5-2 6-2.2 8-1.2v-13c-2-1-5.5-.8-8 1.2z"/><path d="M12 6.5v13"/>',
  family:'<circle cx="8" cy="7" r="2.5"/><circle cx="16" cy="7" r="2.5"/><circle cx="12" cy="13" r="2"/><path d="M3.5 20c0-4 2-6.5 4.5-6.5M20.5 20c0-4-2-6.5-4.5-6.5M9 20c0-2 1.3-3.5 3-3.5s3 1.5 3 3.5"/>',
  friends:'<path d="M3 13l4-4 3 1 3-3 4 1 4 4"/><path d="M7 9l5 5 2-1 3 3M9 16l2 2M3 13l3 3"/>',
  home:'<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
  calm:'<path d="M12 20c-4-2-7-5.5-7-10 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 0 4.5-3 8-7 10z"/><path d="M12 14V4"/>',
  door:'<path d="M5 20V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v15"/><path d="M3 20h18M15 12h.5"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
  voice:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h7"/>'
};
const RZ=[["مال حلال","يكفيك ويغنيك عن السؤال","money"],["صحة وعافية","بدن قوي وسلامة من الأمراض","heart"],["علم نافع","فهم في الدين وبصيرة في الحياة","book"],["أهل صالحون","أسرة صالحة، وزوج أو زوجة صالحة، وولد مبارك","family"],["أصدقاء أوفياء","صحبة صالحة تعينك على الخير","friends"],["سكن وأمان","بيت يؤويك، وأمان في حياتك","home"],["راحة القلب","طمأنينة وسكينة ورضا بما قسم الله","calm"],["توفيق","في دراسة أو وظيفة","door"],["بركة","في المال والوقت والجهد","spark"],["ذكر طيب","ثناء الناس ومحبتهم","voice"]];
$("#rizq").innerHTML=RZ.map(([b,s,ic])=>`<button class="rz"><span class="ic"><svg viewBox="0 0 24 24">${IC[ic]}</svg></span><b>${b}</b><small>${s}</small></button>`).join("");
$("#rizq").onclick=e=>{const r=e.target.closest(".rz");if(r&&!r.classList.contains("on")){r.classList.add("on");sfx.ok();if($$("#rizq .on").length===RZ.length){toast("رزق الله واسع، فهو كل ما به صلاح العبد في دنياه وآخرته");sfx.win()}}};

/* ========== 15 keys ========== */
const LK=[["﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ﴾","الطلاق: ٢–٣","تقوى الله"],
  ["﴿فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا ۝ يُرْسِلِ السَّمَاءَ عَلَيْكُم مِّدْرَارًا ۝ وَيُمْدِدْكُم بِأَمْوَالٍ وَبَنِينَ وَيَجْعَل لَّكُمْ جَنَّاتٍ وَيَجْعَل لَّكُمْ أَنْهَارًا﴾","نوح: ١٠–١٢","الإكثار من الاستغفار"],
  ["﴿وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ﴾","سبأ: ٣٩","الصدقة والإنفاق في سبيل الله"],
  ["﴿وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ﴾","إبراهيم: ٧","شكر النعم بالقلب واللسان والجوارح"]];
let kSel=null;
$("#keyrow").innerHTML=shuffle(LK.map((l,i)=>i)).map(i=>`<button class="key" data-i="${i}"><svg viewBox="0 0 24 24"><use href="#i-key"/></svg>${LK[i][2]}</button>`).join("");
$("#locks").innerHTML=LK.map(([v,r],i)=>`<div class="lock" data-i="${i}"><div class="q">${v} <small>[${r}]</small></div><div class="slot">سبب الرزق؟</div></div>`).join("");
$("#keyrow").onclick=e=>{const k=e.target.closest(".key");if(!k)return;$$("#keyrow .key").forEach(x=>x.classList.toggle("sel",x===k&&!x.classList.contains("sel")));kSel=k.classList.contains("sel")?k:null;sfx.tap()};
$("#locks").onclick=e=>{const l=e.target.closest(".lock");if(!l||l.classList.contains("ok"))return;if(!kSel){toast("اختاري مفتاحًا أولًا");return}
  if(kSel.dataset.i===l.dataset.i){l.classList.add("ok");$(".slot",l).textContent=LK[l.dataset.i][2];kSel.classList.add("used");kSel.classList.remove("sel");kSel=null;sfx.ok();
    if($$("#locks .ok").length===LK.length){$("#kFb").textContent="فُتحت الأقفال الأربعة!";confetti();sfx.win()}}
  else{l.classList.add("shake");setTimeout(()=>l.classList.remove("shake"),400);sfx.no()}};

/* ========== 16 dhikr ========== */
const DK=["سبحان الله","الحمد لله","لا إله إلا الله","الله أكبر","أستغفر الله","لا حول ولا قوة إلا بالله","تلاوة القرآن"];
let amp=70,dkc=DK.map(()=>0),wavePh=0,waveRaf=0;
$("#dhikr").innerHTML=DK.map((d,i)=>`<button data-i="${i}">${d}<span class="c"></span></button>`).join("");
$("#dhikr").onclick=e=>{const b=e.target.closest("button");if(!b)return;const i=+b.dataset.i;dkc[i]++;$(".c",b).textContent=ar(dkc[i]);
  amp=Math.max(3,amp-(dkc[i]===1?10:4));$("#calmBar").style.width=Math.round((70-amp)/67*100)+"%";sfx.tap();
  if(amp<=6&&!$("#calm").classList.contains("ok")){$("#calm").classList.add("ok");sfx.win();toast("ألا بذكر الله تطمئن القلوب")}};
function wave(){wavePh+=.05;let a="",b="";for(let x=0;x<=600;x+=10){const y1=125+amp*Math.sin(x*.025+wavePh)*Math.cos(x*.007-wavePh*.6),y2=125+amp*.7*Math.sin(x*.032-wavePh*1.3+1);a+=(x?"L":"M")+x+" "+y1.toFixed(1);b+=(x?"L":"M")+x+" "+y2.toFixed(1)}
  $("#wave1").setAttribute("d",a);$("#wave2").setAttribute("d",b);waveRaf=requestAnimationFrame(wave)}
ENTER[16]=()=>{cancelAnimationFrame(waveRaf);wave()};LEAVE[16]=()=>cancelAnimationFrame(waveRaf);

/* ========== 17 iman ========== */
const YN=[["﴿إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ يَهْدِيهِمْ رَبُّهُم بِإِيمَانِهِمْ﴾ [يونس: ٩]",1],["﴿هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا﴾ [يونس: ٥]",0],["﴿إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ﴾ [يونس: ٣]",0]];
$("#yunus").innerHTML=shuffle(YN).map(([t,o])=>`<button data-o="${o}">${t}</button>`).join("")+`<div class="reveal" id="ynAns"><div><div class="ans" style="font-family:Body;font-size:1rem">قرن الله الإيمان بالأعمال الصالحة، وجعل الهداية ثمرةً لهما؛ فالعمل داخل في مسمّى الإيمان.</div></div></div>`;
$("#yunus").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.o==="1"){b.classList.add("ok");$("#ynAns").classList.add("open");sfx.ok()}else{b.classList.add("no");sfx.no()}};
const IA=[["صلاة في وقتها",14],["صلة رحم",12],["ذكر الله",10],["كذب",-14],["قطيعة",-14]];let iman=50;
$("#imanActs").innerHTML=IA.map(([t,v],i)=>`<button class="btn sm ${v>0?"sea":"rose"}" data-i="${i}">${v>0?"+":"−"} ${t}</button>`).join("");
$("#imanActs").onclick=e=>{const b=e.target.closest("button");if(!b)return;const v=IA[b.dataset.i][1];iman=Math.max(8,Math.min(96,iman+v));$("#imanLvl").style.height=iman+"%";$("#imanTxt").textContent=v>0?"يزيد الإيمان بالطاعة":"وينقص بالمعصية";v>0?sfx.ok():sfx.no()};

/* ========== 18 connect ========== */
const CN=[["إثبات صفة العدل لله.","﴿أَفَمَن يَعْلَمُ أَنَّمَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ كَمَنْ هُوَ أَعْمَىٰ﴾"],["الإقامة في الجنة دائمة لا تزول.","﴿جَنَّاتُ عَدْنٍ﴾"],["الصبر عماد الدين، ومن أعظم أسباب دخول الجنة.","﴿سَلَامٌ عَلَيْكُم بِمَا صَبَرْتُمْ ۚ فَنِعْمَ عُقْبَى الدَّارِ﴾"],["علوّ الدرجة في الجنة بشفاعة المؤمن لأهله وذويه، فيرفعهم الله إلى منزلته إكرامًا له.","﴿يَدْخُلُونَهَا وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ﴾"],["إثبات الوجه لله.","﴿ابْتِغَاءَ وَجْهِ رَبِّهِمْ﴾"],["الهداية نتيجة حتمية للإنابة، وفي هذا دليل على قبول الله التوبة الصادقة من العبد.","﴿وَيَهْدِي إِلَيْهِ مَنْ أَنَابَ﴾"]];
let cI=0;
function cInit(){cI=0;$("#vtiles").innerHTML=shuffle(CN.map((c,i)=>i)).map(i=>`<button class="vtile" data-i="${i}">${CN[i][1]}</button>`).join("");$("#ctable").innerHTML="";$("#cFb").textContent="";cShow()}
function cShow(){$("#istn").innerHTML=cI<CN.length?`<span class="n">${ar(cI+1)}</span><span>${CN[cI][0]}</span>`:`<span class="n">✓</span><span>اكتمل الربط! أحسنتِ.</span>`}
$("#vtiles").onclick=e=>{const t=e.target.closest(".vtile");if(!t||cI>=CN.length)return;
  if(+t.dataset.i===cI){t.classList.add("used");$("#ctable").insertAdjacentHTML("beforeend",`<tr class="ok"><td>${CN[cI][0]}</td><td>${CN[cI][1]}</td></tr>`);cI++;cShow();sfx.ok();if(cI===CN.length){confetti();sfx.win()}}
  else{t.classList.add("shake");setTimeout(()=>t.classList.remove("shake"),400);$("#cFb").className="fb no";$("#cFb").textContent="ليس هذا الموضع، حاولي مرة أخرى.";sfx.no()}};
$("#cReset").onclick=cInit;cInit();

/* ========== 19 qalqala hunt ========== */
const HQ=[["الْأَلْبَابِ",19,"",1],["الْحِسَابِ",21,"",1],["ابْتِغَاءَ",22,"",1],["وَيَدْرَءُونَ",22,"",1],["عُقْبَى",22,"",1],["عَدْنٍ",23,"",1],["يَدْخُلُونَهَا",23,"",1],["بَابٍ",23,"",1],["يَقْطَعُونَ",25,"",1],["يَبْسُطُ",26,"",1],["وَيَقْدِرُ",26,"",1],["أَنَابَ",27,"",1],["الْقُلُوبُ",28,"",1],["مَآبٍ",29,"",1],
  ["يَنقُضُونَ",20,"القاف متحركة",0],["صَبَرُوا",22,"الباء متحركة",0],["رَبِّهِمْ",22,"الباء مكسورة",0],["جَنَّاتُ",23,"الجيم متحركة",0],["الرِّزْقَ",26,"القاف متحركة",0],["بِذِكْرِ",28,"الذال ليست من حروف القلقلة",0],["قُلُوبُهُم",28,"القاف والباء متحركتان",0],["طُوبَىٰ",29,"الباء متحركة",0]];
let hFound=0;
$("#hunt").innerHTML=shuffle(HQ.map((h,i)=>i)).map(i=>`<button class="hw" data-i="${i}">${HQ[i][0]}<sup>${ar(HQ[i][1])}</sup></button>`).join("");
$("#hunt").onclick=e=>{const b=e.target.closest(".hw");if(!b||b.classList.contains("ok"))return;const h=HQ[b.dataset.i];
  if(h[3]){b.classList.add("ok");hFound++;$("#hN").textContent=ar(Math.min(hFound,10))+" / ١٠";$("#hBar").style.width=Math.min(100,hFound*10)+"%";sfx.ok();
    if(hFound===10){$("#hFb").className="fb ok";$("#hFb").textContent="أحسنتِ! وجدتِ عشرة مواضع للقلقلة. طبّقي الحكم في تلاوتك.";confetti();sfx.win()}}
  else{b.classList.add("no");if(!$(".why",b))b.insertAdjacentHTML("beforeend",`<span class="why">${h[2]}</span>`);setTimeout(()=>{b.classList.remove("no");const w=$(".why",b);if(w)w.remove()},2400);sfx.no()}};

/* ========== 20 flip ========== */
$("#flip3").onclick=e=>{const f=e.target.closest(".fl");if(f){f.classList.toggle("flip");sfx.tap()}};

/* ========== 21 athar card ========== */
const ATH=[["وفاء","ألتزم بوعد أو أؤدّي أمانة","#11806F","﴿الَّذِينَ يُوفُونَ بِعَهْدِ اللَّهِ وَلَا يَنقُضُونَ الْمِيثَاقَ﴾",'<path d="M8 12l3 3 5-6"/><circle cx="12" cy="12" r="9"/>'],
  ["صلة","أبادر بصلة رحمي والإحسان إليهم","#C93A60","﴿وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ﴾",IC.family],
  ["صبر","أثبت على طاعة ربي وأجاهد نفسي","#5A45B5","﴿وَالَّذِينَ صَبَرُوا ابْتِغَاءَ وَجْهِ رَبِّهِمْ﴾",'<path d="M12 21V11M12 11c0-4 3-6 6-6 0 4-3 6-6 6zM12 14c0-3-2.5-5-5.5-5 0 3 2.5 5 5.5 5z"/>'],
  ["ذكر","أبادر بالصلاة في وقتها، وأذكر الله كثيرًا","#D98A1C","﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾",IC.book],
  ["إنفاق","أساعد من حولي بما أستطيع","#2B7FB8","﴿وَأَنفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً﴾",IC.money]];
let athI=store.get("athI",-1);
$("#athar").innerHTML=ATH.map(([t,s,c,,ic],i)=>`<button class="ath" style="--c:${c}" data-i="${i}"><svg viewBox="0 0 24 24">${ic}</svg><b>${t}</b><small>${s}</small></button>`).join("");
$("#pName").value=store.get("pName","");$("#pStep").value=store.get("pStep","");
function pRender(){$$("#athar .ath").forEach((b,i)=>b.classList.toggle("on",i===athI));const a=ATH[athI];const nm=$("#pName").value.trim(),st=$("#pStep").value.trim();
  $("#pN").textContent=nm||"اسمك هنا";$("#pQ").textContent=a?a[3]:"﴿طُوبَىٰ لَهُمْ وَحُسْنُ مَآبٍ﴾";
  $("#pD").innerHTML=a?`أثري هذا الأسبوع: <b>${a[0]}</b><br>سأبدأ بـ${esc(st||a[1])}؛ لأن هذه الآية دلّتني على ذلك.`:"اختاري أثرًا من الأعلى";
  store.set("pName",nm);store.set("pStep",st);store.set("athI",athI)}
$("#athar").onclick=e=>{const b=e.target.closest(".ath");if(!b)return;athI=+b.dataset.i;pRender();sfx.ok()};
$("#pName").oninput=pRender;$("#pStep").oninput=pRender;pRender();
$("#pPrint").onclick=()=>{if(athI<0){toast("اختاري أثرًا أولًا");return}window.print()};
const LOGO_SRC="__LOGO__";
function wrapText(ctx,text,x,y,maxW,lh){const words=text.split(" ");let line="",lines=[];for(const w of words){const t=line?line+" "+w:w;if(ctx.measureText(t).width>maxW&&line){lines.push(line);line=w}else line=t}if(line)lines.push(line);lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lh));return y+lines.length*lh}
$("#pSave").onclick=async()=>{
  if(athI<0){toast("اختاري أثرًا أولًا");return}
  try{await document.fonts.ready}catch(e){}
  const a=ATH[athI],W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#33246E");g.addColorStop(.6,"#5A45B5");g.addColorStop(1,"#C93A60");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle="#F6C66B33";x.beginPath();x.arc(120,120,260,0,7);x.fill();
  x.direction="rtl";x.textAlign="right";x.fillStyle="#fff";
  x.font="600 34px Body";x.fillText("بطاقة أثر | سورة الرعد ١٩–٢٩",W-90,150);
  x.font="56px Mushaf";let y=wrapText(x,a[3],W-90,290,W-180,110);
  x.font="700 86px Display";x.fillText($("#pName").value.trim()||"طالبة مجتهدة",W-90,(y+150));
  x.font="600 46px Body";x.fillStyle="#F6C66B";x.fillText("أثري هذا الأسبوع: "+a[0],W-90,(y+150)+110);
  x.fillStyle="#fff";x.font="400 42px Body";wrapText(x,"سأبدأ بـ"+($("#pStep").value.trim()||a[1])+"؛ لأن هذه الآية دلّتني على ذلك.",W-90,(y+150)+200,W-180,72);
  x.font="400 30px Body";x.fillStyle="#ffffffcc";x.fillText("معلمة المادة: أ. فاطمة الطلحي",W-90,H-130);x.fillText("مديرة المدرسة: أ. آمال باربود",W-90,H-84);
  await new Promise(res=>{const im=new Image();im.onload=()=>{const o=document.createElement("canvas");o.width=200;o.height=170;const ox=o.getContext("2d");ox.drawImage(im,0,0,200,170);ox.globalCompositeOperation="source-in";ox.fillStyle="#fff";ox.fillRect(0,0,200,170);x.drawImage(o,80,H-230);res()};im.onerror=res;im.src=LOGO_SRC});
  c.toBlob(async b=>{if(!b){toast("تعذّر إنشاء الصورة");return}const f=new File([b],"بطاقة-أثر.png",{type:"image/png"});
    try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:"بطاقة أثر"});return}}catch(e){if(e&&e.name==="AbortError")return}
    const u=URL.createObjectURL(b),l=document.createElement("a");l.href=u;l.download="بطاقة-أثر.png";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);toast("حُفظت الصورة")},"image/png");
};

/* ========== 22 quiz ========== */
const QZ=[
  ["المقصود بـ<b>(يدرؤون)</b> في قوله تعالى: <span class='q'>﴿وَيَدْرَءُونَ بِالْحَسَنَةِ السَّيِّئَةَ﴾</span>",["يدفعون","يُردّون","يستعجلون"],0],
  ["المقصود بـ<b>(يَقْدِر)</b> في قوله تعالى: <span class='q'>﴿اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ﴾</span>",["يُقدِّر","يضيّق","يقضي"],1],
  ["الآية التي تدل على مشروعية تهنئة المسلم على ما وهبه الله من نعمة:",["﴿أُولَٰئِكَ لَهُمْ عُقْبَى الدَّارِ﴾","﴿وَالْمَلَائِكَةُ يَدْخُلُونَ عَلَيْهِم مِّن كُلِّ بَابٍ ۝ سَلَامٌ عَلَيْكُم بِمَا صَبَرْتُمْ﴾","﴿اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ﴾"],1],
  ["الآية التي تدل على أن صلة الأرحام من صفات المؤمنين:",["﴿وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ﴾","﴿وَيَخْشَوْنَ رَبَّهُمْ وَيَخَافُونَ سُوءَ الْحِسَابِ﴾","﴿وَالَّذِينَ صَبَرُوا ابْتِغَاءَ وَجْهِ رَبِّهِمْ﴾"],0],
  ["من الأسباب المعينة على جلب الرزق في قوله تعالى: <span class='q'>﴿وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ﴾</span>",["تقوى الله","الإكثار من الاستغفار","الصدقة"],2],
  ["من صفات الأشقياء التي ذكرتها الآيات:",["يدفعون بالحسنة السيئة","يقطعون ما أمر الله به أن يوصل","ينفقون سرًّا وعلانية"],1],
  ["العمى الحقيقي الذي تشير إليه الآية التاسعة عشرة هو:",["عمى البصر","عمى البصيرة","ضعف النظر"],1]
];
let qI=0,qRes=[];
function qRender(){const Q=$("#quiz");
  if(qI>=QZ.length){const s=qRes.filter(Boolean).length;Q.innerHTML=`<div style="text-align:center"><p class="qn">النتيجة</p><p style="font-family:Display;font-size:3rem;color:var(--plum);margin:0">${ar(s)} / ${ar(QZ.length)}</p><p style="font-weight:700">${s===QZ.length?"ممتاز! أنتِ على طريق السعداء":s>=5?"أحسنتِ! راجعي ما فاتك":"راجعي الآيات ومعناها الإجمالي، ثم أعيدي المحاولة"}</p><button class="btn" id="qAgain"><svg><use href="#i-replay"/></svg> إعادة التقويم</button></div>`;
    $("#qAgain").onclick=()=>{qI=0;qRes=[];qRender()};if(s===QZ.length){confetti();sfx.win()}return}
  const[t,o,a]=QZ[qI];
  Q.innerHTML=`<div class="qdots">${QZ.map((_,k)=>`<i class="${k<qI?(qRes[k]?"ok":"no"):k===qI?"cur":""}"></i>`).join("")}</div><div class="qn">السؤال ${ar(qI+1)} من ${ar(QZ.length)}</div><div class="qq">${t}</div><div class="qo">${o.map((x,k)=>`<button data-k="${k}"><i>${"أبج"[k]}</i><span class="${x.startsWith("﴿")?"q":""}" style="${x.startsWith("﴿")?"font-size:1.15rem;line-height:2":""}">${x}</span></button>`).join("")}</div><div class="row mt" id="qNextRow" hidden><button class="btn" id="qNext">التالي <svg><use href="#i-next"/></svg></button></div>`;
  $(".qo",Q).onclick=e=>{const b=e.target.closest("button");if(!b||Q.dataset.lock==="1")return;Q.dataset.lock="1";const k=+b.dataset.k,ok=k===a;qRes[qI]=ok;
    $$(".qo button",Q)[a].classList.add("ok");if(!ok)b.classList.add("no");ok?sfx.ok():sfx.no();$("#qNextRow").hidden=false};
  Q.dataset.lock="0";$("#qNext").onclick=()=>{qI++;qRender()};
}
qRender();

/* ========== 23 stars ========== */
const podN=store.get("podN",["","",""]);
$$("#podium .pod").forEach((p,i)=>{const inp=$("input",p);inp.value=podN[i]||"";inp.oninput=()=>{podN[i]=inp.value;store.set("podN",podN)};
  $(".stb",p).onclick=()=>{p.classList.toggle("on");if(p.classList.contains("on")){confetti();sfx.win()}}});
const fl=store.get("fl",["","",""]);
$$("#flist input").forEach((inp,i)=>{inp.value=fl[i]||"";inp.oninput=()=>{fl[i]=inp.value;store.set("fl",fl)}});

/* ========== 24 notes ========== */
const nt=store.get("notes",["","",""]);
$$("#notes textarea").forEach((t,i)=>{t.value=nt[i]||"";t.oninput=()=>{nt[i]=t.value;store.set("notes",nt)}});

/* ---------- start ---------- */
const hs=/^#s(\d+)$/.exec(location.hash);
go(hs?+hs[1]:store.get("cur",0));
if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js").catch(()=>{});
