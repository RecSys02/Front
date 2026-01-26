import { Outlet, useNavigate } from "@tanstack/react-router";
import { ModelProvider } from "./model.provider";
import { ModelHistoryStore } from "@/stores/model-history.store";
import { ModelStore } from "@/stores/model.store";
import { useEffect } from "react";
import { ModelInputStore } from "@/stores/model-input.store";
import { useUser } from "@/hooks/user.hook";
import { AuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/constants/routes";

const ModelLayout = () => {
  const navigate = useNavigate();

  const { data: user, isLoading, isError, error } = useUser();

  useEffect(() => {
    if (!AuthStore.actions.getAccessToken()) {
      navigate({ to: ROUTES.Login, replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!isError) return;
    AuthStore.actions.clear();
    navigate({ to: ROUTES.Login, replace: true });
  }, [isError, navigate, error]);

  useEffect(() => {
    return () => {
      ModelStore.actions.clear();
      ModelHistoryStore.actions.clearHistoryPlaces();
      ModelInputStore.actions.clearModelInput();
    };
  }, []);

  if (AuthStore.actions.getAccessToken() && isLoading) {
    return null;
  }

  if (!user) return null;

  return (
    <ModelProvider>
      <Outlet />
    </ModelProvider>
  );
};

export default ModelLayout;
