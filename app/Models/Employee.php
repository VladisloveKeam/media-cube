<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Jenbuzz\LaravelUuid\Traits\Uuid;

class Employee extends Model
{
    use Uuid;

    protected $guarded = [];

    public function departments(){
        return $this->belongsToMany('App\Models\Department');
    }
}
