<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Minibus extends Model
{
    /** @use HasFactory<\Database\Factories\MinibusFactory> */
    use HasFactory;

    protected $fillable = [
        'number_plate',
        'assigned_route',
        'user_id',
        'archived'
    ];

    protected $casts = [
        'archived' => 'boolean'
    ];

    /**
     * The user who owns the minibus (should have the 'minibus_owner' role)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The ownership history for this minibus
     */
    public function ownershipHistory(): HasMany
    {
        return $this->hasMany(MinibusOwnershipHistory::class);
    }

    /**
     * The offenses associated with this minibus
     */
    // public function offenses(): HasMany
    // {
    //     return $this->hasMany(Offense::class);
    // }
}
