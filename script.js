// DOM элементы
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Переключение темы
themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Анимация иконки
    themeToggle.querySelector('.theme-icon').textContent = 
        newTheme === 'dark' ? '🌙' : '☀️';
});

// Загрузка сохранённой темы
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.querySelector('.theme-icon').textContent = 
    savedTheme === 'dark' ? '🌙' : '☀️';

// Установка текущей даты по умолчанию
document.getElementById('date').valueAsDate = new Date();

// Остальной код обработчиков остаётся без изменений