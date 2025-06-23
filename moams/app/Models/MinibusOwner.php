<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function membership(): HasOne
    {
        return $this->hasOne(Membership::class);
    }

    public function complaints(): HasMany
    {
        return $this->hasMany(Complaint::class);
    }

    public function minibuses(): HasMany
    {
        return $this->hasMany(Minibus::class);
    }

    public function drivers(): HasMany
    {
        return $this->hasMany(Driver::class);
    }

    public function offenses(): HasMany
    {
        return $this->hasMany(Offense::class);
    }
}
