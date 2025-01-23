'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Barang.belongsToMany(models.Category, {
        through: "BarangCategories", // Nama tabel pivot
        as: "categories",
        foreignKey: "barangId", // FK dari tabel Barang di tabel pivot
        otherKey: "categoryId", // FK dari tabel Category di tabel pivot
      });
      Barang.hasMany(models.Transaksi, {as: 'transaksi', foreignKey: 'barangId'});
      Barang.belongsTo(models.Users, { as: 'users', foreignKey: 'userId' });
    }
  }
  Barang.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Barang',
  });
  return Barang;
};