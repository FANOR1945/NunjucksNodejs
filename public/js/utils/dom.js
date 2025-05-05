export const domReady = new Promise(resolve => {
    if (document.readyState !== 'loading') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve);
    }
  });
  
  export function getContainer(selector) {
    if (typeof selector === 'string') {
      return document.querySelector(selector) || 
             document.getElementById(selector.replace('#', '')) || 
             document.querySelector(`.${selector}`);
    } else if (selector instanceof HTMLElement) {
      return selector;
    }
    return null;
  }