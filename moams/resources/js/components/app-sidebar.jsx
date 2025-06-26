import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookUser, Waves, MessageCircleQuestion, House, CreditCard, Shield, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: House,
    },
    {
        title: 'Membership',
        url: '/membership',
        icon: BookUser,
    },
    {
        title: 'Payments',
        url: '/payments',
        icon: CreditCard,
    },
    {
        title: 'Complaints',
        url: '/complaints',
        icon: MessageCircleQuestion,
    },
    {
        title: 'Offenses',
        url: '/offenses',
        icon: Waves,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const pageProps = usePage().props;

    // Try to get roles from multiple sources
    const roles = auth?.user?.roles || pageProps.userRoles || [];

    const isSystemAdmin = roles.includes('system admin');
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu >
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <hr />
            <SidebarContent>
                <NavMain items={mainNavItems} />
                {isSystemAdmin && (
                    <SidebarMenu className="mt-4">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/users" prefetch>
                                    <Shield className="inline mr-2" />
                                    <span>Role Management</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/admin/create-user" prefetch>
                                    <UserPlus className="inline mr-2" />
                                    <span>Create User</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
