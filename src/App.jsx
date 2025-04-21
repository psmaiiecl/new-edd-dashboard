import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import { DashboardPage } from "./pages/DashboardPage";
import { EDD2024Module } from "./modules/EDD2024Module";
import { EDD2025Module } from "./modules/EDD2025Module";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/front">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/:year/*" element={<DashboardPage />} />
          {/* <Route path="/dashboard/2024" element={<DashboardPage />}>
            <Route index element={<EDD2024Module/>} />
          </Route>
          <Route path="/dashboard/2025" element={<DashboardPage />}>
            <Route index element={<EDD2025Module />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
