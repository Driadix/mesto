export default class UserInfo {
  constructor({ usernameSelector, professionSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.username = this._username.textContent;
    this._userData.profession = this._profession.textContent;
    return this._userData;
  }

  setUserInfo(userData) {
    const { name, job } = userData;
    console.log(name);
    this._username.textContent = name;
    this._profession.textContent = job;
  }
}
