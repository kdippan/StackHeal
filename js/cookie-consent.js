/**
 * /js/cookie-consent.js
 * Granular consent gatekeeper for StackHeal.
 * Blocks all telemetry until explicit user opt-in is registered.
 */

document.addEventListener('DOMContentLoaded', () => {
  const consentModal = document.getElementById('cookie-consent-modal');
  const btnAcceptSelected = document.getElementById('btn-accept-selected');
  const btnAcceptAll = document.getElementById('btn-accept-all');
  const checkboxAnalytics = document.getElementById('checkbox-analytics');

  // Verify if consent was resolved in a previous session
  if (localStorage.getItem('stackheal_consent_resolved') === 'true') {
    if (consentModal) consentModal.style.display = 'none';
    return;
  }

  // Ensure GTM Consent Mode default is denied early in execution
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });

  const resolveConsent = (analyticsGranted) => {
    if (analyticsGranted) {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      localStorage.setItem('stackheal_analytics', 'granted');
    }
    
    localStorage.setItem('stackheal_consent_resolved', 'true');
    if (consentModal) consentModal.style.display = 'none';
    console.log('StackHeal Diagnostic: Consent state resolved and locked.');
  };

  if (btnAcceptSelected && checkboxAnalytics) {
    btnAcceptSelected.addEventListener('click', () => {
      resolveConsent(checkboxAnalytics.checked);
    });
  }

  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', () => {
      if (checkboxAnalytics) checkboxAnalytics.checked = true;
      resolveConsent(true);
    });
  }
});