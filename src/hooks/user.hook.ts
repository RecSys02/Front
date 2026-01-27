import { tsr } from "@/apis/client/ts-rest/client";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type {
  RenameUserDto,
  UpdateUserTagDto,
  UserDto,
  UserMeDto,
} from "@/types/user/user.type";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";

const { getAccessToken } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const QK = {
  me: () => ["me"] as const,
  meMock: () => ["me", "mock"] as const,
  user: () => ["user"] as const,
  userMock: () => ["user", "mock"] as const,
};

export const meQueryOptions = () =>
  queryOptions({
    queryKey: QK.me(),
    queryFn: async () => {
      const res = await tsr.user.me.query();
      return res.body as UserMeDto;
    },
    staleTime: 60_000,
  });

export const useUserMe = () => {
  const enabled = !!getAccessToken();

  const real = useQuery({
    ...meQueryOptions(),
    enabled: enabled && !IS_MOCK,
    retry: false,
  });

  const mock = useQuery<UserMeDto>({
    queryKey: QK.me(),
    enabled: enabled && IS_MOCK,
    queryFn: async () => ({ userName: "MOCKUSER", userImg: null }),
    staleTime: 60_000,
    retry: false,
  });

  return IS_MOCK ? mock : real;
};

export const useUser = () => {
  const enabled = !!getAccessToken();

  const real = useQuery<UserDto>({
    queryKey: QK.user(),
    enabled: enabled && !IS_MOCK,
    queryFn: async () => {
      const res = await tsr.user.read.query();
      return res.body as UserDto;
    },
    staleTime: 60_000,
  });

  const mock = useQuery<UserDto>({
    queryKey: QK.userMock(),
    enabled: enabled && IS_MOCK,
    queryFn: async () => ({
      email: "mock@test.com",
      userName: "MOCKUSER",
      image: null,
      tagIds: [1, 2, 3],
    }),
    staleTime: 60_000,
  });

  return IS_MOCK ? mock : real;
};

export const useRename = () => {
  const queryClient = useQueryClient();

  const onError = () => {
    toast.error("닉네임 변경 중 오류가 발생했습니다.");
  };

  const onSuccess = (_: unknown, vars: { body: RenameUserDto }) => {
    const nextName = vars.body.userName;

    queryClient.setQueryData<UserMeDto>(QK.me(), (prev) => ({
      ...(prev ?? { userImg: null, userName: nextName }),
      userName: nextName,
    }));

    if (!IS_MOCK) {
      queryClient.refetchQueries({ queryKey: QK.me() });
    }
  };

  const real = tsr.user.rename.useMutation({ onSuccess, onError });

  const mock = useMutation<void, Error, { body: RenameUserDto }>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useUpdateUserTag = () => {
  const queryClient = useQueryClient();
  const enabled = !!getAccessToken();

  const onError = () => {
    toast.error("태그 변경 중 오류가 발생했습니다.");
  };

  const onSuccess = () => {
    if (!IS_MOCK) {
      queryClient.refetchQueries({ queryKey: QK.user() });
    }
    toast.success("태그가 저장되었습니다.");
  };

  const real = tsr.user.updateTag.useMutation({
    onSuccess,
    onError,
  });

  const mock = useMutation<void, Error, { body: UpdateUserTagDto }>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return !enabled ? mock : IS_MOCK ? mock : real;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clear } = AuthStore.actions;

  const onSuccess = () => {
    toast.success("회원 탈퇴가 완료되었습니다.");
    navigate({ to: ROUTES.Home, replace: true });
  };

  const onError = () => {
    toast.error("회원 탈퇴 중 오류가 발생했습니다.");
  };

  const real = useMutation<void, Error>({
    mutationFn: async () => {
      await tsr.user.delete.mutation();
      await tsr.auth.signout.mutation();

      clear();
      queryClient.clear();
    },
    onSuccess,
    onError,
  });

  const mock = useMutation<void, Error>({
    mutationFn: async () => {
      clear();
      queryClient.clear();
    },
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};
