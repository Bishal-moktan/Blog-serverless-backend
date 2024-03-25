import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/userAtom';
const PrivateRoutes = () => {
  const user = useRecoilValue(userAtom);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
