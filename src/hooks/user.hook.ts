import { apiClient } from "@/apis/client/ts-rest/client";
import { useQuery } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      if (IS_MOCK) {
        return {
          status: 200,
          body: {
            username: "임치현",
          },
        };
      }
      return apiClient.user.me.query();
    },
  });
};
