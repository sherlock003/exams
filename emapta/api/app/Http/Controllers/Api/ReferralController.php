<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ReferralRequest;
use App\Models\Referral;
use Illuminate\Http\JsonResponse;

class ReferralController extends ApiController
{
    public function list(): JsonResponse
    {
        $referrals = Referral::all();

        return $this->successResponse(
            JsonResponse::HTTP_OK,
            "Success",
            $referrals->toArray()
        );
    }

    public function get(int $id): JsonResponse
    {
        $referral = Referral::find($id);

        return $this->successResponse(
            JsonResponse::HTTP_OK,
            "Success",
            $referral->toArray()
        );
    }

    public function create(ReferralRequest $request): JsonResponse
    {
        $formData = $request->safe()->collect();
        $referral = Referral::create([
            'first_name' => $formData->get('firstName'),
            'last_name' => $formData->get('lastName'),
            'email' => $formData->get('email'),
            'phone' => $formData->get('phone'),
            'home' => $formData->get('home'),
            'street' => $formData->get('street'),
            'suburb' => $formData->get('suburb'),
            'state' => $formData->get('state'),
            'post_code' => $formData->get('postCode'),
            'country' => $formData->get('country'),
        ]);

        return $this->successResponse(
            JsonResponse::HTTP_OK,
            "Create Successfully",
            $referral->toArray()
        );
    }

    public function update(ReferralRequest $request, int $id): JsonResponse
    {
        $formData = $request->safe()->collect();
        $referral = Referral::find($id);
        $referral->update([
            'first_name' => $formData->get('firstName'),
            'last_name' => $formData->get('lastName'),
            'email' => $formData->get('email'),
            'phone' => $formData->get('phone'),
            'home' => $formData->get('home'),
            'street' => $formData->get('street'),
            'suburb' => $formData->get('suburb'),
            'state' => $formData->get('state'),
            'post_code' => $formData->get('postCode'),
            'country' => $formData->get('country'),
        ]);

        return $this->successResponse(
            JsonResponse::HTTP_OK,
            "Update Successfully",
            $referral->toArray()
        );
    }

    public function delete(int $id): JsonResponse
    {
        Referral::where('id', $id)->delete();
        return $this->successResponse(
            JsonResponse::HTTP_OK,
            "Delete Successfully",
        );
    }
}
