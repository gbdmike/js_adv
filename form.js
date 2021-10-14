const form = document.getElementsByTagName('form')[0];

const nameEl = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('mail');

const nameError = document.querySelector('#name + span.error');
const phoneError = document.querySelector('#phone + span.error');
const emailError = document.querySelector('#mail + span.error');

const nameRegExp = /^[a-zа-яё]+$/i;
const phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


nameEl.addEventListener('input', function (event) {
    if (nameEl.validity.valid) {
        nameError.innerHTML = '';
        nameError.className = 'error';
    } else {
        showErrorName();
    }
});

phone.addEventListener('input', function (event) {
    if (phone.validity.valid) {
        phoneError.innerHTML = '';
        phoneError.className = 'error';
    } else {
        showErrorPhone();
    }
})

email.addEventListener('input', function (event) {
    if (email.validity.valid) {
        emailError.innerHTML = '';
        emailError.className = 'error';
    } else {
        showErrorMail();
    }
});

form.addEventListener('submit', function (event) {
    if (!nameEl.validity.valid || !phone.validity.valid || !email.validity.valid) {
        showErrorName();
        showErrorPhone();
        showErrorMail();
        event.preventDefault();
    }
});

function showErrorName() {
    if (nameEl.validity.valueMissing) {
        nameError.textContent = 'Введите имя';
    } else if (nameEl !== nameRegExp.test(nameEl.value)) {
        nameError.textContent = 'Имя содержит только буквы';
    }
    nameError.className = 'error active';
}

function showErrorPhone() {
    if (phone.validity.valueMissing) {
        phoneError.textContent = 'Введите номер телефона';
    } else if (phone !== phoneRegExp.test(phone.value)) {
        phoneError.textContent = 'Телефон имеет вид +7(000)000-0000';
    }
    phoneError.className = 'error active';
}

function showErrorMail() {
    if (email.validity.valueMissing) {
        emailError.innerHTML = 'Введите адрес электронной почты';
    } else if (email.validity.typeMismatch) {
        emailError.textContent = 'Введенное значение должно быть адресом электронной почты';
    } else if (email !== emailRegExp.test(email.value)) {
        emailError.textContent = `E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru `;
    }
    emailError.className = 'error active';
}