import { Outlet } from "@tanstack/react-router";
import { ModelProvider } from "./model.provider";
import { ModelHistoryStore } from "@/stores/model-history.store";
import { ModelStore } from "@/stores/model.store";
import { useEffect } from "react";
import { ModelInputStore } from "@/stores/model-input.store";

const ModelLayout = () => {
  useEffect(() => {
    return () => {
      ModelStore.actions.clear();
      ModelHistoryStore.actions.clearHistoryPlaces();
      ModelInputStore.actions.clearModelInput();
    };
  }, []);
  return (
    <ModelProvider>
      <Outlet />
    </ModelProvider>
  );
};

export default ModelLayout;
