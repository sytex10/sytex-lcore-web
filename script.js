document.addEventListener("DOMContentLoaded", () => {
    // Scroll (Aşağı kaydırma) sırasında elementleri yavaşça belirmesi için (Fade-In) Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Bir kere göründükten sonra takibi bırak
            }
        });
    }, observerOptions);

    // Fade-in class'ına sahip tüm elementleri bul ve izlemeye al
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Ekstra: Glitch efekti için rastgele zamanlayıcı
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            if (Math.random() > 0.8) {
                glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    glitchText.style.transform = 'translate(0, 0)';
                }, 50);
            }
        }, 2000);
    }

    // Modal Mantığı (Geri Bildirim)
    const modal = document.getElementById("feedbackModal");
    const btn = document.getElementById("openFeedback");
    const span = document.getElementsByClassName("close-btn")[0];

    if (btn && modal && span) {
        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});
