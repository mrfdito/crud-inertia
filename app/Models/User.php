<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'id';

    protected $fillable = [
        'username', 'password', 'role',
    ];

    protected $hidden = [
        'password',
    ];

    // Gunakan username sebagai identifier login

}
