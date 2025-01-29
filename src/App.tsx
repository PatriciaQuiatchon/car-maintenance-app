import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from './hooks/authProvider'
import PrivateRoute from './routes';
import AuthPage from './pages/auth';
import Dashboard from "./pages/dashboard";
import ServiceHistory from "./pages/service-records";
import RepairRequest from "./pages/repair-request";
import Settings from "./pages/settings";
import Users from "./pages/user";
import Service from "./pages/service";
import Vehicle from "./pages/vehicle";
import PublicPage from "./pages/public";
import Home from "./pages/home";
import VerifyEmail from "./pages/verify-email";
import ResetPasswordPage from "./components/auth/forgot-password";

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/auto-services" element={<PublicPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/admin" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ResetPasswordPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/service-records" element={<ServiceHistory />} />
              <Route path="/service-records/:id" element={<ServiceHistory />} />
              <Route path="/repair-request" element={<RepairRequest />} />
              <Route path="/repair-request/:id" element={<RepairRequest />} />
              <Route path="/registered-vehicle" element={<Vehicle />} />
              <Route path="/registered-vehicle/:id" element={<Vehicle />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/services" element={<Service />} />

            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
