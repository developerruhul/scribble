import Link from 'next/link';
import { Icons } from '../icons';
import UserDropdown from './user-dropdown';

const AuthedNavItems = () => {
  return (
    <>
      <Link
        className="flex items-center space-x-1 hover:opacity-80"
        href={'/scribe-post'}
      >
        <Icons.pencil className="text-[22px]" />
        <span className="text-sm">Scribe</span>
      </Link>

      <UserDropdown />
    </>
  );
};

export default AuthedNavItems;
