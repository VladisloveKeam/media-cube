<?php

namespace App\Exceptions;

use App\Interfaces\Exceptions\CustomError;
use Illuminate\Http\Response;
use Exception;

class DepartmentHasEmployeesException extends Exception implements CustomError
{
    protected $message = '';

    public function __construct($message = "", $code = Response::HTTP_UNPROCESSABLE_ENTITY, \Throwable $previous = null)
    {
        $this->message = empty($message) ? $message = trans('exceptions.department_has_employees') : $message;

        parent::__construct($this->message, $code, $previous);
    }
}

