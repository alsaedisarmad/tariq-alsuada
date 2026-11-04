/* درس إبراهيم ٤٢–٥٢: تفاعلات المحطات (الهيكل المشترك في shared/core.js) */
const qwrap=s=>s.replace(/(﴿[^﴾]+﴾)/g,'<span class="q">$1</span>');

/* ========== 1 pledge ========== */
$$("#vows .vow").forEach(b=>b.onclick=()=>{if(b.classList.contains("lit"))return;b.classList.add("lit");const n=$$("#vows .lit").length,all=$$("#vows .vow").length;
  if(n===all){$("#sky").classList.add("dawn");$("#pledgeMsg").textContent="اكتملت القوانين الصفية";confetti();sfx.win()}else{$("#pledgeMsg").textContent="أضاءت "+ar(n)+" من "+ar(all);sfx.ok()}});

/* ========== 2 dawn ========== */
let dawnT=[];
function dawnPlay(){const d=$("#dawn");dawnT.forEach(clearTimeout);dawnT=[];d.classList.remove("up");$$(".ln",d).forEach(l=>l.classList.remove("on"));
  dawnT.push(setTimeout(()=>d.classList.add("up"),120));$$(".ln",d).forEach((l,i)=>dawnT.push(setTimeout(()=>l.classList.add("on"),800+i*1000)))}
ENTER[2]=dawnPlay;$("#dawnAgain").onclick=dawnPlay;

/* ========== 3 review film ========== */
const REV=[
  ["كَلِمَةً طَيِّبَةً","بيّني معنى المفردة","كلمة التوحيد: لا إله إلا الله",1],
  ["كَلِمَةٍ خَبِيثَةٍ","بيّني معنى المفردة","كلمة الكفر",1],
  ["اجْتُثَّتْ","بيّني معنى المفردة","اقتُلِعت من أصلها",1],
  ["دَارَ الْبَوَارِ","بيّني معنى المفردة","دار الهلاك، وهي جهنم",1],
  ["خِلَالٌ","بيّني معنى المفردة","صداقة",1],
  ["كلمة التوحيد","ما فضل كلمة التوحيد؟","مفتاح الجنة، وموجبة الفوز بشفاعة المصطفى ﷺ في الآخرة.",0]
];
$("#frames").innerHTML=REV.map(([w,q,a,m],i)=>`<button class="frame" data-i="${i}"><div class="in"><div class="fc front"><span class="n">${ar(i+1)}</span><b style="${m?"font-family:Mushaf;font-weight:400;font-size:1.6rem":""}">${w}</b><small>${q}</small></div><div class="fc back"><em>الإجابة</em>${a}</div></div></button>`).join("");
$("#filmPick").innerHTML=REV.map((_,i)=>`<button data-i="${i}">${ar(i+1)}</button>`).join("");
$("#frames").onclick=e=>{const f=e.target.closest(".frame");if(!f)return;f.classList.toggle("flip");$$("#filmPick button")[f.dataset.i].classList.add("done");sfx.tap()};
$("#filmPick").onclick=e=>{const b=e.target.closest("button");if(!b)return;const f=$$("#frames .frame")[b.dataset.i];f.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});setTimeout(()=>{f.classList.add("flip");b.classList.add("done");sfx.ok()},450)};

/* ========== 4 clues ========== */
$$("#clues .clue").forEach(c=>c.onclick=()=>{if(!c.classList.contains("on")){c.classList.add("on");sfx.ok()}});

/* ---------- key → lock: اختاري المفتاح ثم المسي موضعه ---------- */
function keyLock(keysSel,locksSel,fbSel,ITEMS,EXTRA,doneMsg){
  let sel=null;const keys=ITEMS.map((x,i)=>[x[2],i]).concat((EXTRA||[]).map(t=>[t,-1]));
  $(keysSel).innerHTML=shuffle(keys).map(([t,i])=>`<button class="key" data-i="${i}"><svg viewBox="0 0 24 24"><use href="#i-key"/></svg>${t}</button>`).join("");
  $(locksSel).innerHTML=ITEMS.map(([v,r],i)=>`<div class="lock" data-i="${i}"><div class="q">${v} <small>[${r}]</small></div><div class="slot">؟</div></div>`).join("");
  $(keysSel).onclick=e=>{const k=e.target.closest(".key");if(!k)return;$$(keysSel+" .key").forEach(x=>x.classList.toggle("sel",x===k&&!x.classList.contains("sel")));sel=k.classList.contains("sel")?k:null;sfx.tap()};
  $(locksSel).onclick=e=>{const l=e.target.closest(".lock");if(!l||l.classList.contains("ok"))return;if(!sel){toast("اختاري أولًا");return}
    if(sel.dataset.i===l.dataset.i){l.classList.add("ok");$(".slot",l).textContent=ITEMS[l.dataset.i][2];sel.classList.add("used");sel.classList.remove("sel");sel=null;sfx.ok();
      if($$(locksSel+" .ok").length===ITEMS.length){$(fbSel).textContent=doneMsg;$$(keysSel+' .key[data-i="-1"]').forEach(k=>k.classList.add("used"));confetti();sfx.win()}}
    else{l.classList.add("shake");setTimeout(()=>l.classList.remove("shake"),400);sfx.no()}};
}

/* ========== 5 verses: s أهوال يوم القيامة، h عذاب الكفار، v المفردات، r الراء المفخمة ========== */
const T42="يخبر الله نبيه ﷺ أنه غير ساهٍ أو غافل عما يعمله المشركون، بل هو محيط بأعمالهم يحصيها عليهم وسيجازيهم بها، فإن الله يُمهل ولا يُهمل، يؤخر عقابهم إلى يوم مهول ترتفع فيه أبصار الخلق دون أن تطرف جفونهم؛ من شدة أهوال ذلك اليوم، ومن شدة الفزع، يخرجون من قبورهم مسرعين إلى أرض المحشر، رافعي رؤوسهم لا تعود إليهم أبصارهم فلا يستطيعون الالتفات يمنة أو يسرة، وقلوبهم خاوية فارغة من شدة الفزع.";
const T44="ثم يأمر الله نبيه ﷺ بأن ينذر الناس ويخوّفهم من عذاب الله يوم القيامة، فيقول الظالمون المكذّبون: ربنا أمهلنا وأعدنا إلى الدنيا ولو زمنًا قليلًا؛ لكي نؤمن بك ونصدّق رسلك، فيقول الله لهم: ألم تحلفوا في حياتكم أنه لا انتقال لكم من الحياة الدنيا إلى الآخرة، ولا بعث بعد الموت؟ وكنتم قد سكنتم في مساكن الذين ظلموا أنفسهم بالتكذيب بالرسل، وقد رأيتم وسمعتم ما أصابهم الله به من العذاب والهلاك، ثم يبيّن سبحانه أنهم قد مكروا مكرهم العظيم، وعند الله جزاء مكرهم، ولقد كان مكرهم لإبطال الدين عظيمًا؛ حتى كادت الجبال تزول من شدّته وخُبثه، ولكن الله ردّ كيدهم في نحورهم.";
const T47="ثم يبيّن الله لنبيه ﷺ أنه لا يُخلف ما وعد به رسله من النصر والتمكين، والانتقام من أعدائهم في يوم القيامة الذي تتبدّل فيه صفات السماوات والأرض، ويخرج الناس من قبورهم للقاء ربهم المتفرّد بالوحدانية، الغالب الذي لا يُقهر، ويُقيَّد المجرمون في ذلك اليوم بسلاسل من نار، يُقادون فيها إلى العذاب في أذلّ صورة وأبشعها، قد طُليت أجسادهم بالقطران الشديد الاشتعال؛ حتى كأنه ثياب عليهم؛ جزاء أعمالهم في الدنيا.";
const T52="ثم يبيّن سبحانه أن هذا القرآن بلاغ وإعلام للناس، يتبلّغون به للوصول إلى أعلى المقامات والدرجات، أنزله الله ليخاف الناس عقابه، ويحذروا نقمته، وليعلموا أن الله هو الإله المعبود بحق لا إله غيره، ولا يستحق العبادة سواه، وفي كل هذا عبرة وعظة لأصحاب العقول السليمة، الذين ينتفعون بالقرآن.";
const AYAT=[
 [42,"وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ ۚ إِنَّمَا [r:يُؤَخِّرُهُمْ] [s:لِيَوْمٍ [v:تَشْخَصُ] فِيهِ [r:الْأَبْصَارُ]]","إمهال الظالمين",T42],
 [43,"[h:[v:مُهْطِعِينَ] [v:مُقْنِعِي [r:رُءُوسِهِمْ]] لَا [r:يَرْتَدُّ] إِلَيْهِمْ [r:طَرْفُهُمْ] ۖ [v:وَأَفْئِدَتُهُمْ هَوَاءٌ]]","حال الظالمين يوم القيامة",T42],
 [44,"وَأَنذِرِ النَّاسَ [s:يَوْمَ يَأْتِيهِمُ الْعَذَابُ] [h:فَيَقُولُ الَّذِينَ ظَلَمُوا رَبَّنَا أَخِّرْنَا إِلَىٰ أَجَلٍ قَرِيبٍ نُّجِبْ دَعْوَتَكَ وَنَتَّبِعِ [r:الرُّسُلَ]] ۗ [h:أَوَلَمْ تَكُونُوا أَقْسَمْتُم مِّن قَبْلُ مَا لَكُم مِّن زَوَالٍ]","طلبهم العودة إلى الدنيا",T44],
 [45,"[h:وَسَكَنتُمْ فِي مَسَاكِنِ الَّذِينَ ظَلَمُوا أَنفُسَهُمْ وَتَبَيَّنَ لَكُمْ كَيْفَ فَعَلْنَا بِهِمْ [r:وَضَرَبْنَا] لَكُمُ الْأَمْثَالَ]","مساكن الظالمين",T44],
 [46,"وَقَدْ [r:مَكَرُوا] [r:مَكْرَهُمْ] وَعِندَ اللَّهِ [r:مَكْرُهُمْ] وَإِن كَانَ [r:مَكْرُهُمْ] لِتَزُولَ مِنْهُ الْجِبَالُ","مكر الظالمين",T44],
 [47,"فَلَا تَحْسَبَنَّ اللَّهَ مُخْلِفَ وَعْدِهِ [r:رُسُلَهُ] ۗ إِنَّ اللَّهَ عَزِيزٌ ذُو انتِقَامٍ","لا يُخلف وعده رسله",T47],
 [48,"[s:يَوْمَ تُبَدَّلُ [r:الْأَرْضُ] غَيْرَ [r:الْأَرْضِ] وَالسَّمَاوَاتُ ۖ [r:وَبَرَزُوا] لِلَّهِ الْوَاحِدِ الْقَهَّارِ]","تبدّل الأرض والسماوات",T47],
 [49,"[h:[r:وَتَرَى] الْمُجْرِمِينَ يَوْمَئِذٍ [v:[r:مُّقَرَّنِينَ] فِي الْأَصْفَادِ]]","المجرمون في الأصفاد",T47],
 [50,"[h:[v:[r:سَرَابِيلُهُم]] مِّن [r:قَطِرَانٍ] وَتَغْشَىٰ وُجُوهَهُمُ [r:النَّارُ]]","سرابيل من قطران",T47],
 [51,"لِيَجْزِيَ اللَّهُ كُلَّ نَفْسٍ مَّا كَسَبَتْ ۚ إِنَّ اللَّهَ سَرِيعُ الْحِسَابِ","الجزاء على الأعمال",T47],
 [52,"هَٰذَا بَلَاغٌ لِّلنَّاسِ [r:وَلِيُنذَرُوا] بِهِ وَلِيَعْلَمُوا أَنَّمَا هُوَ إِلَٰهٌ وَاحِدٌ [r:وَلِيَذَّكَّرَ] أُولُو الْأَلْبَابِ","هذا بلاغ للناس",T52]
];
const AW={42:[["تشخص","ترتفع الأبصار من الخوف دون أن تطرف"]],43:[["مهطعين","مسرعين إلى أرض المحشر"],["مقنعي رؤوسهم","رافعي رؤوسهم لا تعود إليهم أبصارهم فلا يستطيعون الالتفات"],["أفئدتهم هواء","قلوبهم خاوية فارغة من شدة الفزع"]],49:[["مقرّنين في الأصفاد","مقيدين، قد قُرنت أيديهم وأرجلهم بالسلاسل"]],50:[["سرابيلهم","ثيابهم، والمقصود أن أجسادهم تُطلى بالقطران الشديد الاشتعال؛ حتى كأنه ثياب عليهم"]]};
versesInit(AYAT,AW);

/* ========== 8 vocab ========== */
const VOC=[["تَشْخَصُ","﴿لِيَوْمٍ تَشْخَصُ فِيهِ الْأَبْصَارُ﴾","ترتفع الأبصار من الخوف دون أن تطرف"],["مُهْطِعِينَ","﴿مُهْطِعِينَ مُقْنِعِي رُءُوسِهِمْ﴾","مسرعين إلى أرض المحشر"],["مُقْنِعِي رُءُوسِهِمْ","﴿مُقْنِعِي رُءُوسِهِمْ لَا يَرْتَدُّ إِلَيْهِمْ طَرْفُهُمْ﴾","رافعي رؤوسهم لا تعود إليهم أبصارهم فلا يستطيعون الالتفات"],["أَفْئِدَتُهُمْ هَوَاءٌ","﴿وَأَفْئِدَتُهُمْ هَوَاءٌ﴾","قلوبهم خاوية فارغة من شدة الفزع"],["مُقَرَّنِينَ فِي الْأَصْفَادِ","﴿وَتَرَى الْمُجْرِمِينَ يَوْمَئِذٍ مُّقَرَّنِينَ فِي الْأَصْفَادِ﴾","مقيدين، قد قُرنت أيديهم وأرجلهم بالسلاسل"],["سَرَابِيلُهُمْ","﴿سَرَابِيلُهُم مِّن قَطِرَانٍ﴾","ثيابهم، والمقصود أن أجسادهم تُطلى بالقطران الشديد الاشتعال؛ حتى كأنه ثياب عليهم"]];
$("#vgrid").innerHTML=VOC.map((v,i)=>{const others=shuffle(VOC.map((x,k)=>k).filter(k=>k!==i)).slice(0,2);
  return `<div class="vcard" data-i="${i}"><div class="w">${v[0]}</div><div class="ctx">${v[1]}</div><div class="opts">${shuffle([i,...others]).map(k=>`<button data-k="${k}">${VOC[k][2]}</button>`).join("")}</div><div class="mean">${v[2]}</div></div>`}).join("");
$("#vgrid").onclick=e=>{const b=e.target.closest(".opts button");if(!b)return;const c=b.closest(".vcard");
  if(b.dataset.k===c.dataset.i){b.classList.add("ok");sfx.ok();setTimeout(()=>{c.classList.add("done");if($$("#vgrid .done").length===VOC.length){$("#vFb").textContent="أحسنتنّ! اكتملت معاني الكلمات";confetti();sfx.win()}},350)}
  else{b.classList.add("no");c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);sfx.no()}};

/* ========== 9 is zulm a major sin? ========== */
$("#kabira").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.o==="1"){b.classList.add("ok");$("#kbAns").classList.add("open");sfx.ok()}else{b.classList.add("no");sfx.no()}};

/* ========== 10 sort: types of zulm ========== */
const ZL=[["الشرك بالله","a"],["الكفر","a"],["النفاق","a"],["التهاون في الصلاة","n"],["التهاون في الصيام","n"],["السرقة","g"],["الغيبة","g"],["النميمة","g"],["القذف","g"]];
let zSel=null;
function zInit(){$("#zpool").innerHTML=shuffle(ZL.map((_,i)=>i)).map(i=>`<button class="trait" data-i="${i}">${ZL[i][0]}</button>`).join("");$$("#zlanes .lane").forEach(l=>l.innerHTML="");$("#zFb").textContent="";zSel=null}
$("#zpool").onclick=e=>{const c=e.target.closest(".trait");if(!c)return;$$("#zpool .trait").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));zSel=c.classList.contains("sel")?c:null;sfx.tap()};
$$("#zlanes .road").forEach(r=>r.onclick=()=>{if(!zSel){if($("#zpool .trait"))toast("اختاري مثالًا أولًا");return}
  const i=+zSel.dataset.i;if(ZL[i][1]===r.dataset.r){zSel.classList.remove("sel");zSel.classList.add("ok-"+r.dataset.r);zSel.disabled=true;$(".lane",r).appendChild(zSel);zSel=null;$("#zFb").textContent="";sfx.ok();
    if(!$("#zpool .trait")){$("#zFb").className="fb ok";$("#zFb").textContent="أحسنتِ!";confetti();sfx.win()}}
  else{zSel.classList.add("shake");const c=zSel;setTimeout(()=>c.classList.remove("shake"),400);$("#zFb").className="fb no";$("#zFb").textContent="حاولي مرة أخرى.";sfx.no()}});
$("#zReset").onclick=zInit;zInit();

/* ========== 12 verse 43 segments ========== */
$("#segs").addEventListener("click",()=>setTimeout(()=>{if($$("#segs .seg.on").length===4)$("#segAll").classList.add("open")}));

/* ========== 15 three rebuking questions ========== */
keyLock("#qkeys","#qlocks","#qFb",[
  ["﴿أَوَلَمْ تَكُونُوا أَقْسَمْتُم مِّن قَبْلُ مَا لَكُم مِّن زَوَالٍ﴾","إبراهيم: ٤٤","ألم تكونوا تحلفون في الدنيا أنه لا انتقال لكم من الدنيا إلى الآخرة، ولا بعث بعد الموت؟"],
  ["﴿وَسَكَنتُمْ فِي مَسَاكِنِ الَّذِينَ ظَلَمُوا أَنفُسَهُمْ وَتَبَيَّنَ لَكُمْ كَيْفَ فَعَلْنَا بِهِمْ﴾","إبراهيم: ٤٥","ألم تكونوا قد حللتم في الدنيا في مساكن الأمم السابقة، الذين ظلموا أنفسهم بكفرهم بالله تعالى، وعلمتم بالنظر في آثارهم، والسماع لأخبارهم كيف أهلكناهم، حين أصرّوا على كفرهم وطغيانهم؟"],
  ["﴿وَضَرَبْنَا لَكُمُ الْأَمْثَالَ﴾","إبراهيم: ٤٥","ألم نمثّل لكم في القرآن الأمثال الواضحة، وبيّنّا الأشباه؛ لتعتبروا بها، ولكنكم لم تفعلوا؟"]
],[],"أحسنتِ!");

/* ========== 16 al-jaza' min jins al-'amal (two answers) ========== */
const JZ=[["﴿وَقَدْ مَكَرُوا مَكْرَهُمْ وَعِندَ اللَّهِ مَكْرُهُمْ﴾",1],["﴿لِيَجْزِيَ اللَّهُ كُلَّ نَفْسٍ مَّا كَسَبَتْ﴾",1],["﴿يَوْمَ تُبَدَّلُ الْأَرْضُ غَيْرَ الْأَرْضِ وَالسَّمَاوَاتُ﴾",0],["﴿هَٰذَا بَلَاغٌ لِّلنَّاسِ وَلِيُنذَرُوا بِهِ﴾",0]];
$("#jaza").innerHTML=shuffle(JZ).map(([t,o])=>`<button data-o="${o}">${t}</button>`).join("");
$("#jaza").onclick=e=>{const b=e.target.closest("button");if(!b||b.classList.contains("ok"))return;
  if(b.dataset.o==="1"){b.classList.add("ok");sfx.ok();if($$("#jaza .ok").length===2){$("#jzAns").classList.add("open");sfx.win()}}else{b.classList.add("no");sfx.no()}};

/* ========== 17 mountains → level plain ========== */
const FL=ST.findIndex(s=>s.querySelector("#flatten"));
ENTER[FL]=()=>{const f=$("#flatten");f.classList.remove("flat");setTimeout(()=>f.classList.add("flat"),900)};
$("#flatten").onclick=()=>{$("#flatten").classList.toggle("flat");sfx.page()};

/* ========== 19 punishment cards + gap fill ========== */
$("#flip4").onclick=e=>{const f=e.target.closest(".fl");if(f){f.classList.toggle("flip");sfx.tap()}};
const GP=["الوجه","القلب","﴿نَارُ اللَّهِ الْمُوقَدَةُ ۝ الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ﴾","﴿وَتَغْشَىٰ وُجُوهَهُمُ النَّارُ﴾","﴿يَوْمَ يُسْحَبُونَ فِي النَّارِ عَلَىٰ وُجُوهِهِمْ ذُوقُوا مَسَّ سَقَرَ﴾"];
let gSel=null;
$("#gpool").innerHTML=shuffle(GP.map((_,i)=>i)).map(i=>`<button class="chip gchip" data-i="${i}">${qwrap(GP[i])}</button>`).join("");
$("#gpool").onclick=e=>{const c=e.target.closest(".gchip");if(!c)return;$$("#gpool .gchip").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));gSel=c.classList.contains("sel")?c:null;sfx.tap()};
$("#gtxt").onclick=e=>{const g=e.target.closest(".gap");if(!g||g.classList.contains("ok"))return;if(!gSel){toast("اختاري البطاقة أولًا");return}
  if(gSel.dataset.i===g.dataset.g){g.classList.add("ok");g.innerHTML=qwrap(GP[g.dataset.g]);gSel.classList.add("used");gSel.classList.remove("sel");gSel=null;sfx.ok();
    if($$("#gtxt .gap.ok").length===GP.length){$("#gFb").textContent="أحسنتِ!";confetti();sfx.win()}}
  else{g.classList.add("shake");setTimeout(()=>g.classList.remove("shake"),400);sfx.no()}};

/* ========== 20 four benefits of the Quran ========== */
keyLock("#bkeys","#blocks","#bFb",[
  ["﴿هَٰذَا بَلَاغٌ لِّلنَّاسِ﴾","عامة","أنه تبليغ للناس وحجة عليهم."],
  ["﴿وَلِيُنذَرُوا بِهِ﴾","عامة","فيه تخويف للناس من عذاب الله، وتحذير لهم من نقمته."],
  ["﴿وَلِيَعْلَمُوا أَنَّمَا هُوَ إِلَٰهٌ وَاحِدٌ﴾","عامة","ليعلم الناس من حججه وبراهينه أن الإله المعبود بحق هو الله سبحانه وتعالى، فلا يصح صرف شيء من أنواع العبادة لغيره."],
  ["﴿وَلِيَذَّكَّرَ أُولُو الْأَلْبَابِ﴾","خاصة بالمؤمنين","فيه تذكرة وعظة لأصحاب العقول السليمة، فيهتدوا به إلى العمل بما ينفعهم، وترك ما يضرهم."]
],[],"أحسنتِ!");

/* ========== 21 connect ========== */
const CN=[["قال تعالى: ﴿إِذِ الْأَغْلَالُ فِي أَعْنَاقِهِمْ وَالسَّلَاسِلُ يُسْحَبُونَ ۝ فِي الْحَمِيمِ ثُمَّ فِي النَّارِ يُسْجَرُونَ﴾ [غافر: ٧١–٧٢]","﴿وَتَرَى الْمُجْرِمِينَ يَوْمَئِذٍ مُّقَرَّنِينَ فِي الْأَصْفَادِ﴾"],
  ["قال تعالى: ﴿إِذَا السَّمَاءُ انشَقَّتْ ۝ وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ ۝ وَإِذَا الْأَرْضُ مُدَّتْ ۝ وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ﴾ [الانشقاق: ١–٤]","﴿يَوْمَ تُبَدَّلُ الْأَرْضُ غَيْرَ الْأَرْضِ وَالسَّمَاوَاتُ﴾"],
  ["قال تعالى: ﴿وَأُوحِيَ إِلَيَّ هَٰذَا الْقُرْآنُ لِأُنذِرَكُم بِهِ وَمَن بَلَغَ﴾ [الأنعام: ١٩]","﴿هَٰذَا بَلَاغٌ لِّلنَّاسِ وَلِيُنذَرُوا بِهِ﴾"]];
const CX=["﴿مُهْطِعِينَ مُقْنِعِي رُءُوسِهِمْ﴾","﴿لِيَجْزِيَ اللَّهُ كُلَّ نَفْسٍ مَّا كَسَبَتْ﴾"];
let cI=0;
function cInit(){cI=0;$("#vtiles").innerHTML=shuffle(CN.map((c,i)=>[c[1],i]).concat(CX.map(t=>[t,-1]))).map(([t,i])=>`<button class="vtile" data-i="${i}">${t}</button>`).join("");$("#ctable").innerHTML="";$("#cFb").textContent="";cShow()}
function cShow(){$("#istn").innerHTML=cI<CN.length?`<span class="n">${ar(cI+1)}</span><span>${qwrap(CN[cI][0])}</span>`:`<span class="n">✓</span><span>اكتمل الربط! أحسنتِ.</span>`}
$("#vtiles").onclick=e=>{const t=e.target.closest(".vtile");if(!t||cI>=CN.length)return;
  if(+t.dataset.i===cI){t.classList.add("used");$("#ctable").insertAdjacentHTML("beforeend",`<tr class="ok"><td>${qwrap(CN[cI][0])}</td><td>${CN[cI][1]}</td></tr>`);cI++;cShow();$("#cFb").textContent="";sfx.ok();if(cI===CN.length){confetti();sfx.win()}}
  else{t.classList.add("shake");setTimeout(()=>t.classList.remove("shake"),400);$("#cFb").className="fb no";$("#cFb").textContent="ليس هذا الموضع، حاولي مرة أخرى.";sfx.no()}};
$("#cReset").onclick=cInit;cInit();

/* ========== 22 tajweed hunt: الراء المفخمة ========== */
const HQ=[["يُؤَخِّرُهُمْ",42,"مضمومة",1],["رُءُوسِهِمْ",43,"مضمومة",1],["يَرْتَدُّ",43,"ساكنة وقبلها مفتوح",1],["طَرْفُهُمْ",43,"ساكنة وقبلها مفتوح",1],["الرُّسُلَ",44,"مضمومة",1],["وَضَرَبْنَا",45,"مفتوحة",1],["مَكْرَهُمْ",46,"مفتوحة",1],["الْأَرْضُ",48,"ساكنة وقبلها مفتوح",1],["مُّقَرَّنِينَ",49,"مفتوحة",1],["قَطِرَانٍ",50,"مفتوحة",1],
  ["وَأَنذِرِ",44,"الراء مكسورة؛ فتُرقّق",0],["أَخِّرْنَا",44,"ساكنة وقبلها مكسور؛ فتُرقّق",0],["قَرِيبٍ",44,"الراء مكسورة؛ فتُرقّق",0],["الْمُجْرِمِينَ",49,"الراء مكسورة؛ فتُرقّق",0],["سَرِيعُ",51,"الراء مكسورة؛ فتُرقّق",0]];
let hFound=0;const HN=HQ.filter(h=>h[3]).length;
$("#hunt").innerHTML=shuffle(HQ.map((h,i)=>i)).map(i=>`<button class="hw" data-i="${i}">${HQ[i][0]}<sup>${ar(HQ[i][1])}</sup></button>`).join("");
$("#hunt").onclick=e=>{const b=e.target.closest(".hw");if(!b||b.classList.contains("ok"))return;const h=HQ[b.dataset.i];
  if(h[3]){b.classList.add("ok");b.insertAdjacentHTML("beforeend",`<small class="rc">${h[2]}</small>`);hFound++;$("#hN").textContent=ar(hFound)+" / "+ar(HN);$("#hBar").style.width=hFound/HN*100+"%";sfx.ok();
    if(hFound===HN){$("#hFb").className="fb ok";$("#hFb").textContent="أحسنتِ! وجدتِ الراءات المفخّمة. طبّقي الحكم أثناء تلاوتك.";confetti();sfx.win()}}
  else{b.classList.add("no");if(!$(".why",b))b.insertAdjacentHTML("beforeend",`<span class="why">${h[2]}</span>`);setTimeout(()=>{b.classList.remove("no");const w=$(".why",b);if(w)w.remove()},2400);sfx.no()}};

/* ========== 23 learn-to-act card ========== */
const AML="أتمسّك بدين الله، وألتزم بمنهج نبيه ﷺ، وأراقب الله تعالى في كل ما أقول وأفعل، ولا أكترث حينها لقلّة السالكين لطرق الخير، أو كثرة السالكين لطرق الشر.";
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
  x.font="600 34px Body";x.fillText("أتعلم لأعمل | سورة إبراهيم ٤٢–٥٢",W-90,150);
  x.font="60px Mushaf";let y=290;wrapLines(x,"﴿هَٰذَا بَلَاغٌ لِّلنَّاسِ وَلِيُنذَرُوا بِهِ﴾",W-180).forEach(l=>{x.fillText(l,W-90,y);y+=110});
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

/* ========== 24 quiz ========== */
quizInit([
  ["معنى <span class='q'>﴿تَشْخَصُ فِيهِ الْأَبْصَارُ﴾</span>:",["ترتفع الأبصار من الخوف دون أن تطرف","تُغمض الأبصار من شدة الضوء","تلتفت الأبصار يمنة ويسرة"],0],
  ["معنى <span class='q'>﴿مُهْطِعِينَ﴾</span>:",["واقفين في أماكنهم","ماشين ببطء","مسرعين إلى أرض المحشر"],2],
  ["معنى <span class='q'>﴿وَأَفْئِدَتُهُمْ هَوَاءٌ﴾</span>:",["قلوبهم مطمئنة","قلوبهم خاوية فارغة من شدة الفزع","قلوبهم قاسية"],1],
  ["معنى <span class='q'>﴿سَرَابِيلُهُم﴾</span>:",["قيودهم","ثيابهم","وجوههم"],1],
  ["<span class='q'>﴿مُّقَرَّنِينَ فِي الْأَصْفَادِ﴾</span> أي:",["مجتمعين في مكان واحد","مقيّدين، قد قُرنت أيديهم وأرجلهم بالسلاسل","مسرعين إلى الداعي"],1],
  ["الحكمة من إمهال الله تعالى للظالمين في الدنيا:",["أن يتوب الظالم إلى ربه، أو يزداد إثمًا فيستحق العقوبة","أن الله غافل عما يعملون","أنهم لا يستحقون العقوبة"],0],
  ["أعظم الظلم:",["ظلم الإنسان غيره في ماله","الشرك بالله","التهاون في الصيام"],1],
  ["من مهمات الرسل عليهم السلام المستنبطة من الآية (٤٤):",["تأخير العذاب عن المكذبين","الدعاء على أقوامهم","التبشير والإنذار"],2],
  ["جاء الفعل <span class='q'>﴿وَتَرَى﴾</span> بصيغة المضارع مع أن المشهد مستقبلي؛ وذلك:",["لاستحضار الصورة وتأكيد حدوثها","للدلالة على أن المشهد قد انتهى","لأن المشهد في الحياة الدنيا"],0],
  ["أيّ هذه الكلمات فيها راء مفخّمة؟",["قَرِيبٍ","الْمُجْرِمِينَ","مُّقَرَّنِينَ"],2]
],{full:"ممتاز! ما شاء الله",good:"أحسنتِ! راجعي ما فاتك",low:"راجعي الآيات ومعناها الإجمالي، ثم أعيدي المحاولة"});

/* ========== 26 names and attributes of Allah ========== */
keyLock("#nkeys","#nlocks","#nFb",[
  ["﴿وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ﴾ ﴿وَعِندَ اللَّهِ مَكْرُهُمْ﴾","إبراهيم: ٤٢، ٤٦","العلم"],
  ["﴿فَلَا تَحْسَبَنَّ اللَّهَ مُخْلِفَ وَعْدِهِ رُسُلَهُ﴾ ﴿لِيَجْزِيَ اللَّهُ كُلَّ نَفْسٍ مَّا كَسَبَتْ﴾","إبراهيم: ٤٧، ٥١","الصدق، ومنه صدق الوعد والوعيد"],
  ["﴿إِنَّ اللَّهَ عَزِيزٌ ذُو انتِقَامٍ﴾","إبراهيم: ٤٧","العزة والانتقام"],
  ["﴿وَبَرَزُوا لِلَّهِ الْوَاحِدِ الْقَهَّارِ﴾","إبراهيم: ٤٨","الله – الواحد – القهار"]
],[],"أحسنتِ!");

/* ========== 27 benefits + exit ticket ========== */
const fl=store.get("fl",["","",""]);
$$("#flist input").forEach((inp,i)=>{inp.value=fl[i]||"";inp.oninput=()=>{fl[i]=inp.value;store.set("fl",fl)}});
const xt=store.get("xt",["","","","",""]);
$$("#xlist input").forEach((inp,i)=>{inp.value=xt[i]||"";inp.oninput=()=>{xt[i]=inp.value;store.set("xt",xt)}});

/* ========== 28 notes ========== */
const nt=store.get("notes",["","",""]);
$$("#notes textarea").forEach((t,i)=>{t.value=nt[i]||"";t.oninput=()=>{nt[i]=t.value;store.set("notes",nt)}});

boot();
