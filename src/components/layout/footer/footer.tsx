import { Border } from "@/components/ui/border";
import MainFooter from "./main/main-footer";

const Footer = () => {
  return (
    <footer className="bg-white w-full">
      <Border className="mb-10 w-full" />
      <div className="px-70 py-13">
        <MainFooter />
      </div>
    </footer>
  );
};

export default Footer;
