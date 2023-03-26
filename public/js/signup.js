const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-signup').value;
    const password = document.querySelector('#password-signup').value;

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('success!!!!!', response.ok)
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.signup-form')
  .addEventListener('click', signupFormHandler);
  