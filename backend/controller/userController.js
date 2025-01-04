const dotenv = require("dotenv");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const Ragiser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "enter all data",
      });
    }

    const alreadyExit = await UserModel.findOne({ email });

    if (alreadyExit) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUsers = await UserModel.create({
        name,
        email,
        password: hashPassword,
      });
      return res.status(200).send({
        newUsers,
        success: true,
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log("faild", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const checkUser = await UserModel.findOne({ email });
    console.log("User found:", checkUser);

    if (!checkUser) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const comparePass = await bcrypt.compare(password, checkUser.password);
    console.log("Password match:", comparePass);

    if (!comparePass) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(checkUser._id);
    console.log("Generated token:", token);

    return res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        id: checkUser._id,
        email: checkUser.email,
        name: checkUser.name,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { Login };

const GetUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    return res.status(200).send({
      success: true,
      message: "get user successful",
      user,
    });
  } catch (error) {
    console.error(err.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = { Ragiser, Login, GetUser };
