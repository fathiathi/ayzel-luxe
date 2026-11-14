// AYZEL LUXE SHOPPING CART

let cartItems = JSON.parse(localStorage.getItem("ayzelCart")) || [];

// Add products to cart
document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const name = card.querySelector("h3").textContent;
        const price = Number(
            card.querySelector("p").textContent.replace(/[^\d]/g, "")
        );

        const existing = cartItems.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cartItems.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        saveCart();

        button.textContent = "Added ✓";
        alert(name + " added to your bag!");
    });
});

// Save cart
function saveCart() {
    localStorage.setItem("ayzelCart", JSON.stringify(cartItems));
    updateCartCount();
    displayCart();
}

// Update cart count
function updateCartCount() {
    const cart = document.querySelector(".cart");

    if (cart) {
        const count = cartItems.reduce(
            (total, item) => total + item.quantity, 0
        );

        cart.textContent = `🛍 Cart (${count})`;
        cart.style.cursor = "pointer";
        cart.onclick = () => window.location.href = "cart.html";
    }
}

// Display cart products
function displayCart() {
    const container = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total-price");

    if (!container || !totalDisplay) return;

    container.innerHTML = "";

    let total = 0;

    cartItems.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Rs. ${item.price.toLocaleString()}</p>
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    if (cartItems.length === 0) {
        container.innerHTML = "<p>Your shopping bag is empty.</p>";
    }

    totalDisplay.textContent = "Rs. " + total.toLocaleString();
}

function changeQuantity(index, amount) {
    cartItems[index].quantity += amount;

    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    saveCart();
}

function removeItem(index) {
    cartItems.splice(index, 1);
    saveCart();
}

updateCartCount();
displayCart();
// SIGN UP PASSWORD VALIDATION

const signupForm = document.querySelector(".login-box form");

if (signupForm) {
    const passwordFields = signupForm.querySelectorAll('input[type="password"]');

    if (passwordFields.length === 2) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();

            if (passwordFields[0].value !== passwordFields[1].value) {
                alert("Passwords do not match!");
            } else {
                alert("Passwords match successfully!");
            }
        });
    }
}
// CHECKOUT ORDER SUMMARY

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

if (checkoutItems && checkoutTotal) {

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;

        checkoutItems.innerHTML += `
            <p>${item.name} × ${item.quantity} — Rs. ${(item.price * item.quantity).toLocaleString()}</p>
        `;
    });

    checkoutTotal.textContent = "Rs. " + total.toLocaleString();

    if (cartItems.length === 0) {
        checkoutItems.innerHTML = "<p>Your shopping bag is empty.</p>";
    }
}
// CHECKOUT FORM SUBMISSION

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (cartItems.length === 0) {
            alert("Your shopping bag is empty!");
            return;
        }

        alert("Thank you! Your order has been placed successfully.");

        cartItems = [];
        localStorage.removeItem("ayzelCart");

        window.location.href = "order-success.html";
    });
}
// PRODUCT SEARCH

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function() {

        const searchValue = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const productName = card.querySelector("h3").textContent.toLowerCase();

            card.style.display = productName.includes(searchValue)
                ? "block"
                : "none";
        });
    });
}
// SORT PRODUCTS BY PRICE

const sortProducts = document.getElementById("sortProducts");

if (sortProducts) {
    sortProducts.addEventListener("change", function() {

        const productGrid = document.querySelector(".product-grid");

        const products = Array.from(
            productGrid.querySelectorAll(".product-card")
        );

        products.sort((a, b) => {

            const priceA = Number(
                a.querySelector("p").textContent.replace(/[^\d]/g, "")
            );

            const priceB = Number(
                b.querySelector("p").textContent.replace(/[^\d]/g, "")
            );

            if (this.value === "low") return priceA - priceB;
            if (this.value === "high") return priceB - priceA;

            return 0;
        });

        products.forEach(product => productGrid.appendChild(product));
    });
}
// LOGIN FORM DEMO
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Welcome to AYZEL LUXE! Login demo successful.");

        window.location.href = "index.html";
    });
}