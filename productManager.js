const fs = require('fs');


class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }
    
    getProducts() {
        return this.products;
    }

    addProduct(product) {
        const id = this.generateId();
        const newProduct = { id, ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
    
        generateId() {
            if (this.products.length === 0) {
            return 1;
            }
            const lastProduct = this.products[this.products.length - 1];
            return lastProduct.id + 1;
        }

    loadProducts() {
        try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
        } catch (error) {
        console.error('Error al cargar productos:', error);
        }
    }

    saveProducts() {
        try {
        const data = JSON.stringify(this.products, null, 2);        
        fs.writeFileSync(this.path, data, 'utf8');
        } catch (error) {
        console.error('Error al guardar productos:', error);
        }
    }

    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const product = this.getProductById(id);
        if (product) {
        Object.assign(product, updatedFields);
        this.saveProducts();
        }
        return product;
    }

    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
        this.products.splice(index, 1);
        this.saveProducts();
        }
    }

    renderProductsTable() {
        const tableBody = document.getElementById("products-table-body");
        tableBody.innerHTML = "";
        this.products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.precio}</td>
                <td><img src="${product.thumbnail}" alt="${product.title}"></td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
            `;
            tableBody.appendChild(row);
        });
        }
    }
    

module.exports = ProductManager;

// Agrego 3 Productos

const productManager = new ProductManager('products.json');

const product1 = {
    title: 'Agua',
    description: 'Agua en botella',
    price: '$150',
    thumbnail: 'https://static.vecteezy.com/system/resources/previews/003/113/983/original/water-splash-from-a-plastic-bottle-free-photo.jpg',
    stock: 150,
};

const product2 = {
    title: 'Chocolate',
    description: 'Chocolate en barra',
    price: '$350',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Cadbury-Bournville.jpg',
    stock: 100,
};

const product3 = {
    title: 'Refresco',
    description: 'Refresco sabor naranja',
    price: '$250',
    thumbnail:'https://cdn.shopify.com/s/files/1/0305/2031/1947/products/miranda_700x.jpg?v=1593090113',
    stock: 100,
};

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

console.log('Products:', productManager.getProducts());

// Actualizamos Producto ID: 1

const updatedProduct = {
    title: 'Agua mineral',
    price: '$200',
};

productManager.updateProduct(1, updatedProduct);

console.log('Product with id 1:', productManager.getProductById(1));

// Borramos Producto ID: 2

productManager.deleteProduct(2);

console
