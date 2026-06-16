import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./ui/spinner";

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className='pt-36 flex items-center justify-center'>
        <Spinner className='size-10 text-primary' />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to={"/signin"} replace />;
};

export default ProtectedRoute;
