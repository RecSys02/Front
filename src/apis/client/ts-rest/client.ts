import { ApiFetcherArgs } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";
import { initQueryClient } from "@ts-rest/react-query";

export const apiClient = initQueryClient(contract, {
  baseUrl: import.meta.env.VITE_PUBLIC_BASE_URL ?? "http://localhost:3000",
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
