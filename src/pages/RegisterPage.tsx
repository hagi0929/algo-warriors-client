import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import logo from '../images/algowarrior_logo.jpeg';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { Button } from '../components/ui/button';

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
}
interface RegisterResponse {
  token: string;
}


const register = async (data: RegisterFormInputs): Promise<RegisterResponse> => {
  const response = await fetch('http://127.0.0.1:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};

const RegisterPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const registerMutation = useMutation<RegisterResponse, Error, RegisterFormInputs>({
    mutationFn: register,
    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 1 });
      navigate('/home');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="mt-1 grid grid-cols-5 gap-[0.625rem] md:gap-x-0.75 font-sm h-screen">
      <div className="col-span-3 h-full">
        <Card className="h-full">
          <CardContent className="bg-white h-full flex flex-col">
            <img src={logo} alt="AlgoWarrior Logo" className="mx-auto my-auto" />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex items-center justify-center h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full px-4">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required' }}
              render={({ field }) => <input {...field} id="email" placeholder="Email" className="input w-full px-3 py-2 border border-gray-300 rounded-md" />}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: 'Username is required' }}
              render={({ field }) => <input {...field} id="username" placeholder="Username" className="input w-full px-3 py-2 border border-gray-300 rounded-md" />}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => <input {...field} type="password" id="password" placeholder="Password" className="input w-full px-3 py-2 border border-gray-300 rounded-md" />}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="w-full">
            <button type="submit" className="w-full bg-slate-500 text-white py-2 rounded-md">Register</button>
          </div>
          <div className="w-full text-center mt-2">
            Have an account?<Button variant={"link"} asChild><Link to="/login" className='text-sm font-semibold'>Login</Link></Button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RegisterPage;
