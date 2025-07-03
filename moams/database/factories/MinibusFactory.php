<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Minibus>
 */
class MinibusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number_plate' => 'DZ ' . $this->faker->unique()->numberBetween(1000, 9999),
            'assigned_route' => $this->faker->city . ' - ' . $this->faker->city,
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
        ];
    }
}
