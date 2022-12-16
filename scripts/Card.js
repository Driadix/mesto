export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const elementTemplate = document
      .querySelector('#element__template')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementTemplate;
  }

  generateCard() {
    this._card = this._getTemplate();

    this._cardText = this._card.querySelector('.element__text');
    this._cardImage = this._card.querySelector('.element__image');
    this._cardLikeButton = this._card.querySelector('.element__like-button');
    this._cardDeleteButton = this._card.querySelector('.element__delete-button');

    this._cardText.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Изображение "${this._title}"`;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._title, this._image);
    });
    this._cardLikeButton.addEventListener('click', () => {
      this._switchLikeState();
    });
    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _switchLikeState() {
    this._cardLikeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
