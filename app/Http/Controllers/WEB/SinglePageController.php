<?php

namespace App\Http\Controllers\WEB;

use App\Http\Controllers\Controller;

class SinglePageController extends Controller
{
    public function index() {
        return view('app');
    }
}
