import { authApi } from "@/apis/auth.api";
import { planApi } from "@/apis/plan.api";
import { userApi } from "@/apis/user.api";
import { initContract } from "@ts-rest/core";

const c = initContract();

export const contract = c.router({
  auth: authApi,
  user: userApi,
  plan: planApi,
});
