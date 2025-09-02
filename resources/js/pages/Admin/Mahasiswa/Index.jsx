import { useMemo, useState } from 'react';

// --- MOCK DATA & COMPONENTS ---
// In a real Inertia.js app, this data comes from the controller.
const MOCK_MAHASISWA = [
    { id: 1, nim: '110121001', nama: 'Budi Santoso', jurusan: 'Teknik Informatika', tahun_masuk: 2021, status: 'Aktif' },
    { id: 2, nim: '110121002', nama: 'Ani Lestari', jurusan: 'Sistem Informasi', tahun_masuk: 2021, status: 'Aktif' },
    { id: 3, nim: '110220003', nama: 'Citra Dewi', jurusan: 'Teknik Informatika', tahun_masuk: 2020, status: 'Lulus' },
    { id: 4, nim: '110322004', nama: 'Doni Firmansyah', jurusan: 'Desain Grafis', tahun_masuk: 2022, status: 'Aktif' },
    { id: 5, nim: '110120005', nama: 'Eka Putri', jurusan: 'Sistem Informasi', tahun_masuk: 2020, status: 'Lulus' },
    { id: 6, nim: '110223006', nama: 'Fajar Nugraha', jurusan: 'Teknik Informatika', tahun_masuk: 2023, status: 'Aktif' },
    { id: 7, nim: '110319007', nama: 'Gita Wulandari', jurusan: 'Desain Grafis', tahun_masuk: 2019, status: 'Keluar' },
    { id: 8, nim: '110122008', nama: 'Hadi Prasetyo', jurusan: 'Teknik Informatika', tahun_masuk: 2022, status: 'Aktif' },
    { id: 9, nim: '110221009', nama: 'Indah Permata', jurusan: 'Sistem Informasi', tahun_masuk: 2021, status: 'Aktif' },
    { id: 10, nim: '110123010', nama: 'Joko Susilo', jurusan: 'Teknik Informatika', tahun_masuk: 2023, status: 'Aktif' },
    { id: 11, nim: '110322011', nama: 'Kartika Sari', jurusan: 'Desain Grafis', tahun_masuk: 2022, status: 'Aktif' },
    { id: 12, nim: '110220012', nama: 'Lina Marlina', jurusan: 'Sistem Informasi', tahun_masuk: 2020, status: 'Lulus' },
];

// Mock implementation for Inertia.js for demonstration purposes
const Inertia = {
    delete: (url) => console.log(`DELETING to ${url}`),
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
const PlusIcon = () => (
    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
);
const EditIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
        ></path>
    </svg>
);
const DeleteIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
    </svg>
);
const WarningIcon = () => (
    <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
    </svg>
);
const SearchIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
);
const ChevronLeftIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
);
const ChevronRightIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
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
export default function Index({ mahasiswa = MOCK_MAHASISWA }) {
    const [search, setSearch] = useState('');
    const [jurusanFilter, setJurusanFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [tahunFilter, setTahunFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return mahasiswa.filter((m) => {
            const matchesSearch = m.nama.toLowerCase().includes(search.toLowerCase()) || m.nim.includes(search);
            const matchesJurusan = jurusanFilter ? m.jurusan === jurusanFilter : true;
            const matchesStatus = statusFilter ? m.status === statusFilter : true;
            const matchesTahun = tahunFilter ? String(m.tahun_masuk) === String(tahunFilter) : true;
            return matchesSearch && matchesJurusan && matchesStatus && matchesTahun;
        });
    }, [mahasiswa, search, jurusanFilter, statusFilter, tahunFilter]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDeleteClick = (id) => {
        setStudentToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            Inertia.delete(`/admin/mahasiswa/${studentToDelete.id}`);
        }
        setShowDeleteModal(false);
        setStudentToDelete(null);
    };

    const jurusanOptions = [...new Set(mahasiswa.map((m) => m.jurusan))];
    const tahunOptions = [...new Set(mahasiswa.map((m) => m.tahun_masuk))].sort((a, b) => b - a);

    const StatusBadge = ({ status }) => {
        const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
        const statusClasses = {
            Aktif: 'bg-green-100 text-green-800',
            Lulus: 'bg-blue-100 text-blue-800',
            Keluar: 'bg-red-100 text-red-800',
        };
        return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Daftar Mahasiswa</h1>
                        <p className="mt-1 text-gray-500">Kelola data mahasiswa, filter, dan cari data.</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href="/admin/mahasiswa/create"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <PlusIcon />
                            Tambah Mahasiswa
                        </Link>
                    </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-xl backdrop-blur-md">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama atau NIM..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <select
                            value={jurusanFilter}
                            onChange={(e) => setJurusanFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Semua Jurusan</option>
                            {jurusanOptions.map((j) => (
                                <option key={j} value={j}>
                                    {j}
                                </option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Lulus">Lulus</option>
                            <option value="Keluar">Keluar</option>
                        </select>
                        <select
                            value={tahunFilter}
                            onChange={(e) => setTahunFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Semua Tahun</option>
                            {tahunOptions.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-200/50 bg-white/70 shadow-xl backdrop-blur-md">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-gray-50/50 text-xs uppercase text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    NIM
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Jurusan
                                </th>
                                <th scope="col" className="hidden px-6 py-3 lg:table-cell">
                                    Tahun Masuk
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((m) => (
                                    <tr key={m.id} className="border-b bg-white transition hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{m.nim}</td>
                                        <td className="px-6 py-4">{m.nama}</td>
                                        <td className="hidden px-6 py-4 md:table-cell">{m.jurusan}</td>
                                        <td className="hidden px-6 py-4 lg:table-cell">{m.tahun_masuk}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={m.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/admin/mahasiswa/${m.id}/edit`}
                                                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-yellow-100 hover:text-yellow-600"
                                                >
                                                    <EditIcon />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(m)}
                                                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-10 text-center text-gray-500">
                                        Data tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronLeftIcon /> <span className="ml-2">Previous</span>
                        </button>
                        <div className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </div>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="mr-2">Next</span> <ChevronRightIcon />
                        </button>
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <WarningIcon />
                                    <h3 className="mt-2 text-center text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                                        Hapus Mahasiswa
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-center text-sm text-gray-500">
                                            Apakah Anda yakin ingin menghapus data mahasiswa <br />
                                            <span className="font-bold">{studentToDelete?.nama}</span> ({studentToDelete?.nim})? Tindakan ini tidak
                                            dapat dibatalkan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Hapus
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
