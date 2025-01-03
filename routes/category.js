module.exports = app => {
    const Categories = require("../controllers/category.controller")

    let router = require("express").Router();

    router.get("/", Categories.get);
    router.post("/create", Categories.create);
    router.put("/edit/:id", Categories.edit);
    router.delete("/delete/:id", Categories.delete);

    app.use("/api/categories", router);
}