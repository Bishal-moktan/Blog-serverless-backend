import { Toaster } from 'sonner';
import Form from '../components/Form';
import Label from '../components/Label';

const Signup = () => {
  return (
    <div className="flex h-[100vh]">
      <Toaster richColors />
      <Form type="signup" />
      <Label />
    </div>
  );
};
export default Signup;
