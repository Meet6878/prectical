const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(400).send({
      success: false,
      message: "no token",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "invalid token",
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
