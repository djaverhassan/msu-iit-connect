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
import AccountSettings from "./pages/account/Settings";
import AccountNotifications from "./pages/account/Notifications";
import AccountPrivacy from "./pages/account/Privacy";
import AccountSupport from "./pages/account/Support";
import Map from "./pages/Map";
import EServices from "./pages/EServices";
import EServiceRequest from "./pages/EServiceRequest";
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
import AdminSettings from "./pages/admin/Settings";
import CouncilDashboard from "./pages/council/Dashboard";
import FacultyDashboard from "./pages/faculty/Dashboard";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/e-services" element={<ProtectedRoute><EServices /></ProtectedRoute>} />
            <Route path="/e-services/request" element={<ProtectedRoute><EServiceRequest /></ProtectedRoute>} />
            <Route path="/core-values" element={<ProtectedRoute><CoreValues /></ProtectedRoute>} />
            <Route path="/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path="/publications" element={<ProtectedRoute><Publications /></ProtectedRoute>} />
          <Route path="/publications/silahis" element={<ProtectedRoute><Silahis /></ProtectedRoute>} />
          <Route path="/publications/sidlak" element={<ProtectedRoute><Sidlak /></ProtectedRoute>} />
          <Route path="/publications/cassayuran" element={<ProtectedRoute><Cassayuran /></ProtectedRoute>} />
          <Route path="/publications/motherboard" element={<ProtectedRoute><Motherboard /></ProtectedRoute>} />
          <Route path="/publications/sindaw" element={<ProtectedRoute><Sindaw /></ProtectedRoute>} />
          <Route path="/publications/adinfinitum" element={<ProtectedRoute><AdInfinitum /></ProtectedRoute>} />
          <Route path="/publications/caduceus" element={<ProtectedRoute><Caduceus /></ProtectedRoute>} />
          <Route path="/publications/thuum" element={<ProtectedRoute><Thuum /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
          <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/account/settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
          <Route path="/account/notifications" element={<ProtectedRoute><AccountNotifications /></ProtectedRoute>} />
          <Route path="/account/privacy" element={<ProtectedRoute><AccountPrivacy /></ProtectedRoute>} />
          <Route path="/account/support" element={<ProtectedRoute><AccountSupport /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/posts" element={<ProtectedRoute requireAdmin><AdminPosts /></ProtectedRoute>} />
          <Route path="/admin/issues" element={<ProtectedRoute requireAdmin><AdminIssues /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute requireAdmin><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
          
          {/* Student Council Routes */}
          <Route path="/council" element={<ProtectedRoute requireStudentCouncil><CouncilDashboard /></ProtectedRoute>} />
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={<ProtectedRoute requireFaculty><FacultyDashboard /></ProtectedRoute>} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
