import { useMediaQuery } from "react-responsive";

const useMobileMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 768px)" });

export default useMobileMediaQuery;
