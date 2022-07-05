// function to delete a blog
async function deleteFormHandler(event) {
    event.preventDefault();
  
    // grabbing the data from the delete blog page
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }

  // listening for the click event on the delete blog page
  document.querySelector('.delete-blog-btn').addEventListener('click', deleteFormHandler);