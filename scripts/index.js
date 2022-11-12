const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editFormElement = editPopup.querySelector('.form_type_edit');
const editNameInput = editFormElement.querySelector('.form__name-input');
const editJobInput = editFormElement.querySelector('.form__job-input');
const closeButton = document.querySelectorAll('.popup__close-button');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-place');
const addFormElement = addPopup.querySelector('.form_type_new-place');
const addNameInput = addFormElement.querySelector('.form__name-input');
const addLinkInput = addFormElement.querySelector('.form__job-input');

const imagePopup = document.querySelector('.popup_type-image');
const imageBody = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__image-caption');

const elementTemplate = document.querySelector('#element__template').content.querySelector('.element');
const elementsList = document.querySelector('.elements__list');

const log = console.log;

const initialElements = [
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

function addElement(elementInfo) {
  elementsList.prepend(renderElement(elementInfo));
}

function renderElement(elementInfo) {
  const newElement = elementTemplate.cloneNode(true);
  const text = newElement.querySelector('.element__text');
  const image = newElement.querySelector('.element__image');
  const likeButton = newElement.querySelector('.element__like-button');
  const deleteButton = newElement.querySelector('.element__delete-button');

  text.textContent = elementInfo.name;
  image.src = elementInfo.link;
  image.alt = elementInfo.name;

  image.addEventListener('click', () => {
    openPopup(imagePopup);
    renderImage({ name: `${text.textContent}`, link: `${image.src}` });
  });
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));
  deleteButton.addEventListener('click', () => newElement.remove());

  return newElement;
}

function renderImage(imageInfo) {
  imageCaption.textContent = imageInfo.name;
  imageBody.src = imageInfo.link;
  imageBody.alt = imageInfo.name;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  switch (popup) {
    case editPopup:
      editNameInput.value = profileName.textContent;
      editJobInput.value = profileJob.textContent;
      break;
    case addPopup:
      addNameInput.value = "";
      addLinkInput.value = "";
      break;
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  switch (evt.currentTarget) {
    case editFormElement:
      const editName = editNameInput.value;
      const editJob = editJobInput.value;
      profileName.textContent = editName;
      profileJob.textContent = editJob;
      break;
    case addFormElement:
      const placeName = addNameInput.value;
      const placeLink = addLinkInput.value;
      addElement({ name: `${placeName}`, link: `${placeLink}` });
      break;
  }
  closePopup(evt.currentTarget.parentNode.parentNode);
}

initialElements.forEach(elementInfo => {
  addElement(elementInfo);
})

editFormElement.addEventListener('submit', formSubmitHandler);
addFormElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', () => openPopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));

closeButton.forEach(btn => btn.addEventListener('click', () => closePopup(btn.parentNode.parentNode)));
