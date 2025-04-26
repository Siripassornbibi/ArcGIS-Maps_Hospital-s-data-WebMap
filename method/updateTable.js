export function updateTable(features, info) {
    const tbody = document.querySelectorAll('table tbody');

    // เคลียร์ข้อมูลเก่าออก
    tbody.forEach(t => t.innerHTML = '');

    features.forEach((feature, index) => {
        let name = feature.attributes.name || feature.attributes.dsName || '-';
        let district = feature.attributes.dname || feature.attributes.dsDistrict || '-';
        let totalBed = feature.attributes.num_bed || '-';
        let tel = feature.attributes.tel || feature.attributes.dsPhone || '-';

        let type = '';
        if (feature.layer.title.includes('ร้านขายยา') || feature.attributes.dsName) {
            type = 0; // pharmacy
        } else if (feature.layer.title.includes('รัฐ') || feature.attributes.belong) {
            type = 1; // government
        } else {
            type = 2; // private
        }

        const newRow = `
          <tr>
            <td>${index + 1}</td>
            <td>${name}</td>
            <td>${district}</td>
            <td>${totalBed}</td>
            <td>${tel}</td>
          </tr>
        `;

        tbody[type].innerHTML += newRow;
    });

    // แสดงผลวันที่และเส้นผ่านศูนย์กลาง (อยากให้โชว์ตรงไหนก็ใส่เพิ่มได้)
    console.log(`✅ วาดเมื่อ: ${info.date}, เส้นผ่านศูนย์กลาง: ${info.diameter.toFixed(2)} เมตร`);
}
