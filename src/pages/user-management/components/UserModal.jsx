import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'active',
    phone: '',
    password: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        department: user?.department || '',
        status: user?.status || 'active',
        phone: user?.phone || '',
        password: '',
        confirmPassword: '',
        twoFactorEnabled: user?.twoFactorEnabled || false,
        permissions: user?.permissions || []
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        department: '',
        status: 'active',
        phone: '',
        password: '',
        confirmPassword: '',
        twoFactorEnabled: false,
        permissions: []
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const roleOptions = [
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Staff', label: 'Staff' },
    { value: 'Customer', label: 'Customer' }
  ];

  const departmentOptions = [
    { value: 'Operations', label: 'Operations' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Finance', label: 'Finance' },
    { value: 'IT', label: 'IT' },
    { value: 'Legal', label: 'Legal' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const permissionOptions = [
    { id: 'dashboard', label: 'Dashboard Access', description: 'View dashboard and analytics' },
    { id: 'user_management', label: 'User Management', description: 'Create, edit, and delete users' },
    { id: 'case_management', label: 'Case Management', description: 'Manage visa cases and applications' },
    { id: 'financial', label: 'Financial Management', description: 'Access financial data and reports' },
    { id: 'communication', label: 'Communication Center', description: 'Send messages and notifications' },
    { id: 'ai_writer', label: 'AI Letter Writer', description: 'Use AI-powered document generation' },
    { id: 'reports', label: 'Reports & Analytics', description: 'Generate and view reports' },
    { id: 'settings', label: 'System Settings', description: 'Configure system settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev?.permissions, permissionId]
        : prev?.permissions?.filter(p => p !== permissionId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData?.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (mode === 'create') {
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await onSave({
        ...formData,
        id: user?.id || Date.now()
      });
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'create' ? 'Create New User' : 'Edit User'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />

            <Select
              label="Role"
              placeholder="Select role"
              options={roleOptions}
              value={formData?.role}
              onChange={(value) => handleInputChange('role', value)}
              error={errors?.role}
              required
            />

            <Select
              label="Department"
              placeholder="Select department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleInputChange('department', value)}
              error={errors?.department}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
            />

            <Select
              label="Status"
              options={statusOptions}
              value={formData?.status}
              onChange={(value) => handleInputChange('status', value)}
            />
          </div>

          {mode === 'create' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                value={formData?.password}
                onChange={(e) => handleInputChange('password', e?.target?.value)}
                error={errors?.password}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={formData?.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
                required
              />
            </div>
          )}

          <div className="space-y-4">
            <Checkbox
              label="Enable Two-Factor Authentication"
              description="Require 2FA for enhanced security"
              checked={formData?.twoFactorEnabled}
              onChange={(e) => handleInputChange('twoFactorEnabled', e?.target?.checked)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {permissionOptions?.map((permission) => (
                <div key={permission?.id} className="border border-border rounded-lg p-4">
                  <Checkbox
                    label={permission?.label}
                    description={permission?.description}
                    checked={formData?.permissions?.includes(permission?.id)}
                    onChange={(e) => handlePermissionChange(permission?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              iconName={mode === 'create' ? 'Plus' : 'Save'}
              iconPosition="left"
              iconSize={16}
            >
              {mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;