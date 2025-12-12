import Column from "@/components/common/container/column";
import Title from "@/components/text/title";
import ModelForm from "./_components/model-form";

const ModelContextPage = () => {
  return (
    <Column className="pt-30 pb-30 px-40 items-center w-200 mx-auto">
      <Title className="mb-20 w-full text-center font-extrabold">AI 추천</Title>
      <ModelForm />
    </Column>
  );
};

export default ModelContextPage;
