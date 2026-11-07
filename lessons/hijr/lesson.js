/* درس الحجر ٢٨–٥٠: تفاعلات المحطات (الهيكل المشترك في shared/core.js) */
const qwrap=s=>s.replace(/(﴿[^﴾]+﴾)/g,'<span class="q">$1</span>');
const after=(sel,fn)=>$(sel).addEventListener("click",()=>setTimeout(fn));
/* بطاقات تنقلب (.fl) في كل المحطات */
document.addEventListener("click",e=>{const f=e.target.closest(".fl");if(f){f.classList.toggle("flip");sfx.tap()}});

/* ========== 1 pledge ========== */
$$("#vows .vow").forEach(b=>b.onclick=()=>{if(b.classList.contains("lit"))return;b.classList.add("lit");const n=$$("#vows .lit").length,all=$$("#vows .vow").length;
  if(n===all){$("#sky").classList.add("dawn");$("#pledgeMsg").textContent="أضاءت النجمات الثلاث";confetti();sfx.win()}else{$("#pledgeMsg").textContent="أضاءت "+ar(n)+" من "+ar(all);sfx.ok()}});

/* ========== 2 dawn ========== */
let dawnT=[];
function dawnPlay(){const d=$("#dawn");dawnT.forEach(clearTimeout);dawnT=[];d.classList.remove("up");$$(".ln",d).forEach(l=>l.classList.remove("on"));
  dawnT.push(setTimeout(()=>d.classList.add("up"),120));$$(".ln",d).forEach((l,i)=>dawnT.push(setTimeout(()=>l.classList.add("on"),800+i*1000)))}
ENTER[2]=dawnPlay;$("#dawnAgain").onclick=dawnPlay;

/* ========== 3 review film + think & answer ========== */
const REV=[
  ["أحوال المكذبين","صفي أحوال المكذبين يوم القيامة؟","يقومون من قبورهم مسرعين لإجابة الداعي، رافعي رؤوسهم، لا يبصرون شيئًا لهول الموقف، وقلوبهم خالية؛ لكثرة الخوف والوجل."],
  ["أنواع الظلم","عدّدي أنواع الظلم مع ذكر مثال لكلٍّ منها!","أعظم الظلم: الشرك بالله. وظلم العبد لنفسه بالمعاصي: كالتهاون في الصلاة. وظلم الإنسان غيره في نفس أو مال أو عرض: كالسرقة والغيبة."],
  ["تأخير العذاب","ما سبب تأخير العذاب عن المكذبين إلى يوم القيامة؟","إمهال الظالمين سُنّة الله؛ إما أن يتوب الظالم إلى ربه، أو يزداد إثمًا فيستحق العقوبة الشديدة في الدنيا والآخرة."],
  ["فوائد نزول القرآن","استخلصي ما تضمنته الآيات من فوائد نزول القرآن.","تبليغ للناس وحجة عليهم، وتخويف لهم من عذاب الله، والاستدلال بما فيه على استحقاق الله وحده للعبادة، والاتعاظ والتذكرة."]
];
$("#frames").innerHTML=REV.map(([w,q,a],i)=>`<button class="frame" data-i="${i}"><div class="in"><div class="fc front"><span class="n">${ar(i+1)}</span><b>${w}</b><small>${q}</small></div><div class="fc back"><em>الإجابة</em>${a}</div></div></button>`).join("");
$("#filmPick").innerHTML=REV.map((_,i)=>`<button data-i="${i}">${ar(i+1)}</button>`).join("");
$("#frames").onclick=e=>{const f=e.target.closest(".frame");if(!f)return;f.classList.toggle("flip");$$("#filmPick button")[f.dataset.i].classList.add("done");sfx.tap()};
$("#filmPick").onclick=e=>{const b=e.target.closest("button");if(!b)return;const f=$$("#frames .frame")[b.dataset.i];f.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});setTimeout(()=>{f.classList.add("flip");b.classList.add("done");sfx.ok()},450)};
$$(".mcq").forEach(m=>m.onclick=e=>{const b=e.target.closest(".mo button");if(!b||m.classList.contains("done"))return;const k=$$(".mo button",m).indexOf(b);
  if(k===+m.dataset.a){b.classList.add("ok");m.classList.add("done");sfx.ok()}else{b.classList.add("no");b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);sfx.no()}});

/* ========== 4 surah topics ========== */
$$("#topics .clue").forEach(c=>c.onclick=()=>{if(c.classList.contains("on"))return;c.classList.add("on");sfx.ok();
  if($$("#topics .clue.on").length===$$("#topics .clue").length){$("#todayBox").classList.add("open");sfx.win()}});

/* ---------- shared helpers ---------- */
/* key → lock: اختاري المفتاح ثم المسي موضعه */
function keyLock(keysSel,locksSel,fbSel,ITEMS,EXTRA,doneMsg){
  let sel=null;const keys=ITEMS.map((x,i)=>[x[2],i]).concat((EXTRA||[]).map(t=>[t,-1]));
  $(keysSel).innerHTML=shuffle(keys).map(([t,i])=>`<button class="key" data-i="${i}"><svg viewBox="0 0 24 24"><use href="#i-key"/></svg>${t}</button>`).join("");
  $(locksSel).innerHTML=ITEMS.map(([v,r],i)=>`<div class="lock" data-i="${i}"><div class="${v.startsWith("﴿")?"q":"tx"}">${v} <small>[${r}]</small></div><div class="slot">؟</div></div>`).join("");
  $(keysSel).onclick=e=>{const k=e.target.closest(".key");if(!k)return;$$(keysSel+" .key").forEach(x=>x.classList.toggle("sel",x===k&&!x.classList.contains("sel")));sel=k.classList.contains("sel")?k:null;sfx.tap()};
  $(locksSel).onclick=e=>{const l=e.target.closest(".lock");if(!l||l.classList.contains("ok"))return;if(!sel){toast("اختاري أولًا");return}
    if(sel.dataset.i===l.dataset.i){l.classList.add("ok");$(".slot",l).textContent=ITEMS[l.dataset.i][2];sel.classList.add("used");sel.classList.remove("sel");sel=null;sfx.ok();
      if($$(locksSel+" .ok").length===ITEMS.length){$(fbSel).textContent=doneMsg;$$(keysSel+' .key[data-i="-1"]').forEach(k=>k.classList.add("used"));confetti();sfx.win()}}
    else{l.classList.add("shake");setTimeout(()=>l.classList.remove("shake"),400);sfx.no()}};
}
/* sort: المسي العبارة ثم المسي العمود المناسب */
function sortInit(poolSel,lanesSel,fbSel,resetSel,ITEMS){
  let sel=null;
  const init=()=>{$(poolSel).innerHTML=shuffle(ITEMS.map((_,i)=>i)).map(i=>`<button class="trait" data-i="${i}">${ITEMS[i][0]}</button>`).join("");$$(lanesSel+" .lane").forEach(l=>l.innerHTML="");$(fbSel).textContent="";sel=null};
  $(poolSel).onclick=e=>{const c=e.target.closest(".trait");if(!c)return;$$(poolSel+" .trait").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));sel=c.classList.contains("sel")?c:null;sfx.tap()};
  $$(lanesSel+" .road").forEach(r=>r.onclick=()=>{if(!sel){if($(poolSel+" .trait"))toast("اختاري العبارة أولًا");return}
    const i=+sel.dataset.i;
    if(ITEMS[i][1]===r.dataset.r){sel.classList.remove("sel");sel.classList.add("ok-"+r.dataset.r);sel.disabled=true;$(".lane",r).appendChild(sel);sel=null;$(fbSel).textContent="";sfx.ok();
      if(!$(poolSel+" .trait")){$(fbSel).className="fb ok";$(fbSel).textContent="أحسنتِ!";confetti();sfx.win()}}
    else{const c=sel;c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);$(fbSel).className="fb no";$(fbSel).textContent="حاولي مرة أخرى.";sfx.no()}});
  $(resetSel).onclick=init;init();
}
/* gap fill: CHIPS بطاقات، و ACC[g] أرقام البطاقات المقبولة في الفراغ g */
function gapInit(textSel,poolSel,fbSel,CHIPS,ACC){
  let sel=null;
  $(poolSel).innerHTML=shuffle(CHIPS.map((_,i)=>i)).map(i=>`<button class="chip gchip" data-i="${i}">${qwrap(CHIPS[i])}</button>`).join("");
  $(poolSel).onclick=e=>{const c=e.target.closest(".gchip");if(!c)return;$$(poolSel+" .gchip").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));sel=c.classList.contains("sel")?c:null;sfx.tap()};
  $(textSel).onclick=e=>{const g=e.target.closest(".gap");if(!g||g.classList.contains("ok"))return;if(!sel){toast("اختاري البطاقة أولًا");return}
    if(ACC[g.dataset.g].includes(+sel.dataset.i)){g.classList.add("ok");g.innerHTML=qwrap(CHIPS[sel.dataset.i]);sel.classList.add("used");sel.classList.remove("sel");sel=null;sfx.ok();
      if($$(textSel+" .gap.ok").length===ACC.length){$(fbSel).textContent="أحسنتِ!";confetti();sfx.win()}}
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
    else{b.classList.add("no");if(!$(".why",b))b.insertAdjacentHTML("beforeend",`<span class="why">${h[2]}</span>`);setTimeout(()=>{b.classList.remove("no");const w=$(".why",b);if(w)w.remove()},2400);sfx.no()}};
}
/* situations: لكل موقف خيارات، والصحيح ITEMS[i][1] */
function sitInit(sel,fbSel,ITEMS,OPTS,doneMsg){
  $(sel).innerHTML=ITEMS.map(([t],i)=>`<div class="sit" data-i="${i}"><span class="n">${ar(i+1)}</span><p>${t}</p><div class="so">${OPTS.map((o,k)=>`<button data-k="${k}">${o}</button>`).join("")}</div></div>`).join("");
  $(sel).onclick=e=>{const b=e.target.closest(".so button");if(!b)return;const s=b.closest(".sit");if(s.classList.contains("done"))return;
    if(+b.dataset.k===ITEMS[s.dataset.i][1]){b.classList.add("ok");s.classList.add("done");sfx.ok();if($$(sel+" .sit.done").length===ITEMS.length){$(fbSel).textContent=doneMsg;confetti();sfx.win()}}
    else{b.classList.add("no");s.classList.add("shake");setTimeout(()=>{s.classList.remove("shake");b.classList.remove("no")},700);sfx.no()}};
}

/* ========== 5 verses: s تكريم آدم، h إبليس وأتباعه، g نعيم المتقين، v المفردات، r الراء المرققة ========== */
const T28="يخبر سبحانه وتعالى عن قصة خلق آدم عليه السلام حين أخبر سبحانه الملائكة بأنه خالقٌ إنسانًا من طين يابس أسود متغير، وطلب منهم إذا أتمّ خلقه ونفخ فيه الروح أن يسجدوا له سجود تكريم وتحية، لا سجود عبادة وتعظيم، فامتثل الملائكة كلهم لهذا الأمر وسجدوا إلا إبليس؛ فقد امتنع عن السجود تكبرًا وحسدًا.";
const T34="فطرده الله من الجنة، وأخرجه منها، وأحلّ عليه اللعنة إلى يوم القيامة، فطلب إبليس من الله أن يحييه إلى يوم البعث والنشور، فأجاب الله طلبه.";
const T39="فقال إبليس: بسبب ما أغويتني وأضللتني؛ لأعملنّ على إغواء بني آدم، ولأرغّبنّهم في معصيتك، إلا عبادك الذين اصطفيتهم وهديتهم، قال الله: الطريق إلى الحق واضح وموصل إليّ وإلى دار كرامتي، ثم مرجعكم كلكم إليّ؛ فأجازيكم بأعمالكم، فأما المخلصين من عبادي فلا سلطان لك عليهم؛ لكن سلطانك وتأثيرك على من اتبعك من الضالين، الذين رضوا بولايتك وطاعتك، فمصيرك ومصيرهم إلى جهنم.";
const T45="ثم يخبر تعالى عما أعدّ للمتقين في الجنة من البساتين وعيون الماء والعسل واللبن وغيرها، سالمين من كل سوء أو منغّص أو مكدّر، آمنين من الموت والعذاب، وقد نزع الله ما في قلوبهم من عداوة وحقد مما كان في الدنيا، فهم إخوان متحابّون في الجنة، يجلسون على الأسرّة بعضهم في مقابل بعض، لا يصيبهم فيها تعب ولا مشقة، ولا يخرجون منها أبدًا.";
const T49="ثم يأمر الله تعالى نبيه ﷺ أن يخبر العباد أنه سبحانه هو الغفور للتائبين، الرحيم بهم، وأن عذابه هو العذاب الموجع المؤلم لمن يستحقه.";
const AYAT=[
 [28,"[s:وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي خَالِقٌ بَشَرًا] مِّن [v:صَلْصَالٍ] مِّنْ [v:حَمَإٍ مَّسْنُونٍ]","خلق آدم عليه السلام",T28],
 [29,"فَإِذَا [v:سَوَّيْتُهُ] [s:وَنَفَخْتُ فِيهِ مِن رُّوحِي فَقَعُوا لَهُ سَاجِدِينَ]","الأمر بالسجود لآدم",T28],
 [30,"[s:فَسَجَدَ الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ]","سجود الملائكة",T28],
 [31,"[h:إِلَّا إِبْلِيسَ أَبَىٰ أَن يَكُونَ مَعَ السَّاجِدِينَ]","امتناع إبليس",T28],
 [32,"قَالَ يَا إِبْلِيسُ مَا لَكَ أَلَّا تَكُونَ مَعَ السَّاجِدِينَ","سؤال إبليس",T28],
 [33,"[h:قَالَ لَمْ أَكُن لِّأَسْجُدَ [r:لِبَشَرٍ] خَلَقْتَهُ] مِن [v:صَلْصَالٍ] مِّنْ [v:حَمَإٍ مَّسْنُونٍ]","تكبّر إبليس",T28],
 [34,"قَالَ فَاخْرُجْ مِنْهَا فَإِنَّكَ [v:رَجِيمٌ]","طرد إبليس",T34],
 [35,"وَإِنَّ عَلَيْكَ اللَّعْنَةَ إِلَىٰ يَوْمِ الدِّينِ","اللعنة على إبليس",T34],
 [36,"[h:قَالَ رَبِّ [v:[r:فَأَنظِرْنِي]] إِلَىٰ يَوْمِ يُبْعَثُونَ]","طلب إبليس الإمهال",T34],
 [37,"قَالَ فَإِنَّكَ مِنَ [r:الْمُنظَرِينَ]","إجابة طلبه",T34],
 [38,"إِلَىٰ يَوْمِ الْوَقْتِ الْمَعْلُومِ","إلى يوم الوقت المعلوم",T34],
 [39,"[h:قَالَ رَبِّ بِمَا أَغْوَيْتَنِي [v:لَأُزَيِّنَنَّ] لَهُمْ فِي الْأَرْضِ وَلَأُغْوِيَنَّهُمْ أَجْمَعِينَ]","توعّد إبليس",T39],
 [40,"إِلَّا عِبَادَكَ مِنْهُمُ الْمُخْلَصِينَ","استثناء المخلَصين",T39],
 [41,"قَالَ هَٰذَا صِرَاطٌ عَلَيَّ مُسْتَقِيمٌ","الصراط المستقيم",T39],
 [42,"إِنَّ عِبَادِي لَيْسَ لَكَ عَلَيْهِمْ سُلْطَانٌ [h:إِلَّا مَنِ اتَّبَعَكَ مِنَ الْغَاوِينَ]","لا سلطان له على عباد الله",T39],
 [43,"[h:وَإِنَّ جَهَنَّمَ لَمَوْعِدُهُمْ أَجْمَعِينَ]","مصير إبليس وأتباعه",T39],
 [44,"[h:لَهَا سَبْعَةُ أَبْوَابٍ لِّكُلِّ بَابٍ مِّنْهُمْ جُزْءٌ مَّقْسُومٌ]","أبواب جهنم",T39],
 [45,"[g:إِنَّ الْمُتَّقِينَ فِي جَنَّاتٍ وَعُيُونٍ]","نعيم المتقين",T45],
 [46,"[g:ادْخُلُوهَا بِسَلَامٍ آمِنِينَ]","دخول الجنة بسلام",T45],
 [47,"[g:وَنَزَعْنَا مَا فِي [r:صُدُورِهِم] مِّنْ [v:غِلٍّ] إِخْوَانًا عَلَىٰ سُرُرٍ مُّتَقَابِلِينَ]","سلامة الصدور",T45],
 [48,"[g:لَا يَمَسُّهُمْ فِيهَا [v:نَصَبٌ] وَمَا هُم مِّنْهَا بِمُخْرَجِينَ]","نعيم دائم",T45],
 [49,"نَبِّئْ عِبَادِي أَنِّي أَنَا الْغَفُورُ الرَّحِيمُ","مغفرة الله ورحمته",T49],
 [50,"وَأَنَّ عَذَابِي هُوَ الْعَذَابُ الْأَلِيمُ","عذاب الله أليم",T49]
];
const W28=[["صلصال","طين يابس له صلصلة وصوت"],["حمأ مسنون","طين متغير لونه وريحه من طول مكثه"]];
const AW={28:W28,29:[["سوّيته","أتممت خلقه"]],33:W28,34:[["رجيم","مطرود مُبعد من كل خير"]],36:[["فأنظرني","فأمهلني"]],39:[["لأزيّننّ","لأحسّننّ لهم المعاصي"]],47:[["غلّ","عداوة وحقد"]],48:[["نصب","تعب ومشقة"]]};
versesInit(AYAT,AW);

/* ========== 8 vocab + مقياس معرفتي ========== */
const VOC=[
  ["صَلْصَالٍ","﴿إِنِّي خَالِقٌ بَشَرًا مِّن صَلْصَالٍ﴾","طين يابس له صلصلة وصوت"],
  ["حَمَإٍ مَّسْنُونٍ","﴿مِّن صَلْصَالٍ مِّنْ حَمَإٍ مَّسْنُونٍ﴾","طين متغير لونه وريحه من طول مكثه"],
  ["سَوَّيْتُهُ","﴿فَإِذَا سَوَّيْتُهُ وَنَفَخْتُ فِيهِ مِن رُّوحِي﴾","أتممت خلقه"],
  ["رَجِيمٌ","﴿قَالَ فَاخْرُجْ مِنْهَا فَإِنَّكَ رَجِيمٌ﴾","مطرود مُبعد من كل خير"],
  ["فَأَنظِرْنِي","﴿قَالَ رَبِّ فَأَنظِرْنِي إِلَىٰ يَوْمِ يُبْعَثُونَ﴾","فأمهلني"],
  ["لَأُزَيِّنَنَّ","﴿لَأُزَيِّنَنَّ لَهُمْ فِي الْأَرْضِ﴾","لأحسّننّ لهم المعاصي"],
  ["غِلٍّ","﴿وَنَزَعْنَا مَا فِي صُدُورِهِم مِّنْ غِلٍّ﴾","عداوة وحقد"],
  ["نَصَبٌ","﴿لَا يَمَسُّهُمْ فِيهَا نَصَبٌ﴾","تعب ومشقة"]
];
const kr=store.get("kr",{});
$("#vgrid").innerHTML=VOC.map((v,i)=>{const others=shuffle(VOC.map((x,k)=>k).filter(k=>k!==i)).slice(0,2);
  return `<div class="vcard" data-i="${i}"><div class="kr" role="group" aria-label="مقياس معرفتي بالكلمة">${["أ","ب","ج","د"].map(l=>`<button data-l="${l}" class="${kr[i]===l?"on":""}">${l}</button>`).join("")}</div><div class="w">${v[0]}</div><div class="ctx">${v[1]}</div><div class="opts">${shuffle([i,...others]).map(k=>`<button data-k="${k}">${VOC[k][2]}</button>`).join("")}</div><div class="mean">${v[2]}</div></div>`}).join("");
$("#vgrid").onclick=e=>{
  const r=e.target.closest(".kr button");if(r){const c=r.closest(".vcard"),i=c.dataset.i;kr[i]=kr[i]===r.dataset.l?"":r.dataset.l;store.set("kr",kr);$$(".kr button",c).forEach(x=>x.classList.toggle("on",x.dataset.l===kr[i]));sfx.tap();return}
  const b=e.target.closest(".opts button");if(!b)return;const c=b.closest(".vcard");
  if(b.dataset.k===c.dataset.i){b.classList.add("ok");sfx.ok();setTimeout(()=>{c.classList.add("done");if($$("#vgrid .done").length===VOC.length){$("#vFb").textContent="أحسنتنّ! اكتملت معاني الكلمات";confetti();sfx.win()}},350)}
  else{b.classList.add("no");c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);sfx.no()}};

/* ========== 9 origins ========== */
after("#origins",()=>{if($$("#origins .orig.on").length===3)$("#origAll").classList.add("open")});

/* ========== 10 angels vs iblis ========== */
sortInit("#mpool","#mlanes","#mFb","#mReset",[
  ["امتثلت الملائكة لأمر الله","m"],["سجدوا جميعًا","m"],
  ["امتنع عن السجود","i"],["تكبّرًا وحسدًا","i"],["احتقارًا لآدم؛ لأنه خُلق من طين","i"]
]);

/* ========== 11 kibr & hasad gaps ========== */
gapInit("#ktxt","#kpool","#kFb",["الكِبْر","الحسد","تكبّره وحسده","معاصي القلب","التكبّر"],[[0,4],[1],[2],[3],[4,0]]);

/* ========== 12 heart sins + situations ========== */
huntInit("#sins","#sN","#sBar","#sFb",[
  ["الكراهية","","",1],["الزنا","","ليست من معاصي القلب",0],["الكذب","","ليست من معاصي القلب",0],["الحقد","","",1],
  ["عقوق الوالدين","","ليست من معاصي القلب",0],["التكبّر","","",1],["النميمة","","ليست من معاصي القلب",0],["سوء الظن","","",1],
  ["الحسد","","",1],["قطيعة الرحم","","ليست من معاصي القلب",0],["الرياء","","",1],["الغيبة","","ليست من معاصي القلب",0]
],"أحسنتِ! هذه معاصٍ تكون بالقلب.");
sitInit("#hsits","#hsFb",[
  ["تفوّقت زميلتكِ وحصلت على جائزة، فتمنّيتِ زوال تفوّقها وألّا تحصل على التكريم.",0],
  ["نبّهتكِ زميلتكِ إلى خطأ واضح، فرفضتِ نصيحتها لأنكِ ترين نفسكِ أفضل منها.",1],
  ["نشرت طالبة تعليقًا يزعجكِ، فاندفعتِ إلى شتمها وكتابة كلمات جارحة بحقها.",2]
],["الحسد","التكبّر","الغضب وسوء الظن"],"أحسنتِ!");

/* ========== 15 entrances of shaitan ========== */
sitInit("#esits","#esFb",[
  ["قرّرت طالبة المحافظة على وردها القرآني، لكنها تقول كل يوم: سأبدأ غدًا عندما أكون أقل انشغالًا.",0],
  ["شاركت طالبة في السخرية من زميلتها، وقالت: نحن نمزح فقط، ولا نقصد الإساءة!",1],
  ["بالغت طالبة في نوافل العبادة حتى أهملت دراستها وصحتها وحقوق أسرتها، ظنًّا منها أن هذا دليل قوة إيمانها.",2],
  ["عندما حان وقت الصلاة، واصلتِ مشاهدة المقاطع قائلةً: سأصلّي بعد المقطع التالي، حتى خرج وقتها.",0]
],["التسويف عن الطاعات","تزيين الباطل","الخروج عن الوسط ومجاوزة حدّ الاعتدال"],"أحسنتِ!");

/* ========== 16 ibn kathir gaps + true/false ========== */
gapInit("#ktxt2","#kpool2","#kFb2",["الوعيد والتهديد","خيرًا فخير","شرًّا فشر"],[[0],[1],[2]]);
$("#sihha").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.o==="1"){b.classList.add("ok");$("#sihhaAns").classList.add("open");sfx.ok()}else{b.classList.add("no");sfx.no()}};

/* ========== 17 ways of safety ========== */
keyLock("#nkeys","#nlocks","#nFb",[
  ["﴿وَإِمَّا يَنزَغَنَّكَ مِنَ الشَّيْطَانِ نَزْغٌ فَاسْتَعِذْ بِاللَّهِ ۚ إِنَّهُ سَمِيعٌ عَلِيمٌ﴾","الأعراف: ٢٠٠","الاستعاذة بالله منه."],
  ["﴿إِنَّهُ لَيْسَ لَهُ سُلْطَانٌ عَلَى الَّذِينَ آمَنُوا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ﴾","النحل: ٩٩","الإيمان بالله، والاعتصام به، والتوكّل عليه."],
  ["عن جابر بن عبد الله رضي الله عنهما، أنه سمع النبي ﷺ يقول: «إذا دخل الرجل بيته، فذكر الله عند دخوله وعند طعامه، قال الشيطان: لا مبيت لكم، ولا عشاء…»","رواه مسلم","ذكر الله تعالى عند الشروع بالمباحات والواجبات والسنن، مثل الخروج من المنزل والطعام."]
],[],"أحسنتِ!");

/* ========== 18 seven gates of the fire ========== */
const D7=["جهنم","السعير","لظى","الحطمة","سقر","الجحيم","الهاوية، وهي أسفلها"];
$("#doors7").innerHTML=D7.map((n,i)=>`<button class="d7" style="--k:${i}"><span class="lbl">الباب ${["الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع"][i]}</span><b>${n}</b></button>`).join("");
$("#doors7").onclick=e=>{const d=e.target.closest(".d7");if(!d||d.classList.contains("on"))return;d.classList.add("on");sfx.ok()};

/* ========== 19 jannah: six qualities ========== */
keyLock("#jkeys","#jlocks","#jFb",[
  ["﴿إِنَّ الْمُتَّقِينَ فِي جَنَّاتٍ وَعُيُونٍ﴾","الحجر: ٤٥","أنه نعيم ذو منافع، كالجنات والعيون."],
  ["﴿ادْخُلُوهَا بِسَلَامٍ آمِنِينَ﴾","الحجر: ٤٦","أنه نعيم سالم من كل سوء، آمن من كل خوف."],
  ["﴿وَنَزَعْنَا مَا فِي صُدُورِهِم مِّنْ غِلٍّ إِخْوَانًا عَلَىٰ سُرُرٍ مُّتَقَابِلِينَ﴾","الحجر: ٤٧","فراغ قلوب أهلها من كل غلّ أو حقد أو حسد."],
  ["﴿لَا يَمَسُّهُمْ فِيهَا نَصَبٌ﴾","الحجر: ٤٨","أنه نعيم لا تعب فيه ولا مشقة."],
  ["﴿وَمَا هُم مِّنْهَا بِمُخْرَجِينَ﴾","الحجر: ٤٨","أنه نعيم أبدي دائم لا ينقطع."]
],[],"أحسنتِ!");

/* ========== 21 gates of paradise ========== */
const G8=[["باب الصلاة","يدخل منه أهل الصلاة"],["باب الجهاد","يدخل منه أهل الجهاد"],["باب الصدقة","يدخل منه أهل الصدقة"],["باب الريّان","يدخل منه أهل الصيام"],
  ["باب الأيمن","وهو باب المتوكلين الذي يدخل منه من لا حساب عليه ولا عذاب"],["باب الكاظمين الغيظ والعافين عن الناس","يدخل منه من عفا عن مظلمة"],["باب الراضين",""],["باب التوبة",""]];
$("#gates").innerHTML=G8.map(([n,d],i)=>`<button class="gate"><span class="inner"><b>${n}</b>${d?`<small>${d}</small>`:""}</span><span class="leaf r"></span><span class="leaf l"></span><span class="num">${ar(i+1)}</span></button>`).join("");
$("#gates").onclick=e=>{const g=e.target.closest(".gate");if(!g||g.classList.contains("open"))return;g.classList.add("open");sfx.ok();if($$("#gates .open").length===G8.length){confetti();sfx.win()}};

/* ========== 22 two wings ========== */
$$("#bird .wing").forEach(w=>w.addEventListener("click",()=>{w.classList.add("on");$("#w"+w.dataset.w).classList.add("on");sfx.ok();
  if($$("#bird .wing.on").length===2){$("#bird").classList.add("fly");$("#birdCap").style.opacity=1;sfx.win()}}));

/* ========== 24 connect ========== */
const CN=[["عن عبد الله بن مسعود رضي الله عنه قال: خطّ لنا رسول الله ﷺ خطًّا، ثم قال: «هذا سبيل الله»، ثم خطّ خطوطًا عن يمينه وعن شماله، ثم قال: «هذه سُبُل، على كل سبيل منها شيطان يدعو إليه»، ثم قرأ: ﴿وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ ۖ وَلَا تَتَّبِعُوا السُّبُلَ فَتَفَرَّقَ بِكُمْ عَن سَبِيلِهِ﴾ [الأنعام: ١٥٣]. رواه أحمد برقم (٤٤٣٧) وصححه الألباني.","﴿قَالَ هَٰذَا صِرَاطٌ عَلَيَّ مُسْتَقِيمٌ﴾"],
  ["أهل الجنة يتزاورون ويجتمع بعضهم ببعض.","﴿إِخْوَانًا عَلَىٰ سُرُرٍ مُّتَقَابِلِينَ﴾"],
  ["نعيم الجنة أبدي، وأهلها خالدون فيها.","﴿وَمَا هُم مِّنْهَا بِمُخْرَجِينَ﴾"]];
const CX=["﴿ادْخُلُوهَا بِسَلَامٍ آمِنِينَ﴾","﴿إِلَّا عِبَادَكَ مِنْهُمُ الْمُخْلَصِينَ﴾"];
let cI=0;
function cInit(){cI=0;$("#vtiles").innerHTML=shuffle(CN.map((c,i)=>[c[1],i]).concat(CX.map(t=>[t,-1]))).map(([t,i])=>`<button class="vtile" data-i="${i}">${t}</button>`).join("");$("#ctable").innerHTML="";$("#cFb").textContent="";cShow()}
function cShow(){$("#istn").innerHTML=cI<CN.length?`<span class="n">${ar(cI+1)}</span><span>${qwrap(CN[cI][0])}</span>`:`<span class="n">✓</span><span>اكتمل الربط! أحسنتِ.</span>`}
$("#vtiles").onclick=e=>{const t=e.target.closest(".vtile");if(!t||cI>=CN.length)return;
  if(+t.dataset.i===cI){t.classList.add("used");$("#ctable").insertAdjacentHTML("beforeend",`<tr class="ok"><td>${qwrap(CN[cI][0])}</td><td>${CN[cI][1]}</td></tr>`);cI++;cShow();$("#cFb").textContent="";sfx.ok();if(cI===CN.length){confetti();sfx.win()}}
  else{t.classList.add("shake");setTimeout(()=>t.classList.remove("shake"),400);$("#cFb").className="fb no";$("#cFb").textContent="ليس هذا الموضع، حاولي مرة أخرى.";sfx.no()}};
$("#cReset").onclick=cInit;cInit();
keyLock("#tkeys","#tlocks","#tFb",[
  ["﴿وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي خَالِقٌ بَشَرًا مِّن صَلْصَالٍ مِّنْ حَمَإٍ مَّسْنُونٍ﴾","الحجر: ٢٨","حكاية قصة خلق آدم عليه السلام."],
  ["﴿إِنَّ عِبَادِي لَيْسَ لَكَ عَلَيْهِمْ سُلْطَانٌ إِلَّا مَنِ اتَّبَعَكَ مِنَ الْغَاوِينَ ۝ وَإِنَّ جَهَنَّمَ لَمَوْعِدُهُمْ أَجْمَعِينَ﴾","الحجر: ٤٢–٤٣","بيان المصير المخيف الذي ينتظر الكافرين المكذبين."]
],["إبراز حقيقة المكذبين بهذا الدين، ودوافعهم الأساسية للتكذيب.","مواساة النبي ﷺ وتوجيهه."],"أحسنتِ!");

/* ========== 25 tajweed hunt: الراء المرققة ========== */
huntInit("#hunt","#hN","#hBar","#hFb",[
  ["لِبَشَرٍ",33,"مكسورة (وصلًا)",1],["فَأَنظِرْنِي",36,"ساكنة قبلها كسرة أصلية، وليس بعدها حرف استعلاء",1],["الْمُنظَرِينَ",37,"مكسورة",1],["صُدُورِهِم",47,"مكسورة",1],
  ["رَبُّكَ",28,"الراء مفتوحة؛ فتُفخَّم",0],["بَشَرًا",28,"الراء مفتوحة؛ فتُفخَّم",0],["رُّوحِي",29,"الراء مضمومة؛ فتُفخَّم",0],["فَاخْرُجْ",34,"الراء مضمومة؛ فتُفخَّم",0],
  ["رَجِيمٌ",34,"الراء مفتوحة؛ فتُفخَّم",0],["الْأَرْضِ",39,"ساكنة وقبلها مفتوح؛ فتُفخَّم",0],["صِرَاطٌ",41,"الراء مفتوحة؛ فتُفخَّم",0],["بِمُخْرَجِينَ",48,"الراء مفتوحة؛ فتُفخَّم",0]
],"أحسنتِ! وجدتِ أربعة مواضع للراء المرقّقة. طبّقي الحكم أثناء تلاوتك.");

/* ========== 26 learn-to-act card ========== */
const AML="هدايات أعمل بها: أتواضع، وأُخلص لله، وأحذر وساوس الشيطان، وأرجو رحمة الله وأخشى عذابه.";
let vURL="",vFile=null,vJob=0,vT=null;
$("#pName").value=store.get("pName","");
function pRender(){const nm=$("#pName").value.trim();$("#pN").textContent=nm||"اسمك هنا";store.set("pName",nm);clearTimeout(vT);vT=setTimeout(drawValue,250)}
$("#pName").oninput=pRender;
async function drawValue(){
  const job=++vJob,nm=$("#pName").value.trim();if(!nm){vURL="";return}
  try{await Promise.all(["700 86px Display","60px Mushaf","400 44px Body","600 34px Body"].map(f=>document.fonts.load(f)))}catch(e){}
  const logo=await loadImg(LOGO_SRC);if(job!==vJob)return;
  const W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#33246E");g.addColorStop(.6,"#5A45B5");g.addColorStop(1,"#C93A60");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle="#F6C66B33";x.beginPath();x.arc(120,120,260,0,7);x.fill();
  x.direction="rtl";x.textAlign="right";x.fillStyle="#fff";
  x.font="600 34px Body";x.fillText("أتعلم لأعمل | سورة الحجر ٢٨–٥٠",W-90,150);
  x.font="60px Mushaf";let y=290;wrapLines(x,"﴿إِنَّ عِبَادِي لَيْسَ لَكَ عَلَيْهِمْ سُلْطَانٌ﴾",W-180).forEach(l=>{x.fillText(l,W-90,y);y+=110});
  x.font="700 86px Display";x.fillText(nm,W-90,y+130);
  x.font="400 44px Body";wrapLines(x,AML,W-180).forEach((l,i)=>x.fillText(l,W-90,y+250+i*78));
  x.font="400 30px Body";x.fillStyle="#ffffffcc";x.fillText("أستاذة المادة: "+TEACHER,W-90,H-130);x.fillText("مديرة المدرسة: "+PRINCIPAL,W-90,H-84);
  if(logo)x.drawImage(tinted(logo,200,200*logo.naturalHeight/logo.naturalWidth,"#fff"),80,H-230);
  vURL=c.toDataURL("image/png");c.toBlob(b=>{if(job===vJob&&b)try{vFile=new File([b],"أتعلم-لأعمل.png",{type:"image/png"})}catch(e){vFile=null}},"image/png");
}
function vReady(){if(!$("#pName").value.trim()){toast("اكتبي اسمك أولًا");$("#pName").focus();return false}if(!vURL){toast("لحظة… يتم تجهيز البطاقة");drawValue();return false}return true}
$("#pPrint").onclick=()=>{if(vReady())printImage(vURL,"أتعلم-لأعمل.png")};
$("#pSave").onclick=()=>{if(vReady()){sfx.win();shareImage(vURL,vFile,"أتعلم-لأعمل.png","أتعلم لأعمل")}};
pRender();

/* ========== 27 quiz ========== */
quizInit([
  ["نوع السجود الذي طلبه الله من الملائكة لآدم عليه السلام:",["سجود عبادة","سجود تكريم وتحية","سجود تعظيم"],1],
  ["معنى <span class='q'>﴿فَأَنظِرْنِي﴾</span>:",["المشاهدة","الإمهال","النضارة"],1],
  ["معنى <span class='q'>﴿نَصَبٌ﴾</span> في قوله تعالى: <span class='q'>﴿لَا يَمَسُّهُمْ فِيهَا نَصَبٌ﴾</span>:",["احتيال وتدليس","تعب ومشقة","سلطة وقوة"],1],
  ["معنى <span class='q'>﴿صَلْصَالٍ﴾</span>:",["طين متغير لونه وريحه من طول مكثه","طين يابس له صلصلة وصوت","عداوة وحقد"],1],
  ["معنى <span class='q'>﴿رَجِيمٌ﴾</span>:",["مطرود مُبعد من كل خير","أمهلني","تعب ومشقة"],0],
  ["أخبر النبي ﷺ أن في الجنة ثمانية أبواب، وللنار … أبواب:",["ستة","خمسة","سبعة"],2],
  ["أول ذنب عُصي الله به في السماء:",["الكبر","الحسد","الظلم"],0],
  ["أول ذنب عُصي الله به في الأرض:",["الكبر","الحسد","الظلم"],1],
  ["العبادتان القلبيتان اللتان تؤكد الآيات أهمية موازنة المسلم بينهما:",["الخوف والرجاء","الصبر والشكر","التوكل والإنابة"],0],
  ["أيّ هذه الكلمات فيها راء مرقّقة؟",["رَجِيمٌ","فَأَنظِرْنِي","صِرَاطٌ"],1]
],{full:"ممتاز! ما شاء الله",good:"أحسنتِ! راجعي ما فاتك",low:"راجعي الآيات ومعناها الإجمالي، ثم أعيدي المحاولة"});

/* ========== 29 names & attributes + stages of creation ========== */
keyLock("#akeys","#alocks","#aFb",[
  ["﴿وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ﴾","الحجر: ٢٨","الرب"],
  ["﴿إِنِّي خَالِقٌ بَشَرًا مِّن صَلْصَالٍ﴾","الحجر: ٢٨","صفة الخلق"],
  ["﴿نَبِّئْ عِبَادِي أَنِّي أَنَا الْغَفُورُ الرَّحِيمُ﴾","الحجر: ٤٩","الغفور – الرحيم"],
  ["﴿وَأَنَّ عَذَابِي هُوَ الْعَذَابُ الْأَلِيمُ﴾","الحجر: ٥٠","شديد العقاب"]
],[],"أحسنتِ!");
const STG=[["تراب","﴿خَلَقَهُ مِن تُرَابٍ﴾"],["طين لازب","﴿مِّن طِينٍ لَّازِبٍ﴾"],["حمأ مسنون","﴿مِّنْ حَمَإٍ مَّسْنُونٍ﴾"],["صلصال","﴿مِن صَلْصَالٍ﴾"]];
let stI=0;
function stInit(){stI=0;$("#stages").innerHTML=shuffle(STG.map((_,i)=>i)).map(i=>`<button class="stg" data-i="${i}"><b>${STG[i][0]}</b><span class="q">${STG[i][1]}</span></button>`).join("");
  $$("#track span").forEach((s,k)=>{s.className="";s.innerHTML=ar(k+1)});$("#shinqiti").classList.remove("open")}
$("#stages").onclick=e=>{const b=e.target.closest(".stg");if(!b||b.classList.contains("used"))return;
  if(+b.dataset.i===stI){b.classList.add("used");const s=$$("#track span")[stI];s.className="ok";s.innerHTML=`<b>${STG[stI][0]}</b>`;stI++;sfx.ok();if(stI===STG.length){$("#shinqiti").classList.add("open");confetti();sfx.win()}}
  else{b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);sfx.no()}};
$("#stReset").onclick=stInit;stInit();

/* ========== 30 classify statements ========== */
sortInit("#tfpool","#tflanes","#tfFb","#tfReset",[
  ["من موضوعات سورة الحجر ذكر حال الأمم السابقة تسليةً للرسول ﷺ.","s"],
  ["التكبّر سبب لخروج المؤمن من الجنة.","d"],
  ["خاطب الله إبليس كرامةً له وتقريبًا.","n"],
  ["يقي الله عباده المخلَصين من غواية إبليس.","d"],
  ["جعل الله الملائكة يسجدون لآدم عبادةً له.","n"]
]);

/* ========== 31 notes ========== */
const nt=store.get("notes",["","",""]);
$$("#notes textarea").forEach((t,i)=>{t.value=nt[i]||"";t.oninput=()=>{nt[i]=t.value;store.set("notes",nt)}});

boot();
