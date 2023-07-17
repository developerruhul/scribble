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
import { type IRegisterFormSchema } from './validation-schema';

interface IloginFormProps {
  form: UseFormReturn<IRegisterFormSchema>;
  onSubmit: (values: IRegisterFormSchema) => void;
}

const RegisterForm = ({ onSubmit, form }: IloginFormProps) => {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-3">
            <FormLabel>Full name</FormLabel>
            <Input size={30} placeholder="John Doe" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Username</FormLabel>
              <Input size={30} placeholder="username123" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Email</FormLabel>
              <Input size={30} placeholder="abc@company.com" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="********" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6">
          Sign Up
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

export default RegisterForm;
