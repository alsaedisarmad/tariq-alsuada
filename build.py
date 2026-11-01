"""يبني موقع الدروس: الصفحة الرئيسة index.html وصفحة لكل درس في مجلده (hud/ raad/ ibrahim/).

كل درس ملف واحد مستقل يعمل بدون إنترنت: تُدمج فيه الخطوط والصور والصوت.
الهيكل المشترك (الرأس، شريط التنقل، لوحة الأستاذة، المؤقت، التقويم والشهادة) في shared/،
ومحتوى كل درس في lessons/<id>/: lesson.html (المحطات وخطة الحصة) و lesson.js و lesson.css.

الاستخدام:
    python build.py
"""
import base64
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

FONTS = {
    "__F_PLEX_R__": ("fonts/IBMPlexSansArabic-Regular.ttf", "font/ttf"),
    "__F_PLEX_S__": ("fonts/IBMPlexSansArabic-SemiBold.ttf", "font/ttf"),
    "__F_PLEX_B__": ("fonts/IBMPlexSansArabic-Bold.ttf", "font/ttf"),
    "__F_MESSIRI__": ("fonts/ElMessiri[wght].ttf", "font/ttf"),
    "__F_AMIRI__": ("fonts/AmiriQuran-Regular.ttf", "font/ttf"),
    "__LOGO__": ("assets/moe_mask.png", "image/png"),
    "__SIGN__": ("assets/signature.png", "image/png"),
}

TEAMS = "الصابرات,الذاكرات,الواصلات,المنفقات,الموفيات,المحسنات"

LESSONS = [
    dict(
        id="hud", key="hud10", name="طريق الاستقامة",
        title="طريق الاستقامة | سورة هود ١١٢–١٢٣",
        sub="تفسير سورة هود ١١٢–١٢٣ | الوحدة الرابعة | الدرس العاشر",
        desc="طريق الاستقامة: درس تفاعلي في تفسير سورة هود من الآية ١١٢ إلى ١٢٣. إعداد الأستاذة فاطمة الطلحي.",
        chaps="تهيئة:sun,نتلو ونفهم:sea,نتدبر:plum2,نطبّق:rose,نختم:ash",
        teams="الثابتات,المحسنات,المصلحات,الذاكرات,الصابرات,المتوكلات",
        media={"__AUDIO1__": ("recite.m4a", "audio/mp4"), "__AUDIO2__": ("recite114.m4a", "audio/mp4"),
               "__VIDEO__": ("path.mp4", "video/mp4"), "__POSTER__": ("poster.jpg", "image/jpeg")},
        unit="الوحدة الرابعة", lesson="الدرس العاشر", sura="سورة هود", ayat="الآيات ١١٢–١٢٣",
        verse="﴿فَاسْتَقِمْ كَمَا أُمِرْتَ﴾", color="sea", desktop="طريق_الاستقامة_سورة_هود_112-123.html",
    ),
    dict(
        id="raad", key="raad14", name="طريق السعداء وطريق الأشقياء",
        title="طريق السعداء وطريق الأشقياء | سورة الرعد ١٩–٢٩",
        sub="تفسير سورة الرعد ١٩–٢٩ | الوحدة السادسة | الدرس الرابع عشر",
        desc="طريق السعداء وطريق الأشقياء: درس تفاعلي في تفسير سورة الرعد من الآية ١٩ إلى ٢٩. إعداد الأستاذة فاطمة الطلحي.",
        chaps="البداية:sun,الآيات:sea,الطريقان:plum2,الأثر:rose,الختام:ash",
        teams=TEAMS,
        media={"__AUDIO__": ("recite.m4a", "audio/mp4")},
        unit="الوحدة السادسة", lesson="الدرس الرابع عشر", sura="سورة الرعد", ayat="الآيات ١٩–٢٩",
        verse="﴿طُوبَىٰ لَهُمْ وَحُسْنُ مَآبٍ﴾", color="sun", desktop="طريق_السعداء_والأشقياء_سورة_الرعد_19-29.html",
    ),
    dict(
        id="ibrahim", key="ibr15", name="الكلمة الطيبة والكلمة الخبيثة",
        title="الكلمة الطيبة والكلمة الخبيثة | سورة إبراهيم ٢٤–٣١",
        sub="تفسير سورة إبراهيم ٢٤–٣١ | الوحدة السابعة | الدرس الخامس عشر",
        desc="الكلمة الطيبة والكلمة الخبيثة: درس تفاعلي في تفسير سورة إبراهيم من الآية ٢٤ إلى ٣١. إعداد الأستاذة فاطمة الطلحي.",
        chaps="البداية:sun,الآيات:sea,المثلان:plum2,الأثر:rose,الختام:ash",
        teams="الطيبات,الثابتات,الشاكرات,المنفقات,الذاكرات,المخلصات",
        media={"__AUDIO__": ("recite.m4a", "audio/mp4")},
        unit="الوحدة السابعة", lesson="الدرس الخامس عشر", sura="سورة إبراهيم", ayat="الآيات ٢٤–٣١",
        verse="﴿كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ﴾", color="rose",
        desktop="الكلمة_الطيبة_والكلمة_الخبيثة_سورة_إبراهيم_24-31.html",
    ),
]


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def data_uri(path, mime):
    with open(os.path.join(ROOT, path), "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())


def parts(text):
    """lesson.html: <!--@sections--> … <!--@plan--> … <!--@extra--> …"""
    out, key = {}, None
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("<!--@") and s.endswith("-->"):
            key = s[5:-3]
            out[key] = []
        elif key:
            out[key].append(line)
    return {k: "\n".join(v).strip("\n") for k, v in out.items()}


def inline(html, assets):
    for key, (path, mime) in assets.items():
        if key in html:
            html = html.replace(key, data_uri(path, mime))
    return html


def write(rel, html):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("built", rel, len(html) // 1024, "KB")


def add_cert(sections):
    """يضيف محطة الشهادة المشتركة بعد محطة التقويم مباشرة."""
    q = sections.index('id="quiz"')
    start = sections.rindex("<section", 0, q)
    chap = re.search(r'data-chap="([^"]+)"', sections[start:q]).group(1)
    end = sections.index("</section>", q) + len("</section>")
    return sections[:end] + "\n" + read("shared/cert.html").replace("{{CHAP}}", chap) + sections[end:]


def build_lesson(L):
    d = "lessons/" + L["id"] + "/"
    p = parts(read(d + "lesson.html"))
    p["sections"] = add_cert(p["sections"])
    css = read("shared/base.css")
    if os.path.exists(os.path.join(ROOT, d + "lesson.css")):
        css += "\n" + read(d + "lesson.css")
    js = read("shared/core.js") + "\n" + read(d + "lesson.js")
    html = read("shared/page.html")
    for k, v in {"{{TITLE}}": L["title"], "{{DESC}}": L["desc"], "{{KEY}}": L["key"], "{{CHAPS}}": L["chaps"],
                 "{{TEAMS}}": L["teams"], "{{NAME}}": L["name"], "{{HEAD}}": L["name"], "{{SUB}}": L["sub"],
                 "{{SECTIONS}}": p["sections"], "{{PLAN}}": p.get("plan", ""), "{{EXTRA}}": p.get("extra", "")}.items():
        html = html.replace(k, v)
    html = html.replace("/*__CSS__*/", css).replace("/*__JS__*/", js)
    for key, (f, mime) in L["media"].items():
        if key not in html:
            sys.exit(L["id"] + ": placeholder missing " + key)
        html = html.replace(key, data_uri(d + f, mime))
    html = inline(html, FONTS)
    if "__" in html.replace("__proto__", "") and any(t in html for t in ("__AUDIO", "__VIDEO", "__F_", "__LOGO", "__SIGN")):
        sys.exit(L["id"] + ": unreplaced placeholder")
    write(L["id"] + "/index.html", html)
    return html


def build_hub():
    cards = []
    for i, L in enumerate(LESSONS):
        cards.append(
            '<a class="lcard" href="%(id)s/" style="--c:var(--%(color)s)"><span class="num">%(n)s</span>'
            '<div class="row"><span class="tag">%(unit)s</span><span class="tag sun">%(lesson)s</span></div>'
            '<h2>%(name)s</h2><p class="q">%(verse)s</p>'
            '<div class="meta"><b>%(sura)s</b><span>%(ayat)s</span></div>'
            '<span class="go">افتحي الدرس <svg><use href="#i-next"/></svg></span></a>'
            % dict(L, n="١٢٣٤٥٦٧٨٩"[i]))
    html = read("shared/hub.html").replace("{{CARDS}}", "\n".join(cards))
    css = read("shared/base.css") + "\n" + read("shared/hub.css")
    html = inline(html.replace("/*__CSS__*/", css), FONTS)
    write("index.html", html)


def main():
    built = {L["id"]: build_lesson(L) for L in LESSONS}
    build_hub()
    if "--desktop" in sys.argv:
        desk = os.path.dirname(ROOT)
        for L in LESSONS:
            with open(os.path.join(desk, L["desktop"]), "w", encoding="utf-8") as f:
                f.write(built[L["id"]])
            print("copied", L["desktop"])


if __name__ == "__main__":
    main()
