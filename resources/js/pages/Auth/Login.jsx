import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', data, {
            onError: (err) => console.log(err),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-96 rounded-xl bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Login Admin</h2>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Username</label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            className="w-full rounded-md border p-2"
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-md border p-2"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <button type="submit" className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
