// Product data
const products = [
    { id: 1, category: "Hair Treatments", name: "Threading", price: 99, description: "Finest thread for high-precision threading & desired eyebrow shape" },
    { id: 2, category: "Hair Treatments", name: "Full-face threading", price: 249, description: "Finest thread for high-precision threading & desired eyebrow shape", duration: "35 mins" },
    // Add all other products similarly
];

let cart = [];
let orders = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function finalizePackage() {
    // Handle package finalization logic
    alert("Package finalized and added to cart!");
    // Add package to cart and clear package builder
}

document.getElementById('finalize-package').addEventListener('click', finalizePackage);

// Orders dropdown handling
document.getElementById('order-dropdown').addEventListener('click', () => {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    orders.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `Order #${order.id}: ${order.items.length} items`;
        orderList.appendChild(li);
    });
});

// Login/Signup page (this can be redirected to a new page)
document.getElementById('login-signup').addEventListener('click', () => {
    // Handle login/signup logic (possibly redirect to another page)
    alert('Redirect to login/signup page');
});

// Function to update the navigation bar based on login state
function updateNavLogin() {
    // Assuming `loggedInUser` is stored in local storage after login
    const user = localStorage.getItem('loggedInUser');
    
    if (user) {
        document.getElementById('nav-login').innerHTML = `<span>Welcome, ${user}</span>`;
    } else {
        document.getElementById('nav-login').innerHTML = `<a href="login.html">Login/Sign Up</a>`;
    }
}

// Call this function on page load to set the correct state
document.addEventListener('DOMContentLoaded', updateNavLogin);

// Function to handle login and store the username in local storage
function handleLoginSuccess(username) {
    localStorage.setItem('loggedInUser', username);
    updateNavLogin();
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    updateNavLogin();
}

// Render products dynamically
function renderProducts() {
    const serviceList = document.querySelector('.service-list');
    products.forEach(product => {
        const serviceDiv = document.createElement('div');
        serviceDiv.className = 'service';
        serviceDiv.dataset.id = product.id;
        serviceDiv.dataset.category = product.category;

        serviceDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        serviceList.appendChild(serviceDiv);
    });
}

renderProducts();

