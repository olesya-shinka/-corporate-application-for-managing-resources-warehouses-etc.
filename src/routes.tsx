import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import { ProtectedRoute } from "./components/ProtectedRoute";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
