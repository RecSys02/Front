import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { tsr } from "@/apis/client/ts-rest/client";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <tsr.ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </tsr.ReactQueryProvider>
  </StrictMode>,
);
