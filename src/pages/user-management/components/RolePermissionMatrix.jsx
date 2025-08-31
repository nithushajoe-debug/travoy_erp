import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RolePermissionMatrix = ({ isOpen, onClose, onSave }) => {
  const [permissions, setPermissions] = useState({
    'Super Admin': {
      dashboard: true,
      user_management: true,
      case_management: true,
      financial: true,
      communication: true,
      ai_writer: true,
      reports: true,
      settings: true,
      audit_logs: true,
      system_config: true
    },
    'Admin': {
      dashboard: true,
      user_management: true,
      case_management: true,
      financial: true,
      communication: true,
      ai_writer: true,
      reports: true,
      settings: false,
      audit_logs: true,
      system_config: false
    },
    'Staff': {
      dashboard: true,
      user_management: false,
      case_management: true,
      financial: false,
      communication: true,
      ai_writer: true,
      reports: false,
      settings: false,
      audit_logs: false,
      system_config: false
    },
    'Customer': {
      dashboard: true,
      user_management: false,
      case_management: false,
      financial: false,
      communication: true,
      ai_writer: false,
      reports: false,
      settings: false,
      audit_logs: false,
      system_config: false
    }
  });

  const permissionLabels = {
    dashboard: 'Dashboard Access',
    user_management: 'User Management',
    case_management: 'Case Management',
    financial: 'Financial Management',
    communication: 'Communication Center',
    ai_writer: 'AI Letter Writer',
    reports: 'Reports & Analytics',
    settings: 'System Settings',
    audit_logs: 'Audit Logs',
    system_config: 'System Configuration'
  };

  const roles = ['Super Admin', 'Admin', 'Staff', 'Customer'];
  const permissionKeys = Object.keys(permissionLabels);

  const handlePermissionChange = (role, permission, checked) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev?.[role],
        [permission]: checked
      }
    }));
  };

  const handleSave = () => {
    onSave(permissions);
    onClose();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'text-error bg-error/10';
      case 'Admin':
        return 'text-primary bg-primary/10';
      case 'Staff':
        return 'text-accent bg-accent/10';
      case 'Customer':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Role Permission Matrix</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure permissions for each user role
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Permission
                  </th>
                  {roles?.map(role => (
                    <th key={role} className="text-center py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(role)}`}>
                        {role}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionKeys?.map((permission, index) => (
                  <tr key={permission} className={`border-b border-border ${index % 2 === 0 ? 'bg-muted/20' : ''}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={
                            permission === 'dashboard' ? 'LayoutDashboard' :
                            permission === 'user_management' ? 'Users' :
                            permission === 'case_management' ? 'FileText' :
                            permission === 'financial' ? 'DollarSign' :
                            permission === 'communication' ? 'MessageSquare' :
                            permission === 'ai_writer' ? 'Bot' :
                            permission === 'reports' ? 'BarChart3' :
                            permission === 'settings' ? 'Settings' :
                            permission === 'audit_logs'? 'History' : 'Cog'
                          } 
                          size={18} 
                          className="text-muted-foreground" 
                        />
                        <div>
                          <p className="font-medium text-foreground">{permissionLabels?.[permission]}</p>
                          <p className="text-xs text-muted-foreground">
                            {permission === 'dashboard' && 'View dashboard and analytics'}
                            {permission === 'user_management' && 'Create, edit, and delete users'}
                            {permission === 'case_management' && 'Manage visa cases and applications'}
                            {permission === 'financial' && 'Access financial data and reports'}
                            {permission === 'communication' && 'Send messages and notifications'}
                            {permission === 'ai_writer' && 'Use AI-powered document generation'}
                            {permission === 'reports' && 'Generate and view reports'}
                            {permission === 'settings' && 'Configure system settings'}
                            {permission === 'audit_logs' && 'View system audit logs'}
                            {permission === 'system_config' && 'Configure system parameters'}
                          </p>
                        </div>
                      </div>
                    </td>
                    {roles?.map(role => (
                      <td key={`${role}-${permission}`} className="py-4 px-4 text-center">
                        <Checkbox
                          checked={permissions?.[role]?.[permission]}
                          onChange={(e) => handlePermissionChange(role, permission, e?.target?.checked)}
                          disabled={role === 'Super Admin'} // Super Admin always has all permissions
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Permission Guidelines:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Super Admin permissions cannot be modified and have full system access</li>
                  <li>• Admin users can manage other users but cannot access system configuration</li>
                  <li>• Staff users have limited access focused on case management and communication</li>
                  <li>• Customer users only have access to their own dashboard and communication</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Permissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMatrix;