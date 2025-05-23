
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import DevicesPage from "./pages/DevicesPage";
import DeviceDetailPage from "./pages/DeviceDetailPage";
import AutomationPage from "./pages/AutomationPage";
import SmartContractsPage from "./pages/SmartContractsPage";
import DatasetEntryPage from "./pages/DatasetEntryPage";
import EarningsPage from "./pages/EarningsPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import StakePage from "./pages/StakePage";
import AmbassadorPage from "./pages/AmbassadorPage";
import DataFeedPage from "./pages/DataFeedPage";
import DeveloperDocsPage from "./pages/DeveloperDocsPage";
import ResearchersPage from "./pages/ResearchersPage";
import BusinessPage from "./pages/BusinessPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/devices/:deviceId" element={<DeviceDetailPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/smart-contracts" element={<SmartContractsPage />} />
          <Route path="/dataset-entry" element={<DatasetEntryPage />} />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/stake" element={<StakePage />} />
          <Route path="/ambassador" element={<AmbassadorPage />} />
          <Route path="/data-feed" element={<DataFeedPage />} />
          <Route path="/developer-docs" element={<DeveloperDocsPage />} />
          <Route path="/researchers" element={<ResearchersPage />} />
          <Route path="/business" element={<BusinessPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
