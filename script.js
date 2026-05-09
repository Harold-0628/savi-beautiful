// Manejo del Scroll para animar el Header (Centrado -> Izquierda)
window.onscroll = function() {
    const header = document.getElementById("mainHeader");
    if (document.documentElement.scrollTop > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

// Sistema de Estrellas para Reseñas
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.getAttribute('data-value');
        stars.forEach(s => s.classList.remove('active'));
        star.classList.add('active');
    });
});

// Guardar reseña en memoria local
function saveReview() {
    const product = document.getElementById('revProduct').value;
    const name = document.getElementById('revName').value;
    const text = document.getElementById('revText').value;

    if (!name || !text || selectedRating === 0) {
        alert("Completa todos los campos y selecciona tu puntuación.");
        return;
    }

    const review = { product, name, text, rating: selectedRating };
    let reviews = JSON.parse(localStorage.getItem('saviReviews')) || [];
    reviews.unshift(review);
    localStorage.setItem('saviReviews', JSON.stringify(reviews));
    
    displayReviews();
    document.getElementById('revName').value = "";
    document.getElementById('revText').value = "";
}

function displayReviews() {
    const list = document.getElementById('reviewList');
    const reviews = JSON.parse(localStorage.getItem('saviReviews')) || [];
    list.innerHTML = reviews.map(r => `
        <div class="review-card">
            <strong style="color:var(--gold)">${r.product}</strong> - ${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}<br>
            <small>${r.name}</small>
            <p>"${r.text}"</p>
        </div>
    `).join('');
}

// Ventana de Producto
function openProduct(title, desc, img) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDesc").innerText = desc;
    document.getElementById("modalImg").src = img;
    document.getElementById("productModal").style.display = "block";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

window.onload = displayReviews;