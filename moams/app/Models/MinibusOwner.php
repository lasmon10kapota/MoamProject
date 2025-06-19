<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MinibusOwner extends Model
{
    /** @use HasFactory<\Database\Factories\MinibusOwnerFactory> */
    use HasFactory;

    protected $fillable = [
        'district',
        'village',
        'national_id',
        'num_of_vehicles',
    ];
}
