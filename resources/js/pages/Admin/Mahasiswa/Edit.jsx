import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

export default function Edit({ mahasiswa }) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (mahasiswa) setData(mahasiswa);
    }, [mahasiswa]);

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/admin/mahasiswa/${data.id}`, data);
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Edit Mahasiswa</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="nim" placeholder="NIM" value={data.nim || ''} onChange={handleChange} className="w-full rounded border p-2" required />
                <input
                    name="nama"
                    placeholder="Nama"
                    value={data.nama || ''}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                    required
                />
                <input
                    type="date"
                    name="tgl_lahir"
                    value={data.tgl_lahir || ''}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                    required
                />
                <input
                    name="jurusan"
                    placeholder="Jurusan"
                    value={data.jurusan || ''}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                    required
                />
                <input
                    type="number"
                    name="tahun_masuk"
                    placeholder="Tahun Masuk"
                    value={data.tahun_masuk || ''}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                    required
                />
                <input
                    type="number"
                    name="tahun_selesai"
                    placeholder="Tahun Selesai"
                    value={data.tahun_selesai || ''}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                />
                <select name="status" value={data.status || 'Aktif'} onChange={handleChange} className="w-full rounded border p-2">
                    <option value="Aktif">Aktif</option>
                    <option value="Lulus">Lulus</option>
                    <option value="Keluar">Keluar</option>
                </select>
                <button type="submit" className="rounded bg-green-500 px-4 py-2 text-white">
                    Update
                </button>
            </form>
        </div>
    );
}
