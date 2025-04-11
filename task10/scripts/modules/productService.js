let products = [];

export const initializeProducts = async () => {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
        products = [];
    }
};

export const getFilteredProducts = ({ searchTerm = '', category = '' }) => {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });
};

export const getCategories = () => {
    const categories = products.reduce((acc, product) => {
        if (!acc.includes(product.category)) acc.push(product.category);
        return acc;
    }, []);
    return ['All', ...categories];
};