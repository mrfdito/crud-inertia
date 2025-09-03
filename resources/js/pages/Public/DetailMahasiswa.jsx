// SVG Icons
const BackIcon = () => (
    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
);

// Helper function to determine status badge color
const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
        case 'aktif':
            return 'bg-green-100 text-green-800';
        case 'lulus':
            return 'bg-blue-100 text-blue-800';
        case 'keluar':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function DetailMahasiswa({ mahasiswa: initialMahasiswa }) {
    const { mahasiswa } = { mahasiswa: initialMahasiswa || MOCK_PROPS.mahasiswa };

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
            <div className="relative z-10 mx-auto max-w-2xl p-6 sm:p-8">
                {/* Back button */}
                <header className="mb-8">
                    {/* The href should ideally go back to the previous search results */}
                    <a
                        href="/cari-mahasiswa"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                    >
                        <BackIcon />
                        Kembali ke Pencarian
                    </a>
                </header>

                <main>
                    <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-md">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-slate-900">{mahasiswa.nama}</h1>
                            <p className="text-lg text-gray-500">{mahasiswa.nim}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-gray-500">Jurusan</span>
                                <span className="font-semibold text-gray-800">{mahasiswa.jurusan}</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-3">
                                <span className="text-gray-500">Tahun Masuk</span>
                                <span className="font-semibold text-gray-800">{mahasiswa.tahun_masuk}</span>
                            </div>
                            {mahasiswa.tahun_selesai && (
                                <div className="flex items-center justify-between border-b pb-3">
                                    <span className="text-gray-500">Tahun Selesai</span>
                                    <span className="font-semibold text-gray-800">{mahasiswa.tahun_selesai}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-gray-500">Status Akademik</span>
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(mahasiswa.status)}`}
                                >
                                    {mahasiswa.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
