import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminLayout from '../Layouts/AdminLayout'; // ✅ panggil layout dari folder Layouts

// --- MOCK COMPONENTS ---
const Link = ({ href, children, className }) => (
    <a href={href} className={className}>
        {children}
    </a>
);
// --- END MOCK COMPONENTS ---

// --- SVG ICONS ---
const TotalIcon = () => (
    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
    </svg>
);
const AktifIcon = () => (
    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
    </svg>
);
const LulusIcon = () => (
    <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        ></path>
    </svg>
);
const KeluarIcon = () => (
    <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
        <line x1="21" y1="21" x2="15" y2="15"></line>
        <line x1="15" y1="21" x2="21" y2="15"></line>
    </svg>
);
// --- END SVG ICONS ---

export default function Dashboard({ stats = MOCK_STATS, mahasiswaByYear = MOCK_MAHASISWA_BY_YEAR }) {
    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    const aktifPieData = Object.entries(stats.aktifByJurusan).map(([jurusan, count]) => ({ name: jurusan, value: count }));
    const lulusPieData = Object.entries(stats.lulusByJurusan).map(([jurusan, count]) => ({ name: jurusan, value: count }));

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
                    <p className="mt-1 text-gray-500">Ringkasan data statistik mahasiswa.</p>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <SummaryCard Icon={TotalIcon} title="Total Mahasiswa" value={stats.total} />
                    <SummaryCard Icon={AktifIcon} title="Mahasiswa Aktif" value={stats.aktif} />
                    <SummaryCard Icon={LulusIcon} title="Mahasiswa Lulus" value={stats.lulus} />
                    <SummaryCard Icon={KeluarIcon} title="Mahasiswa Keluar" value={stats.keluar} />
                </div>

                {/* Donut Charts */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <ChartCard title="Mahasiswa Aktif per Jurusan">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={aktifPieData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {aktifPieData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Mahasiswa Lulus per Jurusan">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={lulusPieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={5} label>
                                    {lulusPieData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Bar Charts */}
                <div className="grid grid-cols-1 gap-8">
                    <ChartCard title="Tren Mahasiswa Masuk per Tahun">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mahasiswaByYear.masuk} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                                <Legend />
                                <Bar dataKey="count" name="Jumlah Masuk" fill="#3B82F6" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="Tren Mahasiswa Lulus per Tahun">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mahasiswaByYear.lulus} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                                <Legend />
                                <Bar dataKey="count" name="Jumlah Lulus" fill="#10B981" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        </AdminLayout>
    );
}

// Reusable components
const SummaryCard = ({ Icon, title, value }) => (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="flex items-center">
            <div className="mr-4 flex-shrink-0">
                <Icon />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h2 className="text-3xl font-bold text-slate-900">{value}</h2>
            </div>
        </div>
    </div>
);

const ChartCard = ({ title, children }) => (
    <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-xl backdrop-blur-md">
        <h3 className="mb-6 text-xl font-bold text-slate-800">{title}</h3>
        {children}
    </div>
);
