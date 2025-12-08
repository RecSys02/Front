import { apiClient } from "@/apis/client/ts-rest/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthStore } from "@/stores/auth.store";

type SigninArgs = {
  username: string;
  password: string;
  remember: boolean;
};
const { setAccessToken, clear } = AuthStore.actions;

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password, remember }: SigninArgs) => {
      if (import.meta.env.DEV) {
        throw new Error("MOCK SIGNIN ERROR");
        // console.log("MOCK SIGNIN", username, password);
        // return {
        //   body: {
        //     token: "token",
        //     name: `MOCK-${username}`,
        //     id: 9999,
        //   },
        // };
      }
      const res = await apiClient.auth.signin.query({
        body: { username, password, remember },
      });
      return res.body;
    },

    onSuccess: (res) => {
      setAccessToken(res.accessToken);

      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success(`${res.body.username}님의 새로운 여정을 환영합니다. `);
    },

    onError: () => {
      clear();
      toast.error("아이디와 비밀번호를 정확히 입력해 주세요.");
    },
  });
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (import.meta.env.DEV) {
        console.log("MOCK SIGNOUT");
        return {
          body: {
            success: true,
            message: "mock signout",
          },
        };
      }
      const res = await apiClient.auth.signout.query({
        body: {},
      });
      return res.body;
    },
    onSuccess: () => {
      clear();
      queryClient.removeQueries({ queryKey: ["me"] });
      window.location.href = "/";
    },
    onError: () => {
      clear();
      queryClient.removeQueries({ queryKey: ["me"] });
      window.location.href = "/login";
      toast.error("로그아웃 중 오류가 발생했습니다.");
    },
  });
};
