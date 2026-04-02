import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";

// Handle hash-based navigation on initial load and popstate events.
// This site uses only hash anchors (#section-id) for in-page navigation —
// no React Router <Link> or useNavigate needed.
function useHashScroll() {
  useEffect(() => {
    const scrollToHash = (hash: string) => {
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Scroll to hash present on initial load
    if (window.location.hash) {
      // Small delay to let the page render first
      setTimeout(() => scrollToHash(window.location.hash), 100);
    }

    // Handle browser back/forward with hashes
    const onPopState = () => scrollToHash(window.location.hash);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
}

const App = () => {
  useHashScroll();
  return (
    <>
      <Index />
      <Toaster />
    </>
  );
};

export default App;