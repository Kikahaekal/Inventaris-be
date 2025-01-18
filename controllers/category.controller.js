const db = require("../models");
const Categories = db.Category;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let { name } = req.body;

  if (!name) {
    res.status(400).send({
      success: false,
      message: "Kategori harus di input",
    });
  }

  const new_category = { name };

  try {
    const result = await Categories.create(new_category);
    
    res.status(200).send({
      success: true,
      message: "Kategori berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Gagal menambah kategori",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Categories.findAll({
      attributes: ["id", "name"]
    });
    
    if(result.length == 0) {
      res.status(404).send({
        success: false,
        message: "Belum ada kategori yang ditambahkan"
      });
    }

    res.status(200).send({
      success: true,
      message: "Semua kategori berhasil diambil",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Semua kategori gagal diambil",
    });
  }
};

exports.edit = async (req, res) => {
  let { id } = req.params;

  let { name } = req.body;

  const category = await Categories.findByPk(id);

  if (!category) {
    res.status(404).send({
      success: false,
      message: "Kategori tidak ditemukan",
    });
  }

  try {
    const result = await category.update({name});

    res.status(201).send({
      success: true,
      message: "Kategori berhasil diubah",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Kategori gagal diubah",
    });
  }
};

exports.delete = async (req, res) => {
  let { id } = req.params;

  try {
    const result = await Categories.destroy({
      where: {
        id,
      }
    });

    if(result.length == 0) {
      res.status(404).send({
        success: false,
        message: "Data tidak ditemukan"
      });
    }

    res.status(201).send({
      success: true,
      message: "Data berhasil di hapus",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Data gagal ditemukan",
    });
  }
};
