import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import useUserRoutes from "../src//components/routes/userRoutes.jsx";
import useAdminRoutes from "../src//components/routes/adminRoutes.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Profile from "./components/user/Profile.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UploadAvatar from "./components/user/UploadAvatar.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Invoice from "./components/invoice/Invoice";
import Snowfall from "./components/layout/Snowfall.jsx";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <Snowfall />
        <div className="container-fluid">
          <Routes>
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route
              path="/me/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/upload_avatar"
              element={
                <ProtectedRoute>
                  <UploadAvatar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/orders"
              element={
                <protectedRoute>
                  <MyOrders />
                </protectedRoute>
              }
            />
            <Route
              path="/me/order/:id"
              element={
                <protectedRoute>
                  <OrderDetails />
                </protectedRoute>
              }
            />
            <Route
              path="/invoice/order/:id"
              element={
                <protectedRoute>
                  <Invoice />
                </protectedRoute>
              }
            />
            {userRoutes}
            {adminRoutes}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
