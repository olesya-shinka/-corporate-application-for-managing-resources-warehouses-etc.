/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function AppRoutes(): JSX.Element {
  const { access } = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth={access} />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
