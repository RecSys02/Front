import { authApi } from "@/apis/auth.api";
import { userApi } from "@/apis/user.api";
import { initContract } from "@ts-rest/core";

const c = initContract();

export const contract = c.router({
  auth: authApi,
  user: userApi,
});
