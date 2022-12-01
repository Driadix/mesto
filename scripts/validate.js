function enableValidation() {
  formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const formFieldsList = Array.from(form.querySelectorAll('.form__fieldset'));
    formFieldsList.forEach(fieldSet => setEventListeners(fieldSet));
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.input'));
  const buttonElement = formElement.querySelector('.form__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      console.log('input');
      checkInputValidity(formElement, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__save-button_disabled');
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove('form__save-button_disabled');
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function checkInputValidity(formElement, input) {
  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage);
  }
  else {
    hideInputError(formElement, input);
  }
}

function showInputError(formElement, input, errorMessage) {
  input.classList.add('input_type_error');
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('input__error_visible');
}

function hideInputError(formElement, input) {
  input.classList.remove('input_type_error');
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove('input__error_visible');
}

enableValidation();
