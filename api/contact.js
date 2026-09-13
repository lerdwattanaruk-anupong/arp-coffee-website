const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyaOj4DIT1G1-DGrqnK6_L250IKBfuIR4mAIS_z_WzD1bz40iHXDJ2IbOmcIP1YKiIR/exec';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        const body = req.body || {};
        const name = clean(body.name, 150);
        const phone = clean(body.phone, 50);
        const location = clean(body.location, 200);
        const packageName = clean(body.packageName, 150);
        const message = clean(body.message, 1000);
        const website = clean(body.website, 250);

        // Honeypot: bots often fill invisible fields. Return success without storing it.
        if (website) {
            return res.status(200).json({ success: true });
        }

        if (!name || !phone || !location) {
            return res.status(400).json({
                success: false,
                message: 'Name, phone and location are required'
            });
        }

        // Conservative input validation to reduce junk submissions.
        if (!/^[0-9+()\-\s]{7,25}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number'
            });
        }

        const form = new URLSearchParams({
            name,
            phone,
            location,
            packageName,
            message,
            website: ''
        });

        const upstream = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: form.toString(),
            redirect: 'follow'
        });

        const text = (await upstream.text()).trim();

        if (!upstream.ok || text !== 'OK') {
            console.error('Google Apps Script error:', {
                status: upstream.status,
                response: text.slice(0, 500)
            });

            return res.status(502).json({
                success: false,
                message: 'Google Sheet service returned an error'
            });
        }

        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to submit contact form'
        });
    }
};

function clean(value, maxLength) {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLength);
}
