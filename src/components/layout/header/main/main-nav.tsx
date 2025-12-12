import Row from "@/components/common/container/row";

import ETCContainer from "./item/etc-container";
import LogoContainer from "./item/logo-container";
import { Locale } from "@/constants/types";
import HeaderMenuItem from "./item/header-menu-item";
import { useLocation } from "@tanstack/react-router";
import { HEADER_MENU_ITEMS } from "./item/menu-items";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu/navigation-menu";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const MainNav = ({ locale, onChange }: Props) => {
  const { pathname } = useLocation();

  return (
    <Row className="w-full items-center h-22.5 px-15">
      <LogoContainer />
      <Row className="items-center pl-64">
        <NavigationMenu className="flex flex-1 justify-center">
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
      </Row>
      <ETCContainer locale={locale} onChange={onChange} />
    </Row>
  );
};

export default MainNav;
