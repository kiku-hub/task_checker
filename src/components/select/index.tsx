import React from "react";
import { GenreType } from "../../interfaces/GenreType";
import "./style.css";

interface Props {
  genres?: GenreType[];
  changeSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const renderOption = (props: Props) => {
  return (
    props.genres &&
    props.genres.map((genre: GenreType) => (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    ))
  );
};

export const Select = (props: Props) => {
  return (
    <select className="select" onChange={props.changeSelect}>
      {props.genres !== undefined && <option value={0}></option>}
      {renderOption(props)}
    </select>
  );
};