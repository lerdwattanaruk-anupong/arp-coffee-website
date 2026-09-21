// ARP COFFEE - Google Ads global tag
// Base tag ID: AW-18465965588
// Keep the conversion target blank until Google Ads provides the conversion label.

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', 'AW-18465965588');

// Example after Google Ads provides the label:
// const ARP_FRANCHISE_LEAD_SEND_TO = 'AW-18465965588/AbCdEfGhIjKlMnOp';
const ARP_FRANCHISE_LEAD_SEND_TO = '';

window.trackGoogleAdsFranchiseLead = function() {
    if (!ARP_FRANCHISE_LEAD_SEND_TO) {
        console.info('Google Ads base tag is active; franchise conversion label is not configured yet.');
        return false;
    }

    window.gtag('event', 'conversion', {
        send_to: ARP_FRANCHISE_LEAD_SEND_TO
    });

    return true;
};
