import React from "react";
import Produces from "./Produces";
import "../../style/timeline.css";

export default function TimelineContainer() {
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
            <div key={index} className="monthGridItem">
              <p>{eachMonth}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
