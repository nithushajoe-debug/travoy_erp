import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications }) => {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    return notification?.type === filter;
  });

  const getNotificationIcon = (type) => {
    const iconMap = {
      urgent: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle',
      warning: 'AlertCircle',
      document: 'FileText',
      payment: 'DollarSign',
      message: 'MessageSquare'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      urgent: 'text-error bg-error/10',
      info: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      document: 'text-primary bg-primary/10',
      payment: 'text-success bg-success/10',
      message: 'text-primary bg-primary/10'
    };
    return colorMap?.[type] || 'text-muted-foreground bg-muted';
  };

  const handleNotificationAction = (notificationId, action) => {
    console.log(`Notification ${notificationId} action: ${action}`);
    // Implement notification action logic
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'urgent' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('urgent')}
          >
            Urgent
          </Button>
          <Button
            variant={filter === 'document' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setFilter('document')}
          >
            Documents
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.map((notification) => (
          <div key={notification?.id} className={`p-4 rounded-lg border ${notification?.isRead ? 'bg-background' : 'bg-muted/50'}`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                  {!notification?.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{formatTime(notification?.timestamp)}</span>
                  <div className="flex items-center space-x-2">
                    {notification?.actionable && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleNotificationAction(notification?.id, 'view')}
                      >
                        View
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleNotificationAction(notification?.id, 'dismiss')}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;