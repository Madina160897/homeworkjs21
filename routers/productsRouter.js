const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    res.send(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
});

router.get("/", (req, res) =>{ 
    let {categoryId} = +req.params.categoryId;

    const products = JSON.parse(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
    const filteredProducts = products.filter(item => item.categoryId.toLowerCase().includes(categoryId));

    res.send(filteredProducts)
})

router.post("/", (req, res) => {
    const productsArray = JSON.parse(fs.readFileSync("./routers/products.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/products.json", JSON.stringify([...productsArray, { id: productsArray[productsArray.length-1].id + 1 || 1, name: req.body.name, price: req.body.price, categoryId: req.body.categoryId }]));
    res.send("products added");
});


module.exports = router;