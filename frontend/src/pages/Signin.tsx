import { Toaster } from 'sonner';
import Label from '../components/Label';
import Form from '../components/Form';

const Signin = () => {
  return (
    <div className="flex h-[100vh]">
      <Toaster richColors />
      <Form type="signin" />
      <Label />
    </div>
  );
};
export default Signin;
