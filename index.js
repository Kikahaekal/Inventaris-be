const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
    // origin: 'http://localhost:3000',//(https://your-client-app.com)
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("Database terkoneksi");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    res.json({message: "Selamat datang di API inventaris"});
});

require("./routes/users")(app);
require("./routes/category")(app);
require("./routes/barang")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});