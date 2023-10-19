'use client';
import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';
const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ];
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            className={classnames({
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover:text-zinc-800 transition-colors': true
                            })}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Box>
                {status === 'authenticated' && <Link href="/api/auth/signout">Log Out</Link>}
                {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
            </Box>
        </nav>
    );
};
//"text-zinc-500 hover:text-zinc-800"
//`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800`
export default NavBar;
