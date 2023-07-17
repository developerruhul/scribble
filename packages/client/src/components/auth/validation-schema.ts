import * as z from 'zod';

export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  email: z
    .string()
    .regex(
      /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
      { message: 'Please provide a valid email' }
    ),
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
