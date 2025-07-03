<?php

namespace App\Http\Controllers;

use App\Models\Minibus;
use App\Models\MinibusOwnershipHistory;
use App\Models\User;
use App\Notifications\TransferRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class MinibusOwnershipController extends Controller
{
    public function requestTransfer(Minibus $minibus)
    {
        // Ensure the current user is the owner of the minibus
        if ($minibus->user_id !== auth()->id()) {
            abort(403, 'You are not authorized to request transfer for this minibus.');
        }

        return Inertia::render('MinibusManagement/request-transfer-minibus', [
            'minibus' => $minibus->load('user'),
        ]);
    }

    public function storeTransferRequest(Request $request, Minibus $minibus)
    {
        // Ensure the current user is the owner of the minibus
        if ($minibus->user_id !== auth()->id()) {
            abort(403, 'You are not authorized to request transfer for this minibus.');
        }

        $request->validate([
            'new_owner_type' => 'required|in:member,non_member',
            'reason' => 'required|string|min:10',
        ]);

        try {
            DB::transaction(function () use ($request, $minibus) {
                // Create transfer request record
                $transferRequest = MinibusOwnershipHistory::create([
                    'minibus_id' => $minibus->id,
                    'previous_owner_id' => $minibus->user_id,
                    'new_owner_id' => null, // Will be set by clerk when approving
                    'transfer_type' => $request->new_owner_type === 'member' ? 'internal' : 'external',
                    'status' => 'pending',
                    'reason' => $request->reason,
                ]);

                // Notify all association clerks
                $clerks = User::role('association clerk')->get();
                Notification::send($clerks, new TransferRequestNotification($transferRequest));
            });

            return redirect()->route('minibuses.show', $minibus)
                ->with('success', 'Transfer request submitted successfully. An association clerk will review your request.');
        } catch (\Exception $e) {
            \Log::error('Transfer request failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()
                ->with('error', 'Failed to submit transfer request. Please try again.');
        }
    }

    public function listTransferRequests()
    {
        $transferRequests = MinibusOwnershipHistory::with(['minibus', 'previous_owner'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MinibusManagement/transfer-requests', [
            'transferRequests' => $transferRequests
        ]);
    }

    public function transfer(Minibus $minibus)
    {
        return Inertia::render('MinibusManagement/transfer-minibus', [
            'minibus' => $minibus->load('user'),
            'users' => User::role('minibus owner')->get(),
        ]);
    }

    public function history(Minibus $minibus)
    {
        $history = MinibusOwnershipHistory::where('minibus_id', $minibus->id)
            ->with(['previous_owner', 'new_owner'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($entry) {
                return [
                    'id' => $entry->id,
                    'previous_owner' => $entry->previous_owner,
                    'new_owner' => $entry->new_owner,
                    'created_at' => $entry->created_at,
                    'transfer_type' => $entry->transfer_type,
                    'status' => $entry->status,
                    'reason' => $entry->reason,
                ];
            });

        return response()->json($history);
    }

    public function processTransfer(Request $request, Minibus $minibus)
    {
        \Log::info('Transfer request received', [
            'minibus_id' => $minibus->id,
            'transfer_type' => $request->transfer_type,
            'new_owner_id' => $request->new_owner_id,
        ]);

        $request->validate([
            'transfer_type' => 'required|in:internal,external',
            'new_owner_id' => [
                'nullable',
                'required_if:transfer_type,internal',
                'prohibited_if:transfer_type,external',
                function ($attribute, $value, $fail) use ($minibus) {
                    if ($value && $value == $minibus->user_id) {
                        $fail('New owner cannot be the same as current owner.');
                    }
                },
            ],
        ]);

        try {
            DB::transaction(function () use ($request, $minibus) {
                \Log::info('Creating ownership history record');
                // Create history record
                MinibusOwnershipHistory::create([
                    'minibus_id' => $minibus->id,
                    'previous_owner_id' => $minibus->user_id,
                    'new_owner_id' => $request->transfer_type === 'internal' ? $request->new_owner_id : null,
                    'transfer_type' => $request->transfer_type,
                    'status' => 'completed',
                ]);

                \Log::info('Updating minibus ownership', [
                    'user_id' => $request->transfer_type === 'internal' ? $request->new_owner_id : null,
                    'archived' => $request->transfer_type === 'external',
                ]);

                // Update minibus ownership
                $minibus->update([
                    'user_id' => $request->transfer_type === 'internal' ? $request->new_owner_id : null,
                    'archived' => $request->transfer_type === 'external',
                ]);

                // Refresh the minibus data
                $minibus->refresh();
                \Log::info('Transfer completed successfully');
            });

            $message = $request->transfer_type === 'external'
                ? 'Minibus has been transferred to a non-member and archived. Only association clerks can access it now.'
                : 'Minibus ownership transferred successfully.';

            return redirect()->route('minibuses.show', $minibus)
                ->with('success', $message);
        } catch (\Exception $e) {
            \Log::error('Transfer failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()
                ->with('error', 'Failed to transfer minibus ownership. Please try again.');
        }
    }

    public function historyPage(Minibus $minibus)
    {
        $history = MinibusOwnershipHistory::where('minibus_id', $minibus->id)
            ->with(['previous_owner', 'new_owner'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('MinibusManagement/history-minibus', [
            'minibus' => $minibus->load('user'),
            'history' => $history,
        ]);
    }
}