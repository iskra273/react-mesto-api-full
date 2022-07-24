class Api {
  constructor({baseUrl, headers}) {
    this.headers = headers
    this.baseUrl = baseUrl
  }
  
  // Получить ответ от сервера
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  }
 
  _headerJwt() {
    return {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this.headers}
  }

  //1.Загрузка инф-ции о пользователе с сервера  
  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this._headerJwt(),
    })
    .then(this._getResponse)
    .catch(console.log)
  }

  // 2.Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
        headers: this._headerJwt(),
    })
    .then(this._getResponse)
    .catch(console.log)  
  }
  
  //3.Редактирование профиля
  editProfile(name, about) {
    console.log('editProfile')
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",  
      headers: this._headerJwt(),
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._getResponse)
    .catch(console.log)  
  }

  //4.Добавление карточки
  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",  
      headers: this._headerJwt(),
      body: JSON.stringify({
        name, 
        link
      })
    })
    .then(this._getResponse)
    .catch(console.log)  
  }
  
  //7. Удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",  
      headers: this._headerJwt(),
      
    })
    .then(this._getResponse)
    .catch(console.log)  
  }

  // 8. Постановка и снятие лайка
  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",  
      headers: this._headerJwt(),
    })
    .then(this._getResponse)
    .catch(console.log)  
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",  
      headers: this._headerJwt(),
    })
    .then(this._getResponse)
    .catch(console.log)  
  } 
  
  // 9. Обновление аватара пользователя
  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",  
      headers: this._headerJwt(),
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._getResponse)  
    .catch(console.log)    
  }
}
  
export const api = new Api({
    baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
});