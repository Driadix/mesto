const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editFormElement = editPopup.querySelector('.form_type_edit');
const editNameInput = editFormElement.querySelector('.form__name-input');
const editJobInput = editFormElement.querySelector('.form__job-input');
const editCloseButton = editFormElement.querySelector('.form__close-button');

function openPopup() {
  editPopup.classList.add('popup_opened');
  editNameInput.value = profileName.textContent;
  editJobInput.value = profileJob.textContent;
}

function closePopup() {
  editPopup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const name = editNameInput.value;
  const job = editJobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup();
}

editFormElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
editCloseButton.addEventListener('click', closePopup);
