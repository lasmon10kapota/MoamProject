<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MinibusOwnershipHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'minibus_id',
        'previous_owner_id',
        'new_owner_id',
        'transfer_type',
        'status',
        'reason',
    ];

    public function previous_owner()
    {
        return $this->belongsTo(User::class, 'previous_owner_id');
    }

    public function new_owner()
    {
        return $this->belongsTo(User::class, 'new_owner_id');
    }

    public function minibus()
    {
        return $this->belongsTo(Minibus::class);
    }
}