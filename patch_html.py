#!/usr/bin/env python3
"""
Patches intro.html and game.html to use local library files
instead of CDN URLs, for full offline operation.
"""
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
WWW = os.path.join(BASE, 'app', 'src', 'main', 'assets', 'www')
LIBS = os.path.join(WWW, 'libs')

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    original = html

    # Replace CDN scripts with local versions (if downloaded)
    replacements = [
        # Three.js
        (
            'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
            'libs/three.min.js'
        ),
        # Supabase
        (
            'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
            'libs/supabase.min.js'
        ),
        # MediaPipe
        (
            'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js',
            'libs/hands.js'
        ),
        (
            'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
            'libs/camera_utils.js'
        ),
        (
            'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
            'libs/control_utils.js'
        ),
    ]

    for (cdn_url, local_path) in replacements:
        local_file = os.path.join(LIBS, os.path.basename(local_path))
        if os.path.exists(local_file):
            html = html.replace(cdn_url, local_path)
            print(f"  Patched: {os.path.basename(local_path)}")
        else:
            print(f"  Skipped (not downloaded): {os.path.basename(local_path)}")

    # Fix Google Fonts - use local CSS if downloaded, else keep CDN
    fonts_file = os.path.join(LIBS, 'fonts_game.css')
    if os.path.exists(fonts_file):
        html = re.sub(
            r'<link[^>]+fonts\.googleapis\.com/css2[^>]+>',
            '<link rel="stylesheet" href="libs/fonts_game.css">',
            html
        )
        # Remove preconnect links for fonts
        html = re.sub(r'<link[^>]+preconnect[^>]+fonts[^>]+>', '', html)
        print("  Patched: Google Fonts")

    # Remove broken local audio path (Windows path)
    html = re.sub(
        r'<source[^>]+file:///C:[^>]+mp3[^>]*/?>',
        '',
        html
    )
    
    # Fix intro.html navigation: when "Enter" or "Play" is clicked,
    # navigate to game.html using relative path
    # The intro likely uses window.location or similar
    html = html.replace(
        "window.location.href = 'game.html'",
        "window.location.href = 'file:///android_asset/www/game.html'"
    )
    html = html.replace(
        'window.location.href = "game.html"',
        'window.location.href = "file:///android_asset/www/game.html"'
    )
    html = html.replace(
        "location.href = 'game.html'",
        "location.href = 'file:///android_asset/www/game.html'"
    )
    html = html.replace(
        'location.href = "game.html"',
        'location.href = "file:///android_asset/www/game.html"'
    )

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Saved: {os.path.basename(filepath)}")
    else:
        print(f"  No changes: {os.path.basename(filepath)}")


print("Patching HTML files...")
patch_file(os.path.join(WWW, 'intro.html'))
patch_file(os.path.join(WWW, 'game.html'))
print("Done!")
