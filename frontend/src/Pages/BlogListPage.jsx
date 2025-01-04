import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../backendUrl/backendUrl";
import { ToastContainer, toast } from "react-toastify";

const BlogListPage = () => {
  const [blogList, setBlogList] = useState([]);

  const handleGetAllBlog = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/blog`);
      if (response?.data) {
        setBlogList(response?.data?.blog);
      }
      // console.log("response", response);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleDelete = async (blog) => {
    console.log("blog", blog);
    alert("delete blog");
    const res = await axios.delete(`${backendUrl}/api/v1/blog/${blog._id}`);
    toast.success("blog deleted");
    handleGetAllBlog();
  };

  useEffect(() => {
    handleGetAllBlog();
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Blog List
      </h2>

      {/* Grid container to hold all blog items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogList && blogList.length > 0 ? (
          blogList.map((blog, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h5 className="mb-2 text-2xl dark:text-white ml-2">
                <span className="font-bold tracking-tight text-gray-900">
                  Title :
                </span>
                {blog.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Description:
                {blog.description}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Category: {blog.category}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Slug: {blog.slug}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Status: {blog.status}
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={(e) => handleDelete(blog)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No blogs are available
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogListPage;
