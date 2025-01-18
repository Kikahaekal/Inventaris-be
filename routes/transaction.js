module.exports = app => {
    const Transaction = require("../controllers/transaction.controller")

    let router = require("express").Router();

    router.post("/create", Transaction.create);

    app.use("/api/transaction", router);
}