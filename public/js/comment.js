const commentFormHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const comments = document.querySelector('textarea[name="comments"]').value;

    if (postId && comments) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ postId, comments }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);