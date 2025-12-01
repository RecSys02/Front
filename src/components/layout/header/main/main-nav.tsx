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
  onChange: (locale: Locale) => void;
};

const MainNav = ({ locale, onChange }: Props) => {
  return (
    <Row className="w-full items-center h-22.5 px-15 mobile:hidden">
      <LogoContainer />
      <Row className="gap-10">
        <NavigationMenu className="flex-1 flex justify-center ">
          <NavigationMenuList className="flex flex-row">
            <HomeMenuItem className="px-9" />
            <AIMenuItem className="px-9" />
            <HotMenuItem className="px-9" />
            <PlanMenuItem className="px-9" />
          </NavigationMenuList>
        </NavigationMenu>
        <ETCContainer locale={locale} onChange={onChange} />
      </Row>
    </Row>
  );
};

export default MainNav;
