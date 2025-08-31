import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityList = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      case_created: 'FileText',
      document_uploaded: 'Upload',
      payment_received: 'DollarSign',
      message_sent: 'MessageSquare',
      status_updated: 'RefreshCw',
      user_login: 'LogIn',
      approval_pending: 'Clock'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      case_created: 'text-primary',
      document_uploaded: 'text-success',
      payment_received: 'text-success',
      message_sent: 'text-primary',
      status_updated: 'text-warning',
      user_login: 'text-muted-foreground',
      approval_pending: 'text-warning'
    };
    return colorMap?.[type] || 'text-muted-foreground';
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
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium">{activity?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity?.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-muted-foreground">{formatTime(activity?.timestamp)}</span>
                {activity?.user && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity?.user}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;