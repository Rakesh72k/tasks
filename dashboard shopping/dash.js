const products = [
    { id: 1, name: 'MacBook Pro 16"', category: 'laptops', price: 3499.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
    { id: 2, name: 'iPhone 15 Pro Max', category: 'mobiles', price: 1199.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
    { id: 3, name: 'Gaming PC', category: 'pcs', price: 2499.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7' },
    { id: 4, name: 'Sony WH-1000XM5', category: 'headsets', price: 299.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' },
    { id: 5, name: 'Dell XPS 13', category: 'laptops', price: 1399.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' },
    { id: 6, name: 'Samsung Galaxy S22', category: 'mobiles', price: 999.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1611078473407-5d8b4f2fbab1' },
    { id: 7, name: 'ASUS ROG Strix', category: 'pcs', price: 2199.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7' },
    { id: 8, name: 'Bose QuietComfort', category: 'headsets', price: 249.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' },
    { id: 9, name: 'Lenovo ThinkPad X1', category: 'laptops', price: 1599.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' },
    { id: 10, name: 'iPad Pro', category: 'mobiles', price: 799.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
    { id: 11, name: 'HP Omen', category: 'pcs', price: 1899.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7' },
    { id: 12, name: 'Jabra Elite 85h', category: 'headsets', price: 199.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' },
    { id: 13, name: 'Mac Mini', category: 'pcs', price: 699.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7' },
    { id: 14, name: 'Razer Blade', category: 'laptops', price: 1799.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' },
    { id: 15, name: 'Beats Studio', category: 'headsets', price: 149.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1587825140708-317f5efef37e' }
];

let cart = [];

function showSection(section) {
    document.getElementById('store').classList.add('hidden');
    document.getElementById('admin').classList.add('hidden');
    document.getElementById(section).classList.remove('hidden');
}

function displayProducts(productList) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    productList.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}?auto=format&fit=crop&w=400&q=60" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <p>Rating: ${p.rating}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    let result = products;
    if (category !== 'all') {
        result = result.filter(p => p.category === category);
    }
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
    displayProducts(result);
}

function sortProducts() {
    const sortBy = document.getElementById('sort-by').value;
    let result = [...products];
    if (sortBy === 'asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
        result.sort((a, b) => b.price - a.price);
    }
    displayProducts(result);
}

function clearFilters() {
    document.getElementById('search-box').value = '';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-by').value = 'default';
    displayProducts(products);
}

function searchProducts() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const result = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(result);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
}

function updateCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.name} ×${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
    });
    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
    cartSidebar.classList.remove('hidden');
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('hidden');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Checkout successful!');
    cart = [];
    updateCart();
}

// Initial load
window.onload = () => {
    displayProducts(products);
};
