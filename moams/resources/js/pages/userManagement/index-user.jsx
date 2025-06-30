import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Search, Filter, ChevronRight, Home, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';

export default function UserManagement() {
    const { users, flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [displayCount, setDisplayCount] = useState(6);

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'User Management',
            href: '/admin/users',
        },
    ];

    // Filter users based on search term and role filter
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone_number.includes(searchTerm);

        const matchesRole = roleFilter === 'all' || user.roles.some(role => role.name === roleFilter);

        return matchesSearch && matchesRole;
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by newest first

    // Get users to display based on current display count
    const displayedUsers = filteredUsers.slice(0, displayCount);
    const hasMoreUsers = displayedUsers.length < filteredUsers.length;

    const loadMoreUsers = () => {
        setDisplayCount(prev => Math.min(prev + 6, filteredUsers.length));
    };

    const getRoleBadgeColor = (roleName) => {
        switch (roleName) {
            case 'system admin':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'registering member':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'registered member':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'association clerk':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'association manager':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage all system users, their roles, and permissions
                        </p>
                    </div>
                    <Link href="/admin/create-user">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Create User
                        </Button>
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash.message && (
                    <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-800">
                        {flash.message}
                    </div>
                )}
                {flash.error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-400 text-red-800">
                        {flash.error}
                    </div>
                )}

                {/* Statistics */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-600">{users.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {users.filter(u => u.roles.some(r => r.name === 'registering member')).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Registering Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {users.filter(u => u.roles.some(r => r.name === 'registered member')).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Registered Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {users.filter(u => u.roles.some(r => r.name === 'association clerk')).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Association Clerks</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {users.filter(u => u.roles.some(r => r.name === 'system admin')).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">System Admins</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Filters & Search</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="search">Search Users</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="search"
                                        placeholder="Search by name, email, or phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="role-filter">Filter by Role</Label>
                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All roles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">All Roles</SelectItem>
                                            <SelectItem value="system admin">System Admin</SelectItem>
                                            <SelectItem value="registering member">Registering Member</SelectItem>
                                            <SelectItem value="registered member">Registered Member</SelectItem>
                                            <SelectItem value="association clerk">Association Clerk</SelectItem>
                                            <SelectItem value="association manager">Association Manager</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setRoleFilter('all');
                                        setDisplayCount(6);
                                    }}
                                    className="w-full"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedUsers.map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarFallback>
                                                <AvatarInitials
                                                    text={`${user.first_name} ${user.last_name}`}
                                                />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {user.first_name} {user.last_name}
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                {user.email}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* User Details */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                                        <span className="font-medium">{user.phone_number}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Gender:</span>
                                        <span className="font-medium capitalize">{user.gender}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {user.roles.some(role => role.name === 'registered member')
                                                ? 'Joined:'
                                                : 'Signed up:'
                                            }
                                        </span>
                                        <span className="font-medium">{formatDate(user.created_at)}</span>
                                    </div>
                                </div>

                                {/* Roles */}
                                <div>
                                    <Label className="text-sm text-gray-600 dark:text-gray-400">Roles:</Label>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {user.roles.map((role) => (
                                            <Badge
                                                key={role.id}
                                                variant="outline"
                                                className={`text-xs ${getRoleBadgeColor(role.name)}`}
                                            >
                                                {role.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2 pt-3 border-t">
                                    <TooltipProvider>
                                        <Link href={`/admin/users/${user.id}`} className="flex-1 min-w-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Eye className="h-3 w-3 sm:mr-1" />
                                                        <span className="hidden sm:inline">View</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>View user details</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </Link>

                                        <Link href={`/admin/users/${user.id}/edit`} className="flex-1 min-w-0">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Edit className="h-3 w-3 sm:mr-1" />
                                                        <span className="hidden sm:inline">Edit</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Edit user</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </Link>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 min-w-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => {
                                                        const confirmMessage = `Are you sure you want to delete ${user.first_name} ${user.last_name}?\n\nThis action cannot be undone and will permanently remove the user from the system.`;
                                                        if (confirm(confirmMessage)) {
                                                            router.delete(`/admin/users/${user.id}`);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-3 w-3 sm:mr-1" />
                                                    <span className="hidden sm:inline">Delete</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete user</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Load More/Less Buttons */}
                <div className="flex justify-center mt-8 space-x-4">
                    {hasMoreUsers && (
                        <Button
                            variant="outline"
                            onClick={loadMoreUsers}
                            className="px-8"
                        >
                            <ChevronDown className="h-4 w-4 mr-2" />
                            See More ({filteredUsers.length - displayedUsers.length} remaining)
                        </Button>
                    )}
                    {displayCount > 6 && (
                        <Button
                            variant="outline"
                            onClick={() => setDisplayCount(6)}
                            className="px-8"
                        >
                            <ChevronDown className="h-4 w-4 mr-2 rotate-180" />
                            See Less
                        </Button>
                    )}
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="text-gray-500 dark:text-gray-400">
                                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-medium mb-2">No users found</h3>
                                <p className="mb-4">
                                    {searchTerm || roleFilter !== 'all'
                                        ? 'Try adjusting your search or filters'
                                        : 'No users have been created yet'
                                    }
                                </p>
                                {!searchTerm && roleFilter === 'all' && (
                                    <Link href="/admin/create-user">
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create First User
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
} 