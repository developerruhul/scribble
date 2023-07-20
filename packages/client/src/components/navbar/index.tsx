import { Icons } from '@/components/icons';
import Link from 'next/link';
import AuthedNavItems from './authed-nav-items';
import { ThemeToggler } from '../theme-toggler';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Button } from '../ui/button';
import { useSSRStore } from '@/lib/stores';

const Navbar = () => {
  const isLoggedIn = useSSRStore(useAuthStore, (s) => Boolean(s.token));

  return (
    <header className="w-full bg-slate-600/5 dark:bg-emerald-900/10 border-b fixed top-0 left-0 select-none">
      <nav className="container py-1 md:py-2 flex justify-between items-center">
        <Link href={'/'}>
          <Icons.logo className="text-[40px]" />
        </Link>

        <section className="flex items-center space-x-4 sm:space-x-6 relative">
          <ThemeToggler />

          {isLoggedIn ? (
            <AuthedNavItems />
          ) : (
            <>
              <div className='flex items-center space-x-2'>
                <Button asChild variant={"secondary"} size={'sm'}>
                  <Link href={'/register'}>Sign up</Link>
                </Button>
                <Button asChild size={'sm'}>
                  <Link href={'/login'}>Log in</Link>
                </Button>
              </div>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
