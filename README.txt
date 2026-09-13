ARP COFFEE - Google Sheet Lead Connector

พร้อมวางใน root ของ repo arp-coffee-website

ไฟล์ในชุดนี้:
1) script.js       -> วางทับ script.js เดิม
2) api/contact.js  -> สร้างโฟลเดอร์ api แล้ววางไฟล์นี้

ไม่ต้องแก้ index.html
ไม่ต้องแก้ vercel.json
Security Header A+ เดิมยังคงใช้ได้ เพราะหน้าเว็บเรียก /api/contact แบบ same-origin

หลังวางไฟล์:
git add .
git commit -m "Connect franchise form to Google Sheet"
git push

หลัง Vercel ขึ้น Ready ให้ทดสอบกรอกฟอร์มจริง 1 ครั้ง
แล้วตรวจ Google Sheet > Leads และอีเมล lertvivat@gmail.com
