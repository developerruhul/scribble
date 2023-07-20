import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { IForgotPassSchema, forgotPassSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import fetcher from '@/lib/axios';
import { useToast } from '../ui/use-toast';
import { Icons } from '../icons';
import { getErrorMessage } from '@/lib/utils';

const ForgotPasswordForm = () => {
  const { toast } = useToast();

  const form = useForm<IForgotPassSchema>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: { email: '' },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (variables: IForgotPassSchema) => {
      return fetcher.post('/auth/forgot-password', variables);
    },
    onError(error) {
      toast({
        title: 'Sorry! Something went wrong',
        description: getErrorMessage(error?.response?.data || error),
        variant: 'destructive',
      });
    },
    onSuccess() {
      form.reset();
      toast({
        title: 'Email Sent',
        description: 'Please check your email for further instructions.',
      });
    },
  });

  function onSubmit(values: IForgotPassSchema) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input size={30} placeholder="Enter your email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="animate-spin text-2xl mr-3" />
          )}
          <span>Log in</span>
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
