class Auth {
  constructor({baseUrl, headers}) {
    this.headers = headers
    this.baseUrl = baseUrl
}

  getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  }

  register = (password, email) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email})
    })
    
    .then((res) => this.getResponse(res))
  }; 

  authorize = (password, email) => {
      return fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, email})
      })
      .then((res) => this.getResponse(res))
  }; 

  validityToken = (jwt) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      }
    })
    .then((res) => this.getResponse(res))
  };
}

export const auth = new Auth({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
