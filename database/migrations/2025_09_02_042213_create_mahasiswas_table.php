<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mahasiswa', function (Blueprint $table) {
    $table->id();
    $table->string('nim', 20)->unique();
    $table->string('nama', 100);
    $table->date('tgl_lahir');
    $table->string('jurusan', 100);
    $table->integer('tahun_masuk');
    $table->integer('tahun_selesai')->nullable();
    $table->enum('status', ['Aktif', 'Lulus', 'Keluar'])->default('Aktif');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswas');
    }
};
