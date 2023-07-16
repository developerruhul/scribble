import { Icons } from '@/components/icons';
import Link from 'next/link';
import AuthedNavItems from './authed-nav-items';
import { ThemeToggler } from '../theme-toggler';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Button } from '../ui/button';
import { useSSRStore } from '@/lib/stores';

const Navbar = () => {
  const isLoggedIn = useSSRStore(useAuthStore, (s) => Boolean(s.jwt));
  const login = useAuthStore((s) => s.login);

  return (
    <header className="w-full bg-slate-600/5 dark:bg-emerald-900/10 border-b fixed top-0 left-0 select-none">
      <nav className="container px-2 sm:px-4 md:px-16 py-2 flex justify-between items-center">
        <Link href={'/'}>
          <Icons.logo className="text-[40px]" />
        </Link>

        <section className="flex items-center space-x-4 sm:space-x-6 relative">
          <ThemeToggler />

          {isLoggedIn ? (
            <AuthedNavItems />
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                login(
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                );
              }}
              asChild
              size={'sm'}
            >
              <Link href={'/login'}>Log in</Link>
            </Button>
          )}
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
