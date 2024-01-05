import { useContext } from "react";
import { ActivityContext } from "../Context/ActivityContext";

const useActivityContext = () => useContext(ActivityContext);

export { useActivityContext };
