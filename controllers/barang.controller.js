const db = require("../models");
const Barang = db.Barang;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let { userId, categoryIds, name, price, stock } = req.body;

  if (!userId || !categoryIds || !name || !price || !stock) {
    res.status(400).send({
      succcess: false,
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

    if(categoryIds && categoryIds.length > 0) {
      await result.setCategories(categoryIds);
    }

    res.status(201).send({
      succcess: true,
      message: "Barang berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      succcess: false,
      message: "Barang gagal ditambahkan",
      err: error.message
    });
  }
};

exports.edit = async (req, res) => {
  let id = req.params.id;

  let { userId, categoryId, name, price, stock } = req.body;

  const barang = await Barang.findByPk(id);

  if (!barang) {
    res.status(404).send({
      succcess: true,
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

  await barang
    .update(editedBarang)
    .then((result) => {
      res.status(200).send({
        succcess: true,
        message: "Barang berhasil di update",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        succcess: true,
        message: "Barang gagal di update",
        error: err,
      });
    });
};

exports.delete = async (req, res) => {
  let { id } = req.params;

  await Barang.destroy({
    where: {
      id,
    },
  })
    .then((result) => {
      res.status(200).send({
        succcess: true,
        message: "Barang berhasil dihapus",
      });
    })
    .catch((err) => {
      res.status(404).send({
        succcess: false,
        message: "Barang tidak ditemukan",
      });
    });
};


exports.get = async (req, res) => {
  let userId = req.params.id;

  try {
    const result = await Barang.findAll({
      where: {
        userId: userId
      }
    });

    if(!result) {
      res.status(204).send({
        succcess: false,
        message: "Belum ada barang yang ditambahkan",
        data: result
      });
    }

    res.status(200).send({
      succcess: true,
      message: "List barang ditemukan",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      succcess: false,
      message: "Internal Server Error"
    })
  }
};