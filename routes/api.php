<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([ 'prefix' => 'v1' , 'namespace' => 'API'], function () {

    Route::get('/ping', 'PingController@index');

    //multiple delete routes
    Route::delete('departments/delete', 'DepartmentController@destroy');
    Route::delete('employees/delete', 'EmployeeController@destroy');

    Route::apiResources([
        'departments' => 'DepartmentController',
        'employees' => 'EmployeeController',
    ], [ 'except' => [ 'destroy' ],
    ]);
});



