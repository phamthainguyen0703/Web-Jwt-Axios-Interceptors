import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";

//giải phải cleancode trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) return <Navigate to="/dashboard" replace={true} />;
  return <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />

      <Route element={<UnauthorizedRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        {/* //<Outlet> sẽ chạy vào các child route này  */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
