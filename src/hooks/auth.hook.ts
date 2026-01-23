import { tsr } from "@/apis/client/ts-rest/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthStore } from "@/stores/auth.store";
import { ApiOk } from "@/types/util.type";
import {
  AuthTokenResponseDto,
  AvailabilityResponse,
  CreateUserDto,
} from "@/types/auth/auth.type";
import { UserMeDto } from "@/types/user/user.type";
import { meQueryOptions } from "./user.hook";

const { setAccessToken, clear } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useSignin = () => {
  const queryClient = useQueryClient();

  const onSuccess = async (res: ApiOk<AuthTokenResponseDto>) => {
    setAccessToken(res.body.accessToken);

    await queryClient.fetchQuery(meQueryOptions());

    const user = queryClient.getQueryData<UserMeDto>(["me"]);
    toast.success(`${user?.userName ?? "사용자"}님, 환영합니다!`);
  };

  const onError = () => {
    clear();
    queryClient.removeQueries({ queryKey: ["me"] });
    toast.error("이메일과 비밀번호를 정확히 입력해 주세요.");
  };

  const real = tsr.auth.signin.useMutation({ onSuccess, onError });

  const mock = useMutation<ApiOk<AuthTokenResponseDto>>({
    mutationFn: async () =>
      ({
        status: 200,
        body: { accessToken: "mock-access-token" },
        headers: new Headers(),
      }) as any,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    clear();
    queryClient.removeQueries({ queryKey: ["me"] });
    window.location.href = "/";
  };

  const onError = () => {
    clear();
    queryClient.removeQueries({ queryKey: ["me"] });
    window.location.href = "/login";
    toast.error("로그아웃 중 오류가 발생했습니다.");
  };

  const real = tsr.auth.signout.useMutation({
    onSuccess,
    onError,
  });

  const mock = useMutation<void>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useCheckEmail = () => {
  const onError = () => {
    toast.error("중복 확인 중 오류가 발생했습니다.");
  };

  const real = tsr.auth.checkEmail.useMutation({
    onError,
  });

  const mock = useMutation<
    ApiOk<AvailabilityResponse>,
    Error,
    { query: { email: string } }
  >({
    mutationFn: async () => ({
      status: 200,
      body: { available: true },
      headers: new Headers(),
    }),
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useCheckName = () => {
  const onError = () => {
    toast.error("중복 확인 중 오류가 발생했습니다.");
  };

  const real = tsr.auth.checkName.useMutation({
    onError,
  });

  const mock = useMutation<
    ApiOk<AvailabilityResponse>,
    Error,
    { query: { userName: string } }
  >({
    mutationFn: async () => ({
      status: 200,
      body: { available: true },
      headers: new Headers(),
    }),
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useRegister = () => {
  const onError = () => {
    toast.error("회원가입 중 오류가 발생했습니다.");
  };

  const real = tsr.auth.register.useMutation({
    onError,
  });

  const mock = useMutation<void, Error, { body: CreateUserDto }>({
    mutationFn: async () => undefined,
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    clear();
    queryClient.removeQueries({ queryKey: ["me"] });
  };

  const onError = () => {
    toast.error(
      "탈퇴 처리에 실패했습니다. 1:1 문의하기를 남겨주시길 바랍니다.",
    );
  };

  const real = tsr.auth.deleteUser.useMutation({
    onSuccess,
    onError,
  });

  const mock = useMutation<void>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};
