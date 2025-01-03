module.exports = app => {
    const Categories = require("../controllers/category.controller")

    let router = require("express").Router();

    router.get("/get", Categories.get);
    router.post("/create", Categories.create);
    router.put("/edit/:id", Categories.edit);
    router.put("/delete/:id", Categories.delete);

    app.use("/api/categories", router);
}