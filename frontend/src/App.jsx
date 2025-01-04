import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateBlogPage from "./Pages/CreateBlogPage";
import BlogListPage from "./Pages/BlogListPage";
import ErrorPage from "./Pages/ErrorPage";
import NavBar from "./components/NavBar";
import SingleBlogPage from "./Pages/SingleBlogPage";
import { ToastContainer, toast } from "react-toastify";
import { RagisterForm } from "./components/RagisterForm";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/" element={<BlogListPage />} />
        <Route path="/get-blog" element={<BlogListPage />} />
        <Route path="/get-blog/:id" element={<SingleBlogPage />} />
        <Route path="/register" element={<RagisterForm />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
