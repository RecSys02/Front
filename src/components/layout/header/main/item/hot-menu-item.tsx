import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu/navigation-menu";
import { ROUTES } from "@/constants/routes";

const HotMenuItem = ({ className }: { className?: string }) => {
  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuLink
        className="text-body1 font-normal text-center"
        href={ROUTES.Hot}
      >
        HOT
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default HotMenuItem;
