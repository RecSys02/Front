import Row from "@/components/common/container/row";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import AIMenuItem from "./item/ai-menu-item";
import ETCContainer from "./item/etc-container";
import HomeMenuItem from "./item/home-menu-item";
import HotMenuItem from "./item/hot-menu-item";
import LogoContainer from "./item/logo-container";
import PlanMenuItem from "./item/plan-menu-item";
import { Locale } from "@/constants/types";

type Props = {
  locale: Locale;
  userName: string;
  onChange: (locale: Locale) => void;
};

const MainNav = ({ locale, userName, onChange }: Props) => {
  return (
    <Row className="w-full items-center h-[90px] px-[60px] justify-between mobile:hidden">
      <LogoContainer />
      <NavigationMenu className="flex-1 flex justify-center ">
        <NavigationMenuList className="flex flex-row">
          <HomeMenuItem className="px-[35px]" />
          <AIMenuItem className="px-[35px]" />
          <HotMenuItem className="px-[35px]" />
          <PlanMenuItem className="px-[35px]" />
        </NavigationMenuList>
      </NavigationMenu>
      <ETCContainer userName={userName} locale={locale} onChange={onChange} />
    </Row>
  );
};

export default MainNav;
