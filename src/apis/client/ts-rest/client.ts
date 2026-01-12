import { ApiFetcherArgs } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: import.meta.env.VITE_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
  baseHeaders: {},
  api: async (args: ApiFetcherArgs) => {
    const result = await axiosInstance({
      url: "",
      method: args.method,
      headers: args.headers,
      data: args.body,
    });

    return {
      status: result.status,
      body: result.data,
      headers: new Headers(result.headers as Record<string, string>),
    };
  },
});
