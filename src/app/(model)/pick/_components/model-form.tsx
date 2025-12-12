import { Border } from "@/components/ui/border";
import ModelFormHeader from "./model-form-header";
import { CustomForm } from "@/components/ui/form/custom-form";
import Column from "@/components/common/container/column";
import { generateModelFormItems } from "./model-form.item";
import { useNavigate } from "@tanstack/react-router";
import { ModelFormValues } from "./model-form.type";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

const ModelForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<ModelFormValues>({
    region: {
      province: "",
      district: "",
    },
    companion: null,
    address: null,
    budget: "",
  });
  const isValid = values.budget !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    //TODO: call model api and save context
    navigate({ to: ROUTES.ModelSpot });
  };

  const items = generateModelFormItems(values, setValues);
  return (
    <Column className="max-w-md">
      <ModelFormHeader />
      <Border className="mt-4 mb-4 " />
      <CustomForm
        values={values}
        setValues={setValues}
        items={items}
        onSubmit={handleSubmit}
        isValid={isValid}
        submitLabel={"추천 생성"}
      />
    </Column>
  );
};

export default ModelForm;
