'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon  },
  { name: 'About', href: '/home/about', icon: UserGroupIcon},
  { name: 'Experience', href: '/home/experience', icon: UserGroupIcon},
  { name: 'Projects', href: '/home/project', icon: UserGroupIcon},
  { name: 'Course', href: '/home/course', icon: UserGroupIcon},
  { name: 'Blogs', href: '/home/blog', icon: DocumentDuplicateIcon },
  { name: 'Contact', href: '/home/contact', icon: EnvelopeIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            pathname === link.href
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <p className="hidden md:block" style={{ color: 'Black' }}>{link.name}</p>
        </Link>
      ))}
    </>
  );
}
