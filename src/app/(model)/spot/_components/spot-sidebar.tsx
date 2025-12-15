import Column from "@/components/common/container/column";
import type { Place } from "../../model.type";
import { SidebarHeader, SidebarContent } from "@/components/ui/sidebar/sidebar";
import SpotSidebarItem from "./spot-sidebar-item";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";

type Props = {
  places: Place[];
  selectedPlaces: Place[];
  activePlaceId: string | null;
  onFocusPlace: (id: string | null) => void;
};

const SpotSidebar = ({
  places,
  selectedPlaces,
  activePlaceId,
  onFocusPlace,
}: Props) => {
  return (
    <>
      <SidebarHeader className="flex items-center justify-between border-b px-3 py-4 bg-white">
        <Body className="font-semibold">AI 추천 장소</Body>
      </SidebarHeader>

      <SidebarContent className="h-full  bg-white">
        <Column className="gap-0">
          {places.map((p, idx) => (
            <>
              <SpotSidebarItem
                key={p.id}
                place={p}
                isActive={p.id === activePlaceId}
                isSelected={selectedPlaces.some((x) => x.id === p.id)}
                onFocus={onFocusPlace}
              />
              {idx < places.length - 1 && <Border />}
            </>
          ))}
        </Column>
      </SidebarContent>
    </>
  );
};

export default SpotSidebar;
