import { tsr } from "@/apis/client/ts-rest/client";
import { useQuery } from "@tanstack/react-query";
import { AuthStore } from "@/stores/auth.store";

const { getAccessToken } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useUser = () => {
  const enabled = !!getAccessToken();

  const real = tsr.user.me.useQuery({
    queryKey: ["me"],
    enabled: enabled && !IS_MOCK,
  });

  const mock = useQuery({
    queryKey: ["me"],
    enabled: enabled && IS_MOCK,
    queryFn: async () => ({
      userName: "MOCKUSER",
      userImg: null,
    }),
  });

  return IS_MOCK ? mock : real;
};
