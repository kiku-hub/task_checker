import React from "react";
import { Select } from "../select";
import { TaskType } from "../../interfaces/TaskType";
import "./style.css";

interface Props {
  task: TaskType;
  getMatchTask: (id: number) => void;
}

export const Task = (props: Props) => {  
  return (
    <div
      className="task"
      style={{
        backgroundColor:
          new Date(props.task.deadlineDate) > new Date()
            ? "white"
            : "rgb(250, 194, 194)",
      }}
    >
      <span className="task_date">{props.task.deadlineDate}</span>
      <div className="task_text_contents" onClick={() => props.getMatchTask(props.task.id)}>
        <h3 className="task_title">{props.task.name}</h3>
        <p className="task_sentence">{props.task.explanation}</p>
      </div>
      <div className="task_input_contents">
        <Select />
      </div>
    </div>
  );
};