import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error404 from "../Errors/Error404";
import "./Playlist.scss";
import HttpClient from "../../Services/Helpers/Api/HttpClient";
import Url from "../../Services/Helpers/Url/Url";
import {
  playerSelector,
  doPlay,
  doOpenPlayer,
} from "../../Components/Player/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import Array from "../../Services/Helpers/Array/Array";
import Number from "../../Services/Helpers/Number/Number";

import { profileSelector } from "../../Layouts/Headers/profileSlice";

import { useAuth0 } from "@auth0/auth0-react";

const client = new HttpClient();
const url = new Url();
const array = new Array();
const number = new Number();

let isFirstLoad = true;


export default function Playlist() {
  let addedRecent = false;
  const params = useParams();

  const { id } = params;

  const [playlist, setPlaylist] = useState({});

  const [songs, setSongs] = useState([]);

  const [status, setStatus] = useState("pending");

  const [singlePlaylist, setSinglePlaylist] = useState([]);

  const [songPlaying, setSongPlaying] = useState(null);

  const [isFavouritePlaylists, setIsFavouritePlaylists] = useState(false);

  const playInfo = useSelector(playerSelector);

  const { isPlay: playStatus } = playInfo;

  const dispatch = useDispatch();

  const userInfo = useSelector(profileSelector);

  const { info: user, isLoading, isAuthenticated } = userInfo;

  const {loginWithRedirect} = useAuth0();

  const addRecentPlaylists = async (userId) => {
    
    const resRecent = await client.get(client.recentPlaylists, {
      userId: parseInt(userId),
      playlistId: parseInt(id),
    });

    if (resRecent.response.ok) {
      if (resRecent.data.length == 0 && !addedRecent) {
        addedRecent = true;

        await client.post(client.recentPlaylists, {
          userId: parseInt(userId),
          playlistId: parseInt(id),
        });

       
        
      }
    }
  };

  const getPlaylist = async () => {
    const res = await client.get(client.playlists + "/" + id);
    if (res.response.ok) {
      setPlaylist(res.data);

      //X??? l?? l???y id b??i h??t
      const resSongPlaylists = await client.get(client.songPlaylists, {
        playlistId: id,
      });

      if (resSongPlaylists.response.ok) {
        if (resSongPlaylists.data.length) {
          const songIds = resSongPlaylists.data.map(({ songId }) => {
            const itemObj = { id: songId };
            return new URLSearchParams(itemObj).toString();
          });

          if (songIds.length) {
            const resSongs = await client.get(
              client.songs + "?" + songIds.join("&")
            );

            const resSongSingle = await client.get(
              client.songSingle +
                "?" +
                songIds.join("&").replace(/id/g, "songId") //regex
            );

            if (resSongSingle.data.length) {
              let singles = [];

              for (const index in resSongSingle.data) {
                const { singleId } = resSongSingle.data[index];
                const resSingle = await client.get(
                  client.single + "/" + singleId
                );

                resSongs.data[index].single = resSingle.data;

                singles.push(resSingle.data); //push ca s?? h??t trong c??? playlist
              }

              singles = singles.filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t.id === value.id)
              );

              setSinglePlaylist(singles);
            }

            if (resSongs.response.ok) {
              setSongs(resSongs.data);
            }
          }
        }

        setStatus("success");
      }
    } else {
      setStatus("404");
    }
  };

  const getUserIdFavouritePlaylists = async () => {
    const res = await client.get(client.favouritePlaylists, {
      playlistId: id,
      userId: user.id,
      status: 1,
    });

    if (res.response.ok) {
      const data = res.data;

      if (data.length) {
        setIsFavouritePlaylists(true);
      }
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  useEffect(() => {
    if (isLoading == false && isAuthenticated) {
      getUserIdFavouritePlaylists();
      addRecentPlaylists(user?.id);
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("currentSong")) {
      const song = array.getItem(
        songs,
        "id",
        localStorage.getItem("currentSong")
      );

      if (song) {
        handlePlaySong(song, false, false);
      }
    }
  }, [songs]);

  useEffect(() => {
    if (playInfo.action === "next" || playInfo.action === "prev") {
      let index = array.getIndex(songs, "id", songPlaying);
      if (playInfo.action === "next") {
        index++;
        if (index > songs.length - 1) {
          index = 0;
        }
      } else {
        index--;
        if (index < 0) {
          index = songs.length - 1;
        }
      }

      handlePlaySong(songs[index], true);
    }
  }, [playInfo.action]);

  //Click v??o n??t ti???p t???c ph??t
  const handlePlay = () => {
    //isFirstLoad = false;

    const playInfoUpdate = { ...playInfo };
    playInfoUpdate.isPlay = playStatus ? false : true;

    dispatch(doPlay(playInfoUpdate));

    if (songPlaying === null) {
      const index = number.getRandomInt(0, songs.length - 1);
      handlePlaySong(songs[index]);
    }
  };

  //Click v??o t???ng b??i h??t trong playlist
  const handlePlaySong = (
    { id, name, image, source, single },
    isPrevNext = false,
    isPlay = true
  ) => {
    setSongPlaying(id); //C???p nh???t id b??i h??t mu???n nghe
    localStorage.setItem("currentSong", id);
    localStorage.setItem("currentTimeSong", 0);
    //const { name: singleName } = single;

    const playInfoUpdate = { ...playInfo };
    playInfoUpdate.info = {
      id: id,
      name: name,
      image: image,
      singleName: single?.name,
      source: source,
      isPlaylist: true,
    };
    playInfoUpdate.isPlay = isPlay;

    if (isPrevNext) {
      playInfoUpdate.action = "";
    } else {
      dispatch(doOpenPlayer(true));
    }

    dispatch(doPlay(playInfoUpdate));
  };

  const handleUnFavouritePlaylists = async (playlistId, userId) => {
    const res = await client.get(
      client.favouritePlaylists +
        "?playlistId=" +
        playlistId +
        "&userId=" +
        userId
    );
    if (res.response.ok) {
      if (res.data.length > 0) {
        const id = res.data[0].id;
        const updateRes = await client.patch(client.favouritePlaylists, id, {
          status: 0,
        });
        if (updateRes.response.ok) {
          setIsFavouritePlaylists(false);
        }
      }
    }
  };

  const handleAddFavouritePlaylists = async (playlistId, userId) => {
    const item = {
      playlistId: playlistId,
      userId: userId,
      status: 1,
    };

    const res = await client.get(
      client.favouritePlaylists +
        "?playlistId=" +
        playlistId +
        "&userId=" +
        userId
    );
    if (res.response.ok) {
      if (res.data.length == 0) {
        const res = await client.post(client.favouritePlaylists, item);
        if (res.response.ok) {
          setIsFavouritePlaylists(true);
        }
      } else {
        const id = res.data[0].id;
        const updateRes = await client.patch(client.favouritePlaylists, id, {
          status: 1,
        });
        if (updateRes.response.ok) {
          setIsFavouritePlaylists(true);
        }
      }
    }
  };

  const handleFavouritePlaylists = (e) => {
    e.preventDefault();
    if (isLoading == false && isAuthenticated) {
      if (!isFavouritePlaylists) {
        handleAddFavouritePlaylists(parseInt(id), user.id);
      } else {
        handleUnFavouritePlaylists(parseInt(id), user.id);
      }
      //handleUnFavouritePlaylists(parseInt(id), user.id);
    } else {
      loginWithRedirect({ ui_locales: "vi" });
    }
  };

  const renderPlaylist = () => {
    let jsx = null;
    if (status === "success") {
      const singles = singlePlaylist.map(({ id, name }, index) => {
        return (
          <React.Fragment key={id}>
            {index < singlePlaylist.length - 1 ? (
              <>
                <Link to="/">{name}</Link>,{" "}
              </>
            ) : (
              <Link to="/">{name}</Link>
            )}
          </React.Fragment>
        );
      });

      let classPlaying = null;
      if (playStatus) {
        classPlaying = "playing";
      } else if (!isFirstLoad && !playStatus) {
        //classPlaying = 'playend';
      } else {
        classPlaying = "";
      }

      jsx = (
        <section className="playlist">
          <div className="row">
            <div className="col-3">
              <div className="playlist__image">
                <img className={classPlaying} src={playlist.image} />
              </div>
              <div className="playlist__info">
                <h2>{playlist.name}</h2>
                <p>C???p nh???t: {playlist.updated_at}</p>
                <p>{singles}</p>
                <p>{playlist.follow} ng?????i y??u th??ch</p>
              </div>
              <div className="playlist__actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePlay}
                >
                  {songPlaying === null ? (
                    <>
                      <i className="fa-solid fa-play"></i> Ph??t ng???u nhi??n
                    </>
                  ) : playStatus ? (
                    <>
                      <i className="fa-solid fa-pause"></i> T???m d???ng
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-play"></i> Ti???p t???c ph??t
                    </>
                  )}
                </button>
                <p className="text-center mt-2 favourite">
                  <a href="#" onClick={handleFavouritePlaylists}>
                    {isLoading == false &&
                    isAuthenticated &&
                    isFavouritePlaylists ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </a>
                </p>
              </div>
            </div>
            <div className="col-9">
              <table className="table table-bordered playlist__songs">
                <thead>
                  <tr>
                    <th>B??i h??t</th>
                    <th width="10%">Th???i gian</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.length ? (
                    songs.map(
                      ({ id, name, duration, image, single, source }) => {
                        //const { name: singleName, id: singleId } = single;
                        return (
                          <tr
                            key={id}
                            className={id === songPlaying ? "highlight" : ""}
                          >
                            <td>
                              <div className="playlist--item d-flex">
                                <img src={image} />
                                <span>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePlaySong({
                                        id,
                                        name,
                                        image,
                                        single,
                                        source,
                                      });
                                    }}
                                  >
                                    {name}
                                  </a>

                                  <Link to={url.getSingle(single?.id)}>
                                    {single?.name}
                                  </Link>
                                </span>
                              </div>
                            </td>
                            <td>{duration}</td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center">
                        Kh??ng c?? b??i h??t
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (status === "404") {
      jsx = <Error404 />;
    }

    return jsx;
  };

  return renderPlaylist();
}
