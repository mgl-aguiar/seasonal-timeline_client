import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchProduceDetails } from "../store/produce/actions";
import { selectProduceDetails } from "../store/produce/selectors";

export default function ProduceDetails() {
  const dispatch = useDispatch();
  const { produceId } = useParams();

  const produceDetails = useSelector(selectProduceDetails);

  useEffect(() => {
    dispatch(fetchProduceDetails(produceId));
  }, []);
  return <div>{produceDetails.name}</div>;
}
