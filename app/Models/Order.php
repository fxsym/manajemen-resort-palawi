<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'name',
        'institution',
        'position',
        'participants_count',
        'address',
        'phone_number',
        'user_id',
        'resort_id',
        'rooms_count',
        'price',
        'days_count',
        'checkin_time',
        'checkout_time'
    ];

    /**
     * Get the user that owns the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
