import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from './hooks/authProvider'
import PrivateRoute from './routes';
import AuthPage from './pages/auth';
import Dashboard from "./pages/dashboard";
import ServiceHistory from "./pages/service-history";
import RepairRequest from "./pages/repair-request";
import Settings from "./pages/settings";
import Users from "./pages/user";
import Service from "./pages/service";
import Vehicle from "./pages/vehicle";

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/admin" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/service-history" element={<ServiceHistory />} />
              <Route path="/service-history/:id" element={<ServiceHistory />} />
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
