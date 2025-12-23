import Column from "@/components/common/container/column";
import type { Place, PlaceCategory } from "../../model.type";
import { SidebarHeader, SidebarContent } from "@/components/ui/sidebar/sidebar";
import SpotSidebarItem from "./spot-sidebar-item";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/common/button/button";

type Props = {
  category: PlaceCategory;
  onChangeCategory: (c: PlaceCategory) => void;
  places: Place[];
  selectedPlaces: Place[];
  activePlaceId: number | null;
  onFocusPlace: (id: number | null) => void;
};

const SpotSidebar = ({
  category,
  onChangeCategory,
  places,
  selectedPlaces,
  activePlaceId,
  onFocusPlace,
}: Props) => {
  return (
    <>
      <SidebarHeader className="border-b px-3 py-4 bg-white">
        <Column className="gap-3">
          <Body className="font-semibold text-center">AI 추천 장소</Body>

          <Tabs
            value={category}
            onValueChange={(v) => onChangeCategory(v as PlaceCategory)}
          >
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="tourspot">관광지</TabsTrigger>
              <TabsTrigger value="restaurant">음식점</TabsTrigger>
              <TabsTrigger value="cafe">카페</TabsTrigger>
            </TabsList>
          </Tabs>
        </Column>
      </SidebarHeader>

      <SidebarContent className="h-full bg-white">
        <Column className="gap-0">
          {places.map((p, idx) => (
            <Column key={p.id} className="gap-0">
              <SpotSidebarItem
                place={p}
                isActive={p.id === activePlaceId}
                isSelected={selectedPlaces.some((x) => x.id === p.id)}
                onFocus={(id) => onFocusPlace(id)}
              />
              {idx < places.length - 1 && <Border />}
            </Column>
          ))}
        </Column>

        <Button className="fixed bottom-0">ss</Button>
      </SidebarContent>
    </>
  );
};

export default SpotSidebar;
