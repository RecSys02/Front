import Column from "@/components/common/container/column";
import type { Place } from "../../model.type";
import { SidebarHeader, SidebarContent } from "@/components/ui/sidebar/sidebar";
import SpotSidebarItem from "./spot-sidebar-item";
import Body from "@/components/text/body";

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
      <SidebarHeader className="flex items-center justify-between border-b px-3 py-4">
        <Body variant="body1" className="font-semibold">
          AI 추천 장소
        </Body>
      </SidebarHeader>

      <SidebarContent className="h-full p-2">
        <Column className="gap-2">
          {places.map((p) => (
            <SpotSidebarItem
              key={p.id}
              place={p}
              isActive={p.id === activePlaceId}
              isSelected={selectedPlaces.some((x) => x.id === p.id)}
              onFocus={(id) => onFocusPlace(id)}
            />
          ))}
        </Column>
      </SidebarContent>
    </>
  );
};

export default SpotSidebar;
