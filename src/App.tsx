import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import Branches from "./pages/Branches";
import Interview from "./pages/Interview";
import CV from "./pages/CV";
import Schedule from "./pages/Schedule";
import Contract from "./pages/Contract";
import Interviews from "./pages/Interviews"; // Changed from Onboarding to Interviews

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/branches" replace />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/interviews" element={<Interviews />} /> {/* Changed from /onboarding to /interviews */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;