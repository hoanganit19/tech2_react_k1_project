import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error404 from "../Errors/Error404";
import "./Playlist.scss";
import HttpClient from "../../Services/Helpers/Api/HttpClient";

const client = new HttpClient();

export default function Playlist() {
  const params = useParams();
  const { id } = params;

  const [playlist, setPlaylist] = useState({});

  const [songs, setSongs] = useState([]);

  const [status, setStatus] = useState("pending");

  const getPlaylist = async () => {
    const res = await client.get(client.playlists + "/" + id);
    if (res.response.ok) {
      setPlaylist(res.data);

      //Xử lý lấy id bài hát
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
            if (resSongs.response.ok) {
              setSongs(resSongs.data);
              
            }
          }
        }

        setStatus("success");
      }
    }else{
        setStatus("404");
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const renderPlaylist = () => {
    let jsx = null;
    if (status==='success'){
        jsx = <section className="playlist">
        <div className="row">
          <div className="col-3">
            <div className="playlist__image">
              <img src={playlist.image} />
            </div>
            <div className="playlist__info">
              <h2>{playlist.name}</h2>
              <p>Cập nhật: {playlist.updated_at}</p>
              <p>
                <a href="">Ca sĩ 1</a>, <a href="">Ca sĩ 1</a>
              </p>
              <p>{playlist.follow} người yêu thích</p>
            </div>
            <div className="playlist__actions">
              <button type="button" className="btn btn-primary">
                <i className="fa-solid fa-play"></i> Tiếp tục phát
              </button>
              <p className="text-center mt-2 favourite">
                <a href="">
                  <i className="fa-regular fa-heart"></i>
                </a>
              </p>
            </div>
          </div>
          <div className="col-9">
            <table className="table table-bordered playlist__songs">
              <thead>
                <tr>
                  <th>Bài hát</th>
                  <th width="10%">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {status === "success" &&
                (
                  songs.length 
                  ?
                  songs.map(({id, name, duration, image}) => {
                      return (
                        <tr key={id}>
                          <td>
                            <div className="playlist--item d-flex">
                              <img src={image} />
                              <span>
                                <a href="#">{name}</a>
                                <a href="#">Tên ca sĩ</a>
                              </span>
                            </div>
                          </td>
                          <td>{duration}</td>
                        </tr>
                      );
                    })
                  :
                  <tr>
                      <td colSpan={2} className='text-center'>Không có bài hát</td>
                  </tr>
                )
                  }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    }

    if (status==='404'){
        jsx = <Error404 />
    }

    return jsx;
  }

  return renderPlaylist();
}
