import os
from PIL import Image

dir_path = r"C:\Users\Dashdoi\.gemini\antigravity\scratch\gram-sachivalaya-dasdoi\assets\images"

imgs = [
    'media_1794355534897_81ae4c99.jpg',
    'media_1794355534897_17ea5ada.jpg',
    'media_1794355534900_17c84832.jpg',
    'media_1794355534897_84b7cc62.jpg',
    'media_1794355534897_10161b5f.jpg',
    'media_1794355534897_c98d3584.jpg',
    'media_1794355534897_d62a3a4b.jpg'
]

html = "<html><body style='background:#111;color:#eee;font-family:sans-serif;padding:20px;display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;'>"
for i, name in enumerate(imgs, 1):
    html += f"<div style='background:#222;padding:12px;border-radius:8px;'><h3 style='margin:0 0 8px 0'>Image {i}: {name}</h3><img src='{name}' style='width:100%;height:auto;border-radius:4px;' /></div>"
html += "</body></html>"

with open(os.path.join(dir_path, "preview.html"), "w", encoding="utf-8") as f:
    f.write(html)
print("Preview HTML written successfully.")

