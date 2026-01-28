import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { ImageBox } from "@/components/common/container/image-box";
import Body from "@/components/text/body";
import { MapPin, ChevronLeft, ChevronRight, Clock3, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge/badge";
import Placeholder from "@/assets/banners/placeholder.png";
import { Button } from "@/components/common/button/button";
import { useReadPlace } from "@/hooks/place.hook";
import { cn } from "@/libs/utils";
import { Spinner } from "@/components/ui/spinner";
import { CATEGORY_LABEL } from "@/constants/types";
import MetaItem from "@/components/ui/meta-item";

type Props = {
  placeId: number;
  category: string;
  province: string;
  index?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

const PlaceSlide = ({
  placeId,
  category,
  province,
  index,
  total,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) => {
  const {
    data: place,
    isLoading,
    isError,
  } = useReadPlace(placeId, { category, province });

  const imageSrc =
    place?.images && place.images.length > 0 ? place.images[0] : Placeholder;

  const showIndex =
    typeof index === "number" && typeof total === "number" && total > 0;

  const categoryLabel = place?.category
    ? (CATEGORY_LABEL[String(place.category).toUpperCase()] ??
      String(place.category))
    : null;

  return (
    <Column className="rounded-lg border overflow-hidden h-full flex flex-col">
      <Column className="relative w-full h-fit shrink-0 overflow-hidden">
        <ImageBox src={imageSrc} className="w-full h-156" fit="cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/35 to-transparent" />

        {showIndex && (
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-medium text-white">
              {index! + 1}/{total}
            </span>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 grid place-items-center bg-black/10">
            <Spinner className="size-10" />
          </div>
        )}
      </Column>

      <Column className="p-4 gap-3 flex-1 min-h-0 overflow-y-auto">
        <Row className="items-center gap-2">
          <Button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className={cn(
              "h-8 w-8 grid place-items-center rounded-md bg-transparent p-0",
              "disabled:opacity-30",
            )}
          >
            <ChevronLeft className="size-5 text-gray-600" />
          </Button>

          <Body
            variant="body1"
            className="flex-1 font-semibold line-clamp-2 text-center"
          >
            {place?.name ??
              (isError ? "장소 정보를 불러오지 못했습니다." : " ")}
          </Body>

          <Button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={cn(
              "h-8 w-8 grid place-items-center rounded-md bg-transparent p-0",
              "disabled:opacity-30",
            )}
          >
            <ChevronRight className="size-5 text-gray-600" />
          </Button>
        </Row>

        {(place?.address || categoryLabel || place?.duration) && (
          <div className="grid w-full grid-cols-[1fr_auto] items-center gap-3">
            <Row className="items-center gap-1 min-w-0">
              {place?.address && (
                <>
                  <MapPin className="size-4 shrink-0 text-gray-400" />
                  <Body variant="body3" className="fc-gray-500 truncate">
                    {place.address}
                  </Body>
                </>
              )}
            </Row>

            <div className="flex items-center gap-2">
              {categoryLabel && (
                <div className="shrink-0">
                  <MetaItem
                    icon={<Tag className="size-4" />}
                    label="유형"
                    value={categoryLabel}
                  />
                </div>
              )}
              {place?.duration && (
                <div className="shrink-0">
                  <MetaItem
                    icon={<Clock3 className="size-4" />}
                    label="소요"
                    value={place.duration}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {place?.keywords && place.keywords.length > 0 && (
          <Row className="flex-wrap gap-1">
            {place.keywords.slice(0, 6).map((k) => (
              <Badge
                key={k}
                className="px-3 py-0.5 text-[14px] font-normal fc-gray-700 bg-gray-50"
              >
                #{k}
              </Badge>
            ))}
          </Row>
        )}

        {place?.description && (
          <div className="w-full h-full flex items-center">
            <Body
              variant="body2"
              className="fc-gray-600 whitespace-pre-line line-clamp-3 text-center w-full"
            >
              {place.description}
            </Body>
          </div>
        )}
      </Column>
    </Column>
  );
};

export default PlaceSlide;
