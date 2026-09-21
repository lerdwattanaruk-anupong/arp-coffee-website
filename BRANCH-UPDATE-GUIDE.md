# ARP COFFEE — Branch Update Guide

โครงสาขาถูกทำให้แก้ง่ายจากจุดเดียวใน `script.js` ผ่านตัวแปร `ARP_BRANCHES`.

## เพิ่ม/แก้รูปสาขา
1. วางรูปใน `assets/branches/`
2. แนะนำชื่อไฟล์เป็น slug ภาษาอังกฤษ เช่น `sap-bun-chai.webp`
3. ใน `script.js` แก้ค่า:

```js
image: '/assets/branches/sap-bun-chai.webp',
```

ถ้า `image: ''` หน้าเว็บจะแสดง Placeholder ของ ARP COFFEE แทน และจะไม่มีรูปเสีย

## เพิ่ม Google Maps Shortlink
ใส่ URL ที่ได้จาก Google Maps ใน:

```js
mapUrl: 'https://maps.app.goo.gl/XXXXXXXX',
```

เมื่อมีค่า `mapUrl` หน้าเว็บจะแสดงปุ่ม `นำทาง` อัตโนมัติ

## เพิ่มหน้ารายละเอียดสาขา
1. Copy โฟลเดอร์ `branches/_template/`
2. เปลี่ยนชื่อโฟลเดอร์เป็น slug เช่น `branches/sap-bun-chai-samut-prakan/`
3. แก้ข้อความ `[[...]]` ใน `index.html` ให้เป็นข้อมูลจริง
4. เปลี่ยน `<meta name="robots" content="noindex,nofollow">` เป็น `index,follow` เมื่อข้อมูลครบ
5. ใส่ URL หน้าสาขาใน `script.js`:

```js
detailsUrl: '/branches/sap-bun-chai-samut-prakan/',
```

6. เพิ่ม URL หน้าสาขาใน `sitemap.xml`

> LocalBusiness Schema ควรใส่หลังมีข้อมูลจริงครบ เช่น ที่อยู่, เวลาเปิด, เบอร์โทร, Google Maps URL และสถานะสาขา เพื่อไม่ส่งข้อมูล placeholder ให้ Google

## เพิ่มสาขาใหม่
Copy object นี้ไปต่อท้ายใน `ARP_BRANCHES`:

```js
{
    slug: 'new-branch',
    name: 'ชื่อสาขา',
    province: 'จังหวัด',
    description: 'คำอธิบายสาขาแบบสั้น',
    image: '/assets/branches/new-branch.webp',
    mapUrl: 'https://maps.app.goo.gl/XXXXXXXX',
    detailsUrl: '/branches/new-branch/',
    contactUrl: 'https://www.facebook.com/arpcoffee',
    contactLabel: 'ตรวจสอบข้อมูลล่าสุด'
},
```

หน้า `/branches/` จะสร้าง Card ให้โดยอัตโนมัติ
