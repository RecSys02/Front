import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;
