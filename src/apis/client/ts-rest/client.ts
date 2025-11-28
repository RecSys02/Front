import { ApiFetcherArgs, initClient } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";

export const apiClient = initClient(contract, {
  baseUrl: import.meta.env.PUBLIC_BASE_URL ?? "http://localhost:3000",
  baseHeaders: {},
  fetchApi: async (args: ApiFetcherArgs) => {
    const result = await axiosInstance({
      url: args.path,
      method: args.method,
      headers: args.headers,
      data: args.body,
    });

    return {
      status: result.status,
      body: result.data,
      headers: result.headers,
    };
  },
});
