import { useEffect } from "react";
import { seedDB } from "../mock-adaptor/seed";

const useInitialize = () => {
  useEffect(() => {
    seedDB();
  }, []);
};

export default useInitialize;
