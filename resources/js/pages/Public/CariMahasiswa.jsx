import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CariMahasiswa() {
    const { mahasiswa: initialMahasiswa, query: initialQuery } = usePage().props;
    const [search, setSearch] = useState(initialQuery || '');

    return (
        <div className="min-h-screen p-8">
            {/* Back button */}
            <div className="mb-4">
                <Link href="/" className="inline-block rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
                    &larr; Back
                </Link>
            </div>

            <h1 className="mb-4 text-2xl font-bold">Hasil Pencarian: "{initialQuery}"</h1>

            {/* Search bar */}
            <form action="/cari-mahasiswa" method="GET" className="mb-6 flex max-w-md">
                <input
                    type="text"
                    name="query"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Masukkan nama atau NIM mahasiswa..."
                    className="flex-1 rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Search
                </button>
            </form>

            {/* List mahasiswa */}
            {initialMahasiswa.length === 0 ? (
                <p>Maaf, mahasiswa tidak ditemukan.</p>
            ) : (
                <ul className="space-y-2">
                    {initialMahasiswa.map((m) => (
                        <li key={m.id} className="rounded border p-4 hover:bg-gray-100">
                            <Link href={`/mahasiswa/${m.id}`} className="font-medium text-blue-600">
                                {m.nama} ({m.nim})
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
