import { FormItemConfig, ShowIfCondition } from "./form.type";

export const shouldShow = <TValues>(
  item: FormItemConfig<TValues>,
  values: TValues
): boolean => {
  if (!item.showIf || item.showIf.length === 0) return true;

  return item.showIf.every((cond: ShowIfCondition<TValues>) => {
    if ("condition" in cond) return !!cond.condition;

    const current = values[cond.key];
    return current === cond.value;
  });
};
