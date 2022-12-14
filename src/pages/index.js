import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialElements,
  validationConfig,
  userConfig,
  cardsContainerSelector,
  profilePopup,
  profileButton,
  profileFormElement,
  profileNameInput,
  profileJobInput,
  additionPopup,
  additionButton,
  additionFormElement,
  additionNameInput,
  additionLinkInput,
  imagePopup
} from '../utils/constants.js';

// ------------- PROFILE SECTION AND EDIT POPUP -----------------

const userInfo = new UserInfo(userConfig);

const popupTypeEdit = new PopupWithForm({
  handleFormSubmit: ({ name, job }) => {
    const userData = { name, job };
    userInfo.setUserInfo(userData);

    popupTypeEdit.close();
  }
}, profilePopup);

popupTypeEdit.setEventListeners();

profileButton.addEventListener('click', () => {
  formTypeEditValidator.resetErrors();

  const userData = userInfo.getUserInfo();

  profileNameInput.value = userData.username;
  profileJobInput.value = userData.profession;

  formTypeEditValidator.toggleButtonState();

  popupTypeEdit.open();
});

// ------------- NEW PLACE POPUP -----------------

const popupTypeNewPlace = new PopupWithForm({
  handleFormSubmit: ({ name, link }) => {
    const cardInfo = { name, link };
    cards.addItem(createCard(cardInfo));

    popupTypeNewPlace.close();
  }
}, additionPopup);

popupTypeNewPlace.setEventListeners();

additionButton.addEventListener('click', () => {
  formTypeAddPlaceValidator.resetErrors();
  formTypeAddPlaceValidator.toggleButtonState();

  popupTypeNewPlace.open();
});

// ------------- IMAGE POPUP -----------------

const popupTypeImage = new PopupWithImage(imagePopup);

popupTypeImage.setEventListeners();

// ------------------- CARDS ----------------------------

function handleCardClick(name, link) {
  popupTypeImage.open({ name, link });
}

function createCard(item) {
  const card = new Card(item, handleCardClick, '#element__template');
  const cardElement = card.generateCard();
  return cardElement;
}

const cards = new Section({
  items: initialElements, renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, cardsContainerSelector
);

cards.renderItems();

const formTypeEditValidator = new FormValidator(validationConfig, profileFormElement);
const formTypeAddPlaceValidator = new FormValidator(validationConfig, additionFormElement);
formTypeEditValidator.enableValidation();
formTypeAddPlaceValidator.enableValidation();
