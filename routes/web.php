<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\PublicController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Halaman hasil pencarian
Route::get('/cari-mahasiswa', [App\Http\Controllers\PublicController::class, 'cariMahasiswa']);

// Halaman detail mahasiswa
Route::get('/mahasiswa/{id}', [App\Http\Controllers\PublicController::class, 'detailMahasiswa']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/about', function () {
    return Inertia::render('About');
});


Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
        ->name('admin.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::prefix('admin/mahasiswa')->group(function () {
        Route::get('/', [MahasiswaController::class, 'index'])->name('admin.mahasiswa.index');
        Route::get('/create', [MahasiswaController::class, 'create'])->name('admin.mahasiswa.create');
        Route::post('/', [MahasiswaController::class, 'store'])->name('admin.mahasiswa.store');
        Route::get('/{id}/edit', [MahasiswaController::class, 'edit'])->name('admin.mahasiswa.edit');
        Route::put('/{id}', [MahasiswaController::class, 'update'])->name('admin.mahasiswa.update');
        Route::delete('/{id}', [MahasiswaController::class, 'destroy'])->name('admin.mahasiswa.destroy');
    });
});

