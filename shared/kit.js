/* أدوات مشتركة لدروس الوحدتين الثامنة والتاسعة (تُضاف قبل lesson.js عند kit=True) */
const qwrap=s=>s.replace(/(﴿[^﴾]+﴾)/g,'<span class="q">$1</span>');
const VN=n=>`<span class='vn'>${ar(n)}</span>`;
const after=(sel,fn)=>$(sel).addEventListener("click",()=>setTimeout(fn));
/* بطاقات تنقلب (.fl) في كل المحطات */
document.addEventListener("click",e=>{const f=e.target.closest(".fl");if(f){f.classList.toggle("flip");sfx.tap()}});

/* ---------- shared helpers ---------- */
/* key → lock: اختاري المفتاح ثم المسي موضعه */
function keyLock(keysSel,locksSel,fbSel,ITEMS,EXTRA,doneMsg){
  let sel=null;const keys=ITEMS.map((x,i)=>[x[2],i]).concat((EXTRA||[]).map(t=>[t,-1]));
  $(keysSel).innerHTML=shuffle(keys).map(([t,i])=>`<button class="key" data-i="${i}"><svg viewBox="0 0 24 24"><use href="#i-key"/></svg>${qwrap(t)}</button>`).join("");
  $(locksSel).innerHTML=ITEMS.map(([v,r],i)=>`<div class="lock" data-i="${i}"><div class="${v.startsWith("﴿")?"q":"tx"}">${v} <small>[${r}]</small></div><div class="slot">؟</div></div>`).join("");
  $(keysSel).onclick=e=>{const k=e.target.closest(".key");if(!k)return;$$(keysSel+" .key").forEach(x=>x.classList.toggle("sel",x===k&&!x.classList.contains("sel")));sel=k.classList.contains("sel")?k:null;sfx.tap()};
  $(locksSel).onclick=e=>{const l=e.target.closest(".lock");if(!l||l.classList.contains("ok"))return;if(!sel){toast("اختاري أولًا");return}
    if(sel.dataset.i===l.dataset.i){l.classList.add("ok");$(".slot",l).innerHTML=qwrap(ITEMS[l.dataset.i][2]);sel.classList.add("used");sel.classList.remove("sel");sel=null;sfx.ok();
      if($$(locksSel+" .ok").length===ITEMS.length){$(fbSel).textContent=doneMsg;$$(keysSel+' .key[data-i="-1"]').forEach(k=>k.classList.add("used"));confetti();sfx.win()}}
    else{l.classList.add("shake");setTimeout(()=>l.classList.remove("shake"),400);sfx.no()}};
}
/* sort: المسي العبارة ثم المسي العمود المناسب */
function sortInit(poolSel,lanesSel,fbSel,resetSel,ITEMS){
  let sel=null;
  const init=()=>{$(poolSel).innerHTML=shuffle(ITEMS.map((_,i)=>i)).map(i=>`<button class="trait" data-i="${i}">${qwrap(ITEMS[i][0])}</button>`).join("");$$(lanesSel+" .lane").forEach(l=>l.innerHTML="");$(fbSel).textContent="";sel=null};
  $(poolSel).onclick=e=>{const c=e.target.closest(".trait");if(!c)return;$$(poolSel+" .trait").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));sel=c.classList.contains("sel")?c:null;sfx.tap()};
  $$(lanesSel+" .road").forEach(r=>r.onclick=()=>{if(!sel){if($(poolSel+" .trait"))toast("اختاري العبارة أولًا");return}
    const i=+sel.dataset.i;
    if(ITEMS[i][1]===r.dataset.r){sel.classList.remove("sel");sel.classList.add("ok-"+r.dataset.r);sel.disabled=true;$(".lane",r).appendChild(sel);sel=null;$(fbSel).textContent="";sfx.ok();
      if(!$(poolSel+" .trait")){$(fbSel).className="fb ok";$(fbSel).textContent="أحسنتِ!";confetti();sfx.win()}}
    else{const c=sel;c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);$(fbSel).className="fb no";$(fbSel).textContent="حاولي مرة أخرى.";sfx.no()}});
  $(resetSel).onclick=init;init();
}
/* gap fill: CHIPS بطاقات، و ACC[g] أرقام البطاقات المقبولة في الفراغ g */
function gapInit(textSel,poolSel,fbSel,CHIPS,ACC,onDone){
  let sel=null;
  $(poolSel).innerHTML=shuffle(CHIPS.map((_,i)=>i)).map(i=>`<button class="chip gchip" data-i="${i}">${qwrap(CHIPS[i])}</button>`).join("");
  $(poolSel).onclick=e=>{const c=e.target.closest(".gchip");if(!c)return;$$(poolSel+" .gchip").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));sel=c.classList.contains("sel")?c:null;sfx.tap()};
  $(textSel).onclick=e=>{const g=e.target.closest(".gap");if(!g||g.classList.contains("ok"))return;if(!sel){toast("اختاري البطاقة أولًا");return}
    if(ACC[g.dataset.g].includes(+sel.dataset.i)){g.classList.add("ok");g.innerHTML=qwrap(CHIPS[sel.dataset.i]);sel.classList.add("used");sel.classList.remove("sel");sel=null;sfx.ok();
      if($$(textSel+" .gap.ok").length===ACC.length){$(fbSel).textContent="أحسنتِ!";$$(poolSel+" .gchip").forEach(c=>c.classList.add("used"));if(onDone)onDone();confetti();sfx.win()}}
    else{g.classList.add("shake");setTimeout(()=>g.classList.remove("shake"),400);sfx.no()}};
}
/* hunt: المسي الصحيح، واحذري الفخاخ. ITEMS=[[نص، رقم الآية أو "", السبب، صحيح؟]] */
function huntInit(sel,nSel,barSel,fbSel,ITEMS,doneMsg){
  let found=0;const N=ITEMS.filter(h=>h[3]).length;
  $(sel).innerHTML=shuffle(ITEMS.map((h,i)=>i)).map(i=>`<button class="hw" data-i="${i}">${ITEMS[i][0]}${ITEMS[i][1]?`<sup>${ar(ITEMS[i][1])}</sup>`:""}</button>`).join("");
  $(nSel).textContent=ar(0)+" / "+ar(N);
  $(sel).onclick=e=>{const b=e.target.closest(".hw");if(!b||b.classList.contains("ok"))return;const h=ITEMS[b.dataset.i];
    if(h[3]){b.classList.add("ok");if(h[2])b.insertAdjacentHTML("beforeend",`<small class="rc">${h[2]}</small>`);found++;$(nSel).textContent=ar(found)+" / "+ar(N);$(barSel).style.width=found/N*100+"%";sfx.ok();
      if(found===N){$(fbSel).className="fb ok";$(fbSel).textContent=doneMsg;confetti();sfx.win()}}
    else{b.classList.add("no");if(!$(".why",b))b.insertAdjacentHTML("beforeend",`<span class="why">${h[2]}</span>`);setTimeout(()=>{b.classList.remove("no");const w=$(".why",b);if(w)w.remove()},2600);sfx.no()}};
}
/* المسي العناصر كلها لتُضاء، ثم نفّذي ما بعدها */
function lightAll(sel,item,fn){$(sel).addEventListener("click",e=>{const b=e.target.closest(item);if(!b||b.classList.contains("on"))return;b.classList.add("on");sfx.ok();
  if($$(sel+" "+item+".on").length===$$(sel+" "+item).length){if(fn)fn();sfx.win()}})}

/* situations: لكل موقف خيارات، والصحيح ITEMS[i][1] */
function sitInit(sel,fbSel,ITEMS,OPTS,doneMsg){
  $(sel).innerHTML=ITEMS.map(([t],i)=>`<div class="sit" data-i="${i}"><span class="n">${ar(i+1)}</span><p>${qwrap(t)}</p><div class="so">${OPTS.map((o,k)=>`<button data-k="${k}">${o}</button>`).join("")}</div></div>`).join("");
  $(sel).onclick=e=>{const b=e.target.closest(".so button");if(!b)return;const s=b.closest(".sit");if(s.classList.contains("done"))return;
    if(+b.dataset.k===ITEMS[s.dataset.i][1]){b.classList.add("ok");s.classList.add("done");sfx.ok();if($$(sel+" .sit.done").length===ITEMS.length){$(fbSel).textContent=doneMsg;confetti();sfx.win()}}
    else{b.classList.add("no");s.classList.add("shake");setTimeout(()=>{s.classList.remove("shake");b.classList.remove("no")},700);sfx.no()}};
}
/* review film strip: REV=[[عنوان، سؤال، إجابة]] في #frames و #filmPick */
function filmInit(REV){
  $("#frames").innerHTML=REV.map(([w,q,a],i)=>`<button class="frame" data-i="${i}"><div class="in"><div class="fc front"><span class="n">${ar(i+1)}</span><b>${w}</b><small>${q}</small></div><div class="fc back"><em>الإجابة</em>${qwrap(a)}</div></div></button>`).join("");
  $("#filmPick").innerHTML=REV.map((_,i)=>`<button data-i="${i}">${ar(i+1)}</button>`).join("");
  $("#frames").onclick=e=>{const f=e.target.closest(".frame");if(!f)return;f.classList.toggle("flip");$$("#filmPick button")[f.dataset.i].classList.add("done");sfx.tap()};
  $("#filmPick").onclick=e=>{const b=e.target.closest("button");if(!b)return;const f=$$("#frames .frame")[b.dataset.i];f.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});setTimeout(()=>{f.classList.add("flip");b.classList.add("done");sfx.ok()},450)};
}
/* اختيار من متعدد داخل البطاقات .mcq[data-a] */
function mcqInit(){$$(".mcq").forEach(m=>m.onclick=e=>{const b=e.target.closest(".mo button");if(!b||m.classList.contains("done"))return;const k=$$(".mo button",m).indexOf(b);
  if(k===+m.dataset.a){b.classList.add("ok");m.classList.add("done");sfx.ok()}else{b.classList.add("no");b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);sfx.no()}})}
/* حفظ الحقول على الجهاز: sel يطابق input/textarea */
function keepFields(sel,key){const v=store.get(key,[]);$$(sel).forEach((t,i)=>{t.value=v[i]||"";t.oninput=()=>{v[i]=t.value;store.set(key,v)}})}
/* محطة الربط بالوطن: بطاقة «قيمتي ومبادرتي» في #athar و #pcard (#pName #pStep #pQ #pN #pD #pPrint #pSave)
   O={items:[[القيمة، مبادرة مقترحة، اللون، الآية، أيقونة SVG]], label, def} */
const ICO={drop:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  wave:'<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  leaf:'<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l8-8"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  book:'<path d="M12 6.5c-2-1.6-5-2-8-1.5V18c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6-.1-8 1.5z"/><path d="M12 6.5v13"/>',
  hands:'<path d="M4 14c3-1 5 0 7 2l5-1c1 0 1.5 1.5.5 2l-6 2.5c-2 .8-4 .5-6.5-.5"/><path d="M14 12a3 3 0 1 0-4-4.5A3 3 0 0 0 14 12z"/>',
  star:'<path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"/>'};
function valuesCard(O){
  const A=O.items;let athI=store.get("athI",-1),vURL="",vFile=null,vJob=0,vT=null;
  $("#athar").innerHTML=A.map(([t,s,c,,ic],i)=>`<button class="ath" style="--c:${c}" data-i="${i}"><svg viewBox="0 0 24 24">${ic}</svg><b>${t}</b><small>${s}</small></button>`).join("");
  $("#pName").value=store.get("pName","");$("#pStep").value=store.get("pStep","");
  function render(){$$("#athar .ath").forEach((b,i)=>b.classList.toggle("on",i===athI));const a=A[athI],nm=$("#pName").value.trim(),st=$("#pStep").value.trim();
    $("#pN").textContent=nm||"اسمك هنا";$("#pQ").textContent=a?a[3]:O.def;
    $("#pD").innerHTML=a?`قيمتي: <b>${a[0]}</b><br>مبادرتي: ${esc(st||a[1])}`:"اختاري قيمة من الأعلى";
    store.set("pName",nm);store.set("pStep",st);store.set("athI",athI);clearTimeout(vT);vT=setTimeout(draw,250)}
  $("#athar").onclick=e=>{const b=e.target.closest(".ath");if(!b)return;athI=+b.dataset.i;render();sfx.ok()};
  $("#pName").oninput=render;$("#pStep").oninput=render;
  async function draw(){
    if(athI<0)return;const job=++vJob;
    try{await Promise.all(["700 86px Display","56px Mushaf","600 46px Body"].map(f=>document.fonts.load(f)))}catch(e){}
    const logo=await loadImg(LOGO_SRC);if(job!==vJob)return;
    const a=A[athI],W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
    const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#0d4f46");g.addColorStop(.55,"#11806F");g.addColorStop(1,"#33246E");x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle="#F6C66B33";x.beginPath();x.arc(120,120,260,0,7);x.fill();
    x.direction="rtl";x.textAlign="right";x.fillStyle="#fff";
    x.font="600 34px Body";x.fillText(O.label,W-90,150);
    x.font="56px Mushaf";let y=290;wrapLines(x,a[3],W-180).forEach(l=>{x.fillText(l,W-90,y);y+=110});
    x.font="700 86px Display";x.fillText($("#pName").value.trim()||"طالبة مجتهدة",W-90,y+150);
    x.font="600 46px Body";x.fillStyle="#F6C66B";x.fillText("قيمتي: "+a[0],W-90,y+260);
    x.fillStyle="#fff";x.font="400 42px Body";wrapLines(x,"مبادرتي: "+($("#pStep").value.trim()||a[1]),W-180).forEach((l,i)=>x.fillText(l,W-90,y+350+i*72));
    x.font="600 34px Body";x.fillStyle="#F6C66B";x.fillText("وطن طموح • اقتصاد مزدهر • مجتمع حيوي",W-90,H-210);
    x.font="400 30px Body";x.fillStyle="#ffffffcc";x.fillText("أستاذة المادة: "+TEACHER,W-90,H-130);x.fillText("مديرة المدرسة: "+PRINCIPAL,W-90,H-84);
    if(logo)x.drawImage(tinted(logo,200,200*logo.naturalHeight/logo.naturalWidth,"#fff"),80,H-230);
    vURL=c.toDataURL("image/png");c.toBlob(b=>{if(job===vJob&&b)try{vFile=new File([b],"بطاقة-قيمتي.png",{type:"image/png"})}catch(e){vFile=null}},"image/png");
  }
  function ready(){if(athI<0){toast("اختاري قيمة أولًا");return false}if(!vURL){toast("لحظة… يتم تجهيز البطاقة");draw();return false}return true}
  $("#pPrint").onclick=()=>{if(ready())printImage(vURL,"بطاقة-قيمتي.png")};
  $("#pSave").onclick=()=>{if(ready()){sfx.win();shareImage(vURL,vFile,"بطاقة-قيمتي.png","بطاقة قيمتي")}};
  render();
}
