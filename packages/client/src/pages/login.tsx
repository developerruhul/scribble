import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import MainLayout from '@/components/layouts/main-layout';
import { Icons } from '@/components/icons';
import LoginForm from '@/components/auth/login-form';
import {
  type IloginFormSchema,
  loginFormSchema,
} from '@/components/auth/validation-schema';
import illustration from '@/assets/sitting-reading.svg';

function Login() {
  const form = useForm<IloginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: IloginFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <MainLayout className="flex h-full w-full items-center justify-center">
      <div className="md:w-1/2 flex items-center justify-center flex-col h-full">
        <section className="flex flex-col items-center mb-6 space-y-1">
          <Icons.logo className="text-[40px]" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
        </section>

        <LoginForm form={form} onSubmit={onSubmit} />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>

      <section className="hidden md:flex items-center justify-center w-1/2 bg-slate-500/10 dark:bg-teal-600/60 h-full">
        <Image
          priority={false}
          src={illustration}
          alt="Man sitting in a chair reading. Indicating scribble brand"
        />
      </section>
    </MainLayout>
  );
}

export default Login;
