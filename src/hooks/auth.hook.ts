import { tsr } from "@/apis/client/ts-rest/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthStore } from "@/stores/auth.store";

const { setAccessToken, clear } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useSignin = () => {
  const queryClient = useQueryClient();

  const real = tsr.auth.signin.useMutation({
    onSuccess: (res: any) => {
      const body: any = (res as any).body ?? res;

      setAccessToken(body.accessToken);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      clear();
      toast.error("로그인 중 오류가 발생했습니다.");
    },
  });

  const mock = useMutation({
    mutationFn: async () => {
      throw new Error("MOCK SIGNIN ERROR");
    },
    onSuccess: (body: any) => {
      setAccessToken(body.accessToken);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      clear();
      toast.error("로그인 중 오류가 발생했습니다.");
    },
  });

  return IS_MOCK ? mock : real;
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  const real = tsr.auth.signout.useMutation({
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

  const mock = useMutation({
    mutationFn: async () => {
      if (import.meta.env.DEV) {
        console.log("MOCK SIGNOUT");
      }
      return { success: true };
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

  return IS_MOCK ? mock : real;
};

export const useCheckUserId = () => {
  const real = tsr.auth.checkId.useMutation({
    onError: () => {
      toast.error("중복 확인 중 오류가 발생했습니다.");
    },
  });

  const mock = useMutation({
    mutationFn: async () => {
      return { available: true };
    },
    onError: () => {
      toast.error("중복 확인 중 오류가 발생했습니다.");
    },
  });

  return IS_MOCK ? mock : real;
};

export const useRegister = () => {
  const real = tsr.auth.register.useMutation({
    onError: () => {
      toast.error("회원가입 중 오류가 발생했습니다.");
    },
  });

  const mock = useMutation({
    mutationFn: async (_vars: {
      body: {
        userid: string;
        password: string;
        nickname: string;
        email: string;
        tags: string[];
      };
    }) => {
      const { userid, password, nickname, email, tags } = _vars.body;
      console.log(userid, password, nickname, email, tags);
      return { success: true };
    },
    onError: () => {
      toast.error("회원가입 중 오류가 발생했습니다.");
    },
  });

  return IS_MOCK ? mock : real;
};
