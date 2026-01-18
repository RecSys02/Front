import { useMemo, useState } from "react";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { usePlanList } from "@/hooks/plan.hook";
import PreviewCard from "./_components/privew-card";
import { Button } from "@/components/common/button/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";

type SortKey = "default" | "popular";

const PAGE_SIZE = 12;

const PlanPage = () => {
  const { data: contents } = usePlanList();

  const [sort, setSort] = useState<SortKey>("default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sorted = useMemo(() => {
    const list = contents ?? [];
    if (sort === "popular") return list;
    return list;
  }, [contents, sort]);

  const visible = useMemo(
    () => sorted.slice(0, visibleCount),
    [sorted, visibleCount]
  );

  const hasMore = visibleCount < (sorted?.length ?? 0);

  const handleChangeSort = (next: SortKey) => {
    setSort(next);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <Column className="flex-1">
      <Column className="w-full max-w-274 mx-auto px-6 py-12 gap-8">
        <Row className="justify-between items-center pl-4">
          <Tabs
            value={sort}
            onValueChange={(v) => handleChangeSort(v as SortKey)}
          >
            <TabsList className="h-11 rounded-full px-1">
              <TabsTrigger
                value="default"
                className="h-9 rounded-full px-6 text-base cursor-pointer data-[state=active]:bg-[#1A6E3D] data-[state=active]:text-white"
              >
                최신순
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                disabled
                className="h-9 rounded-full px-6 text-base cursor-pointer data-[state=active]:bg-[#1A6E3D] data-[state=active]:text-white"
              >
                인기순
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Row>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 justify-items-center">
          {visible.map((content, idx) => (
            <PreviewCard key={`${content.name}-${idx}`} content={content} />
          ))}
        </div>

        {hasMore && (
          <Row className="justify-center pt-2">
            <Button
              variant="outline"
              className="w-29 h-11 rounded-3xl text-body2 border-gray-500 fc-gray-800"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            >
              더보기
              <PlusIcon />
            </Button>
          </Row>
        )}
      </Column>
    </Column>
  );
};

export default PlanPage;
