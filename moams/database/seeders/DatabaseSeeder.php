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
                // or 'female', or whatever is valid in your app
                'phone_number' => '0934567890',
                'password' => bcrypt('asdfghjkl'), // Change this to a strong password!
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
        $minibusOwner = User::factory()->create([
            'email' => 'minibusowner@example.com',
            'commitment' => 'I commit to abide by the Constitution, rules, and regulations of the Minibus Owners Association of Malawi (MOAM), and to uphold the values and objectives of the Association at all times.'
        ]);
        $minibusOwner->assignRole('minibus owner');

        $clerk = User::factory()->create([
            'email' => 'clerk@example.com',
        ]);
        $clerk->assignRole('association clerk');

        $manager = User::factory()->create([
            'email' => 'manager@example.com',
        ]);
        $manager->assignRole('association manager');

        /* User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
         ]);*/
    }
}
