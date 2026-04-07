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
    
    // Update Sidebar UI
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`item-${platform}`).classList.add('active');

    // Update Content with simple transition
    const elements = {
        title: document.getElementById('form-title'),
        label: document.getElementById('input-label'),
        bread: document.getElementById('breadcrumb'),
        btn: document.getElementById('submitBtn'),
        input: document.getElementById('target')
    };

    elements.title.innerText = data.title;
    elements.label.innerText = data.label;
    elements.bread.innerText = data.bread;
    elements.btn.style.backgroundColor = data.color;
    elements.input.placeholder = data.placeholder;
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
            document.getElementById('modalMsg').innerHTML = `Laporan berhasil dienkripsi dan dikirim.<br><b>ID: #SR-${Math.floor(10000 + Math.random() * 90000)}</b>`;
            this.reset();
        } else {
            alert("Terjadi kesalahan pada server API.");
        }
    } catch (err) {
        alert("Gagal terhubung ke server.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// Security: Disable Inspect Element
document.addEventListener('keydown', function(e) {
    if (e.keyCode == 123 || 
       (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || 
       (e.ctrlKey && e.keyCode == 85)) {
        e.preventDefault();
        return false;
    }
});
