// async function to capture comments 
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const blog_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // conditional to ensure that the comment_text has a value before making the POST request
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            blog_id,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // check the response status
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  // listening for the submit event on the comment form
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);