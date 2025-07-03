<?php

namespace App\Policies;

use App\Models\Minibus;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MinibusPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Minibus $minibus): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Minibus $minibus): bool
    {
        return $user->hasRole('association clerk');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Minibus $minibus): bool
    {
        return $user->hasRole('association clerk');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Minibus $minibus): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Minibus $minibus): bool
    {
        return false;
    }

    public function archive(User $user, Minibus $minibus)
    {
        return $user->hasRole('association clerk');
    }

    public function unarchive(User $user, Minibus $minibus)
    {
        return $user->hasRole('association clerk');
    }
}
