import { Toaster } from 'sonner';
import Form from '../components/Form';
import Label from '../components/Label';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/userAtom';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';

const Signup = () => {
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
      <Form />
      <Label />
    </div>
  );
};
export default Signup;
