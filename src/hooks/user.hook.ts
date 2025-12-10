import { apiClient } from "@/apis/client/ts-rest/client";
import { useQuery } from "@tanstack/react-query";
import { AuthStore } from "@/stores/auth.store";

const { getAccessToken } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    enabled: !!getAccessToken(),
    queryFn: async () => {
      if (IS_MOCK) {
        return {
          username: "홍길동",
        };
      }

      const res = await apiClient.user.me.query();
      return res.body;
    },
  });
};
