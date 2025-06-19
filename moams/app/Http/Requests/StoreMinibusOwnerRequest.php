<?php

namespace App\Http\Requests;

use App\Models\MinibusOwner;
use Illuminate\Foundation\Http\FormRequest;

class StoreMinibusOwnerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    /*public function authorize(): bool
    {
        return false;
    }*/

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'district' => 'required|string|min:3|max:50',
            'village' => 'required|string|min:3|max:50',
            'national_id' => 'required|image|mimes:jpeg,jpg,png',
            'num_of_vehicles' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^\d+$/', $value)) {
                        $fail('The entered value is invalid.');
                    }
                }
            ],

        ];

    }
}
