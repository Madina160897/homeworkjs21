const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    res.send(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
});

router.post("/", (req, res) => {
    const categoriesArray = JSON.parse(fs.readFileSync("./routers/categories.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/categories.json", JSON.stringify([...categoriesArray, { id: categoriesArray[categoriesArray.length - 1].id + 1 || 1, name: req.body.name }]));
    res.send("categories added");
});


module.exports = router;