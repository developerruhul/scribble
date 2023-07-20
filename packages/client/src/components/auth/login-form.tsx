import { type UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { type IloginFormSchema } from 'shared';
import { Icons } from '../icons';

interface IloginFormProps {
  form: UseFormReturn<IloginFormSchema>;
  onSubmit: (values: IloginFormSchema) => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, form, isLoading }: IloginFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Email</FormLabel>
              <Input size={30} placeholder="Enter your email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="********" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-sm text-muted-foreground">
          <Link
            href="/forgot-password"
            className="hover:opacity-90 transition-opacity"
          >
            Forgot password?
          </Link>
        </p>

        <Button type="submit" className="mt-6" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="animate-spin text-2xl mr-3" />
          )}
          <span>Log in</span>
        </Button>

        <div className="relative w-full my-6">
          <div className="absolute z-[1] inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative z-10 flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
