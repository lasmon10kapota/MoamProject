<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MinibusOwnershipHistory;
use App\Models\Minibus;
use App\Models\User;
use Carbon\Carbon;

class MinibusOwnershipHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all minibuses
        $minibuses = Minibus::all();

        // Get users with minibus owner role
        $owners = User::role('minibus owner')->get();

        if ($minibuses->count() === 0 || $owners->count() === 0) {
            $this->command->info('No minibuses or owners found. Please run MinibusSeeder first.');
            return;
        }

        foreach ($minibuses as $minibus) {
            // Create 2-4 ownership transfers for each minibus
            $transferCount = rand(2, 4);
            $currentOwnerId = $minibus->user_id;

            for ($i = 0; $i < $transferCount; $i++) {
                // 20% chance to make this an external transfer
                $isExternal = rand(1, 5) === 1;
                if ($isExternal) {
                    MinibusOwnershipHistory::create([
                        'minibus_id' => $minibus->id,
                        'previous_owner_id' => $currentOwnerId,
                        'new_owner_id' => $owners->first()->id, // keep a valid user_id for FK
                        'created_at' => Carbon::now()->subDays(rand(1, 365)),
                        'transfer_type' => 'external',
                    ]);
                } else {
                    // Get a different owner for the transfer
                    $newOwner = $owners->where('id', '!=', $currentOwnerId)->random();
                    MinibusOwnershipHistory::create([
                        'minibus_id' => $minibus->id,
                        'previous_owner_id' => $currentOwnerId,
                        'new_owner_id' => $newOwner->id,
                        'created_at' => Carbon::now()->subDays(rand(1, 365)),
                        'transfer_type' => 'internal',
                    ]);
                    $currentOwnerId = $newOwner->id;
                }
            }
        }

        $this->command->info('Minibus ownership history seeded successfully!');
    }
}