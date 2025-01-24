<?php

namespace App\Models;

use App\Traits\ToArray;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
    use HasFactory, ToArray;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'home',
        'street',
        'suburb',
        'state',
        'post_code',
        'country',
    ];

    public $timestamps = false;
}
