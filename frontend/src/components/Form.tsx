import { signupInput } from '@bishalmoktan/blog-common';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { BACKEND_URL } from '../config';
import { toast } from 'sonner';
import { useState } from 'react';
import Spinner from './Spinner';
import { useAuth } from '../hooks';

interface formProps {
  type: 'signin' | 'signup';
}

const Form = ({ type }: formProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate('/blogs');
  }
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<signupInput>({
    defaultValues: {
      email: '',
      authorId: '',
      password: '',
    },
    resolver: zodResolver(signupInput),
  });

  const onSubmit = async (data: signupInput) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        data
      );
      localStorage.setItem('token', `Bearer ${response.data.token}`);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/blogs');
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        toast.error(error.response?.data.message);
      } else {
        console.log('something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold">
          {type === 'signin' ? 'Login' : 'Create an Account'}
        </h1>
        <p className="text-gray-500 my-4">
          {type === 'signup'
            ? 'Already have an account?'
            : "Don't have an account?"}
          <Link
            className="underline cursor-pointer pl-2"
            to={`${type === 'signup' ? '/signin' : '/signup'}`}
          >
            {type === 'signup' ? 'login' : 'register'}
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <LabelledInput
                label="Email"
                onChange={field.onChange}
                type="text"
              />
            )}
          />
          <p className="text-rose-500">
            {form.formState.errors.email && form.formState.errors.email.message}
          </p>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <LabelledInput
                label="Password"
                onChange={field.onChange}
                type="password"
              />
            )}
          />
          <p className="text-rose-500">
            {form.formState.errors.password &&
              form.formState.errors.password.message}
          </p>
          {isLoading ? (
            <Spinner />
          ) : (
            <button className="text-white disabled:cursor-not-allowed bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              {type === 'signup' ? 'Register' : 'Login'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Form;

interface LabelledInputProps {
  label: 'Email' | 'Password';
  onChange: () => void;
  type?: 'text' | 'password';
}

const LabelledInput = ({ label, onChange, type }: LabelledInputProps) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm  text-black font-semibold"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5    text-gray"
        placeholder={`${label === 'Email' ? 'abc@example.com' : ''}`}
      />
    </div>
  );
};
