// function to edit the blog
async function editFormHandler(event) {
    event.preventDefault();
  
    // grabbing the data from the blog
    const title = document.querySelector('input[name="blog-title"]').value.trim();
    const content = document.querySelector('textarea[name="blog-content"]').value.trim();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
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
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }

  // listening for the submit event on the edit form
  document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);