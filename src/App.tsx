import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AuthProvider from './hooks/authProvider'
import PrivateRoute from './routes';
import AuthPage from './pages/auth';

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route element={<PrivateRoute />}>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
