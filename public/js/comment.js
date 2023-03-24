const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('input[name="post-id"]').value;
    const comment = document.querySelector('textarea[name="comment"]').value;

    if (post_id && comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment }),
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
    .addEventListener('click', commentFormHandler);