import z from "zod";

export type ApiOk<TBody, TStatus extends number = 200> = {
  status: TStatus;
  body: TBody;
  headers: Headers;
};

export const EmptySchema = z.union([
  z.void(),
  z.undefined(),
  z.null(),
  z.object({}),
  z.unknown(),
]);
