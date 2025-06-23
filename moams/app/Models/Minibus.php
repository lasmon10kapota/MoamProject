<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Minibus extends Model
{
    /** @use HasFactory<\Database\Factories\MinibusFactory> */
    use HasFactory;

    protected $fillable = [
        'number_plate',
        'assigned_route',
        'proof_of_ownership',
    ];

    public function minibusOwner(): BelongsTo
    {
        return $this->belongsTo(MinibusOwner::class, 'minibus_owner_id');
    }
}
