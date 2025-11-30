// DOM elems
const form = document.getElementById('subscribe-form');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('error-msg');
const dialog = document.getElementById('success-dialog');
const userEmailSpan = document.getElementById('user-email');
const closeBtn = document.getElementById('close-dialog');

// Паттерн
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Убираем нативную валидацию браузера для контроля через regex
form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const email = emailInput.value.trim();
  // Сброс раннних ошибок
  errorMsg.textContent = '';
  emailInput.classList.remove('error');

  if (!email) {
    errorMsg.textContent = 'Email не може бути пустим.';
    emailInput.classList.add('error');
    emailInput.focus();
    return;
  }

  if (!emailPattern.test(email)) {
    errorMsg.textContent = 'Будь ласка вказуйте дійсну електронну адресу.';
    emailInput.classList.add('error');
    emailInput.focus();
    return;
  }

  // Успех: скрываем форму и показываем dialog с email
  form.style.display = 'none';

  // Подставляем email в диалог
  userEmailSpan.textContent = email;

  // Показываем диалог
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    // fallback для старых браузеров
    alert('Subscribed: ' + email);
  }
});

// Закрытие диалога
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    dialog.close();
    
  });
}

// очистка ошибки при вводе
emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('error')) {
    emailInput.classList.remove('error');
    errorMsg.textContent = '';
  }
});