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
    const form = document.getElementById("feedbackForm");
    const successDiv = document.getElementById("feedbackSuccess");

    if (btn && modal && span) {
        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
            if (form && successDiv) {
                form.style.display = "flex";
                successDiv.style.display = "none";
                form.reset();
            }
        }

        const closeModal = function() {
            modal.style.display = "none";
        }

        span.onclick = closeModal;

        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    }

    // AJAX Form Gönderimi
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            const submitBtnText = form.querySelector('.btn-text');
            const originalText = submitBtnText.innerText;
            submitBtnText.innerText = "GÖNDERİLİYOR...";
            
            const formData = new FormData(form);
            
            fetch("https://formsubmit.co/ajax/ipekmuhammetemin@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                form.style.display = "none";
                successDiv.style.display = "block";
                submitBtnText.innerText = originalText;
            })
            .catch(error => {
                submitBtnText.innerText = "HATA OLUŞTU!";
                console.error(error);
                setTimeout(() => { submitBtnText.innerText = originalText; }, 3000);
            });
        });
    }
});
