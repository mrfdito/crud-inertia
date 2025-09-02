import { useState } from 'react';

// --- MOCK DATA & COMPONENTS ---
// Mock implementation for Inertia.js for demonstration purposes
const Inertia = {
    post: (url, data) => {
        console.log(`POSTING to ${url} with data:`, data);
        alert('Data mahasiswa baru berhasil disimpan! (simulasi)');
    },
};
const Link = ({ href, children, className }) => (
    <a href={href} className={className}>
        {children}
    </a>
);
// --- END MOCK DATA & COMPONENTS ---

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
const SaveIcon = () => (
    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
        ></path>
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

// --- PAGE COMPONENT ---
export default function Create() {
    const [data, setData] = useState({
        nim: '',
        nama: '',
        tgl_lahir: '',
        jurusan: '',
        tahun_masuk: '',
        tahun_selesai: '',
        status: 'Aktif',
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/admin/mahasiswa', data);
    };

    const FormInput = ({ id, label, ...props }) => (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input id={id} {...props} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
    );

    const FormSelect = ({ id, label, children, ...props }) => (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select id={id} {...props} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500">
                {children}
            </select>
        </div>
    );

    return (
        <AdminLayout>
            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">Tambah Mahasiswa Baru</h1>
                    <p className="mt-1 text-gray-500">Isi formulir di bawah ini untuk menambahkan data mahasiswa baru.</p>
                </div>

                <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormInput
                                id="nim"
                                name="nim"
                                label="NIM"
                                placeholder="NIM Mahasiswa"
                                value={data.nim}
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="nama"
                                name="nama"
                                label="Nama Lengkap"
                                placeholder="Nama Lengkap"
                                value={data.nama}
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                id="tgl_lahir"
                                name="tgl_lahir"
                                label="Tanggal Lahir"
                                type="date"
                                value={data.tgl_lahir}
                                onChange={handleChange}
                                required
                            />
                            <FormSelect id="jurusan" name="jurusan" label="Jurusan" value={data.jurusan} onChange={handleChange} required>
                                <option value="">Pilih Jurusan</option>
                                <option value="Teknik Informatika">Teknik Informatika</option>
                                <option value="Sistem Informasi">Sistem Informasi</option>
                                <option value="Desain Grafis">Desain Grafis</option>
                                <option value="Ilmu Komputer">Ilmu Komputer</option>
                                <option value="Teknik Elektro">Teknik Elektro</option>
                                <option value="Hukum">Hukum</option>
                                <option value="Akuntansi">Akuntansi</option>
                                <option value="Manajemen">Manajemen</option>
                            </FormSelect>
                            <FormInput
                                id="tahun_masuk"
                                name="tahun_masuk"
                                label="Tahun Masuk"
                                type="number"
                                placeholder="Contoh: 2024"
                                value={data.tahun_masuk}
                                onChange={handleChange}
                                required
                            />
                            <FormSelect id="status" name="status" label="Status Awal" value={data.status} onChange={handleChange}>
                                <option value="Aktif">Aktif</option>
                                <option value="Lulus">Lulus</option>
                                <option value="Keluar">Keluar</option>
                            </FormSelect>
                            <div className="md:col-span-2">
                                <FormInput
                                    id="tahun_selesai"
                                    name="tahun_selesai"
                                    label="Tahun Selesai (opsional)"
                                    type="number"
                                    placeholder="Isi jika status Lulus/Keluar"
                                    value={data.tahun_selesai}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <Link
                                href="/admin/mahasiswa"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <SaveIcon />
                                Simpan Data
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
