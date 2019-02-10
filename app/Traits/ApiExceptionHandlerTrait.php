<?php

namespace App\Traits\Exceptions;

use App\Interfaces\Exceptions\CustomError;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

trait ApiExceptionHandlerTrait
{
    /**
     * Creates a new JSON response based on exception type.
     *
     * @param Request $request
     * @param Exception $e
     * @return \Illuminate\Http\JsonResponse
     */
    protected function getJsonResponseForException(Request $request, Exception $e)
    {
        switch (true) {
            case $this->isModelNotFoundException($e):
                $retval = $this->modelNotFound($e);
                break;

            case $this->isMethodNotAllowedHttpException($e):
                $retval = $this->methodHttpNotAllowed($e);
                break;

            case $this->isValidationException($e);
                $retval = $this->validationError($e);
                break;

            case $this->isAuthenticationException($e);
                $retval = $this->authenticationError($e);
                break;

            case $this->isAuthorizationException($e);
                $retval = $this->authorizationError($e);
                break;

            case $this->isCustomError($e):
                $retval = $this->customError($e);
                break;

            default:
                $retval = $this->badRequest($e);
        }

        return $retval;
    }

    /**
     * Returns json response for generic bad request.
     *
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function badRequest(Exception $exception)
    {
        $message = trans('exceptions.bad_request');

        return $this->jsonResponse($message, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Returns json response for Eloquent model not found exception.
     *
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function modelNotFound(Exception $exception)
    {
        $message = 'The resource you are looking for could not be found.';

        return $this->jsonResponse($message, Response::HTTP_NOT_FOUND);
    }

    /**
     * Returns json response for method HTTP not allowed exception.
     *
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function methodHttpNotAllowed(Exception $exception)
    {
        return $this->jsonResponse($exception->getMessage(), Response::HTTP_METHOD_NOT_ALLOWED);
    }

    /**
     * Returns json response for validation error exception.
     *
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function validationError(Exception $exception)
    {
        $validationErrors = $exception->validator->errors()->getMessages();

        return $this->jsonResponse($exception->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY, $validationErrors);
    }

    /**
     * Returns json response for authentication error exception.
     *
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function authenticationError(Exception $exception)
    {
        return $this->jsonResponse($exception->getMessage(), Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Returns json response for authorization exception.
     *
     * @param Exception $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function authorizationError(Exception $exception)
    {
        return $this->jsonResponse($exception->getMessage(), Response::HTTP_FORBIDDEN);
    }

    /**
     * @param CustomError $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function customError(CustomError $exception)
    {
        return $this->jsonResponse($exception->getMessage(), $exception->getCode());
    }

    /**
     * Returns json response.
     *
     * @param string $message
     * @param int $statusCode
     * @param array $errors
     * @return \Illuminate\Http\JsonResponse
     * @internal param array|null $payload
     */
    protected function jsonResponse(
        $message = 'Something went wrong.',
        $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR,
        $errors = null
    )
    {
        return response()->json([
            'error' => [
                'code' => $statusCode,
                'message' => $message,
                'errors' => $errors ?: [],
            ]
        ], $statusCode);
    }

    /**
     * Determines if the given exception is an Eloquent model not found.
     *
     * @param Exception $e
     * @return bool
     */
    protected function isModelNotFoundException(Exception $e)
    {
        return $e instanceof ModelNotFoundException;
    }

    /**
     * Determines if the given exception is a method HTTP not allowed.
     *
     * @param Exception $e
     * @return bool
     */
    protected function isMethodNotAllowedHttpException(Exception $e)
    {
        return $e instanceof MethodNotAllowedHttpException;
    }

    /**
     * Determines if the given exception is a validation exception.
     *
     * @param Exception $e
     * @return bool
     */
    protected function isValidationException(Exception $e)
    {
        return $e instanceof ValidationException;
    }

    /**
     * Determines if the given exception is a authentication exception.
     *
     * @param Exception $e
     * @return bool
     */
    protected function isAuthenticationException(Exception $e)
    {
        return $e instanceof AuthenticationException;
    }

    /**
     * Determines if the given exception is a authorization exception.
     *
     * @param Exception $e
     * @return bool
     */
    protected function isAuthorizationException(Exception $e)
    {
        return $e instanceof AuthorizationException;
    }

    /**
     * @param \Throwable $e
     * @return bool
     */
    protected function isCustomError(\Throwable $e)
    {
        return $e instanceof CustomError;
    }
}
