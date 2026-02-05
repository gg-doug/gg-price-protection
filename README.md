# GoGuardian Price Protection Calculator - PWA Setup

This is a Progressive Web App (PWA) that can be installed on mobile devices like a native app.

## Files Included

1. **goguardian-price-calculator.html** - Main app file (rename to `index.html` when deploying)
2. **manifest.json** - PWA manifest file
3. **service-worker.js** - Enables offline functionality
4. **icon.svg** - App icon (needs to be converted to PNG)

## Setup Instructions

### Step 1: Create App Icons

You need to create PNG versions of the icon in two sizes:
- **icon-192.png** (192x192 pixels)
- **icon-512.png** (512x512 pixels)

**Option A - Use an online converter:**
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Convert to 192x192 and 512x512 sizes
4. Save as `icon-192.png` and `icon-512.png`

**Option B - Use Figma/Photoshop/Sketch:**
1. Open `icon.svg`
2. Export as PNG at 192x192 and 512x512
3. Save with the correct filenames

### Step 2: Deploy to Web Server

Upload all files to your web server:
```
/your-domain.com/
  ├── index.html (renamed from goguardian-price-calculator.html)
  ├── manifest.json
  ├── service-worker.js
  ├── icon-192.png
  └── icon-512.png
```

**Hosting Options:**
- **GitHub Pages** (Free) - See instructions below
- Company web server
- AWS S3 + CloudFront
- Netlify (Free)
- Vercel (Free)

### Step 3: Share with Team

Once deployed, share the URL with your team:
```
https://your-domain.com/
```

## Installing on Mobile Devices

### iPhone (Safari):
1. Open the URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"
5. App icon appears on home screen

### Android (Chrome):
1. Open the URL in Chrome
2. Tap the three dots menu
3. Tap "Add to Home Screen" or "Install App"
4. Tap "Add"
5. App icon appears on home screen

## GitHub Pages Deployment (Free & Easy)

1. Create a free GitHub account at https://github.com
2. Create a new repository called `price-calculator`
3. Upload all files (rename HTML to `index.html`)
4. Go to Settings → Pages
5. Set Source to "main branch"
6. Your app will be live at: `https://yourusername.github.io/price-calculator/`

## Features

✅ Works offline after first load
✅ Installs like a native app
✅ Fast loading
✅ Mobile-optimized
✅ No app store required
✅ Updates automatically when you update the files

## Version

Current version: **v1.15**

To update the version:
1. Edit the HTML file and change the version number in the header
2. Update `CACHE_NAME` in `service-worker.js` to match
3. Re-upload the files

## Support

For issues or questions, contact your Salesforce admin or IT team.

---

**Note:** This app works entirely client-side - no data is sent to any server. All calculations happen in the browser.
