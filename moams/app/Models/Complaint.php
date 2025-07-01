<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Complaint extends Model
{
    /** @use HasFactory<\Database\Factories\ComplaintFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    public function minibusOwner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function response(): HasOne
    {
        return $this->hasOne(ComplaintResponse::class);
    }
}