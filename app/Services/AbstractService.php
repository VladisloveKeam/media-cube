<?php


namespace App\Services;


abstract class AbstractService {
    abstract public function save(array $requestData, int $id);
}