import storage from "@/storage/storage";

export type User = { name: string; id: number };

const ACCESS_TOKEN_KEY = "access_token";

export const AuthStore = {
  actions: {
    isLoggedIn: (): boolean => AuthStore.actions.getAccessToken() !== null,

    setAccessToken: (accessToken: string) => {
      storage.setItem(ACCESS_TOKEN_KEY, accessToken);
    },

    getAccessToken: (): string | null => {
      return storage.getItem(ACCESS_TOKEN_KEY);
    },

    clear: () => {
      storage.removeItem(ACCESS_TOKEN_KEY);
    },
  },
};
