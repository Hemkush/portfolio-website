'use client';
import React from 'react';
import {
  AcademicCapIcon,
  UserIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  LightBulbIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';

// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// import Link from 'next/link';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon  },
  { name: 'About', href: '/home/about', icon: UserIcon},
  { name: 'Experience', href: '/home/experience', icon: AcademicCapIcon},
  { name: 'Projects', href: '/home/project', icon: LightBulbIcon},
  { name: 'Course', href: '/home/course', icon: BookOpenIcon },
  { name: 'Blogs', href: '/home/blog', icon: DocumentDuplicateIcon },
  { name: 'Contact', href: '/home/contact', icon: EnvelopeIcon }
];

// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <>
//       {links.map((link) => (
//         <Link
//   key={link.name}
//   href={link.href}
//   className={clsx(
//     'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
//     pathname === link.href
//       ? 'bg-gray-200 text-gray-900'
//       : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//   )}
// >
//   <p
//     className={clsx('text-sm', {
//       'hidden md:block': link.name.length > 10, // hide on mobile if text is too long
//       'block': link.name.length <= 10, // show on mobile if text is short
//     })}
//     style={{ color: 'Black' }}
//   >
//     {link.name}
//   </p>
   
// </Link>

//       ))}
      
//     </>
//   );
// }

export default function NavLinks() {
   const pathname = usePathname();
   const [currentPage, setCurrentPage] = React.useState(pathname);

   const handleNavClick = (href: string) => {
     setCurrentPage(href);
     window.location.href = href;
   };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800/60 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <nav className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
            <span className="text-xl font-bold text-white">Hemant Kushwaha</span>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => {
              const isActive = currentPage === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href)
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
                    ${isActive
                      ? 'bg-gray-800/60 text-gray-300'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }
                  `}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
           {/* Mobile Menu */}
            <div className="md:hidden">
                <select 
                    className="bg-gray-800 text-white border border-gray-700 rounded p-2 capitalize"
                    value={currentPage}
                    onChange={(e) => handleNavClick(e.target.value)}
                >
                    {links.map(item => <option key={item.name} value={item.href}>{item.name}</option>)}
                </select>
            </div>
        </div>
      </nav>
    </header>
  );
};


