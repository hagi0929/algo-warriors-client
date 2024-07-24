import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import logo from '../images/algowarrior_logo.jpeg';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    navigate('/home');
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
              render={({ field }) => <input {...field} id="username" placeholder="Username" className="input w-full" />}
            />
            {errors.username && <p className="error-message text-red-500">{errors.username.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="password">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => <input {...field} type="password" id="password" placeholder="Password" className="input w-full" />}
            />
            {errors.password && <p className="error-message text-red-500">{errors.password.message}</p>}
          </div>

          <button type="submit" className="button w-full bg-slate-500 text-white py-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
