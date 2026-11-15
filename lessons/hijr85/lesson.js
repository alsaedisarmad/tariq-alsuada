/* درس الحجر ٨٥–٩٩: تفاعلات المحطات (الهيكل المشترك في shared/core.js) */
/* ========== 1 class rules ========== */
$$("#vows .vow").forEach(b=>b.onclick=()=>{if(b.classList.contains("lit"))return;b.classList.add("lit");const n=$$("#vows .lit").length,all=$$("#vows .vow").length;
  if(n===all){$("#sky").classList.add("dawn");$("#pledgeMsg").textContent="أضاءت النجمات الستّ";confetti();sfx.win()}else{$("#pledgeMsg").textContent="أضاءت "+ar(n)+" من "+ar(all);sfx.ok()}});

/* ========== 2 dawn ========== */
let dawnT=[];
function dawnPlay(){const d=$("#dawn");dawnT.forEach(clearTimeout);dawnT=[];d.classList.remove("up");$$(".ln",d).forEach(l=>l.classList.remove("on"));
  dawnT.push(setTimeout(()=>d.classList.add("up"),120));$$(".ln",d).forEach((l,i)=>dawnT.push(setTimeout(()=>l.classList.add("on"),800+i*1000)))}
ENTER[2]=dawnPlay;$("#dawnAgain").onclick=dawnPlay;

/* ========== 3 review chests ========== */
$("#chests").onclick=e=>{const b=e.target.closest(".box");if(!b)return;const c=b.closest(".chest");if(c.classList.contains("open"))return;c.classList.add("open");sfx.ok();
  if($$("#chests .open").length===3)sfx.win()};

/* ========== 4 hook: adab of da'wah ========== */
$$("#topics .clue").forEach(c=>c.onclick=()=>{if(c.classList.contains("on"))return;c.classList.add("on");sfx.ok();
  if($$("#topics .clue.on").length===$$("#topics .clue").length){$("#todayBox").classList.add("open");sfx.win()}});

/* ========== 5 verses: s فضل الله وآدابه، h المكذبون والمستهزئون، g التسبيح والعبادة، v المفردات، j لفظ الجلالة ========== */
const T85="يخبر الله تعالى عن خلقه السماوات والأرض لحِكَم عظيمة، وأن يوم القيامة آتٍ لا محالة، ويوصي نبيه ﷺ بالصفح عن المشركين صفحًا جميلًا لا أذيّة فيه.";
const T86="إن الله سبحانه الذي خلق السماوات والأرض وخلقك وخلقهم، عالم بحالك وحالهم؛ فاترك الأمر له ليحكم بينكم.";
const T87="ويمُنّ سبحانه على نبيه ﷺ بأنه أعطاه فاتحة القرآن، وهي سبع آيات يُثنّى بها، وتعاد في كل ركعة من الصلاة، وهي القرآن العظيم القدر.";
const T88="ثم يوصي سبحانه نبيه ﷺ ألا يتطلّع إلى ما متّع الله به أصنافًا من المشركين، وألا يحزن على عدم إيمانهم بالله وتكذيبهم لرسوله ﷺ، وأن يتواضع للمؤمنين ويرفق بهم.";
const T89="وأن ينذر المشركين ويحذّرهم؛ أن يصيبهم عذاب مثل العذاب الذي أنزله الله على الذين قسّموا القرآن؛ فجعلوه أقسامًا وأجزاء؛ فمنهم من يقول: سحر، ومنهم من يقول: كهانة، ومنهم من يقول غير ذلك.";
const T92="ثم يُقسم الله -عز وجل- بنفسه على حسابهم يوم القيامة أجمعين، لما عملوه في الدنيا.";
const T94="فاجهر -يا نبي الله- بدعوة الحق التي أمرك الله بها، ولا تكترث بالمشركين أو تلتفت لهم؛ فقد كفاك الله المستهزئين، الذين اتخذوا مع الله شريكًا في عبادته، فسوف يعلمون ما يلقون من العذاب يوم القيامة.";
const T97="ثم يؤكد الله لنبيه ﷺ أنه يعلم ما يصيبه من ضيق الصدر؛ بسبب تكذيب قومه له، واستهزائهم به، ويأمره أن ينزّه ربّه عن كل ما لا يليق به، ويحمده، وأن يكون من المصلين لله، العابدين له، وأن يداوم على عبادة ربه؛ حتى يأتيه الموت وهو على تلك الحال.";
const AYAT=[
 [85,"وَمَا خَلَقْنَا السَّمَاوَاتِ وَالْأَرْضَ وَمَا بَيْنَهُمَا إِلَّا [v:بِالْحَقِّ] ۗ وَإِنَّ السَّاعَةَ لَآتِيَةٌ ۖ [s:فَاصْفَحِ [v:الصَّفْحَ الْجَمِيلَ]]","الخلق بالحق والصفح الجميل",T85],
 [86,"إِنَّ رَبَّكَ هُوَ الْخَلَّاقُ الْعَلِيمُ","الخلّاق العليم",T86],
 [87,"[s:وَلَقَدْ آتَيْنَاكَ [v:سَبْعًا مِّنَ الْمَثَانِي] وَالْقُرْآنَ الْعَظِيمَ]","السبع المثاني والقرآن العظيم",T87],
 [88,"لَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ [v:أَزْوَاجًا مِّنْهُمْ] وَلَا تَحْزَنْ عَلَيْهِمْ [s:[v:وَاخْفِضْ جَنَاحَكَ] لِلْمُؤْمِنِينَ]","القناعة والتواضع",T88],
 [89,"وَقُلْ إِنِّي أَنَا النَّذِيرُ الْمُبِينُ","النذير المبين",T89],
 [90,"كَمَا أَنزَلْنَا عَلَى [h:[v:الْمُقْتَسِمِينَ]]","المقتسمون",T89],
 [91,"[h:الَّذِينَ جَعَلُوا الْقُرْآنَ [v:عِضِينَ]]","جعلوا القرآن عِضين",T89],
 [92,"فَوَرَبِّكَ لَنَسْأَلَنَّهُمْ أَجْمَعِينَ","الحساب يوم القيامة",T92],
 [93,"عَمَّا كَانُوا يَعْمَلُونَ","السؤال عن الأعمال",T92],
 [94,"[s:[v:فَاصْدَعْ] بِمَا تُؤْمَرُ] وَأَعْرِضْ عَنِ الْمُشْرِكِينَ","الصدع بالحق",T94],
 [95,"إِنَّا كَفَيْنَاكَ [h:الْمُسْتَهْزِئِينَ]","كفاية المستهزئين",T94],
 [96,"[h:الَّذِينَ يَجْعَلُونَ مَعَ [j:اللَّهِ] إِلَٰهًا آخَرَ] ۚ فَسَوْفَ يَعْلَمُونَ","وعيد المشركين",T94],
 [97,"وَلَقَدْ نَعْلَمُ أَنَّكَ يَضِيقُ صَدْرُكَ بِمَا يَقُولُونَ","ضيق الصدر",T97],
 [98,"[g:فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ]","التسبيح والصلاة",T97],
 [99,"[g:وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ [v:الْيَقِينُ]]","العبادة حتى الموت",T97]
];
const AW={85:[["بالحق","بالعدل والإنصاف"],["الصفح الجميل","الذي لا أذى فيه"]],87:[["سبعًا من المثاني","سورة الفاتحة"]],88:[["أزواجًا منهم","أصنافًا من الكفار"],["اخفض جناحك","تواضع للمؤمنين وارفق بهم"]],
  90:[["المقتسمين","المتحالفين، الذين تحالفوا على مخالفة الأنبياء، وتكذيبهم، وإيذائهم"]],91:[["عضين","أقسامًا وأجزاء، حيث تفرّقت فيه أقوالهم"]],94:[["فاصدع","فاجهر بالدعوة"]],99:[["اليقين","الموت"]]};
versesInit(AYAT,AW);

/* ========== 8 vocab + مقياس معرفتي ========== */
const VOC=[
  ["الصَّفْحَ الْجَمِيلَ","﴿فَاصْفَحِ الصَّفْحَ الْجَمِيلَ﴾","الذي لا أذى فيه"],
  ["سَبْعًا مِّنَ الْمَثَانِي","﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي﴾","سورة الفاتحة"],
  ["وَاخْفِضْ جَنَاحَكَ","﴿وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ﴾","تواضع للمؤمنين وارفق بهم"],
  ["الْمُقْتَسِمِينَ","﴿كَمَا أَنزَلْنَا عَلَى الْمُقْتَسِمِينَ﴾","المتحالفين، الذين تحالفوا على مخالفة الأنبياء، وتكذيبهم، وإيذائهم"],
  ["عِضِينَ","﴿الَّذِينَ جَعَلُوا الْقُرْآنَ عِضِينَ﴾","أقسامًا وأجزاء، حيث تفرّقت فيه أقوالهم"],
  ["الْيَقِينُ","﴿وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ﴾","الموت"]
];
const kr=store.get("kr",{});
$("#vgrid").innerHTML=VOC.map((v,i)=>{const others=shuffle(VOC.map((x,k)=>k).filter(k=>k!==i)).slice(0,2);
  return `<div class="vcard" data-i="${i}"><div class="kr" role="group" aria-label="مقياس معرفتي بالكلمة">${["أ","ب","ج","د"].map(l=>`<button data-l="${l}" class="${kr[i]===l?"on":""}">${l}</button>`).join("")}</div><div class="w">${v[0]}</div><div class="ctx">${v[1]}</div><div class="opts">${shuffle([i,...others]).map(k=>`<button data-k="${k}">${VOC[k][2]}</button>`).join("")}</div><div class="mean">${v[2]}</div></div>`}).join("");
$("#vgrid").onclick=e=>{
  const r=e.target.closest(".kr button");if(r){const c=r.closest(".vcard"),i=c.dataset.i;kr[i]=kr[i]===r.dataset.l?"":r.dataset.l;store.set("kr",kr);$$(".kr button",c).forEach(x=>x.classList.toggle("on",x.dataset.l===kr[i]));sfx.tap();return}
  const b=e.target.closest(".opts button");if(!b)return;const c=b.closest(".vcard");
  if(b.dataset.k===c.dataset.i){b.classList.add("ok");sfx.ok();setTimeout(()=>{c.classList.add("done");if($$("#vgrid .done").length===VOC.length){$("#vFb").textContent="أحسنتنّ! اكتملت معاني الكلمات";confetti();sfx.win()}},350)}
  else{b.classList.add("no");c.classList.add("shake");setTimeout(()=>c.classList.remove("shake"),400);sfx.no()}};

/* ========== 9 the three beautiful ones ========== */
keyLock("#jmkeys","#jmlocks","#jmFb",[
  ["﴿وَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاهْجُرْهُمْ هَجْرًا جَمِيلًا﴾","المزمل: ١٠","الهجر الجميل: هجرٌ بلا أذى"],
  ["﴿فَاصْفَحِ الصَّفْحَ الْجَمِيلَ﴾","الحجر: ٨٥","الصفح الجميل: صفحٌ بلا عتاب"],
  ["﴿فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ﴾","يوسف: ١٨","الصبر الجميل: صبرٌ بلا شكوى"]
],[],"أحسنتِ! أمر الله نبيه ﷺ بالهجر الجميل، والصفح الجميل، والصبر الجميل.");

/* ========== 11 seven verses of al-fatiha ========== */
const SEVEN=["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","الرَّحْمَٰنِ الرَّحِيمِ","مَالِكِ يَوْمِ الدِّينِ","إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ","اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"];
$("#seven").innerHTML=SEVEN.map((t,i)=>`<button class="s7" style="--k:${i}"><span class="st7"><svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"/></svg><b>${ar(i+1)}</b></span><span class="q">${t}</span></button>`).join("")+`<p class="s7cap">سبع آيات… تُثنّى (تُكرَّر) في كل ركعة من الصلاة</p>`;
lightAll("#seven",".s7",()=>{$("#seven").classList.add("all");confetti()});

/* ========== 11 logic chain (al-fatiha is makki) ========== */
let lgI=0;
$("#logic").onclick=e=>{const b=e.target.closest(".lstep");if(!b||b.classList.contains("on"))return;
  if(+b.dataset.k===lgI){b.classList.add("on");lgI++;sfx.ok();if(lgI===3){$("#logic").classList.add("done");toast("إذن: سورة الفاتحة مكية");confetti();sfx.win()}}
  else{b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);toast("ابدئي بالمقدّمة الأولى");sfx.no()}};

/* ========== 12 scale + gaps ========== */
$$("#scale .pan").forEach(p=>p.addEventListener("click",()=>{p.classList.add("on");sfx.ok();
  if($$("#scale .pan.on").length===2){$("#scale").classList.add("tip");$("#scaleCap").style.opacity=1;sfx.win()}}));
gapInit("#qtxt","#qpool","#qFb2",["القناعة والرضا بما قُسم له","استشعار النعم التي رزقه إياها","شكرها","الإسلام","التطلّع إلى ما في أيدي الناس"],[[0],[1],[2],[3]],()=>$("#qdone").classList.add("open"));

/* ========== 13 lowering the wing ========== */
$("#hen").onclick=()=>{const h=$("#hen");h.classList.toggle("low");sfx.page()};
sortInit("#kjpool","#kjlanes","#kjFb","#kjReset",[
  ["تبتسمين لزميلتك الجديدة، وتساعدينها حتى تألف المدرسة.","y"],
  ["تشرحين لزميلتك ما لم تفهمه برفق وصبر.","y"],
  ["تقبلين نصيحة زميلتك وإن كانت أصغر منك.","y"],
  ["تسخرين من إجابة زميلتك الخاطئة أمام الصف.","n"],
  ["ترفضين العمل مع مجموعتك؛ لأنك ترين نفسك أفضل منهن.","n"],
  ["تخاطبين عاملة المدرسة بأسلوب جافّ متعالٍ.","n"]
]);

/* ========== 14 'idin puzzle ========== */
lightAll("#puzzle",".pz",()=>$("#idin").classList.add("open"));

/* ========== 17 pyramid + tasbih ========== */
lightAll("#pyr",".tier");
const TSW=["سبحان الله وبحمده","سبحان الله العظيم"];let tsN=store.get("tsN",0);
function tsDraw(){$("#tsN").textContent=ar(tsN);$("#tsW").textContent=TSW[tsN%2];$("#tsRing").style.strokeDashoffset=326.7*(1-(tsN%33||(tsN?33:0))/33)}
$("#tsb").onclick=()=>{tsN++;store.set("tsN",tsN);tsDraw();$("#tsb").classList.remove("pulse");void $("#tsb").offsetWidth;$("#tsb").classList.add("pulse");if(tsN%33===0){confetti();sfx.win()}else sfx.tap()};
$("#tsReset").onclick=()=>{tsN=0;store.set("tsN",0);tsDraw()};tsDraw();

/* ========== 18 life path + classify worships ========== */
let lfI=0;
$("#life").onclick=e=>{const b=e.target.closest("button.lf");if(!b||b.classList.contains("on"))return;const all=$$("#life button.lf");
  if(all.indexOf(b)!==lfI){b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);sfx.no();return}
  b.classList.add("on");lfI++;sfx.ok();if(lfI===all.length){$("#life .end").classList.add("on");sfx.win()}};
sortInit("#ibpool","#iblanes","#ibFb","#ibReset",[
  ["القناعة والرضا بما قسم الله ﴿لَا تَمُدَّنَّ عَيْنَيْكَ﴾","q"],
  ["استشعار نعم الله، ومنها نعمة القرآن ﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي﴾","q"],
  ["التسبيح والتحميد ﴿فَسَبِّحْ بِحَمْدِ رَبِّكَ﴾","l"],
  ["الإنذار والجهر بالدعوة ﴿وَقُلْ إِنِّي أَنَا النَّذِيرُ الْمُبِينُ﴾","l"],
  ["الصلاة والسجود لله ﴿وَكُن مِّنَ السَّاجِدِينَ﴾","f"],
  ["الرفق بالمؤمنين في التعامل ﴿وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ﴾","f"]
]);

/* ========== 20 homeland: values card ========== */
const ICV={safh:'<path d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.7 12 20 12 20z"/><path d="M9 12.5h6"/>',
  wing:'<path d="M3 15c5-.5 8-4 9-9 1 5 4 8.5 9 9-5 1-7.5 3-9 5.5C10.5 18 8 16 3 15z"/>',
  scale:'<path d="M12 4v15M7 20h10M5 8h14"/><path d="M5 8l-3 6h6zM19 8l-3 6h6z"/>',
  book:'<path d="M12 6.5c-2-1.6-5-2-8-1.5V18c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6-.1-8 1.5z"/><path d="M12 6.5v13"/>',
  steps:'<path d="M3 20h5v-4h4v-4h4V8h5"/><path d="M19 3l2 2-2 2"/>'};
const ATH=[["الصفح والتسامح","مبادرة صلح وتآلف بين الزميلات","#11806F","﴿فَاصْفَحِ الصَّفْحَ الْجَمِيلَ﴾",ICV.safh],
  ["التواضع ولين الجانب","استقبال الطالبات الجديدات ومساعدتهن","#5A45B5","﴿وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ﴾",ICV.wing],
  ["القناعة والرضا","ترشيد الاستهلاك والبعد عن التفاخر","#D98A1C","﴿لَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ أَزْوَاجًا مِّنْهُمْ﴾",ICV.scale],
  ["الاعتزاز بالقرآن","حلقة لتلاوة القرآن وتدبّره في المدرسة","#C93A60","﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ﴾",ICV.book],
  ["المداومة والإتقان","مواظبة على عمل تطوعي يخدم المجتمع","#2B7FB8","﴿وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ﴾",ICV.steps]];
let athI=store.get("athI",-1),vURL="",vFile=null,vJob=0,vT=null;
$("#athar").innerHTML=ATH.map(([t,s,c,,ic],i)=>`<button class="ath" style="--c:${c}" data-i="${i}"><svg viewBox="0 0 24 24">${ic}</svg><b>${t}</b><small>${s}</small></button>`).join("");
$("#pName").value=store.get("pName","");$("#pStep").value=store.get("pStep","");
function pRender(){$$("#athar .ath").forEach((b,i)=>b.classList.toggle("on",i===athI));const a=ATH[athI],nm=$("#pName").value.trim(),st=$("#pStep").value.trim();
  $("#pN").textContent=nm||"اسمك هنا";$("#pQ").textContent=a?a[3]:"﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ﴾";
  $("#pD").innerHTML=a?`قيمتي: <b>${a[0]}</b><br>مبادرتي: ${esc(st||a[1])}`:"اختاري قيمة من الأعلى";
  store.set("pName",nm);store.set("pStep",st);store.set("athI",athI);clearTimeout(vT);vT=setTimeout(drawValue,250)}
$("#athar").onclick=e=>{const b=e.target.closest(".ath");if(!b)return;athI=+b.dataset.i;pRender();sfx.ok()};
$("#pName").oninput=pRender;$("#pStep").oninput=pRender;
async function drawValue(){
  if(athI<0)return;const job=++vJob;
  try{await Promise.all(["700 86px Display","56px Mushaf","600 46px Body"].map(f=>document.fonts.load(f)))}catch(e){}
  const logo=await loadImg(LOGO_SRC);if(job!==vJob)return;
  const a=ATH[athI],W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#0d4f46");g.addColorStop(.55,"#11806F");g.addColorStop(1,"#33246E");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle="#F6C66B33";x.beginPath();x.arc(120,120,260,0,7);x.fill();
  x.direction="rtl";x.textAlign="right";x.fillStyle="#fff";
  x.font="600 34px Body";x.fillText("قيمٌ نبني بها وطننا | سورة الحجر ٨٥–٩٩",W-90,150);
  x.font="56px Mushaf";let y=290;wrapLines(x,a[3],W-180).forEach(l=>{x.fillText(l,W-90,y);y+=110});
  x.font="700 86px Display";x.fillText($("#pName").value.trim()||"طالبة مجتهدة",W-90,y+150);
  x.font="600 46px Body";x.fillStyle="#F6C66B";x.fillText("قيمتي: "+a[0],W-90,y+260);
  x.fillStyle="#fff";x.font="400 42px Body";wrapLines(x,"مبادرتي: "+($("#pStep").value.trim()||a[1]),W-180).forEach((l,i)=>x.fillText(l,W-90,y+350+i*72));
  x.font="600 34px Body";x.fillStyle="#F6C66B";x.fillText("وطن طموح • اقتصاد مزدهر • مجتمع حيوي",W-90,H-210);
  x.font="400 30px Body";x.fillStyle="#ffffffcc";x.fillText("أستاذة المادة: "+TEACHER,W-90,H-130);x.fillText("مديرة المدرسة: "+PRINCIPAL,W-90,H-84);
  if(logo)x.drawImage(tinted(logo,200,200*logo.naturalHeight/logo.naturalWidth,"#fff"),80,H-230);
  vURL=c.toDataURL("image/png");c.toBlob(b=>{if(job===vJob&&b)try{vFile=new File([b],"بطاقة-قيمتي.png",{type:"image/png"})}catch(e){vFile=null}},"image/png");
}
function vReady(){if(athI<0){toast("اختاري قيمة أولًا");return false}if(!vURL){toast("لحظة… يتم تجهيز البطاقة");drawValue();return false}return true}
$("#pPrint").onclick=()=>{if(vReady())printImage(vURL,"بطاقة-قيمتي.png")};
$("#pSave").onclick=()=>{if(vReady()){sfx.win();shareImage(vURL,vFile,"بطاقة-قيمتي.png","بطاقة قيمتي")}};
pRender();

/* ========== 21 connect + istinbat ========== */
const CN=[["قال تعالى: ﴿فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ﴾ [آل عمران: ١٥٩]","﴿وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ﴾"],
  ["قال تعالى: ﴿يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ ۖ وَإِن لَّمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ ۚ وَاللَّهُ يَعْصِمُكَ مِنَ النَّاسِ﴾ [المائدة: ٦٧]","﴿فَاصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ "+VN(94)+" إِنَّا كَفَيْنَاكَ الْمُسْتَهْزِئِينَ﴾"],
  ["قال ﷺ لما توفي عثمان بن مظعون رضي الله عنه: «أمّا عثمان فقد جاءه -والله- اليقين» رواه البخاري برقم (٢٦٨٧).","﴿وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ﴾"],
  ["قال ﷺ: «الحمد لله رب العالمين، هي السبع المثاني، والقرآن العظيم الذي أوتيته» رواه البخاري برقم (٥٠٠٦).","﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ﴾"]];
const CX=["﴿فَاصْفَحِ الصَّفْحَ الْجَمِيلَ﴾","﴿فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ﴾"];
let cI=0;
function cInit(){cI=0;$("#vtiles").innerHTML=shuffle(CN.map((c,i)=>[c[1],i]).concat(CX.map(t=>[t,-1]))).map(([t,i])=>`<button class="vtile" data-i="${i}">${t}</button>`).join("");$("#ctable").innerHTML="";$("#cFb").textContent="";cShow()}
function cShow(){$("#istn").innerHTML=cI<CN.length?`<span class="n">${ar(cI+1)}</span><span>${qwrap(CN[cI][0])}</span>`:`<span class="n">✓</span><span>اكتمل الربط! أحسنتِ.</span>`}
$("#vtiles").onclick=e=>{const t=e.target.closest(".vtile");if(!t||cI>=CN.length)return;
  if(+t.dataset.i===cI){t.classList.add("used");$("#ctable").insertAdjacentHTML("beforeend",`<tr class="ok"><td>${qwrap(CN[cI][0])}</td><td>${CN[cI][1]}</td></tr>`);cI++;cShow();$("#cFb").textContent="";sfx.ok();if(cI===CN.length){confetti();sfx.win()}}
  else{t.classList.add("shake");setTimeout(()=>t.classList.remove("shake"),400);$("#cFb").className="fb no";$("#cFb").textContent="ليس هذا الموضع، حاولي مرة أخرى.";sfx.no()}};
$("#cReset").onclick=cInit;cInit();
keyLock("#fkeys","#flocks","#fFb",[
  ["﴿فَاصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ "+VN(94)+" إِنَّا كَفَيْنَاكَ الْمُسْتَهْزِئِينَ﴾","الحجر: ٩٤–٩٥","أمر الله رسوله ﷺ بالصدع بالحق والدعوة إليه، ثم أخبره بأنه سيكفيه سخرية المستهزئين؛ إشارةً إلى أن الدعوة تستلزم الصبر، وأن الله متكفّل بحماية الداعي وتأييده."],
  ["﴿وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ "+VN(87)+" لَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ أَزْوَاجًا مِّنْهُمْ﴾","الحجر: ٨٧–٨٨","من امتلأ قلبه بالقرآن قلّ قدر الدنيا في قلبه."],
  ["﴿وَلَقَدْ نَعْلَمُ أَنَّكَ يَضِيقُ صَدْرُكَ بِمَا يَقُولُونَ "+VN(97)+" فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ﴾","الحجر: ٩٧–٩٨","الصلاة والتسبيح دواء للهمّ والغمّ، ومن أعظم وسائل دفع الحزن وزوال المكروه."]
],[],"أحسنتِ!");

/* ========== 22 tajweed: lam of the divine name ========== */
sortInit("#lpool","#llanes","#lFb","#lReset",[
  ["﴿يَجْعَلُونَ مَعَ اللَّهِ إِلَٰهًا آخَرَ﴾","t"],["﴿إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ﴾","t"],["﴿مُّحَمَّدٌ رَّسُولُ اللَّهِ﴾","t"],["﴿قَالَ اللَّهُ هَٰذَا يَوْمُ يَنفَعُ الصَّادِقِينَ صِدْقُهُمْ﴾","t"],
  ["﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾","k"],["﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ﴾","k"],["﴿قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ﴾","k"],["﴿أَفِي اللَّهِ شَكٌّ﴾","k"]
]);

/* ========== 23 learn to act: saved inputs ========== */
$("#myWay").value=store.get("myWay","");$("#myWay").oninput=()=>store.set("myWay",$("#myWay").value);
const fl=store.get("fl",["","",""]);
$$("#flist input").forEach((t,i)=>{t.value=fl[i]||"";t.oninput=()=>{fl[i]=t.value;store.set("fl",fl)}});

/* ========== 24 quiz ========== */
quizInit([
  ["معنى <span class='q'>﴿الصَّفْحَ الْجَمِيلَ﴾</span>:",["الصفح الذي لا أذى فيه","الصفح عن كل أحد في كل حال","الصفح مع العتاب واللوم"],0],
  ["المقصود بـ<span class='q'>﴿سَبْعًا مِّنَ الْمَثَانِي﴾</span>:",["السور السبع الطوال","سورة الفاتحة","سبع آيات من سورة الحجر"],1],
  ["معنى <span class='q'>﴿وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ﴾</span>:",["احذر من المؤمنين","ابتعد عن المؤمنين","تواضع للمؤمنين وارفق بهم"],2],
  ["معنى <span class='q'>﴿عِضِينَ﴾</span>:",["أقسامًا وأجزاء تفرّقت فيه أقوالهم","مكذبين معاندين","متحالفين على الباطل"],0],
  ["<span class='q'>﴿الْمُقْتَسِمِينَ﴾</span> هم:",["الذين اقتسموا الغنائم","المتحالفون على مخالفة الأنبياء وتكذيبهم وإيذائهم","الذين يُقسمون بالله صادقين"],1],
  ["معنى <span class='q'>﴿الْيَقِينُ﴾</span> في قوله تعالى: <span class='q'>﴿وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ﴾</span>:",["العلم","النصر","الموت"],2],
  ["سؤال الله المشركين يوم القيامة عمّا كانوا يعملون سؤال:",["استخبار واستعلام","تقريع وتوبيخ","تعليم وإرشاد"],1],
  ["من أعظم وسائل دفع ضيق الصدر والحزن التي أرشدت إليها الآيات:",["الصلاة والتسبيح","الانشغال بالدنيا","الإعراض عن الناس"],0],
  ["الحكمة من قوله تعالى: <span class='q'>﴿لَا تَمُدَّنَّ عَيْنَيْكَ﴾</span> دون «لا تنظرنّ»:",["لأن الذي يمدّ بصره يدفعه إلى ذلك الحرص والتطلّع","لأن النظر إلى الدنيا محرّم مطلقًا","للتأكيد على النظر إلى السماء"],0],
  ["حكم لام لفظ الجلالة في قوله تعالى: <span class='q'>﴿مَعَ اللَّهِ إِلَٰهًا آخَرَ﴾</span>:",["ترقيق؛ لأنها بعد كسر","تفخيم؛ لأنها بعد فتح","ترقيق؛ لأنها بعد ضم"],1]
],{full:"ممتاز! ما شاء الله",good:"أحسنتِ! راجعي ما فاتك",low:"راجعي الآيات ومعناها الإجمالي، ثم أعيدي المحاولة"});

/* ========== 26 istakhlis: the commands ========== */
huntInit("#mamurat","#mN","#mBar","#mFb",[
  ["الصفح الجميل",85,"",1],["الرضا بما قسم الله",88,"",1],["التواضع ولين الجانب للمؤمنين",88,"",1],["الدعوة إلى الله والصدع بالحق",94,"",1],["الاستعانة بالتسبيح والصلاة",98,"",1],["دوام العبادة حتى يلقى العبد ربه",99,"",1],
  ["الحزن على المكذبين","","نهت عنه الآيات: (ولا تحزن عليهم)",0],["مدّ العين إلى متاع الدنيا","","نهت عنه الآيات: (لا تمدّنّ عينيك)",0],["الانشغال بالمستهزئين","","أُمر بالإعراض عنهم: (وأعرض عن المشركين)",0],["معاقبة كل من أساء","","أُمر بالصفح الجميل: (فاصفح الصفح الجميل)",0]
],"أحسنتِ! استخلصتِ المأمورات الستّ.");

/* ========== 27 surah review: secret code ========== */
const TFL=[["سورة الحجر سورة مدنية، وعدد آياتها (١٠٩) آيات، ونزلت بعد سورة الإسراء.",0,"بل مكية، وعدد آياتها (٩٩) آية، ونزلت بعد سورة يوسف."],
  ["من مقاصدها: تثبيت المؤمنين.",1],
  ["من سُبل دفع ضيق الصدر المذكورة في السورة: الاستغفار.",0,"بل التسبيح والصلاة: ﴿فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ﴾."],
  ["من معاني التسبيح: الصلاة.",1],
  ["معنى اليقين المذكور في الآيات هو: الموت.",1],
  ["يجب على المؤمن الموازنة بين الخوف والرجاء.",1],
  ["معنى كلمة «فأنظرني» أي: انظر إليّ.",0,"بل معناها: فأمهلني."],
  ["من أخطر معاصي القلب: التكبّر والحسد.",1],
  ["من صور الصفح الجميل: الصفح عن عقوبة الظالمين والعاصين، وعدم إقامة الحدود عليهم.",0,"هذا صفحٌ في غير محله؛ فلا يُصفح حيث اقتضى المقام العقوبة."],
  ["أعظم السور فضلًا هي سورة الفاتحة.",1]];
const CODE=TFL.map((t,i)=>t[1]?i:-1).filter(i=>i>=0);
function tflInit(){
  $("#tfl").innerHTML=TFL.map(([t],i)=>`<div class="tfr" data-i="${i}"><span class="n">${ar(i+1)}</span><p>${qwrap(t)}</p><div class="tfb"><button data-v="1" aria-label="صحيحة">✓</button><button data-v="0" aria-label="خاطئة">✗</button></div></div>`).join("");
  $("#digits").innerHTML=CODE.map(()=>`<span>*</span>`).join("");$("#codeFb").textContent="";$("#lockart").classList.remove("open")}
$("#tfl").onclick=e=>{const b=e.target.closest(".tfb button");if(!b)return;const r=b.closest(".tfr");if(r.classList.contains("done"))return;const i=+r.dataset.i,t=TFL[i];
  if(+b.dataset.v===t[1]){b.classList.add("ok");r.classList.add("done",t[1]?"yes":"no");if(!t[1]&&t[2])r.insertAdjacentHTML("beforeend",`<small class="fix">${qwrap(t[2])}</small>`);sfx.ok();
    if(t[1]){const d=$$("#digits span")[CODE.indexOf(i)];d.textContent=ar(i+1);d.classList.add("on")}
    if($$("#tfl .done").length===TFL.length){$("#lockart").classList.add("open");$("#codeFb").className="fb ok";$("#codeFb").textContent="انفتح القفل! الرقم السري: "+CODE.map(i=>ar(i+1)).join(" – ");confetti();sfx.win()}}
  else{r.classList.add("shake");setTimeout(()=>r.classList.remove("shake"),400);sfx.no()}};
$("#tflReset").onclick=tflInit;tflInit();

/* ========== 28 notes + envelope ========== */
const nt=store.get("notes",["","",""]);
$$("#notes textarea").forEach((t,i)=>{t.value=nt[i]||"";t.oninput=()=>{nt[i]=t.value;store.set("notes",nt)}});
$("#envQ").value=store.get("envQ","");$("#envQ").oninput=()=>store.set("envQ",$("#envQ").value);
$("#envSend").onclick=()=>{if(!$("#envQ").value.trim()){toast("اكتبي سؤالك أولًا");$("#envQ").focus();return}
  const e=$("#envelope");e.classList.remove("fly");void e.offsetWidth;e.classList.add("fly");toast("أُرسل سؤالك! اقرئيه على صديقتك لتجيب عنه");sfx.win()};

boot();
