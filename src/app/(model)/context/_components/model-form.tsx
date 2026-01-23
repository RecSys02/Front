import { Border } from "@/components/ui/border";
import ModelFormHeader from "./model-form-header";
import { CustomForm } from "@/components/ui/form/custom-form";
import Column from "@/components/common/container/column";
import { generateModelFormItems } from "./model-form.item";
import { useNavigate } from "@tanstack/react-router";
import type { ModelFormValues } from "./model-form.type";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { useModel } from "@/hooks/model.hook";
import { useModelContext } from "../../model.hook";
import { ModelInputStore } from "@/stores/model-input.store";
import { ModelResponseDto } from "@/types/model/model.type";

const DEFAULT_VALUES: ModelFormValues = {
  region: {
    province: "",
    district: "",
  },
  companion: null,
  address: null,
  budget: "",
  dateRange: { from: null, to: null },
};

const ModelForm = () => {
  const navigate = useNavigate();
  const model = useModel();
  const { setModelResult, resetSession } = useModelContext();

  const persisted = ModelInputStore.actions.getModelInput();

  const [values, setValues] = useState<ModelFormValues>(
    persisted ?? DEFAULT_VALUES,
  );

  const setPersistedValues = (next: React.SetStateAction<ModelFormValues>) => {
    setValues((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      ModelInputStore.actions.setModelInput(resolved);
      return resolved;
    });
  };

  const isValid =
    values.region.province !== "" &&
    values.region.district !== "" &&
    values.budget !== "" &&
    values.dateRange.from !== null &&
    values.dateRange.to !== null;

  const handleSubmit = () => {
    if (!isValid || model.isPending) return;

    resetSession({ clearInput: false });

    const region = `${values.region.province} ${values.region.district}`.trim();

    const payload = {
      region,
      companion: values.companion ?? undefined,
      budget: values.budget,
      selectedPlaces: [],
      historyPlaces: [],
    };

    model.mutate(
      { body: payload },
      {
        onSuccess: (res: any) => {
          const dto = (res?.body ?? res) as ModelResponseDto;
          setModelResult(dto);
          navigate({ to: ROUTES.ModelSpot });
        },
      },
    );
  };

  const items = generateModelFormItems(values, setPersistedValues);

  return (
    <Column className="max-w-md">
      <ModelFormHeader />
      <Border className="mt-4 mb-4" />
      <CustomForm
        values={values}
        setValues={setPersistedValues}
        items={items}
        onSubmit={handleSubmit}
        isValid={isValid}
        submitLabel={"추천 생성"}
      />
    </Column>
  );
};

export default ModelForm;
