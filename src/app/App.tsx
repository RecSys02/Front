import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col w-full max-w-[1920px] mx-auto">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <div className="w-full max-w-[1920px] mx-auto">
        <Footer />
      </div>
    </>
  );
};
export default App;
