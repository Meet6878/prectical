import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../backendUrl/backendUrl";
import { ToastContainer, toast } from "react-toastify";

const BlogListPage = () => {
  const [blogList, setBlogList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({
    title: "",
    description: "",
    category: "",
    slug: "",
    status: "",
  });

  const handleGetAllBlog = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/blog`);
      if (response?.data) {
        setBlogList(response?.data?.blog);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleDelete = async (blog) => {
    try {
      await axios.delete(`${backendUrl}/api/v1/blog/${blog._id}`);
      toast.success("Blog deleted successfully");
      handleGetAllBlog();
    } catch (error) {
      toast.error("Failed to delete the blog");
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setUpdatedBlog({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      slug: blog.slug,
      status: blog.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateBlog = async () => {
    try {
      await axios.put(
        `${backendUrl}/api/v1/blog/${selectedBlog._id}`,
        updatedBlog
      );
      toast.success("Blog updated successfully");
      handleGetAllBlog();
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update the blog");
    }
  };

  useEffect(() => {
    handleGetAllBlog();
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Blog List
      </h2>

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
                Description: {blog.description}
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
                  onClick={() => handleDelete(blog)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
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

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Blog</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBlog();
              }}
            >
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={updatedBlog.title}
                  onChange={(e) =>
                    setUpdatedBlog({ ...updatedBlog, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={updatedBlog.description}
                  onChange={(e) =>
                    setUpdatedBlog({
                      ...updatedBlog,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={updatedBlog.category}
                  onChange={(e) =>
                    setUpdatedBlog({
                      ...updatedBlog,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  value={updatedBlog.slug}
                  onChange={(e) =>
                    setUpdatedBlog({ ...updatedBlog, slug: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  value={updatedBlog.status}
                  onChange={(e) =>
                    setUpdatedBlog({ ...updatedBlog, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BlogListPage;
