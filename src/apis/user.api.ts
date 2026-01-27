import {
  UserMeSchema,
  RenameUserSchema,
  UpdateUserTagSchema,
  UserSchema,
} from "@/types/user/user.type";
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
        200: z.void(),
      },
    },
    updateTag: {
      method: "PUT",
      path: "/tags",
      body: UpdateUserTagSchema,
      responses: {
        200: z.void(),
      },
    },
    read: {
      method: "GET",
      path: "/info",
      responses: {
        200: UserSchema,
      },
    },
    delete: {
      method: "DELETE",
      path: "",
      responses: {
        200: z.void(),
      },
    },
  },
  { pathPrefix: "/user" },
);
