<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\DepartmentService;
use App\Models\Department;

class DepartmentController extends Controller {

    protected $departmentService;

    public function __construct (DepartmentService $departmentService) {
        $this->departmentService = $departmentService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index () {
        $departments = Department::with('employees')
            ->withCount('employees')
            ->get();

        return response()->json(['data' => $departments]);
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store (Request $request) {
        $department = $this->departmentService->save($request->all());

        return response()->json([ 'data' => $department ]);
    }

    /**
     * Display the specified resource.
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show ($id) {
        $department = Department::where('id', $id)->firstOrFail();

        return response()->json([ 'data' => $department ]);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update (Request $request, $id) {
        $department = $this->departmentService->save($request->all(), $id);

        return response()->json([ 'data' => $department ]);
    }

    /**
     * Remove the specified resource from storage.
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @throws \App\Exceptions\DepartmentHasEmployeesException
     */
    public function destroy (Request $request) {
        $ids = $request->get('ids');
        $department = $this->departmentService->destroy($ids);

        return response()->json([ 'data' => $department ]);
    }
}
