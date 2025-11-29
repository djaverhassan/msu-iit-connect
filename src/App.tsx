import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Services from "./pages/Services";
import News from "./pages/News";
import Emergency from "./pages/Emergency";
import Account from "./pages/Account";
import Map from "./pages/Map";
import EServices from "./pages/EServices";
import CoreValues from "./pages/CoreValues";
import ReportIssue from "./pages/ReportIssue";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Publications from "./pages/Publications";
import Silahis from "./pages/publications/Silahis";
import Sidlak from "./pages/publications/Sidlak";
import Cassayuran from "./pages/publications/Cassayuran";
import Motherboard from "./pages/publications/Motherboard";
import Sindaw from "./pages/publications/Sindaw";
import AdInfinitum from "./pages/publications/AdInfinitum";
import Caduceus from "./pages/publications/Caduceus";
import Thuum from "./pages/publications/Thuum";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminIssues from "./pages/admin/Issues";
import AdminUsers from "./pages/admin/Users";
import AdminServices from "./pages/admin/Services";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminPosts from "./pages/admin/Posts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/e-services" element={<EServices />} />
          <Route path="/core-values" element={<CoreValues />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/news" element={<News />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/silahis" element={<Silahis />} />
          <Route path="/publications/sidlak" element={<Sidlak />} />
          <Route path="/publications/cassayuran" element={<Cassayuran />} />
          <Route path="/publications/motherboard" element={<Motherboard />} />
          <Route path="/publications/sindaw" element={<Sindaw />} />
          <Route path="/publications/adinfinitum" element={<AdInfinitum />} />
          <Route path="/publications/caduceus" element={<Caduceus />} />
          <Route path="/publications/thuum" element={<Thuum />} />
          <Route path="/map" element={<Map />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/posts" element={<ProtectedRoute requireAdmin><AdminPosts /></ProtectedRoute>} />
          <Route path="/admin/issues" element={<ProtectedRoute requireAdmin><AdminIssues /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute requireAdmin><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminAnalytics /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
