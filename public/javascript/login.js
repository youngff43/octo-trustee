// async function to handle the signup submission
async function signupFormHandler(event) {
    event.preventDefault();
  
    // grabbing the data from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // conditional to ensure that username, email, and password have values before making the POST request
    if (username && email && password) {
      const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
      }
    }

// async function to handle the login submission
async function loginFormHandler(event) {
    event.preventDefault();
    
        // grabbing the data from the login form
        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();

        // conditional to ensure that email and password have values before making the POST request
        if (email && password) {
          const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
              email,
              password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            console.log('This worked');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
        }}

// listening for the submit event in the signup form
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// listening for the submit event in the login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);