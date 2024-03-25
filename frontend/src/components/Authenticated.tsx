import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/userAtom';
const Authenticated = () => {
  const user = useRecoilValue(userAtom);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Authenticated;
