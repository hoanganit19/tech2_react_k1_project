import React, {useState} from "react";
import './Recents.scss';

import RecentsNav from "./RecentsNav";

export default function Recents() {

  return (
    <section className="recents">
      <RecentsNav />
      <div className="my-3">
          Playlist  
      </div>
    </section>
  );
}
