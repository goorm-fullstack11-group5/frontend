import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EditorPage from "./pages/Editor/EditorPage";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Auth/Login/LoginPage";
import SignUpPage from "./pages/Auth/SignUp/SignUpPage";
import { ThemeProvider } from "./components/ThemeProvider";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }
    return children;
  };

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              isAuthenticated ? (
                <Navigate to='/' replace />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <MainPage setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/editor'
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
