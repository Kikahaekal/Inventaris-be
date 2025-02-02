module.exports = app => {
    const Transaction = require("../controllers/transaction.controller")

    let router = require("express").Router();

    router.get("/get/:id", Transaction.get);
    router.get("/get/barang/:barangId/transaksi/:transactionId", Transaction.getById);
    router.post("/create", Transaction.create);
    router.put("/edit/:id", Transaction.edit);

    app.use("/api/transaction", router);
}