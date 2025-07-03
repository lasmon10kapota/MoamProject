<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMinibusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'number_plate' => 'required|string|max:20|unique:minibuses,number_plate',
            'assigned_route' => 'required|string|max:255',
        ];
        if (auth()->user() && auth()->user()->hasRole('association clerk')) {
            $rules['owner_id'] = [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = \App\Models\User::find($value);
                    if (!$user || !$user->hasRole('minibus owner')) {
                        $fail('Selected owner must have the minibus owner role.');
                    }
                }
            ];
        }
        return $rules;
    }
}
