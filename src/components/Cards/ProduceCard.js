import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProduces } from "../../store/produce/selectors";
import { fetchAllProduces } from "../../store/produce/actions";

export default function ProduceCard() {
  const dispatch = useDispatch();
  const allProduces = useSelector(selectAllProduces);

  useEffect(() => {
    dispatch(fetchAllProduces());
  }, [dispatch]);
  return (
    <div>
      {allProduces.map((eachProduce) => {
        return (
          <div
            key={eachProduce.id}
            style={{ border: "1px solid", padding: "20px", margin: "10px" }}
          >
            <h3>{eachProduce.name}</h3>
            <img
              src={eachProduce.imageUrl}
              alt={eachProduce.name}
              style={{ height: "200px" }}
            ></img>
          </div>
        );
      })}
    </div>
  );
}
