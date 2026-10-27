
const buttons = document.querySelectorAll(".menu button");
const pages = document.querySelectorAll(".page");

const dashboard = document.querySelector("#dashboard");
const productPage = document.querySelector("#product");
const categories = document.querySelector("#categories");
const brands = document.querySelector("#brands");

let products = [];
const cart = [];

// 1. Backend API se products lana
const api = async () => {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Backend se products nahi mile");
        }

        const data = await response.json();

        // Data array mein store karna
        products = data;

        console.log("Backend Products:", products);

        // Data aane ke baad pages render karna
        showProducts();
        showCategories();
        showBrands();

    } catch (error) {
        console.error("Error:", error);
    }
};


// 2. Dashboard par products show karna
function showProducts() {
    dashboard.innerHTML = "";

    products.forEach((product) => {
        dashboard.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">

                <h3>Name: ${product.name}</h3>
                <p>ID: ${product.id}</p>
                <p>Price: ₹${product.price}</p>
                <p>Category: ${product.category}</p>

                <button onclick="addProduct(${product.id})">
                    Add +
                </button>
            </div>
        `;
    });
}


// 3. Product ko cart array mein add karna
window.addProduct = (id) => {
    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (product) {
        cart.push(product);
    }

    console.log("Cart:", cart);
    showCart();
};


// 4. Cart ke products show karna
function showCart() {
    productPage.innerHTML = "<h2>Added Products</h2>";

    if (cart.length === 0) {
        productPage.innerHTML += "<p>Abhi koi product add nahi hua.</p>";
        return;
    }

    cart.forEach((product) => {
        productPage.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>
                <p>ID: ${product.id}</p>
                <p>Price: ₹${product.price}</p>
                <p>Category: ${product.category}</p>

                <button onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </div>
        `;
    });
}


// 5. Cart se product delete karna
window.deleteProduct = (id) => {
    const index = cart.findIndex(
        (item) => item.id === Number(id)
    );

    if (index !== -1) {
        cart.splice(index, 1);
    }

    showCart();
};


// 6. Categories show karna
function showCategories() {
    categories.innerHTML = "<h1>Categories Zone</h1>";

    const categoryList = [
        ...new Set(products.map((product) => product.category))
    ];

    categoryList.forEach((category) => {
        categories.innerHTML += `
            <div class="category-card">
                <h3>${category}</h3>
            </div>
        `;
    });
}


// 7. Brands show karna
function showBrands() {
    brands.innerHTML = "<h1>Brands Zone</h1>";

    const brandList = [
        ...new Set(
            products.map((product) => product.name.split(" ")[0])
        )
    ];

    brandList.forEach((brand) => {
        brands.innerHTML += `
            <div class="brand-card">
                <h3>${brand}</h3>
            </div>
        `;
    });
}


// 8. Menu routing
buttons.forEach((button) => {
    button.addEventListener("click", () => {

        pages.forEach((page) => {
            page.classList.remove("active");
        });

        const pageId = button.dataset.page;

        document.getElementById(pageId).classList.add("active");

        // Product section open hone par cart refresh karna
        if (pageId === "product") {
            showCart();
        }
    });
});


// 9. API ko call karna zaroori hai
api();
