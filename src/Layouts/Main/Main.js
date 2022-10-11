import { routes } from "../../Routes/Routes";
import Headers from "../Headers/Headers";
import Sidebars from "../Sidebars/Sidebars";

function Main() {
  return (
    <div className="wrapper">
      <Headers />
      <Sidebars />
      <main>{routes}</main>
    </div>
  );
}

export default Main;
