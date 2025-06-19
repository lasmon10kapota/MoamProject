<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MinibusOwner>
 */
class MinibusOwnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'district' => fake()->district(),
            'village' => fake()->village(),
            'national_id' => fake()->national_id(),
            'num_of_vehicles' => fake()->num_of_vehicles(),
        ];
    }
}
