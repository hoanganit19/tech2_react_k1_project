import React, { useState, useEffect } from "react";
import "./Profile.scss";
import HttpClient from "../../Services/Helpers/Api/HttpClient";
import { profileSelector } from "../../Layouts/Headers/profileSlice";
import { useSelector } from "react-redux";
import Url from "../../Services/Helpers/Url/Url";
import { Link } from "react-router-dom";
import PlayListNoData from "../../Layouts/NoContent/PlayList";

const client = new HttpClient();
const url = new Url();

export default function MyPlaylist() {
  const [playlists, setPlaylists] = useState([]);

  const user = useSelector(profileSelector);

  const userId = user?.info?.id;

  const getPlayLists = async () => {
    if (userId !== undefined) {
      const res = await client.get(client.favouritePlaylists, {
        userId: userId,
        status: 1,
        _expand: "playlist",
      });
      if (res.response.ok) {
        setPlaylists(res.data);
      }
    }
  };

  useEffect(() => {
    getPlayLists();
  }, [user]);

  return (
    <section className="profile">
      <h1>Playlist</h1>

      <div className="profile__category">
        {playlists?.length ? (
          <div className="row">
            {playlists.map(({ playlist }) => {
              const { id, image, name } = playlist;
              return (
                <div className="col-3" key={id}>
                  <div className="categories--item">
                    <Link to={url.getPlaylist(id)}>
                      <img src={image} />
                      <h3>{name}</h3>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <PlayListNoData />
        )}
      </div>
    </section>
  );
}
