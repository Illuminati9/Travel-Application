import { useState } from 'react';
import CardWrapper from './card-wrapper';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/userAuth';
import { useLocation } from 'react-router-dom';
import axiosInstance from '@/api/axios';

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathName || '/';

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phoneNumber: sessionStorage.getItem('phoneNumber') || '',
      otp: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    try {
      setIsPending(true);
      await axiosInstance
        .post(`/api/v1/auth/login`, values, {
          withCredentials: true,
        })
        .then((data) => {
          if (data.status === 200) {
            const { token } = data.data;
            setAuth({
              accessToken: token,
              isLoggedIn: true,
              refreshToken: data.data.refreshToken,
            });
            setSuccess(data.data.message);
            navigate(from, { replace: true });
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          setError(error.response.data.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    } catch (error) {
      console.log(error);
      setError('Failed to send otp. Try again later');
    }
  };
  return (
    <section className="h-screen flex items-center justify-center ">
      <CardWrapper
        headerLabel="Welcome back!!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/signup"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-x-2 ">
                <Input value={'+91'} className="w-[12%]" readOnly />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={true}
                          placeholder="Enter mobile number"
                          type="number"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="OTP"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center"
            >
              {isPending && (
                <svg
                  viewBox="0 0 800 800"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={50}
                >
                  <circle
                    className="spinLoader2"
                    cx="400"
                    cy="400"
                    fill="none"
                    r="109"
                    strokeWidth="35"
                    stroke="#fff"
                    strokeDasharray="685 1400"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              Send otp
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  );
};

export default LoginForm;
