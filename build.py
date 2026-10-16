"""يبني index.html من src/ بدمج التنسيق والبرمجة والخطوط والصورة والصوت داخله.

الاستخدام:
    python build.py            # يكتب index.html
    python build.py out.html   # يكتب إلى مسار آخر
"""
import base64
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

ASSETS = {
    "__F_PLEX_R__": ("fonts/IBMPlexSansArabic-Regular.ttf", "font/ttf"),
    "__F_PLEX_S__": ("fonts/IBMPlexSansArabic-SemiBold.ttf", "font/ttf"),
    "__F_PLEX_B__": ("fonts/IBMPlexSansArabic-Bold.ttf", "font/ttf"),
    "__F_MESSIRI__": ("fonts/ElMessiri[wght].ttf", "font/ttf"),
    "__F_AMIRI__": ("fonts/AmiriQuran-Regular.ttf", "font/ttf"),
    "__LOGO__": ("assets/moe_mask.png", "image/png"),
    "__AUDIO__": ("assets/recite.m4a", "audio/mp4"),
}


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def data_uri(path, mime):
    with open(os.path.join(ROOT, path), "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "index.html")
    html = read("src/lesson.html")
    html = html.replace("/*__CSS__*/", read("src/style.css"))
    html = html.replace("/*__JS__*/", read("src/app.js"))
    for key, (path, mime) in ASSETS.items():
        if key not in html:
            sys.exit("placeholder missing: " + key)
        html = html.replace(key, data_uri(path, mime))
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("built", out, len(html) // 1024, "KB")


if __name__ == "__main__":
    main()
