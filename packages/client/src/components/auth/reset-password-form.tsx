import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { IResetPassSchema, resetPassSchema } from 'shared';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { toast } from '../ui/use-toast';
import { IApiError, IApiZodError, getErrorMessage } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import fetcher from '@/lib/axios';
import { Icons } from '../icons';

const ResetPasswordForm = () => {
  const router = useRouter();

  const form = useForm<IResetPassSchema>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      confirm_password: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (variables: IResetPassSchema & { token: string }) => {
      return fetcher.patch('/auth/reset-password', variables);
    },
    onError(error: { response: { data: IApiError | IApiZodError[] } }) {
      toast({
        title: getErrorMessage(error?.response?.data || error),
        description: 'Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess() {
      form.reset();
      router.push('/login');
      toast({
        title: 'Password changed!',
        description: 'Please login with your new password.',
      });
    },
  });

  function onSubmit(values: IResetPassSchema) {
    mutate({ ...values, token: `${router.query?.token}` });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-3.5">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                size={30}
                placeholder="Enter a strong password"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                size={30}
                placeholder="Type your password again"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="animate-spin text-2xl mr-3" />
          )}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
