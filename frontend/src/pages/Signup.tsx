import { Toaster } from 'sonner';
import Form from '../components/Form';
import Label from '../components/Label';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Signup = () => {
  useDocumentTitle('Sign up');

  return (
    <div className="flex h-[100vh]">
      <Toaster richColors />
      <Form />
      <Label />
    </div>
  );
};
export default Signup;
