const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-login');
    const password = document.querySelector('#password-login');

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const user = document.querySelector('#user-signup');
    const password = document.querySelector('#password-signup');

    if (user && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ user, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);