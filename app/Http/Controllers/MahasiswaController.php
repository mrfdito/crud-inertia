<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index()
    {
        $mahasiswa = Mahasiswa::all(); // nanti bisa ditambah pagination & filter
        return Inertia::render('Admin/Mahasiswa/Index', [
            'mahasiswa' => $mahasiswa
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Mahasiswa/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nim' => 'required|unique:mahasiswa,nim',
            'nama' => 'required|string',
            'tgl_lahir' => 'required|date',
            'jurusan' => 'required|string',
            'tahun_masuk' => 'required|integer',
            'tahun_selesai' => 'nullable|integer',
            'status' => 'required|in:Aktif,Lulus,Keluar',
        ]);

        Mahasiswa::create($validated);

        return redirect()->route('admin.mahasiswa.index');
    }

    public function edit($id)
    {
        $mhs = Mahasiswa::findOrFail($id);
        return Inertia::render('Admin/Mahasiswa/Edit', ['mahasiswa' => $mhs]);
    }

    public function update(Request $request, $id)
    {
        $mhs = Mahasiswa::findOrFail($id);

        $validated = $request->validate([
            'nim' => 'required|unique:mahasiswa,nim,' . $id,
            'nama' => 'required|string',
            'tgl_lahir' => 'required|date',
            'jurusan' => 'required|string',
            'tahun_masuk' => 'required|integer',
            'tahun_selesai' => 'nullable|integer',
            'status' => 'required|in:Aktif,Lulus,Keluar',
        ]);

        $mhs->update($validated);

        return redirect()->route('admin.mahasiswa.index');
    }

    public function destroy($id)
    {
        $mhs = Mahasiswa::findOrFail($id);
        $mhs->delete();

        return redirect()->route('admin.mahasiswa.index');
    }
}
