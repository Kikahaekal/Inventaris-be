module.exports = app => {
    const Users = require("../controllers/user.controller")

    let router = require("express").Router();

    router.post("/register", Users.create);
    router.post("/auth", Users.authentication);
    router.post("/logout", Users.logout);

    app.use("/api/users", router);
}