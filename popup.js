// Popup script for YouTube Cinema Mode extension

document.addEventListener('DOMContentLoaded', async () => {
  const activateBtn = document.getElementById('activateBtn');
  const statusDiv = document.getElementById('status');
  const youtubeLinkDiv = document.getElementById('youtubeLink');
  
  // Show status message
  function showStatus(message, type = 'success') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      statusDiv.className = 'status hidden';
    }, 5000);
  }
  
  // Show YouTube link
  function showYouTubeLink() {
    youtubeLinkDiv.className = 'youtube-link';
  }
  
  // Hide YouTube link
  function hideYouTubeLink() {
    youtubeLinkDiv.className = 'youtube-link hidden';
  }
  
  // Set button loading state
  function setLoading(loading) {
    if (loading) {
      activateBtn.classList.add('loading');
      activateBtn.disabled = true;
      activateBtn.querySelector('.btn-text').textContent = 'Activating...';
    } else {
      activateBtn.classList.remove('loading');
      activateBtn.disabled = false;
      activateBtn.querySelector('.btn-text').textContent = 'Activate Cinema Mode';
    }
  }
  
  // Check if current tab is a YouTube video page
  async function checkCurrentPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const isYouTubeVideo = tab.url && /^https:\/\/www\.youtube\.com\/watch/.test(tab.url);
      
      if (!isYouTubeVideo) {
        showStatus('Please navigate to a YouTube video page first.', 'error');
        activateBtn.disabled = true;
        hideYouTubeLink();
        return false;
      }
      
      activateBtn.disabled = false;
      return true;
    } catch (error) {
      console.error('Error checking current page:', error);
      showStatus('Error checking current page.', 'error');
      hideYouTubeLink();
      return false;
    }
  }
  
  // Activate cinema mode
  async function activateCinemaMode() {
    if (!await checkCurrentPage()) {
      return;
    }
    
    setLoading(true);
    hideYouTubeLink();
    
    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { action: 'activateCinemaMode' },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(response);
            }
          }
        );
      });
      
      if (response.success) {
        showStatus('Cinema mode activated! Refresh any YouTube video page to see the effect.', 'success');
        showYouTubeLink();
        
        // Close popup after successful activation
        setTimeout(() => {
          window.close();
        }, 4000);
        
        console.log('Cinema mode activation result:', response.result);
      } else {
        throw new Error(response.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error activating cinema mode:', error);
      showStatus(error.message, 'error');
      hideYouTubeLink();
    } finally {
      setLoading(false);
    }
  }
  
  // Event listeners
  activateBtn.addEventListener('click', activateCinemaMode);
  
  // Check current page on popup open
  await checkCurrentPage();
  
  // Listen for tab updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
      setTimeout(checkCurrentPage, 500);
    }
  });
  
  // Listen for tab activation
  chrome.tabs.onActivated.addListener(() => {
    setTimeout(checkCurrentPage, 100);
  });
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.target.disabled) {
    const activateBtn = document.getElementById('activateBtn');
    if (!activateBtn.disabled && !activateBtn.classList.contains('loading')) {
      activateBtn.click();
    }
  }
});