document.addEventListener('DOMContentLoaded', () => {
  // Handle signup form
  const signupForm = document.querySelector('.signup-form');
  if (signupForm && window.location.pathname.includes('signup.html')) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      // Simulate signup success
      alert('Sign up successful! Redirecting to login...');
      window.location.href = 'login.html';
    });

    // Password toggle functionality for signup
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
      togglePassword.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
      });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword) {
      toggleConfirmPassword.addEventListener('click', () => {
        const confirmPasswordInput = document.getElementById('confirm-password');
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
      });
    }
  }

  // Handle login form
  const loginForm = document.querySelector('.login-form');
  if (loginForm && window.location.pathname.includes('login.html')) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Simulate login success
      alert('Login successful! Redirecting to main site...');
      window.location.href = 'index.html';
    });

    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
      togglePassword.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Optionally change icon
      });
    }
  }

  // Index page functionality
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      showSlide(currentIndex);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      showSlide(currentIndex);
    }, 5000);
  }

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  if (searchInput && searchButton) {
    const movieItems = document.querySelectorAll('.movie-item');
    const tvshowItems = document.querySelectorAll('.tvshow-item');

    function filterItems() {
      const query = searchInput.value.toLowerCase();
      movieItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      tvshowItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    searchButton.addEventListener('click', filterItems);

    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        filterItems();
      }
    });
  }

  // Copy link functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const link = button.getAttribute('data-link');
      navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy link.');
      });
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Episode and video player functionality for dexter.html
  const episodeList = document.getElementById('episodeList');
  const seasonSelect = document.getElementById('seasonSelect');
  const videoPlayer = document.getElementById('videoPlayer');

  if (episodeList && seasonSelect && videoPlayer) {
    function populateEpisodes(season) {
      episodeList.innerHTML = '';
      const eps = window.episodes[season];
      if (eps) {
        eps.forEach((ep, index) => {
          const li = document.createElement('li');
          li.textContent = ep.name;
          li.style.cursor = 'pointer';
          li.addEventListener('click', () => {
            videoPlayer.src = ep.url;
          });
          episodeList.appendChild(li);
        });
      }
    }

    seasonSelect.addEventListener('change', () => {
      populateEpisodes(seasonSelect.value);
      // Load first episode of new season
      if (episodeList.children.length > 0) {
        episodeList.children[0].click();
      }
    });

    // Initial load
    populateEpisodes(seasonSelect.value);
    // Load first episode by default
    if (episodeList.children.length > 0) {
      episodeList.children[0].click();
    }
  }
});
