import React, {useState, useEffect} from "react";
import "./Sidebars.scss";
import { Link, NavLink } from "react-router-dom";
import Url from "../../Services/Helpers/Url/Url";
import { isLogin } from "../../Middlewares/AuthMiddleware";
import Options from "../../Services/Helpers/Options/Options";

const optionObj = new Options();
const url = new Url();

const checkLogin = isLogin();

export default function Sidebars() {
  //console.log(isLogin())
  
  const [logo, setLogo] = useState('');

  const getLogo = async () => {
    const logo = await optionObj.get('logo');

    setLogo(logo);
  }

  useEffect(() => {
    getLogo();
  }, [])

  return (
    <div className="sidebar">
      <aside className="sidebar__inner p-4">
        <div className="sidebar__inner--logo">
          <Link to={url.home}>
            <img src={logo} />
          </Link>
        </div>
        <div className="sidebar__inner--nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to={url.profile} className="nav-link">
                Cá nhân
              </NavLink>
              {/* <a class="nav-link" aria-current="page" href="#">
                
              </a> */}
            </li>
            <li className="nav-item">
              <NavLink to={url.categories} className="nav-link">
                Thể loại
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Nhạc mới
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Top 100
              </a>
            </li>
          </ul>

          {checkLogin && (
            <>
              <h4 className="nav-group">Thư viện</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Bài hát
                  </a>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={url.myPlaylist}>
                    Playlist
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={url.myRecent}>
                    Gần đây
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
