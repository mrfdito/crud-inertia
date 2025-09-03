import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// SVG Icons
const SearchIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
        />
    </svg>
);

const BackIcon = () => (
    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
);

export default function CariMahasiswa() {
    const { mahasiswa: initialMahasiswa, query: initialQuery } = usePage().props;
    const [search, setSearch] = useState(initialQuery || '');

    return (
        <div className="relative min-h-screen w-full bg-gray-50 text-gray-800 antialiased">
            {/* Background Pattern */}
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

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-4xl p-6 sm:p-8">
                {/* Back button */}
                <header className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                    >
                        <BackIcon />
                        Kembali
                    </Link>
                </header>

                <main>
                    <h1 className="mb-2 text-3xl font-bold text-slate-900">Hasil Pencarian</h1>
                    <p className="mb-8 text-lg text-gray-500">
                        Menampilkan hasil untuk: <span className="font-semibold text-gray-700">"{initialQuery}"</span>
                    </p>

                    {/* Search bar */}
                    <form action="/cari-mahasiswa" method="GET" className="mb-10 flex w-full max-w-xl items-center gap-2">
                        <div className="relative flex-grow">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                name="query"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama atau NIM lain..."
                                className="w-full rounded-lg border border-gray-300 bg-white p-3.5 pl-11 text-base text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="transform rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Results List */}
                    <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-xl backdrop-blur-md">
                        {!initialQuery || initialQuery.trim() === '' ? (
                            <p className="py-8 text-center text-gray-500">Masukkan data mahasiswa terlebih dahulu.</p>
                        ) : initialMahasiswa.length === 0 ? (
                            <p className="py-8 text-center text-gray-500">Maaf, mahasiswa tidak ditemukan.</p>
                        ) : (
                            <ul className="space-y-4">
                                {initialMahasiswa.map((m) => (
                                    <li
                                        key={m.id}
                                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                                    >
                                        <Link href={`/mahasiswa/${m.id}`} className="block">
                                            <p className="text-lg font-semibold text-blue-700">{m.nama}</p>
                                            <p className="text-gray-500">{m.nim}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
