<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->route('user');
        $isPatch = $this->isMethod('patch');

        return [
            'first_name' => array_merge($isPatch ? ['sometimes'] : [], ['required', 'string', 'max:255']),
            'last_name' => array_merge($isPatch ? ['sometimes'] : [], ['required', 'string', 'max:255']),
            'gender' => array_merge($isPatch ? ['sometimes'] : [], ['required', 'string']),

            'district' => array_merge($isPatch ? ['sometimes'] : [], ['required', 'string', 'max:255']),
            'village' => array_merge($isPatch ? ['sometimes'] : [], ['string', 'max:255']),
            'email' => array_merge($isPatch ? ['sometimes'] : [], [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ]),
            'phone_number' => array_merge($isPatch ? ['sometimes'] : [], [
                'required',
                Rule::unique(User::class)->ignore($user->id),
                'string',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(?:\+265|0)[89]\d{8}$/', $value)) {
                        $fail('The ' . preg_replace('/_/', ' ', $attribute) . ' is invalid.');
                    }
                }
            ]),
            'role' => array_merge($isPatch ? ['sometimes'] : [], ['required', 'string', 'exists:roles,name']),
        ];
    }
}