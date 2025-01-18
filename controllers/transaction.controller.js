const db = require("../models");
const { Barang, Transaksi } = db;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let { barangId, buyer_name, goods_amount, transaction_detail } = req.body;

  const barang = await Barang.findByPk(barangId);

  if(!barang) {
    res.status(400).send({
        success: false,
        message: "Barang tidak ditemukan"
    });
  }

  if (barang.stock < goods_amount) {
    res.status(400).send({
      success: false,
      message: "Total barang yang dibeli melebihi stok"
    });
  }

  if ( !barangId || !buyer_name || !goods_amount || !total_cost || !transaction_detail) {
    res.status(400).send({
      success: false,
      message: "Periksa kembali input anda",
    });
  }

  const newTransaction = {
    barangId,
    buyer_name,
    goods_amount,
    total_cost: barang.price * goods_amount,
    transaction_detail,
  };

  try {
    const result = await Transaksi.create(newTransaction);
    await barang.update({
      stock: barang.stock - goods_amount
    });

    res.status(201).send({
      success: true,
      message: "Transaksi berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Transaksi gagal ditambahkan",
      error: error,
    });
  }
};
