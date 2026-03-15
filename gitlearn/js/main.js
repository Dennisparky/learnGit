// Main JavaScript file

/**
 * Initialize theme based on system preference or saved user preference.
 */
function initTheme() {
    const storedTheme = localStorage.getItem('gitlearn-theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gitlearn-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

/**
 * Activate the current page in the sidebar navigation.
 */
function initSidebarActiveLink() {
    const links = document.querySelectorAll('.sidebar-nav a');
    const currentPath = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const cleaned = href.split('/').pop();

        if (cleaned === currentPath || (currentPath === '' && cleaned === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize common behaviors for the app.
 */
function initSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !toggle || !overlay) {
        return;
    }

    const setOpen = open => {
        sidebar.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
    };

    toggle.addEventListener('click', () => {
        setOpen(!sidebar.classList.contains('open'));
    });

    overlay.addEventListener('click', () => {
        setOpen(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            setOpen(false);
        }
    });

    // Make sure the sidebar is closed by default on small screens.
    if (window.innerWidth <= 768) {
        setOpen(false);
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function initApp() {
    initTheme();
    initSidebarActiveLink();
    initSidebarToggle();
    initSmoothScroll();

    if (typeof initSearch === 'function') {
        initSearch();
    }
}

window.addEventListener('DOMContentLoaded', initApp);
