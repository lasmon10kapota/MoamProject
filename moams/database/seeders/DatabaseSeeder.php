<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create all the required roles
        $roles = [
            'association manager',
            'association clerk',
            'minibus owner',
            'system admin'
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Create the admin user with all required fields
        $admin = User::updateOrCreate(
            ['email' => 'john@gmail.com'],
            [
                'first_name' => 'John',
                'last_name' => 'Mike',
                'gender' => 'Male',
                'district' => 'Ntcheu',
                'village' => 'Muwalo',
                'phone_number' => '0934567890',
                'password' => bcrypt('asdfghjkl'),
            ]
        );

        // Assign the system admin role
        $admin->assignRole('system admin');

        // Double-check and ensure the role is assigned
        if (!$admin->hasRole('system admin')) {
            $admin->assignRole('system admin');
        }

        echo "Admin user created/updated: " . $admin->email . "\n";
        echo "Has system admin role: " . ($admin->hasRole('system admin') ? 'Yes' : 'No') . "\n";
        echo "All roles created: " . implode(', ', $roles) . "\n";

        // Create sample users for each role
        $minibusOwners = [
            [
                'first_name' => 'James',
                'last_name' => 'Banda',
                'email' => 'james.banda@example.com',
                'gender' => 'Male',
                'district' => 'Lilongwe',
                'village' => 'Area 25',
                'phone_number' => '0991234567',
            ],
            [
                'first_name' => 'Mary',
                'last_name' => 'Phiri',
                'email' => 'mary.phiri@example.com',
                'gender' => 'Female',
                'district' => 'Blantyre',
                'village' => 'Namiwawa',
                'phone_number' => '0881234567',
            ],
            [
                'first_name' => 'John',
                'last_name' => 'Chirwa',
                'email' => 'john.chirwa@example.com',
                'gender' => 'Male',
                'district' => 'Zomba',
                'village' => 'Matawale',
                'phone_number' => '0991234568',
            ],
            [
                'first_name' => 'Grace',
                'last_name' => 'Mbewe',
                'email' => 'grace.mbewe@example.com',
                'gender' => 'Female',
                'district' => 'Mzuzu',
                'village' => 'Chibavi',
                'phone_number' => '0881234568',
            ],
            [
                'first_name' => 'Peter',
                'last_name' => 'Gondwe',
                'email' => 'peter.gondwe@example.com',
                'gender' => 'Male',
                'district' => 'Kasungu',
                'village' => 'Chipata',
                'phone_number' => '0991234569',
            ],
        ];

        foreach ($minibusOwners as $ownerData) {
            $owner = User::updateOrCreate(
                ['email' => $ownerData['email']],
                array_merge($ownerData, [
                    'password' => bcrypt('password123'),
                    'commitment' => 'I commit to abide by the Constitution, rules, and regulations of the Minibus Owners Association of Malawi (MOAM), and to uphold the values and objectives of the Association at all times.'
                ])
            );
            $owner->assignRole('minibus owner');
        }

        // Create association clerk
        $clerk = User::updateOrCreate(
            ['email' => 'clerk@example.com'],
            [
                'first_name' => 'Sarah',
                'last_name' => 'Nyasulu',
                'gender' => 'Female',
                'district' => 'Lilongwe',
                'village' => 'Area 47',
                'phone_number' => '0881234570',
                'password' => bcrypt('password123'),
            ]
        );
        $clerk->assignRole('association clerk');

        // Create association manager
        $manager = User::updateOrCreate(
            ['email' => 'manager@example.com'],
            [
                'first_name' => 'David',
                'last_name' => 'Kaunda',
                'gender' => 'Male',
                'district' => 'Lilongwe',
                'village' => 'Area 3',
                'phone_number' => '0991234570',
                'password' => bcrypt('password123'),
            ]
        );
        $manager->assignRole('association manager');

        /* User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
         ]);*/

        // Call other seeders
        $this->call([
            MinibusSeeder::class,
            MinibusOwnershipHistorySeeder::class,
        ]);
    }
}
