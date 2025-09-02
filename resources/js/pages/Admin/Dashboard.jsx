import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminLayout from '../Layouts/AdminLayout';

export default function Dashboard({ stats, mahasiswaByYear }) {
    // Contoh props yang dikirim dari controller Laravel:
    // stats = { total: 100, aktif: 60, lulus: 30, keluar: 10, aktifByJurusan: {...}, lulusByJurusan: {...} }
    // mahasiswaByYear = { masuk: [{year:2020,count:10},...], lulus:[{year:2020,count:5},...] }

    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

    const aktifPieData = Object.entries(stats.aktifByJurusan).map(([jurusan, count]) => ({ name: jurusan, value: count }));
    const lulusPieData = Object.entries(stats.lulusByJurusan).map(([jurusan, count]) => ({ name: jurusan, value: count }));

    return (
        <AdminLayout>
            <h1 className="mb-6 text-2xl font-bold">Dashboard Admin</h1>

            {/* Summary */}
            <div className="mb-8 grid grid-cols-4 gap-4">
                <div className="rounded bg-white p-4 text-center shadow">
                    <p>Total Mahasiswa</p>
                    <h2 className="text-xl font-bold">{stats.total}</h2>
                </div>
                <div className="rounded bg-white p-4 text-center shadow">
                    <p>Mahasiswa Aktif</p>
                    <h2 className="text-xl font-bold">{stats.aktif}</h2>
                </div>
                <div className="rounded bg-white p-4 text-center shadow">
                    <p>Mahasiswa Lulus</p>
                    <h2 className="text-xl font-bold">{stats.lulus}</h2>
                </div>
                <div className="rounded bg-white p-4 text-center shadow">
                    <p>Mahasiswa Keluar</p>
                    <h2 className="text-xl font-bold">{stats.keluar}</h2>
                </div>
            </div>

            {/* Donut Charts */}
            <div className="mb-8 grid grid-cols-2 gap-8">
                <div className="rounded bg-white p-4 shadow">
                    <h3 className="mb-4 text-lg font-bold">Mahasiswa Aktif per Jurusan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={aktifPieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} fill="#8884d8" label>
                                {aktifPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded bg-white p-4 shadow">
                    <h3 className="mb-4 text-lg font-bold">Mahasiswa Lulus per Jurusan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={lulusPieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} fill="#82ca9d" label>
                                {lulusPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Charts */}
            <div className="mb-8 grid grid-cols-1 gap-8">
                <div className="rounded bg-white p-4 shadow">
                    <h3 className="mb-4 text-lg font-bold">Mahasiswa Masuk per Tahun</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mahasiswaByYear.masuk}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#0088FE" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded bg-white p-4 shadow">
                    <h3 className="mb-4 text-lg font-bold">Mahasiswa Lulus per Tahun</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mahasiswaByYear.lulus}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AdminLayout>
    );
}
