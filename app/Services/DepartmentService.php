<?php


namespace App\Services;

use App\Exceptions\DepartmentHasEmployeesException;
use App\Models\Department;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DepartmentService extends AbstractService {

    const WHITE_LIST_DATA = [
        'title',
    ];

    public function save (array $requestData, int $id = null) {
        $requestData = collect($requestData);

        Validator::make($requestData->toArray(), [
            'title' => [ 'required', 'string', 'max:255', Rule::unique('departments')->ignore($id), ],
        ])->validate();

        $data = $requestData->only(self::WHITE_LIST_DATA)->toArray();
        $department = Department::updateOrCreate([ 'id' => $id ], $data);

        return $department;
    }

    /**
     * @param array $ids
     * @return array
     * @throws DepartmentHasEmployeesException
     */
    public function destroy (array $ids) {
        $departments = Department::whereIn('id', $ids)->get();
        $deletedDepartments = [];

        foreach ($departments as $department) {

            if ($department->employees()->exists()) {
                throw new DepartmentHasEmployeesException();
            }

            $department->delete();

            $deletedDepartments[] = $department;
        }

        return $deletedDepartments;
    }
}