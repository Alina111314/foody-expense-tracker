// Инициализация даты
function initDate() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.max = today;
}

// Формы добавления расхода
function setupExpenseForm() {
    const form = document.getElementById('expense-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        if (isNaN(amount)) {
            alert('Пожалуйста, введите корректную сумму');
            return;
        }
        const data = {
            amount: amount,
            category: document.getElementById('category').value,
            comment: document.getElementById('comment').value,
            date: document.getElementById('date').value
        };
        try {
            console.log('Отправка данных:', data);
            await new Promise(resolve => setTimeout(resolve, 500));
            form.reset();
            initDate();
            loadChart();
            showNotification('Расход успешно добавлен!', 'success');
        } catch (error) {
            showNotification('Ошибка при добавлении расхода', 'error');
            console.error('Ошибка:', error);
        }
    });
}

// График
async function loadChart() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    try {
        console.log('Загрузка графика с', startDate, 'по', endDate);
        document.getElementById('chart-placeholder').style.display = 'flex';
        document.getElementById('chart').style.display = 'none';
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        showNotification('Ошибка при загрузке графика', 'error');
        console.error('Ошибка:', error);
    }
}

// Бюджет
async function setBudget() {
    const limitInput = document.getElementById('budget-limit');
    const limit = parseFloat(limitInput.value);
    if (isNaN(limit) || limit <= 0) {
        showNotification('Введите корректную сумму бюджета', 'error');
        return;
    }
    try {
        console.log('Установка бюджета:', limit);
        await new Promise(resolve => setTimeout(resolve, 500));
        showNotification(`Бюджет ${limit}₽ успешно сохранён!`, 'success');
        limitInput.value = '';
    } catch (error) {
        showNotification('Ошибка при сохранении бюджета', 'error');
        console.error('Ошибка:', error);
    }
}

// Уведомление
function showNotification(message, type) {
    const statusElement = document.getElementById('budget-status');
    statusElement.textContent = message;
    statusElement.style.color = type === 'success' ? '#2ecc71' : '#e74c3c';
    setTimeout(() => {
        statusElement.textContent = '';
    }, 3000);
}

// Инициализация темы с jQuery
$(document).ready(function () {
    $('[href="#change"]').addClass('hover_1');
    $('.hover_1:eq(0)').addClass('activ_1');

    // Дневной интерфейс по умолчанию
    $('.day').fadeTo(1, 1);
    $('.night').fadeTo(1, 0);

    // Активации выбранной темы
    function activ_1() {
        $('.hover_1').removeClass('activ_1');
    }

    var number_1 = 0;

    // Клац на тему
    $(".hover_1").click(function () {
        number_1 = $(".hover_1").index(this);
        activ_1();
        $(this).addClass('activ_1');

        // Логика переключения
        if (number_1 == 0) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            $('.day').fadeTo(1, 1);
            $('.night').fadeTo(1, 0);
        }
        if (number_1 == 1) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            $('.night').fadeTo(1, 1);
            $('.day').fadeTo(1, 0);
        }

        return false;
    });

    // Автоприменение сохранённой темы
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        $('.hover_1').removeClass('activ_1');
        $('.hover_1:eq(1)').addClass('activ_1');
        $('.night').fadeTo(1, 1);
        $('.day').fadeTo(1, 0);
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        $('.hover_1:eq(0)').addClass('activ_1');
        $('.day').fadeTo(1, 1);
        $('.night').fadeTo(1, 0);
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initDate();
    setupExpenseForm();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').max = today;
    document.getElementById('end-date').max = today;
});