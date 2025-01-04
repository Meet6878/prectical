const BlogModel = require("../model/BlogModel");

const CreateBlog = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    if (!title || !description || !category || !status) {
      return res.status(400).send({
        message: "all fields are required",
      });
    }
    const blog = await BlogModel.create({
      title,
      description,
      category,
      status,
    });
    return res.status(200).send({
      message: "blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};

const GetAllBlog = async (req, res) => {
  try {
    const blog = await BlogModel.find();
    if (!blog) {
      return res.status(404).send({
        message: "blogs not found",
      });
    }
    return res.status(200).send({
      length: blog.length,
      message: "blog get successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};

const GetBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "blog not found with this id",
      });
    }
    return res.status(200).send({
      message: "blog get successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};

const UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status } = req.body;
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!blog) {
      return res.status(404).send({
        message: "error while update the blog",
      });
    }
    return res.status(200).send({
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const Blog = await BlogModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: "blog delete successfully",
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  CreateBlog,
  GetAllBlog,
  GetBlogById,
  UpdateBlog,
  DeleteBlog,
};
