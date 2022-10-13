import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Single from "../Pages/Single/Single";
import Search from "../Pages/Search/Search";

export const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ca-sy/:id" element={<Single />} />
    <Route path="/tim-kiem" element={<Search />} />
  </Routes>
);
