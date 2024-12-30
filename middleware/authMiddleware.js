const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) return res.status(401).send({message: "Akses dibatasi"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    } catch(error) {
        res.status(401).send({
            message: "Token tidak valid"
        });
    }
}

module.exports = verifyToken;