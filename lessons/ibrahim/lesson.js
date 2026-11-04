/* درس إبراهيم ٢٤–٣١: تفاعلات المحطات (الهيكل المشترك في shared/core.js) */
const qwrap=s=>s.replace(/(﴿[^﴾]+﴾)/g,'<span class="q">$1</span>');
document.addEventListener("click",e=>{const h=e.target.closest("[data-hid]");if(h&&!h.classList.contains("on")){h.classList.add("on");sfx.ok()}});

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
  ["أعمال الملائكة","قال تعالى: ﴿وَالْمَلَائِكَةُ يَدْخُلُونَ عَلَيْهِم مِّن كُلِّ بَابٍ﴾ من أعمال الملائكة المثبتة في الآيات:","تهنئة المؤمنين بعاقبة صبرهم وطاعتهم.",0],
  ["وَيَدْرَءُونَ","معنى قوله تعالى: ﴿وَيَدْرَءُونَ بِالْحَسَنَةِ السَّيِّئَةَ﴾","يدفعون.",1],
  ["أجرٌ عظيم وجهدٌ يسير","من أعظم الأعمال أجرًا وأيسرها جهدًا:","ذكر الله.",0],
  ["وَيَقْدِرُ","معنى ما تحته خط في قوله تعالى: ﴿اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ﴾","يضيّق.",1]
];
$("#frames").innerHTML=REV.map(([w,q,a,m],i)=>`<button class="frame" data-i="${i}"><div class="in"><div class="fc front"><span class="n">${ar(i+1)}</span><b style="${m?"font-family:Mushaf;font-weight:400;font-size:1.5rem":""}">${w}</b><small>${qwrap(q)}</small></div><div class="fc back"><em>الإجابة</em>${a}</div></div></button>`).join("");
$("#filmPick").innerHTML=REV.map((_,i)=>`<button data-i="${i}">${ar(i+1)}</button>`).join("");
$("#frames").onclick=e=>{const f=e.target.closest(".frame");if(!f)return;f.classList.toggle("flip");$$("#filmPick button")[f.dataset.i].classList.add("done");sfx.tap()};
$("#filmPick").onclick=e=>{const b=e.target.closest("button");if(!b)return;const f=$$("#frames .frame")[b.dataset.i];f.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});setTimeout(()=>{f.classList.add("flip");b.classList.add("done");sfx.ok()},450)};

/* ========== 4 clues ========== */
$$("#clues .clue").forEach(c=>c.onclick=()=>{if(!c.classList.contains("on")){c.classList.add("on");sfx.ok()}});

/* ---------- key → lock (topics, parables) ---------- */
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

/* ========== 5 topics ========== */
keyLock("#tkeys","#tlocks","#tFb",[
  ["﴿الر ۚ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ بِإِذْنِ رَبِّهِمْ إِلَىٰ صِرَاطِ الْعَزِيزِ الْحَمِيدِ﴾","إبراهيم: ١","تقرير قضايا العقيدة؛ كالوحي، والرسالة، والتوحيد"],
  ["﴿وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِ اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ أَنجَاكُم مِّنْ آلِ فِرْعَوْنَ يَسُومُونَكُمْ سُوءَ الْعَذَابِ وَيُذَبِّحُونَ أَبْنَاءَكُمْ وَيَسْتَحْيُونَ نِسَاءَكُمْ ۚ وَفِي ذَٰلِكُم بَلَاءٌ مِّن رَّبِّكُمْ عَظِيمٌ﴾","إبراهيم: ٦","ذكر بعض أخبار الرسل عليهم الصلاة والسلام"],
  ["﴿وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ﴾","إبراهيم: ٧","بيان كثرة نعم الله تعالى على الناس، وأنها تزداد بالشكر"],
  ["﴿مُهْطِعِينَ مُقْنِعِي رُءُوسِهِمْ لَا يَرْتَدُّ إِلَيْهِمْ طَرْفُهُمْ ۖ وَأَفْئِدَتُهُمْ هَوَاءٌ﴾","إبراهيم: ٤٣","تصوير بعض مشاهد يوم القيامة؛ وما يكون فيها"]
],["وجوب الأمر بالمعروف والنهي عن المنكر"],"أحسنتنّ! وبقي «وجوب الأمر بالمعروف والنهي عن المنكر» ليس من موضوعات السورة في هذه الآيات.");

/* ========== 6 verses ========== */
const T24="يشبّه الله -عز وجل- كلمة التوحيد الطيبة (لا إله إلا الله) في قلب المؤمن، بشجرة طيبة، جذورها ثابتة في الأرض، وفروعها وأغصانها ممتدة نحو السماء، وهي كثيرة النفع؛ إذ تعطي ثمرها الطيب في كل وقت بإذن ربها ومشيئته، وهذا حال المؤمن مع رسوخ كلمة التوحيد في قلبه، فإن آثارها تظهر على جوارحه عملًا طيبًا، وقولًا حسنًا، وأخلاقًا رضيّة تصعد إلى الله -تعالى- آناء الليل وأطراف النهار.";
const T28="ثم يخبر تعالى عن المكذبين من قريش، الذين غيّروا نعمة الله عليهم -بإرسال النبي ﷺ إليهم- فلم يؤمنوا بالله، ولم يؤمنوا برسالة رسوله ﷺ، ولم يشكروا الله عليها، وأنزلوا أتباعهم من قريش دار الهلاك، وهي جهنم.";
const AYAT=[
 [24,"أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا [s,v:كَلِمَةً طَيِّبَةً] [s:كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ]","مثل الكلمة الطيبة",T24],
 [25,"[s:تُؤْتِي [v:أُكُلَهَا] كُلَّ حِينٍ بِإِذْنِ رَبِّهَا] ۗ وَيَضْرِبُ اللَّهُ الْأَمْثَالَ [g:لِلنَّاسِ] لَعَلَّهُمْ يَتَذَكَّرُونَ","ثمار الكلمة الطيبة",T24],
 [26,"وَمَثَلُ [h,v:كَلِمَةٍ خَبِيثَةٍ] [h:كَشَجَرَةٍ خَبِيثَةٍ [v:اجْتُثَّتْ] مِن فَوْقِ الْأَرْضِ مَا لَهَا مِن قَرَارٍ]","مثل الكلمة الخبيثة","وأما الكلمة الخبيثة -التي تُخرج المرء من دين الله- فإنها كشجرة كريهة الطعم، لا جذور ثابتة لها في الأرض، ولا ثمر طيب تنتجه، وكذلك من لا يدين بالدين الحق، لا ثبات له، ولا خير فيه، ولا يصعد له عمل صالح إلى الله، ولا يُتقبّل منه."],
 [27,"[s:يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ فِي الْحَيَاةِ الدُّنْيَا وَفِي الْآخِرَةِ] ۖ [h:وَيُضِلُّ اللَّهُ الظَّالِمِينَ] ۚ وَيَفْعَلُ اللَّهُ مَا يَشَاءُ","التثبيت بالقول الثابت","ثم يخبر تعالى بأنه يثبّت عباده المؤمنين في الدنيا عند الشبهات بالهداية واليقين، وعند الشهوات بثبات الإيمان، وتقديم رضا الله على شهوات النفس، ويثبّتهم عند الموت بحسن الخاتمة، وعند سؤال الملكين في القبر بالقول الصادق الحق الثابت في قلوبهم، وهو: شهادة أنّ لا إله إلا الله، وأنّ محمدًا رسول الله."],
 [28,"أَلَمْ تَرَ إِلَى الَّذِينَ [h:بَدَّلُوا [v:نِعْمَتَ اللَّهِ] كُفْرًا] [h:وَأَحَلُّوا قَوْمَهُمْ [v:دَارَ الْبَوَارِ]]","تبديل نعمة الله كفرًا",T28],
 [29,"[g:جَهَنَّمَ] يَصْلَوْنَهَا ۖ وَبِئْسَ الْقَرَارُ","دار البوار",T28],
 [30,"[h:وَجَعَلُوا لِلَّهِ [v:أَندَادًا] لِّيُضِلُّوا عَن سَبِيلِهِ] ۗ قُلْ تَمَتَّعُوا [g:فَإِنَّ] مَصِيرَكُمْ إِلَى [g:النَّارِ]","اتخاذ الأنداد","وما كان هذا إلا بسبب تكذيبهم، واتخاذهم شركاء لله في العبادة. قل -يا نبي الله- لهؤلاء المشركين على وجه التهديد: استمتعوا في حياتكم الدنيا فإنها فانية، وما تجدون فيها من النعيم ما هو إلا استدراج من الله لكم، ثم مآلكم إلى جهنم وبئس المصير."],
 [31,"قُل لِّعِبَادِيَ [s:الَّذِينَ آمَنُوا يُقِيمُوا الصَّلَاةَ وَيُنفِقُوا [g:مِمَّا] رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً] مِّن قَبْلِ أَن يَأْتِيَ يَوْمٌ لَّا بَيْعٌ فِيهِ وَلَا [v:خِلَالٌ]","الصلاة والإنفاق","وأْمُر -يا نبي الله- المؤمنين بأن يقيموا الصلوات المفروضة تامة في أوقاتها، وينفقوا مما رزقهم الله في الحقوق الواجبة عليهم، في الخفاء والعلن، من قبل أن يأتي يوم القيامة الذي لا سبيل فيه إلى استدراك ما فات، لا بمعاوضة بيع وشراء، ولا بهبة خليل وصديق، فكلٌّ له يومئذ شأن يشغله عن الآخرين."]
];
const AW={24:[["كلمة طيبة","كلمة التوحيد (لا إله إلا الله)"]],25:[["أُكُلها","ثمارها"]],26:[["كلمة خبيثة","كلمة الكفر"],["اجتُثّت","اقتُلِعت"]],28:[["نعمت الله","إرسال الرسول ﷺ"],["دار البوار","دار الهلاك، وهي جهنم"]],30:[["أندادًا","أمثالًا ونظراء وشركاء"]],31:[["خِلال","صداقة"]]};
versesInit(AYAT,AW);

/* ========== 8 parables ========== */
keyLock("#pkeys","#plocks","#pFb",[
  ["﴿لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ ۚ وَتِلْكَ الْأَمْثَالُ نَضْرِبُهَا لِلنَّاسِ لَعَلَّهُمْ يَتَفَكَّرُونَ﴾","الحشر: ٢١","التفكّر"],
  ["﴿وَتِلْكَ الْأَمْثَالُ نَضْرِبُهَا لِلنَّاسِ ۖ وَمَا يَعْقِلُهَا إِلَّا الْعَالِمُونَ﴾ ﴿وَيَضْرِبُ اللَّهُ الْأَمْثَالَ لِلنَّاسِ لَعَلَّهُمْ يَتَذَكَّرُونَ﴾","العنكبوت: ٤٣، إبراهيم: ٢٥","التذكير والوعظ"],
  ["﴿فَمَثَلُهُ كَمَثَلِ صَفْوَانٍ عَلَيْهِ تُرَابٌ فَأَصَابَهُ وَابِلٌ فَتَرَكَهُ صَلْدًا ۖ لَّا يَقْدِرُونَ عَلَىٰ شَيْءٍ مِّمَّا كَسَبُوا﴾","البقرة: ٢٦٤","تقريب المراد للعقل، وتصويره بصورة المحسوس؛ ليثبت في الأذهان"],
  ["﴿لَا تُبْطِلُوا صَدَقَاتِكُم بِالْمَنِّ وَالْأَذَىٰ﴾ ﴿وَمَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ وَتَثْبِيتًا مِّنْ أَنفُسِهِمْ كَمَثَلِ جَنَّةٍ بِرَبْوَةٍ﴾","البقرة: ٢٦٤–٢٦٥","الحث على الخير، والزجر عن الشر"]
],[],"أحسنتنّ! هذه فوائد ضرب الأمثال في القرآن الكريم.");

/* ========== 9 vocab ========== */
const VOC=[["كَلِمَةً طَيِّبَةً","﴿ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً﴾","كلمة التوحيد: لا إله إلا الله"],["أُكُلَهَا","﴿تُؤْتِي أُكُلَهَا كُلَّ حِينٍ﴾","ثمارها"],["كَلِمَةٍ خَبِيثَةٍ","﴿وَمَثَلُ كَلِمَةٍ خَبِيثَةٍ﴾","كلمة الكفر"],["اجْتُثَّتْ","﴿اجْتُثَّتْ مِن فَوْقِ الْأَرْضِ﴾","اقتُلِعت من أصلها"],["دَارَ الْبَوَارِ","﴿وَأَحَلُّوا قَوْمَهُمْ دَارَ الْبَوَارِ﴾","دار الهلاك، وهي جهنم"],["أَندَادًا","﴿وَجَعَلُوا لِلَّهِ أَندَادًا﴾","شركاء لله"],["خِلَالٌ","﴿لَّا بَيْعٌ فِيهِ وَلَا خِلَالٌ﴾","صداقة"]];
$("#vgrid").innerHTML=VOC.map((v,i)=>{const others=shuffle(VOC.map((x,k)=>k).filter(k=>k!==i)).slice(0,2);
  return `<div class="vcard" data-i="${i}"><div class="w">${v[0]}</div><div class="ctx">${v[1]}</div><div class="opts">${shuffle([i,...others]).map(k=>`<button data-k="${k}">${VOC[k][2]}</button>`).join("")}</div><div class="mean">${v[2]}</div></div>`}).join("");
$("#vgrid").onclick=e=>{const b=e.target.closest(".opts button");if(!b)return;const c=b.closest(".vcard");
  if(b.dataset.k===c.dataset.i){b.classList.add("ok");sfx.ok();setTimeout(()=>{c.classList.add("done");if($$("#vgrid .done").length===VOC.length){$("#vFb").textContent="أحسنتنّ! اكتملت معاني الكلمات";confetti();sfx.win()}},350)}
  else{b.classList.add("no");c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);sfx.no()}};

/* ========== 11 conditions of the testimony ========== */
const CONDS=[["العلم بمعناها","الجهل"],["اليقين بها","الشك والتردد"],["الإخلاص","الشرك"],["الصدق في قولها","قولها كذبًا"],["محبتها","بغضها وبغض ما دلت عليه"],["الانقياد لمعناها","الترك والاستكبار"],["القبول لها ولمعناها","الرد"]];
let cSel=null;
$("#conds").innerHTML=`<div class="col">${CONDS.map(([c],i)=>`<button class="chip" data-c="${i}">${ar(i+1)}. ${c}</button>`).join("")}</div><div class="col">${shuffle(CONDS.map((_,i)=>i)).map(i=>`<button class="chip" data-m="${i}">المنافي لـ… ${CONDS[i][1]}</button>`).join("")}</div>`;
$("#conds").onclick=e=>{const c=e.target.closest("[data-c]"),m=e.target.closest("[data-m]");
  if(c&&!c.classList.contains("ok")){$$("#conds [data-c]").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));cSel=c.classList.contains("sel")?c:null;sfx.tap();return}
  if(m&&!m.classList.contains("ok")){if(!cSel){toast("اختاري الشرط أولًا");return}
    if(cSel.dataset.c===m.dataset.m){cSel.classList.remove("sel");cSel.classList.add("ok");m.classList.add("ok");cSel.textContent=ar(+cSel.dataset.c+1)+". "+CONDS[cSel.dataset.c][0]+"، المنافي لـ"+CONDS[cSel.dataset.c][1];m.classList.add("done");cSel=null;sfx.ok();
      if($$("#conds [data-c].ok").length===CONDS.length){$("#condFb").textContent="أحسنتِ! اكتملت الشروط السبعة";confetti();sfx.win()}}
    else{m.classList.add("shake");setTimeout(()=>m.classList.remove("shake"),400);sfx.no()}}};

/* ========== 12 iman tree ========== */
const TL=[["العلم والمعرفة","عروقها: العلم والمعرفة واليقين"],["الإخلاص","ساقها: الإخلاص"],["الأعمال الصالحة","فروعها: الأعمال"],["الآثار الحميدة والصفات الصالحة","ثمرتها: ما توجبه الأعمال الصالحة من الآثار الحميدة والصفات المحمودة"]];
let tSel=null;
$("#tlabels").innerHTML=shuffle(TL.map((_,i)=>i)).map(i=>`<button class="chip" data-l="${i}">${TL[i][0]}</button>`).join("");
$("#tlabels").onclick=e=>{const c=e.target.closest(".chip");if(!c)return;$$("#tlabels .chip").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));tSel=c.classList.contains("sel")?c:null;sfx.tap()};
$("#itree").addEventListener("click",e=>{const s=e.target.closest(".slot");if(!s||s.classList.contains("ok"))return;if(!tSel){toast("اختاري عبارة أولًا");return}
  if(tSel.dataset.l===s.dataset.s){s.classList.add("ok");s.textContent=TL[s.dataset.s][1];tSel.classList.add("used");tSel.classList.remove("sel");tSel=null;sfx.ok();
    if($$("#itree .slot.ok").length===TL.length){$("#itFb").textContent="اكتملت شجرة الإيمان!";confetti();sfx.win()}}
  else{s.classList.add("shake");setTimeout(()=>s.classList.remove("shake"),400);sfx.no()}});

/* ========== 13 sort: this life / hereafter ========== */
const SORT=[["الثبات عند الشبهات بالهداية واليقين","d"],["الثبات عند الشهوات بثبات الإيمان","d"],["الثبات في تقديم رضا الله على شهوات النفس","d"],["الثبات عند الموت على حسن الخاتمة","a"],["الثبات عند السؤال في القبر","a"]];
let sSel=null;
function sInit(){$("#spool").innerHTML=shuffle(SORT.map((_,i)=>i)).map(i=>`<button class="trait" data-i="${i}">${SORT[i][0]}</button>`).join("");$$("#slanes .lane").forEach(l=>l.innerHTML="");$("#sFb").textContent="";sSel=null}
$("#spool").onclick=e=>{const c=e.target.closest(".trait");if(!c)return;$$("#spool .trait").forEach(x=>x.classList.toggle("sel",x===c&&!x.classList.contains("sel")));sSel=c.classList.contains("sel")?c:null;sfx.tap()};
$$("#slanes .road").forEach(r=>r.onclick=()=>{if(!sSel){if($("#spool .trait"))toast("اختاري صورة أولًا");return}
  const i=+sSel.dataset.i;if(SORT[i][1]===r.dataset.r){sSel.classList.remove("sel");sSel.classList.add("ok-"+r.dataset.r);sSel.disabled=true;$(".lane",r).appendChild(sSel);sSel=null;sfx.ok();
    if(!$("#spool .trait")){$("#sFb").className="fb ok";$("#sFb").textContent="أحسنتِ! يثبّت الله عباده المؤمنين في الدنيا والآخرة.";confetti();sfx.win()}}
  else{sSel.classList.add("shake");const c=sSel;setTimeout(()=>c.classList.remove("shake"),400);$("#sFb").className="fb no";$("#sFb").textContent="تأمّلي مرة أخرى: متى يكون هذا الثبات؟";sfx.no()}});
$("#sReset").onclick=sInit;sInit();

/* ========== 15 tamattu ========== */
$("#tamattu").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.o==="1"){b.classList.add("ok");$("#tmAns").classList.add("open");sfx.ok()}else{b.classList.add("no");sfx.no()}};

$("#flip3").onclick=e=>{const f=e.target.closest(".fl");if(f){f.classList.toggle("flip");sfx.tap()}};

/* ========== 17 connect ========== */
const CN=[["قال تعالى: ﴿وَقَدِمْنَا إِلَىٰ مَا عَمِلُوا مِنْ عَمَلٍ فَجَعَلْنَاهُ هَبَاءً مَّنثُورًا﴾ [الفرقان: ٢٣]","﴿وَمَثَلُ كَلِمَةٍ خَبِيثَةٍ كَشَجَرَةٍ خَبِيثَةٍ اجْتُثَّتْ مِن فَوْقِ الْأَرْضِ مَا لَهَا مِن قَرَارٍ﴾"],
  ["عن البراء بن عازب رضي الله عنه أن النبي ﷺ قال: «المسلم إذا سُئل في القبر يشهد أن لا إله إلا الله، وأن محمدًا رسول الله، فذلك قوله:…» رواه البخاري (٤٦٩٩) ومسلم (٢٨٧١)","﴿يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ فِي الْحَيَاةِ الدُّنْيَا وَفِي الْآخِرَةِ﴾"]];
const CX=["﴿تُؤْتِي أُكُلَهَا كُلَّ حِينٍ بِإِذْنِ رَبِّهَا﴾","﴿قُل لِّعِبَادِيَ الَّذِينَ آمَنُوا يُقِيمُوا الصَّلَاةَ﴾"];
let cI=0;
function cInit(){cI=0;$("#vtiles").innerHTML=shuffle(CN.map((c,i)=>[c[1],i]).concat(CX.map(t=>[t,-1]))).map(([t,i])=>`<button class="vtile" data-i="${i}">${t}</button>`).join("");$("#ctable").innerHTML="";$("#cFb").textContent="";cShow()}
function cShow(){$("#istn").innerHTML=cI<CN.length?`<span class="n">${ar(cI+1)}</span><span>${qwrap(CN[cI][0])}</span>`:`<span class="n">✓</span><span>اكتمل الربط! أحسنتِ.</span>`}
$("#vtiles").onclick=e=>{const t=e.target.closest(".vtile");if(!t||cI>=CN.length)return;
  if(+t.dataset.i===cI){t.classList.add("used");$("#ctable").insertAdjacentHTML("beforeend",`<tr class="ok"><td>${qwrap(CN[cI][0])}</td><td>${CN[cI][1]}</td></tr>`);cI++;cShow();$("#cFb").textContent="";sfx.ok();if(cI===CN.length){confetti();sfx.win()}}
  else{t.classList.add("shake");setTimeout(()=>t.classList.remove("shake"),400);$("#cFb").className="fb no";$("#cFb").textContent="ليس هذا الموضع، حاولي مرة أخرى.";sfx.no()}};
$("#cReset").onclick=cInit;cInit();
const TQ=[["﴿جَهَنَّمَ يَصْلَوْنَهَا ۖ وَبِئْسَ الْقَرَارُ﴾",1],["﴿وَجَعَلُوا لِلَّهِ أَندَادًا لِّيُضِلُّوا عَن سَبِيلِهِ﴾",0],["﴿قُل لِّعِبَادِيَ الَّذِينَ آمَنُوا يُقِيمُوا الصَّلَاةَ﴾",0]];
$("#tafsirQ").innerHTML=shuffle(TQ).map(([t,o])=>`<button data-o="${o}">${t}</button>`).join("")+`<div class="reveal" id="tqAns"><div><div class="ans" style="font-family:Body;font-size:1rem">قال تعالى: ﴿أَلَمْ تَرَ إِلَى الَّذِينَ بَدَّلُوا نِعْمَتَ اللَّهِ كُفْرًا وَأَحَلُّوا قَوْمَهُمْ دَارَ الْبَوَارِ ۝ جَهَنَّمَ يَصْلَوْنَهَا ۖ وَبِئْسَ الْقَرَارُ﴾؛ فقد بيّن سبحانه أن المراد بدار البوار: جهنم، وذلك في الآية التي تليها. وهذا من تفسير القرآن بالقرآن.</div></div></div>`;
$("#tafsirQ").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.o==="1"){b.classList.add("ok");$("#tqAns").classList.add("open");sfx.ok()}else{b.classList.add("no");sfx.no()}};

/* ========== 18 tajweed hunt ========== */
const HQ=[["لِلنَّاسِ",25,"",1],["جَهَنَّمَ",29,"",1],["فَإِنَّ",30,"",1],["النَّارِ",30,"",1],["مِمَّا",31,"",1],
  ["اجْتُثَّتْ",26,"التاء هي المشددة",0],["اللَّهُ",24,"اللام هي المشددة",0],["لَعَلَّهُمْ",25,"اللام هي المشددة",0],["يَتَذَكَّرُونَ",25,"الكاف هي المشددة",0],["يُثَبِّتُ",27,"الباء هي المشددة",0],["بَدَّلُوا",28,"الدال هي المشددة",0],["الصَّلَاةَ",31,"الصاد هي المشددة",0],["تَمَتَّعُوا",30,"التاء هي المشددة",0],["طَيِّبَةٍ",24,"الياء هي المشددة",0]];
let hFound=0;const HN=HQ.filter(h=>h[3]).length;
$("#hunt").innerHTML=shuffle(HQ.map((h,i)=>i)).map(i=>`<button class="hw" data-i="${i}">${HQ[i][0]}<sup>${ar(HQ[i][1])}</sup></button>`).join("");
$("#hunt").onclick=e=>{const b=e.target.closest(".hw");if(!b||b.classList.contains("ok"))return;const h=HQ[b.dataset.i];
  if(h[3]){b.classList.add("ok");hFound++;$("#hN").textContent=ar(hFound)+" / "+ar(HN);$("#hBar").style.width=hFound/HN*100+"%";sfx.ok();
    if(hFound===HN){$("#hFb").className="fb ok";$("#hFb").textContent="أحسنتِ! وجدتِ مواضع النون والميم المشددتين. اقرئيها بغنة ظاهرة بمقدار حركتين.";confetti();sfx.win()}}
  else{b.classList.add("no");if(!$(".why",b))b.insertAdjacentHTML("beforeend",`<span class="why">${h[2]}</span>`);setTimeout(()=>{b.classList.remove("no");const w=$(".why",b);if(w)w.remove()},2400);sfx.no()}};

/* ========== 19 values card ========== */
const ICV={word:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h7"/>',firm:'<path d="M12 21V11M12 11c0-4 3-6 6-6 0 4-3 6-6 6zM12 14c0-3-2.5-5-5.5-5 0 3 2.5 5 5.5 5z"/><path d="M7 21h10"/>',thanks:'<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/>',give:'<circle cx="12" cy="12" r="8"/><path d="M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2-.5-2.5-1.5M12 6.5v1.5M12 16v1.5"/>'};
const ATH=[["الكلمة الطيبة","حوار محترم وعلاقات إيجابية","#11806F","﴿أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ﴾",ICV.word],
  ["الثبات على الإيمان","قيم راسخة ومسؤولية وأمانة","#5A45B5","﴿يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ﴾",ICV.firm],
  ["شكر النعم","حفظ الممتلكات وترشيد الموارد","#D98A1C","﴿لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ﴾",ICV.thanks],
  ["العطاء","إنفاق نافع وتطوع لخدمة المجتمع","#C93A60","﴿وَيُنفِقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً﴾",ICV.give]];
let athI=store.get("athI",-1),vURL="",vFile=null,vJob=0,vT=null;
$("#athar").innerHTML=ATH.map(([t,s,c,,ic],i)=>`<button class="ath" style="--c:${c}" data-i="${i}"><svg viewBox="0 0 24 24">${ic}</svg><b>${t}</b><small>${s}</small></button>`).join("");
$("#pName").value=store.get("pName","");$("#pStep").value=store.get("pStep","");
function pRender(){$$("#athar .ath").forEach((b,i)=>b.classList.toggle("on",i===athI));const a=ATH[athI],nm=$("#pName").value.trim(),st=$("#pStep").value.trim();
  $("#pN").textContent=nm||"اسمك هنا";$("#pQ").textContent=a?a[3]:"﴿كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ﴾";
  $("#pD").innerHTML=a?`قيمتي: <b>${a[0]}</b><br>مبادرتي: ${esc(st||a[1])}`:"اختاري قيمة من الأعلى";
  store.set("pName",nm);store.set("pStep",st);store.set("athI",athI);clearTimeout(vT);vT=setTimeout(drawValue,250)}
$("#athar").onclick=e=>{const b=e.target.closest(".ath");if(!b)return;athI=+b.dataset.i;pRender();sfx.ok()};
$("#pName").oninput=pRender;$("#pStep").oninput=pRender;
async function drawValue(){
  if(athI<0)return;const job=++vJob;
  try{await Promise.all(["700 86px Display","56px Mushaf","600 46px Body"].map(f=>document.fonts.load(f)))}catch(e){}
  const logo=await loadImg(LOGO_SRC);if(job!==vJob)return;
  const a=ATH[athI],W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#33246E");g.addColorStop(.6,"#5A45B5");g.addColorStop(1,"#C93A60");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle="#F6C66B33";x.beginPath();x.arc(120,120,260,0,7);x.fill();
  x.direction="rtl";x.textAlign="right";x.fillStyle="#fff";
  x.font="600 34px Body";x.fillText("إيمان راسخ وأثر طيب | سورة إبراهيم ٢٤–٣١",W-90,150);
  x.font="56px Mushaf";let y=290;wrapLines(x,a[3],W-180).forEach(l=>{x.fillText(l,W-90,y);y+=110});
  x.font="700 86px Display";x.fillText($("#pName").value.trim()||"طالبة مجتهدة",W-90,y+150);
  x.font="600 46px Body";x.fillStyle="#F6C66B";x.fillText("قيمتي: "+a[0],W-90,y+260);
  x.fillStyle="#fff";x.font="400 42px Body";wrapLines(x,"مبادرتي: "+($("#pStep").value.trim()||a[1]),W-180).forEach((l,i)=>x.fillText(l,W-90,y+350+i*72));
  x.font="400 30px Body";x.fillStyle="#ffffffcc";x.fillText("أستاذة المادة: "+TEACHER,W-90,H-130);x.fillText("مديرة المدرسة: "+PRINCIPAL,W-90,H-84);
  if(logo)x.drawImage(tinted(logo,200,200*logo.naturalHeight/logo.naturalWidth,"#fff"),80,H-230);
  vURL=c.toDataURL("image/png");c.toBlob(b=>{if(job===vJob&&b)try{vFile=new File([b],"بطاقة-قيمتي.png",{type:"image/png"})}catch(e){vFile=null}},"image/png");
}
function vReady(){if(athI<0){toast("اختاري قيمة أولًا");return false}if(!vURL){toast("لحظة… يتم تجهيز البطاقة");drawValue();return false}return true}
$("#pPrint").onclick=()=>{if(vReady())printImage(vURL,"بطاقة-قيمتي.png")};
$("#pSave").onclick=()=>{if(vReady()){sfx.win();shareImage(vURL,vFile,"بطاقة-قيمتي.png","بطاقة قيمتي")}};
pRender();

/* ========== 20 quiz ========== */
quizInit([
  ["المقصود بـ <span class='q'>﴿كَلِمَةً طَيِّبَةً﴾</span> في الآية:",["كلمة التوحيد: لا إله إلا الله","الكلام الحسن مع الناس","الدعاء"],0],
  ["معنى <span class='q'>﴿اجْتُثَّتْ﴾</span>:",["ارتفعت","اقتُلِعت","أثمرت"],1],
  ["<span class='q'>﴿دَارَ الْبَوَارِ﴾</span> هي:",["دار الهلاك، وهي جهنم","دار الدنيا","ديار قريش"],0],
  ["معنى <span class='q'>﴿وَلَا خِلَالٌ﴾</span>:",["ولا بيع","ولا صداقة","ولا شفاعة"],1],
  ["وجه الشبه بين كلمة التوحيد والشجرة الطيبة في الأصل:",["أصلها راسخ في قلب المؤمن","سرعة نموها","كثرة أوراقها"],0],
  ["من صور تثبيت الله للعبد في الآخرة:",["الثبات عند الشبهات بالهداية واليقين","الثبات عند السؤال في القبر","تقديم رضا الله على شهوات النفس"],1],
  ["جاء قوله تعالى <span class='q'>﴿قُلْ تَمَتَّعُوا﴾</span> على سبيل:",["الإباحة والجواز","التوبيخ والتهديد","النصح والإرشاد"],1],
  ["الآية التي فسّرت <span class='q'>﴿دَارَ الْبَوَارِ﴾</span>:",["﴿جَهَنَّمَ يَصْلَوْنَهَا ۖ وَبِئْسَ الْقَرَارُ﴾","﴿قُلْ تَمَتَّعُوا﴾","﴿وَجَعَلُوا لِلَّهِ أَندَادًا﴾"],0],
  ["أيّ هذه الكلمات فيها نون أو ميم مشددة؟",["اجْتُثَّتْ","جَهَنَّمَ","يُثَبِّتُ"],1],
  ["الأصل في الإنفاق أن يكون:",["في العلن","في السر والخفاء","أمام الناس دائمًا"],1]
],{full:"ممتاز! ما شاء الله",good:"أحسنتِ! راجعي ما فاتك",low:"راجعي الآيات ومعناها الإجمالي، ثم أعيدي المحاولة"});
$("#qalbi").onclick=e=>{const c=e.target.closest(".chip");if(c){c.classList.toggle("sel");sfx.tap()}};

/* ========== 21 game + ideas ========== */
const GAME=["٥ نقاط إذا كانت ورقة العمل صحيحة وكاملة","عللي: الأصل أن يكون الإنفاق في السر والخفاء أفضل من العلن","بيّني بعض صور تثبيت الله للعبد في الحياة الدنيا","اختاري مجموعة أخرى وأعطيهم نقطتين","طالبة تسأل وطالبة تجيب","كيف يكون خذلان الكافر عند القبر؟","٣ نقاط من غير سؤال","اختاري الإجابة الصحيحة: معنى ﴿خِلَالٌ﴾ (بيع – صداقة – شفاعة)","اختاري الإجابة الصحيحة: معنى ﴿اجْتُثَّتْ﴾ (ارتفعت – اقتُلِعت – أثمرت)"];
$("#game").innerHTML=shuffle(GAME).map((g,i)=>`<button class="gcard" data-flip><div class="in"><div class="fc front">${ar(i+1)}</div><div class="fc back">${qwrap(g)}</div></div></button>`).join("");
const fl=store.get("fl",["","",""]);
$$("#flist input").forEach((inp,i)=>{inp.value=fl[i]||"";inp.oninput=()=>{fl[i]=inp.value;store.set("fl",fl)}});
const QV=["﴿أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً﴾","﴿تُؤْتِي أُكُلَهَا كُلَّ حِينٍ بِإِذْنِ رَبِّهَا﴾","﴿وَمَثَلُ كَلِمَةٍ خَبِيثَةٍ كَشَجَرَةٍ خَبِيثَةٍ﴾","﴿يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ﴾","﴿أَلَمْ تَرَ إِلَى الَّذِينَ بَدَّلُوا نِعْمَتَ اللَّهِ كُفْرًا﴾","﴿قُلْ تَمَتَّعُوا فَإِنَّ مَصِيرَكُمْ إِلَى النَّارِ﴾","﴿قُل لِّعِبَادِيَ الَّذِينَ آمَنُوا يُقِيمُوا الصَّلَاةَ﴾"];
$$("#qwords .chip").forEach(c=>c.onclick=()=>{$$("#qwords .chip").forEach(x=>x.classList.toggle("sel",x===c));const v=QV[Math.random()*QV.length|0];
  const p=$("#qprompt");p.innerHTML=`كوّني سؤالًا يبدأ بـ <b style="color:var(--rose)">«${c.textContent}»</b> عن قوله تعالى: <span class="q" style="color:var(--sea)">${v}</span>`;p.classList.remove("pop");void p.offsetWidth;p.classList.add("pop");sfx.ok()});

/* ========== 22 notes ========== */
const nt=store.get("notes",["","",""]);
$$("#notes textarea").forEach((t,i)=>{t.value=nt[i]||"";t.oninput=()=>{nt[i]=t.value;store.set("notes",nt)}});

boot();
