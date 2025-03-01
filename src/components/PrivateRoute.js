import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function PrivateRoute({ children, isAdmin = false }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" />;
  // Aquí deberías verificar si el usuario es admin (usando Firestore)
  return children;
}