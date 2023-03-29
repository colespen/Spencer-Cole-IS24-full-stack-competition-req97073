import { useEffect, useState } from "react";

const usePrevId = (currId) => {
  const [prev, setPrev] = useState(
    JSON.parse(localStorage.getItem("prevId")) || null
  );

  useEffect(() => {
    localStorage.setItem("prevId", JSON.stringify(currId));
  }, [currId]);

  // useEffect(() => {
  //   const id = JSON.parse(localStorage.getItem("prevId"));
  //   setPrevId(id);
  // }, []);

  return prev;
};

export { usePrevId };