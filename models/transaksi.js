'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaksi.init({
    barangId: DataTypes.INTEGER,
    buyer_name: DataTypes.STRING,
    goods_amount: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER,
    transaction_detail: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transaksi',
  });
  return Transaksi;
};