module.exports = app => {
    const Categories = require("../controllers/category.controller")

    let router = require("express").Router();

    router.get("/get", Categories.get);
    router.post("/create", Categories.create);
    router.put("/edit", Categories.edit);
    router.put("/delete", Categories.delete);

    app.use("/api/categories", router);
}