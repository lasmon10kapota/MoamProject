<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Minibus;
use App\Models\User;

class MinibusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there are minibus owners
        $owners = User::role('minibus owner')->get();
        if ($owners->count() === 0) {
            $owners = User::factory(5)->create();
            foreach ($owners as $owner) {
                $owner->assignRole('minibus owner');
            }
        }
        // Seed minibuses
        foreach (range(1, 10) as $i) {
            Minibus::factory()->create([
                'user_id' => $owners->random()->id,
            ]);
        }
    }
}
