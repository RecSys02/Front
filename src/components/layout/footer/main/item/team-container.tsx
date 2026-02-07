import Column from "@/components/common/container/column";
import TextBoxContainer from "./text-box-container";
import Row from "@/components/common/container/row";

const TeamContainer = () => {
  return (
    <Column>
      <Row>
        <TextBoxContainer>네이버 부스트캠프 AI tech 8기 </TextBoxContainer>
        <TextBoxContainer> 도메인 : 추천시스템</TextBoxContainer>
      </Row>
      <Row>
        <TextBoxContainer>프론트 : 임치현T8170, 정하나T8186</TextBoxContainer>
        <TextBoxContainer>서버 : 김민회T8029, 박새결T8073</TextBoxContainer>
        <TextBoxContainer bar={false}>
          AI : 김진우T8053, 박재현T8080
        </TextBoxContainer>
      </Row>
    </Column>
  );
};

export default TeamContainer;
