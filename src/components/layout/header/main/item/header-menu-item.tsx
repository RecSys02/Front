import Row from "@/components/common/container/row";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu/navigation-menu";
import { DotIcon } from "lucide-react";

type Props = {
  className?: string;
  menuName: string;
  routeLink: string;
  isActive?: boolean;
};

const HeaderMenuItem = ({
  className,
  menuName,
  routeLink,
  isActive = false,
}: Props) => {
  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuLink
        className={`text-body1 text-center ${
          isActive ? "font-semibold" : "font-normal"
        }`}
        href={routeLink}
      >
        <Row className="relative inline-flex items-center">
          {menuName}
          {isActive && (
            <DotIcon
              strokeWidth={5}
              className="absolute -top-1 left-full ml-0.5"
            />
          )}
        </Row>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default HeaderMenuItem;
