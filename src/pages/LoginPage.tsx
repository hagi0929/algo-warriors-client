import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import logo from '../images/algowarrior_logo.jpeg';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '../components/ui/button';

interface LoginFormInputs {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}


const login = async (data: LoginFormInputs): Promise<LoginResponse> => {
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

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, Error, LoginFormInputs>({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 1 });
      console.log('Login successful, token:', data.token);
      navigate('/home');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
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
            <label htmlFor="username">Username</label>
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
            <label htmlFor="password">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => <input {...field} type="password" id="password" placeholder="Password" className="input w-full px-3 py-2 border border-gray-300 rounded-md" />}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-slate-500 text-white py-2 rounded-md">
            {loginMutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
          {/* <Link to="/home" className="w-full bg-slate-500 text-white py-2 rounded-md text-center block">
            Login
          </Link> */}
          {loginMutation.isError && (
            <p className="text-red-500 text-sm mt-1">
              Login failed: {loginMutation.error?.message}
            </p>
          )}
          <div className="w-full text-center mt-2">
          
            Don't have an account? <Button variant={"link"} asChild><Link to="/register" className='text-sm font-semibold'>Register</Link></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
