import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// --- MOCK COMPONENTS ---
// Mock implementation for Inertia.js for demonstration purposes
const router = {
    post: (url) => console.log(`Posting to ${url}`),
};
const Link = ({ href, children, className }) => (
    <a href={href} className={className}>
        {children}
    </a>
);
// --- END MOCK COMPONENTS ---

// --- SVG ICONS ---
const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);
const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);
const DashboardIcon = () => (
    <svg
        className="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        ></path>
    </svg>
);
const UserGroupIcon = () => (
    <svg
        className="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
    </svg>
);
const LogoutIcon = () => (
    <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        ></path>
    </svg>
);
const TotalIcon = () => (
    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
    </svg>
);
const AktifIcon = () => (
    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
    </svg>
);
const LulusIcon = () => (
    <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        ></path>
    </svg>
);
const KeluarIcon = () => (
    <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
        <line x1="21" y1="21" x2="15" y2="15"></line>
        <line x1="15" y1="21" x2="21" y2="15"></line>
    </svg>
);
// --- END SVG ICONS ---

// --- LAYOUT COMPONENT ---
function AdminLayout({ children }) {
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
            <div className="absolute inset-0 z-0 opacity-50">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(2) rotate(45)">
                            <rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,1)" />
                            <path d="M-10 10h60v20h-60z" strokeWidth="1" stroke="hsla(203, 23%, 89%, 1)" fill="none" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
                </svg>
            </div>
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
                                className={`group flex items-center rounded-lg px-4 py-3 font-medium transition-colors ${link.active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
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
            <div
                className={`fixed inset-0 z-30 bg-black/40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>
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
// --- END LAYOUT COMPONENT ---

export default function Dashboard({ stats = MOCK_STATS, mahasiswaByYear = MOCK_MAHASISWA_BY_YEAR }) {
    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    const aktifPieData = Object.entries(stats.aktifByJurusan).map(([jurusan, count]) => ({ name: jurusan, value: count }));
    const lulusPieData = Object.entries(stats.lulusByJurusan).map(([jurusan, count]) => ({ name: jurusan, value: count }));

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
                    <p className="mt-1 text-gray-500">Ringkasan data statistik mahasiswa.</p>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <SummaryCard Icon={TotalIcon} title="Total Mahasiswa" value={stats.total} />
                    <SummaryCard Icon={AktifIcon} title="Mahasiswa Aktif" value={stats.aktif} />
                    <SummaryCard Icon={LulusIcon} title="Mahasiswa Lulus" value={stats.lulus} />
                    <SummaryCard Icon={KeluarIcon} title="Mahasiswa Keluar" value={stats.keluar} />
                </div>

                {/* Donut Charts */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <ChartCard title="Mahasiswa Aktif per Jurusan">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={aktifPieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={70}
                                    outerRadius={110}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {aktifPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Mahasiswa Lulus per Jurusan">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={lulusPieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={70}
                                    outerRadius={110}
                                    fill="#82ca9d"
                                    paddingAngle={5}
                                    label
                                >
                                    {lulusPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Bar Charts */}
                <div className="grid grid-cols-1 gap-8">
                    <ChartCard title="Tren Mahasiswa Masuk per Tahun">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mahasiswaByYear.masuk} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                                <Legend />
                                <Bar dataKey="count" name="Jumlah Masuk" fill="#3B82F6" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Tren Mahasiswa Lulus per Tahun">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mahasiswaByYear.lulus} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                                <Legend />
                                <Bar dataKey="count" name="Jumlah Lulus" fill="#10B981" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        </AdminLayout>
    );
}

// Reusable components for cards
const SummaryCard = ({ Icon, title, value }) => (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="flex items-center">
            <div className="mr-4 flex-shrink-0">
                <Icon />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h2 className="text-3xl font-bold text-slate-900">{value}</h2>
            </div>
        </div>
    </div>
);

const ChartCard = ({ title, children }) => (
    <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-xl backdrop-blur-md">
        <h3 className="mb-6 text-xl font-bold text-slate-800">{title}</h3>
        {children}
    </div>
);
