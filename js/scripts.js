// modo oscuro merda dios mio carajo casi
function toggleDarkMode() {
    const html = document.documentElement;
    const darkModeBtn = document.getElementById('darkModeToggle');
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Actualizar tema
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Actualizar icono y texto del botón
    if (darkModeBtn) {
        const icon = darkModeBtn.querySelector('i');
        if (newTheme === 'dark') {
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun');
            darkModeBtn.setAttribute('title', 'Cambiar a modo claro');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon-stars');
            darkModeBtn.setAttribute('title', 'Cambiar a modo oscuro');
        }
    }
    
    //  notificación
    showAlert(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'info');
}

// Inicializar el tema desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // el botón de modo oscuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        // Actualizar icono inicial según el tema
        const icon = darkModeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun');
            darkModeToggle.setAttribute('title', 'Cambiar a modo claro');
        }
    }

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    
    // Inicializar popovers (Historia)
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
    new bootstrap.Popover(el, {
        html: true,
        trigger: 'hover focus',
        container: 'body',
        boundary: 'viewport',
        customClass: 'pop-person'
    });
});


    // Inicializar el carrusel con autoplay
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            ride: 'carousel'
        });
    }

    // Añadir efectos hover a las cards
    document.querySelectorAll('.hover-effect').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 15px var(--shadow-color)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Mostrar alerta de bienvenida
    setTimeout(() => {
        showAlert('¡Bienvenido a Mundo Monopoly! Explora nuestras secciones para aprender todo sobre el juego.', 'success');
    }, 1000);
});

// Función para mostrar alertas
function showAlert(message, type = 'info') {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    if (alertPlaceholder) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        alertPlaceholder.append(wrapper);
    }
}

// Modal de galería para imágenes clicables
document.querySelectorAll('.gallery-item').forEach(el => {
  el.addEventListener('click', () => {
    const src = el.getAttribute('data-gallery-src') || el.src;
    const img = document.getElementById('galleryModalImg');
    if (img) img.src = src;
  });
});

document.addEventListener('click', (e) => {
  const el = e.target.closest('.gallery-item');
  if (!el) return;
  const src = el.getAttribute('data-gallery-src');
  const img = document.getElementById('galleryModalImg');
  if (img && src) img.src = src;
});

// Normaliza rutas del menú y activa el link correcto
(function () {
  const inPages = location.pathname.includes('/pages/');
  document.querySelectorAll('.navbar .nav-link[data-page]').forEach(a => {
    const page = a.getAttribute('data-page');
    let href;
    if (page === 'index') {
      href = inPages ? '../index.html' : 'index.html';
    } else {
      href = inPages ? page : `pages/${page}`;
    }
    a.setAttribute('href', href);

    // Activo
    const linkPath = new URL(href, location.href).pathname.replace(/index\.html$/,'');
    const herePath = location.pathname.replace(/index\.html$/,'');
    if (linkPath === herePath) a.classList.add('active'); else a.classList.remove('active');
  });
})();


  
