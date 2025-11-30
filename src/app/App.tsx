import Header from "@/components/layout/header/Header";
import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default App;
