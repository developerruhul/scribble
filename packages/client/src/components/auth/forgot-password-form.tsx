import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { IForgotPassSchema, forgotPassSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ForgotPasswordForm = () => {
  const form = useForm<IForgotPassSchema>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: IForgotPassSchema) {
    console.log(values);
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
        <Button type="submit" className="mt-6 w-full">
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
