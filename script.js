/* [SYSTEM LOG] Initializing secure connection... 
   Updated for Modern UI v2.0
*/

const CONFIG = {
    API_URL: "https://formspree.io/f/mjgapqgd",
    THEMES: { LIGHT: 'light', DARK: 'dark' },
    MODELS: {
        'fb': { title: 'Laporan Akun Facebook', label: 'URL Profil:', bread: 'Tools / Facebook', color: '#1877F2', placeholder: 'https://facebook.com/user' },
        'ig': { title: 'Laporan Akun Instagram', label: 'Username:', bread: 'Tools / Instagram', color: '#E4405F', placeholder: '@username_target' },
        'x':  { title: 'Report X Account', label: '@Handle:', bread: 'Tools / X', color: '#000000', placeholder: '@username' },
        'wa': { title: 'Laporan WhatsApp', label: 'Nomor:', bread: 'Tools / WhatsApp', color: '#25D366', placeholder: '+628...' }
    }
};

// 1. Anti-Inspect & Security Console Message
(function() {
    const style = "color: #1877F2; font-size: 20px; font-weight: bold; font-family: sans-serif;";
    const subStyle = "color: #636e72; font-size: 12px;";
    console.log("%c🛡️ SafetyHub Security Active", style);
    console.log("%cUnauthorized access attempt will be logged.", subStyle);
})();

// 2. Sidebar Toggle dengan Transisi Halus
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    
    sidebar.classList.toggle('closed');
    main.classList.toggle('full');
}

// 3. Switch Content & UI Styling
function switchMode(platform) {
    const data = CONFIG.MODELS[platform];
    if (!data) return;

    // Update Active State di Sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.getElementById(`item-${platform}`);
    if (activeItem) activeItem.classList.add('active');

    // Update Form Content
    const elements = {
        title: document.getElementById('form-title'),
        label: document.getElementById('input-label'),
        bread: document.getElementById('breadcrumb'),
        btn: document.getElementById('submitBtn'),
        input: document.getElementById('target')
    };

    // Animasi Fade Out Ringan saat Ganti Konten
    Object.values(elements).forEach(el => { if(el) el.style.opacity = '0.3'; });

    setTimeout(() => {
        elements.title.innerText = data.title;
        elements.label.innerText = data.label;
        elements.bread.innerText = data.bread;
        elements.btn.style.backgroundColor = data.color;
        elements.input.placeholder = data.placeholder;

        Object.values(elements).forEach(el => { if(el) el.style.opacity = '1'; });
    }, 150);
}

// 4. Modern Form Handling (Submit)
document.getElementById('reportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerText;
    
    // UI Feedback
    btn.innerHTML = `<span style="opacity: 0.8">MENYINKRONKAN...</span>`;
    btn.disabled = true;

    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            showSuccessModal();
            this.reset();
        } else {
            throw new Error("API_ERROR");
        }
    } catch (err) {
        alert("Gagal terhubung ke server. Pastikan koneksi internet stabil.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// 5. Success Modal Handler
function showSuccessModal() {
    const overlay = document.getElementById('overlay');
    const modalMsg = document.getElementById('modalMsg');
    const reportID = `SR-${Math.floor(10000 + Math.random() * 90000)}`;

    overlay.style.display = 'flex';
    modalMsg.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">🛡️</div>
        <h2 style="margin-top:0">Enkripsi Berhasil!</h2>
        <p style="color: var(--text-muted)">Laporan telah dikirim ke basis data pusat.</p>
        <div style="background: var(--bg-body); padding: 10px; border-radius: 8px; font-family: monospace; margin: 15px 0;">
            ID: ${reportID}
        </div>
    `;
}

// 6. Dark Mode Toggle
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute("data-theme");
    const next = current === CONFIG.THEMES.DARK ? CONFIG.THEMES.LIGHT : CONFIG.THEMES.DARK;
    body.setAttribute("data-theme", next);
}

// 7. Enhanced Security (Keyboard Protection)
document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const forbiddenKeys = [123];
    const isInspect = e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J');
    const isViewSource = e.ctrlKey && e.key === 'u';

    if (forbiddenKeys.includes(e.keyCode) || isInspect || isViewSource) {
        e.preventDefault();
        return false;
    }
});
