import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/molecules/layouts/AuthLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route path="/chat" element={<Chat />} />
      <Route path="404" element={<NotFound />} />
      <Route path="/*" element={<Navigate to={"/404"} />} />
    </Routes>
  );
}

export default App;
