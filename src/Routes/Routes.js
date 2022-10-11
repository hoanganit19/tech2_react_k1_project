import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Single from "../Pages/Single/Single";

export const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ca-sy/:id" element={<Single />} />
  </Routes>
);
