import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const UserCard = ({ user, onEdit, onDelete, onToggleStatus, onViewProfile }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'inactive':
        return 'text-warning bg-warning/10';
      case 'suspended':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
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

  const formatLastLogin = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              user?.status === 'active' ? 'bg-success' : 
              user?.status === 'inactive' ? 'bg-warning' : 'bg-error'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                {user?.role}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                {user?.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {user?.notifications > 0 && (
            <NotificationBadge count={user?.notifications} variant="error" size="sm" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewProfile(user)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Eye" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Department:</span>
          <p className="font-medium text-foreground">{user?.department}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Last Login:</span>
          <p className="font-medium text-foreground">{formatLastLogin(user?.lastLogin)}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Cases Assigned:</span>
          <p className="font-medium text-foreground">{user?.casesAssigned}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Joined:</span>
          <p className="font-medium text-foreground">{new Date(user.joinedDate)?.toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {user?.twoFactorEnabled && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Shield" size={14} />
              <span className="text-xs">2FA</span>
            </div>
          )}
          {user?.isOnline && (
            <div className="flex items-center space-x-1 text-success">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs">Online</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            Edit
          </Button>
          <Button
            variant={user?.status === 'active' ? 'warning' : 'success'}
            size="sm"
            onClick={() => onToggleStatus(user)}
            iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
            iconPosition="left"
            iconSize={14}
          >
            {user?.status === 'active' ? 'Suspend' : 'Activate'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;