import React, { useState, useEffect } from 'react';

import Button from '../../components/ui/Button';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

// Import components
import UserCard from './components/UserCard';
import UserTable from './components/UserTable';
import UserFilters from './components/UserFilters';
import UserModal from './components/UserModal';
import BulkActions from './components/BulkActions';
import UserStats from './components/UserStats';
import RolePermissionMatrix from './components/RolePermissionMatrix';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  
  // Sorting states
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Mock data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@travoy.com",
      role: "Super Admin",
      department: "IT",
      status: "active",
      phone: "+1 (555) 123-4567",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      joinedDate: "2023-01-15",
      casesAssigned: 0,
      twoFactorEnabled: true,
      isOnline: true,
      notifications: 3,
      permissions: ['dashboard', 'user_management', 'case_management', 'financial', 'communication', 'ai_writer', 'reports', 'settings']
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@travoy.com",
      role: "Admin",
      department: "Operations",
      status: "active",
      phone: "+1 (555) 234-5678",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000),
      joinedDate: "2023-02-20",
      casesAssigned: 45,
      twoFactorEnabled: true,
      isOnline: false,
      notifications: 7,
      permissions: ['dashboard', 'user_management', 'case_management', 'financial', 'communication', 'ai_writer', 'reports']
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@travoy.com",
      role: "Staff",
      department: "Customer Service",
      status: "active",
      phone: "+1 (555) 345-6789",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      joinedDate: "2023-03-10",
      casesAssigned: 32,
      twoFactorEnabled: false,
      isOnline: true,
      notifications: 2,
      permissions: ['dashboard', 'case_management', 'communication', 'ai_writer']
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@travoy.com",
      role: "Staff",
      department: "Sales",
      status: "inactive",
      phone: "+1 (555) 456-7890",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      joinedDate: "2023-04-05",
      casesAssigned: 28,
      twoFactorEnabled: true,
      isOnline: false,
      notifications: 0,
      permissions: ['dashboard', 'case_management', 'communication']
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@travoy.com",
      role: "Admin",
      department: "Finance",
      status: "active",
      phone: "+1 (555) 567-8901",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000),
      joinedDate: "2023-01-30",
      casesAssigned: 0,
      twoFactorEnabled: true,
      isOnline: true,
      notifications: 5,
      permissions: ['dashboard', 'user_management', 'financial', 'communication', 'reports']
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@travoy.com",
      role: "Staff",
      department: "Legal",
      status: "suspended",
      phone: "+1 (555) 678-9012",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      lastLogin: new Date(Date.now() - 72 * 60 * 60 * 1000),
      joinedDate: "2023-05-15",
      casesAssigned: 15,
      twoFactorEnabled: false,
      isOnline: false,
      notifications: 0,
      permissions: ['dashboard', 'case_management']
    },
    {
      id: 7,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      role: "Customer",
      department: "N/A",
      status: "active",
      phone: "+1 (555) 789-0123",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000),
      joinedDate: "2024-08-20",
      casesAssigned: 0,
      twoFactorEnabled: false,
      isOnline: false,
      notifications: 1,
      permissions: ['dashboard', 'communication']
    },
    {
      id: 8,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      role: "Customer",
      department: "N/A",
      status: "active",
      phone: "+1 (555) 890-1234",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
      joinedDate: "2024-08-25",
      casesAssigned: 0,
      twoFactorEnabled: true,
      isOnline: false,
      notifications: 0,
      permissions: ['dashboard', 'communication']
    }
  ];

  const mockStats = {
    totalUsers: 156,
    totalUsersChange: 12,
    activeUsers: 142,
    activeUsersChange: 8,
    newThisMonth: 23,
    newThisMonthChange: 15,
    onlineNow: 34
  };

  // Initialize data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = users?.filter(user => {
      const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesRole = !roleFilter || user?.role === roleFilter;
      const matchesDepartment = !departmentFilter || user?.department === departmentFilter;
      const matchesStatus = !statusFilter || user?.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });

    // Sort filtered results
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'lastLogin') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, roleFilter, departmentFilter, statusFilter, sortBy, sortOrder]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  // Event handlers
  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setShowUserModal(true);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user?.name}?`)) {
      setUsers(prev => prev?.filter(u => u?.id !== user?.id));
      setSelectedUsers(prev => prev?.filter(id => id !== user?.id));
    }
  };

  const handleToggleStatus = (user) => {
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleViewProfile = (user) => {
    console.log('View profile:', user);
    // Implement profile view logic
  };

  const handleSaveUser = (userData) => {
    if (modalMode === 'create') {
      setUsers(prev => [...prev, { ...userData, id: Date.now() }]);
    } else {
      setUsers(prev => prev?.map(u => 
        u?.id === userData?.id ? userData : u
      ));
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev?.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(currentUsers?.map(user => user?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action, userIds) => {
    console.log('Bulk action:', action, userIds);
    
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(u => 
          userIds?.includes(u?.id) ? { ...u, status: 'active' } : u
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(u => 
          userIds?.includes(u?.id) ? { ...u, status: 'inactive' } : u
        ));
        break;
      case 'suspend':
        setUsers(prev => prev?.map(u => 
          userIds?.includes(u?.id) ? { ...u, status: 'suspended' } : u
        ));
        break;
      case 'delete':
        setUsers(prev => prev?.filter(u => !userIds?.includes(u?.id)));
        break;
      case 'export':
        // Implement export logic
        console.log('Exporting users:', userIds);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRoleFilter('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  const handleExport = () => {
    console.log('Exporting all users');
    // Implement export logic
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleSavePermissions = (permissions) => {
    console.log('Saving permissions:', permissions);
    // Implement permission save logic
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-foreground font-medium">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage system users, roles, and permissions
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowPermissionMatrix(true)}
              iconName="Shield"
              iconPosition="left"
              iconSize={16}
            >
              Role Permissions
            </Button>
            <Button
              onClick={handleCreateUser}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add User
            </Button>
          </div>
        </div>

        {/* Stats */}
        <UserStats stats={mockStats} />

        {/* Filters */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onClearFilters={handleClearFilters}
          onExport={handleExport}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedUsers={selectedUsers}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedUsers([])}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers?.length)} of {filteredUsers?.length} users
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              iconName="List"
              iconPosition="left"
              iconSize={16}
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
              iconPosition="left"
              iconSize={16}
            >
              Grid
            </Button>
          </div>
        </div>

        {/* Users Display */}
        {viewMode === 'table' ? (
          <UserTable
            users={currentUsers}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
            onViewProfile={handleViewProfile}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUsers?.map(user => (
              <UserCard
                key={user?.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleStatus}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left"
                iconSize={16}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
                iconSize={16}
              >
                Next
              </Button>
            </div>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}

        {/* Modals */}
        <UserModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          user={selectedUser}
          onSave={handleSaveUser}
          mode={modalMode}
        />

        <RolePermissionMatrix
          isOpen={showPermissionMatrix}
          onClose={() => setShowPermissionMatrix(false)}
          onSave={handleSavePermissions}
        />
      </div>
    </div>
  );
};

export default UserManagement;