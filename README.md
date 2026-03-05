# 🏛 Mystery Temple — GitHub Actions APK Builder

## මේ ZIP එකෙන් APK හදන්නේ මෙහෙමයි

---

## STEP 1 — GitHub Repo Create කරන්න

1. **[github.com](https://github.com)** open කරන්න
2. Login කරන්න
3. Top-right **"+"** button → **"New repository"** click කරන්න
4. Repository name: `mystery-temple`
5. **Public** select කරන්න
6. **"Create repository"** click කරන්න

---

## STEP 2 — Files Upload කරන්න

Repo create කරාට පස්සේ page eke:

1. **"uploading an existing file"** link click කරන්න
2. මේ ZIP extract කරලා ඇතුළේ ඇති **සියල්ල files/folders** drag & drop කරන්න
3. **"Commit changes"** button click කරන්න

> ⚠️ Important: `.github/workflows/build.yml` file ද upload වෙන්නම ඕන!

---

## STEP 3 — Build Start වෙනවා (Automatic!)

Files upload කළාගෙම GitHub automatically build start කරනවා.

1. Repo page eke **"Actions"** tab click කරන්න
2. **"Build Mystery Temple APK"** workflow eka දකිනවා
3. Yellow circle = running, Green tick = done ✅

**Build time: ~5-8 minutes**

---

## STEP 4 — APK Download කරන්න

Build complete වුණාට පස්සේ:

1. **Actions** tab → Completed workflow click කරන්න
2. Page bottom eke **"Artifacts"** section eka
3. **"MysteryTemple-APK"** click කරලා download කරන්න
4. ZIP extract කරන්න → `MysteryTemple.apk` ගන්න

---

## STEP 5 — Phone eka Install කරන්න

1. `MysteryTemple.apk` phone ekata copy කරන්න
   (USB / WhatsApp / Google Drive / Bluetooth)
2. Phone: **Settings → Security → Unknown Sources → ON**
   (හෝ "Install Unknown Apps" enable කරන්න)
3. File Manager eka open කරලා APK tap කරන්න
4. **Install** → **Open**
5. 🎮 **Mystery Temple** play කරන්න!

---

## ❓ Problems?

**Actions tab eka red X දකිනවා:**
→ Click on it → See the error message → Share with me

**"Artifact" section eka නෑ:**
→ Build eka complete වෙලා නෑ, wait කරන්න

**Phone eka install වෙන්නේ නෑ:**
→ Unknown Sources enable කළාද check කරන්න
