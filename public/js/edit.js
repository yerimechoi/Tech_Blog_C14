const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-body').value;
    const postId = document.querySelector('#post-id').value;

    if (title && content && postId) {
        const response = await fetch('/api/post', {
            method: 'PUT',
            body: JSON.stringify({ title, content, postId }),
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