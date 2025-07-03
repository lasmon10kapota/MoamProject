import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Search, History, Shuffle, Trash2, Bus, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export default function MinibusManagement({ minibuses, userRole, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTransferType, setFilterTransferType] = useState('');
    const initialDisplayCount = 6;
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
    ];

    // Filter minibuses based on user role and search term
    const filteredMinibuses = minibuses
        // If user is minibus owner, only show their active minibuses
        .filter(minibus => {
            if (userRole === 'minibus owner') {
                return minibus.user_id === auth.user.id && !minibus.archived;
            }
            return true;
        })
        // Then apply search filters
        .filter(minibus => {
            const matchesSearch = minibus.number_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                minibus.assigned_route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (minibus.user && (
                    (minibus.user.first_name && minibus.user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (minibus.user.last_name && minibus.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
                ));

            // Only apply transfer type filter for non-minibus owners
            if (userRole !== 'minibus owner' && filterTransferType) {
                if (filterTransferType === 'internal') {
                    return matchesSearch && (minibus.internal_transfers_count || 0) > 0;
                } else if (filterTransferType === 'external') {
                    return matchesSearch && minibus.archived;
                }
            }

            return matchesSearch;
        });

    const displayedMinibuses = filteredMinibuses.slice(0, displayCount);
    const hasMoreMinibuses = displayedMinibuses.length < filteredMinibuses.length;

    const loadMoreMinibuses = () => {
        setDisplayCount(prev => Math.min(prev + 6, filteredMinibuses.length));
    };
    const loadLessMinibuses = () => {
        setDisplayCount(prev => Math.max(initialDisplayCount, prev - 6));
    };

    const handleDelete = (minibusId, numberPlate) => {
        if (window.confirm(`Are you sure you want to delete minibus ${numberPlate}? This action cannot be undone.`)) {
            router.delete(route('minibuses.destroy', minibusId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minibus Management" />
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage all minibuses, their owners, and routes
                        </p>
                    </div>
                    <Link href={route('minibuses.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Minibus
                        </Button>
                    </Link>
                </div>

                {/* Statistics */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Minibus Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`grid ${userRole === 'minibus owner' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {userRole === 'minibus owner'
                                        ? filteredMinibuses.length
                                        : minibuses.length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {userRole === 'minibus owner' ? 'Your Minibuses' : 'Total Minibuses'}
                                </div>
                            </div>
                            {userRole !== 'minibus owner' && (
                                <>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {minibuses.filter(m => (m.internal_transfers_count || 0) > 0).length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Internal Transfers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-amber-600">
                                            {minibuses.filter(m => m.archived).length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">External Transfers</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Search & Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Search & Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`grid grid-cols-1 ${userRole === 'minibus owner' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
                            <div>
                                <Label htmlFor="search" className="text-sm mb-1 block">Search Minibuses</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="search"
                                        placeholder="Search by plate, route, or owner..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            {userRole !== 'minibus owner' && (
                                <div>
                                    <Label htmlFor="transfer-type" className="text-sm mb-1 block">Transfer Type</Label>
                                    <select
                                        id="transfer-type"
                                        value={filterTransferType}
                                        onChange={(e) => setFilterTransferType(e.target.value)}
                                        className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                    >
                                        <option value="">Select transfer type...</option>
                                        <option value="internal">With Internal Transfers</option>
                                        <option value="external">With External Transfers</option>
                                    </select>
                                </div>
                            )}
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterTransferType('');
                                        setDisplayCount(initialDisplayCount);
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

                {/* Minibus Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMinibuses.length > 0 ? (
                        displayedMinibuses.map((minibus) => (
                            <Card key={minibus.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-2">
                                            <Bus className="h-5 w-5 text-gray-500" />
                                            <CardTitle className="text-lg">{minibus.number_plate}</CardTitle>
                                        </div>
                                        {minibus.archived && (
                                            <Badge variant="destructive">Archived</Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Assigned Route</p>
                                            <p className="font-medium">{minibus.assigned_route}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Owner</p>
                                            <p className="font-medium">
                                                {minibus.archived ? 'Non-member' : (minibus.user ? `${minibus.user.first_name} ${minibus.user.last_name}` : 'No owner assigned')}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {/* View Details - Always visible */}
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link href={route('minibuses.show', minibus.id)}>
                                                            <Button variant="outline" size="icon">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>View Details</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            {/* Association Clerk Actions */}
                                            {userRole === 'association clerk' && (
                                                <>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Link href={route('minibuses.edit', minibus.id)}>
                                                                    <Button variant="outline" size="icon">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>Edit Minibus</TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    {!minibus.archived && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Link href={route('minibuses.transfer', minibus.id)}>
                                                                        <Button variant="outline" size="icon">
                                                                            <Shuffle className="h-4 w-4" />
                                                                        </Button>
                                                                    </Link>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Transfer Ownership</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}

                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Link href={route('minibuses.history', minibus.id)}>
                                                                    <Button variant="outline" size="icon">
                                                                        <History className="h-4 w-4" />
                                                                    </Button>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>View History</TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    {!minibus.archived && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => {
                                                                            if (confirm('Are you sure you want to delete this minibus?')) {
                                                                                router.delete(route('minibuses.destroy', minibus.id));
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Delete Minibus</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </>
                                            )}

                                            {/* Minibus Owner Actions */}
                                            {userRole === 'minibus owner' && minibus.user_id === auth.user.id && !minibus.archived && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link href={route('minibuses.transfer.request', minibus.id)}>
                                                                <Button variant="outline" size="icon">
                                                                    <Shuffle className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Request Transfer</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <Card className="w-full">
                                <CardContent className="flex flex-col items-center justify-center py-8">
                                    <Bus className="h-12 w-12 text-gray-400 mb-4" />
                                    <p className="text-lg font-medium text-gray-900 mb-1">No minibuses found</p>
                                    <p className="text-sm text-gray-500">
                                        {searchTerm || filterTransferType ?
                                            "Try adjusting your search or filters" :
                                            "No minibuses have been registered yet"}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
                {hasMoreMinibuses && (
                    <div className="flex justify-center mt-6 space-x-4">
                        <Button variant="outline" onClick={loadMoreMinibuses}>Load More</Button>
                        {displayCount > initialDisplayCount && (
                            <Button variant="outline" onClick={loadLessMinibuses}>Load Less</Button>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
