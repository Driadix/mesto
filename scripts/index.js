import { initialElements, validationConfig } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const formList = document.querySelectorAll('.form');
const popupList = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.form_type_edit');
const profileNameInput = profileFormElement.querySelector('.form__name-input');
const profileJobInput = profileFormElement.querySelector('.form__job-input');

const additionButton = document.querySelector('.profile__add-button');
const additionPopup = document.querySelector('.popup_type_new-place');
const additionFormElement = additionPopup.querySelector('.form_type_new-place');
const additionNameInput = additionFormElement.querySelector('.form__name-input');
const additionLinkInput = additionFormElement.querySelector('.form__job-input');

const imagePopup = document.querySelector('.popup_type-image');
const imageBody = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');

const elementsContainer = document.querySelector('.elements__list');


function addElement(elementInfo) {
  elementsContainer.prepend(renderElement(elementInfo));
}

function renderElement(elementInfo) {
  const card = new Card(elementInfo, '.element__template', handleImageClick);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
}

function renderImage(name, link) {
  imageCaption.textContent = name;
  imageBody.src = link;
  imageBody.alt = `Изображение "${name}"`;
}

function handleImageClick(name, link) {
  renderImage(name, link);
  openPopup(imagePopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEsc);
}

function openProfilePopup(popup) {
  openPopup(popup);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function resetPopup(popup) {
  const childFormElement = popup.querySelector('.form');
  childFormElement.reset();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEsc);
}

function handleCloseEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const profilePopupName = profileNameInput.value;
  const profilePopupJob = profileJobInput.value;
  profileName.textContent = profilePopupName;
  profileJob.textContent = profilePopupJob;

  closePopup(evt.currentTarget.closest('.popup'));
}

function handleAdditionFormSubmit(evt) {
  evt.preventDefault();

  const placeName = additionNameInput.value;
  const placeLink = additionLinkInput.value;
  renderElement({ name: `${placeName}`, link: `${placeLink}` });

  closePopup(evt.currentTarget.closest('.popup'));
}

initialElements.forEach(elementInfo => {
  renderElement(elementInfo);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
additionFormElement.addEventListener('submit', handleAdditionFormSubmit);
profileButton.addEventListener('click', () => {
  openProfilePopup(profilePopup);
  // resetErrors(profileFormElement, validationConfig);
});
additionButton.addEventListener('click', () => {
  resetPopup(additionPopup);
  // resetErrors(additionFormElement, validationConfig);
  // disableButton(additionPopup.querySelector('.form__save-button'), validationConfig.inactiveButtonClass);
  openPopup(additionPopup);
});

popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

formList.forEach(form => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});
