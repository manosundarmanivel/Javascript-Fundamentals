import { initializeProducts } from './modules/productService.js';
import { renderProducts, renderCategories, setupEventListeners } from './modules/ui.js';

const initializeApp = async () => {
    await initializeProducts();
    await renderCategories();
    await renderProducts();
    setupEventListeners();
};

initializeApp().catch(error => {
    console.error('Failed to initialize app:', error);
    alert('Failed to load application. Please try again later.');
});