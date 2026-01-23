import { tsr } from "@/apis/client/ts-rest/client";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { RenameUserDto, UserMeDto } from "@/types/user/user.type";

const { getAccessToken } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const meQueryOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await tsr.user.me.query();
      return res.body as UserMeDto;
    },
    staleTime: 60_000,
  });

export const useUser = () => {
  const enabled = !!getAccessToken();

  const real = useQuery({
    ...meQueryOptions(),
    enabled: enabled && !IS_MOCK,
  });

  const mock = useQuery<UserMeDto>({
    queryKey: ["me", "mock"],
    enabled: enabled && IS_MOCK,
    queryFn: async () => ({ userName: "MOCKUSER", userImg: null }),
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

    queryClient.setQueryData<UserMeDto>(["me"], (prev) => ({
      ...(prev ?? { userImg: null, userName: nextName }),
      userName: nextName,
    }));

    if (!IS_MOCK) {
      queryClient.refetchQueries({ queryKey: ["me"] });
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
