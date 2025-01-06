import { useEffect } from "react";
import { seedDB } from "../api/seed";

const useInitialize = () => {
  useEffect(() => {
    seedDB();
  }, []);
};

export default useInitialize;
