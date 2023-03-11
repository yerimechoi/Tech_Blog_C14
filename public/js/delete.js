const deleteFormHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#post-id').value;

    if (postId) {
        const response = await fetch('/api/post/' + postId.value, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.delete-form')
  .addEventListener('submit', deleteFormHandler);