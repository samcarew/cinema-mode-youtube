// Content script for YouTube Cinema Mode extension
(function() {
  'use strict';
  
  let isYouTubeVideoPage = false;
  
  // Check if current page is a YouTube video page
  function checkYouTubeVideoPage() {
    const currentUrl = window.location.href;
    const isVideoPage = /^https:\/\/www\.youtube\.com\/watch/.test(currentUrl);
    
    if (isVideoPage !== isYouTubeVideoPage) {
      isYouTubeVideoPage = isVideoPage;
      console.log(`YouTube Cinema Mode: ${isVideoPage ? 'Entered' : 'Left'} video page`);
    }
    
    return isVideoPage;
  }
  
  // Handle YouTube's SPA navigation
  function handleYouTubeSPANavigation() {
    // YouTube uses the History API for navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      setTimeout(checkYouTubeVideoPage, 100);
    };
    
    history.replaceState = function() {
      originalReplaceState.apply(this, arguments);
      setTimeout(checkYouTubeVideoPage, 100);
    };
    
    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', () => {
      setTimeout(checkYouTubeVideoPage, 100);
    });
    
    // Also listen for YouTube's custom navigation events
    document.addEventListener('yt-navigate-start', checkYouTubeVideoPage);
    document.addEventListener('yt-navigate-finish', checkYouTubeVideoPage);
  }
  
  // Initialize the content script
  function initialize() {
    console.log('Cinema Mode for YouTube: Content script loaded');
    checkYouTubeVideoPage();
    handleYouTubeSPANavigation();
  }
  
  // Wait for page to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // Listen for messages from popup/background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'checkVideoPage') {
      sendResponse({ isVideoPage: checkYouTubeVideoPage() });
    }
  });
  
  // Periodically check if we're still on a video page
  setInterval(checkYouTubeVideoPage, 2000);
})();