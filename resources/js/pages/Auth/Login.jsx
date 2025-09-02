import { Link, useForm } from '@inertiajs/react';

// SVG Icons
const BackIcon = () => (
    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
);
const UserIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
    </svg>
);
const LockIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        ></path>
    </svg>
);

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
        <div className="relative flex min-h-screen items-center justify-center bg-gray-50 p-4 text-gray-800 antialiased">
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

            {/* Back Button */}
            <div className="absolute left-6 top-6 z-20 sm:left-8 sm:top-8">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                >
                    <BackIcon />
                    Beranda
                </Link>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Login Admin</h2>
                    <p className="mt-2 text-gray-500">Selamat datang, silakan masuk.</p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon />
                            </div>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="Username"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3.5 pl-10 text-base text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockIcon />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3.5 pl-10 text-base text-gray-800 placeholder-gray-400 shadow-sm transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full transform rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
