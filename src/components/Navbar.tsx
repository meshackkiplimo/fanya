'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto max-w-4xl flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
              '/'
            )}`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
              '/dashboard'
            )}`}
          >
            Dashboard
          </Link>
          <Link
            href="/past-tasks"
            className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
              '/past-tasks'
            )}`}
          >
            Past Tasks
          </Link>
          <Link
            href="/add-task"
            className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
              '/add-task'
            )}`}
          >
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
};