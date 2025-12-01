import Column from "@/components/common/container/column";
import Heading from "@/components/text/heading";
import { Pill } from "@/components/ui/pill";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";
import leafPng from "@/assets/leaf.png";

const TitleBox = () => {
  return (
    <Column className="pr-23 w-fit flex justify-start">
      <Pill iconSrc={leafPng} className="text-body2 w-fit">
        고민은 뒤로, 오늘은 여행
      </Pill>
      <Heading className="whitespace-pre-wrap w-94 pt-13 pb-6 fc-gray-800 leading-13!">
        나만의 여유로운 여행{""}
        어슬렁
      </Heading>
      <Link to={ROUTES.AI} className="text-body3 font-light underline">
        자세히 보기
      </Link>
    </Column>
  );
};

export default TitleBox;
