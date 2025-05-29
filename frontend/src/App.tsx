import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthenticatedRoute from "@/app/AuthenticatedRoute";
import Login from "@/app/Login";
import Signup from "@/app/auth/sign-up/page";
import ForgotPassword from "@/app/auth/forgot-password/page";
import UpdatePassword from "@/app/auth/update-password/page";
import OrgDashboard from "./app/page";
import Layout from "./components/layout";
import KanbanDashboard from "./app/KanbanDashboard";

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthenticatedRoute>
                    <OrgDashboard />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/kanban"
                element={
                  <AuthenticatedRoute>
                    <KanbanDashboard />
                  </AuthenticatedRoute>
                }
              />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/sign-up" element={<Signup />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/update-password" element={<UpdatePassword />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
