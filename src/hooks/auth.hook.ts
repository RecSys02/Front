import { apiClient } from "@/apis/client/ts-rest/client";
import { useMutation } from "@tanstack/react-query";

type SigninArgs = {
  username: string;
  password: string;
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async ({ username, password }: SigninArgs) => {
      if (import.meta.env.DEV) {
        console.log("MOCK SIGNIN", username, password);
        return {
          status: 200,
          body: {
            name: `MOCK-${username}`,
            id: 9999,
          },
        };
      }
      return apiClient.auth.signin.query({
        body: { username, password },
      });
    },
  });
};

export const useSignout = () => {
  return useMutation({
    mutationFn: async () => {
      if (import.meta.env.DEV) {
        console.log("MOCK SIGNOUT");
        return {
          status: 200,
          body: {
            success: true,
            message: "mock signout",
          },
        };
      }

      return apiClient.auth.signout.query({
        body: {},
      });
    },
  });
};
