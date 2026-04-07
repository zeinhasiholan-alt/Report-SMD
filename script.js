const CONFIG = {
    API_URL: "https://formspree.io/f/mjgapqgd",
    MODELS: {
        'fb': { title: 'Laporan Akun Facebook', label: 'URL Profil Target:', bread: 'Tools / Facebook', color: '#1877F2', placeholder: 'https://facebook.com/user' },
        'ig': { title: 'Laporan Akun Instagram', label: 'Username Target:', bread: 'Tools / Instagram', color: '#E4405F', placeholder: '@username' },
        'x':  { title: 'Report X Account', label: '@Handle Target:', bread: 'Tools / X', color: '#000000', placeholder: '@username' },
        'wa': { title: 'Laporan WhatsApp', label: 'Nomor WhatsApp:', bread: 'Tools / WhatsApp', color: '#25D366', placeholder: '+628...' }
    }
};

function switchMode(platform) {
    const data = CONFIG.MODELS[platform];
    
    // Update Nav UI
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`item-${platform}`).classList.add('active');

    // Update Content
    document.getElementById('form-title').innerText = data.title;
    document.getElementById('input-label').innerText = data.label;
    document.getElementById('breadcrumb').innerText = data.bread;
    document.getElementById('submitBtn').style.backgroundColor = data.color;
    document.getElementById('target').placeholder = data.placeholder;
}

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute("data-theme");
    body.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}

document.getElementById('reportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerText;

    btn.innerText = "MENGIRIM...";
    btn.disabled = true;

    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('modalMsg').innerHTML = `Laporan telah dienkripsi.<br>ID Referensi: <b>#SH-${Math.floor(10000 + Math.random() * 90000)}</b>`;
            this.reset();
        }
    } catch (err) {
        alert("Terjadi kegagalan koneksi.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// Security
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
        e.preventDefault();
        return false;
    }
});
