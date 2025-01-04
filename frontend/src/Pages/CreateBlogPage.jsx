import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { backendUrl } from "../backendUrl/backendUrl";
import { ToastContainer, toast } from "react-toastify";

const categoryOptions = [
  { value: "Travel", label: "Travel" },
  { value: "Food", label: "Food" },
  { value: "Sports", label: "Sports" },
];

const statusOptions = [
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "Reject", label: "Reject" },
];

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Pending",
  });

  const { title, description, category, status } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const onStatusChange = (selectedOption) => {
    setFormData({ ...formData, status: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/blog/create`,
        { title, description, category, status },
        { withCredentials: true }
      );
      if (res) {
        setFormData({
          title: "",
          description: "",
          category: "",
        });
        toast.success(res.data.message);
        console.log("res", res.data.message);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Blog
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  value={title}
                  onChange={handleChange}
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your description"
                  required
                />
              </div>
              <div>
                <Select
                  name="category"
                  options={categoryOptions}
                  value={categoryOptions.find(
                    (option) => option.value === category
                  )}
                  onChange={onCategoryChange}
                  placeholder="Category"
                  required
                />
              </div>
              <div>
                <Select
                  name="status"
                  options={statusOptions}
                  value={statusOptions.find(
                    (option) => option.value === status
                  )}
                  onChange={onStatusChange}
                  placeholder="Status"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-400 hover:bg-blue-500 "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateBlogPage;
