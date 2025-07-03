<?php

namespace App\Notifications;

use App\Models\MinibusOwnershipHistory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TransferRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $transferRequest;

    public function __construct(MinibusOwnershipHistory $transferRequest)
    {
        $this->transferRequest = $transferRequest;
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        $minibus = $this->transferRequest->minibus;
        $owner = $this->transferRequest->previous_owner;

        return (new MailMessage)
            ->subject('New Minibus Transfer Request')
            ->line("A new transfer request has been submitted.")
            ->line("Minibus: {$minibus->number_plate}")
            ->line("Current Owner: {$owner->first_name} {$owner->last_name}")
            ->line("Transfer Type: " . ucfirst($this->transferRequest->transfer_type))
            ->line("Reason: {$this->transferRequest->reason}")
            ->action('View Request', url("/minibuses/{$minibus->id}/transfer-requests"))
            ->line('Please review this request at your earliest convenience.');
    }

    public function toArray($notifiable): array
    {
        $minibus = $this->transferRequest->minibus;
        $owner = $this->transferRequest->previous_owner;

        return [
            'transfer_request_id' => $this->transferRequest->id,
            'minibus_id' => $minibus->id,
            'minibus_number_plate' => $minibus->number_plate,
            'owner_name' => "{$owner->first_name} {$owner->last_name}",
            'transfer_type' => $this->transferRequest->transfer_type,
            'reason' => $this->transferRequest->reason,
        ];
    }
}