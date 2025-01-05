'use strict';
const {
  Model
} = require('sequelize');
const barang = require('./barang');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Barang, {
        through: "BarangCategories", // Nama tabel pivot
        as: "barangs",
        foreignKey: "categoryId", // FK dari tabel Categoy di tabel pivot
        otherKey: "barangId", // FK dari tabel Barang di tabel pivot
      });
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};