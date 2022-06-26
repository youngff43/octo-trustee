// async function that allows the user to logout 
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    // check the response status
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }

  // listening for the click event on the logout button
  document.querySelector('#logout').addEventListener('click', logout);