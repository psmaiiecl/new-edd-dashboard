import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import { DashboardPage } from "./pages/DashboardPage";
import { RouteProtector } from "./components/RouteProtector";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/front">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard/:year/*"
            element={
              <RouteProtector>
                <DashboardPage />
              </RouteProtector>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
