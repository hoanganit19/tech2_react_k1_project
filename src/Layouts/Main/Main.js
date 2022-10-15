import { routes } from "../../Routes/Routes";
import Headers from "../Headers/Headers";
import Sidebars from "../Sidebars/Sidebars";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../Assets/Styles/Styles.scss";
import "./Main.scss";

function Main() {
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
    </div>
  );
}

export default Main;
