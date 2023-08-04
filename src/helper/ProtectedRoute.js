import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from ".";

export const PrivateRoute = () => useAuth() ? <Outlet /> : <Navigate to="/" />;

export const RestrictedRoutes = () => !useAuth() ? <Outlet /> : <Navigate to="/create-bill" />;