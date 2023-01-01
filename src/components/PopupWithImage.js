import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open({ name, link }) {
    super.open();

    this._image.src = link;
    this._image.alt = `Изображение "${name}"`;
    this._imageCaption.textContent = name;
  }
}
