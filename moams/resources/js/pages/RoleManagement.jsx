import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function RoleManagement() {
    const { users, flash } = usePage().props;
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch available roles from backend
        fetch('/roles')
            .then(res => res.json())
            .then(data => setRoles(data));
    }, []);

    useEffect(() => {
        // Initialize selectedRoles state
        const initial = {};
        users.forEach(user => {
            initial[user.id] = user.role || '';
        });
        setSelectedRoles(initial);
    }, [users]);

    const handleChange = (userId, role) => {
        setSelectedRoles(prev => ({ ...prev, [userId]: role }));
    };

    const handleSubmit = (userId) => {
        setLoading(true);
        router.post(`/users/${userId}/roles`, { role: selectedRoles[userId] }, {
            onFinish: () => setLoading(false),
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Role Management</h1>
            {flash && flash.success && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{flash.success}</div>
            )}
            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">First Name</th>
                        <th className="p-2 border">Last Name</th>
                        <th className="p-2 border">Gender</th>
                        <th className="p-2 border">Phone Number</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="p-2 border">{user.first_name}</td>
                            <td className="p-2 border">{user.last_name}</td>
                            <td className="p-2 border">{user.gender}</td>
                            <td className="p-2 border">{user.phone_number}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">
                                <select
                                    value={selectedRoles[user.id] || ''}
                                    onChange={e => handleChange(user.id, e.target.value)}
                                    className="border rounded p-1"
                                >
                                    <option value="">Select role</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => handleSubmit(user.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                    disabled={loading || !selectedRoles[user.id] || selectedRoles[user.id] === user.role}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 