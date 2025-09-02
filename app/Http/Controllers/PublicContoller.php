<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function cariMahasiswa(Request $request)
    {
        $query = $request->input('query');
        $mahasiswa = Mahasiswa::where('nama', 'like', "%{$query}%")
            ->orWhere('nim', 'like', "%{$query}%")
            ->get();

        return Inertia::render('Public/CariMahasiswa', [
            'mahasiswa' => $mahasiswa,
            'query' => $query,
        ]);
    }

    public function detailMahasiswa($id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        return Inertia::render('Public/DetailMahasiswa', [
            'mahasiswa' => $mahasiswa
        ]);
    }
}
