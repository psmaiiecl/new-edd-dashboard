import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
