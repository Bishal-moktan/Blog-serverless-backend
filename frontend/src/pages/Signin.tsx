import { Toaster } from 'sonner';
import Label from '../components/Label';
import LoginForm from '../components/LoginForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/userAtom';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Signin = () => {
  const userLoadable = useRecoilValueLoadable(userAtom);
  useDocumentTitle('Sign in');
  const navigate = useNavigate();
  useEffect(() => {
    if (userLoadable.contents !== null) {
      navigate('/blogs');
    }
  }, [userLoadable.state]);
  if (userLoadable.state === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-[100vh]">
      <Toaster richColors />
      <LoginForm />
      <Label />
    </div>
  );
};
export default Signin;
