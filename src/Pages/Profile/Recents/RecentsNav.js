import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Url from "../../../Services/Helpers/Url/Url";
import clsx from "clsx";

const url = new Url();
export default function RecentsNav() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/g, '');
  return (
    <ul className="nav">
      <li className="nav-item me-3">
        <h3>Phát gần đây</h3>
      </li>
      <li className={clsx("nav-item")}>
        <NavLink
          className="nav-link"
          data-current="songs"
          aria-current="page"
          to={url.myRecentSong}
        
        >
          Bài hát
        </NavLink>
      </li>
      <li className={clsx("nav-item")}>
        <NavLink
          className={clsx('nav-link', path==url.myRecent && 'active')}
          to={url.myRecentPlaylist}
          data-current="playlists"
          
        >
          Playlist
        </NavLink>
      </li>
    </ul>
  );
}
