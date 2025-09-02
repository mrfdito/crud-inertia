import AdminLayout from '../layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout>
            <h1 className="mb-4 text-2xl font-bold">Selamat datang di Dashboard Admin</h1>
            <p>Gunakan menu di kiri untuk mengelola mahasiswa.</p>
        </AdminLayout>
    );
}
