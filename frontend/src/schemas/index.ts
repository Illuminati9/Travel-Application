import * as z from 'zod';

export const LoginSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be 10 characters',
  }),
  otp: z.string().min(6, {
    message: 'Phone number must be 10 characters',
  }),
});

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(4, {
        message: 'Minimum of 4 characters required',
      })
      .toLowerCase(),
    lastName: z
      .string()
      .min(4, {
        message: 'Minimum of 4 characters required',
      })
      .toLowerCase(),
    phoneNumber: z
      .string()
      .min(10, {
        message: 'Phone number must be 10 characters',
      })
      .max(10, {
        message: 'Phone number must be 10 characters',
      }),
    otp: z.string().min(6, {
      message: 'OTP must be 6 characters',
    }),
    password: z.string({ required_error: 'Password is required' }).min(8, {
      message: 'Minimum of 6 characters required',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Minimum of 6 characters required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const NumberVerificationSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be 10 characters',
  }),
});
