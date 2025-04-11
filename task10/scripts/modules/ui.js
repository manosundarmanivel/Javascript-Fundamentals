import { getFilteredProducts, getCategories } from './productService.js';
import { addToCart, getCart, removeFromCart, updateQuantity, applyDiscount, calculateTotals } from './cart.js';

let currentCategory = 'All';
let currentSearch = '';
let products = [];


export const renderProducts = async () => {
    products = await getFilteredProducts({
        searchTerm: currentSearch,
        category: currentCategory === 'All' ? '' : currentCategory
    });
    
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </article>
    `).join('');
};

export const renderCart = () => {
    const cart = getCart();
    const totals = calculateTotals();
    
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <h4>${item.name}</h4>
            <input type="number" 
                   class="quantity-input" 
                   value="${item.quantity}" 
                   data-id="${item.id}"
                   min="1">
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        </div>
    `).join('');
    
    document.getElementById('subtotal').textContent = totals.subtotal.toFixed(2);
    document.getElementById('tax').textContent = totals.tax.toFixed(2);
    document.getElementById('discount').textContent = totals.discount.toFixed(2);
    document.getElementById('total').textContent = totals.total.toFixed(2);
    document.getElementById('cartCount').textContent = 
        cart.items.reduce((sum, item) => sum + item.quantity, 0) + ' items';
};

export const renderCategories = async () => {
    const categories = await getCategories();
    const container = document.getElementById('categories');
    
    container.innerHTML = categories.map(category => `
        <button class="category-btn ${category === currentCategory ? 'active' : ''}" 
                data-category="${category}">
            ${category}
        </button>
    `).join('');
};

export const setupEventListeners = () => {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(products.find(p => p.id === productId));
        }
        
        if (e.target.classList.contains('remove-item')) {
            removeFromCart(parseInt(e.target.dataset.id));
        }
        
        if (e.target.classList.contains('category-btn')) {
            currentCategory = e.target.dataset.category;
            document.querySelectorAll('.category-btn').forEach(btn => 
                btn.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts();
        }
    });

    document.getElementById('search').addEventListener('input', e => {
        currentSearch = e.target.value;
        renderProducts();
    });

    document.getElementById('applyDiscount').addEventListener('click', () => {
        const code = document.getElementById('discountCode').value;
        const success = applyDiscount(code);
        if (!success) alert('Invalid discount code');
    });

    document.getElementById('viewCart').addEventListener('click', () => {
        document.getElementById('cart').classList.add('active');
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cart').classList.remove('active');
    });

    document.addEventListener('input', e => {
        if (e.target.classList.contains('quantity-input')) {
            updateQuantity(
                parseInt(e.target.dataset.id),
                parseInt(e.target.value)
            );
        }
    });

    window.addEventListener('cartUpdated', renderCart);
};