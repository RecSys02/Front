import { Outlet } from "@tanstack/react-router";
import Header from "@/components/layout/header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default App;
