// Background service worker for YouTube Cinema Mode extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Cinema Mode for YouTube extension installed');
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'activateCinemaMode') {
    activateCinemaModeOnCurrentTab()
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});

// Activate cinema mode on the current active tab
async function activateCinemaModeOnCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      throw new Error('No active tab found');
    }
    
    // Check if we're on a YouTube watch page
    if (!tab.url || !tab.url.match(/^https:\/\/www\.youtube\.com\/watch/)) {
      throw new Error('Not a YouTube video page. Please navigate to a YouTube video first.');
    }
    
    // Set the cinema mode cookie directly
    await chrome.cookies.set({
      url: 'https://www.youtube.com',
      name: 'wide',
      value: '1',
      domain: '.youtube.com',
      path: '/',
      secure: true,
      sameSite: 'lax',
      expirationDate: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year
    });
    
    return {
      success: true,
      message: 'Cinema mode activated! Refresh any YouTube video page to see the effect.',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error activating cinema mode:', error);
    throw error;
  }
}