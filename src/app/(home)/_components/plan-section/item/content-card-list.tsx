import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { usePopular } from "@/hooks/plan.hook";
import ContentCard from "./content-card";
import { Spinner } from "@/components/ui/spinner";
import { Border } from "@/components/ui/border";
import { Fragment } from "react/jsx-runtime";
import Body from "@/components/text/body";
import Heading from "@/components/text/heading";

const ContentCardList = () => {
  const { data, isPending } = usePopular();
  const contents = data ?? [];

  const columns = [
    [contents[0], contents[3]],
    [contents[1], contents[4]],
    [contents[2], contents[5]],
  ].map((col) => col.filter(Boolean));

  return (
    <Row className="w-full px-11">
      {isPending ? (
        <Row className="w-full justify-center py-10">
          <Spinner />
        </Row>
      ) : contents.length === 0 ? (
        <Column className="w-full py-20 items-center justify-center gap-2 min-h-100">
          <Heading variant="heading2" className="fc-gray-500">
            아직 인기 여행 플랜이 없습니다.
          </Heading>
          <Body variant="body1" className="fc-gray-400">
            첫 번째 여행 플랜의 주인공이 되어보세요.
          </Body>
        </Column>
      ) : (
        <>
          <Column className="flex-1">
            {columns[0].map((content, idx) => (
              <Fragment key={`${content.name}-${idx}`}>
                {idx > 0 && <Border className="w-1/8 ml-auto" />}
                <ContentCard content={content} />
              </Fragment>
            ))}
          </Column>

          <Border direction="vertical" className="mt-20" />

          <Column className="flex-1">
            {columns[1].map((content, idx) => (
              <Fragment key={`${content.name}-${idx}`}>
                {idx > 0 && <Border className="w-1/8 ml-auto" />}
                <ContentCard content={content} />
              </Fragment>
            ))}
          </Column>

          <Border direction="vertical" className="mt-20" />

          <Column className="flex-1">
            {columns[2].map((content, idx) => (
              <Fragment key={`${content.name}-${idx}`}>
                {idx > 0 && <Border className="w-1/8 ml-auto" />}
                <ContentCard content={content} />
              </Fragment>
            ))}
          </Column>
        </>
      )}
    </Row>
  );
};

export default ContentCardList;
