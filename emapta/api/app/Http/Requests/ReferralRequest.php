<?php

namespace App\Http\Requests;

use App\Traits\Validation;
use Illuminate\Foundation\Http\FormRequest;

class ReferralRequest extends FormRequest
{
    use Validation;

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
        return [
            'firstName' => ['string', 'required'],
            'lastName' => ['string', 'required'],
            'email' => ['string', 'email', 'required'],
            'phone' => ['string', 'required'],
            'home' => ['string', 'nullable'],
            'street' => ['string', 'nullable'],
            'suburb' => ['string', 'nullable'],
            'state' => ['string', 'nullable'],
            'postCode' => ['string', 'nullable'],
            'country' => ['string', 'nullable'],
        ];
    }
}
