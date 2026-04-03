import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { RuntimeErrorBoundary } from "./components/RuntimeErrorBoundary.tsx";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML =
    "<div style=\"padding:24px;font-family:system-ui\">Missing root element (#root).</div>";
} else {
  createRoot(rootEl).render(
    <RuntimeErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RuntimeErrorBoundary>
  );
}
