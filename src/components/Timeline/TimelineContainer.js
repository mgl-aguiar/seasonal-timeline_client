import React from "react";
import { useSelector } from "react-redux";
import Produces from "./Produces";
import "./timeline.css";

import { selectAllProduces } from "../../store/produce/selectors";

export default function TimelineContainer() {
  const produces = useSelector(selectAllProduces);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="scrollableContainer">
      <Produces />
      <div className="monthGrid">
        {months.map((eachMonth, index) => {
          return (
            <div
              key={index}
              className="monthGridItem"
              style={{ height: `${produces.length * 80 + 30}px` }}
            >
              <p>{eachMonth}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
