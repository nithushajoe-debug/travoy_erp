import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunicationStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Messages",
      value: stats?.totalMessages,
      change: "+12%",
      changeType: "positive",
      icon: "MessageSquare",
      color: "blue"
    },
    {
      title: "Response Time",
      value: stats?.avgResponseTime,
      change: "-8%",
      changeType: "positive",
      icon: "Clock",
      color: "green"
    },
    {
      title: "Active Conversations",
      value: stats?.activeConversations,
      change: "+5%",
      changeType: "positive",
      icon: "Users",
      color: "purple"
    },
    {
      title: "WhatsApp Opt-ins",
      value: stats?.whatsappOptIns,
      change: "+18%",
      changeType: "positive",
      icon: "MessageCircle",
      color: "green"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600"
    };
    return colorMap?.[color] || colorMap?.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat?.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunicationStats;