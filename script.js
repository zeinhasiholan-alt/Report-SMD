const CONFIG = {
    API_URL: "https://formspree.io/f/mjgapqgd",
    MODELS: {
        'fb': { title: 'Laporan Akun Facebook', label: 'URL Profil Target', bread: 'TOOLS / FACEBOOK', color: '#1877F2', placeholder: 'https://facebook.com/user' },
        'ig': { title: 'Laporan Akun Instagram', label: 'Username Target', bread: 'TOOLS / INSTAGRAM', color: '#E4405F', placeholder: '@username' },
        'x':  { title: 'Report X Account', label: '@Handle Target', bread: 'TOOLS / X', color: '#000000', placeholder: '@username' },
        'wa': { title: 'Laporan WhatsApp', label: 'Nomor WhatsApp', bread: 'TOOLS / WHATSAPP', color: '#25D366', placeholder: '+628...' }
    }
};

function switchMode(platform) {
    const data = CONFIG.MODELS[platform];
    
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`item-${platform}`).classList.add('active');

    document.getElementById('form-title').innerText = data.title;
    document.getElementById('input-label').innerText = data.label;
    document.getElementById('breadcrumb').innerText = data.bread;
    
    const btn = document.getElementById('submitBtn');
    // Hanya ganti warna jika tidak sedang mode gelap (agar estetika tetap terjaga)
    if(document.body.getAttribute('data-theme') === 'light') {
        btn.style.backgroundColor = data.color;
    }
    
    document.getElementById('target').placeholder = data.placeholder;
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    
    body.setAttribute("data-theme", newTheme);
    document.querySelector('.mode-icon').innerText = isDark ? "☀️" : "🌙";
}

document.getElementById('reportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerText;

    btn.innerText = "PROSES ENKRIPSI...";
    btn.disabled = true;

    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('modalMsg').innerHTML = `Sistem telah mengamankan laporan Anda.<br>ID Laporan: <b>#SH-${Math.floor(Math.random() * 99999)}</b>`;
            this.reset();
        }
    } catch (err) {
        alert("Server sibuk. Coba beberapa saat lagi.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// Security Block
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) return false;
}
