import { useState } from 'react';

// SVG Icon for Search
const SearchIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
        />
    </svg>
);

export default function Welcome() {
    const [search, setSearch] = useState('');

    return (
        <div className="relative min-h-screen w-full bg-gray-50 text-gray-800 antialiased">
            {/* Subtle Background Pattern */}
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

            {/* Main Container */}
            <div className="relative z-10 flex min-h-screen flex-col p-6 sm:p-8">
                {/* Header with Login Button */}
                <header className="flex w-full justify-end">
                    <a
                        href="/login"
                        className="transform rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login Admin
                    </a>
                </header>

                {/* Centered Content */}
                <main className="flex flex-1 flex-col items-center justify-center text-center">
                    <div className="w-full max-w-2xl rounded-2xl border border-gray-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-md">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Sistem Informasi Akademik</h1>
                        <p className="mb-10 text-lg text-gray-600 sm:text-xl">
                            Temukan data mahasiswa berdasarkan Nama atau NIM dengan cepat dan akurat.
                        </p>

                        {/* Search Form */}
                        <form action="/cari-mahasiswa" method="GET" className="flex w-full items-center gap-2">
                            <div className="relative flex-grow">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Masukkan nama atau NIM mahasiswa..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full py-4 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Sistem Informasi Akademik. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
