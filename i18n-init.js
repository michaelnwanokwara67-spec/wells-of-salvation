// Initialize i18next for multi-language support
i18next.init({
    lng: localStorage.getItem('preferredLanguage') || 'en',
    fallbackLng: 'en',
    resources: translations,
    interpolation: {
        escapeValue: false
    }
}, function(err, t) {
    if (err) console.error('i18next initialization error:', err);
    updatePageLanguage();
});

// Function to update all text on the page based on current language
function updatePageLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = i18next.language;

    // Update navigation
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = i18next.t(key);
        if (el.title) {
            el.title = i18next.t(key + '_title') || el.title;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = i18next.t(key);
    });

    // Update values
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.dataset.i18nValue;
        el.value = i18next.t(key);
    });

    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        el.title = i18next.t(key);
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.dataset.i18nAria;
        el.setAttribute('aria-label', i18next.t(key));
    });

    // Trigger a custom event for page-specific language updates
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: i18next.language } }));
}

// Function to change language
function changeLanguage(lng) {
    i18next.changeLanguage(lng, (err, t) => {
        if (err) console.error('Language change error:', err);
        localStorage.setItem('preferredLanguage', lng);
        updatePageLanguage();
    });
}

// Update language selector dropdown to show current language
function initLanguageSelector() {
    const selector = document.getElementById('language-select');
    if (selector) {
        selector.value = i18next.language;
        selector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
}

// Update search inputs when page language changes
function updateSearchInputs() {
    const searchInput = document.getElementById('verse-search');
    if (searchInput) {
        const placeholder = i18next.t('search.placeholder');
        searchInput.placeholder = placeholder;
    }
    
    const searchBtn = document.querySelector('.search-container button');
    if (searchBtn) {
        searchBtn.textContent = '🔍 ' + i18next.t('search.button');
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    updateSearchInputs();
});

// Also run if called after page load
window.addEventListener('load', () => {
    initLanguageSelector();
    updateSearchInputs();
});

// Listen for language change events for Bible verse fetching
document.addEventListener('languageChanged', async (e) => {
    // Update the "new verse" button if it exists
    const newVerseBtn = document.getElementById('new-verse');
    if (newVerseBtn) {
        newVerseBtn.textContent = '🔄 ' + i18next.t('bible.getNewVerse');
    }

    // Update search inputs
    updateSearchInputs();

    // Re-fetch verse with new language if needed
    const verseContent = document.getElementById('verse-content');
    if (verseContent && verseContent.textContent !== i18next.t('bible.loadingVerse')) {
        // Optionally refresh verses when language changes
        // fetchRandomVerse();
    }
});
