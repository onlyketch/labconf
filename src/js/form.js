const form = document.querySelector('.registration__form');
const inputName = document.getElementById('reg-name');
const inputCompany = document.getElementById('reg-company');
const inputPosition = document.getElementById('reg-position');
const inputMail = document.getElementById('reg-mail');
const inputPhone = document.getElementById('reg-phone');
const agreementCheckBox = document.getElementById('reg-agreement');
const submitButton = document.querySelector('.registration__form-submit');
const emailwarning = document.querySelector('.registration__form-warning');
const popUp = document.querySelector('.pop-up');
const popUpSuccessButtton = document.querySelector('.pop-up__body-btn');
const popUpClose = document.querySelector('.pop-up__body-close');
const inputFields = [inputName, inputCompany, inputPosition, inputMail, inputPhone];


agreementCheckBox.addEventListener('change', function() {
    if (this.checked) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', '');
    }
});

for (let field of inputFields) {
    field.addEventListener('input', () => {
        field.classList.remove('error');
    });
    field.addEventListener('change', () => {
        if (field === inputMail) {
            emailwarning.classList.remove('hidden');
        }
        field.classList.add('filled');
    });
}

let scrollY = 0;

function toggleLockScroll(isLock) {
    if (isLock) {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
    } else {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
    }
}

function showPopUp() {
    popUp.classList.add('is-open');
    toggleLockScroll(true);
}

function closePopUp() {
    popUp.classList.remove('is-open');
    toggleLockScroll(false);
}

popUpSuccessButtton.addEventListener('click', () => {
    closePopUp();
});

popUpClose.addEventListener('click', () => {
    closePopUp();
});

function validateForm() {
    let fieldsWithError = [];
    let hasErrors = false;
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegExp = /^([78]\d{10}|\d{10})$/;

    for (let field of inputFields) {
        field.classList.remove('error');
        field.value = field.value.trim();
    }

    if (inputName.value.length < 2) {
        fieldsWithError.push(inputName);
    }

    if (inputCompany.value.length < 2) {
        fieldsWithError.push(inputCompany);
    }

    if (inputPosition.value.length < 3) {
        fieldsWithError.push(inputPosition);
    }

    if (!emailRegExp.test(inputMail.value)) {
        fieldsWithError.push(inputMail);
    }

    if (!phoneRegExp.test(inputPhone.value)) {
        fieldsWithError.push(inputPhone);
    }

    if (fieldsWithError.length > 0) {
        hasErrors = true;
        for (let field of fieldsWithError) {
            field.classList.remove('filled');
            field.classList.add('error');
        }
    }



    return hasErrors;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let errors = validateForm();

    if (!errors) {
        emailwarning.classList.add('hidden');

        for (let field of inputFields) {
            field.classList.remove('filled');
        }
        form.reset();

        showPopUp();
    }
});