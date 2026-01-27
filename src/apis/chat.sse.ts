import { AuthStore } from "@/stores/auth.store";
import {
  ChatHistoryResponse,
  ChatHistoryResponseSchema,
} from "@/types/chatbot/chatbot.type";

const BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

type SSEParsed = { event: "token" | "final"; data: string };

const parseSSEChunk = (rawEvent: string): SSEParsed | null => {
  const lines = rawEvent.split(/\r?\n/).map((l) => l.trimEnd());

  let event = "";
  const dataLines: string[] = [];

  for (const line of lines) {
    if (!line) continue;
    if (line.startsWith(":")) continue;

    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
      continue;
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart());
      continue;
    }
  }

  const data = dataLines.join("\n");
  if (!data) return null;

  if (event !== "token" && event !== "final") return null;
  return { event, data };
};

const readSSEUntilFinal = async (args: {
  res: Response;
  signal?: AbortSignal;
  onToken: (t: string) => void;
  onFinal: (t: string) => void;
}) => {
  const { res, signal, onToken, onFinal } = args;

  if (!res.ok) throw new Error(`SSE failed: ${res.status}`);
  if (!res.body) throw new Error("SSE body missing");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let finished = false;

  if (signal?.aborted) {
    reader.cancel();
    throw new DOMException("Aborted", "AbortError");
  }

  signal?.addEventListener(
    "abort",
    () => {
      reader.cancel();
    },
    { once: true },
  );

  while (!finished) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const chunks = buffer.split(/\r?\n\r?\n/);
    buffer = chunks.pop() ?? "";

    for (const chunk of chunks) {
      if (finished) break;

      const parsed = parseSSEChunk(chunk);
      if (!parsed) continue;

      if (parsed.event === "token") {
        onToken(parsed.data);
        continue;
      }

      if (parsed.event === "final") {
        onFinal(parsed.data);
        finished = true;
        reader.cancel();
        break;
      }
    }
  }
};

const postChatSend = async (args: {
  message: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  return fetch(`/sse/api/chatbot/stream`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "text/event-stream",
      Authorization: `Bearer ${args.accessToken}`,
    },
    body: JSON.stringify({ query: args.message }),
    signal: args.signal,
  });
};

const reissueAccessToken = async () => {
  const { setAccessToken } = AuthStore.actions;

  const res = await fetch(`${BASE_URL}/auth/reissue`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { accessToken?: string };
  if (!data?.accessToken) return null;

  setAccessToken(data.accessToken);
  return data.accessToken;
};

export const sendChatSse = async (args: {
  message: string;
  signal?: AbortSignal;
  onToken: (t: string) => void;
  onFinal: (t: string) => void;
}) => {
  const { getAccessToken, clear } = AuthStore.actions;

  const runOnce = async (accessToken: string) => {
    const res = await postChatSend({
      message: args.message,
      accessToken,
      signal: args.signal,
    });

    if (res.status === 401) return { ok: false as const, status: 401 as const };

    await readSSEUntilFinal({
      res,
      signal: args.signal,
      onToken: args.onToken,
      onFinal: args.onFinal,
    });

    return { ok: true as const, status: res.status };
  };

  const token = getAccessToken();
  if (!token) {
    clear();
    window.location.href = "/login";
    return;
  }

  const first = await runOnce(token);
  if (first.ok) return;

  if (first.status === 401) {
    const newToken = await reissueAccessToken();
    if (!newToken) {
      clear();
      window.location.href = "/login";
      return;
    }

    const second = await runOnce(newToken);
    if (second.ok) return;

    clear();
    window.location.href = "/login";
  }
};

export const fetchChatHistory = async (
  signal?: AbortSignal,
): Promise<ChatHistoryResponse> => {
  const { getAccessToken, clear } = AuthStore.actions;
  const token = getAccessToken();

  if (!token) {
    clear();
    window.location.href = "/login";
    throw new Error("No access token");
  }

  const res = await fetch("/sse/api/chatbot/history", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  if (!res.ok) throw new Error(`chat history failed: ${res.status}`);

  const json = await res.json();
  return ChatHistoryResponseSchema.parse(json);
};
