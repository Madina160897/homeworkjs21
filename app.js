const express = require("express");
const bodYPaser = require("body-parser");
const cors = require("cors");
const productsRouter = require("./routers/productsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const app = express();

app.use(cors());
app.use(bodYPaser.json()); 
app.use(bodYPaser.urlencoded({extended: false})); 
 
//
app.use("/users", (req, res, next) => {
    console.log("Middleware");
    next();
})

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);



app.listen(8080, () => {
    console.log("Server started");
});