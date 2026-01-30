import { ApiFetcherArgs } from "@ts-rest/core";
import { contract } from "./contract";
import axiosInstance from "../axios/axios";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: "",
  baseHeaders: {},
  api: async (args: ApiFetcherArgs) => {
    const pathname = args.path.startsWith("http")
      ? new URL(args.path).pathname
      : args.path;
    const method = (args.method || "GET").toUpperCase();

    const hasQueryInPath = args.path.includes("?");
    const params = hasQueryInPath ? undefined : (args.rawQuery as any);
    const isModelCall =
      pathname.startsWith("/api/plans") ||
      pathname.startsWith("/api/recommend");
    const timeout = isModelCall ? 60_000 : 10_000;

    console.log("[TSR API TIMEOUT]", {
      method,
      path: pathname,
      isModelCall,
      timeout,
    });
    const result = await axiosInstance({
      url: args.path,
      method: method as any,
      headers: args.headers,
      params,
      data:
        method === "GET" || method === "HEAD" ? undefined : (args.body as any),
      timeout,
      signal: args.fetchOptions?.signal ?? undefined,
    });

    return {
      status: result.status,
      body: result.data,
      headers: new Headers(result.headers as Record<string, string>),
    };
  },
});
