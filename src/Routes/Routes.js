import { Routes, Route } from "react-router-dom";
import { protectedRoutes } from "./ProtectedRoute";
import Home from "../Pages/Home/Home";
import Single from "../Pages/Single/Single";
import Search from "../Pages/Search/Search";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import Categories from "../Pages/Categories/Categories";
import Category from "../Pages/Categories/Category";

export const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ca-sy/:id" element={<Single />} />
    <Route path="/tim-kiem" element={<Search />} />
    <Route path="/the-loai">
      <Route path="" element={<Categories />} />
      <Route path=":id" element={<Category />} />
    </Route>

    <Route path="/auth">
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>

    {protectedRoutes}
  </Routes>
);
