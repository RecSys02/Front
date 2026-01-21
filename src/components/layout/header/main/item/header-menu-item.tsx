import Row from "@/components/common/container/row";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu/navigation-menu";
import { DotIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
      <NavigationMenuLink asChild>
        <Link
          to={routeLink as any}
          className={`text-body1 text-center ${
            isActive ? "font-semibold" : "font-normal"
          }`}
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
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default HeaderMenuItem;
