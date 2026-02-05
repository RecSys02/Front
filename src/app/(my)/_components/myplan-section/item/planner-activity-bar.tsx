import { useLayoutEffect, useRef, useState } from "react";
import Body from "@/components/text/body";
import { Activity } from "@/types/plan/plan.type";

type Props = Activity & {
  planStart: number;
  planEnd: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  TOURSPOT: "bg-[#CBE1B9]",
  RESTAURANT: "bg-[#FFDABE]",
  CAFE: "bg-[#FFECBC]",
};

const parseTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
};

const getLeftPercent = (
  start: string,
  planStart: number,
  totalHours: number,
) => {
  return ((parseTime(start) - planStart) / totalHours) * 100;
};

const getWidthPercent = (start: string, end: string, totalHours: number) => {
  return ((parseTime(end) - parseTime(start)) / totalHours) * 100;
};

const ActivityBar = ({
  name,
  startTime,
  endTime,
  category,
  planStart,
  planEnd,
}: Props) => {
  const totalHours = planEnd - planStart;
  const left = getLeftPercent(startTime, planStart, totalHours);
  const width = getWidthPercent(startTime, endTime, totalHours);

  const textRef = useRef<HTMLSpanElement | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [hover, setHover] = useState(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const check = () => setIsOverflow(el.scrollWidth > el.clientWidth);
    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const showTooltip = hover && isOverflow;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${left}%`,
        width: `${width}%`,
        top: "100%",
        transform: "translateY(-80%)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full">
        <Body variant="body3" className="mb-1 text-xs font-medium">
          <span
            ref={textRef}
            className="block w-full overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {name}
          </span>
        </Body>

        {showTooltip && (
          <div className="absolute left-0 bottom-full mb-2 z-10000">
            <div className="rounded-md border bg-white px-3 py-2 text-xs font-medium text-black shadow-md whitespace-nowrap">
              {name}
            </div>
          </div>
        )}
      </div>

      <div className={`${CATEGORY_COLORS[category]} h-3 rounded-full`} />
    </div>
  );
};

export default ActivityBar;
