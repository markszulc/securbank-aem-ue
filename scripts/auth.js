export async function validateAuth() {
  const token = JSON.parse(window.localStorage.getItem("auth")).token;
  const options = {
    method: 'post',
    body: JSON.stringify({
      token: token
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch("https://28538-authfake.adobeio-static.net/api/v1/web/FakeAuth/verify", options);
  if(!response.ok) {
    console.log("Boo")
  }

  const userInfo = await response.json();

  return userInfo;
}

export default async function authenticate(username, password) {
  const options = {
    method: 'post',
    body: JSON.stringify({
      identifier: username,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch("https://28538-authfake.adobeio-static.net/api/v1/web/FakeAuth/generic", options);
  if(!response.ok) {
    console.log("Boo")
  } else {
    const userInfo = await response.json();
    window.localStorage.setItem('auth', JSON.stringify(userInfo));

    return userInfo;
  }

  return null;
}