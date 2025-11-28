import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu/navigation-menu";
import { ROUTES } from "@/constants/routes";

const HomeMenuItem = ({ className }: { className?: string }) => {
  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuLink
        className="text-body1 font-normal text-center"
        href={ROUTES.Home}
      >
        홈
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default HomeMenuItem;
