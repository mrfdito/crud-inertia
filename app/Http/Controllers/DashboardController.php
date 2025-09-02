<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Hitung total mahasiswa dan status
        $total = Mahasiswa::count();
        $aktif = Mahasiswa::where('status', 'Aktif')->count();
        $lulus = Mahasiswa::where('status', 'Lulus')->count();
        $keluar = Mahasiswa::where('status', 'Keluar')->count();

        // Distribusi mahasiswa Aktif per jurusan
        $aktifByJurusan = Mahasiswa::where('status', 'Aktif')
            ->select('jurusan', DB::raw('count(*) as count'))
            ->groupBy('jurusan')
            ->pluck('count', 'jurusan')
            ->toArray();

        // Distribusi mahasiswa Lulus per jurusan
        $lulusByJurusan = Mahasiswa::where('status', 'Lulus')
            ->select('jurusan', DB::raw('count(*) as count'))
            ->groupBy('jurusan')
            ->pluck('count', 'jurusan')
            ->toArray();

        // Mahasiswa masuk per tahun
        $masukByYear = Mahasiswa::select('tahun_masuk as year', DB::raw('count(*) as count'))
            ->groupBy('tahun_masuk')
            ->orderBy('tahun_masuk')
            ->get();

        // Mahasiswa lulus per tahun
        $lulusByYear = Mahasiswa::select('tahun_selesai as year', DB::raw('count(*) as count'))
            ->whereNotNull('tahun_selesai')
            ->groupBy('tahun_selesai')
            ->orderBy('tahun_selesai')
            ->get();

        // Kirim data ke Inertia
        return Inertia::render('Admin/Dashboard', [
            'stats' => compact('total', 'aktif', 'lulus', 'keluar', 'aktifByJurusan', 'lulusByJurusan'),
            'mahasiswaByYear' => [
                'masuk' => $masukByYear,
                'lulus' => $lulusByYear
            ]
        ]);
    }
}
