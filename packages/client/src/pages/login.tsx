import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import MainLayout from '@/components/layouts/main-layout';
import { Icons } from '@/components/icons';
import LoginForm from '@/components/auth/login-form';
import { type IloginFormSchema, loginFormSchema } from 'shared';
import illustration from '@/assets/sitting-reading.svg';
import { useMutation } from '@tanstack/react-query';
import fetcher from '@/lib/axios';
import { toast } from '@/components/ui/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/lib/stores/auth-store';

function Login() {
  const router = useRouter();
  const authStore = useAuthStore();

  const form = useForm<IloginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (variables: IloginFormSchema) => {
      return fetcher.post('/auth/login', variables);
    },
    onError(error) {
      toast({
        title: getErrorMessage(error?.response?.data || error),
        description: 'Please try again!',
        variant: 'destructive',
      });
    },
    onSuccess(res) {
      if (res.data?.token && res.data?.user) {
        authStore.login(res.data.token, res.data.user);
      }

      router.push('/');

      toast({
        title: 'Welcome to scribble!',
      });
    },
  });

  function onSubmit(values: IloginFormSchema) {
    mutate(values);
  }

  return (
    <MainLayout className="flex h-full w-full items-center justify-center">
      <div className="md:w-1/2 -mt-8 flex items-center justify-center flex-col h-full">
        <section className="flex flex-col items-center mb-6 space-y-1">
          <Icons.logo className="text-[45px]" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
        </section>

        <LoginForm isLoading={isLoading} form={form} onSubmit={onSubmit} />

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
