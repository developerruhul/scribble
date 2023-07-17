import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { IResetPassSchema, resetPassSchema } from './validation-schema';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ResetPasswordForm = () => {
  const form = useForm<IResetPassSchema>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      confirm_password: '',
      password: '',
    },
  });

  function onSubmit(values: IResetPassSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          name="password"
          control={form.control}
          render={({field}) => (
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
          render={({field}) => (
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
        <Button type="submit" className="mt-6 w-full">
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
