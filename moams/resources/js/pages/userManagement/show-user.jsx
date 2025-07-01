import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, User, Shield, ChevronRight, Home, Archive, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import FlashMessage from '@/components/ui/flash-message';

export default function UserDetail() {
    const { user, flash } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'User Management',
            href: '/admin/users',
        },
        {
            title: `${user.first_name} ${user.last_name}`,
            href: `/admin/users/${user.id}`,
        },
    ];

    const getRoleBadgeColor = (roleName) => {
        switch (roleName) {
            case 'system admin':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'minibus owner':
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details - ${user.first_name} ${user.last_name}`} />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/users">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                            </Button>
                        </Link>
                    </div>
                    <TooltipProvider>
                        <div className="flex space-x-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href={`/admin/users/${user.id}/edit`}>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <Edit className="h-4 w-4 sm:mr-2" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit user information</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={user.archived_at ? 'success' : 'outline'}
                                        className="ml-2"
                                        onClick={() => {
                                            const action = user.archived_at ? 'unarchive' : 'archive';
                                            const confirmMessage = user.archived_at
                                                ? `Are you sure you want to unarchive ${user.first_name} ${user.last_name}?`
                                                : `Are you sure you want to archive ${user.first_name} ${user.last_name}?`;
                                            if (confirm(confirmMessage)) {
                                                router.put(`/admin/users/${user.id}/${action}`);
                                            }
                                        }}
                                    >
                                        {user.archived_at ? <RotateCcw className="h-4 w-4 sm:mr-2" /> : <Archive className="h-4 w-4 sm:mr-2" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{user.archived_at ? 'Unarchive user' : 'Archive user'}</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`text-red-600 hover:text-red-700 hover:bg-red-50 ${user.archived_at ? 'text-gray-400 cursor-not-allowed' : ''}`}
                                        onClick={() => {
                                            if (user.archived_at) return;
                                            const confirmMessage = `Are you sure you want to delete ${user.first_name} ${user.last_name}?\n\nThis action cannot be undone and will permanently remove the user from the system.`;
                                            if (confirm(confirmMessage)) {
                                                router.delete(`/admin/users/${user.id}`);
                                            }
                                        }}
                                        disabled={!!user.archived_at}
                                    >
                                        <Trash2 className="h-4 w-4 sm:mr-2" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete user</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>

                {/* Flash Messages */}
                {flash.message && <FlashMessage message={flash.message} type="success" />}
                {flash.error && <FlashMessage message={flash.error} type="error" />}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Profile Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarFallback>
                                            <AvatarInitials
                                                text={`${user.first_name} ${user.last_name}`}
                                                className="text-2xl"
                                            />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-xl">
                                    {user.first_name} {user.last_name}
                                </CardTitle>
                                <CardDescription>
                                    User ID: {user.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{user.phone_number}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm capitalize">{user.gender}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Home className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{user.district}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Home className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{user.village}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">
                                        {user.roles.some(role => role.name === 'minibus owner')
                                            ? `Joined ${formatDate(user.created_at)}`
                                            : `Signed up ${formatDate(user.created_at)}`
                                        }
                                    </span>
                                </div>
                                {user.archived_at && (
                                    <Badge variant="destructive" className="ml-2">Archived</Badge>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Roles and Permissions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="h-5 w-5 mr-2" />
                                    Roles & Permissions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Assigned Roles:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles.map((role) => (
                                                <Badge
                                                    key={role.id}
                                                    variant="outline"
                                                    className={`${getRoleBadgeColor(role.name)}`}
                                                >
                                                    {role.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    {user.roles.length === 0 && (
                                        <p className="text-gray-500 text-sm">No roles assigned</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">Email Verified</Label>
                                        <p className="text-sm mt-1">
                                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                                Verified
                                            </Badge>
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">Last Updated</Label>
                                        <p className="text-sm mt-1">{formatDate(user.updated_at)}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">Account Status</Label>
                                        <p className="text-sm mt-1">
                                            {user.archived_at ? (
                                                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-600">
                                            {user.roles.some(role => role.name === 'minibus owner')
                                                ? 'Member Since'
                                                : 'Account Created'
                                            }
                                        </Label>
                                        <p className="text-sm mt-1">{formatDate(user.created_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Commitment Statement Section */}
                        {user.roles.some(role => role.name === 'minibus owner') && user.commitment && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Commitment Statement</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm whitespace-pre-line">{user.commitment}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 