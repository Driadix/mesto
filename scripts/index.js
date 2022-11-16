const closeButtonList = document.querySelectorAll('.popup__close-button');

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

const elementTemplate = document.querySelector('#element__template').content.querySelector('.element');
const elementsContainer = document.querySelector('.elements__list');

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
  elementsContainer.prepend(renderElement(elementInfo));
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
    renderImage(elementInfo);
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
}

function openProfilePopup(popup) {
  popup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function resetPopup(popup) {
  const childFormElement = popup.querySelector('.form');
  childFormElement.reset();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const editName = profileNameInput.value;
  const editJob = profileJobInput.value;
  profileName.textContent = editName;
  profileJob.textContent = editJob;

  closePopup(evt.currentTarget.closest('.popup'));
}

function handleAdditionFormSubmit(evt) {
  evt.preventDefault();

  const placeName = additionNameInput.value;
  const placeLink = additionLinkInput.value;
  addElement({ name: `${placeName}`, link: `${placeLink}` });

  closePopup(evt.currentTarget.closest('.popup'));
}

initialElements.forEach(elementInfo => {
  addElement(elementInfo);
})

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
additionFormElement.addEventListener('submit', handleAdditionFormSubmit);
profileButton.addEventListener('click', () => openProfilePopup(profilePopup));
additionButton.addEventListener('click', () => {
  resetPopup(additionPopup);
  openPopup(additionPopup);
});

closeButtonList.forEach(btn => btn.addEventListener('click', () => closePopup(btn.closest('.popup'))));
