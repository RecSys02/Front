import { Outlet } from "@tanstack/react-router";
import { ModelProvider } from "./model.provider";

const ModelLayout = () => {
  return (
    <ModelProvider>
      <Outlet />
    </ModelProvider>
  );
};

export default ModelLayout;
