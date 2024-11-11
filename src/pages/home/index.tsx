import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Select } from "../../components/select";
import { ToDoList } from "../../components/toDoList";
import { FormModal } from "../../components/modal";
import { taskRequest } from "../../requests/taskRequest";
import { genreRequest } from "../../requests/genreRequest";
import { Data, dataAction, useDataReducer } from "../../hooks/useDataReducer";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./style.css";

type dataContextType = {
  data: Data;
  dispatch: ({ type, payload }: dataAction) => void;
};

export const DataContext = React.createContext<dataContextType>(
  {} as dataContextType
);

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
      const genres = await genreRequest("fetchGenres");
      const tasks = await taskRequest("fetchTasks");
      dispatch({ type: "genresUpdate", payload: { genre: genres } });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      <div className="main">
        <Header />
        <div className="genre">
          <Select genres={data.genresData} />
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
          <ToDoList tasks={data.tasksData}/>
        </div>
      </div>
    </DataContext.Provider>
  );
};
