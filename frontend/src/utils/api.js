class Api {
  constructor(baseUrl, group, token) {
    this.baseUrl = baseUrl;
    this.group = group;
    this.token = token;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        new Error(`Ошибка ${res.status} - ${res.statusText}`)
      );
    }
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}v1/${this.group}/users/me`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getCards() {
    return fetch(`${this.baseUrl}v1/${this.group}/cards`, {
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}v1/${this.group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}v1/${this.group}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setLike(cardID, likeState) {
    const method = likeState ? "DELETE" : "PUT";

    return fetch(`${this.baseUrl}v1/${this.group}/cards/likes/${cardID}`, {
      method,
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setAvatar(data) {
    return fetch(`${this.baseUrl}v1/${this.group}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardID) {
    return fetch(`${this.baseUrl}v1/${this.group}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const api = new Api(
  "https://mesto.nomoreparties.co/",
  "cohort-17",
  "a3d68f30-ff26-46e5-95a8-5a60641ab807"
);

export default api;
