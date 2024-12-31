const db = require("../models");
const Categories = db.Categories;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    let {name} = req.body;

    if(!name) {
        res.status(400).send({
            success: false,
            message: "Kategori harus di input"
        });
    }

    const new_category = { name };

    await Categories.create({new_category}).then((result) => {
        res.status(200).send({
            success: true,
            message: "Kategori berhasil ditambahkan",
            data: result
        });
    }).catch((err) => {
        res.status(400).send({
            success: false,
            message: "Gagal menambah kategori"
        })
    });
}

exports.get = async (req, res) => {
    await Categories.findAll().then((result) => {
        res.status(200).send({
            success: true,
            message: "Semua kategori berhasil diambil",
            data: result
        });
    }).catch((err) => {
        res.status(400).send({
            success: false,
            message: "Semua kategori gagal diambil"
        });
    });
}

exports.edit = async (req, res) => {
    let {id} = req.params;

    await Categories.findByPk(id).then((result) => {
        res.status(201).send({
            success: true,
            message: "Kategori ditemukan"
        })
    }).catch((err) => {
        res.status(404).send({
            success: false,
            message: "Kategori tidak ditemukan"
        });
    });
}

exports.delete = async (req, res) => {
    let {id} = req.params;

    await Categories.destroy({
        where: {
            id
        }
    }).then((result) => {
        res.status(200).send({
            success: true,
            message: "Data berhasil di hapus"
        });
    }).catch((err) => {
        res.status(404).send({
            success: false,
            message: "Data gagal ditemukan"
        });
    });
}