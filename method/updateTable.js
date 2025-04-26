export function updateTable(features, info) {
    const tbody = document.querySelectorAll('table tbody');

    // เคลียร์ข้อมูลเก่าออก
    tbody.forEach(t => t.innerHTML = '');

    // แยกข้อมูลตามประเภท
    const dataByType = [[], [], []]; // 0: pharmacy, 1: government, 2: private

    features.forEach((feature) => {
        let name = feature.attributes.name || feature.attributes.dsName || '-';
        let district = feature.attributes.dname || feature.attributes.dsDistrict || '-';
        let totalBed = feature.attributes.num_bed || '-';
        let tel = feature.attributes.tel || feature.attributes.dsPhone || '-';

        let type = '';
        if (feature.layer.title?.includes('ร้านขายยา') || feature.attributes.dsName) {
            type = 0; // pharmacy
        } else if (feature.layer.title?.includes('รัฐ') || feature.attributes.belong) {
            type = 1; // government
        } else {
            type = 2; // private
        }

        dataByType[type].push({ name, district, totalBed, tel });
    });

    // วนใส่ตาราง
    dataByType.forEach((data, typeIndex) => {
        if (data.length === 0) {
            // ถ้าไม่มีข้อมูลเลย
            tbody[typeIndex].innerHTML = `
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            `;
        } else {
            // มีข้อมูล
            data.forEach((item, idx) => {
                const newRow = `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.district}</td>
                    <td>${item.totalBed}</td>
                    <td>${item.tel}</td>
                  </tr>
                `;
                tbody[typeIndex].innerHTML += newRow;
            });
        }
    });

    // อัปเดตวันที่และเส้นผ่านศูนย์กลาง
    console.log(`✅ วาดเมื่อ: ${info.date}, เส้นผ่านศูนย์กลาง: ${info.diameter.toFixed(2)} เมตร`);
}
