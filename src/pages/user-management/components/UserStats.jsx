import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      change: stats?.totalUsersChange,
      changeType: stats?.totalUsersChange >= 0 ? 'positive' : 'negative',
      icon: 'Users',
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers,
      change: stats?.activeUsersChange,
      changeType: stats?.activeUsersChange >= 0 ? 'positive' : 'negative',
      icon: 'UserCheck',
      color: 'text-success bg-success/10'
    },
    {
      title: 'New This Month',
      value: stats?.newThisMonth,
      change: stats?.newThisMonthChange,
      changeType: stats?.newThisMonthChange >= 0 ? 'positive' : 'negative',
      icon: 'UserPlus',
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Online Now',
      value: stats?.onlineNow,
      change: null,
      changeType: null,
      icon: 'Wifi',
      color: 'text-success bg-success/10'
    }
  ];

  const formatChange = (change, changeType) => {
    if (change === null || change === undefined) return null;
    
    const sign = change >= 0 ? '+' : '';
    const color = changeType === 'positive' ? 'text-success' : 'text-error';
    const icon = changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
    
    return (
      <div className={`flex items-center space-x-1 ${color}`}>
        <Icon name={icon} size={12} />
        <span className="text-xs font-medium">{sign}{change}%</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            {stat?.change !== null && formatChange(stat?.change, stat?.changeType)}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stat?.value?.toLocaleString()}
            </h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;