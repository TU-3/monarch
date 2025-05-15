import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthenticatedRoute from "@/pages/AuthenticatedRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import OrgDashboard from "./pages/OrgDashboard";
import Layout from "./components/layout";
import { KanbanBoard } from "./components/ui/kanban/KanbanBoard";

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
                    <KanbanBoard />
                  </AuthenticatedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
