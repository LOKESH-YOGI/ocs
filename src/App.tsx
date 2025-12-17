import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { initializeData } from "@/data/mockData";
import "@/i18n";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import BirthApplicationPage from "./pages/citizen/BirthApplicationPage";
import DeathApplicationPage from "./pages/citizen/DeathApplicationPage";
import CertificatePage from "./pages/citizen/CertificatePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ReviewApplicationPage from "./pages/admin/ReviewApplicationPage";
import NotFound from "./pages/NotFound";

// Initialize mock data
initializeData();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Citizen Routes */}
            <Route
              path="/citizen/dashboard"
              element={
                <ProtectedRoute>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/apply/birth"
              element={
                <ProtectedRoute>
                  <BirthApplicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/apply/death"
              element={
                <ProtectedRoute>
                  <DeathApplicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/certificate/:type/:id"
              element={
                <ProtectedRoute>
                  <CertificatePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/review/:type/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <ReviewApplicationPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
