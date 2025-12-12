import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";

const ModelFormHeader = () => {
  return (
    <Column className="gap-1">
      <Row className="gap-4 items-center">
        <Body className="font-bold">태그 선택</Body>
      </Row>
      <Body variant="body3" className="text-gray-500">
        장소 개인화 추천을 위한 태그를 선택해주세요.
      </Body>
    </Column>
  );
};

export default ModelFormHeader;
