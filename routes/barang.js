module.exports = app => {
    const Barang = require("../controllers/barang.controller")

    let router = require("express").Router();

    router.get("/get-barang/:id", Barang.get);
    router.get("/data-barang/:id", Barang.getById);
    router.post("/create", Barang.create);
    router.put("/edit", Barang.edit);
    router.delete("/delete", Barang.delete);

    app.use("/api/barang", router);
}