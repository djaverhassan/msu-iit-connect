import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireStudentCouncil?: boolean;
  requireFaculty?: boolean;
  requireVerified?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  requireStudentCouncil = false,
  requireFaculty = false,
  requireVerified = false,
}: ProtectedRouteProps) => {
  const { user, isAdmin, isStudentCouncil, isFaculty, isVerified, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  if (requireStudentCouncil && !isStudentCouncil && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  if (requireFaculty && !isFaculty && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  if (requireVerified && !isVerified && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};