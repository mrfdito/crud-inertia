import { useState } from 'react';

export default function Welcome() {
    const [search, setSearch] = useState('');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-6 text-3xl font-bold">Selamat datang di Sistem Mahasiswa</h1>

            {/* Search bar */}
            <form action="/cari-mahasiswa" method="GET" className="flex w-full max-w-md">
                <input
                    type="text"
                    name="query"
                    placeholder="Masukkan nama atau NIM mahasiswa..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Search
                </button>
            </form>
        </div>
    );
}
