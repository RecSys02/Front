import { useContext } from "react";
import { ModelContext } from "./model.context";

export const useModelContext = () => {
  const ctx = useContext(ModelContext);
  if (!ctx) {
    throw new Error("useModelContext must be used within ModelProvider");
  }
  return ctx;
};
