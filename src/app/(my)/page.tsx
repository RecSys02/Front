import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import ProfileHeading from "./_components/my-heading"
import ProfileSection from "./_components/profile-section/profile-section";
import MyPlanSection from "./_components/myplan-section/myplan-section";


const Mypage = () => {
  return(
    <Column className="items-center">
      <Column className="w-fit items-start">
        <ProfileHeading />
        <Row className="justify-center gap-9 pt-10 pb-20">
          <ProfileSection />
          <MyPlanSection/>
        </Row>
      </Column>
    </Column>
  );
};

export default Mypage;