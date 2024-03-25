import { Toaster } from 'sonner';
import Label from '../components/Label';
import LoginForm from '../components/LoginForm';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Signin = () => {
  useDocumentTitle('Sign in');

  return (
    <div className="flex h-[100vh]">
      <Toaster richColors />
      <LoginForm />
      <Label />
    </div>
  );
};
export default Signin;
