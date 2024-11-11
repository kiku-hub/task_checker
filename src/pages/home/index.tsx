import { Header } from "../../components/header";
import { Select } from "../../components/select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./style.css";

export const Home = () => {
  return (
    <div className="main">
      <Header />
      <div className="genre">
        <Select />
        <AddCircleOutlineIcon
          className="add_circle_outline_icon"
          fontSize="medium"
        />
      </div>
    </div>
  );
};