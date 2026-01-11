export type ApiOk<TBody, TStatus extends number = 200> = {
  status: TStatus;
  body: TBody;
  headers: Headers;
};
