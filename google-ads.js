// ARP COFFEE - Google Ads global tag
// Base tag ID: AW-18465965588
// Google Ads conversion target for successful franchise lead submissions.

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', 'AW-18465965588');

const ARP_FRANCHISE_LEAD_SEND_TO = 'AW-18465965588/hoMlCM3nlYAdEJSMoeVE';

window.trackGoogleAdsFranchiseLead = function() {
    if (!ARP_FRANCHISE_LEAD_SEND_TO) {
        console.info('Google Ads base tag is active; franchise conversion label is not configured yet.');
        return false;
    }

    window.gtag('event', 'conversion', {
        send_to: ARP_FRANCHISE_LEAD_SEND_TO,
        value: 1.0,
        currency: 'THB'
    });

    return true;
};
