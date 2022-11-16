import React from "react";
import './Profile.scss';
import HttpClient from "../../Services/Helpers/Api/HttpClient";

const client = new HttpClient();

export default function Profile() {

  return (
    <section className="profile">
      <h1>Thư viện</h1>

      <div className="profile__category">
        <h2>Playlist</h2>
        <div className="row">
          <div className="col-3">
            <div className="categories--item">
              
                <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/1/5/9/2/159226aaebc0421c28d4921c041dc862.jpg" />
                <h3>abc</h3>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
