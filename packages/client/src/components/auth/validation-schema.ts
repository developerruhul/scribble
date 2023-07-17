import * as z from 'zod';

function getEmailRegex(): z.ZodString {
  return z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Please provide a valid email',
    });
}

/**
 * FORGOT PASSWORD
 */
export const forgotPassSchema = z.object({
  email: getEmailRegex(),
});
export type IForgotPassSchema = z.infer<typeof forgotPassSchema>;

/**
 * RESET PASSWORD
 */
export const resetPassSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters!'),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters!'),
  })
  .refine((data) => data.confirm_password === data.password, {
    path: ['confirm_password'],
    message: 'The passwords did not match',
  });

export type IResetPassSchema = z.infer<typeof resetPassSchema>;

/**
 * REGISTER FORM
 */
export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  email: getEmailRegex(),
  name: z.string().min(2),
});

export type IRegisterFormSchema = z.infer<typeof registerFormSchema>;

/**
 * LOGIN FORM
 */

export const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

export type IloginFormSchema = z.infer<typeof loginFormSchema>;
