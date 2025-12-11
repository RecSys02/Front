import { CircleUserRoundIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Column from "@/components/common/container/column";
import { Button } from "@/components/common/button/button";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import { useSignout } from "@/hooks/auth.hook";

type UserMenuProps = {
  isLoggedIn: boolean;
};

const UserMenu = ({ isLoggedIn }: UserMenuProps) => {
  const navigate = useNavigate();
  const signout = useSignout();

  return (
    <HoverCard openDelay={0} closeDelay={120}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center">
          <CircleUserRoundIcon
            className="h-7.5 w-auto"
            color="gray"
            strokeWidth={1.0}
            onClick={() => navigate({ to: ROUTES.My })}
          />
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="center"
        className="w-36 p-0 border rounded bg-white shadow-md"
      >
        <Column className="flex flex-col">
          <Button
            onClick={
              isLoggedIn
                ? () => navigate({ to: ROUTES.My })
                : () => navigate({ to: ROUTES.Login })
            }
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-center"
          >
            마이페이지
          </Button>
          {isLoggedIn ? (
            <Button
              onClick={() => signout.mutate()}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-center text-red-500"
            >
              로그아웃
            </Button>
          ) : (
            <Button
              onClick={() => navigate({ to: ROUTES.Login })}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-center"
            >
              로그인
            </Button>
          )}
        </Column>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserMenu;
