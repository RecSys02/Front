import { ApiFetcherArgs } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { ROUTES } from "@/constants/routes";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: "",
  baseHeaders: {},
  api: async (args: ApiFetcherArgs) => {
    const method = (args.method || "GET").toUpperCase();

    const hasQueryInPath = args.path.includes("?");
    const params = hasQueryInPath ? undefined : (args.rawQuery as any);
    const isModelCall = args.path.startsWith(ROUTES.Model);

    const result = await axiosInstance({
      url: args.path,
      method: method as any,
      headers: args.headers,
      params,
      data:
        method === "GET" || method === "HEAD" ? undefined : (args.body as any),
      timeout: isModelCall ? 60_000 : 10_000,
      signal: args.fetchOptions?.signal ?? undefined,
    });

    return {
      status: result.status,
      body: result.data,
      headers: new Headers(result.headers as Record<string, string>),
    };
  },
});
