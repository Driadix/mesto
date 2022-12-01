const validationConfig = {
  formSelector: '.form',
  formFieldSet: '.form__fieldset',
  inputSelector: '.input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'input_type_error',
  errorClass: 'input__error_visible'
};

function enableValidation() {
  formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const formFieldsList = Array.from(form.querySelectorAll(validationConfig.formFieldSet));
    formFieldsList.forEach(fieldSet => setEventListeners(fieldSet));
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

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
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
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
  input.classList.add(validationConfig.inputErrorClass);
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, input) {
  input.classList.remove(validationConfig.inputErrorClass);
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}

enableValidation();
