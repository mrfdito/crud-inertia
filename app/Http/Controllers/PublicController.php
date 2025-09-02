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

    $mahasiswa = Mahasiswa::query()
        ->where('nama', 'ILIKE', "%{$query}%")  // PostgreSQL
        ->orWhere('nim', 'like', "%{$query}%")  // NIM biasanya numeric/string
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
