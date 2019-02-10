<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Jenbuzz\LaravelUuid\Traits\Uuid;

class Department extends Model
{
    use Uuid;

    protected $guarded = [];

    protected $appends = ['employees_max_salary'];

    public function employees(){
        return $this->belongsToMany('App\Models\Employee');
    }

    public function getEmployeesMaxSalaryAttribute()
    {
        return $this->employees->max('salary');
    }
}
