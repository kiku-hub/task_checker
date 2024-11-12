import React, { useState } from "react";
import { Task } from "../task";
import { FormModal } from "../modal";
import { TaskType } from "../../interfaces/TaskType";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./style.css";

interface Props {
  tasks: TaskType[];
  title: string;
}

export const ToDoList = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="task_list">
      <div className="section">
        <MenuIcon className="section_ele" />
        <span className="section_ele">{props.title}</span>
        {props.title === "ToDo" && (
          <AddCircleOutlineIcon
            className="add_circle_outline_icon"
            fontSize="small"
            onClick={handleOpen}
          />
        )}
        <FormModal
          handleClose={handleClose}
          isOpen={isOpen}
          body="taskBody"
        />
      </div>
      <div className="task_field">
        {props.tasks.map((task: TaskType) => {
          return <Task task={task} key={task.id} />;
        })}
      </div>
    </div>
  );
};