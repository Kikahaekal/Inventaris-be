const db = require("../models");
const { Barang, Transaksi } = db;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let { barangId, buyer_name, goods_amount, transaction_detail } = req.body;

  const barang = await Barang.findByPk(barangId);

  if (!barang) {
    return res.status(400).send({
      success: false,
      message: "Barang tidak ditemukan",
    });
  }

  if (barang.stock < goods_amount) {
    return res.status(400).send({
      success: false,
      message: "Total barang yang dibeli melebihi stok",
    });
  }

  if (!barangId || !buyer_name || !goods_amount || !transaction_detail) {
    return res.status(400).send({
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
      stock: barang.stock - goods_amount,
    });

    return res.status(201).send({
      success: true,
      message: "Transaksi berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Transaksi gagal ditambahkan",
      error: error,
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
      attributes: ["name"],
      include: [
        {
          model: Transaksi,
          as: "transaksi",
          required: true,
          attributes: [
            "id",
            "barangId",
            "buyer_name",
            "goods_amount",
            "total_cost",
            "transaction_detail",
          ],
        },
      ],
    });

    if (result.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Data transaksi belum ditambahkan",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Data transaksi ditemukan",
      data: result,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).send({
      success: false,
      message: "Data transaksi gagal diambil",
    });
  }
};

exports.edit = async (req, res) => {
  let transaksiId = req.params.id;
  let { barangId, buyer_name, goods_amount, transaction_detail } = req.body;

  const barang = await Barang.findByPk(barangId);
  const transaksi = await Transaksi.findByPk(transaksiId);
  
  if(!transaksi && !barang) {
    return res.status(404).send({
      success: false,
      message: "Data barang dan transaksi tidak ditemukan"
    });
  }

  let stockBarang = barang.stock;
  const oldAmount = transaksi.goods_amount;

  if(goods_amount > oldAmount && stockBarang != 0) {
    const transactionAdded = goods_amount - oldAmount;
    stockBarang -= transactionAdded;
  } else if (goods_amount < oldAmount) {
    const transactionTaken = oldAmount - goods_amount;
    stockBarang += transactionTaken;
  } else {
    stockBarang = stockBarang;
  }

  const updatedTransaksi = {
    buyer_name,
    goods_amount,
    total_cost: barang.price * goods_amount,
    transaction_detail,
  }

  try {
    await transaksi.update(updatedTransaksi);
    await barang.update({
      stock: stockBarang
    });

    return res.status(200).send({
      success: true,
      message: "Transaksi telah di update"
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Transaksi gagal diperbarui"
    });
  }
}

exports.getById = async (req, res) => {
  let barang_id = req.params.barangId;
  let transaction_id = req.params.transactionId;

  try {
    const result = await Barang.findByPk(barang_id, {
      attributes: ["name"],
      include: [
        {
          model: Transaksi,
          as: "transaksi",
          attributes: [
            "buyer_name",
            "goods_amount",
            "total_cost",
            "transaction_detail",
          ],
          where: {
            id: transaction_id
          }
        },
      ]
    });

    return res.status(200).send({
      success: true,
      message: "Data transaksi ditemukan",
      data: result
    });
    
  } catch(error) {
    return res.status(400).send({
      success: false,
      message: "Detail transaksi gagal ditemukan"
    });
  }
}

exports.delete = async (req, res) => {
  let transaction_id = req.params.id;

  try {
    await Transaksi.destroy({
      where: {
        id: transaction_id
      }
    });

    return res.status(200).send({
      success: true,
      message: "Barang berhasil dihapus"
    });
  } catch(error){
    return res.status(500).send({
      success: false,
      message: "Data gagal dihapus"
    });
  }
}