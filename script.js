// script.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.dark-mode-toggle');
  const toggleIcon = document.querySelector('.dark-mode-toggle i');
  const body = document.body;
  const themeKey = 'neomanga-theme';
  const favKey = 'neomanga-favorites';

  // -------------------------------
  // 1. Tema escuro/claro
  // -------------------------------
  const applyTheme = (theme) => {
    if (theme === 'light-mode') {
      body.classList.add('light-mode');
      toggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      body.classList.remove('light-mode');
      toggleIcon.classList.replace('fa-sun', 'fa-moon');
    }
  };

  const loadTheme = () => {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  };

  const toggleDarkMode = () => {
    const newTheme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
    applyTheme(newTheme);
    localStorage.setItem(themeKey, newTheme);
  };

  loadTheme();
  if (toggleButton) toggleButton.addEventListener('click', toggleDarkMode);

  // -------------------------------
  // 2. Favoritos
  // -------------------------------
  const loadFavorites = () => {
    return JSON.parse(localStorage.getItem(favKey)) || [];
  };

  const saveFavorites = (favorites) => {
    localStorage.setItem(favKey, JSON.stringify(favorites));
  };

  const favorites = loadFavorites();

  // Marca os favoritos já salvos
  document.querySelectorAll('.manga-card').forEach(card => {
    const title = card.dataset.title;
    const favBtn = card.querySelector('.favorite-btn');

    if (favorites.includes(title)) {
      favBtn.classList.add('active');
    }

    favBtn.addEventListener('click', () => {
      if (favBtn.classList.contains('active')) {
        favBtn.classList.remove('active');
        const newFavs = favorites.filter(f => f !== title);
        saveFavorites(newFavs);
      } else {
        favBtn.classList.add('active');
        favorites.push(title);
        saveFavorites(favorites);
      }
    });
  });
});