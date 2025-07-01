<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offense extends Model
{
    /** @use HasFactory<\Database\Factories\OffenseFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
        'offense_date',
    ];

    public function minibusOwner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function penalty(): HasOne
    {
        return $this->hasOne(OffensePenalty::class);
    }
}
