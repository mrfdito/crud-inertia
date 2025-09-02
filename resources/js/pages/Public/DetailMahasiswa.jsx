import { Link } from '@inertiajs/react';

export default function DetailMahasiswa({ mahasiswa }) {
    return (
        <div className="min-h-screen p-8">
            {/* Back button */}
            <div className="mb-4">
                <Link href="/cari-mahasiswa" className="inline-block rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
                    &larr; Back
                </Link>
            </div>

            <h1 className="mb-4 text-2xl font-bold">Detail Mahasiswa</h1>

            <div className="rounded border bg-white p-4 shadow-md">
                <p>
                    <strong>NIM:</strong> {mahasiswa.nim}
                </p>
                <p>
                    <strong>Nama:</strong> {mahasiswa.nama}
                </p>
                <p>
                    <strong>Jurusan:</strong> {mahasiswa.jurusan}
                </p>
                <p>
                    <strong>Tahun Masuk:</strong> {mahasiswa.tahun_masuk}
                </p>
                <p>
                    <strong>Status:</strong> {mahasiswa.status}
                </p>
                {mahasiswa.tahun_selesai && (
                    <p>
                        <strong>Tahun Selesai:</strong> {mahasiswa.tahun_selesai}
                    </p>
                )}
            </div>
        </div>
    );
}
