import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu/navigation-menu";
import { ROUTES } from "@/constants/routes";

const PlanMenuItem = ({ className }: { className?: string }) => {
  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuLink
        className="text-body1 font-normal text-center"
        href={ROUTES.Plan}
      >
        PLAN
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default PlanMenuItem;
