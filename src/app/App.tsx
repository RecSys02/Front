import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen overflow-x-auto">
        <div className="min-h-screen flex flex-col w-[1920px] mx-auto">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default App;
