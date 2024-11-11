import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Select } from "../../components/select";
import { ToDoList } from "../../components/toDoList";
import { FormModal } from "../../components/modal";
import { taskRequest } from "../../requests/taskRequest";
import { genreRequest } from "../../requests/genreRequest";
import { useDataReducer } from "../../hooks/useDataReducer";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./style.css";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, dispatch] = useDataReducer();
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await genreRequest("fetchGenres");
      await taskRequest("fetchTasks");
      dispatch({ type: "genresUpdate" });
      dispatch({ type: "tasksUpdate" });
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="main">
      <Header />
      <div className="genre">
        <Select />
        <AddCircleOutlineIcon
          className="add_circle_outline_icon"
          fontSize="medium"
          onClick={handleOpen}
        />
        <FormModal
          handleClose={handleClose}
          isOpen={isOpen}
          body="genreBody"
        />
      </div>
      <div className="contents">
        <ToDoList />
      </div>
    </div>
  );
};
