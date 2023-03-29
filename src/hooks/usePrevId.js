// import { useEffect, useRef } from "react";

// const usePrevId = (currId) => {
//   const prevIdRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem("prevId", JSON.stringify(currId));
//     prevIdRef.current = currId;
//   }, [currId]);

//   useEffect(() => {
//     prevIdRef.current = JSON.parse(localStorage.getItem("prevId"));
//   }, []);

//   return prevIdRef.current;
// };

// export { usePrevId };