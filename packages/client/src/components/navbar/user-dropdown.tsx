import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/auth-store';

function UserAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback className="font-bold bg-black text-white dark:bg-white dark:text-black">
        CN
      </AvatarFallback>
    </Avatar>
  );
}

export default function UserDropdown() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <section className="px-2 pb-2 pt-1">
          <h3 className="text-lg">Developer Ruhul</h3>
          <p className="truncate">ruhulamin.webdev@gmail.com</p>
        </section>

        <DropdownMenuSeparator />
        <div className="space-y-2 my-2">
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={'/profile'}>
              <Icons.User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={'/settings/billing'}>
              <Icons.CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href={'/settings'}>
              <Icons.Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            className="outline-none cursor-pointer w-full"
            onClick={logout}
          >
            <Icons.LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
