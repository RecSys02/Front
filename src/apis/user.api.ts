import { UserMeSchema, RenameUserSchema } from "@/types/user/user.type";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const userApi = c.router(
  {
    me: {
      method: "GET",
      path: "/me",
      responses: {
        200: UserMeSchema,
      },
    },
    rename: {
      method: "PATCH",
      path: "/profile",
      body: RenameUserSchema,
      responses: {
        200: z.object({}),
      },
    },
  },
  { pathPrefix: "/user" },
);
