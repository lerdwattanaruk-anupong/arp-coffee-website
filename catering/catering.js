(() => {
    const form = document.getElementById('cateringForm');
    if (!form) return;

    const packageSelect = document.getElementById('catering-package');
    const status = document.getElementById('cateringFormStatus');

    document.querySelectorAll('[data-package]').forEach(link => {
        link.addEventListener('click', () => {
            const wanted = link.dataset.package;
            if (!packageSelect || !wanted) return;
            const match = [...packageSelect.options].find(option => option.value === wanted);
            if (match) packageSelect.value = wanted;
        });
    });

    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.autocomplete = 'off';
    honeypot.tabIndex = -1;
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-10000px';
    honeypot.style.width = '1px';
    honeypot.style.height = '1px';
    form.appendChild(honeypot);

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        if (!button) return;

        const original = button.innerHTML;
        const name = document.getElementById('catering-name')?.value.trim() || '';
        const phone = document.getElementById('catering-phone')?.value.trim() || '';
        const location = document.getElementById('catering-location')?.value.trim() || '';
        const eventType = document.getElementById('catering-event-type')?.value || '';
        const eventDate = document.getElementById('catering-date')?.value || '';
        const packageName = packageSelect?.value || 'Catering';
        const details = document.getElementById('catering-message')?.value.trim() || '';

        if (!name || !phone || !location) {
            status.textContent = 'กรุณากรอกชื่อ เบอร์โทร และสถานที่จัดงานให้ครบ';
            return;
        }

        button.disabled = true;
        button.style.opacity = '.75';
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่งข้อมูล...';
        status.textContent = '';

        const message = [
            'CATERING LEAD',
            eventType ? `ประเภทงาน: ${eventType}` : '',
            eventDate ? `วันที่จัดงาน: ${eventDate}` : '',
            details ? `รายละเอียด: ${details}` : ''
        ].filter(Boolean).join(' | ');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    phone,
                    location,
                    packageName: `CATERING | ${packageName}`,
                    message,
                    website: honeypot.value
                })
            });

            const result = await response.json().catch(() => ({}));
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Unable to submit catering lead');
            }

            // IMPORTANT:
            // Do NOT call window.trackGoogleAdsFranchiseLead() here.
            // Catering should have its own Ads conversion later to keep attribution clean.

            form.reset();
            status.textContent = 'ส่งข้อมูลสำเร็จ ทีมงานได้รับรายละเอียดเบื้องต้นแล้ว';
            button.innerHTML = '<i class="fas fa-check"></i> ส่งข้อมูลสำเร็จ';
            button.style.backgroundColor = '#B44C2E';
            button.style.borderColor = '#B44C2E';

            setTimeout(() => {
                button.innerHTML = original;
                button.disabled = false;
                button.style.opacity = '1';
                button.style.backgroundColor = '';
                button.style.borderColor = '';
            }, 3000);
        } catch (error) {
            console.error('Catering lead submission failed:', error);
            status.textContent = 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
            button.innerHTML = original;
            button.disabled = false;
            button.style.opacity = '1';
        }
    });
})();
