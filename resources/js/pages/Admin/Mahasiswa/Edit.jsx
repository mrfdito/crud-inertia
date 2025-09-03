import AdminLayout from '@/pages/Layouts/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

export default function Edit({ mahasiswa }) {
    const [data, setData] = useState({
        id: '',
        nim: '',
        nama: '',
        tgl_lahir: '',
        jurusan: '',
        tahun_masuk: '',
        tahun_selesai: '',
        status: 'Aktif',
    });

    useEffect(() => {
        if (mahasiswa) setData(mahasiswa);
    }, [mahasiswa]);

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/admin/mahasiswa/${data.id}`, data);
    };

    return (
        <AdminLayout>
            <div className="mx-auto max-w-4xl">
                {/* Form Container */}
                <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-md md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* NIM */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">NIM</label>
                                <input
                                    name="nim"
                                    placeholder="NIM Mahasiswa"
                                    value={data.nim || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            {/* Nama */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                <input
                                    name="nama"
                                    placeholder="Nama Lengkap"
                                    value={data.nama || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="tgl_lahir"
                                    value={data.tgl_lahir || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            {/* Jurusan */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Jurusan</label>
                                <select
                                    name="jurusan"
                                    value={data.jurusan || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    required
                                >
                                    <option value="">Pilih Jurusan</option>
                                    <option value="Ilmu Komputer">Ilmu Komputer</option>
                                    <option value="Teknik Elektro">Teknik Elektro</option>
                                    <option value="Hukum">Hukum</option>
                                    <option value="Akuntansi">Akuntansi</option>
                                    <option value="Manajemen">Manajemen</option>
                                    <option value="Psikologi">Psikologi</option>
                                    <option value="Sastra Inggris">Sastra Inggris</option>
                                    <option value="Fisika">Fisika</option>
                                    <option value="Matematika">Matematika</option>
                                    <option value="Biologi">Biologi</option>
                                </select>
                            </div>

                            {/* Tahun Masuk */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Tahun Masuk</label>
                                <input
                                    type="number"
                                    name="tahun_masuk"
                                    placeholder="Contoh: 2024"
                                    value={data.tahun_masuk || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="status"
                                    value={data.status || 'Aktif'}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Lulus">Lulus</option>
                                    <option value="Keluar">Keluar</option>
                                </select>
                            </div>

                            {/* Tahun Selesai */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Tahun Selesai (opsional)</label>
                                <input
                                    type="number"
                                    name="tahun_selesai"
                                    placeholder="Isi jika status Lulus/Keluar"
                                    value={data.tahun_selesai || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <a
                                href="/admin/mahasiswa"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                            >
                                Batal
                            </a>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Update Data
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
