import React from "react";
import "./style.css"

export const Select = () => {
  return (
    <select className="select">
      <option value={0}>0</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
    </select>
  );
};