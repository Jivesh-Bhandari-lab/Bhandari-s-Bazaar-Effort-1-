(() => {
    const storageKey = 'bhandari-bazaar-theme';
    const root = document.documentElement;

    function setTheme(theme) {
        const isDark = theme === 'dark';
        root.classList.toggle('dark-mode', isDark);
        root.style.colorScheme = isDark ? 'dark' : 'light';

        const button = document.querySelector('.theme-toggle');
        if (button) {
            button.textContent = isDark ? '☀ Bright mode' : '☾ Dark mode';
            button.setAttribute('aria-pressed', String(isDark));
            button.setAttribute('aria-label', isDark ? 'Switch to bright background' : 'Switch to dark background');
        }
    }

    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem(storageKey) || 'light';
    } catch (error) {
        // Keep the control usable when storage is disabled by the browser.
    }
    setTheme(savedTheme);

    function addThemeControl() {
        if (document.querySelector('.theme-toggle')) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.addEventListener('click', () => {
            const nextTheme = root.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(nextTheme);
            try {
                localStorage.setItem(storageKey, nextTheme);
            } catch (error) {
                // The selected theme remains active for this page view.
            }
        });
        document.body.appendChild(button);
        setTheme(root.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addThemeControl, { once: true });
    } else {
        addThemeControl();
    }
})();
