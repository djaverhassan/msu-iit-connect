import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import News from "./pages/News";
import Emergency from "./pages/Emergency";
import Account from "./pages/Account";
import Map from "./pages/Map";
import EServices from "./pages/EServices";
import CoreValues from "./pages/CoreValues";
import ReportIssue from "./pages/ReportIssue";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminIssues from "./pages/admin/Issues";
import AdminUsers from "./pages/admin/Users";
import AdminServices from "./pages/admin/Services";
import AdminAnalytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/e-services" element={<EServices />} />
          <Route path="/core-values" element={<CoreValues />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/news" element={<News />} />
          <Route path="/map" element={<Map />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/issues" element={<AdminIssues />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
