import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./ui/spinner";

const PublicRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className='pt-36 flex items-center justify-center'>
        <Spinner className='size-10 text-primary' />
      </div>
    );
  }

  return user ? <Navigate to={"/dashboard"} replace /> : <Outlet />;
};

export default PublicRoute;
