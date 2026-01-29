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

const clearUserCaches = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.removeQueries({ queryKey: QK.me() });
  queryClient.removeQueries({ queryKey: QK.user() });
  queryClient.removeQueries({ queryKey: QK.meMock() });
  queryClient.removeQueries({ queryKey: QK.userMock() });

  queryClient.setQueryData(QK.me(), undefined);
  queryClient.setQueryData(QK.user(), undefined);
  queryClient.setQueryData(QK.meMock(), undefined);
  queryClient.setQueryData(QK.userMock(), undefined);
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
    queryKey: QK.meMock(),
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

    queryClient.setQueryData<UserMeDto>(QK.meMock(), (prev) => ({
      ...(prev ?? { userImg: null, userName: nextName }),
      userName: nextName,
    }));

    queryClient.setQueryData<UserDto>(QK.user(), (prev) =>
      prev ? { ...prev, userName: nextName } : prev,
    );

    queryClient.setQueryData<UserDto>(QK.userMock(), (prev) =>
      prev ? { ...prev, userName: nextName } : prev,
    );

    queryClient.invalidateQueries({ queryKey: QK.me() });
    queryClient.invalidateQueries({ queryKey: QK.user() });
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
    queryClient.invalidateQueries({ queryKey: QK.user() });
    queryClient.invalidateQueries({ queryKey: QK.userMock() });
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

  const cleanup = async () => {
    await queryClient.cancelQueries();
    clear();
    clearUserCaches(queryClient);
  };

  const onSuccess = async () => {
    await cleanup();
    toast.success("회원 탈퇴가 완료되었습니다.");
    navigate({ to: ROUTES.Home, replace: true });
  };

  const onError = async () => {
    await cleanup();
    toast.error("회원 탈퇴 중 오류가 발생했습니다.");
  };

  const real = tsr.user.delete.useMutation({
    onSuccess: async () => {
      await onSuccess();
    },
    onError: async () => {
      await onError();
    },
  });

  const mock = useMutation<void, Error, void>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};
