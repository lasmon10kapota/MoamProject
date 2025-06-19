import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

export function UserInfo({ user, showEmail = false }) {
    const getInitials = useInitials();
    const full_name = user.first_name + " " + user.last_name;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={full_name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(full_name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{full_name}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </>
    );
}
