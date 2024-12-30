const db = require("../models");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = db.Users;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    let { username, email, password, address } = req.body;

    if(!username || !email || !password || !address) {
        res.status(400).send({
            success: false,
            message: "Input tidak dapat kosong"
        });
    }
    
    const hashedPassword= await bycript.hash(password, 10);

    const dataUser = {
        username,
        password: hashedPassword,
        email,
        address
    };
    
    await Users.create(dataUser).then((result) => {
        res.status(200).send({
            success: true,
            message: "Data berhasil ditambahkan",
            data: result
        });
    }).catch((err) => {
        res.status(400).send({
            success: false,
            message: `Data gagal ditambahkan, error: ${err}` 
        });
    });;
}

exports.authentication = async (req, res) => {
    let { username, password } = req.body;

    if(!username && !password) {
        res.status(400).send({
            success: false,
            message: "Input tidak dapat kosong"
        });
    }

    const findUser = await Users.findOne(
        { where: {
            username: username
        } }
    );

    if(!findUser){
        res.status(400).send({
            success: false,
            message: `${username} tidak ditemukan`
        });
    }

    const checkPassword = await bycript.compare(password, findUser.password);

    if(!checkPassword){
        res.status(400).send({
            success: false,
            message: `password anda salah`
        });
    }

    const token = jwt.sign({userId: findUser.id}, process.env.JWT_SECRET, {expiresIn: '5h'});

    res.status(200).send({
        success: true,
        message: "Login berhasil",
        token: token
    });
}

exports.logout = async (req, res) => {
    // Set cookie authToken dengan nilai kosong dan kedaluwarsa
    res.cookie('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Hanya untuk HTTPS di production
        expires: new Date(0), // Kedaluwarsa segera
        path: '/', // Berlaku untuk seluruh aplikasi
    });

    res.status(200).send({
        success: true,
        message: "Logout berhasil",
    });
};
