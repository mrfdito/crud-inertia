import AdminLayout from '@/pages/Layouts/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Index({ mahasiswa }) {
    const [search, setSearch] = useState('');
    const [jurusanFilter, setJurusanFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [tahunFilter, setTahunFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // Filter & search
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

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus mahasiswa ini?')) {
            Inertia.delete(`/admin/mahasiswa/${id}`);
        }
    };

    // Ambil daftar jurusan & tahun unik dari data mahasiswa
    const jurusanOptions = [...new Set(mahasiswa.map((m) => m.jurusan))];
    const tahunOptions = [...new Set(mahasiswa.map((m) => m.tahun_masuk))];

    return (
        <AdminLayout>
            <h1 className="mb-4 text-2xl font-bold">Daftar Mahasiswa</h1>

            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:space-x-4">
                <input
                    type="text"
                    placeholder="Cari nama atau NIM"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded border p-2"
                />
                <select value={jurusanFilter} onChange={(e) => setJurusanFilter(e.target.value)} className="rounded border p-2">
                    <option value="">Semua Jurusan</option>
                    {jurusanOptions.map((j) => (
                        <option key={j} value={j}>
                            {j}
                        </option>
                    ))}
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded border p-2">
                    <option value="">Semua Status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Lulus">Lulus</option>
                    <option value="Keluar">Keluar</option>
                </select>
                <select value={tahunFilter} onChange={(e) => setTahunFilter(e.target.value)} className="rounded border p-2">
                    <option value="">Semua Tahun</option>
                    {tahunOptions.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <Link href="/admin/mahasiswa/create" className="rounded bg-blue-500 px-4 py-2 text-white">
                    Tambah Mahasiswa
                </Link>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">NIM</th>
                        <th className="border px-4 py-2">Nama</th>
                        <th className="border px-4 py-2">Jurusan</th>
                        <th className="border px-4 py-2">Tahun Masuk</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((m) => (
                        <tr key={m.id}>
                            <td className="border px-4 py-2">{m.nim}</td>
                            <td className="border px-4 py-2">{m.nama}</td>
                            <td className="border px-4 py-2">{m.jurusan}</td>
                            <td className="border px-4 py-2">{m.tahun_masuk}</td>
                            <td className="border px-4 py-2">{m.status}</td>
                            <td className="space-x-2 border px-4 py-2">
                                <Link href={`/admin/mahasiswa/${m.id}/edit`} className="rounded bg-yellow-400 px-2 py-1">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(m.id)} className="rounded bg-red-500 px-2 py-1 text-white">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded border px-3 py-1 disabled:opacity-50"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`rounded border px-3 py-1 ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded border px-3 py-1 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </AdminLayout>
    );
}
