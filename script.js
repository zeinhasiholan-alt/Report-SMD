let _0x_curPlat = 'fb';

function toggleSidebar() {
    const s = document.getElementById('sidebar');
    const m = document.getElementById('main');
    s.classList.toggle('closed');
    m.classList.toggle('full');
}

function changePlatform(p) {
    _0x_curPlat = p;
    document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
    document.getElementById('item-' + p).classList.add('active');

    const t = document.getElementById('form-title');
    const l = document.getElementById('input-label');
    const b = document.getElementById('breadcrumb');
    const s = document.getElementById('submitBtn');
    const i = document.getElementById('target');

    const _data = {
        'fb': ['Laporan Akun Facebook', 'Tautan Profil Pelaku (URL):', 'Dashboard / Facebook', 'var(--fb)', 'https://facebook.com/username'],
        'ig': ['Laporan Akun Instagram', 'Username Pelaku:', 'Dashboard / Instagram', 'var(--ig)', 'Contoh: username_pelaku'],
        'x': ['Report X (Twitter) Account', '@Username Pelaku:', 'Dashboard / X', 'var(--x)', '@handle_pelaku'],
        'wa': ['Laporan Nomor WhatsApp', 'Nomor Telepon (ID):', 'Dashboard / WhatsApp', 'var(--wa)', '+62 8xx xxxxxx']
    };

    t.innerText = _data[p][0];
    l.innerText = _data[p][1];
    b.innerText = _data[p][2];
    s.style.background = _data[p][3];
    i.placeholder = _data[p][4];
}

function submitData() {
    const _v1 = document.getElementById('target').value;
    const _v2 = document.getElementById('reason').value;
    const _v3 = document.getElementById('detail').value;

    if (!_v1 || !_v2 || !_v3) {
        alert("Gagal! Anda wajib mengisi semua kolom laporan.");
        return;
    }

    const o = document.getElementById('overlay');
    const m = document.getElementById('modalMsg');
    const g = document.getElementById('modalLogo');

    o.style.display = 'flex';
    
    const _res = {
        'fb': ['🔵', 'Laporan Facebook sedang ditinjau oleh tim moderator.'],
        'ig': ['📸', 'Laporan Instagram telah masuk ke antrean investigasi.'],
        'x': ['🐦', 'Laporan X Anda telah berhasil diverifikasi sistem.'],
        'wa': ['🟢', 'Nomor WhatsApp telah ditandai sebagai potensi ancaman.']
    };

    g.innerText = _res[_0x_curPlat][0];
    m.innerText = _res[_0x_curPlat][1];
}

function toggleMode() {
    const b = document.body;
    const c = b.getAttribute("data-theme");
    b.setAttribute("data-theme", c === "light" ? "dark" : "light");
}
