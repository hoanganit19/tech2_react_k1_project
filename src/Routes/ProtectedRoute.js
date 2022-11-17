import { Route } from "react-router-dom";
import Profile from "../Pages/Profile/Profile";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import MyPlaylist from "../Pages/Profile/MyPlaylist";
import Recents from "../Pages/Profile/Recents/Recents";
import RecentSongs from "../Pages/Profile/Recents/RecentSongs";

export const protectedRoutes = (
  <Route element={<AuthMiddleware />}>
    <Route path="/ca-nhan">
      <Route path="" element={<Profile />} />
      <Route path="danh-sach-phat" element={<MyPlaylist />} />
      <Route path="gan-day">
        <Route path="" element={<Recents />} />
        <Route path="danh-sach-phat" element={<Recents />} />
        <Route path="bai-hat" element={<RecentSongs />} />
      </Route>
    </Route>
  </Route>
);
