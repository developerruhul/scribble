import ResetPasswordForm from '@/components/auth/reset-password-form';
import { Icons } from '@/components/icons';
import MainLayout from '@/components/layouts/main-layout';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const tokenExists = req.cookies['token'];
  if (tokenExists) return { redirect: { destination: '/', permanent: true } };
  return { props: {} };
};

const ResetPassword = () => {
  return (
    <MainLayout className="flex h-[calc(100%-60px)] w-full justify-center items-center">
      <div className="flex items-center justify-center flex-col h-full">
        <section className="flex flex-col items-center mb-6">
          <span className="border p-2.5 rounded-md bg-muted/20 mb-4">
            <Icons.password className="text-2xl text-muted-foreground" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Set new password
          </h1>
          <p className="text-[15px] text-muted-foreground">
            Must be at least 8 characters.
          </p>
        </section>

        <ResetPasswordForm />
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
