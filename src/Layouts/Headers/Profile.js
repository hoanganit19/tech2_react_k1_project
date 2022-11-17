import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { profileSelector } from "./profileSlice";

export default function Profile() {
  const [showDropdown, setDropdown] = useState(false);

  const { loginWithRedirect, logout } = useAuth0();

  //Kiểm tra trạng thái đăng nhập
  //localStorage.removeItem('isLogin');
  

  const userInfo = useSelector(profileSelector);

  const {info:user, isAuthenticated, isLoading} = userInfo;

  if (!isLoading){
   
    localStorage.setItem('isLogin', isAuthenticated?1:0);
  }


  const handleToggleDropdown = (e) => {
    e.preventDefault();
    setDropdown(showDropdown ? false : true);
  };

  return (
    <div className="header__profile">
      {isAuthenticated ? (
        <>
          <a href="#" onClick={handleToggleDropdown}>
            <img src={user?.picture} />
          </a>
          <div
            className={clsx("header__profile--inner", showDropdown && "open")}
          >
            <ul>
              <li>
                <a href="">Cá nhân</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  logout({ returnTo: window.location.origin })}}>Đăng xuất</a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            loginWithRedirect({ui_locales: 'vi'});
          }}
        >
          <img src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" />
        </a>
      )}
    </div>
  );
}
