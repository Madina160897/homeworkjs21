const categoriesBlock = document.querySelector(".categories_block");
const productsBlock = document.querySelector(".products_block");
const createCategoryBtn = document.querySelector("#create_category_btn")
const createProductBtn = document.querySelector("create_product_btn")

const BASE_URL = "http://localhost:8080";
const loadData = async () => {
    const responseCategories = await fetch(BASE_URL + "/categories");
    const responseProducts = await fetch(BASE_URL + "/products");
    const categories = await responseCategories.json();
    const products = await responseProducts.json();

    categoriesBlock.innerHTML = "";
    productsBlock.innerHTML = "";

    for (const category of categories) {
        categoriesBlock.innerHTML += `
            <p>
                ${category.name} 
            </p>
        `;
    }

    for (const product of products) {
        productsBlock.innerHTML += `
        <p>
            ${product.name},
            ${product.price}
        </p>
            `;
    }
};
loadData();

createCategoryBtn.addEventListener("click", () => {
    const newCategoryName = document.querySelector("#new_category_name").value;
    const payload = {
        name: newCategoryName,
    };
    fetch(BASE_URL + "/categories", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("Category create error"));
});

createProductBtn.addEventListener("click", () => {
    const newProName = document.querySelector("#new_product_name").value;
    const newProPri = document.querySelector("#new_products_price").value;
    const newProCat = document.querySelector("#new_products_cat").value;
    const payload = {
        name: newProName,
        price: newProPri,
        categoryId: newProCat
    };
    fetch(BASE_URL + "/products", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("Product create error"));
});
