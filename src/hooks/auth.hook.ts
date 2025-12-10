import { apiClient } from "@/apis/client/ts-rest/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthStore } from "@/stores/auth.store";
import { RegisterFormValues } from "@/app/(auth)/register/_components/register.type";

type SigninArgs = {
  userid: string;
  password: string;
  remember: boolean;
};

const { setAccessToken, clear } = AuthStore.actions;

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userid, password, remember }: SigninArgs) => {
      if (IS_MOCK) {
        throw new Error("MOCK SIGNIN ERROR");
        // console.log("MOCK SIGNIN", userid, password);
        // return
        //     token: "token",
        //     name: `MOCK-${userid}`,
        //     id: 9999,
        // };
      }
      const res = await apiClient.auth.signin.query({
        body: { userid, password, remember },
      });
      return res.body;
    },

    onSuccess: (res) => {
      setAccessToken(res.accessToken);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },

    onError: () => {
      clear();
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
          success: true,
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

export const useCheckUserId = () => {
  return useMutation({
    mutationFn: async (userid: string) => {
      if (IS_MOCK) {
        return {
          available: true,
        };
      }
      const res = await apiClient.auth.checkId.query({
        body: { userid },
      });
      return res.body;
    },
    onError: () => {
      toast.error("중복 확인 중 오류가 발생했습니다.");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({
      userId: userid,
      password,
      nickname,
      email,
      tags,
    }: RegisterFormValues) => {
      if (IS_MOCK) {
        console.log(userid, password, nickname, email, tags);
        return {
          success: true,
        };
      }
      const res = await apiClient.auth.register.query({
        body: {
          userid,
          password,
          nickname,
          email,
          tags,
        },
      });
      return res.body;
    },
    onError: () => {
      toast.error("회원가입 중 오류가 발생했습니다.");
    },
  });
};
