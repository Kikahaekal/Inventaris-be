const db = require("../models");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users, Barang, Category } = db;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let { username, email, password, address } = req.body;

  if (!username || !email || !password || !address) {
    return res.status(400).send({
      success: false,
      message: "Input tidak dapat kosong",
    });
  }

  const hashedPassword = await bycript.hash(password, 10);

  const dataUser = {
    username,
    password: hashedPassword,
    email,
    address,
  };

  try {
    const result = await Users.create(dataUser);

    return res.status(201).send({
      success: true,
      message: "Data berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `Data gagal ditambahkan, error: ${err}`,
    });
  }
};

exports.authentication = async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      success: false,
      message: "Input tidak dapat kosong",
    });
  }

  const findUser = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (!findUser) {
    return res.status(400).send({
      success: false,
      message: `${username} tidak ditemukan`,
    });
  }

  const checkPassword = await bycript.compare(password, findUser.password);

  if (!checkPassword) {
    return res.status(400).send({
      success: false,
      message: `Password anda salah`,
    });
  }

  const token = jwt.sign({ userId: findUser.id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  return res.status(200).send({
    success: true,
    message: "Login berhasil",
    token: token,
    userId: findUser.id
  });
};


exports.logout = async (req, res) => {
  // Set cookie authToken dengan nilai kosong dan kedaluwarsa
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Hanya untuk HTTPS di production
    expires: new Date(0), // Kedaluwarsa segera
    path: "/", // Berlaku untuk seluruh aplikasi
  });

  return res.status(200).send({
    success: true,
    message: "Logout berhasil",
  });
};

// exports.getBarang = async (req, res) => {
//   let userId = req.params.id;

//   try {
//     const result = await Users.findByPk(userId, {
//       attributes: ["username", "email", "address"],
//       include: [
//         {
//           model: Barang,
//           as: "barangs",
//           attributes: ["name", "price", "stock"],
//           include: [
//             {
//               model: Category,
//               as: "categories",
//               through: { attributes: [] },
//               attributes: ["id", "name"]
//             }
//           ]
//         }
//       ]
//     });

//     res.status(200).send({
//       success: true,
//       message: "Data berhasil ditemukan",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "Data tidak ditemukan",
//       error: error.message,
//     });
//   }
// };
