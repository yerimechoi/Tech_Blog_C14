const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;
    const postId = document.querySelector('#post-id').value;

    if (title && body && postId) {
        const response = await fetch('/api/post', {
            method: 'PUT',
            body: JSON.stringify({ title, body, postId }),
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
  .querySelector('.edit-form')
  .addEventListener('submit', editFormHandler);