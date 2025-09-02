import { Link, router } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="mb-6 text-xl font-bold">Admin Panel</h1>

                    <nav className="space-y-2">
                        <Link href="/admin/dashboard" className="block rounded px-4 py-2 hover:bg-gray-200">
                            Dashboard
                        </Link>
                        <Link href="/admin/mahasiswa" className="block rounded px-4 py-2 hover:bg-gray-200">
                            Mahasiswa
                        </Link>
                        <button onClick={handleLogout} className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-left text-white hover:bg-red-700">
                            Logout
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
