import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserFilters = ({ 
  searchTerm, 
  onSearchChange, 
  roleFilter, 
  onRoleFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  statusFilter,
  onStatusFilterChange,
  onClearFilters,
  onExport
}) => {
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Staff', label: 'Staff' },
    { value: 'Customer', label: 'Customer' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Finance', label: 'Finance' },
    { value: 'IT', label: 'IT' },
    { value: 'Legal', label: 'Legal' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const hasActiveFilters = searchTerm || roleFilter || departmentFilter || statusFilter;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Users</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Filters
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            placeholder="Filter by role"
            options={roleOptions}
            value={roleFilter}
            onChange={onRoleFilterChange}
          />
        </div>

        <div>
          <Select
            placeholder="Filter by department"
            options={departmentOptions}
            value={departmentFilter}
            onChange={onDepartmentFilterChange}
          />
        </div>

        <div>
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            {roleFilter && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Role: {roleFilter}
              </span>
            )}
            {departmentFilter && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Department: {departmentFilter}
              </span>
            )}
            {statusFilter && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Status: {statusFilter}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;