/* درس هود ١١٢–١٢٣: تفاعلات المحطات (الهيكل المشترك في shared/core.js) */
const burstAt=(el,n)=>{if(n>=50)confetti()};
const root=document.documentElement;

/* ========== 1 pledge ========== */
const pl=$$("#pledge .rule-card");
pl.forEach(c=>c.addEventListener("click",()=>{c.classList.toggle("signed");if(c.classList.contains("signed"))sfx.ok();
  const all=pl.every(x=>x.classList.contains("signed"));$("#pledgeMsg").textContent=all?"خُتم الميثاق. نبدأ رحلتنا على بركة الله.":"";if(all){sfx.win();confetti()}}));

/* ========== 2 quote ========== */
const qEl=$("#quote"),qText=qEl.textContent.trim();
function playQuote(){qEl.innerHTML=qText.split(" ").map(w=>`<span class="w">${w}</span> `).join("");$$(".w",qEl).forEach((w,i)=>setTimeout(()=>w.classList.add("in"),300+i*170))}
ENTER[2]=playQuote;$("#quoteAgain").onclick=playQuote;

/* ========== 3 envelopes ========== */
const ENV=[
 ["ما الضوابط التي وضعها العلماء للمفسّر؟","إجابة شفهية تقوّمها المعلمة في ضوء الدرس السابق."],
 ["مثّلي لتفسير القرآن بالقرآن، ولتفسير القرآن بالسنة.","مثال تذكره الطالبة من الدرس السابق، مع بيان موضع التفسير."],
 ["ما أهمية علم التفسير؟","به يُفهم مراد الله من كلامه، فيُعمل به ويُتدبَّر."],
 ["رتّبي طرق التفسير.","تفسير القرآن بالقرآن، ثم بالسنة، ثم بأقوال الصحابة، ثم بأقوال التابعين، ثم بمقتضى اللغة العربية."],
 ["بيّني معاني: الوِرد المورود · منها قائم وحصيد · تتبيب · غير مجذوذ.","الورد المورود: المدخل الذي يدخلونه · قائم وحصيد: منها ما بقيت آثاره ومنها ما زال كالزرع المحصود · تتبيب: تخسير وهلاك · غير مجذوذ: غير مقطوع."],
 ["استنبطي الفائدة من قوله تعالى: ﴿وَمَا ظَلَمْنَاهُمْ وَلَٰكِن ظَلَمُوا أَنفُسَهُمْ﴾","كمال عدل الله؛ فلا يظلم أحدًا، وما يصيب الناس من عقوبة فبسبب ذنوبهم."]];
$("#envs").innerHTML=ENV.map((e,i)=>`<div class="env" data-i="${i}"><div class="body"><div class="flap"><svg viewBox="0 0 300 96" preserveAspectRatio="none"><path d="M0 0h300L150 92z" fill="var(--lilac)" stroke="var(--line)" stroke-width="1.5"/></svg></div><span class="seal">${ar(i+1)}</span><div class="content"><p>${e[0].replace(/﴿(.+?)﴾/g,'<span class="q" style="color:var(--sea)">﴿$1﴾</span>')}</p><button class="btn sm ghost" data-hint>تلميح</button><div class="hint">${e[1]}</div></div></div></div>`).join("");
$$("#envs .env").forEach(env=>env.addEventListener("click",e=>{
  if(e.target.closest("[data-hint]")){env.classList.toggle("hinted");return}
  if(!env.classList.contains("open")){env.classList.add("open");sfx.ok()}
}));

/* ========== 4 video ========== */
const vid=$("#vid"),hv=$("#hookVideo");
$(".cover-play",vid).onclick=()=>{pauseMedia();hv.controls=true;hv.play().catch(()=>{});vid.classList.add("playing")};
hv.addEventListener("ended",()=>{vid.classList.remove("playing");hv.controls=false;sfx.ok()});

/* ========== 5 verses ========== */
const AYAT=[
 [112,"[c:فَاسْتَقِمْ] كَمَا أُمِرْتَ [k:وَمَن تَابَ] مَعَكَ [n:وَلَا تَطْغَوْا] ۚ إِنَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ","الاستقامة","يأمر الله تعالى رسوله صلى الله عليه وسلم وأتباعه بالاستقامة والثبات على هذا الدين، وعدم تجاوز حدود الله أو الانحراف عن شرعه؛ فإنه لا يخفى عليه سبحانه شيء من أعمال عباده."],
 [113,"[n,v:وَلَا تَرْكَنُوا] إِلَى الَّذِينَ ظَلَمُوا فَتَمَسَّكُمُ النَّارُ وَمَا لَكُم [k:مِّن دُونِ] اللَّهِ مِنْ أَوْلِيَاءَ ثُمَّ لَا [k:تُنصَرُونَ]","التحذير من الظلم","ينهى سبحانه عن الميل إلى الظالمين وموافقتهم والرضا بأفعالهم؛ فإن ذلك من أسباب عذاب الله، وحينها لا وليّ ولا ناصر يمنع ذلك العذاب."],
 [114,"[c:وَأَقِمِ الصَّلَاةَ] [v:طَرَفَيِ النَّهَارِ] [v:وَزُلَفًا مِّنَ اللَّيْلِ] ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلذَّاكِرِينَ","إقامة الصلاة","يأمر تعالى نبيه بإقامة الصلاة تامة كاملة في أول النهار وآخره (الفجر، والظهر والعصر)، وفي ساعات من الليل (المغرب والعشاء وقيام الليل)؛ فهذه الصلوات من أكبر الحسنات التي تمحو صغائر الذنوب."],
 [115,"[c:وَاصْبِرْ] فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ","الصبر","يأمر سبحانه نبيه بالصبر على ما يلقى من أذى المشركين، وعلى طاعة الله والقيام بأمره؛ فإن الله لا يضيع أجر من أحسن عمله."],
 [116,"فَلَوْلَا كَانَ مِنَ الْقُرُونِ [k:مِن قَبْلِكُمْ] أُولُو بَقِيَّةٍ يَنْهَوْنَ عَنِ الْفَسَادِ فِي الْأَرْضِ إِلَّا قَلِيلًا مِّمَّنْ [k:أَنجَيْنَا] مِنْهُمْ ۗ وَاتَّبَعَ الَّذِينَ ظَلَمُوا مَا أُتْرِفُوا فِيهِ وَكَانُوا مُجْرِمِينَ","إنكار المنكر","يقرر سبحانه أهمية إنكار المنكر، وأن الآمرين بالمعروف والناهين عن المنكر في الأمم السابقة كانوا قليلًا، وقد نجّاهم الله حين أخذ الظالمين الذين استمروا على منكراتهم ومعاصيهم حتى فاجأهم العذاب."],
 [117,"وَمَا كَانَ رَبُّكَ لِيُهْلِكَ الْقُرَىٰ بِظُلْمٍ وَأَهْلُهَا مُصْلِحُونَ","الإصلاح سبب النجاة","لم يكن الله ليهلك القرى ظلمًا وأهلها مصلحون؛ فالإصلاح والأمر بالمعروف والنهي عن المنكر من أسباب نجاة المجتمعات."],
 [118,"وَلَوْ شَاءَ رَبُّكَ لَجَعَلَ النَّاسَ أُمَّةً وَاحِدَةً ۖ وَلَا يَزَالُونَ مُخْتَلِفِينَ","حكمة الاختلاف","يبيّن سبحانه أنه قادر على جعل الناس على دين واحد، ولكن حكمته اقتضت اختلاف أديانهم ومللهم واعتقاداتهم."],
 [119,"إِلَّا مَن رَّحِمَ رَبُّكَ ۚ وَلِذَٰلِكَ خَلَقَهُمْ ۗ وَتَمَّتْ كَلِمَةُ رَبِّكَ لَأَمْلَأَنَّ جَهَنَّمَ مِنَ [v:الْجِنَّةِ] وَالنَّاسِ أَجْمَعِينَ","شقيٌّ وسعيد","انقسم الناس بين شقي وسعيد، وكلٌّ ميسّر لما خُلق له، وقد سبق في علم الله وقضائه وقدره أن جهنم ستمتلئ بمن يستحقها من أشقياء الجن والإنس."],
 [120,"وَكُلًّا نَّقُصُّ عَلَيْكَ مِنْ أَنبَاءِ الرُّسُلِ مَا نُثَبِّتُ بِهِ فُؤَادَكَ ۚ وَجَاءَكَ فِي هَٰذِهِ الْحَقُّ وَمَوْعِظَةٌ وَذِكْرَىٰ لِلْمُؤْمِنِينَ","حكمة القصص","كل ما يقصّه الله على نبيه من أخبار الرسل مع أقوامهم إنما هو لتثبيت قلبه، وليكون له في قصصهم سلوان وأسوة، وقد جاءه في هذه السورة حقٌّ وصدق وموعظة وتذكير للمؤمنين."],
 [121,"وَقُل لِّلَّذِينَ لَا يُؤْمِنُونَ [t:اعْمَلُوا عَلَىٰ مَكَانَتِكُمْ] إِنَّا عَامِلُونَ","تهديد ووعيد","وقل يا نبي الله لغير المؤمنين على وجه التهديد: اعملوا ما اعتدتم عليه من التكذيب والإيذاء، فإني ومن معي من المؤمنين مستمرون على الثبات على الدين."],
 [122,"[t,k:وَانتَظِرُوا] إِنَّا [k:مُنتَظِرُونَ]","تهديد ووعيد","وانتظروا ونحن منتظرون عاقبة كلِّ فريق ومآله."],
 [123,"وَلِلَّهِ غَيْبُ السَّمَاوَاتِ وَالْأَرْضِ وَإِلَيْهِ يُرْجَعُ الْأَمْرُ كُلُّهُ [c:فَاعْبُدْهُ] [c:وَتَوَكَّلْ عَلَيْهِ] ۚ وَمَا رَبُّكَ بِغَافِلٍ عَمَّا تَعْمَلُونَ","العبادة والتوكل","يخبر تعالى أن علم غيب السماوات والأرض له وحده، وإليه المرجع والمآب، وسيجازي كلًّا بعمله، ويأمر نبيه بعبادته والتوكل عليه وتفويض الأمر إليه؛ فقد أحاط سبحانه بكل شيء علمًا فلا تخفى عليه خافية."]];
const WORDS={113:[["لَا تَرْكَنُوا","لا تميلوا إلى الظالمين بمداهنة أو مودة"]],114:[["طَرَفَيِ النَّهَارِ","أول النهار وآخره"],["زُلَفًا مِّنَ اللَّيْلِ","ساعات من الليل"]],119:[["الْجِنَّةِ","الجن"]]};
versesInit(AYAT,WORDS,{c:'<span><i style="background:var(--sea)"></i>أمر</span><span><i style="background:var(--rose)"></i>نهي</span><span><i style="background:var(--plum2)"></i>أمر للتهديد</span>',v:'<span><i style="background:var(--sun2)"></i>مفردات الدرس</span>',k:'<span><i style="background:var(--rose)"></i>نون ساكنة بعدها حرف إخفاء</span>'});

/* ========== 7 scratch cards ========== */
const VOC=[["لَا تَرْكَنُوا","لا تميلوا إلى الظالمين بمداهنة أو مودة"],["طَرَفَيِ النَّهَارِ","أول النهار وآخره"],["زُلَفًا مِّنَ اللَّيْلِ","ساعات من الليل"],["الْجِنَّةِ","الجن"]];
function buildScratch(){
  if(document.fonts&&!buildScratch._f){buildScratch._f=1;document.fonts.ready.then(buildScratch);return}
  $("#scratch").innerHTML=VOC.map(v=>`<div class="sc"><span class="tick"><svg viewBox="0 0 24 24"><use href="#i-check"/></svg></span><div class="w">${v[0]}</div><div class="m">${v[1]}</div><canvas></canvas></div>`).join("");
  requestAnimationFrame(()=>$$("#scratch .sc").forEach((sc,i)=>initScratch(sc,VOC[i][0],i)));
}
function initScratch(sc,word,i){
  const cv=$("canvas",sc),r=sc.getBoundingClientRect(),d=devicePixelRatio||1;if(!r.width)return;
  cv.width=r.width*d;cv.height=r.height*d;const c=cv.getContext("2d");c.scale(d,d);
  const cols=["#33246E","#D98A1C","#C93A60","#11806F"];
  c.fillStyle=cols[i%4];c.fillRect(0,0,r.width,r.height);
  c.fillStyle="rgba(255,255,255,.16)";for(let x=10;x<r.width;x+=26)for(let y=10;y<r.height;y+=26){c.beginPath();c.arc(x,y,1.4,0,7);c.fill()}
  c.fillStyle="#fff";c.textAlign="center";c.font="32px Mushaf";c.fillText(word,r.width/2,r.height/2-4);
  c.font="600 14px Body";c.globalAlpha=.85;c.fillText("اكشطي هنا",r.width/2,r.height/2+34);c.globalAlpha=1;
  c.globalCompositeOperation="destination-out";let down=false,last=null,moves=0;
  const at=e=>{const b=cv.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]};
  const draw=e=>{const p=at(e);c.lineWidth=44;c.lineCap="round";c.beginPath();c.moveTo(...(last||p));c.lineTo(...p);c.stroke();last=p;if(++moves%12===0)check()};
  function check(){const data=c.getImageData(0,0,cv.width,cv.height).data;let clear=0,tot=0;for(let k=3;k<data.length;k+=4*29){tot++;if(data[k]<40)clear++}if(clear/tot>.5)done()}
  function done(){if(sc.classList.contains("cleared"))return;sc.classList.add("cleared");sfx.ok()}
  sc._done=done;
  cv.onpointerdown=e=>{down=true;last=null;cv.setPointerCapture(e.pointerId);draw(e)};
  cv.onpointermove=e=>{if(down)draw(e)};cv.onpointerup=cv.onpointercancel=()=>{down=false;check()};
}
ENTER[7]=()=>{if(!$("#scratch canvas"))buildScratch();else $$("#scratch .sc").forEach((sc,i)=>{if(!sc.classList.contains("cleared")&&!$("canvas",sc).width)initScratch(sc,VOC[i][0],i)})};
$("#scReveal").onclick=()=>$$("#scratch .sc").forEach(sc=>sc._done&&sc._done());
$("#scReset").onclick=buildScratch;
let mInt=null;$("#minGo").onclick=()=>{clearInterval(mInt);let s=60;const f=$("#minFg"),tx=$("#minTxt");f.style.strokeDashoffset=0;tx.textContent=ar(60);
  mInt=setInterval(()=>{s--;tx.textContent=ar(s);f.style.strokeDashoffset=169.6*(1-s/60);if(s<=5&&s>0)sfx.tick();if(s<=0){clearInterval(mInt);sfx.end();tx.textContent="!"}},1000)};

/* ========== 8 story ========== */
const scenes=$$("#story .scene");let si=0;
$("#stepper").innerHTML=scenes.map((_,i)=>`<button class="pip" aria-label="المشهد ${ar(i+1)}"></button>`).join("");
function scene(i){si=Math.max(0,Math.min(scenes.length-1,i));scenes.forEach((s,k)=>{s.classList.toggle("on",k===si);s.classList.toggle("past",k<si)});$$("#stepper .pip").forEach((p,k)=>p.classList.toggle("on",k===si));
  $("#stNext").disabled=si===scenes.length-1;$("#stPrev").disabled=si===0;if(si===scenes.length-1)sfx.win();else sfx.page()}
$$("#stepper .pip").forEach((p,i)=>p.onclick=()=>scene(i));$("#stNext").onclick=()=>scene(si+1);$("#stPrev").onclick=()=>scene(si-1);
scene(0);

/* ========== 9 balance ========== */
const BAL=[
 ["تصوم الدهر كله ولا تفطر يومًا، وتقول: هذا أحبّ إلى الله.","g","هذا غلوّ وتجاوز للحد؛ والاستقامة أن نعبد الله كما أمر، لا بما نستحسنه نحن."],
 ["تؤخّر صلاة العصر كل يوم حتى تصفرّ الشمس؛ لانشغالها بالجوال.","t","هذا تفريط وتقصير في أعظم العبادات بعد الاستقامة."],
 ["تؤدي الفرائض في أوقاتها، وتحافظ على أذكارها، وتأخذ حظها من الراحة والمذاكرة.","s","هذه هي الاستقامة: ثبات على أمر الله بلا إفراط ولا تفريط."],
 ["ترى أن مسح أسفل الخفّ أنظف وأولى، فتخالف السنة برأيها.","g","تقديم الرأي على النص تجاوزٌ للحد؛ قال عليّ رضي الله عنه: لو كان الدين بالرأي لكان أسفل الخف أولى بالمسح."],
 ["ترى صديقتها تغتاب زميلة، فتسكت دائمًا خوفًا من أن تغضب منها.","t","ترك النصح بالحكمة تقصير؛ والأمر بالمعروف من أسباب صلاح الفرد والمجتمع."]];
let bi=0;const balOrder=shuffle(BAL.map((_,i)=>i)),beam=$("#beam");
function balShow(){const b=BAL[balOrder[bi]];$("#scen").textContent=b[0];$("#scen").classList.remove("pop");void $("#scen").offsetWidth;$("#scen").classList.add("pop");
  $("#balCount").textContent="الموقف "+ar(bi+1)+" من "+ar(BAL.length);$$("#balBins .chip").forEach(c=>{c.className="chip";c.disabled=false});$("#balFb").textContent="";$("#balFb").className="fb";$("#balNext").disabled=true;beam.style.transform="rotate(0deg)"}
$$("#balBins .chip").forEach(c=>c.onclick=()=>{const b=BAL[balOrder[bi]],v=c.dataset.v;
  beam.style.transform=`rotate(${v==="g"?-14:v==="t"?14:0}deg)`;
  if(v===b[1]){c.classList.add("ok");sfx.ok();$("#balFb").className="fb ok";$("#balFb").textContent=b[2];$$("#balBins .chip").forEach(x=>x.disabled=true);$("#balNext").disabled=bi>=BAL.length-1;
    if(bi>=BAL.length-1){$("#balFb").textContent+="  أنهيتِ المواقف كلها!";sfx.win()}}
  else{c.classList.add("no","shake");sfx.no();$("#balFb").className="fb no";$("#balFb").textContent="فكّري مرة أخرى: أين يقع هذا الموقف من الميزان؟";setTimeout(()=>c.classList.remove("shake"),450)}});
$("#balNext").onclick=()=>{bi++;balShow()};balShow();

/* ========== 10 rukoon ========== */
const RK=[
 ["تمدح ظالمًا على ظلمه مجاملةً له؛ لتنال رضاه.",1,"نعم؛ المداهنة والمدح على الظلم من الركون المنهي عنه."],
 ["تبيع وتشتري مع جارتها غير المسلمة بالعدل وحسن التعامل.",0,"ليس ركونًا؛ فالمعاملة بالعدل والإحسان مشروعة، والركون هو الميل إلى الظالم والرضا بظلمه."],
 ["تضحك وتشارك في سخرية مجموعة من زميلةٍ ضعيفة.",1,"نعم؛ المشاركة في الظلم أو الرضا به ركونٌ إلى الظالمين."],
 ["تنصح من ظلمها برفق، وتدعو له بالهداية.",0,"ليس ركونًا؛ بل هذا من الإصلاح والنصح."],
 ["تنشر مقطعًا يسخر من شخص، وتقول: لست من صوّره!",1,"نعم؛ نشر الظلم مشاركة فيه وإعانة عليه."]];
let rkI=0;
function rkShow(){const r=RK[rkI];$("#rkCard").textContent=r[0];$("#rkCard").classList.remove("pop");void $("#rkCard").offsetWidth;$("#rkCard").classList.add("pop");$("#rkCount").textContent=ar(rkI+1)+" / "+ar(RK.length);
  $$("#rkBins .chip").forEach(c=>{c.className="chip";c.disabled=false});$("#rkFb").textContent="";$("#rkNext").disabled=true}
$$("#rkBins .chip").forEach(c=>c.onclick=()=>{const r=RK[rkI];if(+c.dataset.v===r[1]){c.classList.add("ok");sfx.ok();$("#rkFb").className="fb ok";$("#rkFb").textContent=r[2];$$("#rkBins .chip").forEach(x=>x.disabled=true);$("#rkNext").disabled=rkI>=RK.length-1;if(rkI>=RK.length-1)sfx.win()}
  else{c.classList.add("no","shake");sfx.no();$("#rkFb").className="fb no";$("#rkFb").textContent="أعيدي النظر في معنى الركون: الميل إلى الظالم بمداهنة أو مودة أو رضا.";setTimeout(()=>c.classList.remove("shake"),450)}});
$("#rkNext").onclick=()=>{rkI++;rkShow()};rkShow();

/* ========== 11 prayer arc + river ========== */
const PR=[["الفجر",.08,"a"],["الظهر",.5,"b"],["العصر",.68,"b"],["المغرب",.86,"c"],["العشاء",.97,"c"]];
const acx=260,acy=220,arx=230,ary=190;
$("#pnodes").innerHTML=PR.map(([n,t,g])=>{const a=Math.PI*t,x=acx+arx*Math.cos(a),y=acy-ary*Math.sin(a);const lx=acx+(arx+30)*Math.cos(a),ly=acy-(ary+26)*Math.sin(a)+6,anc=Math.cos(a)>.35?"start":Math.cos(a)<-.35?"end":"middle";return `<g class="pnode" data-g="${g}"><circle cx="${x}" cy="${y}" r="15" fill="var(--card)" stroke="var(--line)" stroke-width="3"/><text x="${lx}" y="${ly}" text-anchor="${anc}" font-family="Body" font-weight="700" font-size="17" fill="var(--ink)">${n}</text></g>`}).join("")+
 `<text x="260" y="140" text-anchor="middle" font-family="Mushaf" font-size="26" fill="var(--sea)">﴿وَأَقِمِ الصَّلَاةَ﴾</text>`;
const ARCMSG={a:"الطرف الأول من النهار: صلاة الفجر.",b:"الطرف الثاني (آخر النهار): صلاتا الظهر والعصر.",c:"زُلفًا من الليل: صلاتا المغرب والعشاء، ويدخل فيها قيام الليل."};
const ARCCOL={a:"var(--sun)",b:"var(--rose)",c:"var(--plum2)"};
$$("#phrases .chip").forEach(b=>b.onclick=()=>{const g=b.dataset.p;$$("#phrases .chip").forEach(x=>x.classList.toggle("sel",x===b));
  $$("#pnodes .pnode").forEach(n=>{const on=n.dataset.g===g,c=$("circle",n);c.setAttribute("fill",on?ARCCOL[g]:"var(--card)");c.setAttribute("stroke",on?ARCCOL[g]:"var(--line)");c.setAttribute("r",on?20:15)});
  $("#arcFb").textContent=ARCMSG[g];sfx.ok()});
$$("#pnodes .pnode").forEach(n=>n.addEventListener("click",()=>$(`#phrases [data-p="${n.dataset.g}"]`).click()));
let washes=0;const stains=$$("#stains .stain");
$("#washBtn").onclick=()=>{if(washes>=5)return;stains[washes].classList.add("gone");$$("#washes span")[washes].classList.add("done");washes++;
  $("#splash").animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-30px)"}],{duration:600});
  $("#cloth").animate([{transform:"translateY(0)"},{transform:"translateY(40px)"},{transform:"translateY(0)"}],{duration:650,easing:"cubic-bezier(.4,0,.2,1)"});
  sfx.ok();if(washes===5){$("#riverH").classList.add("open");$("#washBtn").disabled=true;sfx.win();confetti()}};
$("#washReset").onclick=()=>{washes=0;stains.forEach(s=>s.classList.remove("gone"));$$("#washes span").forEach(s=>s.classList.remove("done"));$("#riverH").classList.remove("open");$("#washBtn").disabled=false};
$$(".hkey").forEach(k=>k.onclick=()=>{if(!k.classList.contains("open")){k.classList.add("open");sfx.ok()}});

/* ========== 12 village ========== */
const HX=[70,140,215,290,365,440,515];
$("#houses").innerHTML=HX.map((x,i)=>{const h=i%3===1?70:i%3===2?56:62;return `<g class="house"><rect x="${x-26}" y="${262-h}" width="52" height="${h}" rx="4" fill="var(--bg2)" stroke="var(--line)"/>${i===3?`<path d="M${x-26} ${262-h}a26 26 0 0152 0z" fill="var(--bg2)" stroke="var(--line)"/><path d="M${x} ${236-h}v-14" stroke="var(--sun)" stroke-width="3"/>`:`<path d="M${x-30} ${262-h}h60" stroke="var(--line)" stroke-width="4"/>`}<rect class="win" x="${x-9}" y="${262-h+16}" width="18" height="22" rx="9" fill="#3a3d4d"/></g>`}).join("");
const VMSG=["لا أحد ينهى عن الفساد… والسماء مُلبّدة.","مصلحٌ واحد يوقد أول قنديل.","قنديلان… والنصيحة تنتشر.","يكثر الآمرون بالمعروف، فيخفّ الظلام.","نصف القرية يتواصى بالحق.","الإصلاح يحيط بالقرية كالسور.","تكاد الغيوم تنقشع.","﴿وَمَا كَانَ رَبُّكَ لِيُهْلِكَ الْقُرَىٰ بِظُلْمٍ وَأَهْلُهَا مُصْلِحُونَ﴾"];
function village(v){const t=v/7;$("#vOut").textContent=ar(v);
  $("#vSky").style.fill=`color-mix(in srgb, #3b2f63 ${Math.round(100-t*100)}%, #F6C66B)`;
  $("#vClouds").style.opacity=1-t;$("#vClouds").style.transform=`translateY(${-t*40}px)`;$("#vDome").style.opacity=t;
  $$("#houses .win").forEach((w,i)=>w.setAttribute("fill",i<v?"#F5C14B":"#3a3d4d"));
  $("#vMsg").innerHTML=v===7?`<span class="q" style="color:var(--sea);font-size:1.25rem">${VMSG[7]}</span>`:VMSG[v];$("#vMsg").className="fb "+(v>=4?"ok":"")}
$("#vRange").oninput=e=>{village(+e.target.value);sfx.tick();if(+e.target.value===7){sfx.win();confetti()}};village(0);

/* ========== 13 lugha ========== */
$$("#lugha .chip").forEach(c=>c.onclick=()=>{if(c.dataset.v==="1"){c.classList.add("ok");sfx.ok();$("#lughaFb").className="fb ok";$("#lughaFb").textContent="أحسنتِ: جاء الفعل بصيغة الأمر، والغرض منه التهديد والوعيد."}else{c.classList.add("no","shake");sfx.no();setTimeout(()=>c.classList.remove("shake"),450)}});

/* ========== 14 heart ========== */
function heartLinks(){const st=$("#heart"),svg=$("#heartLinks"),b=st.getBoundingClientRect();if(!b.width)return;const core=$(".heart-core",st).getBoundingClientRect(),hx=core.left+core.width/2-b.left,hy=core.top+core.height/2-b.top;
  svg.setAttribute("viewBox",`0 0 ${b.width} ${b.height}`);
  svg.innerHTML=$$(".sat",st).map(s=>{const r=s.getBoundingClientRect(),x=r.left+r.width/2-b.left,y=r.top+r.height/2-b.top,on=s.classList.contains("on");
    return `<path d="M${x} ${y}Q${(x+hx)/2} ${y} ${hx} ${hy}" fill="none" stroke="${on?"var(--rose)":"var(--line)"}" stroke-width="${on?4:2}" stroke-dasharray="${on?"0":"6 8"}"/>`}).join("")}
$$(".sat").forEach(s=>s.onclick=()=>{s.classList.toggle("on");heartLinks();sfx.ok();if($$(".sat.on").length===4){sfx.win();confetti()}});
ENTER[14]=()=>setTimeout(heartLinks,600);

/* ========== 15 ladder ========== */
const LAD=["﴿فَاسْتَقِمْ﴾ الاستقامة","﴿وَأَقِمِ الصَّلَاةَ﴾ إقامة الصلاة","﴿وَاصْبِرْ﴾ الصبر","﴿يَنْهَوْنَ عَنِ الْفَسَادِ﴾ الأمر بالمعروف والنهي عن المنكر"];
let lad=shuffle([0,1,2,3]);
function renderLad(){$("#ladder").innerHTML=lad.map((k,i)=>`<div class="rung" data-k="${k}"><span class="q">${LAD[k].replace(/(﴿.+?﴾)/,'<span style="font-family:Mushaf">$1</span>')}</span><span class="mv"><button data-m="-1" data-i="${i}" aria-label="أعلى"><svg viewBox="0 0 24 24"><use href="#i-up"/></svg></button><button data-m="1" data-i="${i}" aria-label="أسفل"><svg viewBox="0 0 24 24"><use href="#i-down"/></svg></button></span></div>`).join("")}
function flipMove(fn){const els=$$("#ladder .rung"),first=new Map(els.map(e=>[e.dataset.k,e.getBoundingClientRect().top]));fn();$$("#ladder .rung").forEach(e=>{const d=first.get(e.dataset.k)-e.getBoundingClientRect().top;if(d)e.animate([{transform:`translateY(${d}px)`},{transform:"none"}],{duration:380,easing:"cubic-bezier(.3,1.4,.5,1)"})})}
$("#ladder").addEventListener("click",e=>{const b=e.target.closest("button[data-m]");if(!b)return;const i=+b.dataset.i,j=i+ +b.dataset.m;if(j<0||j>=lad.length)return;flipMove(()=>{[lad[i],lad[j]]=[lad[j],lad[i]];renderLad()})});
$("#ladCheck").onclick=()=>{let ok=0;$$("#ladder .rung").forEach((r,i)=>{const g=+r.dataset.k===i;r.classList.toggle("ok",g);r.classList.toggle("no",!g);if(g)ok++});
  if(ok===4){$("#ladFb").className="fb ok";$("#ladFb").textContent="ترتيب صحيح! والآن: ما دلالة هذا الترتيب؟";sfx.win();confetti()}else{$("#ladFb").className="fb no";$("#ladFb").textContent=ar(ok)+" في موضعها الصحيح. راجعي ترتيب الآيات ١١٢–١١٦.";sfx.no()}};
$("#ladShuffle").onclick=()=>{flipMove(()=>{lad=shuffle(lad);renderLad()});$("#ladFb").textContent=""};
renderLad();

/* ========== 16 classify ========== */
const CLS=[["فَاسْتَقِمْ","amr"],["وَلَا تَطْغَوْا","nahy"],["وَلَا تَرْكَنُوا","nahy"],["وَأَقِمِ الصَّلَاةَ","amr"],["وَاصْبِرْ","amr"],["فَاعْبُدْهُ","amr"],["وَتَوَكَّلْ عَلَيْهِ","amr"],["اعْمَلُوا عَلَىٰ مَكَانَتِكُمْ","tahdid"],["وَانتَظِرُوا","tahdid"]];
let selChip=null;
function buildCls(){$("#pool").innerHTML=shuffle(CLS).map(([w,b])=>`<button class="chip" draggable="true" data-b="${b}">${w}</button>`).join("");$$("#binz .items").forEach(x=>x.innerHTML="");$("#clsFb").textContent="";selChip=null}
function place(chip,bin){$(".items",bin).appendChild(chip);chip.classList.remove("sel","ok","no");chip.classList.add("pop");setTimeout(()=>chip.classList.remove("pop"),500);selChip=null;sfx.tap()}
document.addEventListener("click",e=>{
  const chip=e.target.closest("#pool .chip,#binz .chip");
  if(chip){$$("#pool .chip,#binz .chip").forEach(c=>c.classList.remove("sel"));if(selChip===chip){selChip=null}else{selChip=chip;chip.classList.add("sel")}return}
  const bin=e.target.closest("#binz .bin");if(bin&&selChip)place(selChip,bin);
});
document.addEventListener("dragstart",e=>{const c=e.target.closest&&e.target.closest("#pool .chip,#binz .chip");if(c){selChip=c;e.dataTransfer.setData("text/plain","x");e.dataTransfer.effectAllowed="move"}});
$$("#binz .bin").forEach(b=>{b.addEventListener("dragover",e=>{e.preventDefault();b.classList.add("hot")});b.addEventListener("dragleave",()=>b.classList.remove("hot"));b.addEventListener("drop",e=>{e.preventDefault();b.classList.remove("hot");if(selChip)place(selChip,b)})});
$("#clsCheck").onclick=()=>{const placed=$$("#binz .chip");let ok=0;placed.forEach(c=>{const g=c.dataset.b===c.closest(".bin").dataset.bin;c.classList.toggle("ok",g);c.classList.toggle("no",!g);if(g)ok++});
  const left=$$("#pool .chip").length;if(ok===CLS.length){$("#clsFb").className="fb ok";$("#clsFb").textContent="تصنيف كامل وصحيح!";sfx.win();confetti()}
  else{$("#clsFb").className="fb no";$("#clsFb").textContent=ar(ok)+" صحيحة من "+ar(CLS.length)+(left?" · بقيت "+ar(left)+" في الأعلى":"");sfx.no()}};
$("#clsReset").onclick=buildCls;buildCls();

/* ========== 17 match ========== */
const ML=[["﴿وَلَوْ شَاءَ اللَّهُ لَجَمَعَهُمْ عَلَى الْهُدَىٰ ۚ فَلَا تَكُونَنَّ مِنَ الْجَاهِلِينَ﴾","الأنعام: ٣٥","a"],["«اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن»","رواه الترمذي (١٩٨٧)","b"],["﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ﴾","الفاتحة: ٥","c"]];
const MR=[["﴿وَلَوْ شَاءَ رَبُّكَ لَجَعَلَ النَّاسَ أُمَّةً وَاحِدَةً﴾","الآية ١١٨","a"],["﴿إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾","الآية ١١٤","b"],["﴿فَاعْبُدْهُ وَتَوَكَّلْ عَلَيْهِ﴾","الآية ١٢٣","c"],["﴿وَمَا كَانَ رَبُّكَ لِيُهْلِكَ الْقُرَىٰ بِظُلْمٍ﴾","الآية ١١٧","x"]];
let mSel=null,links=[];
const qwrap=s=>s.replace(/(﴿.+?﴾)/g,'<span class="q">$1</span>');
function buildMatch(){links=[];mSel=null;
  $("#mL").innerHTML=ML.map(m=>`<button class="mcard" data-k="${m[2]}">${qwrap(m[0])}<small>${m[1]}</small></button>`).join("");
  $("#mR").innerHTML=shuffle(MR).map(m=>`<button class="mcard" data-k="${m[2]}">${qwrap(m[0])}<small>${m[1]}</small></button>`).join("");
  $("#mFb").textContent="";drawWires()}
function drawWires(){const host=$("#match"),b=host.getBoundingClientRect();if(!b.width)return;const svg=$("#wires");svg.setAttribute("viewBox",`0 0 ${b.width} ${b.height}`);
  svg.innerHTML=links.map(k=>{const l=$(`#mL [data-k="${k}"]`).getBoundingClientRect(),r=$(`#mR [data-k="${k}"]`).getBoundingClientRect();
    const x1=l.left-b.left,y1=l.top+l.height/2-b.top,x2=r.right-b.left,y2=r.top+r.height/2-b.top,mx=(x1+x2)/2;
    return `<path d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}" stroke="var(--sea)" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"><animate attributeName="stroke-dashoffset" from="1" to="0" dur=".6s" fill="freeze"/></path><circle cx="${x1}" cy="${y1}" r="6" fill="var(--sea)"/><circle cx="${x2}" cy="${y2}" r="6" fill="var(--sea)"/>`}).join("")}
$("#match").addEventListener("click",e=>{const c=e.target.closest(".mcard");if(!c||c.classList.contains("ok"))return;const side=c.parentElement.id;
  if(side==="mL"){$$("#mL .mcard").forEach(x=>x.classList.remove("sel"));c.classList.add("sel");mSel=c;return}
  if(!mSel){toast("ابدئي بنص من العمود الأول");return}
  if(c.dataset.k===mSel.dataset.k){c.classList.add("ok");mSel.classList.add("ok");mSel.classList.remove("sel");links.push(c.dataset.k);mSel=null;drawWires();sfx.ok();
    if(links.length===3){$("#mFb").className="fb ok";$("#mFb").textContent="اكتملت الخيوط الثلاثة! اشرحي لزميلتك وجه الربط في واحد منها.";sfx.win()}}
  else{c.classList.add("shake");sfx.no();$("#mFb").className="fb no";$("#mFb").textContent="ليست هذه. ابحثي عن المعنى المشترك.";setTimeout(()=>c.classList.remove("shake"),450)}});
$("#mReset").onclick=buildMatch;buildMatch();
ENTER[17]=()=>setTimeout(drawWires,600);
addEventListener("resize",()=>{heartLinks();drawWires()});

/* ========== 18 tajweed ========== */
const BAYT=["صِف","ذا","ثَنا","كَم","جادَ","شَخصٌ","قَد","سَما","دُم","طَيِّبًا","زِد","في","تُقًى","ضَع","ظالِمًا"];
$("#bayt").innerHTML=BAYT.map(w=>`<span>${w[0]}</span>${w.slice(1)}`).join(" ");
const HUNT=[["وَمَن تَابَ",1,"نون ساكنة + ت"],["مِّنْ أَوْلِيَاءَ",0,"إظهار: بعدها همزة"],["مِّن دُونِ",1,"نون ساكنة + د"],["تُنصَرُونَ",1,"نون ساكنة + ص"],["أَنبَاءِ",0,"إقلاب: بعدها باء"],["مِن قَبْلِكُمْ",1,"نون ساكنة + ق"],["قَلِيلًا مِّمَّنْ",0,"إدغام: تنوين بعده ميم"],["أَنجَيْنَا",1,"نون ساكنة + ج"],["مِنْهُمْ",0,"إظهار: بعدها هاء"],["أُمَّةً وَاحِدَةً",0,"إدغام: تنوين بعده واو"],["وَانتَظِرُوا",1,"نون ساكنة + ت"],["يَنْهَوْنَ",0,"إظهار: بعدها هاء"],["مُنتَظِرُونَ",1,"نون ساكنة + ت"],["بِظُلْمٍ وَأَهْلُهَا",0,"إدغام: تنوين بعده واو"]];
let hunted=0;
$("#hunt").innerHTML=shuffle(HUNT).map(h=>`<button class="hw" data-y="${h[1]}" data-r="${h[2]}">${h[0]}</button>`).join("");
$$("#hunt .hw").forEach(c=>c.onclick=()=>{if(c.classList.contains("ok"))return;
  if(c.dataset.y==="1"){c.classList.add("ok");c.insertAdjacentHTML("beforeend",`<small>${c.dataset.r}</small>`);hunted++;$("#huntN").textContent=ar(hunted)+" / ٧";$("#huntBar").style.width=hunted/7*100+"%";sfx.ok();
    if(hunted===7){$("#huntFb").className="fb ok";$("#huntFb").textContent="اصطدتِ مواضع الإخفاء السبعة! اقرئيها الآن مع الغنة بمقدار حركتين.";sfx.win();confetti()}}
  else{c.classList.add("no");sfx.no();$("#huntFb").className="fb no";$("#huntFb").textContent="فخ! "+c.dataset.r;setTimeout(()=>c.classList.remove("no"),1200)}});

/* ========== 19 quiz ========== */
quizInit([
 ["معنى <span class='q'>﴿وَلَا تَرْكَنُوا﴾</span>:",["لا تميلوا إلى الظالمين بمداهنة أو مودة","لا تجلسوا في الطرقات","لا تتأخروا عن الصلاة","لا تخاصموا أحدًا"],0],
 ["المقصود بـ <span class='q'>﴿زُلَفًا مِّنَ اللَّيْلِ﴾</span>:",["آخر الليل فقط","ساعات من الليل","أول النهار","منتصف النهار"],1],
 ["سبب نزول <span class='q'>﴿وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ﴾</span>:",["سؤال عن أوقات الصيام","رجلٌ أصاب ذنبًا فأتى النبي صلى الله عليه وسلم","غزوة من الغزوات","اختلاف في القبلة"],1],
 ["الحسنات تمحو كبائر الذنوب دون حاجة إلى توبة.",["صح","خطأ"],1,"تكفّر الحسنات الصغائر، أما الكبائر فلا بد لها من التوبة الصادقة."],
 ["الغرض من صيغة الأمر في <span class='q'>﴿اعْمَلُوا عَلَىٰ مَكَانَتِكُمْ﴾</span>:",["الإباحة","النصح","التهديد والوعيد","الدعاء"],2],
 ["من أسباب نجاة القرى كما في الآية ١١٧:",["كثرة الأموال","قوة البنيان","إصلاح أهلها","بعدها عن البحر"],2],
 ["من حِكَم ذكر قصص الأنبياء في القرآن:",["التسلية فقط","تثبيت قلب النبي صلى الله عليه وسلم ومواساته","معرفة أسماء البلدان","حفظ التواريخ"],1],
 ["أيّ هذه الكلمات فيها حكم الإخفاء؟",["مِّنْ أَوْلِيَاءَ","أَنبَاءِ","مِن قَبْلِكُمْ","قَلِيلًا مِّمَّنْ"],2]
],{full:"ثباتٌ كامل! ما شاء الله.",good:"أداءٌ رائع، راجعي ما فاتك.",low:"راجعي المحطات ثم أعيدي المحاولة."});

/* ========== 20 exit ticket ========== */
const DEEDS=["المحافظة على الصلاة في أول وقتها","أذكار الصباح والمساء كل يوم","صدقة ولو بالقليل","برّ والدتي بموقف يومي","الاستغفار مئة مرة في اليوم","إماطة الأذى عن الطريق والمدرسة"];
const TK=["#33246E","#5A45B5","#11806F","#C93A60","#B4701A"];
let tk=store.get("tk",{n:"",d:-1,c:0});if(tk.c>=TK.length)tk.c=0;
$("#deeds").innerHTML=DEEDS.map((d,i)=>`<button class="chip" data-i="${i}">${d}</button>`).join("");
$("#swatches").innerHTML=TK.map((c,i)=>`<button style="background:${c}" data-i="${i}" aria-label="لون ${ar(i+1)}"></button>`).join("");
let cardURL="",cardFile=null,cardJob=0,cardTimer=null;
function renderTk(){$("#tkName").value=tk.n;$("#tkOutName").textContent=tk.n||"اسمك هنا";$("#tkOutDeed").textContent=tk.d>=0?"عهدي هذا الأسبوع: "+DEEDS[tk.d]:"اختاري عملك من القائمة";
  $$("#deeds .chip").forEach((c,i)=>c.classList.toggle("sel",i===tk.d));$$("#swatches button").forEach((b,i)=>b.classList.toggle("sel",i===tk.c));$("#ticket").style.setProperty("--tk",TK[tk.c]);store.set("tk",tk);
  clearTimeout(cardTimer);cardTimer=setTimeout(drawCard,200)}
$("#tkName").oninput=e=>{tk.n=e.target.value;renderTk()};
$$("#deeds .chip").forEach(c=>c.onclick=()=>{tk.d=+c.dataset.i;renderTk();sfx.ok();$("#ticket").animate([{transform:"scale(.97) rotate(-1deg)"},{transform:"none"}],{duration:450,easing:"cubic-bezier(.3,1.6,.5,1)"})});
$$("#swatches button").forEach(b=>b.onclick=()=>{tk.c=+b.dataset.i;renderTk()});
async function drawCard(){
  const job=++cardJob;
  try{await Promise.all(["700 76px Display","84px Mushaf","700 46px Body","400 32px Body"].map(f=>document.fonts.load(f)))}catch(e){}
  const logo=await loadImg(LOGO_SRC);if(job!==cardJob)return;
  const W=1600,H=1000,cv=document.createElement("canvas");cv.width=W;cv.height=H;const c=cv.getContext("2d");
  c.fillStyle="#fff";c.fillRect(0,0,W,H);
  c.save();c.beginPath();c.roundRect?c.roundRect(0,0,W,H,64):c.rect(0,0,W,H);c.clip();
  c.fillStyle=TK[tk.c];c.fillRect(0,0,W,H);c.fillStyle="#F6C66B33";c.beginPath();c.arc(120,90,300,0,7);c.fill();
  c.direction="rtl";c.textAlign="right";const R=W-100;
  c.font="700 34px Body";const tag="بطاقة خروج · سورة هود",tw=c.measureText(tag).width+56;
  c.fillStyle="#F6C66B";c.beginPath();c.roundRect?c.roundRect(R-tw,80,tw,64,32):c.rect(R-tw,80,tw,64);c.fill();
  c.fillStyle="#2a1d02";c.fillText(tag,R-28,124);
  c.fillStyle="#fff";c.font="84px Mushaf";c.fillText("﴿إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾",R,300);
  c.font="700 76px Display";c.fillText(tk.n||"اسم الطالبة",R,540);
  c.font="700 46px Body";const deed=tk.d>=0?"عهدي هذا الأسبوع: "+DEEDS[tk.d]:"اختاري عملك من القائمة";
  wrapLines(c,deed,W-200).slice(0,2).forEach((l,i)=>c.fillText(l,R,640+i*68));
  c.globalAlpha=.9;c.font="400 32px Body";c.fillText("معلمة المادة: "+TEACHER,R,880);c.fillText("مديرة المدرسة: "+PRINCIPAL,R,930);c.globalAlpha=1;
  if(logo)c.drawImage(tinted(logo,200,200*logo.naturalHeight/logo.naturalWidth,"#fff"),100,790);
  c.restore();
  cardURL=cv.toDataURL("image/png");
  cv.toBlob(b=>{if(job===cardJob&&b)try{cardFile=new File([b],"بطاقة-الخروج.png",{type:"image/png"})}catch(e){cardFile=null}},"image/png");
}
function tkReady(){if(tk.d<0){toast("اختاري عملًا أولًا");return false}if(!cardURL){toast("لحظة… يتم تجهيز البطاقة");drawCard();return false}return true}
$("#tkPrint").onclick=()=>{if(tkReady())printImage(cardURL,"بطاقة-الخروج.png")};
$("#tkSave").onclick=()=>{if(tkReady()){sfx.win();shareImage(cardURL,cardFile,"بطاقة-الخروج.png","بطاقة الخروج")}};
renderTk();

/* ========== 21 question builder ========== */
const QV=["﴿فَاسْتَقِمْ كَمَا أُمِرْتَ﴾","﴿وَلَا تَرْكَنُوا إِلَى الَّذِينَ ظَلَمُوا﴾","﴿إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾","﴿وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ﴾","﴿وَمَا كَانَ رَبُّكَ لِيُهْلِكَ الْقُرَىٰ بِظُلْمٍ وَأَهْلُهَا مُصْلِحُونَ﴾","﴿مَا نُثَبِّتُ بِهِ فُؤَادَكَ﴾","﴿فَاعْبُدْهُ وَتَوَكَّلْ عَلَيْهِ﴾"];
$$("#qwords .chip").forEach(c=>c.onclick=()=>{$$("#qwords .chip").forEach(x=>x.classList.toggle("sel",x===c));const v=QV[Math.random()*QV.length|0];
  const p=$("#qprompt");p.innerHTML=`كوّني سؤالًا يبدأ بـ <b style="color:var(--rose)">«${c.textContent}»</b> عن قوله تعالى: <span class="q" style="color:var(--sea)">${v}</span>`;p.classList.remove("pop");void p.offsetWidth;p.classList.add("pop");sfx.ok()});

boot();
