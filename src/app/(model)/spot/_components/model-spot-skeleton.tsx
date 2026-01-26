import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar/sidebar";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { cn } from "@/libs/utils";

const ModelSpotSkeleton = () => {
  return (
    <SidebarProvider open onOpenChange={() => {}}>
      <div className="h-dvh w-dvw overflow-hidden">
        <Sidebar
          side="right"
          collapsible="offcanvas"
          className={cn("border-l z-40 [--sidebar-width:400px]")}
        >
          <Column className="h-full px-6 py-5 gap-6">
            <Skeleton className="h-7 w-35" />

            <Column className="gap-4">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </Column>

            <div className="mt-auto">
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </Column>
        </Sidebar>

        <SidebarInset className="relative h-full w-full">
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <Column className="items-center gap-4">
              <Row className="items-center justify-center gap-3">
                <Spinner />
                <div className="text-base font-medium text-gray-700">
                  AI가 여행지를 고르고 있어요
                </div>
              </Row>
              <div className="text-sm text-gray-500">
                취향을 반영해 추천 중입니다
              </div>
            </Column>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModelSpotSkeleton;
