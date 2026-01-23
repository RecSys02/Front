import { ApiFetcherArgs } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: "",
  baseHeaders: {},
  api: async (args: ApiFetcherArgs) => {
    const method = (args.method || "GET").toUpperCase();

    const qs =
      args.rawQuery && typeof args.rawQuery === "object"
        ? new URLSearchParams(
            Object.entries(args.rawQuery as Record<string, any>)
              .filter(([, v]) => v !== undefined && v !== null)
              .map(([k, v]) => [k, String(v)]),
          ).toString()
        : "";

    const url = qs ? `${args.path}?${qs}` : args.path;

    const result = await axiosInstance({
      url,
      method: method as any,
      headers: args.headers,
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
