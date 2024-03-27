import authenticate from "../../scripts/auth.js";
import { moveInstrumentation } from "../../scripts/scripts.js";
import { decorateNavAuth } from "../header/header.js";

export default async function decorate(block) {
  let row = block.firstElementChild;
  const bg = row.querySelector('picture');
  block.append(bg);
  row.remove();
  const bgP = block.closest('p');
  if (bgP) bgP.remove();
  row = block.firstElementChild;
  row.classList.add('hero-body');
  const content = document.getElementsByClassName('hero-body')[0].children[0].children[0].children[0];
  moveInstrumentation(row, content);
  window.localStorage.getItem("auth") === null ? decorateUnAuthenticatedState(row) : decorateAuthenticatedState(row, JSON.parse(window.localStorage.getItem("auth")))
}

function decorateUnAuthenticatedState(parent) {
  const FORM = `<form class="login-form">
      <div id="login-message" class="login-form__message">
        <span>Welcome back!</span>
        <p class="error_message" style="display:none"></p>
      </div>
      <div class="login-form__input">
        <div class="login-form__label">
          <span>Username</span>
        </div>
        <div id="login-username">
          <input id="username" type="text" placeholder="e.g. jdoe@adobe.com" />
        </div>
      </div>
      <div class="login-form__input">
        <div class="login-form__label">
          <span>Password</span>
        </div>
        <div id="login-password">
          <input id="password" type="password" placeholder="At least 8 characters" />
        </div>
      </div>
      <div class="login-form__submit">
        <div id="login-submit">
          <input id="loginButton" type="submit" value="Log In" />
        </div>
      </div>
      <div class="login-form__forgot-password">
        <span>Forgot user ID or password?</span>
      </div>
    </form>`;

  const loginForm = document.createElement('div');
  loginForm.classList.add('login');
  loginForm.id = 'log-in';
  loginForm.innerHTML = FORM;
  const form = loginForm.firstElementChild;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    authenticate(username, password).then((user) => {
      console.log(user);
      if(user === null) {
        const errorMessage = document.getElementsByClassName('error_message')[0];
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Authentication failed.'
      } else {
        const errorMessage = document.getElementsByClassName('error_message')[0];
        errorMessage.style.display = 'none';
        errorMessage.textContent = ''
        document.getElementById('log-in').remove();
        decorateAuthenticatedState(parent, user)
        decorateNavAuth();
      }
    });
    // handle submit
  });
  parent.append(loginForm);
}

function decorateAuthenticatedState(parent, user) {
  const USER_INFO = `<div class="dashboard-mini">
      <span class="dashboard-mini__welcome">Welcome back ${user.firstName}!</span>
      <div class="dashboard-mini__account-balance">
        <span class="dashboard-mini__account-balance-heading">Account Balance</span>
        <p class="dashboard-mini__account-balance-value">$1,920.00</p>
      </div>
      <div class=dashboard-mini__quick-actions>
        <span><a href="https://securbank-pjjd3xzba-znikolovski.vercel.app/" target="_blank">View account information</a></span>
      </div>
    </div>
  `;
  const miniDashboard = document.createElement('div');
  miniDashboard.classList.add('user-info');
  miniDashboard.innerHTML = USER_INFO;
  parent.append(miniDashboard);
}
