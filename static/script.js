document.addEventListener("DOMContentLoaded", () => {
    // 1. Fade-in Animasi Lembut (Tanpa Spring Physics, Tanpa Parallax 3D)
    const cards = document.querySelectorAll('.animate-card');
    cards.forEach((card, index) => {
        // Setup posisi awal (sedikit di bawah dan transparan)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Efek transisi masuk yang linear dan tenang di mata
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 120 * index); // Muncul berurutan dengan jeda tipis
    });

    // 2. Auto-Dismiss Alert (Notifikasi hilang pelan-pelan)
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s ease';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500); // Bersihkan DOM
        }, 3500); // Muncul 3.5 detik lalu pudar
    });
});