// async function to create a new blog 
async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="blog-title"]').value;
    const content = document.querySelector('input[name="content"]').value;
  
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // check the response status
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  // listening for the submit event on the new blog form
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);