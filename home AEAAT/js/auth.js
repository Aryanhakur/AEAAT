document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If login is successful, display the user's name in place of login/signup
            alert('Login successful!');
            document.getElementById('nav-login').innerHTML = `<span>Welcome, ${data.name}</span>`;
        } else if (data.message === 'Email not found') {
            alert('Email not found. Please sign up first.');
            window.location.href = 'signup.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    });
});

function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    handleLoginSuccess(data.name);
                } else if (data.message === 'Email not found') {
                    alert('Email not found. Please sign up first.');
                    window.location.href = 'signup.html';
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }

    function handleLoginSuccess(username) {
        localStorage.setItem('loggedInUser', username);
        updateNavLogin();
    }

    function updateNavLogin() {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            document.getElementById('nav-login').innerHTML = `<span>Welcome, ${user}</span><button id="logout-button">Logout</button>`;
            document.getElementById('logout-button').style.display = 'inline';
            document.getElementById('logout-button').addEventListener('click', handleLogout);
        } else {
            document.getElementById('nav-login').innerHTML = `<a href="login.html">Login/Sign Up</a>`;
        }
    }

    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        updateNavLogin();
        alert('You have logged out successfully.');
    }
});
