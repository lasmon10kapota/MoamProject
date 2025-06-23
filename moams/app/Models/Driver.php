<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    /** @use HasFactory<\Database\Factories\DriverFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'district',
        'driver_license',
    ];

    public function minibusOwner(): BelongsTo
    {
        return $this->belongsTo(MinibusOwner::class, 'minibus_owner_id');
    }
}
