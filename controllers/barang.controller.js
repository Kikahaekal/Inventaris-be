const db = require("../models");
const { Barang, Category, Transaksi } = db;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let { userId, categoryIds, name, price, stock } = req.body;

  if (!userId || !categoryIds || !name || !price || !stock) {
    return res.status(400).send({
      success: false,
      message: "Periksa input anda kembali",
    });
  }

  const newBarang = {
    userId,
    name,
    price,
    stock,
  };

  try {
    const result = await Barang.create(newBarang);

    if (categoryIds && categoryIds.length > 0) {
      await result.setCategories(categoryIds);
    }

    return res.status(201).send({
      success: true,
      message: "Barang berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Barang gagal ditambahkan",
      err: error.message,
    });
  }
};

exports.edit = async (req, res) => {
  let id = req.params.id;

  let { userId, categoryId, name, price, stock } = req.body;

  const barang = await Barang.findByPk(id);

  if (!barang) {
    return res.status(404).send({
      success: true,
      message: "Barang tidak ditemukan",
    });
  }

  const editedBarang = {
    userId,
    categoryId,
    name,
    price,
    stock,
  };

  try {
    const result = await barang.update(editedBarang);

    return res.status(200).send({
      success: true,
      message: "Barang berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: true,
      message: "Barang gagal di update",
      error: err,
    });
  }
};

exports.delete = async (req, res) => {
  let { id } = req.params;

  try {
    const result = await Barang.destroy({
      where: {
        id,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Barang berhasil dihapus",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Barang tidak ditemukan",
    });
  }
};

exports.get = async (req, res) => {
  let userId = req.params.id;

  try {
    const result = await Barang.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "name", "price", "stock"],
      include: [
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
      ],
    });

    if (result.length === 0) {
      return res.status(200).send({
        success: false,
        message: "Belum ada barang yang ditambahkan",
        data: [],
      });
    }

    return res.status(200).send({
      success: true,
      message: "List barang ditemukan",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  let barangId = req.params.id;

  try {
    const result = await Barang.findByPk(barangId, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ["id", "name"]
        }
      ]
    });

    if (result.length == 0) {
      return res.status(404).send({
        success: false,
        message: "Data barang tidak ada",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Data barang ditemukan",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Gagal mengambil data",
    });
  }
};