<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Membership extends Model
{
    /** @use HasFactory<\Database\Factories\MembershipFactory> */
    use HasFactory;

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function minibusOwner(): BelongsTo
    {
        return $this->belongsTo(MinibusOwner::class, 'minibus_owner_id');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
