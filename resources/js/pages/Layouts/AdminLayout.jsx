import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

// --- SVG ICONS ---
const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);
const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);
const DashboardIcon = () => (
    <svg className="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        ></path>
    </svg>
);
const UserGroupIcon = () => (
    <svg className="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
    </svg>
);
const LogoutIcon = () => (
    <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        ></path>
    </svg>
);

// --- LAYOUT COMPONENT ---
export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const navLinks = [
        { href: '/admin/dashboard', text: 'Dashboard', icon: <DashboardIcon />, active: currentPath.startsWith('/admin/dashboard') },
        { href: '/admin/mahasiswa', text: 'Mahasiswa', icon: <UserGroupIcon />, active: currentPath.startsWith('/admin/mahasiswa') },
    ];

    return (
        <div className="relative min-h-screen w-full bg-gray-50 text-gray-800 antialiased">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="border-b p-6 text-center">
                        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                        <p className="text-sm text-gray-500">Manajemen Data</p>
                    </div>
                    <nav className="flex-grow space-y-2 p-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group flex items-center rounded-lg px-4 py-3 font-medium transition-colors ${
                                    link.active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                    <div className="border-t p-4">
                        <button
                            onClick={handleLogout}
                            className="group flex w-full items-center rounded-lg px-4 py-3 text-left font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
                        >
                            <LogoutIcon />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 z-30 bg-black/40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Main content */}
            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-md lg:justify-end">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900 lg:hidden">
                        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <div className="text-right">
                        <p className="font-semibold text-gray-800">Admin User</p>
                    </div>
                </header>
                <main className="p-6 sm:p-8">{children}</main>
            </div>
        </div>
    );
}
