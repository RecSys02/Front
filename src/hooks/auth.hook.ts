import { tsr } from "@/apis/client/ts-rest/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthStore } from "@/stores/auth.store";
import { ApiOk } from "@/types/util.type";
import type {
  AuthTokenResponseDto,
  AvailabilityResponse,
  CreateUserDto,
} from "@/types/auth/auth.type";
import { meQueryOptions } from "./user.hook";
import type { UserMeDto } from "@/types/user/user.type";

const { setAccessToken, clear } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const AUTH_QK = {
  me: ["me"] as const,
  user: ["user"] as const,
  checkEmail: (email: string) => ["checkEmail", email] as const,
  checkName: (name: string) => ["checkName", name] as const,
};

const clearAuthCaches = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.removeQueries({ queryKey: AUTH_QK.me });
  queryClient.removeQueries({ queryKey: AUTH_QK.user });
  queryClient.setQueryData(AUTH_QK.me, undefined);
  queryClient.setQueryData(AUTH_QK.user, undefined);
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  const onSuccess = async (res: ApiOk<AuthTokenResponseDto>) => {
    setAccessToken(res.body.accessToken);

    const me = (await queryClient.fetchQuery(meQueryOptions())) as UserMeDto;

    queryClient.setQueryData<UserMeDto>(AUTH_QK.me, me);
    await queryClient.invalidateQueries({ queryKey: AUTH_QK.me });
    await queryClient.invalidateQueries({ queryKey: AUTH_QK.user });

    toast.success(`${me?.userName ?? "사용자"}님, 환영합니다!`);
  };

  const onError = () => {
    clear();
    clearAuthCaches(queryClient);
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

  const cleanup = async () => {
    await queryClient.cancelQueries();
    clear();
    clearAuthCaches(queryClient);
  };

  const onSuccess = async () => {
    await cleanup();
    window.location.href = "/";
  };

  const onError = async () => {
    await cleanup();
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

export const useCheckEmail = (email: string) => {
  const key = AUTH_QK.checkEmail(email);

  const real = tsr.auth.checkEmail.useQuery({
    queryKey: key,
    queryData: {
      query: { email },
    },
    enabled: false,
    select: (res: ApiOk<AvailabilityResponse>) => res.body,
  });

  const mock = useQuery<AvailabilityResponse>({
    queryKey: key,
    enabled: false,
    queryFn: async () => ({ available: true }),
  });

  return IS_MOCK ? mock : real;
};

export const useCheckName = (name: string) => {
  const key = AUTH_QK.checkName(name);

  const real = tsr.auth.checkName.useQuery({
    queryKey: key,
    queryData: {
      query: { name },
    },
    enabled: false,
    select: (res: ApiOk<AvailabilityResponse>) => res.body,
  });

  const mock = useQuery<AvailabilityResponse>({
    queryKey: key,
    enabled: false,
    queryFn: async () => ({ available: true }),
  });

  return IS_MOCK ? mock : real;
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  const onError = () => {
    toast.error("회원가입 중 오류가 발생했습니다.");
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: AUTH_QK.me });
    await queryClient.invalidateQueries({ queryKey: AUTH_QK.user });
  };

  const real = tsr.auth.register.useMutation({
    onSuccess,
    onError,
  });

  const mock = useMutation<void, Error, { body: CreateUserDto }>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};
