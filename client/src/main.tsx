import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/layout/ProtectedRoute.tsx";
import { UserLogin } from "./pages/auth/UserLogin.tsx";
import { AdminLogin } from "./pages/auth/AdminLogin.tsx";
import UserDashboard from "./pages/candidate/UserDashboard.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import ROUTES from "./config/route";
import { AuthProvider } from "./providers/AuthProviders.tsx";
import { AdminProvider } from "./providers/AdminProviders.tsx";
import { UserProvider } from "./providers/UserProviders.tsx";
import { AdminRegister } from "./pages/auth/AdminRegister.tsx";
import Unathorized from "./pages/auth/Unathorized.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path={ROUTES.PUBLIC.ADMIN_LOGIN} element={<AdminLogin />} />
          <Route path={ROUTES.PUBLIC.USER_LOGIN} element={<UserLogin />} />
          <Route path="/unauthorized" element={<Unathorized />} />
          <Route
            path={ROUTES.PUBLIC.ADMIN_REGISTER}
            element={<AdminRegister />}
          />
        </Routes>
        <UserProvider>
        <Routes>
          <Route element={<ProtectedRoute role="user" />}>
            <Route
              path={ROUTES.PRIVATE.USER.DASHBOARD}
              element={<UserDashboard />}
            />
          </Route>
        </Routes>
        </UserProvider>
        <AdminProvider>
          <Routes>
            <Route element={<ProtectedRoute role="admin" />}>
              <Route
                path={ROUTES.PRIVATE.ADMIN.DASHBOARD}
                element={<AdminDashboard />}
              />
            </Route>
          </Routes>
        </AdminProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
