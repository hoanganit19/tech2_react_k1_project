import { routes } from "../../Routes/Routes";
import Headers from "../Headers/Headers";
import Sidebars from "../Sidebars/Sidebars";
import Player from "../../Components/Player/Player";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../Assets/Styles/Styles.scss";
import "./Main.scss";
import {
  openPlayerSelector,
  doOpenPlayer,
  doPlay,
  playerSelector,
} from "../../Components/Player/playerSlice";
import { useEffect } from "react";
import HttpClient from "../../Services/Helpers/Api/HttpClient";

import { useAuth0 } from "@auth0/auth0-react";

import { useSelector, useDispatch } from "react-redux";

import { profileSelector, updateInfo } from "../Headers/profileSlice";

const client = new HttpClient();

let check = false;

function Main() {
  const dispatch = useDispatch();

  const { user, isLoading, isAuthenticated } = useAuth0();

  const addUser = async (user) => {
    await client.post(client.users, user);
  };

  const syncUser = async (user) => {
    const res = await client.get(client.users, { email: user.email });
    if (res.response.ok) {
      if (check == false) {
        if (res.data.length === 0) {
          addUser(user);
        } else {
          const userInfo = {
            info: res.data[0],
            isAuthenticated: isAuthenticated,
            isLoading: isLoading
          };

          dispatch(updateInfo(userInfo));
        }
        check = true;
      }
    }
  };

  if (!isLoading && isAuthenticated) {
    syncUser(user);
  }

  const isOpenPlayer = useSelector(openPlayerSelector);
  const playInfo = useSelector(playerSelector);

  const getSong = async (songId) => {
    const res = await client.get(client.songs + "/" + songId);
    if (res.response.ok) {
      const song = res.data;
      const resSongSingle = await client.get(
        client.songSingle + "?songId=" + song.id
      );
      if (resSongSingle.response.ok) {
        const singleId = resSongSingle.data[0].singleId;
        const resSingle = await client.get(client.single + "/" + singleId);
        if (resSingle.response.ok) {
          song.single = resSingle.data;
        }
      }

      const { id, name, single, source, image } = song;

      //G???i h??m ????? ch???y Player
      dispatch(doOpenPlayer(true));

      const playInfoUpdate = { ...playInfo };

      playInfoUpdate.info = {
        id: id,
        name: name,
        image: image,
        singleName: single?.name,
        source: source,
        isPlaylist: false,
      };
      playInfoUpdate.isPlay = false;

      dispatch(doPlay(playInfoUpdate));
    }
  };

  useEffect(() => {
    //Ki???m tra localStorage c?? t???n t???i hay kh??ng?
    //Call api ????? ki???m tra id c?? t???n t???i tr??n server hay kh??ng?
    //Hi???n th??? d??? li???u l??n player, m??? player
    if (localStorage.getItem("currentSong")) {
      const songId = localStorage.getItem("currentSong");
      getSong(songId);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className={"row g-0"}>
        <div className="col-2">
          <Sidebars />
        </div>
        <div className="col-10">
          <div className="main-content">
            <Headers />
            <main>{routes}</main>
          </div>
        </div>
      </div>
      {isOpenPlayer && <Player />}
    </div>
  );
}

export default Main;
