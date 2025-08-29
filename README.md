# Cinema Mode for YouTube Chrome Extension

A Chrome extension that enables one-click activation of cinema mode (theater mode) on YouTube videos.

## 📁 Extension Files Location

Your Chrome extension files are now organized in the `chrome-extension/` folder:

```
chrome-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for core functionality
├── content.js             # Content script for YouTube page detection
├── popup.html             # Extension popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality
└── icons/                 # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## 🚀 How to Install the Extension

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your Chrome browser
   - Or click the three dots menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `chrome-extension` folder from this project
   - The extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Cinema Mode for YouTube" and click the pin icon to keep it visible

## 🎬 How to Use

1. **Navigate to YouTube**
   - Go to any YouTube video page (https://www.youtube.com/watch?v=...)

2. **Activate Cinema Mode**
   - Click the YouTube Cinema Mode extension icon in your toolbar
   - Click "Activate Cinema Mode" in the popup
   - The page will refresh automatically with cinema mode enabled

3. **Go to YouTube**
   - After activation, click the "Go to YouTube" link to navigate to YouTube
   - All videos will now display in cinema/theater mode by default

## ✨ What the Extension Does

The extension sets a cookie (`wide=1`) on YouTube's domain that tells YouTube to display videos in cinema/theater mode. This provides:

- **Wider video player** that takes up more screen space
- **Better viewing experience** with less distractions
- **Persistent setting** that works across all YouTube videos
- **Automatic refresh** to apply the setting immediately

## 🔧 Technical Details

- **Manifest V3** compliant
- **Secure cookie handling** with proper domain and security flags
- **SPA compatibility** with YouTube's single-page application behavior
- **Error handling** for invalid pages or execution failures
- **Chrome notifications** for user feedback

## 🛠️ Troubleshooting

If cinema mode doesn't activate:
1. Make sure you're on a YouTube video page (not the homepage)
2. Check that the extension has permission to access YouTube
3. Try refreshing the page manually after activation
4. Check the browser console for any error messages

## 📝 Notes

- The extension only works on YouTube video pages (`https://www.youtube.com/watch*`)
- Cinema mode persists across browser sessions
- The setting applies to all YouTube videos automatically once activated

## 🔒 Privacy Policy

This extension does not collect any user data. For full details, see our [Privacy Policy](https://github.com/yourusername/cinema-mode-youtube/blob/main/PRIVACY_POLICY.md).

## 📄 License

MIT License - see LICENSE file for details.
