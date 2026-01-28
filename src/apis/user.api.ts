import {
  UserMeSchema,
  RenameUserSchema,
  UpdateUserTagSchema,
  UserSchema,
} from "@/types/user/user.type";
import { EmptySchema } from "@/types/util.type";
import { initContract } from "@ts-rest/core";

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
        200: EmptySchema,
      },
    },
    updateTag: {
      method: "PUT",
      path: "/tags",
      body: UpdateUserTagSchema,
      responses: {
        200: EmptySchema,
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
      path: "/me",
      responses: {
        200: EmptySchema,
      },
    },
  },
  { pathPrefix: "/user" },
);
