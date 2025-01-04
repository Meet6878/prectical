const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Reject"],
    default: "pending",
  },
  slug: {
    type: String,
  },
});

BlogSchema.pre("save", function (next) {
  this.slug = `${this.title} - and - ${this.category}`;
  next();
});

const BlogModel = mongoose.model("BlogModel", BlogSchema);
module.exports = BlogModel;
