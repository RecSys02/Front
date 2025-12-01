import Row from "@/components/common/container/row";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import ETCContainer from "./item/etc-container";
import LogoContainer from "./item/logo-container";
import { Locale } from "@/constants/types";
import HeaderMenuItem from "./item/header-menu-item";
import { useLocation } from "@tanstack/react-router";
import { HEADER_MENU_ITEMS } from "./item/menu-items";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const MainNav = ({ locale, onChange }: Props) => {
  const { pathname } = useLocation();

  return (
    <Row className="w-full items-center h-22.5 px-15 mobile:hidden">
      <LogoContainer />
      <Row className="gap-10">
        <NavigationMenu className="flex-1 flex justify-center">
          <NavigationMenuList className="flex flex-row">
            {HEADER_MENU_ITEMS.map((item) => (
              <HeaderMenuItem
                key={item.key}
                className="px-9"
                menuName={item.menuName}
                routeLink={item.routeLink}
                isActive={pathname === item.routeLink}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ETCContainer locale={locale} onChange={onChange} />
      </Row>
    </Row>
  );
};

export default MainNav;
