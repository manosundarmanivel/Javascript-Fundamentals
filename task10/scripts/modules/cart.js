const CART_KEY = 'ecom_cart_v1';

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || {
    items: [],
    discount: 0,
    discountCode: ''
};

const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const getCart = () => ({
    ...cart,
    items: [...cart.items]
});

export const addToCart = (product, quantity = 1) => {
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ ...product, quantity });
    }
    
    saveCart();
};

export const removeFromCart = (productId) => {
    cart.items = cart.items.filter(item => item.id !== productId);
    saveCart();
};

export const updateQuantity = (productId, quantity) => {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
    }
};

export const applyDiscount = (code) => {
    const validCodes = {
        'SAVE10': 0.1,
        'SAVE20': 0.2
    };
    
    cart.discount = validCodes[code.toUpperCase()] || 0;
    cart.discountCode = code;
    saveCart();
    return cart.discount > 0;
};

export const calculateTotals = () => {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const discountAmount = subtotal * cart.discount;
    const total = subtotal + tax - discountAmount;
    
    return {
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        total: Number(total.toFixed(2)),
        discountCode: cart.discountCode
    };
};