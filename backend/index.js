const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const DBcon = require("./DataBaseConnect/DBcon");
const BlogRoute = require("./routes/BlogRoute");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/blog", BlogRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  DBcon();
  console.log(`Server is running on port ${PORT}`);
});
