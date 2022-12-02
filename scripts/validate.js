const validationConfig = {
  formSelector: '.form',
  inputSelector: '.input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'input_type_error',
  errorClass: 'input-error_visible'
};


function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function checkInputValidity(formElement, input, validationConfig) {
  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage, validationConfig);
  }
  else {
    hideInputError(formElement, input, validationConfig);
  }
}

function showInputError(formElement, input, errorMessage, validationConfig) {
  input.classList.add(validationConfig.inputErrorClass);
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, input, validationConfig) {
  input.classList.remove(validationConfig.inputErrorClass);
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}

function resetErrors(form, validationConfig) {
  const formInputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  formInputs.forEach(input => {
    hideInputError(form, input, validationConfig);
  });
}

enableValidation(validationConfig);
