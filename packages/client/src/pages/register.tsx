import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

import { useMutation } from '@tanstack/react-query';
import fetcher from '@/lib/axios';
import { getErrorMessage } from '@/lib/utils';
import { Icons } from '@/components/icons';
import MainLayout from '@/components/layouts/main-layout';
import RegisterForm from '@/components/auth/register-form';
import { type IRegisterFormSchema, registerFormSchema } from 'shared';
import illustration from '@/assets/sitting-reading.svg';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';

function Register() {
  const router = useRouter();

  const form = useForm<IRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      password: '',
      name: '',
      email: '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (variables: IRegisterFormSchema) => {
      return fetcher.post('/auth/register', variables);
    },
    onError(error) {
      toast({
        title: getErrorMessage(error?.response?.data || error),
        description: 'Please try again!',
        variant: 'destructive',
      });
    },
    onSuccess() {
      router.push('/login');
      toast({
        title: 'Successfully registered!',
        description: 'Please log in with your credentials.',
      });
    },
  });

  function onSubmit(values: IRegisterFormSchema) {
    mutate(values);
  }

  return (
    <MainLayout className="flex h-full w-full items-center justify-center">
      <div className="md:w-1/2 -mt-8 flex items-center justify-center flex-col h-full">
        <section className="flex flex-col items-center mb-6 space-y-1">
          <Icons.logo className="text-[45px]" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
        </section>

        <RegisterForm isLoading={isLoading} form={form} onSubmit={onSubmit} />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Log in
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

export default Register;
