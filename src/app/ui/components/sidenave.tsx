import NavLinks from '@/app/ui/components/nav-link';
import UserButton from './login/user-button';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3">
      <div className="flex justify-between items-center py-4 gap-4">
        <NavLinks />
        <UserButton />
      </div>
    </div>
  );
}