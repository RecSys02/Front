import { tsr } from "@/apis/client/ts-rest/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

const { getAccessToken } = AuthStore.actions;
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useUser = () => {
  const enabled = !!getAccessToken();

  const real = tsr.user.me.useQuery({
    queryKey: ["me"],
    enabled: enabled && !IS_MOCK,
  });

  const mock = useQuery({
    queryKey: ["me"],
    enabled: enabled && IS_MOCK,
    queryFn: async () => ({
      userName: "MOCKUSER",
      userImg: null,
    }),
  });

  return IS_MOCK ? mock : real;
};

export const useRename = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["me"] })
  };

  const onError = () => {
    toast.error("닉네임 변경 중 오류가 발생했습니다.");
  };

  const real = tsr.user.rename.useMutation({
    onSuccess,
    onError,
  });

  const mock = useMutation<void, Error, { body: { userName: string } }>({
    mutationFn: async () => undefined,
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;

};