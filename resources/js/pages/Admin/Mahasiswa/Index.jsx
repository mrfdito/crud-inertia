import AdminLayout from '@/pages/Layouts/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Index({ mahasiswa }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus mahasiswa ini?')) {
            Inertia.delete(`/admin/mahasiswa/${id}`);
        }
    };

    return (
        <AdminLayout>
            <h1 className="mb-4 text-2xl font-bold">Daftar Mahasiswa</h1>
            <Link href="/admin/mahasiswa/create" className="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white">
                Tambah Mahasiswa
            </Link>

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
                    {mahasiswa.map((m) => (
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
        </AdminLayout>
    );
}
