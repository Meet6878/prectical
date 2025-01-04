const express = require("express");
const {
  CreateBlog,
  GetAllBlog,
  GetBlogById,
  UpdateBlog,
  DeleteBlog,
} = require("../controller/blogController");

const BlogRoute = express.Router();

BlogRoute.post("/create", CreateBlog);
BlogRoute.get("/", GetAllBlog);
BlogRoute.get("/:id", GetBlogById);
BlogRoute.put("/:id", UpdateBlog);
BlogRoute.delete("/:id", DeleteBlog);

module.exports = BlogRoute;
