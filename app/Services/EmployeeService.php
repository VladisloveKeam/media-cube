<?php


namespace App\Services;


use App\Models\Employee;
use Illuminate\Support\Facades\Validator;

class EmployeeService extends AbstractService {

    const WHITE_LIST_DATA = [
        'first_name',
        'last_name',
        'patronymic',
        'gender',
        'salary',
    ];

    public function save (array $requestData, int $id = null) {
        $requestData = collect($requestData);

        Validator::make($requestData->toArray(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'patronymic' => 'sometimes|nullable|string|max:255',
            'gender' => 'sometimes|nullable|string|in:male,female',
            'salary' => 'sometimes|nullable|regex:/^\d+(\.\d{1,2})?$/', // regex decimal
            'departments' => 'required|array|min:1',
        ])->validate();

        $data = $requestData->only(self::WHITE_LIST_DATA)->toArray();
        $employee = Employee::updateOrCreate([ 'id' => $id ], $data);

        $departments = $requestData['departments'];

        if($id){
            $employee->departments()->detach();
        }

        $employee->departments()->attach($departments);

        return $employee;
    }

    public function destroy (array $ids) {
        $employees = Employee::whereIn('id', $ids)->get();
        $deletedEmployees = [];

        foreach ($employees as $employee) {
            $employee->departments()->detach();
            $employee->delete();

            $deletedEmployees[] = $employee;
        }

        return $deletedEmployees;
    }
}