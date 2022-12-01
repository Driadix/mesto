const closeButtonList = document.querySelectorAll('.popup__close-button');
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

const elementTemplate = document.querySelector('#element__template').content.querySelector('.element');
const elementsContainer = document.querySelector('.elements__list');

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
  // document.addEventListener('keydown', handleCloseEsc);
}

function resetErrors(form) {
  const formInputs = Array.from(form.querySelectorAll('.input'));
  formInputs.forEach(input => {
    input.classList.remove('input_type_error');
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove('input__error_visible');
  });
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
  // document.removeEventListener('keydown', handleCloseEsc);
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
profileButton.addEventListener('click', () => {
  openProfilePopup(profilePopup);
  resetErrors(profilePopup.querySelector('.form'));
});
additionButton.addEventListener('click', () => {
  resetPopup(additionPopup);
  resetErrors(additionPopup.querySelector('.form'));
  openPopup(additionPopup);
});



closeButtonList.forEach(btn => btn.addEventListener('click', () => closePopup(btn.closest('.popup'))));
popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  });
  document.addEventListener('keydown', evt => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}
);
