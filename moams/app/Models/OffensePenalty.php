<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OffensePenalty extends Model
{
    /** @use HasFactory<\Database\Factories\OffensePenaltyFactory> */
    use HasFactory;

    protected $fillable = [
        'action_taken',// warning, suspension
        'description',
        'penalty_date',
    ];

    public function offense(): BelongsTo
    {
        return $this->belongsTo(Offense::class, 'offense_id');
    }

}
