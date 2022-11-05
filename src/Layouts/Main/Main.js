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
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import HttpClient from "../../Services/Helpers/Api/HttpClient";

const client = new HttpClient();

function Main() {
  const isOpenPlayer = useSelector(openPlayerSelector);
  const playInfo = useSelector(playerSelector);
  const dispatch = useDispatch();
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

      const {id, name, single, source, image} = song;

      //Gọi hàm để chạy Player
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

      dispatch(doPlay(playInfoUpdate))
    }

    
  };

  useEffect(() => {
    //Kiểm tra localStorage có tồn tại hay không?
    //Call api để kiểm tra id có tồn tại trên server hay không?
    //Hiển thị dữ liệu lên player, mở player
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
