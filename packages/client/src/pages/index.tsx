import MainLayout from '@/components/layouts/main-layout';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const tokenExists = req.cookies['token'];
  if (!tokenExists) return { redirect: { destination: '/login', permanent: true } };
  return { props: {} }
};


export default function Home() {
  return (
    <MainLayout>
      <h1>hello homepage</h1>
    </MainLayout>
  );
}
