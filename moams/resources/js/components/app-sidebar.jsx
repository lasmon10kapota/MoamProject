import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookUser, Waves, MessageCircleQuestion, House, CreditCard, Shield, Users } from 'lucide-react';
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
    {
        title: 'User Management',
        url: '/admin/users',
        icon: Users,
        role: 'system admin',
    },
    {
        title: 'Role Management',
        url: '/users',
        icon: Shield,
        role: 'system admin',
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const pageProps = usePage().props;
    const page = usePage();

    // Get roles from pageProps first (more reliable), then fallback to auth user
    let roles = [];

    if (pageProps.userRoles && Array.isArray(pageProps.userRoles)) {
        roles = pageProps.userRoles;
    } else if (auth?.user?.roles) {
        // If roles is an array of role objects, extract the names
        if (Array.isArray(auth.user.roles)) {
            roles = auth.user.roles.map(role => typeof role === 'string' ? role : role.name);
        }
    }

    const isSystemAdmin = roles.includes('system admin');

    // Filter nav items based on user role
    const filteredNavItems = mainNavItems.filter(item => {
        if (item.role) {
            return roles.includes(item.role);
        }
        return true;
    });

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
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
