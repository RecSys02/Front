import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { usePopular } from "@/hooks/plan.hook";
import ContentCard from "./content-card";
import { Spinner } from "@/components/ui/spinner";
import { Border } from "@/components/ui/border";
import { Fragment } from "react/jsx-runtime";

const ContentCardList = () => {
  const { data, isLoading } = usePopular();
  const contents = data ?? [];
  const columns = [
    [contents[0], contents[3]],
    [contents[1], contents[4]],
    [contents[2], contents[5]],
  ].map((col) => col.filter(Boolean));

  return (
    <Row className="w-full px-11">
      {isLoading ? (
        <Row className="w-full justify-center py-10">
          <Spinner />
        </Row>
      ) : (
        <>
          <Column className="flex-1">
            {columns[0].map((content, idx) => (
              <Fragment key={`${content.title}-${idx}`}>
                {idx > 0 && <Border className="w-1/8 ml-auto" />}
                <ContentCard content={content} />
              </Fragment>
            ))}
          </Column>

          <Border direction="vertical" className="mt-20" />

          <Column className="flex-1">
            {columns[1].map((content, idx) => (
              <Fragment key={`${content.title}-${idx}`}>
                {idx > 0 && <Border className="w-1/8 ml-auto" />}
                <ContentCard content={content} />
              </Fragment>
            ))}
          </Column>

          <Border direction="vertical" className="mt-20" />

          <Column className="flex-1">
            {columns[2].map((content, idx) => (
              <Fragment key={`${content.title}-${idx}`}>
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
