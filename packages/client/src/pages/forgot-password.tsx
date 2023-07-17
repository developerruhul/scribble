import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { Icons } from '@/components/icons';
import MainLayout from '@/components/layouts/main-layout';

const ForgotPassword = () => {
  return (
    <MainLayout className="flex h-[calc(100%-60px)] w-full justify-center items-center">
      <div className="flex items-center justify-center flex-col h-full">
        <section className="flex flex-col items-center mb-6 space-y-3">
          <span className="border p-2 rounded-md bg-muted/20">
            <Icons.fingerprint className="text-3xl" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot password?
          </h1>
          <p className="text-[15px] text-muted-foreground">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </section>

        <ForgotPasswordForm />
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
