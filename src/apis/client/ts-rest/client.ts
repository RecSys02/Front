import { ApiFetcherArgs } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: "",
  baseHeaders: {},
  api: async (args: ApiFetcherArgs) => {
    const method = (args.method || "GET").toUpperCase();

    const result = await axiosInstance({
      url: args.path,
      method: method as any,
      headers: args.headers,
      params: args.rawQuery as any,
      data:
        method === "GET" || method === "HEAD" ? undefined : (args.body as any),
      signal: args.fetchOptions?.signal ?? undefined,
    });

    return {
      status: result.status,
      body: result.data,
      headers: new Headers(result.headers as Record<string, string>),
    };
  },
});
