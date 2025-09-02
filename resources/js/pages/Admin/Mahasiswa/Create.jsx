import AdminLayout from '@/pages/Layouts/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

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

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Tambah Mahasiswa</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="nim" placeholder="NIM" value={data.nim} onChange={handleChange} className="w-full rounded border p-2" required />
                    <input name="nama" placeholder="Nama" value={data.nama} onChange={handleChange} className="w-full rounded border p-2" required />
                    <input
                        type="date"
                        name="tgl_lahir"
                        value={data.tgl_lahir}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                        required
                    />
                    <select name="jurusan" value={data.jurusan} onChange={handleChange} className="w-full rounded border p-2">
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

                    <input
                        type="number"
                        name="tahun_masuk"
                        placeholder="Tahun Masuk"
                        value={data.tahun_masuk}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                        required
                    />
                    <input
                        type="number"
                        name="tahun_selesai"
                        placeholder="Tahun Selesai"
                        value={data.tahun_selesai}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    />
                    <select name="status" value={data.status} onChange={handleChange} className="w-full rounded border p-2">
                        <option value="Aktif">Aktif</option>
                        <option value="Lulus">Lulus</option>
                        <option value="Keluar">Keluar</option>
                    </select>
                    <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                        Simpan
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
