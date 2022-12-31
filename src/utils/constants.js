export const profileButton = document.querySelector('.profile__edit-button');
export const profilePopup = '.popup_type_edit';
export const profileFormElement = document.querySelector('.form_type_edit');
export const profileNameInput = profileFormElement.querySelector('.form__name-input');
export const profileJobInput = profileFormElement.querySelector('.form__job-input');

export const additionButton = document.querySelector('.profile__add-button');
export const additionPopup = '.popup_type_new-place';
export const additionFormElement = document.querySelector('.form_type_new-place');
export const additionNameInput = additionFormElement.querySelector('.form__name-input');
export const additionLinkInput = additionFormElement.querySelector('.form__job-input');

export const imagePopup = '.popup_type-image';

export const cardsContainerSelector = '.elements__list';

export const userConfig = {
  usernameSelector: '.profile__title',
  professionSelector: '.profile__job'
}

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'input_type_error',
  errorClass: 'input-error_visible'
};

export const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
